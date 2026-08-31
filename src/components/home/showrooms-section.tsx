"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ExternalLink, MapPin, Phone } from "lucide-react";
import { branches } from "@/lib/site";
import type { Locale } from "@/lib/types";
import { cn, t as tr } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ShowroomsMap } from "@/components/ui/showrooms-map";

/**
 * «Firmali shou-rumlar» — barcha filiallar bitta katta xaritada.
 * Shahar tugmalari yoki xaritadagi pin tanlanadi, xarita o'sha nuqtaga uchadi.
 */
export function ShowroomsSection() {
  const t = useTranslations("showrooms");
  const tb = useTranslations("branches");
  const locale = useLocale() as Locale;

  const [activeId, setActiveId] = useState(
    branches.find((b) => b.main)?.id ?? branches[0].id,
  );

  const points = useMemo(
    () =>
      branches.map((b) => ({
        id: b.id,
        lat: b.lat,
        lng: b.lng,
        title: tr(b.city, locale),
      })),
    [locale],
  );

  const active = branches.find((b) => b.id === activeId) ?? branches[0];

  return (
    <Section tone="light" id="showrooms">
      <div className="container-x">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        {/* ── shahar tugmalari ── */}
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {branches.map((b) => {
              const on = b.id === activeId;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setActiveId(b.id)}
                  aria-pressed={on}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2.5 text-[14px] font-bold transition-all duration-300",
                    on
                      ? "bg-navy-900 text-white shadow-[0_14px_30px_-16px_rgba(11,74,99,.9)]"
                      : "border border-bone-300 bg-white text-graphite hover:border-brand-400 hover:text-brand-600",
                  )}
                >
                  <MapPin
                    className={cn(
                      "size-4",
                      on ? "text-brand-400" : "text-brand-600",
                    )}
                    strokeWidth={2.3}
                  />
                  {tr(b.city, locale)}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── xarita + tanlangan filial kartasi ── */}
        <Reveal delay={0.1}>
          <div className="relative mt-5 overflow-hidden rounded-[2rem] border border-bone-300 bg-bone-200">
            <ShowroomsMap
              points={points}
              activeId={activeId}
              onSelect={setActiveId}
              className="h-[340px] w-full md:h-[520px]"
            />

            {/* mobil'da xarita ostida, kattaroq ekranda ustida suzadi */}
            <div className="z-[1002] border-t border-bone-300 bg-white p-5 md:absolute md:top-5 md:left-5 md:w-[19.5rem] md:rounded-2xl md:border md:p-6 md:shadow-[0_26px_54px_-26px_rgba(11,74,99,.45)]">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-[19px] font-extrabold text-graphite">
                  {tr(active.city, locale)}
                </h3>
                {active.main && (
                  <span className="rounded-full bg-brand-100 px-2.5 py-1 text-[10.5px] font-extrabold tracking-wide text-brand-700 uppercase">
                    HQ
                  </span>
                )}
              </div>

              <a
                href={`tel:${active.phone.replace(/\s/g, "")}`}
                className="mt-4 flex items-center gap-2 text-[15px] font-bold text-graphite transition-colors hover:text-brand-600"
              >
                <Phone className="size-4 text-brand-600" strokeWidth={2.3} />
                {active.phone}
              </a>

              <a
                href={active.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-brand-600 transition-colors hover:text-brand-700"
              >
                {tb("openMap")}
                <ExternalLink className="size-3.5" strokeWidth={2.4} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
