import { setRequestLocale } from "next-intl/server";
import { approvedReviews } from "@/lib/repo";
import { Hero } from "@/components/home/hero";
import { Advantages } from "@/components/home/advantages";
import { PartnersSection } from "@/components/home/partners-section";
import { ServicesSection } from "@/components/home/services-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedSection } from "@/components/home/featured-section";
import { VideoReviews } from "@/components/home/video-reviews";
import { ProcessSection } from "@/components/home/process-section";
import { CtaBand } from "@/components/home/cta-band";

export const revalidate = 300;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const reviews = await approvedReviews(6);

  return (
    <>
      <Hero />
      <Advantages />
      <PartnersSection />
      <CategoriesSection />
      <ServicesSection />
      <FeaturedSection />
      <VideoReviews textReviews={reviews} />
      <ProcessSection />
      <CtaBand />
    </>
  );
}
