"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Loader2, Phone, Star, Trash2, X } from "lucide-react";
import type { Review, ReviewStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AdminShell } from "./shell";

const dt = (iso: string) =>
  new Date(iso).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const STATUS: Record<ReviewStatus, { label: string; cls: string }> = {
  pending: { label: "Kutilmoqda", cls: "bg-amber-100 text-amber-700" },
  approved: { label: "Saytda", cls: "bg-emerald-100 text-emerald-700" },
  rejected: { label: "Rad etilgan", cls: "bg-red-100 text-red-600" },
};

const FILTERS: { key: ReviewStatus | "all"; label: string }[] = [
  { key: "pending", label: "Kutilmoqda" },
  { key: "approved", label: "Saytda" },
  { key: "rejected", label: "Rad etilgan" },
  { key: "all", label: "Hammasi" },
];

/** TZ 2.10: sharhlar moderatsiyasi — tasdiqlangani bosh sahifada chiqadi */
export function ReviewsManager() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<ReviewStatus | "all">("pending");

  const { data, isLoading } = useQuery<{ reviews: Review[] }>({
    queryKey: ["admin", "reviews"],
    queryFn: () => fetch("/api/admin/reviews").then((r) => r.json()),
    refetchInterval: 15_000,
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin", "reviews"] });

  const setStatus = useMutation({
    mutationFn: (v: { id: string; status: ReviewStatus }) =>
      fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      }).then((r) => r.json()),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: string) =>
      fetch("/api/admin/reviews", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }).then((r) => r.json()),
    onSuccess: invalidate,
  });

  const all = data?.reviews ?? [];
  const rows = filter === "all" ? all : all.filter((r) => r.status === filter);
  const pendingCount = all.filter((r) => r.status === "pending").length;

  return (
    <AdminShell title="Sharhlar">
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-7 animate-spin text-muted" />
        </div>
      ) : (
        <>
          <div className="mb-5 flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[12.5px] font-bold transition-all active:scale-95",
                  filter === f.key
                    ? "bg-navy-900 text-white"
                    : "border border-bone-300 bg-white text-muted hover:text-graphite",
                )}
              >
                {f.label}
                {f.key === "pending" && pendingCount > 0 && (
                  <span className="ml-1.5 rounded-full bg-amber-400 px-1.5 py-0.5 text-[10.5px] text-navy-950">
                    {pendingCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {rows.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-bone-400 bg-white/60 px-6 py-20 text-center">
              <Star className="size-10 text-bone-500" strokeWidth={1.6} />
              <p className="mt-4 max-w-md text-[14px] leading-relaxed text-muted">
                {filter === "pending"
                  ? "Moderatsiya kutayotgan sharh yo'q. Saytdagi «Fikr qoldirish» formasi orqali kelganlar shu yerga tushadi."
                  : "Bu bo'limda sharh yo'q."}
              </p>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {rows.map((r) => (
                <div
                  key={r.id}
                  className="flex flex-col rounded-2xl border border-bone-300 bg-white p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-display text-[15px] font-extrabold text-graphite">
                        {r.name}
                      </div>
                      <span className="mt-1 flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className={cn(
                              "size-3.5",
                              i <= r.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-bone-400",
                            )}
                            strokeWidth={1.8}
                          />
                        ))}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold",
                        STATUS[r.status].cls,
                      )}
                    >
                      {STATUS[r.status].label}
                    </span>
                  </div>

                  <p className="mt-3 flex-1 rounded-xl bg-bone-100 p-3 text-[13.5px] leading-relaxed text-graphite">
                    {r.text}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-3 text-[12px] text-muted">
                    <span>{dt(r.createdAt)}</span>
                    {r.phone && (
                      <a
                        href={`tel:${r.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700"
                      >
                        <Phone className="size-3" strokeWidth={2.4} />
                        {r.phone}
                      </a>
                    )}
                  </div>

                  <div className="mt-3.5 flex gap-1.5 border-t border-bone-300 pt-3.5">
                    {r.status !== "approved" && (
                      <button
                        onClick={() => setStatus.mutate({ id: r.id, status: "approved" })}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-emerald-500 px-3 py-2 text-[12.5px] font-bold text-white transition-all hover:bg-emerald-600 active:scale-95"
                      >
                        <Check className="size-3.5" strokeWidth={2.6} />
                        Tasdiqlash
                      </button>
                    )}
                    {r.status !== "rejected" && (
                      <button
                        onClick={() => setStatus.mutate({ id: r.id, status: "rejected" })}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-bone-300 px-3 py-2 text-[12.5px] font-bold text-muted transition-all hover:border-red-300 hover:text-red-500 active:scale-95"
                      >
                        <X className="size-3.5" strokeWidth={2.6} />
                        Rad etish
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (confirm("Sharh butunlay o'chirilsinmi?")) remove.mutate(r.id);
                      }}
                      aria-label="O'chirish"
                      className="flex size-9 shrink-0 items-center justify-center rounded-full border border-bone-300 text-muted transition-all hover:border-red-300 hover:text-red-500 active:scale-95"
                    >
                      <Trash2 className="size-3.5" strokeWidth={2.2} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </AdminShell>
  );
}
