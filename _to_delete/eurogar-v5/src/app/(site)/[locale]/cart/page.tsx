import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/catalog/page-header";
import { CartView } from "@/components/checkout/cart-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cart" });
  return { title: t("title") };
}

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cart");
  const tn = await getTranslations("nav");

  return (
    <>
      <PageHeader
        eyebrow={tn("cart")}
        title={t("title")}
        crumbs={[{ label: tn("home"), href: "/" }, { label: tn("cart") }]}
      />
      <section className="bg-bone-100 py-12 md:py-18">
        <div className="container-x">
          <CartView />
        </div>
      </section>
    </>
  );
}
