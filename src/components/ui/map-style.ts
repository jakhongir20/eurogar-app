/**
 * Xarita uchun umumiy uslub — `BranchMap` (aloqa sahifasi, bitta nuqta) va
 * `ShowroomsMap` (bosh sahifa, barcha shou-rumlar) shu yerdan oladi.
 *
 * CARTO Positron plitkalari: ochiq kulrang, API kalit talab qilmaydi.
 */

export const MAP_TILES =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

export const MAP_ATTRIBUTION =
  '<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap</a> © CARTO';

/** Tomchi shaklidagi pin. Rang berilmasa — brend siyani. */
export function pinSvg(fill = "#29ABE2", stroke = "#08303F") {
  return `
<svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17 1C8.4 1 1.5 7.9 1.5 16.4 1.5 27.9 17 43 17 43s15.5-15.1 15.5-26.6C32.5 7.9 25.6 1 17 1Z"
        fill="${fill}" stroke="${stroke}" stroke-width="2"/>
  <circle cx="17" cy="16.5" r="6.2" fill="#FFFFFF"/>
  <circle cx="17" cy="16.5" r="2.6" fill="${stroke}"/>
</svg>`;
}

/** Tanlangan nuqta — siyan, pulsli soya bilan */
export const activePinHtml = () =>
  `<span class="eg-pin"><span class="eg-pin__pulse"></span>${pinSvg()}</span>`;

/** Tanlanmagan nuqta — bosiq kulrang-ko'k, pulssiz */
export const idlePinHtml = () =>
  `<span class="eg-pin eg-pin--idle">${pinSvg("#94A9B7", "#0B4A63")}</span>`;
