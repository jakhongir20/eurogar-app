"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Check, Plus } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import type { Locale, Product } from "@/lib/types";
import { cn, formatPrice, t } from "@/lib/utils";
import { useCart } from "@/lib/cart-store";
import { ProductBadge, StockBadge } from "@/components/ui/badge";

export function ProductCard({
  product,
  priority = false,
  className,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  const locale = useLocale() as Locale;
  const tc = useTranslations("common");
  const add = useCart((s) => s.add);
  const lastAdded = useCart((s) => s.lastAdded);
  const justAdded = lastAdded === product.id;
  const out = product.stock <= 0;

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round((1 - product.price / product.oldPrice) * 100)
      : 0;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group/card relative flex flex-col overflow-hidden rounded-3xl border border-bone-300 bg-white",
        "shadow-[0_1px_2px_rgba(13,36,48,.05)] transition-shadow duration-500",
        "hover:border-bone-400 hover:shadow-[0_28px_60px_-28px_rgba(13,36,48,.28)]",
        className,
      )}
    >
      {/* rasm */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-bone-200"
      >
        <Image
          src={product.images[0]}
          alt={t(product.name, locale)}
          fill
          priority={priority}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.07]"
        />

        {/* pastdan chiqadigan nur */}
        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(4,34,47,.16),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />

        {/* badge'lar */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
          {product.badges.map((b) => (
            <ProductBadge key={b} type={b} locale={locale} />
          ))}
          {discount > 0 && (
            <span className="rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-white">
              −{discount}%
            </span>
          )}
        </div>
      </Link>

      {/* tez qo'shish tugmasi */}
      <button
        type="button"
        disabled={out}
        onClick={() => add(product)}
        aria-label={tc("addToCart")}
        className={cn(
          "absolute top-[calc(75%-1.5rem)] right-3.5 z-10 flex size-12 items-center justify-center rounded-full",
          "transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "translate-y-3 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100",
          "focus-visible:translate-y-0 focus-visible:opacity-100",
          "max-md:translate-y-0 max-md:opacity-100",
          justAdded
            ? "bg-emerald-500 text-white"
            : "bg-ink-900 text-white hover:bg-brand-400 hover:text-ink-950",
          "shadow-[0_12px_28px_-10px_rgba(4,34,47,.6)] active:scale-90",
          out && "pointer-events-none opacity-0",
        )}
      >
        {justAdded ? (
          <Check className="size-5" strokeWidth={2.6} />
        ) : (
          <Plus className="size-5" strokeWidth={2.6} />
        )}
      </button>

      {/* matn */}
      <div className="flex flex-1 flex-col p-5">
        <StockBadge
          stock={product.stock}
          labels={{
            in: tc("inStock"),
            low: tc("lowStock"),
            out: tc("outOfStock"),
            pcs: tc("pcs"),
          }}
        />

        <Link href={`/product/${product.slug}`} className="mt-2.5">
          <h3 className="text-[15.5px] leading-snug font-bold text-graphite transition-colors duration-300 group-hover/card:text-brand-600">
            {t(product.name, locale)}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-muted">
          {t(product.description, locale)}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            {product.oldPrice && (
              <div className="text-[12.5px] font-medium text-muted line-through">
                {formatPrice(product.oldPrice, locale)}
              </div>
            )}
            <div className="font-display text-[19px] font-extrabold text-graphite">
              {formatPrice(product.price, locale)}
            </div>
            <div className="text-[12px] text-muted">
              / {t(product.unit, locale)}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
