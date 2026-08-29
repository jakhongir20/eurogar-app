/**
 * EUROGAR — product image generator
 * Studio-style vector renders (1200x900) written to /public/products.
 * Swap these for real photography later; filenames stay the same.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/products");
mkdirSync(OUT, { recursive: true });

const W = 1200;
const H = 900;

/* ---------------- palettes ---------------- */
const METALS = {
  silver: ["#f2f4f7", "#c8cdd6", "#8f97a4", "#e7eaee"],
  graphite: ["#5b6272", "#333a48", "#1c2230", "#6b7383"],
  anthracite: ["#454b57", "#272c36", "#15181f", "#565d6b"],
  white: ["#ffffff", "#e8eaed", "#c2c6cd", "#fbfbfc"],
  brown: ["#8a6642", "#5f4429", "#3d2b19", "#9d764f"],
  golden: ["#e8c07a", "#c99b4f", "#9c7434", "#f3d295"],
  woodgrain: ["#a97a4d", "#7d5733", "#523720", "#bd8d5d"],
};

const uid = (() => {
  let i = 0;
  return (p) => `${p}${(i++).toString(36)}`;
})();

/* ---------------- primitives ---------------- */

function defsMetal(id, colors, angle = 90) {
  const [a, b, c, hi] = colors;
  const rad = (angle * Math.PI) / 180;
  const x2 = (Math.cos(rad) * 0.5 + 0.5).toFixed(3);
  const y2 = (Math.sin(rad) * 0.5 + 0.5).toFixed(3);
  return `
  <linearGradient id="${id}" x1="${(1 - x2).toFixed(3)}" y1="${(1 - y2).toFixed(3)}" x2="${x2}" y2="${y2}">
    <stop offset="0%"   stop-color="${b}"/>
    <stop offset="18%"  stop-color="${a}"/>
    <stop offset="38%"  stop-color="${hi}"/>
    <stop offset="52%"  stop-color="${a}"/>
    <stop offset="78%"  stop-color="${b}"/>
    <stop offset="100%" stop-color="${c}"/>
  </linearGradient>`;
}

function studio(theme = "light") {
  const dark = theme === "dark";
  const bgTop = dark ? "#151a23" : "#f7f7f4";
  const bgBot = dark ? "#080a0e" : "#e6e5df";
  const floor = dark ? "#0b0e13" : "#dedcd4";
  return {
    defs: `
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${bgTop}"/>
      <stop offset="100%" stop-color="${bgBot}"/>
    </linearGradient>
    <radialGradient id="spot" cx="0.5" cy="0.28" r="0.75">
      <stop offset="0%" stop-color="${dark ? "#4a5568" : "#ffffff"}" stop-opacity="${dark ? 0.16 : 0.95}"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="floorg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${floor}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${floor}" stop-opacity="0.4"/>
    </linearGradient>
    <radialGradient id="contact" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#000" stop-opacity="${dark ? 0.75 : 0.35}"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
    <filter id="drop" x="-30%" y="-30%" width="160%" height="170%">
      <feDropShadow dx="0" dy="26" stdDeviation="26" flood-color="#000" flood-opacity="${dark ? 0.6 : 0.22}"/>
    </filter>`,
    bg: `
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#spot)"/>
    <rect y="${H * 0.76}" width="${W}" height="${H * 0.24}" fill="url(#floorg)"/>`,
    shadow: (cx, cy, rw, rh = 26) =>
      `<ellipse cx="${cx}" cy="${cy}" rx="${rw}" ry="${rh}" fill="url(#contact)"/>`,
  };
}

/** Sahna markazdan biroz kattalashtiriladi — mahsulot kadrni to'ldirsin */
const ZOOM = 1.16;

