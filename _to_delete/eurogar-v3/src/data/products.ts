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

export const products: Product[] = [
  /* ─────────────── Roletli shkaflar ─────────────── */
  {
    id: "p01",
    slug: "rolletli-shkaf-parking-standart",
    categorySlug: "rolletli-shkaflar",
    name: {
      uz: "Parking uchun roletli shkaf «Standart»",
      ru: "Роллетный шкаф для паркинга «Стандарт»",
    },
    description: {
      uz: "Yer osti va yer usti parkinglar uchun eng ommabop yechim. Alyumin profil, kukun bo'yoq qoplama, kalitli qulf. Avtomobil oldidagi bo'sh joyni to'liq foydali maydonga aylantiradi — g'ildiraklar, asboblar va mavsumiy buyumlar uchun. Yong'in xavfsizligi talablariga to'liq javob beradi.",
      ru: "Самое популярное решение для подземных и наземных паркингов. Алюминиевый профиль, порошковая окраска, замок с ключом. Превращает пространство перед автомобилем в полезную площадь — для колёс, инструмента и сезонных вещей. Полностью соответствует требованиям пожарной безопасности.",
    },
    price: 4_850_000,
    oldPrice: 5_600_000,
    unit: DONA,
    stock: 14,
    images: [
      "/products/shkaf-parking-graphite.svg",
      "/products/shkaf-parking-white.svg",
      "/products/shkaf-dark.svg",
    ],
    badges: ["hit", "sale"],
    specs: [
      S("O'lchami (KxBxCh)", "Размер (ШхВхГ)", "2000×1200×600 mm", "2000×1200×600 мм"),
      S("Material", "Материал", "Alyumin profil AL-55", "Алюминиевый профиль AL-55"),
      S("Qulf", "Замок", "Kalitli, 2 ta kalit", "Ключевой, 2 ключа"),
      S("Rang", "Цвет", "Grafit, oq, jigarrang", "Графит, белый, коричневый"),
      S("Kafolat", "Гарантия", "10 yil", "10 лет"),
    ],
    featured: true,
    hidden: false,
    createdAt: "2026-05-12",
  },
  {
    id: "p02",
    slug: "rolletli-shkaf-parking-premium",
    categorySlug: "rolletli-shkaflar",
    name: {
      uz: "Parking uchun roletli shkaf «Premium» (avtomatik)",
      ru: "Роллетный шкаф для паркинга «Премиум» (автомат)",
    },
    description: {
      uz: "Elektr yuritma va pultli boshqaruv bilan. Ichki LED yoritish, sozlanadigan javonlar va anti-vandal profil. Qulaylikni qadrlaydiganlar uchun.",
      ru: "С электроприводом и пультом управления. Внутренняя LED-подсветка, регулируемые полки и антивандальный профиль. Для тех, кто ценит удобство.",
    },
    price: 8_200_000,
    unit: DONA,
    stock: 6,
    images: ["/products/shkaf-parking-white.svg", "/products/shkaf-dark.svg"],
    badges: ["new"],
    specs: [
      S("O'lchami (KxBxCh)", "Размер (ШхВхГ)", "2400×1400×700 mm", "2400×1400×700 мм"),
      S("Yuritma", "Привод", "Elektr, 2 ta pult", "Электро, 2 пульта"),
      S("Yoritish", "Подсветка", "LED lenta, 4000K", "LED-лента, 4000K"),
      S("Javonlar", "Полки", "3 ta, sozlanadigan", "3 шт, регулируемые"),
      S("Kafolat", "Гарантия", "10 yil", "10 лет"),
    ],
    featured: true,
    hidden: false,
    createdAt: "2026-06-02",
  },
  {
    id: "p03",
    slug: "rolletli-shkaf-garaj",
    categorySlug: "rolletli-shkaflar",
    name: {
      uz: "Garaj uchun roletli shkaf",
      ru: "Роллетный шкаф для гаража",
    },
    description: {
      uz: "Garaj devoriga o'rnatiladigan chuqurlashtirilgan shkaf. Asbob va ehtiyot qismlarni changdan himoya qiladi, joyni tejaydi.",
      ru: "Углублённый шкаф для монтажа в стену гаража. Защищает инструмент и запчасти от пыли, экономит место.",
    },
    price: 3_400_000,
    unit: DONA,
    stock: 21,
    images: ["/products/shkaf-garage-brown.svg", "/products/shkaf-parking-graphite.svg"],
    badges: [],
    specs: [
      S("O'lchami (KxBxCh)", "Размер (ШхВхГ)", "1600×1000×450 mm", "1600×1000×450 мм"),
      S("Material", "Материал", "Po'lat + alyumin roleta", "Сталь + алюминиевая роллета"),
      S("Rang", "Цвет", "Jigarrang «yog'och»", "Коричневый «дерево»"),
      S("Kafolat", "Гарантия", "10 yil", "10 лет"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-04-18",
  },
  {
    id: "p04",
    slug: "rolletli-shkaf-balkon",
    categorySlug: "rolletli-shkaflar",
    name: { uz: "Balkon uchun roletli shkaf", ru: "Роллетный шкаф на балкон" },
    description: {
      uz: "Balkon va lodjiya uchun nam va quyoshga chidamli shkaf. Yozgi shinalar, velosiped va bog' asboblari uchun ideal.",
      ru: "Влаго- и солнцестойкий шкаф для балкона и лоджии. Идеален для летней резины, велосипеда и садового инвентаря.",
    },
    price: 2_950_000,
    oldPrice: 3_300_000,
    unit: DONA,
    stock: 9,
    images: ["/products/shkaf-balcony-silver.svg"],
    badges: ["sale"],
    specs: [
      S("O'lchami (KxBxCh)", "Размер (ШхВхГ)", "1400×1800×500 mm", "1400×1800×500 мм"),
      S("Material", "Материал", "Anodlangan alyumin", "Анодированный алюминий"),
      S("Rang", "Цвет", "Kumush", "Серебро"),
      S("Kafolat", "Гарантия", "10 yil", "10 лет"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-03-30",
  },

  /* ─────────────── Rolstavnilar ─────────────── */
  {
    id: "p05",
    slug: "rolstavni-alutech-ar-555",
    categorySlug: "rolstavnilar",
    name: {
      uz: "Rolstavni Alutech AR/555 (deraza uchun)",
      ru: "Рольставни Alutech AR/555 (на окно)",
    },
    description: {
      uz: "Alutech kompaniyasining ko'pikli to'ldirmali profili. Issiqlikni saqlaydi, shovqinni pasaytiradi va o'g'irlikdan himoya qiladi. Qo'l yoki elektr boshqaruv.",
      ru: "Профиль Alutech с пенным наполнением. Сохраняет тепло, снижает шум и защищает от взлома. Ручное или электрическое управление.",
    },
    price: 890_000,
    unit: M2,
    stock: 120,
    images: ["/products/rolstavni-silver.svg", "/products/rolstavni-dark.svg"],
    badges: ["hit"],
    specs: [
      S("Profil", "Профиль", "AR/555, 55 mm", "AR/555, 55 мм"),
      S("Boshqaruv", "Управление", "Tasma / karniz / motor", "Лента / карниз / мотор"),
      S("Maks. kenglik", "Макс. ширина", "4500 mm", "4500 мм"),
      S("Rang", "Цвет", "RAL katalogi bo'yicha", "По каталогу RAL"),
      S("Kafolat", "Гарантия", "10 yil", "10 лет"),
    ],
    featured: true,
    hidden: false,
    createdAt: "2026-05-28",
  },
  {
    id: "p06",
    slug: "rolstavni-anti-vandal",
    categorySlug: "rolstavnilar",
    name: {
      uz: "Anti-vandal rolstavni (do'kon va peshtoq uchun)",
      ru: "Антивандальные рольставни (для магазина и витрины)",
    },
    description: {
      uz: "Ekstruziya usulida ishlangan qalinlashtirilgan profil. Savdo nuqtalari, aptekalar va bank filiallari uchun kuchaytirilgan himoya.",
      ru: "Утолщённый экструдированный профиль. Усиленная защита для торговых точек, аптек и банковских отделений.",
    },
    price: 1_450_000,
    unit: M2,
    stock: 64,
    images: ["/products/rolstavni-anthracite.svg", "/products/rolstavni-dark.svg"],
    badges: [],
    specs: [
      S("Profil", "Профиль", "Ekstruziya, 77 mm", "Экструзия, 77 мм"),
      S("Himoya sinfi", "Класс защиты", "P2 (kuchaytirilgan)", "P2 (усиленный)"),
      S("Boshqaruv", "Управление", "Elektr + avariya kaliti", "Электро + аварийный ключ"),
      S("Kafolat", "Гарантия", "10 yil", "10 лет"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-02-14",
  },
  {
    id: "p07",
    slug: "rolstavni-shaffof",
    categorySlug: "rolstavnilar",
    name: {
      uz: "Shaffof rolstavni (peshtoq uchun)",
      ru: "Прозрачные рольставни (для витрины)",
    },
    description: {
      uz: "Polikarbonat kesmalari bilan. Yopiq holatda ham vitrina ko'rinib turadi — savdo nuqtalari uchun mukammal.",
      ru: "Со вставками из поликарбоната. Витрина видна даже в закрытом положении — идеально для торговых точек.",
    },
    price: 1_980_000,
    unit: M2,
    stock: 32,
    images: ["/products/rolstavni-steel.svg", "/products/rolstavni-silver.svg"],
    badges: ["new"],
    specs: [
      S("Profil", "Профиль", "Alyumin + polikarbonat", "Алюминий + поликарбонат"),
      S("Shaffoflik", "Прозрачность", "60%", "60%"),
      S("Boshqaruv", "Управление", "Elektr, pult", "Электро, пульт"),
      S("Kafolat", "Гарантия", "10 yil", "10 лет"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-06-20",
  },

  /* ─────────────── Darvozalar ─────────────── */
  {
    id: "p08",
    slug: "seksion-darvoza-alutech-trend",
    categorySlug: "darvozalar",
    name: {
      uz: "Seksion darvoza Alutech «Trend»",
      ru: "Секционные ворота Alutech «Trend»",
    },
    description: {
      uz: "Garaj uchun eng ommabop seksion darvoza. 40 mm sendvich-panel, issiqlik izolyatsiyasi, yumshoq va shovqinsiz harakat. Avtomatika va 2 ta pult komplektda.",
      ru: "Самые популярные секционные ворота для гаража. Сэндвич-панель 40 мм, теплоизоляция, плавный и бесшумный ход. Автоматика и 2 пульта в комплекте.",
    },
    price: 11_900_000,
    oldPrice: 13_500_000,
    unit: KOMPLEKT,
    stock: 8,
    images: [
      "/products/vorota-sectional-white.svg",
      "/products/vorota-sectional-brown.svg",
      "/products/vorota-sectional-dark.svg",
    ],
    badges: ["hit", "sale"],
    specs: [
      S("O'lchami", "Размер", "3000×2500 mm", "3000×2500 мм"),
      S("Panel", "Панель", "Sendvich 40 mm", "Сэндвич 40 мм"),
      S("Avtomatika", "Автоматика", "Alutech Levigato, 2 pult", "Alutech Levigato, 2 пульта"),
      S("Sirt", "Поверхность", "Woodgrain / Stucco", "Woodgrain / Stucco"),
      S("Kafolat", "Гарантия", "10 yil", "10 лет"),
    ],
    featured: true,
    hidden: false,
    createdAt: "2026-06-10",
  },
  {
    id: "p09",
    slug: "seksion-darvoza-panoramik",
    categorySlug: "darvozalar",
    name: {
      uz: "Panoramik seksion darvoza",
      ru: "Панорамные секционные ворота",
    },
    description: {
      uz: "Alyumin ramka va shaffof to'ldirma. Avtosalon, showroom va zamonaviy uylar uchun. Yorug'lik o'tkazadi va hashamatli ko'rinadi.",
      ru: "Алюминиевая рама и прозрачное заполнение. Для автосалонов, шоурумов и современных домов. Пропускает свет и выглядит премиально.",
    },
    price: 24_500_000,
    unit: KOMPLEKT,
    stock: 3,
    images: ["/products/vorota-sectional-dark.svg", "/products/vorota-sectional-white.svg"],
    badges: ["new"],
    specs: [
      S("O'lchami", "Размер", "4000×3000 mm", "4000×3000 мм"),
      S("Ramka", "Рама", "Alyumin, anodlangan", "Алюминий, анодированный"),
      S("To'ldirma", "Заполнение", "Kamerali polikarbonat", "Камерный поликарбонат"),
      S("Avtomatika", "Автоматика", "Sanoat yuritmasi", "Промышленный привод"),
      S("Kafolat", "Гарантия", "10 yil", "10 лет"),
    ],
    featured: true,
    hidden: false,
    createdAt: "2026-07-01",
  },
  {
    id: "p10",
    slug: "otkatnoy-darvoza",
    categorySlug: "darvozalar",
    name: { uz: "Otkatnoy (surma) darvoza", ru: "Откатные ворота" },
    description: {
      uz: "Konsol tizimidagi surma darvoza — pastda relsi yo'q, qor va muz xalaqit bermaydi. Hovli va sanoat obyektlari uchun.",
      ru: "Откатные ворота на консольной системе — без нижнего рельса, снег и лёд не мешают. Для двора и промышленных объектов.",
    },
    price: 9_600_000,
    unit: KOMPLEKT,
    stock: 5,
    images: ["/products/vorota-sliding.svg"],
    badges: [],
    specs: [
      S("Ochilish kengligi", "Ширина проёма", "4000 mm", "4000 мм"),
      S("Tizim", "Система", "Konsol, roliksiz pastki qism", "Консольная, без нижней опоры"),
      S("To'ldirma", "Заполнение", "Profnastil / shtaketnik", "Профнастил / штакетник"),
      S("Avtomatika", "Автоматика", "Ixtiyoriy", "Опционально"),
      S("Kafolat", "Гарантия", "10 yil", "10 лет"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-01-22",
  },
  {
    id: "p11",
    slug: "svingli-darvoza",
    categorySlug: "darvozalar",
    name: { uz: "Sving (raspashnoy) darvoza", ru: "Распашные ворота" },
    description: {
      uz: "Klassik ikki tavaqali darvoza. Yasama temirdan bezaklar bilan yoki sodda uslubda. Avtomatik yuritma qo'shish mumkin.",
      ru: "Классические двустворчатые ворота. С коваными элементами или в лаконичном стиле. Возможна установка автоматики.",
    },
    price: 7_200_000,
    unit: KOMPLEKT,
    stock: 7,
    images: ["/products/vorota-swing.svg"],
    badges: [],
    specs: [
      S("Ochilish kengligi", "Ширина проёма", "3500 mm", "3500 мм"),
      S("Material", "Материал", "Po'lat profil truba", "Стальная профильная труба"),
      S("Qoplama", "Покрытие", "Kukun bo'yoq", "Порошковая окраска"),
      S("Kafolat", "Гарантия", "10 yil", "10 лет"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-02-05",
  },
  {
    id: "p12",
    slug: "roletli-darvoza",
    categorySlug: "darvozalar",
    name: { uz: "Roletli (rulon) darvoza", ru: "Роллетные ворота" },
    description: {
      uz: "Shift baland bo'lmagan garajlar uchun. Yuqoriga o'ralib chiqadi, tepada joy egallamaydi.",
      ru: "Для гаражей с низким потолком. Сворачивается в рулон, не занимает место под потолком.",
    },
    price: 6_400_000,
    unit: KOMPLEKT,
    stock: 11,
    images: ["/products/vorota-roll-silver.svg", "/products/rolstavni-anthracite.svg"],
    badges: ["hit"],
    specs: [
      S("O'lchami", "Размер", "2800×2200 mm", "2800×2200 мм"),
      S("Profil", "Профиль", "Alutech AG/77", "Alutech AG/77"),
      S("Boshqaruv", "Управление", "Elektr + avariya zanjiri", "Электро + аварийная цепь"),
      S("Kafolat", "Гарантия", "10 yil", "10 лет"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-04-08",
  },

  /* ─────────────── Panjaralar ─────────────── */
  {
    id: "p13",
    slug: "deraza-panjarasi-klassik",
    categorySlug: "panjaralar",
    name: { uz: "Deraza panjarasi «Klassik»", ru: "Оконная решётка «Классика»" },
    description: {
      uz: "Kvadrat profil va nayzasimon uchlar. Birinchi qavat kvartiralari va xususiy uylar uchun. Kukun bo'yoq — zanglamaydi.",
      ru: "Квадратный профиль и пикообразные наконечники. Для квартир на первом этаже и частных домов. Порошковая окраска — не ржавеет.",
    },
    price: 640_000,
    unit: M2,
    stock: 90,
    images: ["/products/panjara-classic.svg"],
    badges: [],
    specs: [
      S("Profil", "Профиль", "16×16 mm kvadrat", "16×16 мм квадрат"),
      S("Qadam", "Шаг", "120 mm", "120 мм"),
      S("Qoplama", "Покрытие", "Kukun bo'yoq, RAL 9005", "Порошковая окраска, RAL 9005"),
      S("Kafolat", "Гарантия", "10 yil", "10 лет"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-03-11",
  },
  {
    id: "p14",
    slug: "dekorativ-panjara-oltin",
    categorySlug: "panjaralar",
    name: {
      uz: "Dekorativ panjara «Oltin»",
      ru: "Декоративная решётка «Золото»",
    },
    description: {
      uz: "Yasama bezaklar va oltin patina bilan. Hovli, ayvon va balkon uchun — himoya bilan birga estetika.",
      ru: "С коваными элементами и золотой патиной. Для двора, веранды и балкона — защита вместе с эстетикой.",
    },
    price: 1_120_000,
    unit: M2,
    stock: 40,
    images: ["/products/panjara-steel.svg", "/products/panjara-classic.svg"],
    badges: ["new"],
    specs: [
      S("Profil", "Профиль", "Yasama, qo'lda ishlangan", "Ковка, ручная работа"),
      S("Qoplama", "Покрытие", "Patina «oltin»", "Патина «золото»"),
      S("Kafolat", "Гарантия", "10 yil", "10 лет"),
    ],
    featured: true,
    hidden: false,
    createdAt: "2026-05-05",
  },

  /* ─────────────── Omborxonalar ─────────────── */
  {
    id: "p15",
    slug: "torli-omborxona-parking",
    categorySlug: "omborxonalar",
    name: {
      uz: "Parkingda to'rli omborxona",
      ru: "Сетчатая кладовая в паркинге",
    },
    description: {
      uz: "Payvandlangan to'r panellardan yig'iladigan omborxona. Havo almashinuvi yaxshi, yong'in xavfsizligi normalariga mos. Istalgan o'lchamda yig'iladi.",
      ru: "Кладовая из сварных сетчатых панелей. Хорошая вентиляция, соответствие нормам пожарной безопасности. Собирается под любой размер.",
    },
    price: 3_150_000,
    unit: DONA,
    stock: 16,
    images: ["/products/kladovaya-mesh.svg", "/products/kladovaya-dark.svg"],
    badges: ["hit"],
    specs: [
      S("O'lchami", "Размер", "2000×2000×1500 mm", "2000×2000×1500 мм"),
      S("To'r", "Сетка", "50×50 mm, sim Ø4 mm", "50×50 мм, пруток Ø4 мм"),
      S("Eshik", "Дверь", "Qulfli, 800 mm", "С замком, 800 мм"),
      S("Kafolat", "Гарантия", "10 yil", "10 лет"),
    ],
    featured: true,
    hidden: false,
    createdAt: "2026-04-27",
  },
  {
    id: "p16",
    slug: "mototsikl-boksi",
    categorySlug: "omborxonalar",
    name: { uz: "Mototsikl boksi", ru: "Мотобокс" },
    description: {
      uz: "Mototsikl va skuter uchun yopiq boks. Parkingda alohida joy egallaydi va texnikani himoya qiladi.",
      ru: "Закрытый бокс для мотоцикла и скутера. Занимает отдельное место в паркинге и защищает технику.",
    },
    price: 5_700_000,
    unit: DONA,
    stock: 4,
    images: ["/products/kladovaya-dark.svg", "/products/kladovaya-mesh.svg"],
    badges: [],
    specs: [
      S("O'lchami", "Размер", "2400×1200×1600 mm", "2400×1200×1600 мм"),
      S("Kirish", "Вход", "Roletli eshik", "Роллетная дверь"),
      S("Kafolat", "Гарантия", "10 yil", "10 лет"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-01-30",
  },

  /* ─────────────── Metall buyumlar ─────────────── */
  {
    id: "p17",
    slug: "loft-stellaj",
    categorySlug: "metall-buyumlar",
    name: { uz: "LOFT stellaj", ru: "Стеллаж LOFT" },
    description: {
      uz: "Metall karkas va massiv yog'och javonlar. Garaj, ustaxona yoki interyer uchun. Yuk ko'tarish quvvati javoniga 120 kg.",
      ru: "Металлический каркас и полки из массива дерева. Для гаража, мастерской или интерьера. Нагрузка 120 кг на полку.",
    },
    price: 2_280_000,
    unit: DONA,
    stock: 18,
    images: ["/products/metall-shelving.svg"],
    badges: ["hit"],
    specs: [
      S("O'lchami", "Размер", "1800×2000×400 mm", "1800×2000×400 мм"),
      S("Javonlar", "Полки", "4 ta, qarag'ay massivi", "4 шт, массив сосны"),
      S("Yuk", "Нагрузка", "120 kg / javon", "120 кг / полка"),
      S("Kafolat", "Гарантия", "10 yil", "10 лет"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-05-19",
  },
  {
    id: "p18",
    slug: "parking-tosigi-stolbik",
    categorySlug: "metall-buyumlar",
    name: {
      uz: "Parking to'sig'i (stolbik)",
      ru: "Парковочный столбик",
    },
    description: {
      uz: "Yotqiziladigan qulfli parking ustuni. O'z joyingizni band qilib qo'yadi. Yorug'lik qaytaruvchi lenta bilan.",
      ru: "Складной парковочный столбик с замком. Резервирует ваше место. Со светоотражающей лентой.",
    },
    price: 780_000,
    unit: DONA,
    stock: 45,
    images: ["/products/metall-bollard.svg"],
    badges: [],
    specs: [
      S("Balandligi", "Высота", "650 mm", "650 мм"),
      S("Material", "Материал", "Po'lat truba Ø76 mm", "Стальная труба Ø76 мм"),
      S("Qulf", "Замок", "Kalitli, 2 ta kalit", "Ключевой, 2 ключа"),
      S("Kafolat", "Гарантия", "5 yil", "5 лет"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-02-26",
  },

  /* ─────────────── Rotang mebel ─────────────── */
  {
    id: "p19",
    slug: "rotang-kreslo",
    categorySlug: "rotang-mebel",
    name: { uz: "Rotang kreslo «Bali»", ru: "Кресло из ротанга «Бали»" },
    description: {
      uz: "Sun'iy rotangdan to'qilgan kreslo. Quyosh va yomg'irdan qo'rqmaydi, alyumin karkas zanglamaydi. Yumshoq to'shak komplektda.",
      ru: "Кресло из искусственного ротанга. Не боится солнца и дождя, алюминиевый каркас не ржавеет. Мягкая подушка в комплекте.",
    },
    price: 1_890_000,
    oldPrice: 2_200_000,
    unit: DONA,
    stock: 12,
    images: ["/products/rotang-chair.svg", "/products/rotang-set.svg"],
    badges: ["sale"],
    specs: [
      S("Karkas", "Каркас", "Alyumin", "Алюминий"),
      S("To'qima", "Плетение", "Sun'iy rotang, UV himoya", "Искусственный ротанг, UV-защита"),
      S("To'shak", "Подушка", "Suv o'tkazmaydigan mato", "Влагостойкая ткань"),
      S("Kafolat", "Гарантия", "3 yil", "3 года"),
    ],
    featured: true,
    hidden: false,
    createdAt: "2026-06-14",
  },
  {
    id: "p20",
    slug: "rotang-bog-toplami",
    categorySlug: "rotang-mebel",
    name: {
      uz: "Bog' to'plami «Terrassa» (stol + 4 kreslo)",
      ru: "Садовый комплект «Терраса» (стол + 4 кресла)",
    },
    description: {
      uz: "Terasa va bog' uchun to'liq to'plam: shisha usti stol va to'rtta kreslo. Yig'ilgan holda yetkaziladi.",
      ru: "Полный комплект для террасы и сада: стол со стеклянной столешницей и четыре кресла. Доставляется в собранном виде.",
    },
    price: 8_900_000,
    unit: KOMPLEKT,
    stock: 5,
    images: ["/products/rotang-set.svg", "/products/rotang-chair.svg"],
    badges: ["new"],
    specs: [
      S("Tarkibi", "Состав", "1 stol + 4 kreslo", "1 стол + 4 кресла"),
      S("Stol", "Стол", "120×70 sm, kalen shisha", "120×70 см, закалённое стекло"),
      S("Kafolat", "Гарантия", "3 yil", "3 года"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-07-08",
  },

  /* ─────────────── Butlovchi qismlar ─────────────── */
  {
    id: "p21",
    slug: "pult-alutech-at-4",
    categorySlug: "butlovchi-qismlar",
    name: { uz: "Pult Alutech AT-4", ru: "Пульт Alutech AT-4" },
    description: {
      uz: "4 kanalli original pult. Darvoza, rolstavni va shlagbaumni bitta pultdan boshqarish imkonini beradi.",
      ru: "Оригинальный 4-канальный пульт. Позволяет управлять воротами, рольставнями и шлагбаумом с одного пульта.",
    },
    price: 320_000,
    unit: DONA,
    stock: 60,
    images: ["/products/metall-bollard.svg"],
    badges: [],
    specs: [
      S("Kanallar", "Каналы", "4", "4"),
      S("Chastota", "Частота", "433,92 MHz", "433,92 МГц"),
      S("Batareya", "Батарея", "CR2032", "CR2032"),
      S("Kafolat", "Гарантия", "1 yil", "1 год"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-03-02",
  },
  {
    id: "p22",
    slug: "elektr-yuritma-alutech",
    categorySlug: "butlovchi-qismlar",
    name: {
      uz: "Elektr yuritma (motor) roleta uchun",
      ru: "Электропривод для роллеты",
    },
    description: {
      uz: "Ichki o'rnatiladigan tubular motor. Avariya holatida qo'lda ochish mexanizmi bilan.",
      ru: "Встраиваемый трубчатый мотор. С механизмом ручного открывания на случай аварии.",
    },
    price: 1_650_000,
    unit: DONA,
    stock: 24,
    images: ["/products/metall-bollard.svg"],
    badges: [],
    specs: [
      S("Kuchi", "Момент", "30 Nm", "30 Нм"),
      S("Quvvat", "Питание", "220 V", "220 В"),
      S("Avariya", "Аварийный режим", "Qo'lda, zanjir bilan", "Ручной, цепью"),
      S("Kafolat", "Гарантия", "2 yil", "2 года"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-04-02",
  },
  {
    id: "p23",
    slug: "sendvich-panel-40mm",
    categorySlug: "butlovchi-qismlar",
    name: {
      uz: "Sendvich-panel 40 mm (darvoza uchun)",
      ru: "Сэндвич-панель 40 мм (для ворот)",
    },
    description: {
      uz: "Seksion darvoza uchun almashtiriladigan panel. Zarar ko'rgan seksiyani darvozani to'liq almashtirmasdan yangilash mumkin.",
      ru: "Сменная панель для секционных ворот. Позволяет заменить повреждённую секцию без замены всех ворот.",
    },
    price: 1_240_000,
    unit: DONA,
    stock: 30,
    images: ["/products/vorota-sectional-brown.svg"],
    badges: [],
    specs: [
      S("Qalinligi", "Толщина", "40 mm", "40 мм"),
      S("Balandligi", "Высота", "500 mm", "500 мм"),
      S("Sirt", "Поверхность", "Woodgrain", "Woodgrain"),
      S("Kafolat", "Гарантия", "10 yil", "10 лет"),
    ],
    featured: false,
    hidden: false,
    createdAt: "2026-01-15",
  },
  {
    id: "p24",
    slug: "eskirgan-model-arxiv",
    categorySlug: "butlovchi-qismlar",
    name: {
      uz: "Eskirgan model (arxiv)",
      ru: "Устаревшая модель (архив)",
    },
    description: {
      uz: "Bu mahsulot ishlab chiqarishdan olingan. Admin panelda «yashirilgan» holatida — saytda ko'rinmaydi.",
      ru: "Товар снят с производства. В админ-панели помечен как «скрытый» — на сайте не отображается.",
    },
    price: 500_000,
    unit: DONA,
    stock: 0,
    images: ["/products/metall-bollard.svg"],
    badges: [],
    specs: [],
    featured: false,
    hidden: true,
    createdAt: "2025-11-01",
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
