import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { categories } from "@/data/categories";
import { countsByCategory, listProducts } from "@/lib/repo";
import { PageHeader } from "@/components/catalog/page-header";
import { CategoryCard } from "@/components/catalog/category-card";
import { ProductGrid } from "@/components/catalog/product-grid";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section";

/** Baza ulanganda admin o'zgarishlari 5 daqiqada (yoki revalidatePath bilan darhol) chiqadi */
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });
  return pageMetadata({
    locale,
    path: "/catalog",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("catalog");
  const tn = await getTranslations("nav");
  const tcat = await getTranslations("categories");

  const [all, counts] = await Promise.all([listProducts(), countsByCategory()]);

  return (
    <>
      <PageHeader
        eyebrow={tn("catalog")}
        title={t("title")}
        subtitle={t("subtitle")}
        crumbs={[{ label: tn("home"), href: "/" }, { label: tn("catalog") }]}
        aside={
          <div className="text-right">
            <div className="font-display text-[clamp(2rem,5vw,3rem)] leading-none font-black text-brand-600">
              {all.length}
            </div>
            <div className="mt-1.5 text-[12.5px] text-muted">
              {tcat("products")}
            </div>
          </div>
        }
      />

      {/* toifalar */}
      <section className="bg-bone-200 py-14 md:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Katalog" title={tcat("title")} />
          <RevealGroup
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
            stagger={0.06}
          >
            {categories.map((c, i) => (
              <RevealItem key={c.id} className="h-full">
                <CategoryCard
                  category={c}
                  count={counts[c.slug] ?? 0}
                  priority={i < 2}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* barcha mahsulotlar */}
      <section className="bg-bone-100 py-14 md:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow={tcat("products")}
            title={tcat("viewAll")}
            className="mb-8"
          />
          <ProductGrid products={all} showCategoryFilter />
        </div>
      </section>
    </>
  );
}
