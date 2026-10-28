Infra — qolgan 5 qadam
Baza — tavsiyam: Neon Postgres (Vercel'ga 2 klikda ulanadi, bepul tarif kifoya — mahsulot kam) + rasmlar uchun Vercel Blob. Bu "sharh + moderatsiya"ni ham ochib beradi. Ayting, qilib beraman.
Telegram bot — kod tayyor: token bo'lmasa konsolga yozadi, bo'lsa guruhga yuboradi. Sizdan: BotFather'dan token + menejerlar guruhi chat_id → Vercel'da TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID. KP'dagi "bot mijozga avtomatik javob yozadi" qismi alohida kichik webhook — token kelgach qo'shaman.
CRM — TZ'da "lead CRM + BOTga tushadi" deyilgan. CRM tanlovi hali yo'q (AmoCRM? Bitrix24?). Tanlansa, lead API'ga bitta integratsiya qo'shiladi.
Deployment — Vercel allaqachon ulangan, build toza. Faqat env o'zgaruvchilar (ADMIN_PASSWORD + telegram) kiritilishi kerak.
Domen — eurogar.uz qarori egasida. Olinganida Vercel'ga DNS yo'naltirish 10 daqiqalik ish. Email (info@eurogar.uz) ham taxminiy turibdi. SEO'dan sitemap.xml/robots.txt hali yo'q — keyingi iteratsiyada 20 daqiqalik ish, domen aniq bo'lgach qilgan ma'qul.
Kompaniyadan kutilayotgan materiallar

Real narxlar (mahsulotlar + kalkulyator koeffitsiyentlari), bollard/shlagbaum fotolari, individual loyihalar foto/videolari, sertifikatlar, kafolat jadvalini tasdiqlash (5/3/3/2/2/1 yil — mening taxminim), TZ'dagi eski raqamlar (20 yil/10 yil) o'rniga egasi bergan realларини (8 yil / 1–5 yil) ishlatganman — to'g'ri deb bilaman.

Xulosa: TZ'ning sahifa qatlami ~90% tayyor, yetishmayotgani material kutayotgan bloklar. Keyingi mantiqiy qadam — baza + Telegram token, shunda sayt "jonli"ga aylanadi. Qaysi biridan boshlay?

Yandex Metrica:

useSearchParams Suspense talab qiladi va birinchi sahifa ko'rishi skript yuklanishidan oldin yo'qolishi mumkin — ikkalasini tuzataman:

Ran 16 commands, used 3 tools, read a memory · 2 notes

Yandex Metrika ulandi — commit 9ffcf59.

Nima qilindi. Hisoblagich afterInteractive rejimida yuklanadi, ya'ni sahifa chizilishiga va tezlik ko'rsatkichlariga ta'sir qilmaydi. Next.js sahifalar orasida to'liq qayta yuklanmagani uchun har o'tishda sahifa ko'rishi qo'lda yuboriladi — aks holda faqat kirish sahifasi hisoblanardi (bu Metrika'ni Next'ga ulaganda eng ko'p uchraydigan xato).

Eng qimmatlisi — maqsadlar. Oddiy tashriflar statistikasi biznesga kam narsa beradi; muhimi qaysi sahifa va qaysi manba haqiqiy mijoz keltirayotgani. Olti xil harakat qayd etiladi: ariza yuborish (qaysi formadan kelgani bilan — kalkulyator, aloqa yoki qo'ng'iroq so'rovi), savatdan buyurtma (summa va mahsulot soni bilan), sharh qoldirish, telefon raqamiga bosish, Telegram va ijtimoiy tarmoqlarga o'tish. Telefon va tarmoq bosishlari uchun har bir havolani alohida o'zgartirmadim — bitta umumiy tinglovchi hammasini ushlaydi, shuning uchun keyin qo'shiladigan havolalar ham avtomatik hisoblanadi.

Tekshiruv: brauzerda soxta Metrika bilan sinab ko'rdim — sahifa ko'rishlari, SPA o'tishlari, telefon va Telegram bosishlari, aloqa formasi va sharh maqsadlari hammasi to'g'ri yuborildi. ID qo'yilmasa skript umuman yuklanmaydi (dev'da statistika ifloslanmaydi).

Sizdan qadamlar:

metrika.yandex.ru da hisoblagich yarating.
Raqamini NEXT_PUBLIC_YANDEX_METRIKA_ID ga yozing — .env.local va Vercel env'ga, keyin redeploy (bu o'zgaruvchi ham build vaqtida o'qiladi).
Metrika kabinetida Настройки → Цели → JavaScript-событие orqali oltita maqsad yarating, identifikatorlari aynan shunday: lead_submit, order_submit, review_submit, phone_click, telegram_click, social_click. Jadval README'da ham bor.
git push.

Bir narsa aytib qo'yay: Vebvizor (sessiya yozuvi) yoqilgan — mijoz saytda nima qilganini video kabi ko'rasiz. Metrika forma maydonlarini avtomatik yashiradi, lekin siz mijoz ismi va telefonini yig'asiz, shuning uchun agar ortiqcha deb hisoblasangiz kabinetdan o'chirib qo'ying (Настройки → Вебвизор).

Keyingi navbatda kompaniyadan material kutayotgan ishlar qoldi: real narxlar, bollard/shlagbaum fotolari va TZ'dagi yagona qilinmagan sahifa — individual loyihalar galereyasi. Yoki CRM tanlovi.
