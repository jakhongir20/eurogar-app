"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.5 9.5v5l4.2-2.5-4.2-2.5Z" fill="currentColor" />
    </svg>
  );
}
import { site, videoReviews } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

/**
 * Mijozlarning video fikrlari — YouTube Shorts (TZ 2.10: matn+video).
 * Sahifa yuklanishida faqat thumbnail olinadi; iframe bosilgandagina
 * yuklanadi — sahifa tezligi saqlanadi.
 */
function Thumb({ id }: { id: string }) {
  /* Shorts'ning vertikal thumbnail'i (oar2) hamma videoda bo'lmaydi —
     bo'lmasa standart hqdefault'ga tushamiz */
  const [src, setSrc] = useState(`https://i.ytimg.com/vi/${id}/oar2.jpg`);
  return (
    <Image
      src={src}
      alt=""
      fill
      unoptimized
      sizes="256px"
      className="object-cover transition-transform duration-700 group-hover/vid:scale-105"
      onError={() => setSrc(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
    />
  );
}

export function VideoReviews() {
  const t = useTranslations("reviews");
  const [active, setActive] = useState<string | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const scrollBy = (dir: 1 | -1) => {
    railRef.current?.scrollBy({ left: dir * 560, behavior: "smooth" });
  };

  return (
    <Section tone="bone" id="reviews" className="overflow-hidden">
      <div className="grid-texture-light pointer-events-none absolute inset-0 opacity-50" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          action={
            <div className="flex items-center gap-2">
              <a
                href={site.youtube}
                target="_blank"
                rel="noreferrer"
                className="mr-2 hidden items-center gap-2 rounded-full border border-bone-300 bg-white px-4 py-2.5 text-[13.5px] font-semibold text-graphite transition-all hover:-translate-y-0.5 hover:border-graphite/25 md:flex"
              >
                <YoutubeIcon className="size-4 text-red-600" />
                {t("more")}
              </a>
              <button
                onClick={() => scrollBy(-1)}
                aria-label="←"
                className="flex size-11 items-center justify-center rounded-full border border-bone-300 bg-white text-graphite transition-all hover:border-graphite/25 active:scale-90"
              >
                <ChevronLeft className="size-5" strokeWidth={2.3} />
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label="→"
                className="flex size-11 items-center justify-center rounded-full border border-bone-300 bg-white text-graphite transition-all hover:border-graphite/25 active:scale-90"
              >
                <ChevronRight className="size-5" strokeWidth={2.3} />
              </button>
            </div>
          }
        />
      </div>

      {/* gorizontal lenta — konteynerdan chiqib, chetgacha boradi */}
      <div className="relative mt-10">
        <RevealGroup stagger={0.05}>
          <div
            ref={railRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:px-8 xl:px-[max(3rem,calc((100vw-88rem)/2+3rem))]"
          >
            {videoReviews.map((id, i) => (
              <RevealItem key={id} className="shrink-0 snap-start">
                <button
                  onClick={() => setActive(id)}
                  className="group/vid relative block aspect-[9/16] w-56 overflow-hidden rounded-3xl border border-bone-300 bg-navy-900 text-left shadow-[0_2px_10px_-6px_rgba(11,74,99,.3)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-400 hover:shadow-[0_28px_56px_-26px_rgba(11,74,99,.5)] md:w-64"
                  aria-label={`${t("watch")} ${i + 1}`}
                >
                  <Thumb id={id} />
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(4,34,47,.72),transparent_45%)]" />

                  {/* play tugmasi */}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-[0_10px_30px_-8px_rgba(4,34,47,.6)] backdrop-blur-sm transition-all duration-400 group-hover/vid:scale-110 group-hover/vid:bg-brand-400">
                      <Play className="ml-0.5 size-6 fill-current" strokeWidth={0} />
                    </span>
                  </span>

                  <span className="absolute right-4 bottom-4 left-4 flex items-center gap-2 text-[12.5px] font-bold text-white">
                    <YoutubeIcon className="size-4 text-red-500" />
                    {t("watch")}
                  </span>
                </button>
              </RevealItem>
            ))}
          </div>
        </RevealGroup>
      </div>

      {/* ── video modal ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[95] flex items-center justify-center p-4"
          >
            <button
              onClick={() => setActive(null)}
              aria-label="close"
              className="absolute inset-0 cursor-default bg-navy-950/88 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.92, y: 22 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 22 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[9/16] h-[min(80vh,44rem)] overflow-hidden rounded-3xl border border-white/15 bg-black shadow-[0_50px_120px_-40px_rgba(0,0,0,.9)]"
            >
              <iframe
                src={`https://www.youtube.com/embed/${active}?autoplay=1&rel=0`}
                title={t("watch")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 size-full border-0"
              />
            </motion.div>
            <button
              onClick={() => setActive(null)}
              className={cn(
                "absolute top-5 right-5 flex size-12 items-center justify-center rounded-full",
                "bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-brand-400 hover:text-navy-950 active:scale-90",
              )}
              aria-label="close"
            >
              <X className="size-6" strokeWidth={2.3} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
