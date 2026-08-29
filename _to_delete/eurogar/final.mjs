import { chromium } from "playwright";
const B = "http://localhost:3115";
const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});
const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } });
const p = await ctx.newPage();
const errs = [];
p.on("pageerror", (e) =>
  errs.push(`PAGEERROR @${p.url()} :: ${e.message.slice(0, 140)}`),
);
p.on("response", (r) => {
  if (r.status() >= 400) errs.push(`HTTP ${r.status()} ${r.url()}`);
});
const ok = (n, c) => console.log(c ? "✓ " + n : "✗ " + n);

for (const u of [
  "/uz", "/ru", "/uz/catalog", "/uz/catalog/rolstavnilar",
  "/uz/product/seksion-darvoza-alutech-trend", "/uz/calculator",
  "/uz/cart", "/uz/checkout", "/uz/contact", "/uz/about", "/uz/privacy",
  "/ru/catalog", "/ru/calculator", "/uz/mavjud-emas-404",
]) {
  const r = await p.goto(B + u, { waitUntil: "load" });
  await p.waitForTimeout(450);
  const expect404 = u.includes("404");
  ok(`${u}  [${r.status()}]`, expect404 ? r.status() === 404 : r.status() === 200);
}

await p.goto(B + "/uz/product/rolletli-shkaf-parking-standart", { waitUntil: "load" });
await p.waitForTimeout(900);
await p.getByRole("button", { name: /Savatga qo/i }).first().click();
await p.waitForTimeout(900);
const badge = await p
  .locator('header button[aria-label="Savat"] span')
  .first()
  .textContent()
  .catch(() => null);
ok(`savatga qo'shildi (badge=${badge})`, badge === "1");

await p.goto(B + "/uz/catalog", { waitUntil: "load" });
await p.waitForTimeout(800);
await p.locator("header").getByRole("button", { name: "ru" }).click();
await p.waitForTimeout(1800);
ok("til almashtirish → " + p.url().replace(B, ""), p.url().includes("/ru/catalog"));

await p.goto(B + "/uz/calculator", { waitUntil: "load" });
await p.waitForTimeout(900);
const before = await p.locator("aside").getByText(/so'm/).first().textContent();
await p.locator('input[type="number"]').first().fill("3000");
await p.waitForTimeout(800);
const after = await p.locator("aside").getByText(/so'm/).first().textContent();
ok(`kalkulyator qayta hisobladi (${before?.trim()} → ${after?.trim()})`, before !== after);

console.log("\nxatolar:", errs.length ? [...new Set(errs)].join("\n") : "yo'q");
await b.close();
