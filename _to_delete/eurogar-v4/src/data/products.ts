import type { Product, Spec } from "@/lib/types";

const S = (
  luz: string,
  lru: string,
  vuz: string,
  vru: string,
): Spec => ({ label: { uz: luz, ru: lru }, value: { uz: vuz, ru: vru } });

const DONA = { uz: "dona", ru: "шт" };
const M2 = { uz: "m²", ru: "м²" };
const KOMPLEKT = { uz: "komplekt", ru: "комплект" };

/**
 * 7 rasmiy toifa bo'yicha mahsulotlar.
 * Narxlar taxminiy — kompaniya real narxlarni bergach yangilanadi.
 * Kafolat mahsulot turiga qarab 1–5 yil (kompaniya sharti).
 */
export const products: Product[] = [
  /* ─────────────── Rolstavniy darvoza ─────────────── */
  {
    id: "p01",
    slug: "rolstavniy-darvoza-qolda",
    categorySlug: "rolstavniy-darvoza",
    name: {
      uz: "Rolstavniy darvoza (qo'lda boshqariladigan)",
      ru: "Рольставни с ручным управлением",
    },
    description: {
      uz: "Yuqoriga o'ralib ochiladigan metall darvoza. Ochilganda oldinga yoki yon tomonga chiqmaydi — joy tejaydi. Garaj, do'kon, ombor va ustaxonalar uchun amaliy yechim. Alyumin profil, kukun bo'yoq qoplama.",
      ru: "Металлические ворота, сворачивающиеся в вал над проёмом. При открытии не выступают вперёд и вбок — экономят место. Практичное решение для гаражей, магазинов, складов и мастерских. Алюминиевый профиль, порошковая окраска.",
    },
    price: 1_100_000,
    unit: M2,
    stock: 50,
    images: ["/products/rolstavniy-darvoza.webp"],
    badges: ["hit"],
    specs: [
      S("Profil", "Профиль", "Alyumin, ko'pikli to'ldirma", "Алюминий, пенное наполнение"),
      S("Boshqaruv", "Управление", "Qo'lda (tasma/karniz)", "Ручное (лента/карниз)"),
      S("Maks. kenglik", "Макс. ширина", "4500 mm", "4500 мм"),
      S("Rang", "Цвет", "RAL katalogi bo'yicha", "По каталогу RAL"),
      S("Kafolat", "Гарантия", "3 yil", "3 года"),
    ],
    featured: true,
    hidden: false,
    createdAt: "2026-08-01",
  },
  {
    id: "p02",
    slug: "rolstavniy-darvoza-avtomatik",
    categorySlug: "rolstavniy-darvoza",
    name: {
      uz: "Rolstavniy darvoza (avtomatik, pult bilan)",
      ru: "Рольставни с электроприводом и пультом",
    },
    description: {
      uz: "Elektr yuritmali rolstavniy darvoza — pult yoki tugma orqali boshqariladi. Tez-tez ishlatiladigan garaj va savdo nuqtalari uchun qulay. Avariya holatida qo'lda ochish mexanizmi bor.",
      ru: "Рольставни с электроприводом — управление пультом или кнопкой. Удобны для часто используемых гаражей и торговых точек. Есть механизм ручного открытия на случай отключения света.",
    },
    price: 1_600_000,
    unit: M2,
    stock: 35,
    images: ["/products/rolstavniy-darvoza.webp"],
    badges: [],
    specs: [
      S("Profil", "Профиль", "Alyumin, kuchaytirilgan", "Алюминий, усиленный"),
      S("Boshqaruv", "Управление", "Elektr + 2 ta pult", "Электро + 2 пульта"),
      S("Avariya rejimi", "Аварийный режим", "Qo'lda ochish", "Ручное открытие"),
      S("Kafolat", "Гарантия", "3 yil", "3 года"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-08-01",
  },

  /* ─────────────── Seksion darvoza ─────────────── */
  {
    id: "p03",
    slug: "seksion-darvoza-garaj",
    categorySlug: "seksion-darvoza",
    name: {
      uz: "Seksion darvoza (garaj uchun)",
      ru: "Секционные ворота для гаража",
    },
    description: {
      uz: "Gorizontal seksiyalardan iborat darvoza — ochilganda shift ostiga yig'iladi, tashqariga chiqmaydi. Sendvich-panel issiqlikni saqlaydi. Xususiy garaj va avtoservislar uchun eng ommabop tanlov.",
      ru: "Ворота из горизонтальных секций — при открытии уходят под потолок, не выступая наружу. Сэндвич-панель сохраняет тепло. Самый популярный выбор для частных гаражей и автосервисов.",
    },
    price: 8_900_000,
    unit: KOMPLEKT,
    stock: 12,
    images: ["/products/seksion-darvoza.webp"],
    badges: ["hit"],
    specs: [
      S("O'lchami", "Размер", "3000×2500 mm gacha", "До 3000×2500 мм"),
      S("Panel", "Панель", "Sendvich 40 mm", "Сэндвич 40 мм"),
      S("Boshqaruv", "Управление", "Qo'lda / avtomatika", "Ручное / автоматика"),
      S("Kafolat", "Гарантия", "5 yil", "5 лет"),
    ],
    featured: true,
    hidden: false,
    createdAt: "2026-08-01",
  },
  {
    id: "p04",
    slug: "seksion-darvoza-sanoat",
    categorySlug: "seksion-darvoza",
    name: {
      uz: "Seksion darvoza (sanoat uchun)",
      ru: "Промышленные секционные ворота",
    },
    description: {
      uz: "Zavod, ombor va logistika markazlari uchun kuchaytirilgan seksion darvoza. Katta o'lchamlar, intensiv foydalanishga mo'ljallangan mexanizm, sanoat avtomatikasi.",
      ru: "Усиленные секционные ворота для заводов, складов и логистических центров. Большие размеры, механизм для интенсивной эксплуатации, промышленная автоматика.",
    },
    price: 18_500_000,
    unit: KOMPLEKT,
    stock: 6,
    images: ["/products/seksion-darvoza.webp"],
    badges: [],
    specs: [
      S("O'lchami", "Размер", "6000×5000 mm gacha", "До 6000×5000 мм"),
      S("Panel", "Панель", "Sendvich 45 mm", "Сэндвич 45 мм"),
      S("Avtomatika", "Автоматика", "Sanoat yuritmasi", "Промышленный привод"),
      S("Kafolat", "Гарантия", "5 yil", "5 лет"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-08-01",
  },

  /* ─────────────── Otkatnoy darvoza ─────────────── */
  {
    id: "p05",
    slug: "otkatnoy-darvoza-hovli",
    categorySlug: "otkatnoy-darvoza",
    name: {
      uz: "Otkatnoy darvoza (hovli uchun)",
      ru: "Откатные ворота для двора",
    },
    description: {
      uz: "Yon tomonga surilib ochiladigan darvoza — hovli oldidagi joyni egallamaydi. Konsol tizimi: pastda rels yo'q, qor va muz xalaqit bermaydi. Avtomatika qo'shish mumkin.",
      ru: "Ворота, откатывающиеся в сторону — не занимают место перед двором. Консольная система: без нижнего рельса, снег и лёд не мешают. Возможна установка автоматики.",
    },
    price: 9_800_000,
    unit: KOMPLEKT,
    stock: 10,
    images: ["/products/otkatnoy-darvoza.webp"],
    badges: ["hit"],
    specs: [
      S("Ochilish kengligi", "Ширина проёма", "4000 mm gacha", "До 4000 мм"),
      S("Tizim", "Система", "Konsol, pastki relssiz", "Консольная, без нижнего рельса"),
      S("To'ldirma", "Заполнение", "Profnastil / panel", "Профнастил / панель"),
      S("Kafolat", "Гарантия", "5 yil", "5 лет"),
    ],
    featured: true,
    hidden: false,
    createdAt: "2026-08-01",
  },
  {
    id: "p06",
    slug: "otkatnoy-darvoza-sanoat",
    categorySlug: "otkatnoy-darvoza",
    name: {
      uz: "Otkatnoy darvoza (korxona uchun, avtomatik)",
      ru: "Откатные ворота для предприятий (автоматические)",
    },
    description: {
      uz: "Korxona, ombor va avtoturargohlar uchun katta o'lchamli surma darvoza. Avtomatika, xavfsizlik datchiklari va masofadan boshqaruv komplektda.",
      ru: "Откатные ворота больших размеров для предприятий, складов и парковок. Автоматика, датчики безопасности и дистанционное управление в комплекте.",
    },
    price: 16_800_000,
    unit: KOMPLEKT,
    stock: 5,
    images: ["/products/otkatnoy-darvoza.webp"],
    badges: [],
    specs: [
      S("Ochilish kengligi", "Ширина проёма", "8000 mm gacha", "До 8000 мм"),
      S("Avtomatika", "Автоматика", "Komplektda, 2 pult", "В комплекте, 2 пульта"),
      S("Xavfsizlik", "Безопасность", "Fotoelement datchiklar", "Фотоэлементы"),
      S("Kafolat", "Гарантия", "5 yil", "5 лет"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-08-01",
  },

  /* ─────────────── Shlagbaum ─────────────── */
  {
    id: "p07",
    slug: "shlagbaum-avtomatik",
    categorySlug: "shlagbaum",
    name: {
      uz: "Avtomatik shlagbaum",
      ru: "Автоматический шлагбаум",
    },
    description: {
      uz: "Transport kirib-chiqishini boshqaruvchi gorizontal to'siq. Pult, karta yoki qo'ng'iroq orqali ochiladi. Avtoturargoh, turar-joy majmualari va korxonalar uchun. Kirishni nazorat qilish tizimlari bilan integratsiya qilinadi.",
      ru: "Горизонтальный барьер для контроля въезда транспорта. Открывается пультом, картой или звонком. Для парковок, жилых комплексов и предприятий. Интегрируется с системами контроля доступа.",
    },
    price: 7_200_000,
    unit: KOMPLEKT,
    stock: 14,
    images: ["/products/shlagbaum.svg"],
    badges: ["hit"],
    specs: [
      S("Strela uzunligi", "Длина стрелы", "6 m gacha", "До 6 м"),
      S("Ochilish vaqti", "Время открытия", "3–6 soniya", "3–6 секунд"),
      S("Boshqaruv", "Управление", "Pult / karta / GSM", "Пульт / карта / GSM"),
      S("Kafolat", "Гарантия", "2 yil", "2 года"),
    ],
    featured: true,
    hidden: false,
    createdAt: "2026-08-01",
  },
  {
    id: "p08",
    slug: "shlagbaum-intensiv",
    categorySlug: "shlagbaum",
    name: {
      uz: "Shlagbaum (intensiv foydalanish uchun)",
      ru: "Шлагбаум интенсивного использования",
    },
    description: {
      uz: "Kun davomida yuzlab avtomobil o'tadigan obyektlar uchun: biznes markazlar, yirik avtoturargohlar, zavodlar. Kuchaytirilgan mexanizm uzluksiz ishlashga mo'ljallangan.",
      ru: "Для объектов с сотнями проездов в день: бизнес-центры, крупные парковки, заводы. Усиленный механизм рассчитан на непрерывную работу.",
    },
    price: 11_500_000,
    unit: KOMPLEKT,
    stock: 7,
    images: ["/products/shlagbaum.svg"],
    badges: [],
    specs: [
      S("Rejim", "Режим", "100% intensivlik", "100% интенсивность"),
      S("Strela uzunligi", "Длина стрелы", "8 m gacha", "До 8 м"),
      S("Integratsiya", "Интеграция", "Kirish nazorati tizimlari", "Системы контроля доступа"),
      S("Kafolat", "Гарантия", "2 yil", "2 года"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-08-01",
  },

  /* ─────────────── Bollard ─────────────── */
  {
    id: "p09",
    slug: "bollard-statsionar",
    categorySlug: "bollard",
    name: {
      uz: "Statsionar bollard",
      ru: "Стационарный боллард",
    },
    description: {
      uz: "Doimiy o'rnatiladigan mustahkam metall ustun — piyodalar zonasi, bino oldi va yo'laklarni transportdan ajratadi. Yorug'lik qaytaruvchi belgi bilan.",
      ru: "Стационарный прочный металлический столб — отделяет пешеходные зоны, входы в здания и тротуары от транспорта. Со светоотражающей маркировкой.",
    },
    price: 1_800_000,
    unit: DONA,
    stock: 40,
    images: ["/products/bollard.svg"],
    badges: [],
    specs: [
      S("Balandligi", "Высота", "600–900 mm", "600–900 мм"),
      S("Material", "Материал", "Po'lat, zanglamas qoplama", "Сталь, антикоррозийное покрытие"),
      S("O'rnatish", "Монтаж", "Beton poydevorga", "В бетонное основание"),
      S("Kafolat", "Гарантия", "2 yil", "2 года"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-08-01",
  },
  {
    id: "p10",
    slug: "bollard-avtomatik",
    categorySlug: "bollard",
    name: {
      uz: "Avtomatik (ko'tarilib-tushadigan) bollard",
      ru: "Автоматический (выдвижной) боллард",
    },
    description: {
      uz: "Kerak bo'lganda yer ostiga tushib, yo'l ochadigan boshqariladigan ustun. Bank, savdo markazi va himoyalanadigan hududlar kirishi uchun. Pult yoki kirish nazorati tizimi orqali boshqariladi.",
      ru: "Управляемый столб, опускающийся под землю для проезда. Для въездов банков, торговых центров и охраняемых территорий. Управление пультом или системой контроля доступа.",
    },
    price: 14_500_000,
    unit: DONA,
    stock: 6,
    images: ["/products/bollard.svg"],
    badges: ["new"],
    specs: [
      S("Ko'tarilish balandligi", "Высота подъёма", "600 mm", "600 мм"),
      S("Boshqaruv", "Управление", "Pult / karta / tugma", "Пульт / карта / кнопка"),
      S("Ko'tarilish vaqti", "Время подъёма", "5–7 soniya", "5–7 секунд"),
      S("Kafolat", "Гарантия", "2 yil", "2 года"),
    ],
    featured: true,
    hidden: false,
    createdAt: "2026-08-01",
  },

  /* ─────────────── Antitarran ─────────────── */
  {
    id: "p11",
    slug: "antitarran-yol-blokeri",
    categorySlug: "antitarran",
    name: {
      uz: "Antitarran (yo'l blokeri)",
      ru: "Антитаран (дорожный блокиратор)",
    },
    description: {
      uz: "Avtomobilning majburiy kirib kelishini to'xtatish uchun mo'ljallangan kuchaytirilgan to'siq. Elchixona, aeroport, harbiy va muhim davlat obyektlari uchun. Himoya darajasi obyekt xavf tahliliga qarab tanlanadi.",
      ru: "Усиленный барьер, предназначенный для остановки принудительного въезда автомобиля. Для посольств, аэропортов, военных и важных государственных объектов. Уровень защиты подбирается по анализу рисков объекта.",
    },
    price: 45_000_000,
    unit: KOMPLEKT,
    stock: 2,
    images: ["/products/antitarran.webp"],
    badges: ["new"],
    specs: [
      S("Turi", "Тип", "Gidravlik yo'l blokeri", "Гидравлический блокиратор"),
      S("Kengligi", "Ширина", "2000–6000 mm", "2000–6000 мм"),
      S("Ko'tarilish", "Подъём", "3–5 soniya", "3–5 секунд"),
      S("Boshqaruv", "Управление", "Pult / nazorat posti", "Пульт / пост охраны"),
      S("Kafolat", "Гарантия", "2 yil", "2 года"),
    ],
    featured: true,
    hidden: false,
    createdAt: "2026-08-01",
  },

  /* ─────────────── Maxsus eshiklar ─────────────── */
  {
    id: "p12",
    slug: "yongin-eshigi",
    categorySlug: "maxsus-eshiklar",
    name: {
      uz: "Yong'inga chidamli eshik",
      ru: "Противопожарная дверь",
    },
    description: {
      uz: "Yong'in va tutunning tarqalishini belgilangan vaqt davomida cheklaydigan eshik. Rom, zichlagichlar va yopish mexanizmi yagona tizim sifatida ishlaydi. Sanoat obyektlari, ofis binolari va yashash majmualari uchun.",
      ru: "Дверь, ограничивающая распространение огня и дыма в течение нормированного времени. Рама, уплотнители и доводчик работают как единая система. Для промышленных объектов, офисов и жилых комплексов.",
    },
    price: 6_500_000,
    unit: DONA,
    stock: 15,
    images: ["/products/maxsus-eshik.webp"],
    badges: ["hit"],
    specs: [
      S("Chidamlilik", "Огнестойкость", "EI 30 / EI 60", "EI 30 / EI 60"),
      S("To'ldirma", "Наполнение", "Olovbardosh material", "Огнестойкий материал"),
      S("Komplekt", "Комплект", "Yopish mexanizmi, zichlagich", "Доводчик, уплотнители"),
      S("Kafolat", "Гарантия", "3 yil", "3 года"),
    ],
    featured: true,
    hidden: false,
    createdAt: "2026-08-01",
  },
  {
    id: "p13",
    slug: "oqdan-himoya-eshigi",
    categorySlug: "maxsus-eshiklar",
    name: {
      uz: "O'qdan himoyalovchi eshik",
      ru: "Пулестойкая дверь",
    },
    description: {
      uz: "Maxsus konstruksiya va materiallar yordamida o'qotar quroldan keladigan xavfni kamaytiradigan eshik. Bank, seyf xonasi, server xonasi va maxsus obyektlar uchun. Himoya darajasi sinov va standartlar asosida belgilanadi.",
      ru: "Дверь, снижающая угрозу от огнестрельного оружия за счёт специальной конструкции и материалов. Для банков, сейфовых и серверных комнат, спецобъектов. Класс защиты определяется испытаниями и стандартами.",
    },
    price: 22_000_000,
    unit: DONA,
    stock: 4,
    images: ["/products/maxsus-eshik.webp"],
    badges: [],
    specs: [
      S("Himoya sinfi", "Класс защиты", "Sinov asosida belgilanadi", "Определяется испытаниями"),
      S("Qulf", "Замок", "Ko'p nuqtali qulflash", "Многоточечное запирание"),
      S("Qo'llanish", "Применение", "Bank, seyf va server xonalari", "Банки, сейфовые и серверные"),
      S("Kafolat", "Гарантия", "3 yil", "3 года"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-08-01",
  },
];

/* ─────────────── selektorlar ─────────────── */

export const visibleProducts = () => products.filter((p) => !p.hidden);

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug && !p.hidden);

export const productsByCategory = (categorySlug: string) =>
  visibleProducts().filter((p) => p.categorySlug === categorySlug);

export const featuredProducts = () =>
  visibleProducts().filter((p) => p.featured);

export const countByCategory = (categorySlug: string) =>
  productsByCategory(categorySlug).length;

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return visibleProducts().filter((p) => {
    const hay = [
      p.name.uz,
      p.name.ru,
      p.description.uz,
      p.description.ru,
      p.categorySlug,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
