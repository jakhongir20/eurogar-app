"use client";

import { useLocale, useTranslations } from "next-intl";
import { ExternalLink, MapPin, Phone } from "lucide-react";
import { branches } from "@/lib/site";
import type { Locale } from "@/lib/types";
import { cn, t } from "@/lib/utils";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { BranchMap } from "@/components/ui/branch-map";

/**
 * Filiallar — Toshkent, Jizzax, Samarqand.
 * Har karta: shahar, telefon, Google Maps havolasi + o'rnatilgan xarita.
 */
export function Branches({ withMap = true }: { withMap?: boolean }) {
  const locale = useLocale() as Locale;
  const tb = useTranslations("branches");

  return (
    <RevealGroup
      className="grid gap-4 md:grid-cols-3 lg:gap-5"
      stagger={0.08}
    >
      {branches.map((b) => (
        <RevealItem key={b.id} className="h-full">
          <div
            className={cn(
              "flex h-full flex-col overflow-hidden rounded-3xl border bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_54px_-28px_rgba(11,74,99,.4)]",
              b.main ? "border-brand-400" : "border-bone-300 hover:border-brand-400",
            )}
          >
            {withMap && (
              <div className="relative aspect-[16/9] bg-bone-200">
                <BranchMap
                  lat={b.lat}
                  lng={b.lng}
                  title={t(b.city, locale)}
                  className="absolute inset-0"
                />
              </div>
            )}

            <div className="flex flex-1 flex-col p-5 md:p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display flex items-center gap-2 text-[18px] font-extrabold text-graphite">
                  <MapPin className="size-4.5 text-brand-600" strokeWidth={2.3} />
                  {t(b.city, locale)}
                </h3>
                {b.main && (
                  <span className="rounded-full bg-brand-100 px-2.5 py-1 text-[10.5px] font-extrabold tracking-wide text-brand-700 uppercase">
                    HQ
                  </span>
                )}
              </div>

              <a
                href={`tel:${b.phone.replace(/\s/g, "")}`}
                className="mt-3 flex items-center gap-2 text-[15px] font-bold text-graphite transition-colors hover:text-brand-600"
              >
                <Phone className="size-4 text-brand-600" strokeWidth={2.3} />
                {b.phone}
              </a>

              <a
                href={b.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-auto flex items-center gap-1.5 pt-4 text-[13.5px] font-semibold text-brand-600 transition-colors hover:text-brand-700"
              >
                {tb("openMap")}
                <ExternalLink className="size-3.5" strokeWidth={2.3} />
              </a>
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
