"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import {
  Eye,
  EyeOff,
  ImagePlus,
  Loader2,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { categories } from "@/data/categories";
import type { Product } from "@/lib/types";
import { cn, formatPrice, t } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/field";
import { AdminShell } from "./shell";

type Draft = Partial<Product>;

const empty: Draft = {
  name: { uz: "", ru: "" },
  description: { uz: "", ru: "" },
  categorySlug: categories[0].slug,
  price: 0,
  stock: 0,
  unit: { uz: "dona", ru: "шт" },
  images: [],
  badges: [],
  specs: [],
  featured: false,
  hidden: false,
};

export function ProductsManager() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Draft | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const { data, isLoading } = useQuery<{ products: Product[] }>({
    queryKey: ["admin", "products"],
    queryFn: () => fetch("/api/admin/products").then((r) => r.json()),
  });

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ["admin", "products"] });

  const save = useMutation({
    mutationFn: async (draft: Draft) => {
      const isNew = !draft.id;
      const res = await fetch(
        isNew ? "/api/admin/products" : `/api/admin/products/${draft.id}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        },
      );
      if (!res.ok) throw new Error("save_failed");
      return res.json();
    },
    onSuccess: () => {
      invalidate();
      setEditing(null);
    },
  });

  const patch = useMutation({
    mutationFn: async ({ id, ...rest }: { id: string } & Partial<Product>) => {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest),
      });
      if (!res.ok) throw new Error("patch_failed");
      return res.json();
    },
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("delete_failed");
      return res.json();
    },
    onSuccess: () => {
      invalidate();
      setConfirmId(null);
    },
  });

  const rows = useMemo(() => {
    const list = data?.products ?? [];
    const s = q.trim().toLowerCase();
    if (!s) return list;
    return list.filter((p) =>
      `${p.name.uz} ${p.name.ru} ${p.slug} ${p.categorySlug}`
        .toLowerCase()
        .includes(s),
    );
  }, [data, q]);

  return (
    <AdminShell
      title="Mahsulotlar"
      action={
        <Button
          size="sm"
          onClick={() => setEditing({ ...empty })}
          icon={<Plus className="size-4" strokeWidth={2.8} />}
        >
          Qo&apos;shish
        </Button>
      }
    >
      {/* qidiruv */}
      <div className="relative mb-4">
        <Search
          className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-muted"
          strokeWidth={2.2}
        />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Mahsulot nomi yoki toifasi bo'yicha qidirish…"
          className="h-13 w-full rounded-2xl border border-bone-300 bg-white pr-4 pl-11 text-[14.5px] text-graphite outline-none transition-all focus:border-brand-400 focus:shadow-[0_0_0_4px_rgba(41,171,226,.16)]"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-7 animate-spin text-muted" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-bone-300 bg-white">
          {/* sarlavha (desktop) */}
          <div className="hidden grid-cols-[auto_1fr_10rem_9rem_7rem_auto] items-center gap-4 border-b border-bone-300 bg-bone-100 px-4 py-3 text-[11.5px] font-bold tracking-[0.1em] text-muted uppercase lg:grid">
            <span className="w-14">Rasm</span>
            <span>Nomi</span>
            <span>Toifa</span>
            <span className="text-right">Narx</span>
            <span className="text-right">Soni</span>
            <span className="w-32 text-right">Amallar</span>
          </div>

          <AnimatePresence initial={false}>
            {rows.map((p) => (
              <motion.div
                key={p.id}
                layout
                exit={{ opacity: 0, height: 0 }}
                className={cn(
                  "grid grid-cols-[auto_1fr] items-center gap-3 border-b border-bone-300 px-4 py-3 last:border-0 lg:grid-cols-[auto_1fr_10rem_9rem_7rem_auto] lg:gap-4",
                  p.hidden && "bg-bone-100/70",
                )}
              >
                <span className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-bone-300 bg-bone-200">
                  <Image
                    src={p.images[0]}
                    alt=""
                    fill
                    sizes="56px"
                    className={cn("object-cover", p.hidden && "opacity-40 grayscale")}
                  />
                </span>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    {p.featured && (
                      <Star
                        className="size-3.5 shrink-0 fill-brand-400 text-brand-400"
                        strokeWidth={2}
                      />
                    )}
                    <span className="truncate text-[14px] font-bold text-graphite">
                      {p.name.uz || "—"}
                    </span>
                  </div>
                  <div className="mt-0.5 truncate text-[12.5px] text-muted">
                    {p.slug}
                  </div>
                  {/* mobil ma'lumot */}
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] lg:hidden">
                    <span className="font-extrabold text-graphite">
                      {formatPrice(p.price, "uz")}
                    </span>
                    <span
                      className={cn(
                        "font-semibold",
                        p.stock > 0 ? "text-emerald-600" : "text-red-500",
                      )}
                    >
                      {p.stock} dona
                    </span>
                  </div>
                </div>

                <span className="hidden truncate text-[13px] text-muted lg:block">
                  {t(
                    categories.find((c) => c.slug === p.categorySlug)?.name,
                    "uz",
                  )}
                </span>

                <span className="hidden text-right text-[13.5px] font-extrabold text-graphite lg:block">
                  {formatPrice(p.price, "uz")}
                </span>

                <span
                  className={cn(
                    "hidden text-right text-[13.5px] font-bold lg:block",
                    p.stock > 0 ? "text-emerald-600" : "text-red-500",
                  )}
                >
                  {p.stock}
                </span>

                <div className="col-span-2 flex justify-end gap-1 lg:col-span-1 lg:w-32">
                  <IconBtn
                    title={p.hidden ? "Ko'rsatish" : "Yashirish"}
                    onClick={() => patch.mutate({ id: p.id, hidden: !p.hidden })}
                    active={!p.hidden}
                  >
                    {p.hidden ? (
                      <EyeOff className="size-4" strokeWidth={2.2} />
                    ) : (
                      <Eye className="size-4" strokeWidth={2.2} />
                    )}
                  </IconBtn>
                  <IconBtn
                    title="Tanlangan"
                    onClick={() =>
                      patch.mutate({ id: p.id, featured: !p.featured })
                    }
                    active={p.featured}
                  >
                    <Star
                      className={cn("size-4", p.featured && "fill-current")}
                      strokeWidth={2.2}
                    />
                  </IconBtn>
                  <IconBtn title="Tahrirlash" onClick={() => setEditing(p)}>
                    <Pencil className="size-4" strokeWidth={2.2} />
                  </IconBtn>
                  <IconBtn
                    title="O'chirish"
                    danger
                    onClick={() => setConfirmId(p.id)}
                  >
                    <Trash2 className="size-4" strokeWidth={2.2} />
                  </IconBtn>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {rows.length === 0 && (
            <p className="px-4 py-16 text-center text-[14px] text-muted">
              Hech narsa topilmadi
            </p>
          )}
        </div>
      )}

      {/* ── tahrirlash oynasi ── */}
      <AnimatePresence>
        {editing && (
          <ProductModal
            draft={editing}
            saving={save.isPending}
            onClose={() => setEditing(null)}
            onSave={(d) => save.mutate(d)}
          />
        )}
      </AnimatePresence>

      {/* ── o'chirishni tasdiqlash ── */}
      <AnimatePresence>
        {confirmId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          >
            <button
              onClick={() => setConfirmId(null)}
              className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
              aria-label="close"
            />
            <motion.div
              initial={{ scale: 0.94, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 18 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm rounded-3xl bg-white p-6 text-center"
            >
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                <Trash2 className="size-6" strokeWidth={2.2} />
              </span>
              <h3 className="font-display mt-4 text-[17px] font-extrabold text-graphite">
                Mahsulot o&apos;chirilsinmi?
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                Bu amalni bekor qilib bo&apos;lmaydi. Vaqtincha olib qo&apos;yish
                uchun &laquo;yashirish&raquo;dan foydalaning.
              </p>
              <div className="mt-6 flex gap-2">
                <Button
                  variant="light"
                  className="flex-1"
                  onClick={() => setConfirmId(null)}
                >
                  Bekor qilish
                </Button>
                <Button
                  variant="dark"
                  className="flex-1 !bg-red-500 hover:!bg-red-600"
                  disabled={remove.isPending}
                  onClick={() => remove.mutate(confirmId)}
                >
                  O&apos;chirish
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminShell>
  );
}

function IconBtn({
  children,
  onClick,
  title,
  active,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  active?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className={cn(
        "flex size-9 items-center justify-center rounded-xl transition-all duration-250 active:scale-90",
        danger
          ? "text-muted hover:bg-red-50 hover:text-red-500"
          : active
            ? "bg-bone-200 text-graphite hover:bg-bone-300"
            : "text-muted hover:bg-bone-200 hover:text-graphite",
      )}
    >
      {children}
    </button>
  );
}

/* ────────────────────────── modal ────────────────────────── */

function ProductModal({
  draft,
  onClose,
  onSave,
  saving,
}: {
  draft: Draft;
  onClose: () => void;
  onSave: (d: Draft) => void;
  saving: boolean;
}) {
  const [d, setD] = useState<Draft>(structuredClone(draft));
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Product>(key: K, value: Product[K]) =>
    setD((s) => ({ ...s, [key]: value }));

  const upload = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    setUploading(false);
    if (!res.ok) return;
    const { url } = await res.json();
    set("images", [...(d.images ?? []), url]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto p-4 py-8"
    >
      <button
        onClick={onClose}
        className="fixed inset-0 bg-ink-950/60 backdrop-blur-sm"
        aria-label="close"
      />

      <motion.div
        initial={{ scale: 0.96, y: 22, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 22, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl rounded-[1.75rem] bg-bone-100 shadow-[0_40px_100px_-30px_rgba(3,26,36,.6)]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-[1.75rem] border-b border-bone-300 bg-bone-100/90 px-6 py-4 backdrop-blur-xl">
          <h2 className="font-display text-[17px] font-extrabold text-graphite">
            {d.id ? "Mahsulotni tahrirlash" : "Yangi mahsulot"}
          </h2>
          <button
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-bone-300 hover:text-graphite"
          >
            <X className="size-5" strokeWidth={2.3} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          {/* rasmlar */}
          <div>
            <div className="mb-2 text-[13px] font-semibold text-muted">
              Rasmlar
            </div>
            <div className="flex flex-wrap gap-2.5">
              {(d.images ?? []).map((src, i) => (
                <div
                  key={src + i}
                  className="group relative size-24 overflow-hidden rounded-2xl border border-bone-300 bg-white"
                >
                  <Image src={src} alt="" fill sizes="96px" className="object-cover" />
                  <button
                    onClick={() =>
                      set(
                        "images",
                        (d.images ?? []).filter((_, j) => j !== i),
                      )
                    }
                    className="absolute inset-0 flex items-center justify-center bg-ink-950/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Trash2 className="size-5" strokeWidth={2.2} />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 rounded-full bg-brand-400 px-1.5 py-0.5 text-[9px] font-extrabold text-ink-950">
                      ASOSIY
                    </span>
                  )}
                </div>
              ))}

              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="flex size-24 flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-bone-400 text-muted transition-colors hover:border-brand-400 hover:text-brand-600"
              >
                {uploading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <>
                    <ImagePlus className="size-5" strokeWidth={2} />
                    <span className="text-[11px] font-bold">Yuklash</span>
                  </>
                )}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) upload(f);
                  e.target.value = "";
                }}
              />
            </div>
          </div>

          {/* nomlar */}
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Nomi (o'zbekcha)"
              value={d.name?.uz ?? ""}
              onChange={(e) =>
                set("name", { uz: e.target.value, ru: d.name?.ru ?? "" })
              }
            />
            <Input
              label="Nomi (ruscha)"
              value={d.name?.ru ?? ""}
              onChange={(e) =>
                set("name", { uz: d.name?.uz ?? "", ru: e.target.value })
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Textarea
              label="Tavsif (o'zbekcha)"
              rows={5}
              value={d.description?.uz ?? ""}
              onChange={(e) =>
                set("description", {
                  uz: e.target.value,
                  ru: d.description?.ru ?? "",
                })
              }
            />
            <Textarea
              label="Tavsif (ruscha)"
              rows={5}
              value={d.description?.ru ?? ""}
              onChange={(e) =>
                set("description", {
                  uz: d.description?.uz ?? "",
                  ru: e.target.value,
                })
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Select
              label="Toifa"
              value={d.categorySlug}
              onChange={(e) => set("categorySlug", e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name.uz}
                </option>
              ))}
            </Select>
            <Input
              label="Slug (havola)"
              value={d.slug ?? ""}
              placeholder="avtomatik yaratiladi"
              onChange={(e) => set("slug", e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Input
              label="Narxi (so'm)"
              type="number"
              value={d.price ?? 0}
              onChange={(e) => set("price", Number(e.target.value))}
            />
            <Input
              label="Eski narx (ixtiyoriy)"
              type="number"
              value={d.oldPrice ?? ""}
              onChange={(e) =>
                setD((s) => ({
                  ...s,
                  oldPrice: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
            />
            <Input
              label="Mavjud soni"
              type="number"
              value={d.stock ?? 0}
              onChange={(e) => set("stock", Number(e.target.value))}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="O'lchov birligi (uz)"
              value={d.unit?.uz ?? ""}
              onChange={(e) =>
                set("unit", { uz: e.target.value, ru: d.unit?.ru ?? "" })
              }
            />
            <Input
              label="O'lchov birligi (ru)"
              value={d.unit?.ru ?? ""}
              onChange={(e) =>
                set("unit", { uz: d.unit?.uz ?? "", ru: e.target.value })
              }
            />
          </div>

          {/* bayroqlar */}
          <div className="flex flex-wrap gap-3">
            <Toggle
              label="Saytda ko'rinsin"
              checked={!d.hidden}
              onChange={(v) => set("hidden", !v)}
            />
            <Toggle
              label="Tanlangan (bosh sahifada)"
              checked={!!d.featured}
              onChange={(v) => set("featured", v)}
            />
          </div>
        </div>

        <div className="sticky bottom-0 flex gap-2 rounded-b-[1.75rem] border-t border-bone-300 bg-bone-100/90 px-6 py-4 backdrop-blur-xl">
          <Button variant="light" className="flex-1" onClick={onClose}>
            Bekor qilish
          </Button>
          <Button
            className="flex-1"
            disabled={saving || !d.name?.uz?.trim()}
            onClick={() => onSave(d)}
            icon={saving ? <Loader2 className="size-4 animate-spin" /> : undefined}
          >
            {saving ? "Saqlanmoqda…" : "Saqlash"}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 rounded-2xl border border-bone-300 bg-white px-4 py-3"
    >
      <span
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300",
          checked ? "bg-emerald-500" : "bg-bone-400",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-white shadow transition-all duration-300",
            checked ? "left-[1.375rem]" : "left-0.5",
          )}
        />
      </span>
      <span className="text-[13.5px] font-semibold text-graphite">{label}</span>
    </button>
  );
}
