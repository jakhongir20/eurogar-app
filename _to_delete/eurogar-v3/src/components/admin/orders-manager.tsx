"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Phone, ShoppingCart, Send, MessageSquare } from "lucide-react";
import type { Order, OrderStatus } from "@/lib/types";
import type { Lead } from "@/lib/store";
import { cn, formatPrice, t } from "@/lib/utils";
import { AdminShell } from "./shell";
import { STATUS_LABEL, STATUS_ORDER, STATUS_STYLES } from "./order-status";

const dt = (iso: string) =>
  new Date(iso).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

export function OrdersManager({ mode }: { mode: "orders" | "leads" }) {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery<{ orders: Order[]; leads: Lead[] }>({
    queryKey: ["admin", "orders"],
    queryFn: () => fetch("/api/admin/orders").then((r) => r.json()),
    refetchInterval: 15_000,
  });

  const setStatus = useMutation({
    mutationFn: (v: { id: string; status: OrderStatus }) =>
      fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "orders"] }),
  });

  const orders = data?.orders ?? [];
  const leads = data?.leads ?? [];

  if (isLoading) {
    return (
      <AdminShell title={mode === "orders" ? "Buyurtmalar" : "Arizalar"}>
        <div className="flex justify-center py-20">
          <Loader2 className="size-7 animate-spin text-muted" />
        </div>
      </AdminShell>
    );
  }

  /* ── arizalar ── */
  if (mode === "leads") {
    return (
      <AdminShell title="Arizalar">
        {leads.length === 0 ? (
          <Empty
            Icon={Send}
            text="Hozircha ariza yo'q. Kalkulyator, aloqa formasi yoki bosh sahifadagi «qo'ng'iroq so'rovi» shu yerga tushadi."
          />
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {leads.map((l) => (
              <div
                key={l.id}
                className="rounded-2xl border border-bone-300 bg-white p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-display text-[16px] font-extrabold text-graphite">
                      {l.name}
                    </div>
                    <a
                      href={`tel:${l.phone}`}
                      className="mt-1 flex items-center gap-1.5 text-[14px] font-semibold text-brand-600 hover:text-brand-700"
                    >
                      <Phone className="size-3.5" strokeWidth={2.4} />
                      {l.phone}
                    </a>
                  </div>
                  <span className="shrink-0 rounded-full bg-bone-200 px-2.5 py-1 text-[11px] font-bold text-muted">
                    {l.source}
                  </span>
                </div>

                {l.note && (
                  <p className="mt-3 flex gap-2 rounded-xl bg-bone-100 p-3 text-[13px] leading-relaxed text-muted">
                    <MessageSquare className="mt-0.5 size-3.5 shrink-0" strokeWidth={2.2} />
                    {l.note}
                  </p>
                )}

                {l.meta && (
                  <dl className="mt-3 space-y-1.5 border-t border-bone-300 pt-3 text-[12.5px]">
                    {Object.entries(l.meta).map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-3">
                        <dt className="text-muted">{k}</dt>
                        <dd className="text-right font-semibold text-graphite">
                          {String(v)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                <div className="mt-3 text-[12px] text-muted">
                  {dt(l.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminShell>
    );
  }

  /* ── buyurtmalar ── */
  return (
    <AdminShell title="Buyurtmalar">
      {orders.length === 0 ? (
        <Empty
          Icon={ShoppingCart}
          text="Hozircha buyurtma yo'q. Saytdan mahsulotni savatga qo'shib, test buyurtma bering — shu yerda paydo bo'ladi va Telegram botga ketadi."
        />
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div
              key={o.id}
              className="overflow-hidden rounded-2xl border border-bone-300 bg-white"
            >
              <div className="flex flex-wrap items-center gap-3 border-b border-bone-300 bg-bone-100 px-4 py-3">
                <span className="font-display text-[15px] font-extrabold text-graphite">
                  {o.code}
                </span>
                <span className="text-[12.5px] text-muted">
                  {dt(o.createdAt)}
                </span>
                <span className="ml-auto font-display text-[16px] font-extrabold text-graphite">
                  {formatPrice(o.total, "uz")}
                </span>
              </div>

              <div className="grid gap-4 p-4 md:grid-cols-[1fr_20rem]">
                <div>
                  <ul className="space-y-2">
                    {o.items.map((i, n) => (
                      <li
                        key={n}
                        className="flex items-baseline justify-between gap-3 text-[13.5px]"
                      >
                        <span className="text-graphite">
                          <span className="font-bold">{i.qty}×</span>{" "}
                          {t(i.name, "uz")}
                        </span>
                        <span className="shrink-0 font-semibold text-muted tabular-nums">
                          {formatPrice(i.price * i.qty, "uz")}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {o.note && (
                    <p className="mt-3 rounded-xl bg-bone-100 p-3 text-[13px] leading-relaxed text-muted">
                      {o.note}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="rounded-xl border border-bone-300 p-3">
                    <div className="text-[15px] font-bold text-graphite">
                      {o.name}
                    </div>
                    <a
                      href={`tel:${o.phone}`}
                      className="mt-1 flex items-center gap-1.5 text-[14px] font-semibold text-brand-600 hover:text-brand-700"
                    >
                      <Phone className="size-3.5" strokeWidth={2.4} />
                      {o.phone}
                    </a>
                  </div>

                  <div>
                    <div className="mb-2 text-[11.5px] font-bold tracking-[0.1em] text-muted uppercase">
                      Holati
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {STATUS_ORDER.map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatus.mutate({ id: o.id, status: s })}
                          className={cn(
                            "rounded-full px-3 py-1.5 text-[12px] font-bold transition-all active:scale-95",
                            o.status === s
                              ? STATUS_STYLES[s]
                              : "border border-bone-300 text-muted hover:text-graphite",
                          )}
                        >
                          {STATUS_LABEL[s]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}

function Empty({
  Icon,
  text,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-bone-400 bg-white/60 px-6 py-20 text-center">
      <Icon className="size-10 text-bone-500" strokeWidth={1.6} />
      <p className="mt-4 max-w-md text-[14px] leading-relaxed text-muted">
        {text}
      </p>
    </div>
  );
}
