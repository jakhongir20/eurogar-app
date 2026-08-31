import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import { approvedReviews } from "@/lib/repo";
import { Hero } from "@/components/home/hero";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedSection } from "@/components/home/featured-section";

/* Ekran ostidagi client-bloklar alohida chunk'ga ajratiladi: HTML'ga
   avvalgidek server tomonda chiziladi (SEO va matn joyida qoladi), lekin
   ularning JS'i hero yuklanishiga xalaqit bermaydi. Bosh sahifadagi
   birinchi ekranga faqat Hero va Header JS'i kerak. */
const Advantages = dynamic(() =>
  import("@/components/home/advantages").then((m) => m.Advantages),
);
const PartnersSection = dynamic(() =>
  import("@/components/home/partners-section").then((m) => m.PartnersSection),
);
const ServicesSection = dynamic(() =>
  import("@/components/home/services-section").then((m) => m.ServicesSection),
);
const VideoReviews = dynamic(() =>
  import("@/components/home/video-reviews").then((m) => m.VideoReviews),
);
const ProcessSection = dynamic(() =>
  import("@/components/home/process-section").then((m) => m.ProcessSection),
);
/* Leaflet'ni tortadi — alohida chunk'da, ekran ostida yuklanadi */
const ShowroomsSection = dynamic(() =>
  import("@/components/home/showrooms-section").then((m) => m.ShowroomsSection),
);
const CtaBand = dynamic(() =>
  import("@/components/home/cta-band").then((m) => m.CtaBand),
);

export const revalidate = 300;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const reviews = await approvedReviews(30);

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
      <ShowroomsSection />
      <CtaBand />
    </>
  );
}
