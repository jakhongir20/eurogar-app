/**
 * Admin uchun mahsulotlar ombori (mock).
 * Server tomonda global obyektda saqlanadi — server qayta ishga tushsa tiklanadi.
 * Postgres'ga o'tganda faqat shu fayl almashadi.
 */
import { products as seed } from "@/data/products";
import type { Product } from "./types";

const g = globalThis as unknown as { __egProducts?: Product[] };
g.__egProducts ??= structuredClone(seed);
const rows = g.__egProducts;

export const allProducts = () => rows;

export const findProduct = (id: string) => rows.find((p) => p.id === id);

export function createProduct(input: Partial<Product>): Product {
  const p: Product = {
    id: crypto.randomUUID().slice(0, 8),
    slug:
      input.slug?.trim() ||
      (input.name?.uz ?? "mahsulot")
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-") + "-" + Math.random().toString(36).slice(2, 6),
    categorySlug: input.categorySlug ?? "rolletli-shkaflar",
    name: input.name ?? { uz: "", ru: "" },
    description: input.description ?? { uz: "", ru: "" },
    price: Number(input.price ?? 0),
    oldPrice: input.oldPrice ? Number(input.oldPrice) : undefined,
    unit: input.unit ?? { uz: "dona", ru: "шт" },
    stock: Number(input.stock ?? 0),
    images: input.images?.length ? input.images : ["/products/shkaf-dark.svg"],
    badges: input.badges ?? [],
    specs: input.specs ?? [],
    featured: Boolean(input.featured),
    hidden: Boolean(input.hidden),
    createdAt: new Date().toISOString().slice(0, 10),
  };
  rows.unshift(p);
  return p;
}

export function updateProduct(id: string, patch: Partial<Product>) {
  const i = rows.findIndex((p) => p.id === id);
  if (i < 0) return null;
  rows[i] = {
    ...rows[i],
    ...patch,
    price: patch.price != null ? Number(patch.price) : rows[i].price,
    stock: patch.stock != null ? Number(patch.stock) : rows[i].stock,
    oldPrice:
      patch.oldPrice === null
        ? undefined
        : patch.oldPrice != null
          ? Number(patch.oldPrice)
          : rows[i].oldPrice,
    id: rows[i].id,
  };
  return rows[i];
}

export function deleteProduct(id: string) {
  const i = rows.findIndex((p) => p.id === id);
  if (i < 0) return false;
  rows.splice(i, 1);
  return true;
}

export function stats() {
  return {
    total: rows.length,
    visible: rows.filter((p) => !p.hidden).length,
    hidden: rows.filter((p) => p.hidden).length,
    outOfStock: rows.filter((p) => p.stock <= 0).length,
    stockValue: rows.reduce((a, p) => a + p.price * p.stock, 0),
  };
}
