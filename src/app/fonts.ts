import localFont from "next/font/local";

/* ── Shriftlar ──────────────────────────────────────────────
   Loyiha ichida saqlanadi (Google Fonts'ga tashqi so'rov yo'q).

   MUHIM: har bir subset ALOHIDA e'lon qilinadi va o'z `unicode-range`
   ini oladi. Aks holda brauzer sahifaga kerak bo'lmagan subsetlarni ham
   yuklab oladi: o'zbekcha sahifaga kirill, ruschaga latin-ext va h.k.
   (avval har sahifada 6 ta fayl ~250KB tushardi).
   Faqat `latin` preload qilinadi (ikkala tilda ham interfeys uchun kerak);
   `cyrillic` va `latin-ext` preload QILINMAYDI — aks holda Next ularni ham
   <link rel=preload> bilan majburan yuklaydi va unicode-range foydasiz qoladi.
   Natija: uz → ~74KB, ru → ~119KB (avval har ikkisi ham 250KB edi).
   ------------------------------------------------------------ */


/* next/font talabi: har bir loader modul darajasida, to'g'ridan-to'g'ri
   va literal argumentlar bilan chaqirilishi shart — yordamchi funksiya
   ichida chaqirib bo'lmaydi. Shuning uchun oltita alohida e'lon. */

const manropeLatin = localFont({
  variable: "--f-sans-latin",
  display: "swap",
  src: [{ path: "../fonts/manrope-latin-wght-normal.woff2", weight: "200 800", style: "normal" }],
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191-2193,U+2212,U+2215,U+FEFF,U+FFFD" }],
});
const manropeCyr = localFont({
  variable: "--f-sans-cyr",
  display: "swap",
  /* preload YO'Q: bu subset faqat matnda mos belgi bo'lsa yuklanadi */
  preload: false,
  src: [{ path: "../fonts/manrope-cyrillic-wght-normal.woff2", weight: "200 800", style: "normal" }],
  declarations: [{ prop: "unicode-range", value: "U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116" }],
});
const manropeExt = localFont({
  variable: "--f-sans-ext",
  display: "swap",
  /* preload YO'Q: bu subset faqat matnda mos belgi bo'lsa yuklanadi */
  preload: false,
  src: [{ path: "../fonts/manrope-latin-ext-wght-normal.woff2", weight: "200 800", style: "normal" }],
  declarations: [{ prop: "unicode-range", value: "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF" }],
});

const unboundedLatin = localFont({
  variable: "--f-display-latin",
  display: "swap",
  src: [{ path: "../fonts/unbounded-latin-wght-normal.woff2", weight: "200 900", style: "normal" }],
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191-2193,U+2212,U+2215,U+FEFF,U+FFFD" }],
});
const unboundedCyr = localFont({
  variable: "--f-display-cyr",
  display: "swap",
  /* preload YO'Q: bu subset faqat matnda mos belgi bo'lsa yuklanadi */
  preload: false,
  src: [{ path: "../fonts/unbounded-cyrillic-wght-normal.woff2", weight: "200 900", style: "normal" }],
  declarations: [{ prop: "unicode-range", value: "U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116" }],
});
const unboundedExt = localFont({
  variable: "--f-display-ext",
  display: "swap",
  /* preload YO'Q: bu subset faqat matnda mos belgi bo'lsa yuklanadi */
  preload: false,
  src: [{ path: "../fonts/unbounded-latin-ext-wght-normal.woff2", weight: "200 900", style: "normal" }],
  declarations: [{ prop: "unicode-range", value: "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF" }],
});

/** Barcha subsetlar bitta klassda — globals.css ularni stack qilib ishlatadi */
export const fontVars = [
  manropeLatin.variable,
  manropeCyr.variable,
  manropeExt.variable,
  unboundedLatin.variable,
  unboundedCyr.variable,
  unboundedExt.variable,
].join(" ");

