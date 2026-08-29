import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  CheckCircle2,
  Ruler,
  Settings,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/services";
import type { Locale } from "@/lib/types";
import { cn, t } from "@/lib/utils";
import { PageHeader } from "@/components/catalog/page-header";
import { Reveal } from "@/components/ui/reveal";
import { LeadForm } from "@/components/forms/lead-form";
import { CtaBand } from "@/components/home/cta-band";

const ICONS: Record<string, LucideIcon> = {
  Ruler,
  Wrench,
  Settings,
  Truck,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ts = await getTranslations({ locale, namespace: "services" });
  return { title: ts("title"), description: ts("subtitle") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const ts = await getTranslations("services");
  const tn = await getTranslations("nav");

  return (
    <>
      <PageHeader
        eyebrow={tn("services")}
        title={ts("title")}
        subtitle={ts("subtitle")}
        crumbs={[{ label: tn("home"), href: "/" }, { label: tn("services") }]}
      />

      <section className="bg-bone-100 py-12 md:py-18">
        <div className="container-x space-y-6 md:space-y-8">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Wrench;
            const flip = i % 2 === 1;
            return (
              <Reveal key={s.id} delay={0.04}>
                <article
                  id={s.id}
                  className="overflow-hidden rounded-[2rem] border border-bone-300 bg-white scroll-mt-28"
                >
                  <div
                    className={cn(
                      "grid lg:grid-cols-[1fr_22rem]",
                      flip && "lg:grid-cols-[22rem_1fr]",
                    )}
                  >
                    {/* matn */}
                    <div className={cn("p-6 md:p-9", flip && "lg:order-2")}>
                      <div className="flex items-center gap-4">
                        <span className="flex size-13 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-brand-400">
                          <Icon className="size-6" strokeWidth={2} />
                        </span>
                        <h2 className="font-display text-[clamp(1.25rem,2.8vw,1.7rem)] leading-tight font-extrabold text-graphite">
                          {t(s.title, l)}
                        </h2>
                      </div>

                      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-graphite/85">
                        {t(s.intro, l)}
                      </p>

                      <div className="mt-6">
                        <div className="text-[11.5px] font-bold tracking-[0.14em] text-muted uppercase">
                          {ts("included")}
                        </div>
                        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                          {s.bullets.map((b, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2.5 text-[14px] leading-relaxed text-graphite"
                            >
                              <CheckCircle2
                                className="mt-0.5 size-4.5 shrink-0 text-emerald-600"
                                strokeWidth={2.2}
                              />
                              {t(b, l)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* yon panel — ariza */}
                    <div
                      className={cn(
                        "dark-section relative flex flex-col justify-center gap-4 bg-navy-900 p-6 text-white md:p-8",
                        flip && "lg:order-1",
                      )}
                    >
                      <div className="grid-texture pointer-events-none absolute inset-0 opacity-50" />
                      <div className="relative">
                        <div className="font-display text-[16px] font-extrabold">
                          {ts("order")}
                        </div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-white/60">
                          {t(s.short, l)}
                        </p>
                        <div className="mt-4">
                          <LeadForm
                            source="contact"
                            tone="dark"
                            layout="stack"
                            meta={{ Xizmat: t(s.title, "uz") }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
