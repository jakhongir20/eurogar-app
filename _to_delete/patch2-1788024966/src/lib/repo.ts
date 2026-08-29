/**
 * Ma'lumotlar qatlami — bitta kirish nuqtasi.
 *
 * DATABASE_URL berilgan  → PostgreSQL (Prisma 7 + pg adapter, engine'siz).
 * DATABASE_URL yo'q      → avvalgi xotira rejimi (dev uchun baza shart emas).
 *
 * Baza bo'sh bo'lsa mahsulotlar mock-katalogdan avtomatik seed qilinadi,
 * shuning uchun Neon'ni ulash: DATABASE_URL qo'yish + `prisma db push` — tamom.
 */
import { products as seedProducts } from "@/data/products";
import type { Badge, I18nText, Order, OrderStatus, Product, Spec } from "./types";
import * as mem from "./store";
import * as memProducts from "./admin-store";
import type { Lead } from "./store";

export const hasDb = () => Boolean(process.env.DATABASE_URL);

/* ─────────────────────────── Prisma klient ─────────────────────────── */

type PrismaClientT = import("@/generated/prisma/client").PrismaClient;

const g = globalThis as unknown as {
  __egPrisma?: PrismaClientT;
  __egSeeded?: Promise<void>;
};

async function db(): Promise<PrismaClientT> {
  if (!g.__egPrisma) {
    const [{ PrismaClient }, { PrismaPg }] = await Promise.all([
      import("@/generated/prisma/client"),
      import("@prisma/adapter-pg"),
    ]);
    g.__egPrisma = new PrismaClient({
      adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
    });
  }
  await (g.__egSeeded ??= seedIfEmpty(g.__egPrisma));
  return g.__egPrisma;
}

/** Bo'sh bazani mock-katalog bilan to'ldiradi (faqat mahsulotlar). */
async function seedIfEmpty(p: PrismaClientT) {
  const count = await p.product.count();
  if (count > 0) return;
  await p.product.createMany({
    data: seedProducts.map((s, i) => ({
      id: s.id,
      slug: s.slug,
      categorySlug: s.categorySlug,
      name: s.name,
      description: s.description,
      price: s.price,
      oldPrice: s.oldPrice ?? null,
      unit: s.unit,
      stock: s.stock,
      images: s.images,
      badges: s.badges,
      specs: s.specs as object[],
      featured: s.featured,
      hidden: s.hidden,
      createdAt: new Date(s.createdAt),
      sortOrder: i,
    })),
    skipDuplicates: true,
  });
  console.info(`[repo] baza bo'sh edi — ${seedProducts.length} mahsulot seed qilindi`);
}

/* ─────────────────────────── mapperlar ─────────────────────────── */

