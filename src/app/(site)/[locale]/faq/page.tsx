import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/catalog/page-header";
import { FaqView } from "@/components/faq/faq-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tf = await getTranslations({ locale, namespace: "faq" });
  return { title: tf("title"), description: tf("subtitle") };
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

  return (
    <>
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
