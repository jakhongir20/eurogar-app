/** Bitta joydan boshqariladigan kompaniya ma'lumotlari — keyin admin paneldan tahrirlanadi */
export const site = {
  name: "EUROGAR",
  domain: "eurogar.uz",
  tagline: { uz: "Qulaylikni birga yaratamiz", ru: "Создаём удобство вместе" },
  phones: ["+998 90 123 45 67", "+998 71 200 70 44"],
  email: "info@eurogar.uz",
  telegram: "https://t.me/eurogar_uz",
  instagram: "https://instagram.com/eurogar.uz",
  facebook: "https://facebook.com/eurogar.uz",
  youtube: "https://youtube.com/@eurogar",
  whatsapp: "https://wa.me/998901234567",
  /* Yandex xarita uchun koordinatalar (Toshkent) */
  geo: { lat: 41.2995, lng: 69.324 },
  mapUrl: "https://yandex.uz/maps/?ll=69.324%2C41.2995&z=16",
  stats: {
    years: 20,
    warranty: 10,
    projects: 200,
    staff: 85,
    area: 4200,
  },
} as const;

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
