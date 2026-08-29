import type { I18nText } from "@/lib/types";

/**
 * Blog maqolalari — kompaniya bergan matnlar asosida (uz),
 * ruscha tarjima bilan. TZ 2.8/2.9: ro'yxat + bitta maqola sahifasi.
 */

export type ArticleBlock =
  | { type: "p"; text: I18nText }
  | { type: "h2"; text: I18nText }
  | { type: "list"; items: I18nText[] };

export interface Article {
  slug: string;
  categorySlug: string;
  title: I18nText;
  excerpt: I18nText;
  image: string;
  date: string;
  readMinutes: number;
  body: ArticleBlock[];
}

const T = (uz: string, ru: string): I18nText => ({ uz, ru });

export const articles: Article[] = [
  /* ─────────────── 1. Rolstavniy ─────────────── */
  {
    slug: "rolstavniy-darvoza-nima",
    categorySlug: "rolstavniy-darvoza",
    title: T(
      "Rolstavniy darvoza nima va qayerlarda ishlatiladi?",
      "Что такое рольставни и где они применяются?",
    ),
    excerpt: T(
      "Garaj, do'kon yoki ombor uchun joyni tejaydigan darvoza izlayapsizmi? Rolstavniy darvoza amaliy yechimlardan biri bo'lishi mumkin.",
      "Ищете ворота, экономящие место, для гаража, магазина или склада? Рольставни могут стать практичным решением.",
    ),
    image: "/products/rolstavniy-darvoza.webp",
    date: "2026-08-20",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: T(
          "Rolstavniy darvoza — gorizontal joylashgan metall profillar yoki lamellalardan tashkil topgan va ochilganda yuqoridagi valga o'raladigan darvoza turidir. Uning asosiy farqi shundaki, darvoza ochilganda qanot sifatida oldinga yoki yon tomonga chiqmaydi, balki yuqoriga ko'tarilib, ixcham holatda yig'iladi.",
          "Рольставни — это ворота из горизонтальных металлических профилей или ламелей, которые при открытии наматываются на вал, расположенный над проёмом. Их главное отличие: при открытии полотно не выступает вперёд или вбок, а поднимается вверх и компактно сворачивается.",
        ),
      },
      {
        type: "p",
        text: T(
          "Bu xususiyat, ayniqsa, darvoza oldida bo'sh joy cheklangan obyektlarda muhim. Masalan, garaj oldida avtomobil turadigan bo'lsa, oddiy ochiladigan darvoza uchun qo'shimcha ochilish maydoni talab qilinishi mumkin. Rolstavniy konstruksiyada esa ochilish mexanizmi yuqorida joylashadi.",
          "Эта особенность особенно важна на объектах, где пространство перед воротами ограничено. Например, если перед гаражом стоит автомобиль, распашным воротам потребуется дополнительная зона открытия. В рольставнях же весь механизм расположен сверху.",
        ),
      },
      {
        type: "h2",
        text: T("Rolstavniy darvoza qayerda ishlatiladi?", "Где применяются рольставни?"),
      },
      {
        type: "list",
        items: [
          T("Garajlar", "Гаражи"),
          T("Do'kon va savdo nuqtalari", "Магазины и торговые точки"),
          T("Omborlar", "Склады"),
          T("Ustaxonalar", "Мастерские"),
          T("Ishlab chiqarish obyektlari", "Производственные объекты"),
          T("Xizmat ko'rsatish binolari", "Здания сферы услуг"),
        ],
      },
      {
        type: "p",
        text: T(
          "Rolstavniy darvozalar qo'lda yoki avtomatik boshqariladigan variantlarda ishlab chiqilishi mumkin. Sanoat, tijorat va garaj darvozalari uchun xavfsizlik hamda ekspluatatsion talablar EN 13241 standartlari doirasida ko'rib chiqiladi.",
          "Рольставни выпускаются с ручным или автоматическим управлением. Требования к безопасности и эксплуатации промышленных, коммерческих и гаражных ворот рассматриваются в рамках стандарта EN 13241.",
        ),
      },
      {
        type: "h2",
        text: T(
          "Rolstavniy darvoza tanlashda nimalarga e'tibor berish kerak?",
          "На что обратить внимание при выборе рольставней?",
        ),
      },
      {
        type: "p",
        text: T(
          "Darvoza tanlashda faqat uning tashqi ko'rinishiga qarash yetarli emas. Ochilishning eni va balandligi, foydalanish chastotasi, material turi, o'rnatish joyi, avtomatika va xavfsizlik talablari hisobga olinishi kerak. Masalan, kuniga bir necha marta ishlatiladigan xususiy garaj bilan doimiy transport harakati bo'ladigan ishlab chiqarish obyektining talablari bir xil emas. Shuning uchun darvozani obyektning real sharoitiga qarab tanlash muhim.",
          "При выборе недостаточно смотреть только на внешний вид. Нужно учитывать ширину и высоту проёма, частоту использования, материал, место установки, автоматику и требования безопасности. Например, требования частного гаража, открываемого несколько раз в день, и производственного объекта с постоянным движением транспорта — не одинаковы. Поэтому важно подбирать ворота под реальные условия объекта.",
        ),
      },
      {
        type: "h2",
        text: T("Sizga mos rolstavniy darvozani tanlang!", "Подберите подходящие рольставни!"),
      },
      {
        type: "p",
        text: T(
          "Agar garaj, do'kon, ombor yoki boshqa obyekt uchun rolstavniy darvoza kerak bo'lsa, avvalo ochilish joyi va foydalanish sharoitini baholash lozim. Biz bilan bog'laning — obyektingiz uchun mos rolstavniy darvoza variantini tanlashga yordam beramiz.",
          "Если рольставни нужны для гаража, магазина, склада или другого объекта, сначала стоит оценить проём и условия эксплуатации. Свяжитесь с нами — поможем подобрать подходящий вариант для вашего объекта.",
        ),
      },
    ],
  },

  /* ─────────────── 2. Seksion ─────────────── */
  {
    slug: "seksion-darvoza-afzalligi",
    categorySlug: "seksion-darvoza",
    title: T(
      "Seksion darvoza nima va uning afzalligi nimada?",
      "Что такое секционные ворота и в чём их преимущество?",
    ),
    excerpt: T(
      "Katta garaj yoki sanoat binosida darvoza oldidagi joyni tejashni xohlaysizmi? Seksion darvoza aynan shunday vaziyatlarda ko'p qo'llanadigan yechim.",
      "Хотите сэкономить место перед воротами большого гаража или промышленного здания? Секционные ворота — частое решение именно для таких случаев.",
    ),
    image: "/products/seksion-darvoza.webp",
    date: "2026-08-18",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: T(
          "Seksion darvoza bir nechta gorizontal seksiyalardan tashkil topadi. Darvoza ochilganda ushbu seksiyalar maxsus yo'naltirgichlar orqali yuqoriga ko'tariladi va shift ostidagi holatga keladi. Ya'ni darvoza tashqariga qarab ochilmaydi — bu esa uning oldidagi hududdan transport harakati uchun foydalanish imkonini beradi.",
          "Секционные ворота состоят из нескольких горизонтальных секций. При открытии секции поднимаются по направляющим и уходят в положение под потолком. Ворота не открываются наружу — а значит, пространство перед ними остаётся свободным для транспорта.",
        ),
      },
      {
        type: "h2",
        text: T("Seksion darvoza qayerlarda ishlatiladi?", "Где применяются секционные ворота?"),
      },
      {
        type: "list",
        items: [
          T("Xususiy va tijorat garajlari", "Частные и коммерческие гаражи"),
          T("Avtomobil servislari", "Автосервисы"),
          T("Omborlar", "Склады"),
          T("Zavod va ishlab chiqarish binolari", "Заводы и производственные здания"),
          T("Logistika markazlari", "Логистические центры"),
          T("Texnik xizmat ko'rsatish obyektlari", "Объекты технического обслуживания"),
        ],
      },
      {
        type: "p",
        text: T(
          "Seksion darvozaning konstruksiyasi obyekt talabiga qarab farq qilishi mumkin. Masalan, panel turi, o'lchami, yo'naltirgich konfiguratsiyasi, ochilish mexanizmi va avtomatika tizimi alohida tanlanadi.",
          "Конструкция секционных ворот зависит от требований объекта: тип панели, размер, конфигурация направляющих, механизм открытия и автоматика подбираются индивидуально.",
        ),
      },
      {
        type: "h2",
        text: T("Seksion darvozaning muhim jihati", "Важный момент при выборе"),
      },
      {
        type: "p",
        text: T(
          "Seksion darvoza tanlanayotganda faqat darvoza o'lchamini bilishning o'zi yetarli emas. Shift balandligi, yon tomondagi bo'sh joy, darvoza ustidagi konstruktiv maydon va foydalanish chastotasi ham hisobga olinadi. Agar darvoza avtomatik bo'lsa, boshqaruv tizimi va xavfsizlik qurilmalari ham to'g'ri tanlanishi kerak.",
          "При выборе секционных ворот недостаточно знать только размер проёма. Учитываются высота потолка, свободное место по бокам, конструктивная зона над воротами и частота использования. Если ворота автоматические — правильно подбираются система управления и устройства безопасности.",
        ),
      },
      {
        type: "p",
        text: T(
          "Shuningdek, barcha seksion darvozalar bir xil xususiyatga ega emas. Issiqlik izolyatsiyasi, material, panel qalinligi va boshqa texnik ko'rsatkichlar modelga qarab farq qiladi.",
          "Кроме того, не все секционные ворота одинаковы: теплоизоляция, материал, толщина панели и другие характеристики зависят от модели.",
        ),
      },
      {
        type: "h2",
        text: T("Sizga qaysi seksion darvoza mos?", "Какие секционные ворота подойдут вам?"),
      },
      {
        type: "p",
        text: T(
          "Garaj, servis, ombor yoki ishlab chiqarish binosi uchun seksion darvoza tanlayotgan bo'lsangiz, obyektning o'lchami va foydalanish sharoitini hisobga olish kerak. Biz bilan bog'laning — joyingizga mos seksion darvoza variantini tanlashga yordam beramiz.",
          "Если вы выбираете секционные ворота для гаража, сервиса, склада или производства, учитывайте размеры объекта и условия эксплуатации. Свяжитесь с нами — поможем подобрать подходящий вариант.",
        ),
      },
    ],
  },

  /* ─────────────── 3. Shlagbaum ─────────────── */
  {
    slug: "shlagbaum-nima-uchun-kerak",
    categorySlug: "shlagbaum",
    title: T(
      "Shlagbaum nima va u nima uchun kerak?",
      "Что такое шлагбаум и зачем он нужен?",
    ),
    excerpt: T(
      "Avtoturargoh, korxona yoki yopiq hududga kirishni nazorat qilish kerakmi? Buning uchun har doim katta darvoza o'rnatish shart emas.",
      "Нужно контролировать въезд на парковку, предприятие или закрытую территорию? Для этого не всегда нужны большие ворота.",
    ),
    image: "/products/shlagbaum.svg",
    date: "2026-08-16",
    readMinutes: 3,
    body: [
      {
        type: "p",
        text: T(
          "Shlagbaum — avtomobillar kirib-chiqishini boshqarish uchun ishlatiladigan gorizontal to'siq tizimi. Uning asosiy vazifasi hududni to'liq yopish emas, balki transport vositalarining kirish-chiqishini nazorat qilishdir. Shlagbaum yopilganda uning gorizontal strelasi avtomobil yo'lini to'sadi. Ruxsat berilganda esa yuqoriga ko'tarilib, transportning o'tishiga imkon beradi.",
          "Шлагбаум — это система горизонтального барьера для управления въездом и выездом автомобилей. Его задача — не полностью закрыть территорию, а контролировать проезд транспорта. В закрытом положении стрела перекрывает дорогу, при разрешении — поднимается и пропускает автомобиль.",
        ),
      },
      {
        type: "h2",
        text: T("Shlagbaum qayerlarda ishlatiladi?", "Где применяются шлагбаумы?"),
      },
      {
        type: "list",
        items: [
          T("Avtoturargohlar", "Парковки"),
          T("Biznes markazlari", "Бизнес-центры"),
          T("Turar-joy majmualari", "Жилые комплексы"),
          T("Zavod va fabrikalar", "Заводы и фабрики"),
          T("Omborlar", "Склады"),
          T("Yopiq hududlar", "Закрытые территории"),
          T("Korxona va tashkilotlar kirish qismi", "Въезды предприятий и организаций"),
        ],
      },
      {
        type: "p",
        text: T(
          "Shlagbaumni kirishni nazorat qilish tizimlari bilan birgalikda ishlatish ham mumkin. Bunda kirish ruxsati karta, masofadan boshqarish yoki boshqa nazorat usullari orqali amalga oshirilishi mumkin.",
          "Шлагбаум можно интегрировать с системами контроля доступа: разрешение на въезд выдаётся по карте, с пульта или другими способами.",
        ),
      },
      {
        type: "h2",
        text: T("Shlagbaum tanlashda nimalarga qaraladi?", "Что учитывать при выборе шлагбаума?"),
      },
      {
        type: "p",
        text: T(
          "Shlagbaum tanlashda yo'lning kengligi, transport oqimi, foydalanish chastotasi va o'rnatish joyi muhim. Masalan, kun davomida yuzlab avtomobillar kirib-chiqadigan avtoturargoh uchun mo'ljallangan tizim bilan kichik xususiy hudud uchun mo'ljallangan tizimning talablari bir xil bo'lmaydi. Shuningdek, avtomatik shlagbaum o'rnatilganda xavfsizlik masalasiga ham e'tibor berish kerak — xalqaro texnik standartlarda harakat, boshqaruv va himoya qurilmalariga oid talablar mavjud.",
          "При выборе важны ширина проезда, поток транспорта, частота использования и место установки. Система для парковки с сотнями проездов в день и система для небольшой частной территории — это разные требования. При установке автоматического шлагбаума также важна безопасность: международные стандарты содержат требования к движению, управлению и защитным устройствам.",
        ),
      },
      {
        type: "h2",
        text: T("Shlagbaum kerakmi?", "Нужен шлагбаум?"),
      },
      {
        type: "p",
        text: T(
          "Agar hududingizga avtomobillar kirishini tartibga solish kerak bo'lsa, shlagbaum qulay variantlardan biri bo'lishi mumkin. Biz bilan bog'laning — obyektingiz va transport oqimiga mos shlagbaumni tanlashda yordam beramiz.",
          "Если нужно упорядочить въезд автомобилей на территорию, шлагбаум — один из удобных вариантов. Свяжитесь с нами — поможем подобрать шлагбаум под ваш объект и поток транспорта.",
        ),
      },
    ],
  },

  /* ─────────────── 4. Bollard ─────────────── */
  {
    slug: "bollard-nima",
    categorySlug: "bollard",
    title: T(
      "Bollard nima va avtomobillardan himoyalashda qanday ishlatiladi?",
      "Что такое боллард и как он защищает от автомобилей?",
    ),
    excerpt: T(
      "Piyodalar hududiga avtomobillar kirishini cheklash yoki bino oldidagi maydonni transportdan ajratish kerakmi? Bollard shu vazifa uchun ishlatiladi.",
      "Нужно ограничить въезд автомобилей в пешеходную зону или отделить площадку перед зданием от транспорта? Для этого используются болларды.",
    ),
    image: "/products/bollard.svg",
    date: "2026-08-14",
    readMinutes: 3,
    body: [
      {
        type: "p",
        text: T(
          "Bollard — avtomobillar harakatini cheklash uchun yo'l yoki hudud bo'ylab o'rnatiladigan ustunsimon to'siq. Uning vazifasi qo'llaniladigan turiga qarab farq qiladi: ba'zi bollardlar asosan transportni piyodalar hududidan ajratish uchun ishlatiladi, maxsus xavfsizlik uchun ishlab chiqilganlari esa transport vositalarining majburiy kirib kelishiga qarshi mo'ljallanishi mumkin.",
          "Боллард — это столбовидный барьер, устанавливаемый вдоль дороги или территории для ограничения движения автомобилей. Задача зависит от типа: одни болларды отделяют транспорт от пешеходных зон, другие — специальные защитные — рассчитаны на противодействие принудительному въезду.",
        ),
      },
      {
        type: "h2",
        text: T("Bollard qayerlarda ishlatiladi?", "Где встречаются болларды?"),
      },
      {
        type: "list",
        items: [
          T("Piyodalar yo'laklari", "Пешеходные дорожки"),
          T("Savdo markazlari oldi", "Территории у торговых центров"),
          T("Banklar", "Банки"),
          T("Mehmonxonalar", "Гостиницы"),
          T("Davlat binolari", "Государственные здания"),
          T("Turar-joy majmualari", "Жилые комплексы"),
          T("Avtoturargohlar", "Парковки"),
          T("Maxsus himoyalanadigan hududlar", "Особо охраняемые территории"),
        ],
      },
      {
        type: "p",
        text: T(
          "Bollardning doimiy o'rnatiladigan va boshqariladigan turlari mavjud. Boshqariladigan modellarda ustun kerak bo'lganda tushirilishi yoki ko'tarilishi mumkin.",
          "Болларды бывают стационарными и управляемыми. В управляемых моделях столб при необходимости опускается или поднимается.",
        ),
      },
      {
        type: "h2",
        text: T("Barcha bollardlar avtomobilni to'xtatadimi?", "Все ли болларды останавливают автомобиль?"),
      },
      {
        type: "p",
        text: T(
          "Yo'q — bu juda muhim farq. Oddiy dekorativ yoki yo'lni ajratish uchun mo'ljallangan bollardni maxsus transport xavfsizligi to'sig'i bilan tenglashtirib bo'lmaydi. Agar maqsad avtomobil zarbasidan himoyalanish bo'lsa, mahsulotning sinov natijalari, himoya darajasi va tegishli standartlarga muvofiqligi tekshirilishi kerak.",
          "Нет — и это важное различие. Обычный декоративный или разделительный боллард нельзя приравнивать к специальному барьеру транспортной безопасности. Если цель — защита от удара автомобиля, нужно проверять результаты испытаний, класс защиты и соответствие стандартам.",
        ),
      },
      {
        type: "h2",
        text: T("To'g'ri bollardni tanlash", "Как выбрать подходящий боллард"),
      },
      {
        type: "p",
        text: T(
          "Bollard tanlashda uning vazifasi birinchi o'rinda turadi: u faqat hududni ajratish uchunmi yoki yuqori darajadagi transport xavfsizligi kerakmi — shunga qarab konstruksiya tanlanadi. Biz bilan bog'laning — obyektingiz vazifasiga mos bollard turini tanlashga yordam beramiz.",
          "При выборе болларда на первом месте — его задача: только разделить территорию или обеспечить высокий уровень транспортной безопасности. Свяжитесь с нами — поможем подобрать тип болларда под задачу вашего объекта.",
        ),
      },
    ],
  },

  /* ─────────────── 5. Antitarran ─────────────── */
  {
    slug: "antitarran-nima",
    categorySlug: "antitarran",
    title: T(
      "Antitarran nima va u nima uchun kerak?",
      "Что такое антитаран и зачем он нужен?",
    ),
    excerpt: T(
      "Oddiy to'siq avtomobilni shunchaki cheklashi mumkin. Ammo yuqori darajadagi transport xavfsizligi talab qilinadigan obyektlarda maxsus himoya tizimi kerak bo'ladi.",
      "Обычный барьер может лишь ограничить автомобиль. Но на объектах с высокими требованиями к транспортной безопасности нужна специальная система защиты.",
    ),
    image: "/products/antitarran.webp",
    date: "2026-08-12",
    readMinutes: 3,
    body: [
      {
        type: "p",
        text: T(
          "Antitarran — transport vositalarining ruxsatsiz yoki majburiy ravishda muhofaza qilinadigan hududga kirib kelishini cheklash uchun mo'ljallangan xavfsizlik to'sig'i. Xalqaro texnik adabiyotlarda bunday mahsulotlar ko'pincha vehicle security barrier, ya'ni transport vositalariga qarshi xavfsizlik to'siqlari sifatida yuritiladi.",
          "Антитаран — это защитный барьер, предназначенный для предотвращения несанкционированного или принудительного въезда транспорта на охраняемую территорию. В международной технической литературе такие изделия называют vehicle security barrier — барьеры транспортной безопасности.",
        ),
      },
      {
        type: "h2",
        text: T("Antitarran qayerlarda qo'llanadi?", "Где применяются антитараны?"),
      },
      {
        type: "list",
        items: [
          T("Elchixonalar", "Посольства"),
          T("Aeroportlar", "Аэропорты"),
          T("Harbiy obyektlar", "Военные объекты"),
          T("Muhim davlat binolari", "Важные государственные здания"),
          T("Strategik va maxsus obyektlar", "Стратегические и специальные объекты"),
          T("Xavfsizlik darajasi yuqori korxonalar", "Предприятия с высоким уровнем безопасности"),
        ],
      },
      {
        type: "p",
        text: T(
          "Antitarran tizimlarining konstruksiyasi va himoya darajasi turlicha bo'lishi mumkin. Shu sababli mahsulot tanlashda obyektning xavf tahlili va real foydalanish sharoitini hisobga olish kerak.",
          "Конструкция и уровень защиты антитаранных систем различаются. Поэтому при выборе нужно опираться на анализ рисков объекта и реальные условия эксплуатации.",
        ),
      },
      {
        type: "h2",
        text: T("Antitarran tanlashda eng muhim jihat", "Самое важное при выборе антитарана"),
      },
      {
        type: "p",
        text: T(
          "Antitarran mahsulotlar haqida «istalgan avtomobilni to'xtatadi» yoki «100% himoya qiladi» kabi umumiy gaplardan foydalanish to'g'ri emas. Haqiqiy himoya darajasi maxsus sinovlar va sertifikatlar orqali aniqlanadi. Shuning uchun obyekt uchun antitarran tanlashda aynan qanday xavfdan himoyalanish kerakligini aniqlash birinchi qadam hisoblanadi.",
          "Общие фразы вроде «остановит любой автомобиль» или «защищает на 100%» некорректны. Реальный уровень защиты определяется специальными испытаниями и сертификатами. Поэтому первый шаг при выборе антитарана — определить, от какой именно угрозы нужно защищаться.",
        ),
      },
      {
        type: "h2",
        text: T("Sizga antitarran tizimi kerakmi?", "Нужна ли вам антитаранная система?"),
      },
      {
        type: "p",
        text: T(
          "Agar obyekt yuqori darajadagi transport xavfsizligini talab qilsa, oddiy shlagbaum yoki bollard o'rniga maxsus xavfsizlik yechimi kerak bo'lishi mumkin. Biz bilan bog'laning — obyekt talablarini hisobga olgan holda mos antitarran yechimini tanlashga yordam beramiz.",
          "Если объект требует высокого уровня транспортной безопасности, вместо обычного шлагбаума или болларда может понадобиться специальное решение. Свяжитесь с нами — поможем подобрать антитаранную систему с учётом требований объекта.",
        ),
      },
    ],
  },

  /* ─────────────── 6. Maxsus eshiklar ─────────────── */
  {
    slug: "maxsus-eshiklar-farqi",
    categorySlug: "maxsus-eshiklar",
    title: T(
      "Maxsus eshiklar nima va oddiy eshikdan farqi nimada?",
      "Что такое специальные двери и чем они отличаются от обычных?",
    ),
    excerpt: T(
      "Ba'zi obyektlarda eshikning vazifasi faqat xonaga kirish va chiqish emas — u yong'in, tutun, o'q yoki boshqa xavflardan himoyalash tizimining bir qismi bo'lishi mumkin.",
      "На некоторых объектах задача двери — не только вход и выход: она может быть частью системы защиты от огня, дыма, пуль и других угроз.",
    ),
    image: "/products/maxsus-eshik.webp",
    date: "2026-08-10",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: T(
          "Maxsus eshiklar — muayyan xavf yoki maxsus foydalanish sharoitlari uchun ishlab chiqilgan eshik konstruksiyalaridir. Ularning turi obyektning talabiga qarab farq qiladi: yong'inga chidamli eshiklar, tutunga qarshi konstruksiyalar yoki o'qdan himoyalovchi maxsus eshiklar mavjud.",
          "Специальные двери — это конструкции, разработанные под конкретную угрозу или особые условия эксплуатации. Тип зависит от требований объекта: существуют противопожарные двери, противодымные конструкции и пулестойкие двери.",
        ),
      },
      {
        type: "h2",
        text: T("Yong'inga chidamli eshiklar", "Противопожарные двери"),
      },
      {
        type: "p",
        text: T(
          "Yong'inga chidamli eshiklarning asosiy vazifalaridan biri yong'in va tutunning bir hududdan boshqasiga tarqalishini ma'lum vaqt davomida cheklashdir. Bunda faqat eshik polotnosi emas, balki rom, ilgaklar, qulflash mexanizmi, zichlagichlar va boshqa elementlarning birgalikdagi ishlashi muhim.",
          "Одна из главных задач противопожарной двери — ограничить распространение огня и дыма из одной зоны в другую в течение нормированного времени. Важна совместная работа не только полотна, но и рамы, петель, замка, уплотнителей и других элементов.",
        ),
      },
      {
        type: "h2",
        text: T("O'qdan himoyalovchi eshiklar", "Пулестойкие двери"),
      },
      {
        type: "p",
        text: T(
          "O'qdan himoyalovchi eshiklar maxsus konstruksiya va materiallar yordamida o'qotar qurollardan keladigan xavfni kamaytirishga mo'ljallangan. Bunday eshikning himoya darajasi oddiy «zirhli eshik» degan nom bilan emas, balki tegishli sinov va standartlar asosida baholanishi kerak. Shuning uchun maxsus eshik tanlashda «qanchalik mustahkam?» degan savoldan tashqari, «qanday xavfdan va qaysi darajada himoya qilishi kerak?» degan savol ham muhim.",
          "Пулестойкие двери снижают угрозу от огнестрельного оружия за счёт специальной конструкции и материалов. Класс защиты такой двери оценивается не словом «бронированная», а соответствующими испытаниями и стандартами. Поэтому при выборе важен не только вопрос «насколько прочная?», но и «от какой угрозы и в каком классе она должна защищать?».",
        ),
      },
      {
        type: "h2",
        text: T("Maxsus eshik qayerlarda kerak bo'ladi?", "Где нужны специальные двери?"),
      },
      {
        type: "list",
        items: [
          T("Banklarda", "В банках"),
          T("Server xonalarida", "В серверных"),
          T("Maxsus saqlash xonalarida", "В спецхранилищах"),
          T("Sanoat obyektlarida", "На промышленных объектах"),
          T("Harbiy obyektlarda", "На военных объектах"),
          T("Xavfsizlik talabi yuqori binolarda", "В зданиях с высокими требованиями безопасности"),
        ],
      },
      {
        type: "p",
        text: T(
          "Sizning obyektingiz uchun qanday himoya darajasidagi eshik kerakligini aniqlash uchun biz bilan bog'laning.",
          "Свяжитесь с нами, чтобы определить, дверь какого класса защиты нужна вашему объекту.",
        ),
      },
    ],
  },

  /* ─────────────── 7. Otkatnoy ─────────────── */
  {
    slug: "otkatnoy-darvoza-nima",
    categorySlug: "otkatnoy-darvoza",
    title: T(
      "Otkatnoy darvoza nima va qayerlarda ishlatiladi?",
      "Что такое откатные ворота и где они применяются?",
    ),
    excerpt: T(
      "Darvoza ochilganda hovli yoki kirish qismidagi joyni egallamasin desangiz, otkatnoy darvoza qulay variant bo'lishi mumkin.",
      "Если нужно, чтобы ворота при открытии не занимали место во дворе или на въезде, откатные ворота — удобный вариант.",
    ),
    image: "/products/otkatnoy-darvoza.webp",
    date: "2026-08-08",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: T(
          "Otkatnoy darvoza — ochilganda yon tomonga surilib harakatlanadigan darvoza turidir. Uning konstruksiyasida darvoza polotnosi bir tomonga siljiydi va kirish joyini ochadi. Seksion yoki rolstavniy darvozadan farqli ravishda otkatnoy darvoza yon tomondagi bo'sh joydan foydalanadi.",
          "Откатные ворота — это ворота, полотно которых при открытии сдвигается в сторону, освобождая проём. В отличие от секционных или рольставней, откатные ворота используют свободное пространство сбоку.",
        ),
      },
      {
        type: "h2",
        text: T("Otkatnoy darvozaning asosiy xususiyati", "Главная особенность откатных ворот"),
      },
      {
        type: "p",
        text: T(
          "Otkatnoy darvoza ochilganda oldinga yoki orqaga burilmaydi — qanoti yon tomonga siljiydi. Shu sababli darvoza oldidagi maydonni avtomobilning kirib-chiqishi uchun saqlab qolish mumkin. Bu ayniqsa hovli ichida avtomobil to'xtaydigan joylarda yoki kirish qismi yo'lga yaqin joylashgan obyektlarda foydali.",
          "При открытии полотно не поворачивается вперёд или назад — оно сдвигается вбок. Поэтому площадка перед воротами остаётся свободной для проезда. Это особенно полезно там, где во дворе паркуется автомобиль или въезд расположен близко к дороге.",
        ),
      },
      {
        type: "h2",
        text: T("Otkatnoy darvoza qayerlarda ishlatiladi?", "Где применяются откатные ворота?"),
      },
      {
        type: "list",
        items: [
          T("Xususiy hovlilarda", "В частных дворах"),
          T("Korxonalarda", "На предприятиях"),
          T("Omborlarda", "На складах"),
          T("Avtoturargohlarda", "На парковках"),
          T("Ishlab chiqarish obyektlarida", "На производственных объектах"),
          T("Yopiq hududlarga kirish joylarida", "На въездах в закрытые территории"),
        ],
      },
      {
        type: "p",
        text: T(
          "Otkatnoy darvozalar qo'lda boshqariladigan yoki avtomatlashtirilgan bo'lishi mumkin. Avtomatik darvozada motor, boshqaruv tizimi, xavfsizlik datchiklari va boshqa komponentlar obyekt sharoitiga mos tanlanadi.",
          "Откатные ворота бывают с ручным управлением или автоматизированные. В автоматических воротах мотор, система управления и датчики безопасности подбираются под условия объекта.",
        ),
      },
      {
        type: "h2",
        text: T(
          "Otkatnoy darvoza tanlashda nimalarga e'tibor berish kerak?",
          "На что обратить внимание при выборе?",
        ),
      },
      {
        type: "p",
        text: T(
          "Eng avvalo, darvoza ochilganda yon tomonda yetarli masofa mavjudligini tekshirish kerak. Bundan tashqari, darvozaning o'lchami va og'irligi, poydevor, harakat mexanizmi, foydalanish chastotasi va avtomatika turi hisobga olinadi. Sifatli ishlashi faqat darvozaning o'ziga emas, balki to'g'ri o'lchash, konstruksiya, montaj va sozlashga ham bog'liq.",
          "Прежде всего нужно проверить, достаточно ли места сбоку для отката полотна. Также учитываются размер и вес ворот, фундамент, механизм движения, частота использования и тип автоматики. Качественная работа зависит не только от самих ворот, но и от правильного замера, конструкции, монтажа и настройки.",
        ),
      },
      {
        type: "p",
        text: T(
          "Hovlingiz yoki obyektingiz uchun otkatnoy darvoza kerakmi? Biz bilan bog'laning — joyingizga mos konstruksiya va avtomatika variantini tanlashga yordam beramiz.",
          "Нужны откатные ворота для двора или объекта? Свяжитесь с нами — поможем подобрать конструкцию и автоматику под ваше место.",
        ),
      },
    ],
  },
];

export const getArticle = (slug: string) =>
  articles.find((a) => a.slug === slug);

export const similarArticles = (slug: string, n = 3) =>
  articles.filter((a) => a.slug !== slug).slice(0, n);
