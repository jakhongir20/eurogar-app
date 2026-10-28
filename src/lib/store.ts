/**
 * Vaqtinchalik xotira ombori (mock).
 * Keyinchalik bu joyni Postgres + Prisma bilan almashtiramiz —
 * API route'lar interfeysi o'zgarmaydi.
 */
import type { Order, OrderStatus, Review, ReviewStatus } from "./types";
import { DEFAULT_PHONE, type SitePhone } from "./phones";

type Lead = {
  id: string;
  name: string;
  phone: string;
  note: string;
  source: "cta" | "contact" | "calculator";
  meta?: Record<string, string | number>;
  status: OrderStatus;
  createdAt: string;
};

const g = globalThis as unknown as {
  __eurogar?: {
    orders: Order[];
    leads: Lead[];
    reviews: Review[];
    phones: SitePhone[];
    seq: number;
  };
};

g.__eurogar ??= { orders: [], leads: [], reviews: [], phones: [], seq: 1041 };
const db = g.__eurogar;
db.reviews ??= []; // eski sessiya obyekti uchun
db.phones ??= [];
if (db.phones.length === 0)
  db.phones.push({
    id: "default",
    number: DEFAULT_PHONE,
    main: true,
    branchId: null,
    hidden: false,
    sortOrder: 0,
  });

export const nextCode = (prefix: string) => `${prefix}-${++db.seq}`;

/* ---- orders ---- */
export function addOrder(o: Omit<Order, "id" | "code" | "createdAt" | "status">) {
  const order: Order = {
    ...o,
    id: crypto.randomUUID(),
    code: nextCode("EG"),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  db.orders.unshift(order);
  return order;
}

export const listOrders = () => db.orders;

export function setOrderStatus(id: string, status: OrderStatus) {
  const o = db.orders.find((x) => x.id === id);
  if (o) o.status = status;
  return o;
}

/* ---- leads ---- */
export function addLead(l: Omit<Lead, "id" | "createdAt" | "status">) {
  const lead: Lead = {
    ...l,
    id: crypto.randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  db.leads.unshift(lead);
  return lead;
}

export const listLeads = () => db.leads;

/* ---- sharhlar (TZ 2.10) ---- */
export function addReview(r: Omit<Review, "id" | "createdAt" | "status">) {
  const review: Review = {
    ...r,
    id: crypto.randomUUID(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  db.reviews.unshift(review);
  return review;
}

export const listReviews = () => db.reviews;

export function setReviewStatus(id: string, status: ReviewStatus) {
  const r = db.reviews.find((x) => x.id === id);
  if (r) r.status = status;
  return r ?? null;
}

export function deleteReview(id: string) {
  const i = db.reviews.findIndex((x) => x.id === id);
  if (i < 0) return false;
  db.reviews.splice(i, 1);
  return true;
}

/* ---- telefon raqamlar ---- */
type PhonePatch = Partial<Omit<SitePhone, "id">>;

export const listPhones = () =>
  [...db.phones].sort((a, b) => a.sortOrder - b.sortOrder);

export function addPhone(p: Omit<SitePhone, "id" | "sortOrder">) {
  if (p.main) db.phones.forEach((x) => (x.main = false));
  const phone: SitePhone = {
    ...p,
    id: crypto.randomUUID(),
    sortOrder: Math.max(-1, ...db.phones.map((x) => x.sortOrder)) + 1,
  };
  db.phones.push(phone);
  return phone;
}

export function updatePhone(id: string, patch: PhonePatch) {
  const p = db.phones.find((x) => x.id === id);
  if (!p) return null;
  if (patch.main) db.phones.forEach((x) => (x.main = false));
  Object.assign(p, patch);
  return p;
}

export function reorderPhones(ids: string[]) {
  ids.forEach((id, i) => {
    const p = db.phones.find((x) => x.id === id);
    if (p) p.sortOrder = i;
  });
}

export function deletePhone(id: string) {
  const i = db.phones.findIndex((x) => x.id === id);
  if (i < 0) return false;
  db.phones.splice(i, 1);
  return true;
}

export type { Lead };
