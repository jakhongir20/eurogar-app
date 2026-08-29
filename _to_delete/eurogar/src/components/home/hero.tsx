"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight, Calculator, ChevronDown, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { categories } from "@/data/categories";
import type { Locale } from "@/lib/types";
import { t } from "@/lib/utils";
import { ButtonShell } from "@/components/ui/button";
import { RevealWords } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";

export function Hero() {
  const th = useTranslations("hero");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  /* sichqoncha ortidan yuruvchi yorug'lik */
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const sx = useSpring(mx, { stiffness: 60, damping: 22 });
  const sy = useSpring(my, { stiffness: 60, damping: 22 });
  const spotlight = useMotionTemplate`radial-gradient(38rem 30rem at ${sx}% ${sy}%, rgba(245,181,68,.16), transparent 70%)`;

  /* parallax */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const stats = [
    { value: site.stats.years, suffix: "+", label: th("stat1") },
    { value: site.stats.warranty, suffix: "", label: th("stat2") },
    { value: site.stats.projects, suffix: "+", label: th("stat3") },
  ];

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
      className="dark-section relative -mt-17 flex min-h-[100svh] flex-col overflow-hidden bg-ink-950 pt-17 text-white md:-mt-20 md:pt-20 lg:-mt-[7.5rem] lg:pt-[7.5rem]"
    >
      {/* ── fon qatlamlari ── */}
      <div className="grid-texture pointer-events-none absolute inset-0" />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />
      <div
        className="pointer-events-none absolute top-[-18%] right-[-12%] size-[46rem] rounded-full opacity-[0.16] blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-brand-400), transparent 68%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-[-25%] left-[-15%] size-[38rem] rounded-full opacity-[0.10] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-steel-400), transparent 68%)",
        }}
      />
      {/* pastki bo'g'inlik */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      {/* ── kontent ── */}
      <motion.div
        style={{ y: yText, opacity }}
        className="container-x relative flex flex-1 flex-col justify-center py-12 lg:py-0"
      >
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
          {/* chap ustun */}
          <div className="lg:col-span-7 xl:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="glass-dark inline-flex items-center gap-2.5 rounded-full py-2 pr-4 pl-2"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-brand-400">
                <ShieldCheck className="size-3.5 text-ink-950" strokeWidth={2.6} />
              </span>
              <span className="text-[12.5px] font-semibold text-white/75">
                {th("badge")}
              </span>
            </motion.div>

            <h1 className="font-display mt-6 text-[clamp(2.4rem,7.4vw,5.2rem)] leading-[0.98] font-black tracking-[-0.045em]">
              <RevealWords text={th("title")} delay={0.12} />
              <br />
              <RevealWords
                text={th("titleAccent")}
                delay={0.3}
                wordClassName="text-metal"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-white/55 md:text-[17px]"
            >
              {th("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Link href="/contact" className="group/btn">
                <ButtonShell
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                  iconRight={<ArrowRight className="size-[18px]" strokeWidth={2.4} />}
                >
                  {th("ctaPrimary")}
                </ButtonShell>
              </Link>
              <Link href="/calculator" className="group/btn">
                <ButtonShell
                  variant="glass"
                  size="lg"
                  className="w-full sm:w-auto"
                  icon={<Calculator className="size-[18px]" strokeWidth={2.2} />}
                >
                  {th("ctaSecondary")}
                </ButtonShell>
              </Link>
            </motion.div>

            {/* statistika */}
            <motion.dl
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-7"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-[clamp(1.6rem,4vw,2.4rem)] leading-none font-extrabold text-white">
                    <Counter to={s.value} suffix={s.suffix} />
                  </dt>
                  <dd className="mt-2 text-[12.5px] leading-snug text-white/45">
                    {s.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* o'ng ustun — mahsulot */}
          <motion.div
            style={{ y: yImage }}
            className="relative lg:col-span-5 xl:col-span-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.25, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto aspect-[4/3] w-full max-w-xl"
            >
              {/* halqa */}
              <div className="absolute inset-[-6%] rounded-[2.5rem] border border-white/8" />
              <div className="absolute inset-[-12%] rounded-[3rem] border border-white/5" />

              <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_50px_120px_-40px_rgba(0,0,0,.9)]">
                <Image
                  src="/products/vorota-sectional-brown.svg"
                  alt={site.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(245,181,68,.14),transparent_52%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(6,8,11,.42),transparent_38%)]" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-white/15 ring-inset" />
              </div>

              {/* suzuvchi karta */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-2 rounded-2xl border border-white/12 bg-ink-900/92 px-4 py-3 shadow-[0_18px_40px_-16px_rgba(0,0,0,.9)] backdrop-blur-xl sm:-left-6"
              >
                <div className="text-[11px] tracking-[0.14em] text-white/45 uppercase">
                  {th("stat4")}
                </div>
                <div className="font-display mt-1 text-[17px] font-extrabold text-brand-400">
                  {locale === "uz" ? "Bepul" : "Бесплатно"}
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -top-4 -right-2 rounded-2xl border border-white/12 bg-ink-900/92 px-4 py-3 shadow-[0_18px_40px_-16px_rgba(0,0,0,.9)] backdrop-blur-xl sm:-right-5"
              >
                <div className="text-[11px] tracking-[0.14em] text-white/45 uppercase">
                  {th("stat2")}
                </div>
                <div className="font-display mt-1 text-[17px] font-extrabold text-white">
                  {site.stats.warranty} {tc("years")}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── pastki marquee ── */}
      <div className="relative border-t border-white/8 py-4">
        <div className="mask-edges flex overflow-hidden">
          <div className="flex shrink-0 animate-[var(--animate-marquee)] gap-10 pr-10">
            {[...categories, ...categories].map((c, i) => (
              <span
                key={`${c.id}-${i}`}
                className="flex shrink-0 items-center gap-10 text-[13px] font-semibold tracking-wide text-white/30 uppercase"
              >
                {t(c.name, locale)}
                <span className="size-1 rounded-full bg-brand-400/60" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* scroll ishorasi */}
      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute bottom-20 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 lg:flex"
      >
        <span className="text-[10.5px] font-semibold tracking-[0.2em] text-white/30 uppercase">
          {tc("scrollDown")}
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-4 text-brand-400" strokeWidth={2.4} />
        </motion.span>
      </motion.div>
    </section>
  );
}
