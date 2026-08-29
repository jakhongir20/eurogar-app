"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { PackageOpen, SlidersHorizontal, X } from "lucide-react";
import type { Locale, Product } from "@/lib/types";
import { categories } from "@/data/categories";
import { cn, formatCompact, t } from "@/lib/utils";
import { ProductCard } from "./product-card";

type Sort = "popular" | "priceAsc" | "priceDesc" | "new";

export function ProductGrid({
  products,
  showCategoryFilter = false,
}: {
  products: Product[];
  showCategoryFilter?: boolean;
}) {
  const tcat = useTranslations("catalog");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;

  const [sort, setSort] = useState<Sort>("popular");
  const [cat, setCat] = useState<string>("all");
  const [inStock, setInStock] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const priceCap = useMemo(
    () => Math.max(...products.map((p) => p.price), 1),
    [products],
  );

  const list = useMemo(() => {
    let out = [...products];
    if (cat !== "all") out = out.filter((p) => p.categorySlug === cat);
    if (inStock) out = out.filter((p) => p.stock > 0);
    if (maxPrice != null) out = out.filter((p) => p.price <= maxPrice);

    switch (sort) {
      case "priceAsc":
        out.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        out.sort((a, b) => b.price - a.price);
        break;
      case "new":
        out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      default:
        out.sort(
          (a, b) =>
            Number(b.featured) - Number(a.featured) ||
            b.badges.length - a.badges.length,
        );
    }
    return out;
  }, [products, cat, inStock, maxPrice, sort]);

  const activeFilters =
    (cat !== "all" ? 1 : 0) + (inStock ? 1 : 0) + (maxPrice != null ? 1 : 0);

  const sortOptions: { key: Sort; label: string }[] = [
    { key: "popular", label: tcat("sortPopular") },
    { key: "priceAsc", label: tcat("sortPriceAsc") },
    { key: "priceDesc", label: tcat("sortPriceDesc") },
    { key: "new", label: tcat("sortNew") },
  ];

  const reset = () => {
    setCat("all");
    setInStock(false);
    setMaxPrice(null);
  };

  return (
    <div>
      {/* ── boshqaruv paneli ── */}
      <div className="sticky top-17 z-30 -mx-5 mb-8 border-y border-bone-300 bg-bone-100/85 px-5 py-3 backdrop-blur-xl md:top-20 md:mx-0 md:rounded-2xl md:border md:px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[13.5px] font-semibold transition-all duration-300 active:scale-95",
              filtersOpen || activeFilters
                ? "bg-ink-900 text-white"
                : "border border-bone-300 bg-white text-muted hover:text-graphite",
            )}
          >
            <SlidersHorizontal className="size-4" strokeWidth={2.3} />
            {tcat("filters")}
            {activeFilters > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-brand-400 text-[10.5px] font-extrabold text-ink-950">
                {activeFilters}
              </span>
            )}
          </button>

          <div className="no-scrollbar flex flex-1 gap-1.5 overflow-x-auto">
            {sortOptions.map((o) => (
              <button
                key={o.key}
                onClick={() => setSort(o.key)}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-2.5 text-[13px] font-semibold whitespace-nowrap transition-all duration-300",
                  sort === o.key
                    ? "bg-bone-300 text-graphite"
                    : "text-muted hover:text-graphite",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>

          <span className="hidden shrink-0 text-[13px] font-semibold text-muted tabular-nums md:block">
            {list.length} {tcat("found")}
          </span>
        </div>

        {/* ── filtrlar ── */}
        <AnimatePresence initial={false}>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid gap-5 border-t border-bone-300 pt-4 pb-1 md:grid-cols-3">
                {showCategoryFilter && (
                  <div>
                    <div className="mb-2.5 text-[11.5px] font-bold tracking-[0.14em] text-muted uppercase">
                      {tcat("filters")}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => setCat("all")}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-all",
                          cat === "all"
                            ? "bg-ink-900 text-white"
                            : "border border-bone-300 bg-white text-muted hover:text-graphite",
                        )}
                      >
                        {tc("all")}
                      </button>
                      {categories.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setCat(c.slug)}
                          className={cn(
                            "rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-all",
                            cat === c.slug
                              ? "bg-ink-900 text-white"
                              : "border border-bone-300 bg-white text-muted hover:text-graphite",
                          )}
                        >
                          {t(c.name, locale)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div className="mb-2.5 text-[11.5px] font-bold tracking-[0.14em] text-muted uppercase">
                    {tcat("priceRange")}
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={priceCap}
                    step={100_000}
                    value={maxPrice ?? priceCap}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setMaxPrice(v >= priceCap ? null : v);
                    }}
                    className="w-full accent-brand-500"
                  />
                  <div className="mt-1 flex justify-between text-[12.5px] font-semibold text-muted tabular-nums">
                    <span>0</span>
                    <span className="text-graphite">
                      {tc("from")} 0 —{" "}
                      {formatCompact(maxPrice ?? priceCap, locale)}
                    </span>
                  </div>
                </div>

                <div className="flex items-end gap-3">
                  <label className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-2xl border border-bone-300 bg-white px-4 py-3">
                    <input
                      type="checkbox"
                      checked={inStock}
                      onChange={(e) => setInStock(e.target.checked)}
                      className="size-4.5 accent-brand-500"
                    />
                    <span className="text-[13.5px] font-semibold text-graphite">
                      {tcat("onlyInStock")}
                    </span>
                  </label>
                  {activeFilters > 0 && (
                    <button
                      onClick={reset}
                      className="flex items-center gap-1.5 rounded-full px-3 py-3 text-[13px] font-semibold text-muted transition-colors hover:text-red-500"
                    >
                      <X className="size-4" strokeWidth={2.4} />
                      {tcat("reset")}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── to'r ── */}
      {list.length === 0 ? (
        <div className="flex flex-col items-center rounded-3xl border border-dashed border-bone-400 bg-white/60 px-6 py-20 text-center">
          <PackageOpen className="size-10 text-bone-500" strokeWidth={1.6} />
          <p className="font-display mt-4 text-[17px] font-extrabold text-graphite">
            {tc("nothingFound")}
          </p>
          <p className="mt-1.5 text-[14px] text-muted">{tcat("emptyCategory")}</p>
          {activeFilters > 0 && (
            <button
              onClick={reset}
              className="mt-5 rounded-full bg-ink-900 px-5 py-2.5 text-[13.5px] font-bold text-white transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              {tcat("reset")}
            </button>
          )}
        </div>
      ) : (
        <motion.div
          layout
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(i * 0.045, 0.4),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full"
              >
                <ProductCard product={p} priority={i < 3} className="h-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
