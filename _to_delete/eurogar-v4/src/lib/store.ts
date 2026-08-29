/**
 * Vaqtinchalik xotira ombori (mock).
 * Keyinchalik bu joyni Postgres + Prisma bilan almashtiramiz —
 * API route'lar interfeysi o'zgarmaydi.
 */
import type { Order, OrderStatus } from "./types";

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
  __eurogar?: { orders: Order[]; leads: Lead[]; seq: number };
};

g.__eurogar ??= { orders: [], leads: [], seq: 1041 };
const db = g.__eurogar;

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
export type { Lead };
