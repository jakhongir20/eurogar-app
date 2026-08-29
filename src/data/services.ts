import type { I18nText } from "@/lib/types";

/**
 * Xizmatlar — alutech.uz andazasi bo'yicha (zamer, montaj, servis,
 * yetkazib berish), lekin Eurogar'ning real shartlari bilan:
 * bepul o'lchov, 3–7 kunda o'rnatish, 1–5 yil kafolat.
 */

const T = (uz: string, ru: string): I18nText => ({ uz, ru });

export interface ServiceStep {
  title: I18nText;
  text: I18nText;
}

export interface Service {
  id: string;
  icon: string;
  title: I18nText;
  short: I18nText;
  intro: I18nText;
  bullets: I18nText[];
  note?: I18nText;
}

export const services: Service[] = [
  {
    id: "zamer",
    icon: "Ruler",
    title: T("O'lchov va konsultatsiya", "Замер и консультация"),
    short: T(
      "Mutaxassis obyektga bepul keladi, aniq o'lchaydi va yakuniy narxni aytadi",
      "Специалист бесплатно приедет на объект, точно замерит и назовёт финальную цену",
    ),
    intro: T(
      "Darvoza yoki to'siq tanlashda eng muhim bosqich — to'g'ri o'lchov. Ochilish o'lchamidagi 1–2 sm xato butun konstruksiyaning ishlashiga ta'sir qiladi. Shuning uchun o'lchovni mutaxassisimiz o'zi bajaradi — bu xizmat butunlay bepul va sizni hech narsaga majburlamaydi.",
      "Самый важный этап при выборе ворот или ограждения — правильный замер. Ошибка в 1–2 см влияет на работу всей конструкции. Поэтому замер выполняет наш специалист — услуга полностью бесплатна и ни к чему вас не обязывает.",
    ),
    bullets: [
      T("Qulay kun va vaqtni siz tanlaysiz", "Удобные день и время выбираете вы"),
      T("Mutaxassis obyektni ko'rib, mos konstruksiyani tavsiya qiladi", "Специалист осмотрит объект и порекомендует подходящую конструкцию"),
      T("O'lchovdan so'ng yakuniy narx aytiladi — u keyin o'zgarmaydi", "После замера называется финальная цена — она не меняется"),
      T("Toshkent, Jizzax va Samarqand bo'ylab bepul", "Бесплатно по Ташкенту, Джизаку и Самарканду"),
    ],
  },
  {
    id: "montazh",
    icon: "Wrench",
    title: T("Professional montaj", "Профессиональный монтаж"),
    short: T(
      "Kelishuvdan so'ng 3–7 kun ichida olib borib, o'rnatib, topshirib chiqib ketamiz",
      "После договорённости привезём, установим и сдадим объект за 3–7 дней",
    ),
    intro: T(
      "Konstruksiyaning umri to'g'ri montajga bog'liq. O'rnatishni faqat o'z brigadalarimiz bajaradi — ular har bir mahsulot turi bo'yicha tayyorgarlikdan o'tgan. Ishni tugatgach, mexanizmni sozlab, sizga ishlatib ko'rsatamiz va kafolat hujjatini topshiramiz.",
      "Срок службы конструкции зависит от правильного монтажа. Установку выполняют только наши бригады, обученные по каждому типу изделий. По завершении настраиваем механизм, показываем работу и передаём гарантийный документ.",
    ),
    bullets: [
      T("Kelishuvdan o'rnatishgacha — 3–7 kun", "От договорённости до установки — 3–7 дней"),
      T("O'z montaj brigadalarimiz, pudratchilarsiz", "Собственные бригады, без субподрядчиков"),
      T("Sozlash va ishlatishni o'rgatish narxga kiritilgan", "Настройка и обучение включены в стоимость"),
      T("Ish yakunida kafolat hujjati beriladi", "По завершении выдаётся гарантийный документ"),
    ],
  },
  {
    id: "servis",
    icon: "Settings",
    title: T("Servis va ta'mirlash", "Сервис и ремонт"),
    short: T(
      "O'rnatilgan tizimlarga texnik xizmat — kafolat davrida ham, undan keyin ham",
      "Техническое обслуживание установленных систем — в гарантию и после неё",
    ),
    intro: T(
      "Avtomatik darvoza va shlagbaumlar davriy texnik ko'rikni talab qiladi: mexanizmlarni moylash, avtomatikani sozlash, eskirgan qismlarni almashtirish. Servis xizmatimiz faqat biz o'rnatgan emas, boshqa tizimlarga ham xizmat ko'rsatadi.",
      "Автоматические ворота и шлагбаумы требуют периодического обслуживания: смазка механизмов, настройка автоматики, замена изношенных частей. Наш сервис обслуживает не только установленные нами системы.",
    ),
    bullets: [
      T("Kafolat davrida ta'mirlash — bepul", "Ремонт в гарантийный период — бесплатно"),
      T("Ehtiyot qismlar omborda — kutish minimal", "Запчасти на складе — минимальное ожидание"),
      T("Boshqa firmalar o'rnatgan tizimlarga ham xizmat", "Обслуживаем системы, установленные другими"),
      T("Chaqiruv bo'yicha yoki rejali texnik ko'rik", "Выезд по заявке или плановое обслуживание"),
    ],
  },
  {
    id: "delivery",
    icon: "Truck",
    title: T("Yetkazib berish va to'lov", "Доставка и оплата"),
    short: T(
      "Mahsulotni obyektgacha o'zimiz yetkazamiz; to'lov — naqd, o'tkazma yoki karta",
      "Доставим изделие до объекта сами; оплата — наличные, перечисление или карта",
    ),
    intro: T(
      "Yetkazib berish montaj bilan birga rejalashtiriladi — mahsulot obyektga brigada bilan bir kunda keladi, saqlash joyi haqida o'ylashingiz shart emas. Filiallarimiz Toshkent, Jizzax va Samarqandda — qo'shni hududlarga ham chiqamiz.",
      "Доставка планируется вместе с монтажом — изделие приезжает на объект в один день с бригадой, о месте хранения думать не нужно. Филиалы в Ташкенте, Джизаке и Самарканде — выезжаем и в соседние регионы.",
    ),
    bullets: [
      T("Yetkazish montaj kuni bilan birlashtiriladi", "Доставка совмещается с днём монтажа"),
      T("Naqd, bank o'tkazmasi yoki karta orqali to'lov", "Оплата наличными, переводом или картой"),
      T("Yuridik shaxslar uchun shartnoma va hisob-faktura", "Для юрлиц — договор и счёт-фактура"),
      T("Viloyatlarga yetkazish — kelishuv asosida", "Доставка в регионы — по договорённости"),
    ],
  },
];