function wrap(defs, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
<defs>${defs}</defs>
<g transform="translate(${W / 2} ${H / 2}) scale(${ZOOM}) translate(${-W / 2} ${-H / 2})">
${body}
</g>
</svg>`;
}

/** Horizontal slat curtain — roller shutters / roller cabinets / roller gates */
function slats(x, y, w, h, colors, slatH = 26) {
  const g = uid("m");
  const rows = Math.max(4, Math.floor(h / slatH));
  const sh = h / rows;
  let out = `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${g})" rx="3"/>`;
  for (let i = 0; i < rows; i++) {
    const yy = y + i * sh;
    out += `<rect x="${x}" y="${yy}" width="${w}" height="${sh}" fill="none" stroke="rgb(0 0 0 / .30)" stroke-width="1.6"/>`;
    out += `<rect x="${x}" y="${yy + sh * 0.12}" width="${w}" height="${sh * 0.2}" fill="rgb(255 255 255 / .22)"/>`;
    out += `<rect x="${x}" y="${yy + sh * 0.74}" width="${w}" height="${sh * 0.16}" fill="rgb(0 0 0 / .14)"/>`;
  }
  out += `</g>`;
  return { defs: defsMetal(g, colors, 96), body: out };
}

/** Vertical bar grille — panjara / fences / sliding gates */
function bars(x, y, w, h, colors, count = 14) {
  const g = uid("m");
  const gap = w / count;
  const bw = gap * 0.34;
  let out = `<g>`;
  for (let i = 0; i < count; i++) {
    const bx = x + i * gap + (gap - bw) / 2;
    out += `<rect x="${bx}" y="${y}" width="${bw}" height="${h}" fill="url(#${g})" rx="${bw / 2}"/>`;
  }
  out += `</g>`;
  return { defs: defsMetal(g, colors, 0), body: out };
}

/** Sectional gate — stacked panels with grooves */
function panels(x, y, w, h, colors, rows = 4, windows = false) {
  const g = uid("m");
  const ph = h / rows;
  let out = `<g>`;
  for (let i = 0; i < rows; i++) {
    const yy = y + i * ph;
    out += `<rect x="${x}" y="${yy}" width="${w}" height="${ph}" fill="url(#${g})" rx="4"/>`;
    out += `<rect x="${x}" y="${yy}" width="${w}" height="${ph}" fill="none" stroke="rgb(0 0 0 / .34)" stroke-width="2"/>`;
    // ribs
    for (let k = 1; k <= 3; k++) {
      const ry = yy + (ph / 4) * k;
      out += `<line x1="${x + 6}" y1="${ry}" x2="${x + w - 6}" y2="${ry}" stroke="rgb(0 0 0 / .16)" stroke-width="2"/>`;
      out += `<line x1="${x + 6}" y1="${ry + 2.5}" x2="${x + w - 6}" y2="${ry + 2.5}" stroke="rgb(255 255 255 / .18)" stroke-width="1.6"/>`;
    }
    if (windows && i === 1) {
      const cols = 4;
      const wW = w / (cols + 2);
      for (let c = 0; c < cols; c++) {
        const wx = x + wW * 0.9 + c * (wW * 1.05);
        out += `<rect x="${wx}" y="${yy + ph * 0.22}" width="${wW * 0.86}" height="${ph * 0.56}" rx="5" fill="#11202b" opacity=".9"/>`;
        out += `<rect x="${wx}" y="${yy + ph * 0.22}" width="${wW * 0.86}" height="${ph * 0.56}" rx="5" fill="none" stroke="rgb(255 255 255 / .35)" stroke-width="2"/>`;
        out += `<path d="M${wx + 4} ${yy + ph * 0.74} L${wx + wW * 0.5} ${yy + ph * 0.24}" stroke="rgb(255 255 255 / .28)" stroke-width="6" stroke-linecap="round"/>`;
      }
    }
  }
  out += `</g>`;
  return { defs: defsMetal(g, colors, 96), body: out };
}

