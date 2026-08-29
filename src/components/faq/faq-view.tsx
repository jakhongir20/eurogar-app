"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { faqGroups } from "@/data/services";
import type { Locale } from "@/lib/types";
import { cn, t } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { LeadForm } from "@/components/forms/lead-form";

/** TZ 2.11: toifalarga guruhlangan akkordeon + "Savolingiz bormi?" formasi */
export function FaqView() {
  const locale = useLocale() as Locale;
  const tf = useTranslations("faq");
  const [openId, setOpenId] = useState<string | null>(
    `${faqGroups[0].id}-0`,
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-10">
      {/* ── akkordeonlar ── */}
      <div className="space-y-8">
        {faqGroups.map((group, gi) => (
          <Reveal key={group.id} delay={gi * 0.05}>
            <div>
              <h2 className="font-display mb-4 text-[17px] font-extrabold text-graphite">
                {t(group.title, locale)}
              </h2>
              <div className="overflow-hidden rounded-3xl border border-bone-300 bg-white">
                {group.items.map((item, i) => {
                  const id = `${group.id}-${i}`;
                  const open = openId === id;
                  return (
                    <div
                      key={id}
                      className={cn(i > 0 && "border-t border-bone-300")}
                    >
                      <button
                        onClick={() => setOpenId(open ? null : id)}
                        aria-expanded={open}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left transition-colors hover:bg-bone-100 md:px-6"
                      >
                        <span
                          className={cn(
                            "text-[15px] leading-snug font-bold transition-colors",
                            open ? "text-brand-600" : "text-graphite",
                          )}
                        >
                          {t(item.q, locale)}
                        </span>
                        <span
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-400",
                            open
                              ? "rotate-180 border-brand-400 bg-brand-400 text-navy-950"
                              : "border-bone-300 text-muted",
                          )}
                        >
                          <ChevronDown className="size-4" strokeWidth={2.4} />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-5 text-[14px] leading-relaxed text-muted md:px-6">
                              {t(item.a, locale)}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── "Savolingiz bormi?" ── */}
      <aside>
        <Reveal dir="left" delay={0.1}>
          <div className="dark-section relative overflow-hidden rounded-[2rem] bg-navy-900 p-6 text-white md:p-7 lg:sticky lg:top-28">
            <div className="grid-texture pointer-events-none absolute inset-0 opacity-50" />
            <div className="relative">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-400 text-navy-950">
                <MessageCircleQuestion className="size-6" strokeWidth={2.1} />
              </span>
              <h3 className="font-display mt-4 text-[19px] font-extrabold">
                {tf("askTitle")}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">
                {tf("askText")}
              </p>
              <div className="mt-5">
                <LeadForm
                  source="contact"
                  tone="dark"
                  layout="stack"
                  meta={{ Manba: "FAQ sahifasi" }}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </aside>
    </div>
  );
}
