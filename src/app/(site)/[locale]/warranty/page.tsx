import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  CheckCircle2,
  FileText,
  PhoneCall,
  ShieldCheck,
  Wrench,
  XCircle,
} from "lucide-react";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/types";
import { t as tr } from "@/lib/utils";
import type { I18nText } from "@/lib/types";
import { PageHeader } from "@/components/catalog/page-header";
import { Reveal } from "@/components/ui/reveal";
import { CtaBand } from "@/components/home/cta-band";

const T = (uz: string, ru: string): I18nText => ({ uz, ru });

/* Kafolat shartlari — taxminiy matn (TZ 2.7: «taxminiy yozib turavering»),
   yakuniy tahrir kompaniya yuristi bilan kelishiladi. */
const COVERED: I18nText[] = [
  T("Konstruksiya va mexanizmlarning zavod nuqsonlari", "Заводские дефекты конструкции и механизмов"),
  T("Avtomatika va boshqaruv bloklarining ishdan chiqishi", "Выход из строя автоматики и блоков управления"),
  T("Montaj bilan bog'liq kamchiliklar", "Недостатки, связанные с монтажом"),
  T("Kafolat davrida ehtiyot qismlar va ish haqi", "Запчасти и работы в гарантийный период"),
];

const NOT_COVERED: I18nText[] = [
  T("Noto'g'ri foydalanish natijasidagi shikastlar", "Повреждения из-за неправильной эксплуатации"),
  T("O'z-o'zidan ta'mirlash yoki konstruksiyani o'zgartirish", "Самостоятельный ремонт или изменение конструкции"),
  T("Mexanik zarbalar va avtohalokat oqibatlari", "Механические удары и последствия ДТП"),
  T("Tabiiy ofat va elektr tarmog'idagi keskin sakrashlar", "Стихийные бедствия и скачки напряжения в сети"),
];

const TERMS: { label: I18nText; years: string }[] = [
  { label: T("Seksion va otkatnoy darvozalar", "Секционные и откатные ворота"), years: "5" },
  { label: T("Rolstavniy darvozalar", "Рольставни"), years: "3" },
  { label: T("Maxsus eshiklar", "Специальные двери"), years: "3" },
  { label: T("Shlagbaum va bollardlar", "Шлагбаумы и болларды"), years: "2" },
  { label: T("Antitarran tizimlari", "Антитаранные системы"), years: "2" },
  { label: T("Avtomatika va pultlar", "Автоматика и пульты"), years: "1" },
];

const STEPS: { icon: typeof PhoneCall; text: I18nText }[] = [
  {
    icon: PhoneCall,
    text: T(
      "Filialingizga qo'ng'iroq qiling yoki saytdan ariza qoldiring",
      "Позвоните в свой филиал или оставьте заявку на сайте",
    ),
  },
  {
    icon: FileText,
    text: T(
      "Kafolat hujjati raqamini va muammoni ayting",
      "Назовите номер гарантийного документа и опишите проблему",
    ),
  },
  {
    icon: Wrench,
    text: T(
      "Mutaxassis kelib, nosozlikni bepul bartaraf etadi",
      "Специалист приедет и бесплатно устранит неисправность",
    ),
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tw = await getTranslations({ locale, namespace: "warranty" });
  return pageMetadata({
    locale,
    path: "/warranty",
    title: tw("title"),
    description: tw("subtitle"),
  });
}

export default async function WarrantyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const tw = await getTranslations("warranty");
  const tn = await getTranslations("nav");

  return (
    <>
      <PageHeader
        eyebrow={tn("warranty")}
        title={tw("title")}
        subtitle={tw("subtitle")}
        crumbs={[{ label: tn("home"), href: "/" }, { label: tn("warranty") }]}
        aside={
          <div className="flex size-20 items-center justify-center rounded-3xl bg-navy-900 text-brand-400">
            <ShieldCheck className="size-10" strokeWidth={1.8} />
          </div>
        }
      />

      <section className="bg-bone-100 py-12 md:py-18">
        <div className="container-x">
          {/* qamrov */}
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
            <Reveal>
              <div className="h-full rounded-3xl border border-bone-300 bg-white p-6 md:p-7">
                <h2 className="font-display flex items-center gap-3 text-[17px] font-extrabold text-graphite">
                  <CheckCircle2 className="size-5.5 text-emerald-600" strokeWidth={2.2} />
                  {tw("coveredTitle")}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {COVERED.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-graphite"
                    >
                      <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-emerald-500" />
                      {tr(item, l)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.07}>
              <div className="h-full rounded-3xl border border-bone-300 bg-white p-6 md:p-7">
                <h2 className="font-display flex items-center gap-3 text-[17px] font-extrabold text-graphite">
                  <XCircle className="size-5.5 text-red-500" strokeWidth={2.2} />
                  {tw("notCoveredTitle")}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {NOT_COVERED.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-graphite"
                    >
                      <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-red-400" />
                      {tr(item, l)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* muddatlar jadvali */}
          <Reveal delay={0.08}>
            <div className="mt-4 overflow-hidden rounded-3xl border border-bone-300 bg-white lg:mt-5">
              <div className="border-b border-bone-300 px-6 py-4.5 md:px-7">
                <h2 className="font-display text-[17px] font-extrabold text-graphite">
                  {tw("termsTitle")}
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3">
                {TERMS.map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 border-b border-bone-300 px-6 py-4 last:border-b-0 sm:odd:border-r md:px-7 lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
                  >
                    <span className="text-[14px] leading-snug font-semibold text-graphite">
                      {tr(row.label, l)}
                    </span>
                    <span className="font-display shrink-0 rounded-full bg-brand-100 px-3 py-1.5 text-[14px] font-extrabold text-brand-700">
                      {row.years} {tw("years")}
                    </span>
                  </div>
                ))}
              </div>
              <p className="border-t border-bone-300 bg-bone-100 px-6 py-4 text-[13px] leading-relaxed text-muted md:px-7">
                {tw("termsNote")}
              </p>
            </div>
          </Reveal>

          {/* kafolat holati — 3 qadam */}
          <Reveal delay={0.08}>
            <div className="dark-section relative mt-4 overflow-hidden rounded-3xl bg-navy-900 p-6 text-white md:p-9 lg:mt-5">
              <div className="grid-texture pointer-events-none absolute inset-0 opacity-50" />
              <div className="relative">
                <h2 className="font-display text-[clamp(1.2rem,2.6vw,1.6rem)] font-extrabold">
                  {tw("serviceTitle")}
                </h2>
                <div className="mt-7 grid gap-6 md:grid-cols-3">
                  {STEPS.map((s, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                        <s.icon className="size-5.5 text-brand-400" strokeWidth={2.1} />
                        <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-brand-400 text-[11.5px] font-extrabold text-navy-950">
                          {i + 1}
                        </span>
                      </span>
                      <p className="text-[14px] leading-relaxed text-white/75">
                        {tr(s.text, l)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-5">
                  {site.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="font-display text-[16px] font-extrabold text-white transition-colors hover:text-brand-400"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
