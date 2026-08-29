import type { Category } from "@/lib/types";

/**
 * 7 ta rasmiy toifa — kompaniya bergan ro'yxat asosida.
 * Tavsiflar ham berilgan matnlardan olingan.
 */
export const categories: Category[] = [
  {
    id: "c1",
    slug: "rolstavniy-darvoza",
    name: { uz: "Rolstavniy darvoza", ru: "Рольставни (роллетные ворота)" },
    short: {
      uz: "Yuqoriga o'ralib ochiladigan metall darvoza — garaj, do'kon, ombor va zavodlar uchun",
      ru: "Металлические ворота, сворачивающиеся вверх — для гаражей, магазинов, складов и заводов",
    },
    icon: "Blinds",
    image: "/products/rolstavniy-darvoza.webp",
    order: 1,
  },
  {
    id: "c2",
    slug: "seksion-darvoza",
    name: { uz: "Seksion darvoza", ru: "Секционные ворота" },
    short: {
      uz: "Seksiyalardan iborat, yuqoriga ko'tarilib ochiladigan darvoza — garaj, sanoat binolari, logistika markazlari uchun",
      ru: "Ворота из секций, поднимающиеся вверх — для гаражей, промышленных зданий и логистических центров",
    },
    icon: "PanelTop",
    image: "/products/seksion-darvoza.webp",
    order: 2,
  },
  {
    id: "c3",
    slug: "otkatnoy-darvoza",
    name: { uz: "Otkatnoy darvoza", ru: "Откатные ворота" },
    short: {
      uz: "Yon tomonga surilib ochiladigan darvoza — hovli, korxona, ombor va sanoat obyektlari uchun",
      ru: "Ворота, откатывающиеся в сторону — для дворов, предприятий, складов и промышленных объектов",
    },
    icon: "ArrowLeftRight",
    image: "/products/otkatnoy-darvoza.webp",
    order: 3,
  },
  {
    id: "c4",
    slug: "shlagbaum",
    name: { uz: "Shlagbaum", ru: "Шлагбаумы" },
    short: {
      uz: "Transport harakatini boshqaruvchi gorizontal to'siq — avtoturargoh, zavod va turar-joy majmualari uchun",
      ru: "Горизонтальный барьер для контроля транспорта — для парковок, заводов и жилых комплексов",
    },
    icon: "Construction",
    image: "/products/shlagbaum.svg",
    order: 4,
  },
  {
    id: "c5",
    slug: "bollard",
    name: { uz: "Bollard", ru: "Боллард" },
    short: {
      uz: "Avtomobillar harakatini cheklovchi mustahkam metall ustun — piyodalar zonasi, bank va savdo markazlari uchun",
      ru: "Прочный металлический столб для ограничения движения — для пешеходных зон, банков и торговых центров",
    },
    icon: "CircleDot",
    image: "/products/bollard.svg",
    order: 5,
  },
  {
    id: "c6",
    slug: "antitarran",
    name: { uz: "Antitarran", ru: "Антитаран" },
    short: {
      uz: "Avtomobilning majburiy kirib kelishini to'xtatuvchi kuchaytirilgan to'siq — elchixona, aeroport va muhim obyektlar uchun",
      ru: "Усиленный барьер против принудительного въезда — для посольств, аэропортов и важных объектов",
    },
    icon: "ShieldAlert",
    image: "/products/antitarran.webp",
    order: 6,
  },
  {
    id: "c7",
    slug: "maxsus-eshiklar",
    name: { uz: "Maxsus eshiklar", ru: "Специальные двери" },
    short: {
      uz: "Yong'in, o'q va boshqa xavflardan himoyalovchi mustahkam eshiklar — bank, server xonasi va maxsus obyektlar uchun",
      ru: "Прочные двери для защиты от огня, пуль и других угроз — для банков, серверных и спецобъектов",
    },
    icon: "DoorClosed",
    image: "/products/maxsus-eshik.webp",
    order: 7,
  },
];

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);