/* Prisma qaytargan qatorni sayt Product tipiga o'giradi */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToProduct(r: any): Product {
  return {
    id: r.id,
    slug: r.slug,
    categorySlug: r.categorySlug,
    name: r.name as I18nText,
    description: r.description as I18nText,
    price: r.price,
    oldPrice: r.oldPrice ?? undefined,
    unit: r.unit as I18nText,
    stock: r.stock,
    images: r.images as string[],
    badges: r.badges as Badge[],
    specs: (r.specs ?? []) as Spec[],
    featured: r.featured,
    hidden: r.hidden,
    createdAt: (r.createdAt as Date).toISOString().slice(0, 10),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToOrder(r: any): Order {
  return {
    id: r.id,
    code: `EG-${1000 + r.codeNum}`,
    name: r.name,
    phone: r.phone,
    note: r.note,
    items: r.items as Order["items"],
    total: r.total,
    status: r.status as OrderStatus,
    source: r.source as Order["source"],
    createdAt: (r.createdAt as Date).toISOString(),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToLead(r: any): Lead {
  return {
    id: r.id,
    name: r.name,
    phone: r.phone,
    note: r.note,
    source: r.source as Lead["source"],
    meta: (r.meta ?? undefined) as Lead["meta"],
    status: r.status as OrderStatus,
    createdAt: (r.createdAt as Date).toISOString(),
  };
}

const productOrder = [
  { sortOrder: "asc" as const },
  { createdAt: "desc" as const },
];

/* ─────────────────────────── Mahsulotlar ─────────────────────────── */

export async function listProducts(opts?: { includeHidden?: boolean }): Promise<Product[]> {
  if (!hasDb()) {
    const rows = memProducts.allProducts();
    return opts?.includeHidden ? rows : rows.filter((p) => !p.hidden);
  }
  const p = await db();
  const rows = await p.product.findMany({
    where: opts?.includeHidden ? {} : { hidden: false },
    orderBy: productOrder,
  });
  return rows.map(rowToProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!hasDb())
    return memProducts.allProducts().find((x) => x.slug === slug && !x.hidden) ?? null;
  const p = await db();
  const row = await p.product.findUnique({ where: { slug } });
  return row && !row.hidden ? rowToProduct(row) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!hasDb()) return memProducts.findProduct(id) ?? null;
  const p = await db();
  const row = await p.product.findUnique({ where: { id } });
  return row ? rowToProduct(row) : null;
}

export async function productsByCategory(categorySlug: string): Promise<Product[]> {
  if (!hasDb())
    return memProducts
      .allProducts()
      .filter((x) => x.categorySlug === categorySlug && !x.hidden);
  const p = await db();
  const rows = await p.product.findMany({
    where: { categorySlug, hidden: false },
    orderBy: productOrder,
  });
  return rows.map(rowToProduct);
}

export async function featuredProducts(): Promise<Product[]> {
  if (!hasDb())
    return memProducts.allProducts().filter((x) => x.featured && !x.hidden);
  const p = await db();
  const rows = await p.product.findMany({
    where: { featured: true, hidden: false },
    orderBy: productOrder,
  });
  return rows.map(rowToProduct);
}

/** Har bir toifadagi ko'rinadigan mahsulotlar soni */
export async function countsByCategory(): Promise<Record<string, number>> {
  if (!hasDb()) {
    const out: Record<string, number> = {};
    for (const x of memProducts.allProducts())
      if (!x.hidden) out[x.categorySlug] = (out[x.categorySlug] ?? 0) + 1;
    return out;
  }
  const p = await db();
  const rows = await p.product.groupBy({
    by: ["categorySlug"],
    where: { hidden: false },
    _count: { _all: true },
  });
  return Object.fromEntries(rows.map((r) => [r.categorySlug, r._count._all]));
}

/**
 * Qidiruv JS'da filtrllanadi (SQL ILIKE emas): Postgres'ning C.UTF-8
 * lokalida (Neon default) kirillcha katta-kichik harf mos kelmaydi,
 * JS toLowerCase esa buni to'g'ri qiladi. Katalog kichik — bu tezroq ham.
 */
export async function searchProducts(query: string, limit = 8): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const all = await listProducts();
  return all
    .filter((x) =>
      `${x.name.uz} ${x.name.ru} ${x.slug} ${x.description.uz} ${x.description.ru}`
        .toLowerCase()
        .includes(q),
    )
    .slice(0, limit);
}

export async function createProduct(input: Partial<Product>): Promise<Product> {
  if (!hasDb()) return memProducts.createProduct(input);
  const p = await db();
  const slug =
    input.slug?.trim() ||
    (input.name?.uz ?? "mahsulot")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-") +
      "-" +
      Math.random().toString(36).slice(2, 6);
  const row = await p.product.create({
    data: {
      slug,
      categorySlug: input.categorySlug ?? "rolstavniy-darvoza",
      name: input.name ?? { uz: "", ru: "" },
      description: input.description ?? { uz: "", ru: "" },
      price: Number(input.price ?? 0),
      oldPrice: input.oldPrice ? Number(input.oldPrice) : null,
      unit: input.unit ?? { uz: "dona", ru: "шт" },
      stock: Number(input.stock ?? 0),
      images: input.images?.length ? input.images : ["/products/bollard.svg"],
      badges: input.badges ?? [],
      specs: (input.specs ?? []) as object[],
      featured: Boolean(input.featured),
      hidden: Boolean(input.hidden),
      // yangi mahsulot ro'yxat boshida (Int32 ichiga sig'ishi uchun sekundlarda)
      sortOrder: -Math.floor(Date.now() / 1000),
    },
  });
  return rowToProduct(row);
}

export async function updateProduct(
  id: string,
  patch: Partial<Product>,
): Promise<Product | null> {
  if (!hasDb()) return memProducts.updateProduct(id, patch);
  const p = await db();
  try {
    const row = await p.product.update({
      where: { id },
      data: {
        ...(patch.slug != null ? { slug: patch.slug } : {}),
        ...(patch.categorySlug != null ? { categorySlug: patch.categorySlug } : {}),
        ...(patch.name != null ? { name: patch.name } : {}),
        ...(patch.description != null ? { description: patch.description } : {}),
        ...(patch.price != null ? { price: Number(patch.price) } : {}),
        ...(patch.oldPrice !== undefined
          ? { oldPrice: patch.oldPrice === null ? null : Number(patch.oldPrice) }
          : {}),
        ...(patch.unit != null ? { unit: patch.unit } : {}),
        ...(patch.stock != null ? { stock: Number(patch.stock) } : {}),
        ...(patch.images != null ? { images: patch.images } : {}),
        ...(patch.badges != null ? { badges: patch.badges } : {}),
        ...(patch.specs != null ? { specs: patch.specs as object[] } : {}),
        ...(patch.featured != null ? { featured: Boolean(patch.featured) } : {}),
        ...(patch.hidden != null ? { hidden: Boolean(patch.hidden) } : {}),
      },
    });
    return rowToProduct(row);
  } catch {
    return null;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (!hasDb()) return memProducts.deleteProduct(id);
  const p = await db();
  try {
    await p.product.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

export async function productStats() {
  if (!hasDb()) return memProducts.stats();
  const p = await db();
  const rows = await p.product.findMany({
    select: { price: true, stock: true, hidden: true },
  });
  return {
    total: rows.length,
    visible: rows.filter((r) => !r.hidden).length,
    hidden: rows.filter((r) => r.hidden).length,
    outOfStock: rows.filter((r) => r.stock <= 0).length,
    stockValue: rows.reduce((a, r) => a + r.price * r.stock, 0),
  };
}

/* ─────────────────────────── Buyurtmalar ─────────────────────────── */

export async function addOrder(
  o: Omit<Order, "id" | "code" | "createdAt" | "status">,
): Promise<Order> {
  if (!hasDb()) return mem.addOrder(o);
  const p = await db();
  const row = await p.order.create({
    data: {
      name: o.name,
      phone: o.phone,
      note: o.note,
      items: o.items as object[],
      total: o.total,
      source: o.source,
    },
  });
  return rowToOrder(row);
}

export async function listOrders(): Promise<Order[]> {
  if (!hasDb()) return mem.listOrders();
  const p = await db();
  const rows = await p.order.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map(rowToOrder);
}

export async function setOrderStatus(
  id: string,
  status: OrderStatus,
): Promise<Order | null> {
  if (!hasDb()) return mem.setOrderStatus(id, status) ?? null;
  const p = await db();
  try {
    const row = await p.order.update({ where: { id }, data: { status } });
    return rowToOrder(row);
  } catch {
    return null;
  }
}

/* ─────────────────────────── Arizalar ─────────────────────────── */

export async function addLead(
  l: Omit<Lead, "id" | "createdAt" | "status">,
): Promise<Lead> {
  if (!hasDb()) return mem.addLead(l);
  const p = await db();
  const row = await p.lead.create({
    data: {
      name: l.name,
      phone: l.phone,
      note: l.note,
      source: l.source,
      meta: l.meta ?? undefined,
    },
  });
  return rowToLead(row);
}

export async function listLeads(): Promise<Lead[]> {
  if (!hasDb()) return mem.listLeads();
  const p = await db();
  const rows = await p.lead.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map(rowToLead);
}
