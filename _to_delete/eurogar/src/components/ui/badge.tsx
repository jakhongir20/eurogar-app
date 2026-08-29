import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Badge as BadgeType, Locale } from "@/lib/types";

const LABELS: Record<BadgeType, Record<Locale, string>> = {
  hit: { uz: "HIT", ru: "ХИТ" },
  new: { uz: "YANGI", ru: "НОВИНКА" },
  sale: { uz: "CHEGIRMA", ru: "СКИДКА" },
};

const STYLES: Record<BadgeType, string> = {
  hit: "bg-ink-900 text-brand-300 ring-1 ring-inset ring-brand-400/25",
  new: "bg-steel-400/15 text-steel-500 ring-1 ring-inset ring-steel-400/30",
  sale: "bg-red-500 text-white shadow-[0_4px_14px_-4px_rgba(239,68,68,.6)]",
};

export function ProductBadge({
  type,
  locale,
  className,
}: {
  type: BadgeType;
  locale: Locale;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-[0.1em]",
        STYLES[type],
        className,
      )}
    >
      {LABELS[type][locale]}
    </span>
  );
}

export function Chip({
  children,
  active,
  className,
  tone = "light",
}: {
  children: ReactNode;
  active?: boolean;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13.5px] font-semibold transition-all duration-300",
        tone === "light"
          ? active
            ? "bg-ink-900 text-white shadow-[0_8px_22px_-10px_rgba(11,14,19,.7)]"
            : "border border-bone-300 bg-white text-muted hover:border-graphite/25 hover:text-graphite"
          : active
            ? "bg-brand-400 text-ink-950"
            : "glass-dark text-white/70 hover:text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StockBadge({
  stock,
  labels,
  className,
}: {
  stock: number;
  labels: { in: string; low: string; out: string; pcs: string };
  className?: string;
}) {
  const state = stock <= 0 ? "out" : stock <= 5 ? "low" : "in";
  const dot =
    state === "out"
      ? "bg-bone-500"
      : state === "low"
        ? "bg-amber-500"
        : "bg-emerald-500";
  const text =
    state === "out"
      ? "text-muted"
      : state === "low"
        ? "text-amber-600"
        : "text-emerald-600";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[12.5px] font-semibold",
        text,
        className,
      )}
    >
      <span className="relative flex size-2">
        {state === "in" && (
          <span
            className={cn(
              "absolute inline-flex size-full rounded-full opacity-60",
              dot,
            )}
            style={{ animation: "var(--animate-pulse-ring)" }}
          />
        )}
        <span className={cn("relative inline-flex size-2 rounded-full", dot)} />
      </span>
      {state === "out"
        ? labels.out
        : state === "low"
          ? `${labels.low} · ${stock} ${labels.pcs}`
          : `${labels.in} · ${stock} ${labels.pcs}`}
    </span>
  );
}
