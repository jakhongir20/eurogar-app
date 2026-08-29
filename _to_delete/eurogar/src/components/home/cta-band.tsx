"use client";

import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { LeadForm } from "@/components/forms/lead-form";

export function CtaBand() {
  const t = useTranslations("ctaBand");

  return (
    <section className="dark-section relative overflow-hidden bg-ink-900 py-16 text-white md:py-24">
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(60rem 30rem at 80% 20%, rgba(245,181,68,.13), transparent 65%)",
        }}
      />
      {/* nozik yuqori chiziq */}
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(245,181,68,.5),transparent)]" />

      <div className="container-x relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <h2 className="font-display text-[clamp(1.8rem,4.4vw,3rem)] leading-[1.05] font-extrabold text-balance-tight">
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-white/55">
                {t("text")}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <a
                href={`tel:${site.phones[0].replace(/\s/g, "")}`}
                className="mt-6 inline-flex items-center gap-3 text-white transition-colors hover:text-brand-400"
              >
                <span className="flex size-11 items-center justify-center rounded-full border border-white/15">
                  <Phone className="size-4.5" strokeWidth={2.2} />
                </span>
                <span className="font-display text-[19px] font-extrabold tracking-tight md:text-[22px]">
                  {site.phones[0]}
                </span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1} dir="left">
            <div className="glass-dark rounded-[1.75rem] p-5 md:p-7">
              <LeadForm source="cta" tone="dark" layout="stack" />
              <p className="mt-4 text-center text-[12px] leading-relaxed text-white/35">
                {t("successNote")}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
