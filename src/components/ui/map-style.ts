/**
 * Xarita uchun umumiy uslub — `BranchMap` (aloqa sahifasi, bitta nuqta) va
 * `ShowroomsMap` (bosh sahifa, barcha shou-rumlar) shu yerdan oladi.
 *
 * Fon — OpenFreeMap Positron: ochiq kulrang vektor xarita. API kalit,
 * ro'yxatdan o'tish va so'rov limiti yo'q, tijoriy foydalanish ruxsat etilgan.
 * Leaflet'ga @maplibre/maplibre-gl-leaflet orqali ulanadi (OpenFreeMap'ning
 * Leaflet uchun tavsiya qilgan usuli).
 *
 * Avval CARTO Positron raster plitkalari edi, lekin 2026-yil sentabrdan CARTO
 * kalitsiz so'rovlarga "API KEY REQUIRED" suv belgisini qo'ya boshladi.
 */

export const MAP_STYLE = "https://tiles.openfreemap.org/styles/positron";

/**
 * `el` ekranga yaqinlashganda `init` ni bir marta chaqiradi.
 * MapLibre ~270 KB (gzip) — u sahifa ochilganda emas, xarita ko'rinishiga
 * yaqin qolganda yuklanadi; bosh sahifa tezligiga ta'sir qilmaydi.
 * Qaytgan funksiya kuzatuvni to'xtatadi (effekt tozalanishi uchun).
 */
export function whenNearViewport(el: Element, init: () => void, margin = "400px") {
  if (typeof IntersectionObserver === "undefined") {
    init();
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        init();
      }
    },
    { rootMargin: `${margin} 0px` },
  );
  io.observe(el);
  return () => io.disconnect();
}

/** OpenFreeMap talab qiladigan atributsiya */
export const MAP_ATTRIBUTION =
  '<a href="https://openfreemap.org" target="_blank" rel="noreferrer">OpenFreeMap</a> ' +
  '<a href="https://www.openmaptiles.org/" target="_blank" rel="noreferrer">© OpenMapTiles</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap</a>';

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
