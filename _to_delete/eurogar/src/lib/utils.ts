import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { I18nText, Locale } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Narxni "12 500 000 so'm" ko'rinishida chiqaradi */
export function formatPrice(value: number, locale: Locale = "uz") {
  const n = new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
  return `${n} ${locale === "uz" ? "so'm" : "сум"}`;
}

/** Qisqa ko'rinish: 12,5 mln */
export function formatCompact(value: number, locale: Locale = "uz") {
  if (value >= 1_000_000) {
    const m = (value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1);
    return `${m.replace(".", ",")} ${locale === "uz" ? "mln" : "млн"}`;
  }
  return new Intl.NumberFormat("ru-RU").format(value);
}

export function t(text: I18nText | undefined, locale: Locale): string {
  if (!text) return "";
  return text[locale] || text.uz || "";
}

/** +998 90 123 45 67 formatiga keltiradi */
export function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").replace(/^998/, "").slice(0, 9);
  const p = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(
    Boolean,
  );
  return p.length ? `+998 ${p.join(" ")}` : "";
}

export function phoneDigits(raw: string) {
  return raw.replace(/\D/g, "").replace(/^998/, "").slice(0, 9);
}

export function isValidPhone(raw: string) {
  return phoneDigits(raw).length === 9;
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9Ѐ-ӿ\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
