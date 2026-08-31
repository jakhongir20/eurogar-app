import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getCategory } from "@/data/categories";
import { getProductBySlug, listProducts, productsByCategory } from "@/lib/repo";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/types";
import { t } from "@/lib/utils";
import { breadcrumbLd, pageMetadata, productLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
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
  return pageMetadata({
    locale,
    path: `/product/${slug}`,
    title: t(p.name, locale as Locale),
    description: t(p.description, locale as Locale).slice(0, 160),
    images: p.images.slice(0, 1),
  });
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

  const crumbs = [
    { name: tn("home"), url: `/${l}` },
    { name: tn("catalog"), url: `/${l}/catalog` },
    ...(cat ? [{ name: t(cat.name, l), url: `/${l}/catalog/${cat.slug}` }] : []),
    { name: t(product.name, l), url: `/${l}/product/${product.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={productLd({
          name: t(product.name, l),
          description: t(product.description, l),
          image: product.images[0] ?? "",
          url: `/${l}/product/${product.slug}`,
          price: product.price,
          inStock: product.stock > 0,
          sku: product.id,
        })}
      />
      <JsonLd data={breadcrumbLd(crumbs)} />
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