/** Wire-mesh panel — kladovye / storage cages */
function mesh(x, y, w, h, colors, cell = 34) {
  const g = uid("m");
  const p = uid("p");
  const defs = `${defsMetal(g, colors, 40)}
  <pattern id="${p}" width="${cell}" height="${cell}" patternUnits="userSpaceOnUse">
    <path d="M0 0 H${cell} M0 0 V${cell}" stroke="url(#${g})" stroke-width="4"/>
  </pattern>`;
  const body = `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#0f1319" opacity=".18"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${p})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="url(#${g})" stroke-width="12"/>
  </g>`;
  return { defs, body };
}

/** Simple frame around an opening */
function frame(x, y, w, h, colors, t = 18) {
  const g = uid("m");
  const body = `<g>
    <rect x="${x - t}" y="${y - t}" width="${w + t * 2}" height="${h + t * 2}" fill="url(#${g})" rx="4"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#0b0e13" opacity=".92"/>
  </g>`;
  return { defs: defsMetal(g, colors, 45), body };
}

/* ---------------- scene builders ---------------- */

function sceneRollerCabinet(colors, theme = "light") {
  const s = studio(theme);
  const x = 300,
    y = 170,
    w = 600,
    h = 500;
  const box = uid("m");
  const cur = slats(x + 20, y + 26, w - 40, h - 52, colors, 30);
  const defs = `${s.defs}${defsMetal(box, colors, 45)}${cur.defs}`;
  const body = `${s.bg}
  ${s.shadow(600, y + h + 16, 330, 28)}
  <g filter="url(#drop)">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="url(#${box})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="none" stroke="rgb(0 0 0 / .28)" stroke-width="2"/>
    <rect x="${x + 14}" y="${y + 14}" width="${w - 28}" height="${h - 28}" rx="4" fill="#0d1116" opacity=".55"/>
    ${cur.body}
    <rect x="${x + 20}" y="${y + h - 42}" width="${w - 40}" height="16" rx="4" fill="rgb(0 0 0 / .45)"/>
    <rect x="${x + w / 2 - 46}" y="${y + h - 38}" width="92" height="9" rx="4.5" fill="rgb(255 255 255 / .55)"/>
  </g>
  <rect x="${x + 24}" y="${y + h + 8}" width="26" height="26" rx="4" fill="rgb(0 0 0 / .35)"/>
  <rect x="${x + w - 50}" y="${y + h + 8}" width="26" height="26" rx="4" fill="rgb(0 0 0 / .35)"/>`;
  return wrap(defs, body);
}

function sceneRollerShutter(colors, theme = "light") {
  const s = studio(theme);
  const x = 330,
    y = 130,
    w = 540,
    h = 560;
  const f = frame(x, y, w, h, METALS.graphite, 20);
  const cur = slats(x, y, w, h * 0.66, colors, 24);
  const boxg = uid("m");
  const defs = `${s.defs}${f.defs}${cur.defs}${defsMetal(boxg, colors, 45)}`;
  const body = `${s.bg}
  ${s.shadow(600, y + h + 34, 300, 26)}
  <g filter="url(#drop)">
    ${f.body}
    ${cur.body}
    <rect x="${x - 26}" y="${y - 60}" width="${w + 52}" height="62" rx="6" fill="url(#${boxg})"/>
    <rect x="${x - 26}" y="${y - 60}" width="${w + 52}" height="62" rx="6" fill="none" stroke="rgb(0 0 0 / .3)" stroke-width="2"/>
    <rect x="${x}" y="${y + h * 0.66 - 16}" width="${w}" height="18" rx="4" fill="rgb(0 0 0 / .5)"/>
  </g>`;
  return wrap(defs, body);
}

