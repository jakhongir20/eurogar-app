"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ClipboardList, Ruler, Factory, Wrench } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const ICONS = [ClipboardList, Ruler, Factory, Wrench];

export function ProcessSection() {
  const t = useTranslations("process");

  const steps = [
    { title: t("s1Title"), text: t("s1Text") },
    { title: t("s2Title"), text: t("s2Text") },
    { title: t("s3Title"), text: t("s3Text") },
    { title: t("s4Title"), text: t("s4Text") },
  ];

  return (
    <Section tone="bone">
      <div className="container-x">
        <SectionHeading
          eyebrow="Process"
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />

        <div className="relative mt-14">
          {/* bog'lovchi chiziq */}
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -90px 0px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="absolute top-7 right-[12%] left-[12%] hidden h-px origin-left bg-[linear-gradient(90deg,transparent,var(--color-bone-400),var(--color-bone-400),transparent)] lg:block"
          />

          <RevealGroup
            className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
            stagger={0.12}
          >
            {steps.map((s, i) => {
              const Icon = ICONS[i];
              return (
                <RevealItem key={s.title}>
                  <div className="group text-center lg:text-left">
                    <div className="relative mx-auto flex size-14 items-center justify-center rounded-2xl border border-bone-300 bg-white text-graphite shadow-[0_10px_26px_-14px_rgba(20,24,31,.35)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-brand-400 group-hover:bg-brand-400 group-hover:text-ink-950 lg:mx-0">
                      <Icon className="size-6" strokeWidth={2} />
                      <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-ink-900 text-[11px] font-extrabold text-white">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="font-display mt-5 text-[17px] font-extrabold text-graphite">
                      {s.title}
                    </h3>
                    <p className="mx-auto mt-2 max-w-xs text-[14px] leading-relaxed text-muted lg:mx-0">
                      {s.text}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
