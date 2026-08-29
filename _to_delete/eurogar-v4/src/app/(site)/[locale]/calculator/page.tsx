import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/catalog/page-header";
import { CalculatorView } from "@/components/calculator/calculator-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "calculator" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("calculator");
  const tn = await getTranslations("nav");

  return (
    <>
      <PageHeader
        eyebrow={tn("calculator")}
        title={t("title")}
        subtitle={t("subtitle")}
        crumbs={[{ label: tn("home"), href: "/" }, { label: tn("calculator") }]}
      />
      <section className="bg-bone-100 py-12 md:py-18">
        <div className="container-x">
          <CalculatorView />
        </div>
      </section>
    </>
  );
}