/* ─────────────── FAQ (TZ 2.11) ─────────────── */

export interface FaqItem {
  q: I18nText;
  a: I18nText;
}

export interface FaqGroup {
  id: string;
  title: I18nText;
  items: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    id: "order",
    title: T("Buyurtma va o'lchov", "Заказ и замер"),
    items: [
      {
        q: T("Buyurtma qanday amalga oshadi?", "Как происходит заказ?"),
        a: T(
          "Saytda ariza qoldirasiz yoki qo'ng'iroq qilasiz → mutaxassis obyektga bepul kelib o'lchaydi va yakuniy narxni aytadi → kelishuvdan so'ng 3–7 kun ichida mahsulotni olib borib, o'rnatib, topshirib chiqib ketamiz.",
          "Оставляете заявку на сайте или звоните → специалист бесплатно приезжает на замер и называет финальную цену → после договорённости в течение 3–7 дней привозим, устанавливаем и сдаём объект.",
        ),
      },
      {
        q: T("O'lchov haqiqatan bepulmi?", "Замер действительно бесплатный?"),
        a: T(
          "Ha. Mutaxassisning kelishi, o'lchov va konsultatsiya butunlay bepul va sizni buyurtmaga majburlamaydi. Toshkent, Jizzax va Samarqand bo'ylab amal qiladi.",
          "Да. Выезд специалиста, замер и консультация полностью бесплатны и ни к чему не обязывают. Действует по Ташкенту, Джизаку и Самарканду.",
        ),
      },
      {
        q: T(
          "Kalkulyatordagi narx yakuniymi?",
          "Цена в калькуляторе окончательная?",
        ),
        a: T(
          "Kalkulyator taxminiy narxni ko'rsatadi — u yo'naltiruvchi hisoblanadi. Yakuniy narx bepul o'lchovdan keyin aytiladi va shundan so'ng o'zgarmaydi.",
          "Калькулятор показывает ориентировочную цену. Финальная стоимость называется после бесплатного замера и после этого не меняется.",
        ),
      },
      {
        q: T("Qaysi hududlarga xizmat ko'rsatasizlar?", "Какие регионы вы обслуживаете?"),
        a: T(
          "Filiallarimiz Toshkent, Jizzax va Samarqandda joylashgan. Qo'shni viloyatlarga yetkazish va o'rnatish kelishuv asosida amalga oshiriladi.",
          "Филиалы расположены в Ташкенте, Джизаке и Самарканде. Доставка и монтаж в соседние области — по договорённости.",
        ),
      },
    ],
  },
  {
    id: "product",
    title: T("Mahsulot tanlash", "Выбор изделия"),
    items: [
      {
        q: T(
          "Garaj uchun qaysi darvoza yaxshi: rolstavniy yoki seksion?",
          "Какие ворота лучше для гаража: рольставни или секционные?",
        ),
        a: T(
          "Ikkalasi ham joy tejaydi. Seksion darvoza issiqlikni yaxshi saqlaydi (sendvich-panel) — isitiladigan garajga mos. Rolstavniy ixchamroq va arzonroq — sovuq garaj, ombor va do'konlarga ko'p tanlanadi. Mutaxassis o'lchov paytida obyektingizga qarab tavsiya beradi.",
          "Оба варианта экономят место. Секционные лучше держат тепло (сэндвич-панель) — подходят для отапливаемого гаража. Рольставни компактнее и дешевле — их чаще берут для холодных гаражей, складов и магазинов. Специалист порекомендует вариант на замере.",
        ),
      },
      {
        q: T(
          "Otkatnoy darvoza uchun qancha yon joy kerak?",
          "Сколько места сбоку нужно откатным воротам?",
        ),
        a: T(
          "Darvoza qanoti yon tomonga suriladi, shuning uchun ochilish kengligidan tashqari, taxminan bir yarim barobar bo'sh masofa kerak bo'ladi. Aniq hisobni mutaxassis o'lchovda aytadi.",
          "Полотно откатывается в сторону, поэтому помимо ширины проёма нужно примерно полторы его ширины свободного места. Точный расчёт специалист делает на замере.",
        ),
      },
      {
        q: T(
          "Elektr o'chsa avtomatik darvoza ochiladimi?",
          "Откроются ли автоматические ворота при отключении света?",
        ),
        a: T(
          "Ha. Barcha avtomatik tizimlarda avariya rejimi bor — maxsus kalit yoki zanjir orqali darvozani qo'lda ochish mumkin.",
          "Да. Во всех автоматических системах есть аварийный режим — ворота можно открыть вручную специальным ключом или цепью.",
        ),
      },
      {
        q: T(
          "Mavjud darvozamga avtomatika o'rnatib bera olasizlarmi?",
          "Можно ли установить автоматику на мои существующие ворота?",
        ),
        a: T(
          "Ko'p hollarda ha. Mutaxassis darvozangiz holati va og'irligini baholab, mos yuritmani tanlaydi. Buning uchun bepul o'lchovga yozib qo'yamiz.",
          "В большинстве случаев да. Специалист оценит состояние и вес ваших ворот и подберёт подходящий привод. Запишем вас на бесплатный замер.",
        ),
      },
    ],
  },
  {
    id: "warranty",
    title: T("Kafolat va servis", "Гарантия и сервис"),
    items: [
      {
        q: T("Kafolat qancha va nimaga beriladi?", "Какая гарантия и на что она даётся?"),
        a: T(
          "Barcha mahsulotlarga turiga qarab 1 yildan 5 yilgacha kafolat beramiz — u ham konstruksiyani, ham montaj ishlarini qamrab oladi. Aniq muddat shartnoma va kafolat hujjatida ko'rsatiladi.",
          "На все изделия даём гарантию от 1 года до 5 лет в зависимости от типа — она покрывает и конструкцию, и монтаж. Точный срок указывается в договоре и гарантийном документе.",
        ),
      },
      {
        q: T("Kafolat tugagach ta'mirlash mumkinmi?", "Ремонтируете ли после окончания гарантии?"),
        a: T(
          "Albatta. Servis xizmatimiz kafolatdan keyin ham ishlaydi: texnik ko'rik, sozlash, ehtiyot qismlarni almashtirish. Boshqa firmalar o'rnatgan tizimlarga ham xizmat ko'rsatamiz.",
          "Конечно. Сервис работает и после гарантии: обслуживание, настройка, замена запчастей. Обслуживаем и системы, установленные другими компаниями.",
        ),
      },
      {
        q: T(
          "Qanday hollarda kafolat amal qilmaydi?",
          "В каких случаях гарантия не действует?",
        ),
        a: T(
          "Noto'g'ri foydalanish, o'z-o'zidan ta'mirlash yoki konstruksiyaga mustaqil o'zgartirish kiritish, mexanik shikast va tabiiy ofat holatlarida. Batafsil shartlar kafolat hujjatida yoziladi.",
          "При неправильной эксплуатации, самостоятельном ремонте или изменении конструкции, механических повреждениях и стихийных бедствиях. Подробные условия — в гарантийном документе.",
        ),
      },
    ],
  },
  {
    id: "payment",
    title: T("To'lov", "Оплата"),
    items: [
      {
        q: T("Qanday to'lash mumkin?", "Как можно оплатить?"),
        a: T(
          "Naqd, bank o'tkazmasi yoki karta orqali. Yuridik shaxslar bilan shartnoma asosida, hisob-faktura bilan ishlaymiz.",
          "Наличными, банковским переводом или картой. С юридическими лицами работаем по договору со счётом-фактурой.",
        ),
      },
      {
        q: T("Oldindan to'lov kerakmi?", "Нужна ли предоплата?"),
        a: T(
          "Buyurtma tasdiqlangach qisman oldindan to'lov qilinadi, qolgan qismi mahsulot o'rnatilib, siz qabul qilganingizdan so'ng to'lanadi. Aniq tartib shartnomada belgilanadi.",
          "После подтверждения заказа вносится частичная предоплата, остаток — после установки и приёмки изделия. Точный порядок фиксируется в договоре.",
        ),
      },
    ],
  },
];
