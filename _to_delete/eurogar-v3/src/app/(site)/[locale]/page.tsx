import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { Advantages } from "@/components/home/advantages";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedSection } from "@/components/home/featured-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { ProcessSection } from "@/components/home/process-section";
import { CtaBand } from "@/components/home/cta-band";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Advantages />
      <CategoriesSection />
      <FeaturedSection />
      <ProjectsSection />
      <ProcessSection />
      <CtaBand />
    </>
  );
}
