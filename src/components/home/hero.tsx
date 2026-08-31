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

  /* sichqoncha ortidan yuruvchi yumshoq yorug'lik */
  const mx = useMotionValue(60);
  const my = useMotionValue(30);
  const sx = useSpring(mx, { stiffness: 60, damping: 22 });
  const sy = useSpring(my, { stiffness: 60, damping: 22 });
  const spotlight = useMotionTemplate`radial-gradient(40rem 32rem at ${sx}% ${sy}%, rgba(41,171,226,.13), transparent 70%)`;

  /* parallax */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const stats = [
    { value: site.stats.years, suffix: "+", label: th("stat1") },
    { value: site.stats.warrantyMax, suffix: "", prefix: "1–", label: th("stat2") },
    { value: site.stats.deliveryDaysMax, suffix: "", prefix: "3–", label: th("stat3") },
  ];

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        /* Sensorli ekranlarda bu effekt ko'rinmaydi — hisoblashning hojati yo'q */
        if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
      className="relative -mt-17 flex min-h-[100svh] flex-col overflow-hidden bg-bone-100 pt-17 md:-mt-20 md:pt-20 lg:-mt-[7.5rem] lg:pt-[7.5rem]"
    >
      {/* ── fon qatlamlari ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, var(--color-bone-100) 55%, var(--color-bone-200) 100%)",
        }}
      />
      <div className="grid-texture-light pointer-events-none absolute inset-0 opacity-70" />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />
      <div
        className="pointer-events-none absolute top-[-16%] right-[-10%] size-[44rem] rounded-full opacity-[0.30] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-brand-200), transparent 68%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] left-[-14%] size-[36rem] rounded-full opacity-[0.35] blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, #dff1fb, transparent 68%)",
        }}
      />

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
              className="inline-flex items-center gap-2.5 rounded-full border border-bone-300 bg-white/80 py-2 pr-4 pl-2 shadow-[0_4px_16px_-8px_rgba(13,36,48,.2)] backdrop-blur-sm"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-brand-400">
                <ShieldCheck className="size-3.5 text-navy-950" strokeWidth={2.6} />
              </span>
              <span className="text-[12.5px] font-semibold text-navy-800">
                {th("badge")}
              </span>
            </motion.div>

            <h1 className="font-display mt-6 text-[clamp(2.4rem,7.4vw,5.2rem)] leading-[0.98] font-black tracking-[-0.045em] text-graphite">
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
              className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-muted md:text-[17px]"
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
                  variant="light"
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
              className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-bone-300 pt-7"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-[clamp(1.6rem,4vw,2.4rem)] leading-none font-extrabold text-navy-800">
                    <Counter to={s.value} suffix={s.suffix} prefix={s.prefix ?? ""} />
                  </dt>
                  <dd className="mt-2 text-[12.5px] leading-snug text-muted">
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
              {/* halqalar */}
              <div className="absolute inset-[-6%] rounded-[2.5rem] border border-navy-800/10" />
              <div className="absolute inset-[-12%] rounded-[3rem] border border-navy-800/[0.06]" />

              <div className="relative h-full overflow-hidden rounded-[2rem] border border-bone-300 bg-white shadow-[0_40px_90px_-40px_rgba(11,74,99,.45)]">
                <Image
                  src="/products/seksion-darvoza.webp"
                  alt={site.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(150deg,rgba(41,171,226,.10),transparent_50%)]" />
              </div>

              {/* suzuvchi kartalar */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-2 rounded-2xl border border-bone-300 bg-white px-4 py-3 shadow-[0_18px_40px_-18px_rgba(11,74,99,.45)] sm:-left-6"
              >
                <div className="text-[11px] tracking-[0.14em] text-muted uppercase">
                  {th("stat4")}
                </div>
                <div className="font-display mt-1 text-[17px] font-extrabold text-brand-600">
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
                className="absolute -top-4 -right-2 rounded-2xl border border-bone-300 bg-white px-4 py-3 shadow-[0_18px_40px_-18px_rgba(11,74,99,.45)] sm:-right-5"
              >
                <div className="text-[11px] tracking-[0.14em] text-muted uppercase">
                  {th("stat2")}
                </div>
                <div className="font-display mt-1 text-[17px] font-extrabold text-navy-800">
                  1–{site.stats.warrantyMax} {tc("years")}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── pastki marquee: to'q navy lenta — bo'limni ajratadi ── */}
      <div className="dark-section relative bg-navy-900 py-4">
        <div className="mask-edges flex overflow-hidden">
          <div className="flex shrink-0 animate-[var(--animate-marquee)] gap-10 pr-10">
            {[...categories, ...categories].map((c, i) => (
              <span
                key={`${c.id}-${i}`}
                className="flex shrink-0 items-center gap-10 text-[13px] font-semibold tracking-wide text-white/55 uppercase"
              >
                {t(c.name, locale)}
                <span className="size-1 rounded-full bg-brand-400" />
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
        <span className="text-[10.5px] font-semibold tracking-[0.2em] text-muted uppercase">
          {tc("scrollDown")}
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-4 text-brand-500" strokeWidth={2.4} />
        </motion.span>
      </motion.div>
    </section>
  );
}