function sceneSectional(colors, theme = "light", windows = true) {
  const s = studio(theme);
  const x = 290,
    y = 150,
    w = 620,
    h = 540;
  const f = frame(x, y, w, h, METALS.anthracite, 16);
  const p = panels(x, y, w, h, colors, 4, windows);
  const defs = `${s.defs}${f.defs}${p.defs}`;
  const body = `${s.bg}
  ${s.shadow(600, y + h + 26, 320, 26)}
  <g filter="url(#drop)">
    ${f.body}
    ${p.body}
    <rect x="${x + w / 2 - 40}" y="${y + h * 0.78}" width="80" height="12" rx="6" fill="rgb(255 255 255 / .5)"/>
  </g>
  <g opacity=".55">
    <rect x="${x - 16}" y="${y - 64}" width="${w + 32}" height="12" rx="6" fill="#2b3341"/>
    <circle cx="${x + w / 2}" cy="${y - 96}" r="26" fill="#2b3341"/>
    <rect x="${x + w / 2 - 6}" y="${y - 96}" width="12" height="40" fill="#2b3341"/>
  </g>`;
  return wrap(defs, body);
}

function sceneSlidingGate(colors, theme = "light") {
  const s = studio(theme);
  const x = 210,
    y = 220,
    w = 800,
    h = 400;
  const b = bars(x + 24, y + 40, w - 48, h - 80, colors, 22);
  const fr = uid("m");
  const defs = `${s.defs}${b.defs}${defsMetal(fr, colors, 45)}`;
  const body = `${s.bg}
  ${s.shadow(610, y + h + 22, 380, 24)}
  <g filter="url(#drop)">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="none" stroke="url(#${fr})" stroke-width="26"/>
    <rect x="${x}" y="${y + h * 0.5 - 9}" width="${w}" height="18" fill="url(#${fr})"/>
    ${b.body}
  </g>
  <rect x="${x - 40}" y="${y + h + 16}" width="${w + 80}" height="14" rx="7" fill="#2b3341" opacity=".6"/>
  <circle cx="${x + 70}" cy="${y + h + 40}" r="20" fill="#20262f" opacity=".8"/>
  <circle cx="${x + w - 70}" cy="${y + h + 40}" r="20" fill="#20262f" opacity=".8"/>`;
  return wrap(defs, body);
}

function sceneSwingGate(colors, theme = "light") {
  const s = studio(theme);
  const x = 260,
    y = 190,
    w = 680,
    h = 470;
  const half = w / 2 - 10;
  const b1 = bars(x + 22, y + 34, half - 44, h - 68, colors, 9);
  const b2 = bars(x + w / 2 + 32, y + 34, half - 44, h - 68, colors, 9);
  const fr = uid("m");
  const defs = `${s.defs}${b1.defs}${b2.defs}${defsMetal(fr, colors, 45)}`;
  const body = `${s.bg}
  ${s.shadow(600, y + h + 20, 340, 24)}
  <g filter="url(#drop)">
    <rect x="${x}" y="${y}" width="${half}" height="${h}" rx="6" fill="none" stroke="url(#${fr})" stroke-width="22"/>
    <rect x="${x + w / 2 + 10}" y="${y}" width="${half}" height="${h}" rx="6" fill="none" stroke="url(#${fr})" stroke-width="22"/>
    ${b1.body}${b2.body}
    <path d="M${x + 22} ${y + 120} Q${x + half / 2} ${y + 60} ${x + half - 12} ${y + 120}" fill="none" stroke="url(#${fr})" stroke-width="12"/>
    <path d="M${x + w / 2 + 32} ${y + 120} Q${x + w / 2 + 10 + half / 2} ${y + 60} ${x + w - 12} ${y + 120}" fill="none" stroke="url(#${fr})" stroke-width="12"/>
  </g>
  <rect x="${x - 46}" y="${y - 20}" width="34" height="${h + 40}" rx="5" fill="#242a34"/>
  <rect x="${x + w + 12}" y="${y - 20}" width="34" height="${h + 40}" rx="5" fill="#242a34"/>`;
  return wrap(defs, body);
}

