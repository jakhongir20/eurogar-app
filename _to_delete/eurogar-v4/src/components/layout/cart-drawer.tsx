"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cartCount, cartTotal, useCart } from "@/lib/cart-store";
import { cn, formatPrice, t } from "@/lib/utils";
import type { Locale } from "@/lib/types";
import { ButtonShell } from "@/components/ui/button";

export function CartDrawer() {
  const locale = useLocale() as Locale;
  const tcart = useTranslations("cart");
  const tc = useTranslations("common");

  const { lines, isOpen, close, remove, setQty, clear } = useCart();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const total = cartTotal(lines);
  const count = cartCount(lines);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90]">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            aria-label={tc("back")}
            className="absolute inset-0 cursor-default bg-navy-950/55 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 right-0 flex h-full w-full max-w-[27rem] flex-col bg-bone-100 shadow-[-30px_0_80px_-20px_rgba(3,26,36,.5)]"
          >
            {/* header */}
            <div className="flex h-17 shrink-0 items-center justify-between border-b border-bone-300 px-5">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="size-5 text-graphite" strokeWidth={2.2} />
                <span className="font-display text-[17px] font-extrabold text-graphite">
                  {tcart("title")}
                </span>
                {count > 0 && (
                  <span className="rounded-full bg-brand-400 px-2 py-0.5 text-[11px] font-extrabold text-ink-950">
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={close}
                className="flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-bone-300 hover:text-graphite active:scale-90"
              >
                <X className="size-5" strokeWidth={2.2} />
              </button>
            </div>

            {/* mahsulotlar */}
            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <div className="flex size-20 items-center justify-center rounded-full bg-bone-200">
                  <ShoppingBag className="size-8 text-bone-500" strokeWidth={1.6} />
                </div>
                <p className="font-display mt-5 text-[18px] font-extrabold text-graphite">
                  {tcart("empty")}
                </p>
                <p className="mt-2 text-[14px] text-muted">
                  {tcart("emptyText")}
                </p>
                <Link href="/catalog" onClick={close} className="group/btn mt-6">
                  <ButtonShell variant="dark" size="md">
                    {tcart("goCatalog")}
                  </ButtonShell>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.div
                        key={l.productId}
                        layout
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-3 flex gap-3 overflow-hidden rounded-2xl border border-bone-300 bg-white p-3"
                      >
                        <Link
                          href={`/product/${l.slug}`}
                          onClick={close}
                          className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-bone-200"
                        >
                          <Image
                            src={l.image}
                            alt=""
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col">
                          <Link
                            href={`/product/${l.slug}`}
                            onClick={close}
                            className="line-clamp-2 text-[13.5px] leading-snug font-bold text-graphite hover:text-brand-600"
                          >
                            {t(l.name, locale)}
                          </Link>

                          <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                            <div className="flex items-center rounded-full border border-bone-300">
                              <button
                                onClick={() => setQty(l.productId, l.qty - 1)}
                                className="flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:text-graphite active:scale-90"
                                aria-label="−"
                              >
                                <Minus className="size-3.5" strokeWidth={2.6} />
                              </button>
                              <span className="w-7 text-center text-[13.5px] font-bold text-graphite tabular-nums">
                                {l.qty}
                              </span>
                              <button
                                onClick={() => setQty(l.productId, l.qty + 1)}
                                disabled={l.qty >= l.stock}
                                className="flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:text-graphite active:scale-90 disabled:opacity-30"
                                aria-label="+"
                              >
                                <Plus className="size-3.5" strokeWidth={2.6} />
                              </button>
                            </div>

                            <span className="text-[13.5px] font-extrabold text-graphite">
                              {formatPrice(l.price * l.qty, locale)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => remove(l.productId)}
                          aria-label={tcart("remove")}
                          className="flex size-8 shrink-0 items-center justify-center self-start rounded-full text-muted/50 transition-colors hover:bg-red-50 hover:text-red-500 active:scale-90"
                        >
                          <Trash2 className="size-4" strokeWidth={2} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <button
                    onClick={clear}
                    className="mt-1 w-full rounded-xl py-2.5 text-[13px] font-semibold text-muted transition-colors hover:text-red-500"
                  >
                    {tcart("clear")}
                  </button>
                </div>

                {/* footer */}
                <div className="shrink-0 border-t border-bone-300 bg-white p-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[14px] font-semibold text-muted">
                      {tcart("subtotal")}
                    </span>
                    <span className="font-display text-[24px] font-extrabold text-graphite">
                      {formatPrice(total, locale)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12px] text-muted">
                    {tcart("priceNote")}
                  </p>

                  <Link
                    href="/checkout"
                    onClick={close}
                    className={cn("group/btn mt-4 block")}
                  >
                    <ButtonShell variant="primary" size="lg" className="w-full">
                      {tcart("checkout")}
                    </ButtonShell>
                  </Link>

                  <button
                    onClick={close}
                    className="mt-2.5 w-full rounded-full py-3 text-[13.5px] font-semibold text-muted transition-colors hover:text-graphite"
                  >
                    {tcart("continue")}
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
