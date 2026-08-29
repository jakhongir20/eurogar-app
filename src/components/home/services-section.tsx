"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Ruler,
  Settings,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { services } from "@/data/services";
import type { Locale } from "@/lib/types";
import { t } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const ICONS: Record<string, LucideIcon> = { Ruler, Wrench, Settings, Truck };

/** Alutech.uz andazasidagi xizmatlar bloki — zamer, montaj, servis, yetkazish */
export function ServicesSection() {
  const ts = useTranslations("services");
  const locale = useLocale() as Locale;

  return (
    <Section tone="light">
      <div className="container-x">
        <SectionHeading
          eyebrow={ts("eyebrow")}
          title={ts("title")}
          subtitle={ts("subtitle")}
        />

        <RevealGroup
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          stagger={0.08}
        >
          {services.map((s) => {
            const Icon = ICONS[s.icon] ?? Wrench;
            return (
              <RevealItem key={s.id} className="h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <Link
                    href={`/services#${s.id}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-bone-300 bg-white p-6 transition-all duration-500 hover:border-brand-400 hover:shadow-[0_28px_60px_-30px_rgba(11,74,99,.4)] md:p-7"
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex size-13 items-center justify-center rounded-2xl bg-navy-900 text-brand-400 transition-all duration-500 group-hover:bg-brand-400 group-hover:text-navy-950">
                        <Icon className="size-6" strokeWidth={2} />
                      </span>
                      <span className="flex size-9 items-center justify-center rounded-full border border-bone-300 text-muted transition-all duration-500 group-hover:rotate-45 group-hover:border-brand-400 group-hover:text-brand-600">
                        <ArrowUpRight className="size-4.5" strokeWidth={2.3} />
                      </span>
                    </div>

                    <h3 className="font-display mt-5 text-[16.5px] leading-tight font-extrabold text-graphite transition-colors duration-300 group-hover:text-brand-600">
                      {t(s.title, locale)}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                      {t(s.short, locale)}
                    </p>

                    <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-brand-400 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                  </Link>
                </motion.div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