function sceneGrille(colors, theme = "light") {
  const s = studio(theme);
  const x = 300,
    y = 170,
    w = 600,
    h = 500;
  const b = bars(x, y + 30, w, h - 30, colors, 13);
  const fr = uid("m");
  const defs = `${s.defs}${b.defs}${defsMetal(fr, colors, 45)}`;
  let tips = "";
  const gap = w / 13;
  for (let i = 0; i < 13; i++) {
    const cx = x + i * gap + gap / 2;
    tips += `<path d="M${cx - 13} ${y + 34} L${cx} ${y} L${cx + 13} ${y + 34} Z" fill="url(#${fr})"/>`;
  }
  const body = `${s.bg}
  ${s.shadow(600, y + h + 18, 320, 22)}
  <g filter="url(#drop)">
    ${b.body}${tips}
    <rect x="${x - 10}" y="${y + 110}" width="${w + 20}" height="16" rx="8" fill="url(#${fr})"/>
    <rect x="${x - 10}" y="${y + h - 90}" width="${w + 20}" height="16" rx="8" fill="url(#${fr})"/>
  </g>`;
  return wrap(defs, body);
}

function sceneStorageCage(colors, theme = "light") {
  const s = studio(theme);
  const x = 250,
    y = 180,
    w = 700,
    h = 480;
  const m = mesh(x, y, w, h, colors, 40);
  const fr = uid("m");
  const defs = `${s.defs}${m.defs}${defsMetal(fr, colors, 45)}`;
  const body = `${s.bg}
  ${s.shadow(600, y + h + 20, 340, 24)}
  <g filter="url(#drop)">
    ${m.body}
    <rect x="${x + w * 0.55}" y="${y + 10}" width="${w * 0.4}" height="${h - 20}" fill="none" stroke="url(#${fr})" stroke-width="9"/>
    <circle cx="${x + w * 0.6}" cy="${y + h / 2}" r="11" fill="url(#${fr})"/>
    <rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="18" rx="6" fill="url(#${fr})"/>
  </g>`;
  return wrap(defs, body);
}

function sceneRattanChair(theme = "light") {
  const s = studio(theme);
  const g = uid("m");
  const w2 = uid("m");
  const defs = `${s.defs}${defsMetal(g, METALS.woodgrain, 60)}${defsMetal(w2, ["#f3efe4", "#ddd6c4", "#b8b0a0", "#fbf8f1"], 60)}`;
  let weave = "";
  for (let i = 0; i < 22; i++) {
    weave += `<path d="M${430 + i * 16} 300 Q${420 + i * 16} 430 ${446 + i * 16} 560" stroke="rgb(0 0 0 / .12)" stroke-width="3" fill="none"/>`;
  }
  const body = `${s.bg}
  ${s.shadow(600, 700, 250, 22)}
  <g filter="url(#drop)">
    <path d="M420 560 Q400 330 470 262 Q600 200 730 262 Q800 330 780 560 Z" fill="url(#${g})"/>
    <path d="M420 560 Q400 330 470 262 Q600 200 730 262 Q800 330 780 560 Z" fill="none" stroke="rgb(0 0 0 / .3)" stroke-width="6"/>
    <g clip-path="none" opacity=".55">${weave}</g>
    <rect x="440" y="520" width="320" height="66" rx="26" fill="url(#${w2})"/>
    <rect x="440" y="520" width="320" height="66" rx="26" fill="none" stroke="rgb(0 0 0 / .18)" stroke-width="3"/>
    <rect x="470" y="586" width="20" height="110" rx="9" fill="url(#${g})"/>
    <rect x="710" y="586" width="20" height="110" rx="9" fill="url(#${g})"/>
  </g>`;
  return wrap(defs, body);
}

