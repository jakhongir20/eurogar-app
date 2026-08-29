import type { I18nText } from "./types";

/** Bitta joydan boshqariladigan kompaniya ma'lumotlari — keyin admin paneldan tahrirlanadi */
export const site = {
  name: "EUROGAR",
  domain: "eurogar.uz",
  tagline: { uz: "Qulaylikni birga yaratamiz", ru: "Создаём удобство вместе" },
  phones: ["+998 91 888 02 01", "+998 90 888 02 01", "+998 77 517 02 01"],
  email: "info@eurogar.uz",
  telegram: "https://t.me/eurogar_uz",
  instagram: "https://www.instagram.com/eurogar_uz",
  facebook: "https://www.facebook.com/profile.php?id=100082077561893",
  youtube: "https://www.youtube.com/@eurogaruz",
  stats: {
    /** O'zbekiston bozorida 8 yildan buyon */
    years: 8,
    /** Kafolat: mahsulot turiga qarab 1–5 yil */
    warrantyMax: 5,
    /** Kelishuvdan so'ng 3–7 kun ichida yetkazib, o'rnatib beriladi */
    deliveryDaysMin: 3,
    deliveryDaysMax: 7,
  },
} as const;

/* ─────────────── Filiallar ─────────────── */

export interface Branch {
  id: string;
  city: I18nText;
  /** Google Maps koordinatalari */
  lat: number;
  lng: number;
  mapUrl: string;
  phone: string;
  main?: boolean;
}

export const branches: Branch[] = [
  {
    id: "tashkent",
    city: { uz: "Toshkent", ru: "Ташкент" },
    lat: 41.284989,
    lng: 69.359723,
    mapUrl: "https://maps.google.com/maps?q=41.284989,69.359723",
    phone: "+998 91 888 02 01",
    main: true,
  },
  {
    id: "jizzakh",
    city: { uz: "Jizzax", ru: "Джизак" },
    lat: 40.162338,
    lng: 67.83664,
    mapUrl: "https://www.google.com/maps?q=40.162338,67.836640",
    phone: "+998 90 888 02 01",
  },
  {
    id: "samarkand",
    city: { uz: "Samarqand", ru: "Самарканд" },
    lat: 39.675902,
    lng: 66.948031,
    mapUrl: "https://www.google.com/maps?q=39.675902,66.948031",
    phone: "+998 77 517 02 01",
  },
];

/* ─────────────── Hamkorlar ─────────────── */

export const partners = [
  { id: "akfa", name: "AKFA" },
  { id: "engelberg", name: "ENGELBERG" },
  { id: "alutech", name: "ALUTECH" },
  { id: "doorhan", name: "DOORHAN" },
] as const;

/* ─────────────── Video otzivlar (YouTube Shorts) ─────────────── */

export const videoReviews = [
  "0Q6Al2Pzq2k",
  "m2rcyIP_Rvs",
  "t1p77SXR4NY",
  "g2Kk5mLIb84",
  "E57qEHeKqFA",
  "KfY9x6TTHcY",
  "KqsxwFev49w",
  "_-5TiilkqpE",
  "FbSECnijAYo",
] as const;

export const regionKeys = [
  "tashkent",
  "tashkentRegion",
  "andijan",
  "bukhara",
  "fergana",
  "jizzakh",
  "khorezm",
  "namangan",
  "navoiy",
  "kashkadarya",
  "samarkand",
  "sirdarya",
  "surkhandarya",
  "karakalpakstan",
] as const;
