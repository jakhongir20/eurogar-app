"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/projects";
import { site } from "@/lib/site";
import type { Locale, Project } from "@/lib/types";
import { cn, t } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";

export function ProjectsSection() {
  const tp = useTranslations("projects");
  const locale = useLocale() as Locale;
  const [active, setActive] = useState<Project | null>(null);
  const [index, setIndex] = useState(0);

  const openProject = (p: Project) => {
    setActive(p);
    setIndex(0);
  };

  return (
    <Section tone="bone" id="projects" className="overflow-hidden">
      <div className="grid-texture-light pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute top-1/4 -left-32 size-[32rem] rounded-full opacity-[0.5] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-brand-100), transparent 70%)",
        }}
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Portfolio"
          title={tp("title")}
          subtitle={tp("subtitle")}
          action={
            <div className="text-right">
              <div className="font-display text-[clamp(2.4rem,6vw,3.6rem)] leading-none font-black text-brand-600">
                <Counter to={site.stats.projects} suffix="+" />
              </div>
              <div className="mt-1.5 text-[12.5px] text-muted">
                {tp("count")}
              </div>
            </div>
          }
        />

        {/* Birinchi karta 2×2 — shunda 6 ta loyiha 3×3 to'rni bo'sh joysiz to'ldiradi */}
        <RevealGroup
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr lg:gap-5"
          stagger={0.07}
        >
          {projects.map((p, i) => (
            <RevealItem
              key={p.id}
              className={cn(
                "h-full",
                i === 0 && "sm:col-span-2 lg:col-span-2 lg:row-span-2",
              )}
            >
              <button
                onClick={() => openProject(p)}
                className="group/pr relative block h-full w-full overflow-hidden rounded-3xl border border-bone-300 bg-navy-900 text-left shadow-[0_2px_10px_-6px_rgba(11,74,99,.3)] transition-all duration-500 hover:border-brand-400 hover:shadow-[0_28px_60px_-28px_rgba(11,74,99,.45)]"
              >
                <div
                  className={cn(
                    "relative overflow-hidden",
                    i === 0
                      ? "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[26rem]"
                      : "aspect-[4/3]",
                  )}
                >
                  <Image
                    src={p.cover}
                    alt={t(p.title, locale)}
                    fill
                    sizes={i === 0 ? "(max-width:768px) 92vw, 62vw" : "(max-width:768px) 92vw, 31vw"}
                    className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/pr:scale-[1.07]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(3,26,36,.92),rgba(3,26,36,.25)_55%,transparent)]" />

                  <span className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-500 group-hover/pr:rotate-45 group-hover/pr:bg-brand-400 group-hover/pr:text-ink-950">
                    <ArrowUpRight className="size-5" strokeWidth={2.4} />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <div className="flex items-center gap-3 text-[12px] font-semibold text-brand-400">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-3.5" strokeWidth={2.4} />
                        {t(p.location, locale)}
                      </span>
                      <span className="size-1 rounded-full bg-white/25" />
                      <span className="text-white/65">{p.year}</span>
                    </div>
                    <h3
                      className={cn(
                        "font-display mt-2 leading-tight font-extrabold text-white",
                        i === 0 ? "text-[20px] md:text-[26px]" : "text-[17px]",
                      )}
                    >
                      {t(p.title, locale)}
                    </h3>
                    {i === 0 && (
                      <p className="mt-2.5 max-w-lg text-[14px] leading-relaxed text-white/55">
                        {t(p.summary, locale)}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* ── lightbox ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[95] flex items-center justify-center p-4"
          >
            <button
              onClick={() => setActive(null)}
              aria-label="close"
              className="absolute inset-0 cursor-default bg-navy-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.94, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 24, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/12 bg-navy-900"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-10 flex size-11 items-center justify-center rounded-full bg-ink-950/70 text-white backdrop-blur-md transition-colors hover:bg-brand-400 hover:text-ink-950 active:scale-90"
              >
                <X className="size-5" strokeWidth={2.3} />
              </button>

              <div className="relative aspect-[16/10] bg-ink-850">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={active.gallery[index]}
                      alt=""
                      fill
                      sizes="(max-width:1024px) 92vw, 56rem"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {active.gallery.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setIndex(
                          (i) =>
                            (i - 1 + active.gallery.length) %
                            active.gallery.length,
                        )
                      }
                      className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/60 text-white backdrop-blur-md transition-colors hover:bg-brand-400 hover:text-ink-950"
                      aria-label="prev"
                    >
                      <ChevronLeft className="size-5" strokeWidth={2.4} />
                    </button>
                    <button
                      onClick={() =>
                        setIndex((i) => (i + 1) % active.gallery.length)
                      }
                      className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/60 text-white backdrop-blur-md transition-colors hover:bg-brand-400 hover:text-ink-950"
                      aria-label="next"
                    >
                      <ChevronRight className="size-5" strokeWidth={2.4} />
                    </button>

                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {active.gallery.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setIndex(i)}
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-400",
                            i === index
                              ? "w-6 bg-brand-400"
                              : "w-1.5 bg-white/35 hover:bg-white/60",
                          )}
                          aria-label={`${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 text-[12.5px] font-semibold text-brand-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5" strokeWidth={2.4} />
                    {t(active.location, locale)}
                  </span>
                  <span className="size-1 rounded-full bg-white/25" />
                  <span className="text-white/65">{active.year}</span>
                </div>
                <h3 className="font-display mt-2.5 text-[22px] font-extrabold text-white md:text-[28px]">
                  {t(active.title, locale)}
                </h3>
                <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-white/55">
                  {t(active.summary, locale)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
