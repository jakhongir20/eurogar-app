import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { branches, partners, site } from "@/lib/site";
import { PageHeader } from "@/components/catalog/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { Eyebrow } from "@/components/ui/section";
import { Branches } from "@/components/contact/branches";
import { CtaBand } from "@/components/home/cta-band";
import { ProcessSection } from "@/components/home/process-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return pageMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tb = await getTranslations("branches");
  const tn = await getTranslations("nav");

  const facts = [
    { value: site.stats.years, suffix: "+", prefix: "", label: t("f1") },
    { value: site.stats.warrantyMax, suffix: "", prefix: "1–", label: t("f2") },
    { value: site.stats.deliveryDaysMax, suffix: "", prefix: "3–", label: t("f3") },
    { value: branches.length, suffix: "", prefix: "", label: t("f4") },
  ];

  const gallery = [
    "/products/seksion-darvoza.webp",
    "/products/rolstavniy-darvoza.webp",
    "/products/otkatnoy-darvoza.webp",
    "/products/maxsus-eshik.webp",
  ];

  return (
    <>
      <PageHeader
        eyebrow={tn("about")}
        title={t("title")}
        subtitle={t("subtitle")}
        crumbs={[{ label: tn("home"), href: "/" }, { label: tn("about") }]}
      />

      <section className="bg-bone-100 py-14 md:py-20">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <p className="text-[16px] leading-relaxed text-graphite md:text-[17.5px]">
                  {t("text1")}
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-5 text-[15px] leading-relaxed text-muted md:text-[16px]">
                  {t("text2")}
                </p>
              </Reveal>

              {/* hamkor brendlar */}
              <Reveal delay={0.12}>
                <div className="mt-7 flex flex-wrap gap-2">
                  {partners.map((p) => (
                    <span
                      key={p.id}
                      className="font-display rounded-full border border-bone-300 bg-white px-4 py-2 text-[13px] font-extrabold tracking-[0.06em] text-navy-800"
                    >
                      {p.name}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-bone-300 pt-8">
                  {facts.map((f) => (
                    <div key={f.label}>
                      <dt className="font-display text-[clamp(1.7rem,4vw,2.5rem)] leading-none font-black text-navy-800">
                        <Counter to={f.value} suffix={f.suffix} prefix={f.prefix} />
                      </dt>
                      <dd className="mt-2 text-[13px] leading-snug text-muted">
                        {f.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal dir="left" delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                {gallery.map((src, i) => (
                  <div
                    key={src}
                    className={`relative overflow-hidden rounded-3xl border border-bone-300 bg-white ${
                      i % 3 === 0 ? "aspect-square" : "aspect-[4/5]"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width:1024px) 45vw, 23vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── filiallarimiz ── */}
      <section
        id="branches"
        className="border-t border-bone-300 bg-bone-200 py-14 md:py-20"
      >
        <div className="container-x">
          <Reveal>
            <Eyebrow>{tb("eyebrow")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-3.5 text-[clamp(1.6rem,3.8vw,2.6rem)] font-extrabold text-graphite">
              {tb("title")}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-3.5 mb-9 max-w-xl text-[15px] leading-relaxed text-muted">
              {tb("subtitle")}
            </p>
          </Reveal>
          <Branches withMap />
        </div>
      </section>

      <ProcessSection />
      <CtaBand />
    </>
  );
}
