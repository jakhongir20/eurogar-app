import type { Locale } from "@/i18n/routing";

export type { Locale };

/** Har bir matn ikki tilda saqlanadi — admin panelda ikkita maydon bo'ladi */
export type I18nText = Record<Locale, string>;

export type Badge = "hit" | "new" | "sale";

export interface Category {
  id: string;
  slug: string;
  name: I18nText;
  short: I18nText;
  /** lucide-react ikonka nomi */
  icon: string;
  image: string;
  order: number;
}

export interface Spec {
  label: I18nText;
  value: I18nText;
}

export interface Product {
  id: string;
  slug: string;
  categorySlug: string;
  name: I18nText;
  description: I18nText;
  /** narx so'mda */
  price: number;
  oldPrice?: number;
  /** o'lchov birligi: dona / m² */
  unit: I18nText;
  stock: number;
  images: string[];
  badges: Badge[];
  specs: Spec[];
  featured: boolean;
  hidden: boolean;
  createdAt: string;
}

export interface Project {
  id: string;
  slug: string;
  title: I18nText;
  summary: I18nText;
  location: I18nText;
  year: number;
  cover: string;
  gallery: string[];
  categorySlug: string;
}

export interface CartLine {
  productId: string;
  slug: string;
  name: I18nText;
  price: number;
  image: string;
  qty: number;
  stock: number;
}

export type OrderStatus = "new" | "in_progress" | "done" | "canceled";

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface Review {
  id: string;
  name: string;
  /** saytda ko'rsatilmaydi — faqat admin uchun */
  phone: string;
  /** 1–5 */
  rating: number;
  text: string;
  status: ReviewStatus;
  createdAt: string;
}

export interface Order {
  id: string;
  code: string;
  name: string;
  phone: string;
  note: string;
  items: { name: I18nText; qty: number; price: number }[];
  total: number;
  status: OrderStatus;
  source: "cart" | "calculator" | "contact";
  createdAt: string;
}
