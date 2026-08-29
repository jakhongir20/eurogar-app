# EUROGAR — internet-do'kon + admin panel

Monolit Next.js ilova: korporativ sayt, mahsulot katalogi, savat, buyurtma formasi,
narx kalkulyatori va `/admin` boshqaruv paneli. Ikki til: **o'zbekcha / ruscha**.

> Ma'lumotlar qatlami ikki rejimda ishlaydi (`src/lib/repo.ts`):
> **DATABASE_URL berilsa — PostgreSQL** (Prisma 7, doimiy saqlash),
> berilmasa — xotira rejimi (dev uchun qulay, restart'da tozalanadi).
> Baza bo'sh bo'lsa mock-katalog avtomatik seed qilinadi.

---

## Ishga tushirish

```bash
npm install
cp .env.example .env.local   # qiymatlarni to'ldiring
npm run dev                  # http://localhost:3000
```

Prod uchun:

```bash
npm run build
npm run start
```

## Texnologiyalar

| Qatlam | Yechim |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Til | TypeScript |
| Uslub | Tailwind CSS v4 (`src/app/globals.css` — dizayn tokenlari) |
| Server holati | TanStack Query v5 |
| Savat | Zustand + localStorage |
| Animatsiya | Motion (framer-motion) |
| i18n | next-intl (`/uz`, `/ru`) |
| Ikonkalar | lucide-react |
| Shriftlar | Manrope + Unbounded — loyiha ichida (`src/fonts`), tashqi so'rovsiz |

## Sahifalar

| Yo'l | Nima |
|---|---|
| `/uz`, `/ru` | Bosh sahifa |
| `/catalog` | Barcha toifalar + mahsulotlar (filtr, saralash) |
| `/catalog/[category]` | Toifa ichidagi mahsulotlar |
| `/product/[slug]` | Mahsulot kartochkasi |
| `/cart`, `/checkout` | Savat va buyurtma formasi |
| `/calculator` | Narx kalkulyatori |
| `/about`, `/contact`, `/privacy` | Statik sahifalar |
| `/admin` | Admin panel (parol bilan) |

## Admin panel

`/admin` — parol so'raladi. Demo parol: **`eurogar2026`**
(prod'da `.env.local` dagi `ADMIN_PASSWORD` bilan almashtiriladi).

Imkoniyatlar:

- **Mahsulotlar** — qo'shish, tahrirlash, o'chirish, yashirish, "tanlangan" belgisi,
  rasm yuklash (`public/uploads/`), narx / soni / tavsif (uz+ru)
- **Buyurtmalar** — ro'yxat, mijoz ma'lumotlari, holatni o'zgartirish
- **Arizalar** — kalkulyator, aloqa formasi va "qo'ng'iroq so'rovi" arizalari

## Telegram bot

Buyurtma va arizalar `POST /api/order` va `POST /api/lead` orqali qabul qilinadi
va Telegram guruhga yuboriladi. `.env.local` da token bo'lmasa — konsolga yoziladi
(xatolik bermaydi), shuning uchun ishlab chiqish bosqichida hammasi ishlayveradi.

```
TELEGRAM_BOT_TOKEN=123456:AAH...
TELEGRAM_CHAT_ID=-1001234567890
```

Botni sozlash: [@BotFather](https://t.me/BotFather) da bot yarating → tokenni oling →
botni menejerlar guruhiga qo'shing va admin qiling → guruh `chat_id` sini oling.

## Kalkulyator narxlari

Formula va koeffitsientlar: **`src/data/calculator.ts`**

```
narx = (maydon_m² × asosiy_m²_narx × material_k × chuqurlik_k
        + boshqaruv_narxi) × soni + yig'ish_narxi
```

Har bir mahsulot turi uchun: min/max o'lchamlar, materiallar (koeffitsient bilan),
boshqaruv turlari (qo'shimcha narx bilan). Hozirgi raqamlar **taxminiy** —
real narxlar berilganda shu fayldan o'zgartiriladi.

## Rang tizimi

Butun palitra **logotipdan** olingan (`src/app/globals.css` → `@theme`):

| Token | Qiymat | Qayerda |
|---|---|---|
| `brand-400` | `#29ABE2` | logotip siyani — tugma to'ldirmasi, to'q fondagi accent |
| `brand-600` | `#146F99` | och fonda **matn** uchun (siyan o'zi matn sifatida kontrastdan o'tmaydi) |
| `navy-800` | `#0B4A63` | logotipning to'q ko'ki — sarlavhalar, ikonkalar |
| `navy-900/950` | `#08303F` / `#04222F` | to'q bo'limlar: footer, CTA, kalkulyator paneli, admin sidebar |
| `bone-100…400` | salqin ko'k-kulrang | fon va chegaralar (iliq bej emas — ko'k brend bilan loyqa ko'rinadi) |
| `graphite` | `#0D2430` | asosiy matn |
| `muted` | `#556E80` | ikkilamchi matn |

**Ikki qoida:**

1. Siyan (`brand-400`) och fonda matn sifatida ishlatilmaydi — kontrasti 2.6 (kerak 4.5).
   Matn uchun `brand-600`, to'ldirma sifatida esa ustiga **to'q** matn qo'yiladi.
2. Siyan tugmada matn har doim to'q (`text-navy-950`) — oq matn 2.6 beradi, to'q matn 6.1.

Tekshirish:

```bash
npm run build && npm run start          # boshqa terminalda
npm run contrast                        # barcha sahifalarda WCAG AA auditi
```

Audit sahifalarning haqiqiy renderida har bir matn/fon juftligini o'lchaydi.
Hozirgi holat: **0 ta muammo**.

## Mahsulot rasmlari

`public/products/*.svg` — vaqtinchalik studiya renderlari,
`scripts/gen-images.mjs` orqali generatsiya qilingan (`node scripts/gen-images.mjs`).
Real fotolar kelganda shu nomlar bilan almashtiriladi yoki admin paneldan yuklanadi.

## Loyiha tuzilishi

```
src/
  app/
    (site)/[locale]/     — ommaviy sayt (uz/ru)
    (admin)/admin/       — admin panel
    api/                 — lead, order, admin API
  components/
    ui/                  — Button, Input, Reveal, Counter, ...
    layout/              — Header, Footer, CartDrawer, MobileMenu, Search
    home/                — bosh sahifa bloklari
    catalog/ product/ checkout/ calculator/ contact/ admin/
  data/                  — mock ma'lumotlar (kategoriyalar, mahsulotlar, kalkulyator)
  lib/                   — types, utils, savat, telegram, store
  messages/              — uz.json, ru.json (barcha matnlar)
  fonts/                 — woff2 shriftlar
```

## Ma'lumotlar bazasi (PostgreSQL)

Tavsiya: **Neon** (Vercel Marketplace, bepul tarif kifoya).

1. Vercel loyihada **Storage → Create Database → Neon** (yoki neon.tech'da bepul baza)
   — `DATABASE_URL` env avtomatik qo'shiladi. Lokal uchun `.env.local` ga nusxalang.
2. Jadvallarni yaratish (bir marta):

   ```bash
   bun run db:push
   ```

3. Tamom. Birinchi so'rovda katalog bo'sh bo'lsa, mock mahsulotlar avtomatik
   seed bo'ladi. Ma'lumotlarni ko'rish: `bun run db:studio`.

Rasmlar: Vercel loyihada **Storage → Blob** yaratilsa `BLOB_READ_WRITE_TOKEN`
o'zi qo'shiladi va admin yuklagan rasmlar doimiy omborga tushadi
(token bo'lmasa — `public/uploads/`, faqat lokal dev uchun).

Eslatma: sxema o'zgarganda `bun run db:push` qayta ishga tushiriladi;
klient `bun install` paytida (`postinstall`) avtomatik generatsiya bo'ladi.

## Keyingi bosqichlar

1. Telegram bot tokenini ulash (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`)
2. Mijoz sharhlari + admin moderatsiyasi (TZ 2.10 — baza tayyor)
3. CRM integratsiyasi (tanlov kutilmoqda)
4. Domen (eurogar.uz) + sitemap/robots
