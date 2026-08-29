"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { CornerDownLeft, SearchX, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { categories } from "@/data/categories";
import { searchProducts } from "@/data/products";
import type { Locale } from "@/lib/types";
import { formatPrice, t } from "@/lib/utils";

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const locale = useLocale() as Locale;
  const tc = useTranslations("common");
  const tcat = useTranslations("categories");
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = setTimeout(() => inputRef.current?.focus(), 120);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const results = useMemo(() => searchProducts(q).slice(0, 6), [q]);
  const catResults = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return categories
      .filter((c) =>
        `${c.name.uz} ${c.name.ru} ${c.slug}`.toLowerCase().includes(s),
      )
      .slice(0, 3);
  }, [q]);

  const empty = q.trim().length > 0 && results.length === 0 && catResults.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[80] flex flex-col"
    >
      <button
        aria-label={tc("back")}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-navy-950/60 backdrop-blur-md"
      />

      <motion.div
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -28, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mt-[6vh] w-full max-w-3xl px-4"
      >
        <div className="overflow-hidden rounded-3xl border border-bone-300 bg-bone-100 shadow-[0_40px_100px_-30px_rgba(4,34,47,.5)]">
          {/* input */}
          <div className="flex items-center gap-3 border-b border-bone-300 px-5">
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={tc("searchPlaceholder")}
              className="h-16 flex-1 bg-transparent text-[17px] font-medium text-graphite outline-none placeholder:text-muted/55 md:text-[19px]"
            />
            <button
              onClick={onClose}
              className="flex size-10 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-bone-300 hover:text-graphite active:scale-90"
            >
              <X className="size-5" strokeWidth={2.2} />
            </button>
          </div>

          {/* natijalar */}
          <div className="max-h-[62vh] overflow-y-auto">
            {!q.trim() && (
              <div className="px-5 py-6">
                <div className="mb-3 text-[11.5px] font-bold tracking-[0.16em] text-muted uppercase">
                  {tcat("title")}
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/catalog/${c.slug}`}
                      onClick={onClose}
                      className="rounded-full border border-bone-300 bg-white px-3.5 py-2 text-[13px] font-semibold text-muted transition-all hover:border-graphite/25 hover:text-graphite"
                    >
                      {t(c.name, locale)}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {catResults.length > 0 && (
              <div className="border-b border-bone-300 px-3 py-3">
                {catResults.map((c) => (
                  <Link
                    key={c.id}
                    href={`/catalog/${c.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-2xl px-2.5 py-2.5 transition-colors hover:bg-white"
                  >
                    <span className="relative size-11 shrink-0 overflow-hidden rounded-xl bg-bone-200">
                      <Image
                        src={c.image}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </span>
                    <span className="text-[14.5px] font-bold text-graphite">
                      {t(c.name, locale)}
                    </span>
                    <span className="ml-auto text-[12px] text-muted">
                      {tcat("title")}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {results.length > 0 && (
              <div className="px-3 py-3">
                {results.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    onClick={onClose}
                    className="group flex items-center gap-3 rounded-2xl px-2.5 py-2.5 transition-colors hover:bg-white"
                  >
                    <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-bone-200">
                      <Image
                        src={p.images[0]}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14.5px] font-bold text-graphite">
                        {t(p.name, locale)}
                      </span>
                      <span className="block text-[13px] font-semibold text-brand-600">
                        {formatPrice(p.price, locale)}
                      </span>
                    </span>
                    <CornerDownLeft className="size-4 shrink-0 text-muted/40 transition-colors group-hover:text-brand-500" />
                  </Link>
                ))}
              </div>
            )}

            {empty && (
              <div className="flex flex-col items-center px-5 py-14 text-center">
                <SearchX className="size-9 text-bone-500" strokeWidth={1.7} />
                <p className="mt-3 text-[15px] font-bold text-graphite">
                  {tc("nothingFound")}
                </p>
                <p className="mt-1 text-[13.5px] text-muted">
                  {tc("tryAnother")}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
