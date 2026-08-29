"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  Minus,
  Plus,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Wrench,
  Info,
} from "lucide-react";
import type { Locale, Product } from "@/lib/types";
import { cn, formatPrice, t } from "@/lib/utils";
import { useCart } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { ProductBadge, StockBadge } from "@/components/ui/badge";
import { site } from "@/lib/site";

export function ProductView({ product }: { product: Product }) {
  const locale = useLocale() as Locale;
  const tp = useTranslations("product");
  const tc = useTranslations("common");

  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const lastAdded = useCart((s) => s.lastAdded);
  const justAdded = lastAdded === product.id;

  const out = product.stock <= 0;
  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round((1 - product.price / product.oldPrice) * 100)
      : 0;

  const perks = [
    { Icon: ShieldCheck, label: tp("guarantee"), value: `${site.stats.warranty} ${tc("years")}` },
    { Icon: Ruler, label: tp("measure"), value: tp("measureText") },
    { Icon: Wrench, label: tp("installation"), value: tp("installationText") },
    { Icon: Truck, label: tp("delivery"), value: tp("deliveryText") },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
      {/* ── galereya ── */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-bone-300 bg-bone-200">
          <AnimatePresence mode="wait">
            <motion.div
              key={img}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[img]}
                alt={t(product.name, locale)}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
            {product.badges.map((b) => (
              <ProductBadge key={b} type={b} locale={locale} />
            ))}
            {discount > 0 && (
              <span className="rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-white">
                −{discount}%
              </span>
            )}
          </div>
        </div>

        {product.images.length > 1 && (
          <div className="mt-3 flex gap-2.5">
            {product.images.map((src, i) => (
              <button
                key={src + i}
                onClick={() => setImg(i)}
                className={cn(
                  "relative aspect-square w-20 shrink-0 overflow-hidden rounded-2xl border-2 bg-bone-200 transition-all duration-300 md:w-24",
                  i === img
                    ? "border-brand-400 shadow-[0_8px_20px_-10px_rgba(245,181,68,.8)]"
                    : "border-transparent opacity-60 hover:opacity-100",
                )}
              >
                <Image src={src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── ma'lumot ── */}
      <div>
        <StockBadge
          stock={product.stock}
          labels={{
            in: tc("inStock"),
            low: tc("lowStock"),
            out: tc("outOfStock"),
            pcs: tc("pcs"),
          }}
        />

        <h1 className="font-display mt-3 text-[clamp(1.6rem,3.6vw,2.5rem)] leading-[1.08] font-extrabold text-graphite text-balance-tight">
          {t(product.name, locale)}
        </h1>

        <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-1">
          {product.oldPrice && (
            <span className="text-[16px] font-semibold text-muted line-through">
              {formatPrice(product.oldPrice, locale)}
            </span>
          )}
          <span className="font-display text-[clamp(1.6rem,4vw,2.25rem)] leading-none font-black text-graphite">
            {formatPrice(product.price, locale)}
          </span>
          <span className="text-[14px] text-muted">
            / {t(product.unit, locale)}
          </span>
        </div>

        <p className="mt-5 text-[15px] leading-relaxed text-muted">
          {t(product.description, locale)}
        </p>

        {/* miqdor + savat */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <div className="flex h-14 shrink-0 items-center rounded-full border border-bone-300 bg-white px-1 md:h-[60px]">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:text-graphite active:scale-90"
              aria-label="−"
            >
              <Minus className="size-4" strokeWidth={2.6} />
            </button>
            <span className="w-10 text-center text-[16px] font-extrabold text-graphite tabular-nums">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => Math.min(product.stock || 1, q + 1))}
              disabled={qty >= product.stock}
              className="flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:text-graphite active:scale-90 disabled:opacity-30"
              aria-label="+"
            >
              <Plus className="size-4" strokeWidth={2.6} />
            </button>
          </div>

          <Button
            size="lg"
            variant={justAdded ? "dark" : "primary"}
            disabled={out}
            onClick={() => add(product, qty)}
            icon={
              justAdded ? (
                <Check className="size-5" strokeWidth={2.8} />
              ) : (
                <ShoppingBag className="size-[18px]" strokeWidth={2.3} />
              )
            }
            className="flex-1"
          >
            {out ? tc("outOfStock") : justAdded ? tc("added") : tc("addToCart")}
          </Button>
        </div>

        <p className="mt-3.5 flex items-start gap-2 text-[13px] leading-relaxed text-muted">
          <Info className="mt-0.5 size-4 shrink-0 text-brand-500" strokeWidth={2.2} />
          {tp("priceNote")}
        </p>

        {/* afzalliklar */}
        <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
          {perks.map((p) => (
            <div
              key={p.label}
              className="flex items-start gap-3 rounded-2xl border border-bone-300 bg-white p-4"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-bone-200 text-graphite">
                <p.Icon className="size-[18px]" strokeWidth={2.1} />
              </span>
              <div className="min-w-0">
                <div className="text-[11.5px] font-bold tracking-[0.1em] text-muted uppercase">
                  {p.label}
                </div>
                <div className="mt-0.5 text-[13.5px] leading-snug font-semibold text-graphite">
                  {p.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* xususiyatlar */}
        {product.specs.length > 0 && (
          <div className="mt-8">
            <h2 className="font-display text-[18px] font-extrabold text-graphite">
              {tc("specs")}
            </h2>
            <dl className="mt-4 overflow-hidden rounded-2xl border border-bone-300 bg-white">
              {product.specs.map((s, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-wrap items-baseline gap-x-3 px-4 py-3.5",
                    i > 0 && "border-t border-bone-300",
                  )}
                >
                  <dt className="min-w-40 flex-1 text-[13.5px] text-muted">
                    {t(s.label, locale)}
                  </dt>
                  <dd className="text-[14px] font-bold text-graphite">
                    {t(s.value, locale)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
