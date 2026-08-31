"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  ArrowUpRight,
  Box,
  EyeOff,
  Package,
  PackageX,
  Send,
  ShoppingCart,
  Wallet,
} from "lucide-react";
import type { Order } from "@/lib/types";
import type { Lead } from "@/lib/store";
import { cn, formatCompact, formatPrice } from "@/lib/utils";
import { ADMIN_BASE } from "@/lib/admin-auth";
import { AdminShell } from "./shell";
import { STATUS_STYLES, STATUS_LABEL } from "./order-status";

interface ProductsRes {
  stats: {
    total: number;
    visible: number;
    hidden: number;
    outOfStock: number;
    stockValue: number;
  };
}

export function AdminDashboard() {
  const productsQ = useQuery<ProductsRes>({
    queryKey: ["admin", "products"],
    queryFn: () => fetch("/api/admin/products").then((r) => r.json()),
  });

  const ordersQ = useQuery<{ orders: Order[]; leads: Lead[] }>({
    queryKey: ["admin", "orders"],
    queryFn: () => fetch("/api/admin/orders").then((r) => r.json()),
    refetchInterval: 15_000,
  });

  const s = productsQ.data?.stats;
  const orders = ordersQ.data?.orders ?? [];
  const leads = ordersQ.data?.leads ?? [];
  const revenue = orders
    .filter((o) => o.status !== "canceled")
    .reduce((a, o) => a + o.total, 0);

  const cards = [
    { label: "Mahsulotlar", value: s?.total ?? "—", Icon: Package, tone: "ink" },
    { label: "Saytda ko'rinadi", value: s?.visible ?? "—", Icon: Box, tone: "emerald" },
    { label: "Yashirilgan", value: s?.hidden ?? "—", Icon: EyeOff, tone: "muted" },
    { label: "Tugagan", value: s?.outOfStock ?? "—", Icon: PackageX, tone: "amber" },
    { label: "Buyurtmalar", value: orders.length, Icon: ShoppingCart, tone: "ink" },
    { label: "Arizalar", value: leads.length, Icon: Send, tone: "ink" },
  ] as const;

  return (
    <AdminShell title="Boshqaruv paneli">
      {/* ── asosiy raqamlar ── */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-bone-300 bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-xl",
                  c.tone === "emerald" && "bg-emerald-50 text-emerald-600",
                  c.tone === "amber" && "bg-amber-50 text-amber-600",
                  c.tone === "muted" && "bg-bone-200 text-muted",
                  c.tone === "ink" && "bg-ink-900 text-brand-400",
                )}
              >
                <c.Icon className="size-[17px]" strokeWidth={2.2} />
              </span>
            </div>
            <div className="font-display mt-3 text-[26px] leading-none font-extrabold text-graphite tabular-nums">
              {c.value}
            </div>
            <div className="mt-1.5 text-[12.5px] text-muted">{c.label}</div>
          </div>
        ))}
      </div>

      {/* ── pul ── */}
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="dark-section relative overflow-hidden rounded-2xl bg-ink-900 p-5 text-white">
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative flex items-start justify-between">
            <div>
              <div className="text-[12px] font-bold tracking-[0.16em] text-white/60 uppercase">
                Buyurtmalar summasi
              </div>
              <div className="font-display mt-2 text-[clamp(1.6rem,4vw,2.2rem)] leading-none font-black text-brand-400">
                {formatPrice(revenue, "uz")}
              </div>
              <div className="mt-2 text-[12.5px] text-white/60">
                Bekor qilinganlardan tashqari
              </div>
            </div>
            <Wallet className="size-6 text-brand-400" strokeWidth={2} />
          </div>
        </div>

        <div className="rounded-2xl border border-bone-300 bg-white p-5">
          <div className="text-[12px] font-bold tracking-[0.16em] text-muted uppercase">
            Ombordagi tovar qiymati
          </div>
          <div className="font-display mt-2 text-[clamp(1.6rem,4vw,2.2rem)] leading-none font-black text-graphite">
            {s ? formatCompact(s.stockValue, "uz") + " so'm" : "—"}
          </div>
          <div className="mt-2 text-[12.5px] text-muted">
            Narx × mavjud soni bo&apos;yicha
          </div>
        </div>
      </div>

      {/* ── oxirgi buyurtmalar ── */}
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <Panel
          title="Oxirgi buyurtmalar"
          href={`${ADMIN_BASE}/orders`}
          empty={orders.length === 0}
          emptyText="Hozircha buyurtma yo'q. Saytdan test buyurtma bering — shu yerda paydo bo'ladi."
        >
          {orders.slice(0, 5).map((o) => (
            <div
              key={o.id}
              className="flex items-center gap-3 border-t border-bone-300 px-4 py-3 first:border-0"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-display text-[13.5px] font-extrabold text-graphite">
                    {o.code}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10.5px] font-extrabold",
                      STATUS_STYLES[o.status],
                    )}
                  >
                    {STATUS_LABEL[o.status]}
                  </span>
                </div>
                <div className="mt-0.5 truncate text-[13px] text-muted">
                  {o.name} · {o.phone}
                </div>
              </div>
              <span className="shrink-0 text-[13.5px] font-extrabold text-graphite">
                {formatPrice(o.total, "uz")}
              </span>
            </div>
          ))}
        </Panel>

        <Panel
          title="Oxirgi arizalar"
          href={`${ADMIN_BASE}/leads`}
          empty={leads.length === 0}
          emptyText="Hozircha ariza yo'q. Kalkulyator yoki aloqa formasidan test yuboring."
        >
          {leads.slice(0, 5).map((l) => (
            <div
              key={l.id}
              className="flex items-center gap-3 border-t border-bone-300 px-4 py-3 first:border-0"
            >
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-bold text-graphite">
                  {l.name}
                </div>
                <div className="mt-0.5 truncate text-[13px] text-muted">
                  {l.phone}
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-bone-200 px-2.5 py-1 text-[11px] font-bold text-muted">
                {l.source}
              </span>
            </div>
          ))}
        </Panel>
      </div>
    </AdminShell>
  );
}

function Panel({
  title,
  href,
  children,
  empty,
  emptyText,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
  empty: boolean;
  emptyText: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-bone-300 bg-white">
      <div className="flex items-center justify-between px-4 py-3.5">
        <h2 className="font-display text-[15px] font-extrabold text-graphite">
          {title}
        </h2>
        <Link
          href={href}
          className="flex items-center gap-1 text-[12.5px] font-bold text-brand-600 transition-colors hover:text-brand-700"
        >
          Barchasi
          <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
        </Link>
      </div>
      {empty ? (
        <p className="border-t border-bone-300 px-4 py-8 text-center text-[13px] leading-relaxed text-muted">
          {emptyText}
        </p>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
