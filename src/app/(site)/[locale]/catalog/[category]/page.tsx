import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { categories, getCategory } from "@/data/categories";
import { productsByCategory } from "@/lib/repo";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/types";
import { t } from "@/lib/utils";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/catalog/page-header";
import { ProductGrid } from "@/components/catalog/product-grid";
import { Chip } from "@/components/ui/badge";

export const revalidate = 300;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    categories.map((c) => ({ locale, category: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return pageMetadata({
    locale,
    path: `/catalog/${category}`,
    title: t(c.name, locale as Locale),
    description: t(c.short, locale as Locale),
    images: [c.image],
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  const cat = getCategory(category);
  if (!cat) notFound();

  const items = await productsByCategory(category);
  const tn = await getTranslations("nav");
  const tcat = await getTranslations("categories");
  const l = locale as Locale;

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: tn("home"), url: `/${l}` },
          { name: tn("catalog"), url: `/${l}/catalog` },
          { name: t(cat.name, l), url: `/${l}/catalog/${cat.slug}` },
        ])}
      />
      <PageHeader
        eyebrow={tn("catalog")}
        title={t(cat.name, l)}
        subtitle={t(cat.short, l)}
        crumbs={[
          { label: tn("home"), href: "/" },
          { label: tn("catalog"), href: "/catalog" },
          { label: t(cat.name, l) },
        ]}
        aside={
          <div className="text-right">
            <div className="font-display text-[clamp(2rem,5vw,3rem)] leading-none font-black text-brand-600">
              {items.length}
            </div>
            <div className="mt-1.5 text-[12.5px] text-muted">
              {tcat("products")}
            </div>
          </div>
        }
      />

      <section className="bg-bone-100 py-10 md:py-14">
        <div className="container-x">
          {/* boshqa toifalar */}
          <div className="no-scrollbar -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
            {categories.map((c) => (
              <Link key={c.id} href={`/catalog/${c.slug}`} className="shrink-0">
                <Chip active={c.slug === category}>{t(c.name, l)}</Chip>
              </Link>
            ))}
          </div>

          <ProductGrid products={items} />
        </div>
      </section>
    </>
  );
}
