import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { featuredProducts } from "@/data/products";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ProductCard } from "@/components/catalog/product-card";
import { ButtonShell } from "@/components/ui/button";

export async function FeaturedSection() {
  const t = await getTranslations("featured");
  const tcat = await getTranslations("categories");
  const items = featuredProducts().slice(0, 6);

  return (
    <Section tone="light">
      <div className="container-x">
        <SectionHeading
          eyebrow="Top"
          title={t("title")}
          subtitle={t("subtitle")}
          action={
            <Link href="/catalog" className="group/btn">
              <ButtonShell
                variant="light"
                size="md"
                iconRight={<ArrowRight className="size-[17px]" strokeWidth={2.4} />}
              >
                {tcat("viewAll")}
              </ButtonShell>
            </Link>
          }
        />

        <RevealGroup
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
          stagger={0.06}
        >
          {items.map((p) => (
            <RevealItem key={p.id} className="h-full">
              <ProductCard product={p} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
