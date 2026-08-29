import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/catalog/page-header";
import { Reveal } from "@/components/ui/reveal";

const CONTENT = {
  uz: {
    title: "Maxfiylik siyosati",
    subtitle:
      "Saytdan foydalanganda qanday ma'lumotlar to'planishi va ular qanday ishlatilishi haqida",
    blocks: [
      {
        h: "1. Qanday ma'lumotlar to'planadi",
        p: "Saytdagi formalar orqali siz ixtiyoriy ravishda qoldirgan ma'lumotlar: ism, telefon raqami, yetkazib berish manzili va izohingiz. Bulardan tashqari, sayt ishini yaxshilash uchun anonim texnik ma'lumotlar (brauzer turi, kirilgan sahifalar) yig'ilishi mumkin.",
      },
      {
        h: "2. Ma'lumotlar nima uchun ishlatiladi",
        p: "Faqat sizning arizangizni ko'rib chiqish, siz bilan bog'lanish, o'lchov va yetkazib berishni tashkil qilish uchun. Boshqa maqsadlarda foydalanilmaydi.",
      },
      {
        h: "3. Uchinchi shaxslarga berilishi",
        p: "Ma'lumotlaringiz sotilmaydi va reklama maqsadida uchinchi shaxslarga berilmaydi. Ular faqat buyurtmani bajarish bilan bevosita bog'liq xodimlar va yetkazib beruvchilarga taqdim etiladi.",
      },
      {
        h: "4. Saqlash muddati va himoya",
        p: "Arizalar buyurtma tarixini yuritish uchun saqlanadi. Ma'lumotlar himoyalangan serverda saqlanadi va faqat vakolatli xodimlar kira oladi.",
      },
      {
        h: "5. Sizning huquqlaringiz",
        p: `Istalgan vaqtda o'z ma'lumotlaringizni o'chirishni yoki o'zgartirishni so'rashingiz mumkin — buning uchun ${site.email} manziliga yozing yoki ${site.phones[0]} raqamiga qo'ng'iroq qiling.`,
      },
      {
        h: "6. Cookie fayllar",
        p: "Sayt til tanlovi va savatdagi mahsulotlarni eslab qolish uchun brauzer xotirasidan foydalanadi. Bu ma'lumotlar faqat sizning qurilmangizda saqlanadi.",
      },
    ],
  },
  ru: {
    title: "Политика конфиденциальности",
    subtitle:
      "Какие данные собираются при использовании сайта и как они используются",
    blocks: [
      {
        h: "1. Какие данные собираются",
        p: "Данные, которые вы добровольно оставляете через формы на сайте: имя, номер телефона, адрес доставки и комментарий. Кроме того, для улучшения работы сайта могут собираться анонимные технические данные (тип браузера, посещённые страницы).",
      },
      {
        h: "2. Для чего используются данные",
        p: "Только для обработки вашей заявки, связи с вами, организации замера и доставки. В других целях данные не используются.",
      },
      {
        h: "3. Передача третьим лицам",
        p: "Ваши данные не продаются и не передаются третьим лицам в рекламных целях. Они доступны только сотрудникам и подрядчикам, непосредственно участвующим в выполнении заказа.",
      },
      {
        h: "4. Срок хранения и защита",
        p: "Заявки хранятся для ведения истории заказов. Данные размещены на защищённом сервере, доступ имеют только уполномоченные сотрудники.",
      },
      {
        h: "5. Ваши права",
        p: `Вы можете в любой момент запросить удаление или изменение своих данных — напишите на ${site.email} или позвоните по номеру ${site.phones[0]}.`,
      },
      {
        h: "6. Cookie-файлы",
        p: "Сайт использует память браузера, чтобы запомнить выбранный язык и товары в корзине. Эти данные хранятся только на вашем устройстве.",
      },
    ],
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale as "uz" | "ru"] ?? CONTENT.uz;
  return { title: c.title, robots: { index: false } };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tn = await getTranslations("nav");
  const tf = await getTranslations("footer");
  const c = CONTENT[locale as "uz" | "ru"] ?? CONTENT.uz;

  return (
    <>
      <PageHeader
        eyebrow={tf("privacy")}
        title={c.title}
        subtitle={c.subtitle}
        crumbs={[{ label: tn("home"), href: "/" }, { label: c.title }]}
      />

      <section className="bg-bone-100 py-12 md:py-18">
        <div className="container-x">
          <div className="mx-auto max-w-3xl space-y-6">
            {c.blocks.map((b, i) => (
              <Reveal key={b.h} delay={i * 0.05}>
                <div className="rounded-3xl border border-bone-300 bg-white p-6 md:p-7">
                  <h2 className="font-display text-[17px] font-extrabold text-graphite">
                    {b.h}
                  </h2>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                    {b.p}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
