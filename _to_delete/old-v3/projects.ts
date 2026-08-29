import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "pr1",
    slug: "tashkent-city-parking",
    title: {
      uz: "Tashkent City — yer osti parkingi",
      ru: "Tashkent City — подземный паркинг",
    },
    summary: {
      uz: "184 ta roletli shkaf va 40 ta to'rli omborxona. Loyihalash, ishlab chiqarish va o'rnatish 6 hafta ichida yakunlandi.",
      ru: "184 роллетных шкафа и 40 сетчатых кладовых. Проектирование, производство и монтаж завершены за 6 недель.",
    },
    location: { uz: "Toshkent, Yashnobod", ru: "Ташкент, Яшнабад" },
    year: 2025,
    cover: "/products/shkaf-parking-graphite.svg",
    gallery: [
      "/products/shkaf-parking-graphite.svg",
      "/products/shkaf-dark.svg",
      "/products/kladovaya-mesh.svg",
    ],
    categorySlug: "rolletli-shkaflar",
  },
  {
    id: "pr2",
    slug: "avtosalon-panoramik",
    title: {
      uz: "Avtosalon — panoramik darvozalar",
      ru: "Автосалон — панорамные ворота",
    },
    summary: {
      uz: "6 ta panoramik seksion darvoza, har biri 4,5 m kenglikda. Sanoat avtomatikasi va avariya rejimi bilan.",
      ru: "6 панорамных секционных ворот шириной 4,5 м каждые. С промышленной автоматикой и аварийным режимом.",
    },
    location: { uz: "Toshkent, Chilonzor", ru: "Ташкент, Чиланзар" },
    year: 2025,
    cover: "/products/vorota-sectional-dark.svg",
    gallery: [
      "/products/vorota-sectional-dark.svg",
      "/products/vorota-sectional-white.svg",
    ],
    categorySlug: "darvozalar",
  },
  {
    id: "pr3",
    slug: "turar-joy-majmuasi",
    title: {
      uz: "Turar-joy majmuasi — hovli to'siqlari",
      ru: "Жилой комплекс — ограждения двора",
    },
    summary: {
      uz: "420 pog'onametr dekorativ panjara va 3 ta otkatnoy darvoza. Buyurtmachining brend ranglariga bo'yalgan.",
      ru: "420 погонных метров декоративной решётки и 3 откатных ворот. Окрашено в фирменные цвета заказчика.",
    },
    location: { uz: "Samarqand", ru: "Самарканд" },
    year: 2024,
    cover: "/products/panjara-steel.svg",
    gallery: ["/products/panjara-steel.svg", "/products/vorota-sliding.svg"],
    categorySlug: "panjaralar",
  },
  {
    id: "pr4",
    slug: "savdo-markazi-rolstavni",
    title: {
      uz: "Savdo markazi — anti-vandal rolstavnilar",
      ru: "Торговый центр — антивандальные рольставни",
    },
    summary: {
      uz: "62 ta savdo nuqtasi uchun markazlashtirilgan boshqaruvli rolstavnilar. Bitta tugma bilan barchasi yopiladi.",
      ru: "Рольставни с централизованным управлением для 62 торговых точек. Все закрываются одной кнопкой.",
    },
    location: { uz: "Toshkent, Sergeli", ru: "Ташкент, Сергели" },
    year: 2024,
    cover: "/products/rolstavni-anthracite.svg",
    gallery: [
      "/products/rolstavni-anthracite.svg",
      "/products/rolstavni-silver.svg",
    ],
    categorySlug: "rolstavnilar",
  },
  {
    id: "pr5",
    slug: "xususiy-uy-terrassa",
    title: {
      uz: "Xususiy uy — terasa jihozlari",
      ru: "Частный дом — оснащение террасы",
    },
    summary: {
      uz: "Shaffof rolstavnilar, rotang mebel to'plami va metall zinapoya. Yagona uslubda bajarilgan.",
      ru: "Прозрачные рольставни, комплект мебели из ротанга и металлическая лестница. Выполнено в едином стиле.",
    },
    location: { uz: "Toshkent viloyati", ru: "Ташкентская область" },
    year: 2026,
    cover: "/products/rotang-set.svg",
    gallery: ["/products/rotang-set.svg", "/products/rolstavni-steel.svg"],
    categorySlug: "rotang-mebel",
  },
  {
    id: "pr6",
    slug: "logistika-markazi",
    title: {
      uz: "Logistika markazi — sanoat darvozalari",
      ru: "Логистический центр — промышленные ворота",
    },
    summary: {
      uz: "18 ta yuk tushirish doki uchun sanoat seksion darvozalari va dok-levellerlar.",
      ru: "Промышленные секционные ворота и док-левеллеры для 18 разгрузочных доков.",
    },
    location: { uz: "Toshkent, Zangiota", ru: "Ташкент, Зангиата" },
    year: 2026,
    cover: "/products/vorota-sectional-brown.svg",
    gallery: [
      "/products/vorota-sectional-brown.svg",
      "/products/vorota-sliding.svg",
    ],
    categorySlug: "darvozalar",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
