/**
 * Kontrast auditi — sahifalarning haqiqiy renderida matn/fon nisbatini o'lchaydi.
 * WCAG AA: oddiy matn ≥ 4.5, katta matn (≥24px yoki ≥18.66px bold) ≥ 3.
 */
import { chromium } from "playwright";

const B = process.argv[2] || "http://localhost:3310";
const PAGES = [
  "/uz",
  "/uz/services",
  "/uz/faq",
  "/uz/warranty",
  "/uz/blog",
  "/uz/blog/rolstavniy-darvoza-nima",
  "/uz/catalog",
  "/uz/catalog/rolstavniy-darvoza",
  "/uz/product/seksion-darvoza-garaj",
  "/uz/calculator",
  "/uz/contact",
  "/uz/about",
  "/uz/cart",
  "/uz/privacy",
  "/ru",
  "/admin/login",
];

const AUDIT = () => {
  // Tailwind v4 ranglari oklch() bo'lishi mumkin — canvas orqali RGB ga o'giramiz
  const cv = document.createElement("canvas");
  cv.width = cv.height = 1;
  const cx = cv.getContext("2d", { willReadFrequently: true });
  const cache = new Map();
  const parse = (c) => {
    if (!c || c === "transparent") return { r: 0, g: 0, b: 0, a: 0 };
    if (cache.has(c)) return cache.get(c);
    let v = null;
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const [r, g, b, a = 1] = m[1].split(/[,\s/]+/).filter(Boolean).map(parseFloat);
      v = { r, g, b, a };
    } else {
      cx.clearRect(0, 0, 1, 1);
      cx.fillStyle = "#000";
      cx.fillStyle = c;
      cx.fillRect(0, 0, 1, 1);
      const d = cx.getImageData(0, 0, 1, 1).data;
      v = { r: d[0], g: d[1], b: d[2], a: d[3] / 255 };
    }
    cache.set(c, v);
    return v;
  };
  const lum = ({ r, g, b }) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const over = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  });
  const ratio = (a, b) => {
    const l1 = lum(a),
      l2 = lum(b);
    const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
    return (hi + 0.05) / (lo + 0.05);
  };

  const out = [];
  const els = document.querySelectorAll("body *");

  for (const el of els) {
    // faqat bevosita matn tutgan elementlar
    const text = [...el.childNodes]
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join(" ")
      .trim();
    if (!text || text.length < 2) continue;

    // aria-hidden — bezak elementlari, ekran o'quvchi ko'rmaydi (WCAG dan chiqarilgan)
    if (el.closest('[aria-hidden="true"]')) continue;

    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none") continue;
    if (parseFloat(cs.opacity) < 0.15) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) continue;

    const fg = parse(cs.color);
    if (!fg || fg.a < 0.1) continue;
    // gradient bilan bo'yalgan matn (background-clip: text) — o'lchab bo'lmaydi
    if (cs.webkitBackgroundClip === "text" || cs.backgroundClip === "text") continue;

    // fonni ota-onalardan qidiramiz
    let node = el,
      bg = null,
      gradient = false;
    while (node && node !== document.documentElement) {
      const s = getComputedStyle(node);
      if (s.backgroundImage && s.backgroundImage !== "none") gradient = true;
      const c = parse(s.backgroundColor);
      if (c && c.a >= 0.95) {
        bg = c;
        break;
      }
      node = node.parentElement;
    }
    if (!bg) bg = { r: 255, g: 255, b: 255, a: 1 };

    const eff = fg.a < 1 ? over(fg, bg) : fg;
    const r = ratio(eff, bg);

    const size = parseFloat(cs.fontSize);
    const weight = parseInt(cs.fontWeight, 10) || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const need = large ? 3 : 4.5;

    if (r < need) {
      out.push({
        text: text.slice(0, 48),
        tag: el.tagName.toLowerCase(),
        cls: (el.className || "").toString().slice(0, 60),
        color: cs.color,
        bg: `rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)})`,
        size: Math.round(size),
        weight,
        ratio: +r.toFixed(2),
        need,
        gradient,
      });
    }
  }
  return out;
};

const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});
const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } });
const p = await ctx.newPage();

let total = 0;
for (const path of PAGES) {
  await p.goto(B + path, { waitUntil: "load" });
  await p.waitForTimeout(1400);
  // barcha reveal'larni ochish uchun pastga aylantiramiz
  const H = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < H; y += 600) {
    await p.evaluate((v) => window.scrollTo(0, v), y);
    await p.waitForTimeout(90);
  }
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(600);

  const issues = await p.evaluate(AUDIT);
  total += issues.length;
  console.log(`\n=== ${path} — ${issues.length} ta muammo ===`);
  for (const i of issues.slice(0, 10)) {
    console.log(
      `  ${i.ratio} (kerak ${i.need})  ${i.size}px/${i.weight}  "${i.text}"`,
    );
    console.log(`      ${i.color} / ${i.bg}${i.gradient ? "  [gradient fon]" : ""}  ${i.cls}`);
  }
  if (issues.length > 10) console.log(`  … va yana ${issues.length - 10} ta`);
}

console.log(`\nJAMI: ${total} ta kontrast muammosi`);
await b.close();
