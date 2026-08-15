"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Award, Factory, ShieldCheck, Truck } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const ICONS = [Award, ShieldCheck, Truck, Factory];

export function Advantages() {
  const t = useTranslations("advantages");

  const items = [
    { title: t("a1Title"), text: t("a1Text") },
    { title: t("a2Title"), text: t("a2Text") },
    { title: t("a3Title"), text: t("a3Text") },
    { title: t("a4Title"), text: t("a4Text") },
  ];

  return (
    <Section tone="light" className="overflow-hidden">
      <div className="container-x">
        <SectionHeading
          eyebrow="Eurogar"
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <RevealGroup
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          stagger={0.09}
        >
          {items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <RevealItem key={item.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-bone-300 bg-white p-6 transition-shadow duration-500 hover:shadow-[0_28px_60px_-30px_rgba(13,36,48,.3)] md:p-7"
                >
                  {/* fon raqami */}
                  <span
                    aria-hidden
                    className="font-display pointer-events-none absolute -top-5 -right-2 text-[6rem] leading-none font-black text-bone-200 transition-colors duration-500 group-hover:text-brand-200/50"
                  >
                    0{i + 1}
                  </span>

                  <span className="relative flex size-13 items-center justify-center rounded-2xl bg-ink-900 text-brand-400 transition-all duration-500 group-hover:bg-brand-400 group-hover:text-ink-950">
                    <Icon className="size-6" strokeWidth={2} />
                  </span>

                  <h3 className="font-display relative mt-5 text-[17px] leading-tight font-extrabold text-graphite">
                    {item.title}
                  </h3>
                  <p className="relative mt-2.5 text-[14px] leading-relaxed text-muted">
                    {item.text}
                  </p>

                  <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-brand-400 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                </motion.div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
