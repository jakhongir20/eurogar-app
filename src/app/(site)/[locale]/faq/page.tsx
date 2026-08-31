import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/catalog/page-header";
import { FaqView } from "@/components/faq/faq-view";
import { faqLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { faqGroups } from "@/data/services";
import { t as tr } from "@/lib/utils";
import type { Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tf = await getTranslations({ locale, namespace: "faq" });
  return pageMetadata({
    locale,
    path: "/faq",
    title: tf("title"),
    description: tf("subtitle"),
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tf = await getTranslations("faq");
  const tn = await getTranslations("nav");

  const l = locale as Locale;
  /* Savol-javoblar qidiruv natijasida to'g'ridan-to'g'ri ko'rinishi mumkin */
  const items = faqGroups.flatMap((g) =>
    g.items.map((i) => ({ q: tr(i.q, l), a: tr(i.a, l) })),
  );

  return (
    <>
      <JsonLd data={faqLd(items)} />
      <PageHeader
        eyebrow={tn("faq")}
        title={tf("title")}
        subtitle={tf("subtitle")}
        crumbs={[{ label: tn("home"), href: "/" }, { label: tn("faq") }]}
      />
      <section className="bg-bone-100 py-12 md:py-18">
        <div className="container-x">
          <FaqView />
        </div>
      </section>
    </>
  );
}
