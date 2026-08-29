import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getCategory } from "@/data/categories";
import { getProductBySlug, listProducts, productsByCategory } from "@/lib/repo";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/types";
import { t } from "@/lib/utils";
import { PageHeader } from "@/components/catalog/page-header";
import { ProductView } from "@/components/product/product-view";
import { ProductCard } from "@/components/catalog/product-card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section";

export const revalidate = 300;

export async function generateStaticParams() {
  const all = await listProducts();
  return routing.locales.flatMap((locale) =>
    all.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return {};
  return {
    title: t(p.name, locale as Locale),
    description: t(p.description, locale as Locale).slice(0, 160),
    openGraph: { images: [p.images[0]] },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const cat = getCategory(product.categorySlug);
  const similar = (await productsByCategory(product.categorySlug))
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const tn = await getTranslations("nav");
  const tp = await getTranslations("product");
  const l = locale as Locale;

  return (
    <>
      <PageHeader
        eyebrow={cat ? t(cat.name, l) : undefined}
        title={t(product.name, l)}
        crumbs={[
          { label: tn("home"), href: "/" },
          { label: tn("catalog"), href: "/catalog" },
          ...(cat
            ? [{ label: t(cat.name, l), href: `/catalog/${cat.slug}` }]
            : []),
          { label: t(product.name, l) },
        ]}
      />

      <section className="bg-bone-100 py-12 md:py-18">
        <div className="container-x">
          <ProductView product={product} />
        </div>
      </section>

      {similar.length > 0 && (
        <section className="bg-bone-200 py-14 md:py-20">
          <div className="container-x">
            <SectionHeading eyebrow="Eurogar" title={tp("similar")} />
            <RevealGroup
              className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
              stagger={0.07}
            >
              {similar.map((p) => (
                <RevealItem key={p.id} className="h-full">
                  <ProductCard product={p} className="h-full" />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}
    </>
  );
}
