import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "c1",
    slug: "rolletli-shkaflar",
    name: { uz: "Roletli shkaflar", ru: "Роллетные шкафы" },
    short: {
      uz: "Parking, garaj, balkon va dacha uchun yopiq saqlash shkaflari",
      ru: "Закрытые шкафы хранения для паркинга, гаража, балкона и дачи",
    },
    icon: "Archive",
    image: "/products/shkaf-parking-graphite.svg",
    order: 1,
  },
  {
    id: "c2",
    slug: "rolstavnilar",
    name: { uz: "Rolstavnilar", ru: "Рольставни" },
    short: {
      uz: "Deraza, eshik va peshtoq uchun roletli tizimlar",
      ru: "Роллетные системы для окон, дверей и витрин",
    },
    icon: "Blinds",
    image: "/products/rolstavni-silver.svg",
    order: 2,
  },
  {
    id: "c3",
    slug: "darvozalar",
    name: { uz: "Darvozalar va avtomatika", ru: "Ворота и автоматика" },
    short: {
      uz: "Seksion, roletli, otkatnoy va sving darvozalar + avtomatika",
      ru: "Секционные, роллетные, откатные и распашные ворота + автоматика",
    },
    icon: "DoorOpen",
    image: "/products/vorota-sectional-white.svg",
    order: 3,
  },
  {
    id: "c4",
    slug: "panjaralar",
    name: { uz: "Panjaralar va to'siqlar", ru: "Решётки и ограждения" },
    short: {
      uz: "Deraza panjaralari, hovli to'siqlari, dekorativ elementlar",
      ru: "Оконные решётки, ограждения двора, декоративные элементы",
    },
    icon: "Grid2x2",
    image: "/products/panjara-classic.svg",
    order: 4,
  },
  {
    id: "c5",
    slug: "omborxonalar",
    name: { uz: "Omborxona to'siqlari", ru: "Кладовые и ограждения" },
    short: {
      uz: "Parkingdagi to'rli omborxonalar va mototsikl bokslari",
      ru: "Сетчатые кладовые в паркинге и мотобоксы",
    },
    icon: "Boxes",
    image: "/products/kladovaya-mesh.svg",
    order: 5,
  },
  {
    id: "c6",
    slug: "metall-buyumlar",
    name: { uz: "Metall buyumlar va mebel", ru: "Изделия и мебель из металла" },
    short: {
      uz: "LOFT stellajlar, skameykalar, zinapoyalar, parking to'siqlari",
      ru: "LOFT стеллажи, скамейки, лестницы, парковочные столбики",
    },
    icon: "Hammer",
    image: "/products/metall-shelving.svg",
    order: 6,
  },
  {
    id: "c7",
    slug: "rotang-mebel",
    name: { uz: "Rotangdan mebel", ru: "Мебель из ротанга" },
    short: {
      uz: "Bog', terasa va dacha uchun sun'iy rotang mebellari",
      ru: "Мебель из искусственного ротанга для сада, террасы и дачи",
    },
    icon: "Armchair",
    image: "/products/rotang-chair.svg",
    order: 7,
  },
  {
    id: "c8",
    slug: "butlovchi-qismlar",
    name: { uz: "Butlovchi qismlar", ru: "Комплектующие" },
    short: {
      uz: "Profil, val, pult, motor va boshqa ehtiyot qismlar",
      ru: "Профиль, вал, пульт, мотор и прочие запчасти",
    },
    icon: "Settings2",
    image: "/products/metall-bollard.svg",
    order: 8,
  },
];

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);
