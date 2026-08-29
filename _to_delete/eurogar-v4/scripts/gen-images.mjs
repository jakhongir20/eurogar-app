/**
 * EUROGAR — placeholder renders for products without real photos yet.
 * Style matches the real product photos: white studio background,
 * soft contact shadow, neutral metal tones. 1600×1200 (4:3).
 *
 * Currently generated: bollard, shlagbaum.
 * Replace with real photos (same filenames, .webp) when available.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/products");
mkdirSync(OUT, { recursive: true });

const W = 1600;
const H = 1200;

const head = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
<defs>
  <linearGradient id="bgv" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#ffffff"/>
    <stop offset="78%" stop-color="#fbfcfd"/>
    <stop offset="100%" stop-color="#eef2f5"/>
  </linearGradient>
  <linearGradient id="steelV" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%"  stop-color="#9aa4ad"/>
    <stop offset="22%" stop-color="#e8ecef"/>
    <stop offset="46%" stop-color="#c3cbd1"/>
    <stop offset="74%" stop-color="#f2f5f7"/>
    <stop offset="100%" stop-color="#8f99a2"/>
  </linearGradient>
  <linearGradient id="steelH" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%"  stop-color="#eef1f3"/>
    <stop offset="45%" stop-color="#c9d0d6"/>
    <stop offset="100%" stop-color="#98a2ab"/>
  </linearGradient>
  <linearGradient id="darkbase" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#4a545e"/>
    <stop offset="100%" stop-color="#2c343c"/>
  </linearGradient>
  <radialGradient id="shadow" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0%" stop-color="#1c2830" stop-opacity="0.32"/>
    <stop offset="70%" stop-color="#1c2830" stop-opacity="0.10"/>
    <stop offset="100%" stop-color="#1c2830" stop-opacity="0"/>
  </radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#bgv)"/>`;

const tail = `</svg>`;

const shadow = (cx, cy, rx, ry) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#shadow)"/>`;

/* ─────────────── Bollard: uchtalik kompozitsiya ─────────────── */
function bollard() {
  const post = (cx, baseY, h, w, main = true) => {
    const x = cx - w / 2;
    const capR = w / 2;
    return `
    ${shadow(cx, baseY + 14, w * 1.35, 26)}
    <!-- asos flanets -->
    <rect x="${x - w * 0.28}" y="${baseY - 26}" width="${w * 1.56}" height="34" rx="10" fill="url(#darkbase)"/>
    <!-- tana -->
    <rect x="${x}" y="${baseY - h}" width="${w}" height="${h - 18}" rx="6" fill="url(#steelV)"/>
    <!-- yorug'lik chizig'i -->
    <rect x="${x + w * 0.16}" y="${baseY - h + capR}" width="${w * 0.1}" height="${h - capR - 40}" rx="${w * 0.05}" fill="#ffffff" opacity="0.55"/>
    <!-- qalpoq -->
    <path d="M${x} ${baseY - h + 2} a${capR} ${capR} 0 0 1 ${w} 0 z" fill="url(#steelH)"/>
    <!-- reflektor halqa -->
    ${main ? `<rect x="${x}" y="${baseY - h + capR + 26}" width="${w}" height="30" fill="#c62828"/>
    <rect x="${x}" y="${baseY - h + capR + 56}" width="${w}" height="18" fill="#f5f6f7"/>` : ""}
    <!-- pastki halqa -->
    <rect x="${x - 4}" y="${baseY - 64}" width="${w + 8}" height="22" rx="8" fill="url(#steelH)"/>`;
  };

  return (
    head +
    post(560, 900, 470, 150) +
    post(1080, 880, 380, 118, false) +
    post(230, 870, 330, 100, false) +
    tail
  );
}

/* ─────────────── Shlagbaum ─────────────── */
function shlagbaum() {
  const bx = 300, by = 880; // korpus asosi
  const armY = 505;
  return (
    head +
    shadow(430, by + 22, 300, 30) +
    shadow(1080, armY + 330, 420, 22) +
    `
    <!-- korpus -->
    <rect x="${bx - 20}" y="${by - 6}" width="300" height="34" rx="10" fill="url(#darkbase)"/>
    <rect x="${bx}" y="${by - 420}" width="260" height="420" rx="18" fill="url(#steelV)"/>
    <rect x="${bx + 18}" y="${by - 402}" width="46" height="386" rx="12" fill="#ffffff" opacity="0.4"/>
    <!-- korpus paneli -->
    <rect x="${bx + 62}" y="${by - 330}" width="140" height="180" rx="12" fill="#33404a"/>
    <circle cx="${bx + 132}" cy="${by - 240}" r="30" fill="#22303a"/>
    <circle cx="${bx + 132}" cy="${by - 240}" r="30" fill="none" stroke="#5a6a75" stroke-width="4"/>
    <!-- ogohlantirish chiroq -->
    <rect x="${bx + 92}" y="${by - 470}" width="80" height="56" rx="14" fill="url(#darkbase)"/>
    <circle cx="${bx + 132}" cy="${by - 442}" r="18" fill="#e05252"/>
    <circle cx="${bx + 126}" cy="${by - 448}" r="6" fill="#ffb3b3" opacity="0.85"/>
    <!-- strela sharnir -->
    <circle cx="${bx + 130}" cy="${armY}" r="46" fill="url(#steelH)"/>
    <circle cx="${bx + 130}" cy="${armY}" r="16" fill="#33404a"/>
    <!-- strela -->
    <g>
      <rect x="${bx + 130}" y="${armY - 26}" width="1050" height="52" rx="26" fill="#f4f6f7"/>
      ${[0, 1, 2, 3, 4]
        .map(
          (i) =>
            `<path d="M${bx + 320 + i * 190} ${armY - 26} h95 l-52 52 h-95 z" fill="#c62828"/>`,
        )
        .join("")}
      <rect x="${bx + 130}" y="${armY - 26}" width="1050" height="52" rx="26" fill="none" stroke="#9aa4ad" stroke-width="3"/>
      <!-- uchidagi tayanch -->
      <rect x="${bx + 1130}" y="${armY + 20}" width="18" height="290" rx="8" fill="url(#steelV)"/>
      <rect x="${bx + 1096}" y="${armY + 300}" width="86" height="20" rx="9" fill="url(#darkbase)"/>
    </g>` +
    tail
  );
}

writeFileSync(resolve(OUT, "bollard.svg"), bollard(), "utf8");
writeFileSync(resolve(OUT, "shlagbaum.svg"), shlagbaum(), "utf8");
console.log("✓ bollard.svg, shlagbaum.svg → public/products");