function sceneShelving(theme = "light") {
  const s = studio(theme);
  const m = uid("m");
  const wd = uid("m");
  const defs = `${s.defs}${defsMetal(m, METALS.anthracite, 0)}${defsMetal(wd, METALS.woodgrain, 96)}`;
  let shelves = "";
  for (let i = 0; i < 4; i++) {
    const y = 250 + i * 110;
    shelves += `<rect x="330" y="${y}" width="540" height="24" rx="4" fill="url(#${wd})"/>
    <rect x="330" y="${y + 24}" width="540" height="7" fill="rgb(0 0 0 / .28)"/>`;
  }
  const body = `${s.bg}
  ${s.shadow(600, 700, 280, 22)}
  <g filter="url(#drop)">
    <rect x="316" y="200" width="22" height="500" rx="4" fill="url(#${m})"/>
    <rect x="862" y="200" width="22" height="500" rx="4" fill="url(#${m})"/>
    <rect x="316" y="200" width="568" height="18" rx="4" fill="url(#${m})"/>
    ${shelves}
    <path d="M338 218 L862 690 M862 218 L338 690" stroke="url(#${m})" stroke-width="8" opacity=".35"/>
  </g>`;
  return wrap(defs, body);
}

function sceneBollard(theme = "light") {
  const s = studio(theme);
  const m = uid("m");
  const defs = `${s.defs}${defsMetal(m, METALS.golden, 0)}`;
  const body = `${s.bg}
  ${s.shadow(600, 700, 190, 20)}
  <g filter="url(#drop)">
    <rect x="540" y="230" width="120" height="450" rx="60" fill="url(#${m})"/>
    <rect x="520" y="640" width="160" height="52" rx="14" fill="#2a303b"/>
    <rect x="540" y="290" width="120" height="26" fill="rgb(0 0 0 / .35)"/>
    <rect x="540" y="360" width="120" height="26" fill="rgb(0 0 0 / .35)"/>
    <circle cx="600" cy="248" r="46" fill="url(#${m})"/>
  </g>`;
  return wrap(defs, body);
}

/* ---------------- catalogue of renders ---------------- */

const FILES = {
  // roller cabinets
  "shkaf-parking-graphite": () => sceneRollerCabinet(METALS.graphite, "light"),
  "shkaf-parking-white": () => sceneRollerCabinet(METALS.white, "light"),
  "shkaf-garage-brown": () => sceneRollerCabinet(METALS.brown, "light"),
  "shkaf-balcony-silver": () => sceneRollerCabinet(METALS.silver, "light"),
  "shkaf-dark": () => sceneRollerCabinet(METALS.anthracite, "dark"),

  // roller shutter systems
  "rolstavni-silver": () => sceneRollerShutter(METALS.silver, "light"),
  "rolstavni-anthracite": () => sceneRollerShutter(METALS.anthracite, "light"),
  "rolstavni-golden": () => sceneRollerShutter(METALS.golden, "light"),
  "rolstavni-dark": () => sceneRollerShutter(METALS.graphite, "dark"),

  // gates
  "vorota-sectional-white": () => sceneSectional(METALS.white, "light", true),
  "vorota-sectional-brown": () => sceneSectional(METALS.brown, "light", false),
  "vorota-sectional-dark": () => sceneSectional(METALS.anthracite, "dark", true),
  "vorota-roll-silver": () => sceneRollerShutter(METALS.silver, "dark"),
  "vorota-sliding": () => sceneSlidingGate(METALS.anthracite, "light"),
  "vorota-swing": () => sceneSwingGate(METALS.graphite, "light"),

  // grilles & fences
  "panjara-classic": () => sceneGrille(METALS.anthracite, "light"),
  "panjara-golden": () => sceneGrille(METALS.golden, "light"),

  // storage cages
  "kladovaya-mesh": () => sceneStorageCage(METALS.silver, "light"),
  "kladovaya-dark": () => sceneStorageCage(METALS.graphite, "dark"),

  // furniture & metal goods
  "rotang-chair": () => sceneRattanChair("light"),
  "rotang-set": () => sceneRattanChair("dark"),
  "metall-shelving": () => sceneShelving("light"),
  "metall-bollard": () => sceneBollard("light"),
};

let n = 0;
for (const [name, fn] of Object.entries(FILES)) {
  writeFileSync(resolve(OUT, `${name}.svg`), fn(), "utf8");
  n++;
}
console.log(`✓ ${n} product renders → public/products`);
