import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { Advantages } from "@/components/home/advantages";
import { PartnersSection } from "@/components/home/partners-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedSection } from "@/components/home/featured-section";
import { VideoReviews } from "@/components/home/video-reviews";
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
      <PartnersSection />
      <CategoriesSection />
      <FeaturedSection />
      <VideoReviews />
      <ProcessSection />
      <CtaBand />
    </>
  );
}
