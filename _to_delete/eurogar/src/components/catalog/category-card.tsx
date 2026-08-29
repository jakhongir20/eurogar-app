"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import type { Category, Locale } from "@/lib/types";
import { cn, t } from "@/lib/utils";

export function CategoryCard({
  category,
  count,
  size = "md",
  className,
  priority,
}: {
  category: Category;
  count: number;
  size?: "md" | "lg";
  className?: string;
  priority?: boolean;
}) {
  const locale = useLocale() as Locale;
  const tc = useTranslations("categories");

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={cn("group/cat h-full", className)}
    >
      <Link
        href={`/catalog/${category.slug}`}
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-3xl border border-bone-300 bg-white",
          "transition-all duration-500 hover:border-transparent",
          "hover:shadow-[0_30px_64px_-30px_rgba(20,24,31,.34)]",
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden bg-bone-200",
            size === "lg" ? "aspect-[16/11]" : "aspect-[4/3]",
          )}
        >
          <Image
            src={category.image}
            alt={t(category.name, locale)}
            fill
            priority={priority}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
            className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cat:scale-[1.08]"
          />
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(11,14,19,.55),transparent_52%)] opacity-0 transition-opacity duration-600 group-hover/cat:opacity-100" />

          <span className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-white/85 text-graphite backdrop-blur-md transition-all duration-500 group-hover/cat:bg-brand-400 group-hover/cat:text-ink-950 group-hover/cat:rotate-45">
            <ArrowUpRight className="size-5" strokeWidth={2.4} />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="flex items-center gap-2 text-[12px] font-bold tracking-[0.14em] text-brand-600 uppercase">
            {count} {tc("products")}
          </div>
          <h3
            className={cn(
              "font-display mt-2 leading-tight font-extrabold text-graphite transition-colors duration-300 group-hover/cat:text-brand-600",
              size === "lg" ? "text-[22px] md:text-[26px]" : "text-[18px]",
            )}
          >
            {t(category.name, locale)}
          </h3>
          <p className="mt-2.5 line-clamp-2 text-[13.5px] leading-relaxed text-muted">
            {t(category.short, locale)}
          </p>
        </div>

        {/* pastki accent chiziq */}
        <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-brand-400 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cat:w-full" />
      </Link>
    </motion.div>
  );
}
