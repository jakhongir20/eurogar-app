"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cartTotal, useCart } from "@/lib/cart-store";
import type { Locale } from "@/lib/types";
import { formatPrice, t as tr } from "@/lib/utils";
import { ButtonShell } from "@/components/ui/button";

export function CartView() {
  const locale = useLocale() as Locale;
  const tcart = useTranslations("cart");
  const tc = useTranslations("common");
  const { lines, setQty, remove, clear } = useCart();
  const total = cartTotal(lines);

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center rounded-[2rem] border border-dashed border-bone-400 bg-white/60 px-6 py-16 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-bone-200">
          <ShoppingBag className="size-8 text-bone-500" strokeWidth={1.6} />
        </div>
        <p className="font-display mt-5 text-[19px] font-extrabold text-graphite">
          {tcart("empty")}
        </p>
        <p className="mt-2 text-[14px] text-muted">{tcart("emptyText")}</p>
        <Link href="/catalog" className="group/btn mt-6">
          <ButtonShell variant="primary" size="lg">
            {tcart("goCatalog")}
          </ButtonShell>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
      <div className="lg:col-span-3">
        <AnimatePresence initial={false}>
          {lines.map((l) => (
            <motion.div
              key={l.productId}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 50, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 flex gap-4 overflow-hidden rounded-3xl border border-bone-300 bg-white p-4 md:p-5"
            >
              <Link
                href={`/product/${l.slug}`}
                className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-bone-200 md:size-28"
              >
                <Image src={l.image} alt="" fill sizes="112px" className="object-cover" />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <Link
                  href={`/product/${l.slug}`}
                  className="line-clamp-2 text-[14.5px] leading-snug font-bold text-graphite transition-colors hover:text-brand-600 md:text-[16px]"
                >
                  {tr(l.name, locale)}
                </Link>
                <div className="mt-1 text-[13px] text-muted">
                  {formatPrice(l.price, locale)}
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                  <div className="flex items-center rounded-full border border-bone-300">
                    <button
                      onClick={() => setQty(l.productId, l.qty - 1)}
                      className="flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:text-graphite active:scale-90"
                      aria-label="−"
                    >
                      <Minus className="size-3.5" strokeWidth={2.6} />
                    </button>
                    <span className="w-8 text-center text-[14px] font-extrabold text-graphite tabular-nums">
                      {l.qty}
                    </span>
                    <button
                      onClick={() => setQty(l.productId, l.qty + 1)}
                      disabled={l.qty >= l.stock}
                      className="flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:text-graphite active:scale-90 disabled:opacity-30"
                      aria-label="+"
                    >
                      <Plus className="size-3.5" strokeWidth={2.6} />
                    </button>
                  </div>

                  <span className="font-display text-[16px] font-extrabold text-graphite md:text-[18px]">
                    {formatPrice(l.price * l.qty, locale)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => remove(l.productId)}
                aria-label={tcart("remove")}
                className="flex size-9 shrink-0 items-center justify-center self-start rounded-full text-muted/50 transition-colors hover:bg-red-50 hover:text-red-500 active:scale-90"
              >
                <Trash2 className="size-4" strokeWidth={2} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          onClick={clear}
          className="mt-2 rounded-full px-4 py-2.5 text-[13.5px] font-semibold text-muted transition-colors hover:text-red-500"
        >
          {tcart("clear")}
        </button>
      </div>

      <aside className="lg:col-span-2">
        <div className="rounded-[2rem] border border-bone-300 bg-white p-6 lg:sticky lg:top-28">
          <h3 className="font-display text-[16px] font-extrabold text-graphite">
            {tcart("title")}
          </h3>

          <div className="mt-5 flex items-baseline justify-between">
            <span className="text-[14px] font-semibold text-muted">
              {tcart("subtotal")}
            </span>
            <span className="text-[15px] font-bold text-graphite">
              {formatPrice(total, locale)}
            </span>
          </div>

          <div className="mt-4 flex items-baseline justify-between border-t border-bone-300 pt-4">
            <span className="text-[15px] font-bold text-graphite">
              {tc("total")}
            </span>
            <span className="font-display text-[24px] font-black text-graphite">
              {formatPrice(total, locale)}
            </span>
          </div>

          <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted">
            {tcart("priceNote")}
          </p>

          <Link href="/checkout" className="group/btn mt-6 block">
            <ButtonShell variant="primary" size="lg" className="w-full">
              {tcart("checkout")}
            </ButtonShell>
          </Link>

          <Link
            href="/catalog"
            className="mt-3 block rounded-full py-3 text-center text-[13.5px] font-semibold text-muted transition-colors hover:text-graphite"
          >
            {tcart("continue")}
          </Link>
        </div>
      </aside>
    </div>
  );
}
