import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/catalog/page-header";
import { CheckoutView } from "@/components/checkout/checkout-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "checkout" });
  return { title: t("title") };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("checkout");
  const tn = await getTranslations("nav");

  return (
    <>
      <PageHeader
        eyebrow={tn("cart")}
        title={t("title")}
        subtitle={t("subtitle")}
        crumbs={[
          { label: tn("home"), href: "/" },
          { label: tn("cart"), href: "/cart" },
          { label: t("title") },
        ]}
      />
      <section className="bg-bone-100 py-12 md:py-18">
        <div className="container-x">
          <CheckoutView />
        </div>
      </section>
    </>
  );
}
