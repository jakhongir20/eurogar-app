import { chromium } from "playwright";
const B = process.argv[2] || "http://localhost:3300";
const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});
const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } });
const p = await ctx.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push(`PAGEERROR @${p.url()} :: ${e.message.slice(0, 140)}`));
p.on("response", (r) => {
  if (r.status() >= 400 && !r.url().includes("ytimg")) errs.push(`HTTP ${r.status()} ${r.url()}`);
});
const ok = (n, c) => console.log(c ? "✓ " + n : "✗ " + n);

for (const u of [
  "/uz", "/ru",
  "/uz/catalog", "/uz/catalog/rolstavniy-darvoza", "/uz/catalog/shlagbaum",
  "/uz/product/seksion-darvoza-garaj", "/uz/product/antitarran-yol-blokeri",
  "/uz/calculator", "/uz/cart", "/uz/checkout", "/uz/contact", "/uz/about",
  "/uz/blog", "/uz/blog/rolstavniy-darvoza-nima", "/uz/blog/antitarran-nima",
  "/ru/blog/otkatnoy-darvoza-nima", "/ru/about", "/uz/privacy",
]) {
  const r = await p.goto(B + u, { waitUntil: "load" });
  await p.waitForTimeout(350);
  ok(`${u} [${r.status()}]`, r.status() === 200);
}

// savat → buyurtma
await p.goto(B + "/uz/product/rolstavniy-darvoza-qolda", { waitUntil: "load" });
await p.waitForTimeout(900);
await p.getByRole("button", { name: /Savatga qo/i }).first().click();
await p.waitForTimeout(900);
const badge = await p.locator('header button[aria-label="Savat"] span').first().textContent().catch(() => null);
ok(`savatga qo'shildi (${badge})`, badge === "1");

await p.goto(B + "/uz/checkout", { waitUntil: "load" });
await p.waitForTimeout(800);
await p.locator("input").first().fill("Test Mijoz");
await p.locator('input[inputmode="tel"]').fill("918880201");
await p.getByRole("button", { name: /Buyurtmani yuborish/i }).click();
await p.waitForTimeout(1600);
ok("buyurtma yuborildi", (await p.getByText(/qabul qilindi/i).count()) > 0);

// kalkulyator — yangi turlar
await p.goto(B + "/uz/calculator", { waitUntil: "load" });
await p.waitForTimeout(900);
const types = await p.locator("button:has(img)").allTextContents();
ok("kalkulyator turlari: " + types.slice(0, 4).join(" | "), types.length >= 4);
const before = await p.locator("aside").getByText(/so'm/).first().textContent();
await p.getByRole("button", { name: /Shlagbaum/i }).first().click();
await p.waitForTimeout(900);
const after = await p.locator("aside").getByText(/so'm/).first().textContent();
ok(`shlagbaum tanlandi (${before?.trim()} → ${after?.trim()})`, before !== after);

// video otziv modal
await p.goto(B + "/uz", { waitUntil: "load" });
await p.waitForTimeout(1200);
await p.evaluate(() => document.querySelector("#reviews")?.scrollIntoView());
await p.waitForTimeout(1300);
const vids = await p.locator("#reviews button.group\\/vid").count();
ok(`video otzivlar soni: ${vids}`, vids === 9);
if (vids) {
  await p.locator("#reviews button.group\\/vid").first().click();
  await p.waitForTimeout(1200);
  const iframe = await p.locator('iframe[src*="youtube.com/embed"]').count();
  ok("video modal ochildi (iframe)", iframe === 1);
  await p.keyboard.press("Escape");
}

// filiallar Contact'da
await p.goto(B + "/uz/contact", { waitUntil: "load" });
await p.waitForTimeout(1300);
const maps = await p.locator('iframe[src*="maps.google"]').count();
ok(`filial xaritalari: ${maps}`, maps === 3);
const tels = await p.locator('a[href^="tel:"]').count();
ok(`tel havolalar: ${tels}`, tels >= 6);

// blog share tugmalari
await p.goto(B + "/uz/blog/shlagbaum-nima-uchun-kerak", { waitUntil: "load" });
await p.waitForTimeout(900);
ok("share tugmalari", (await p.getByRole("button", { name: /Telegram/i }).count()) >= 1);
ok("o'xshash maqolalar", (await p.getByText(/O'xshash maqolalar/i).count()) >= 1);

console.log("\nxatolar:", errs.length ? [...new Set(errs)].slice(0, 8).join("\n") : "yo'q");
await b.close();
