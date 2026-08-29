import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { categories } from "@/data/categories";
import { countsByCategory } from "@/lib/repo";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { CategoryCard } from "@/components/catalog/category-card";
import { ButtonShell } from "@/components/ui/button";

export async function CategoriesSection() {
  const t = await getTranslations("categories");
  const counts = await countsByCategory();

  return (
    <Section tone="bone" id="catalog">
      <div className="container-x">
        <SectionHeading
          eyebrow={t("title")}
          title={t("title")}
          subtitle={t("subtitle")}
          action={
            <Link href="/catalog" className="group/btn">
              <ButtonShell
                variant="light"
                size="md"
                iconRight={<ArrowRight className="size-[17px]" strokeWidth={2.4} />}
              >
                {t("viewAll")}
              </ButtonShell>
            </Link>
          }
        />

        <RevealGroup
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
          stagger={0.07}
        >
          {categories.slice(0, 6).map((c, i) => (
            <RevealItem key={c.id} className="h-full">
              <CategoryCard
                category={c}
                count={counts[c.slug] ?? 0}
                priority={i < 3}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
