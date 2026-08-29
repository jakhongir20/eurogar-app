import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { categories, getCategory } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/types";
import { t } from "@/lib/utils";
import { PageHeader } from "@/components/catalog/page-header";
import { ProductGrid } from "@/components/catalog/product-grid";
import { Chip } from "@/components/ui/badge";

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
  return {
    title: t(c.name, locale as Locale),
    description: t(c.short, locale as Locale),
  };
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

  const items = productsByCategory(category);
  const tn = await getTranslations("nav");
  const tcat = await getTranslations("categories");
  const l = locale as Locale;

  return (
    <>
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
            <div className="font-display text-[clamp(2rem,5vw,3rem)] leading-none font-black text-brand-400">
              {items.length}
            </div>
            <div className="mt-1.5 text-[12.5px] text-white/45">
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
