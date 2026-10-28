"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Check,
  Eye,
  EyeOff,
  Info,
  Loader2,
  Phone,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import { branches } from "@/lib/site";
import { effectiveMainId, normalizePhone, type SitePhone } from "@/lib/phones";
import type { Locale } from "@/lib/types";
import { cn, formatPhone, t as tr } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AdminShell } from "./shell";

type Patch = Partial<Pick<SitePhone, "number" | "main" | "branchId" | "hidden">>;

/** API xatosi → src/messages/admin/{uz,ru}.json → "phones.errors.<kod>" */
class ApiError extends Error {}

async function call(method: string, body?: unknown) {
  const r = await fetch("/api/admin/phones", {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new ApiError(data?.error ?? "server_error");
  return data;
}

const ERROR_KEYS = [
  "bad_phone",
  "bad_branch",
  "last_visible",
  "not_migrated",
  "not_found",
  "unauthorized",
  "server_error",
] as const;

const inputCls =
  "h-11 w-full rounded-xl border border-bone-300 bg-white px-3.5 text-[14.5px] font-semibold text-graphite tabular-nums outline-none transition-all focus:border-brand-400 focus:shadow-[0_0_0_4px_rgba(41,171,226,.16)]";

const iconBtn =
  "flex size-9 shrink-0 items-center justify-center rounded-full border border-bone-300 text-muted transition-all hover:text-graphite active:scale-95 disabled:pointer-events-none disabled:opacity-35";

/** Saytdagi barcha kompaniya raqamlari — header, footer, filiallar, Aloqa */
export function PhonesManager() {
  const t = useTranslations("phones");
  const tn = useTranslations("nav");
  const qc = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const { data, isLoading, error: loadError } = useQuery<{ phones: SitePhone[] }>({
    queryKey: ["admin", "phones"],
    queryFn: () => call("GET"),
    retry: false,
  });

  const showError = (e: unknown) => {
    const code = e instanceof ApiError ? e.message : "server_error";
    setError((ERROR_KEYS as readonly string[]).includes(code) ? code : "server_error");
  };

  const done = () => {
    setError(null);
    return qc.invalidateQueries({ queryKey: ["admin", "phones"] });
  };

  const create = useMutation({
    mutationFn: (v: Patch) => call("POST", v),
    onSuccess: async () => {
      await done();
      setAdding(false);
    },
    onError: showError,
  });

  const update = useMutation({
    mutationFn: (v: Patch & { id: string }) => call("PATCH", v),
    onSuccess: done,
    onError: showError,
  });

  const reorder = useMutation({
    mutationFn: (order: string[]) => call("PATCH", { order }),
    onSuccess: done,
    onError: showError,
  });

  const remove = useMutation({
    mutationFn: (id: string) => call("DELETE", { id }),
    onSuccess: done,
    onError: showError,
  });

  const phones = data?.phones ?? [];
  const mainId = effectiveMainId(phones);
  const busy = update.isPending || reorder.isPending || remove.isPending;

  const move = (i: number, dir: -1 | 1) => {
    const ids = phones.map((p) => p.id);
    [ids[i], ids[i + dir]] = [ids[i + dir], ids[i]];
    reorder.mutate(ids);
  };

  const shownError =
    error ?? (loadError instanceof ApiError ? loadError.message : loadError ? "server_error" : null);

  return (
    <AdminShell
      title={tn("phones")}
      action={
        <Button
          size="sm"
          onClick={() => setAdding(true)}
          disabled={adding}
          icon={<Plus className="size-4" strokeWidth={2.8} />}
        >
          {t("add")}
        </Button>
      }
    >
      <div className="mb-4 flex gap-3 rounded-2xl border border-bone-300 bg-white p-4 text-[13.5px] leading-relaxed text-muted">
        <Info className="mt-0.5 size-4.5 shrink-0 text-brand-600" strokeWidth={2.2} />
        <ul className="space-y-1">
          <li>{t("whereMain")}</li>
          <li>{t("whereAll")}</li>
          <li>{t("whereBranch")}</li>
        </ul>
      </div>

      {shownError && (
        <div
          role="alert"
          className="mb-4 flex items-start gap-2.5 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-[13.5px] font-medium text-amber-800"
        >
          <AlertCircle className="mt-0.5 size-4.5 shrink-0" strokeWidth={2.2} />
          {t(`errors.${shownError}` as `errors.${(typeof ERROR_KEYS)[number]}`)}
        </div>
      )}

      {adding && (
        <PhoneRow
          key="new"
          isNew
          busy={create.isPending}
          onSave={(v) => create.mutate(v)}
          onCancel={() => {
            setAdding(false);
            setError(null);
          }}
          onError={setError}
        />
      )}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-7 animate-spin text-muted" />
        </div>
      ) : phones.length === 0 && !adding ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-bone-400 bg-white/60 px-6 py-16 text-center">
          <Phone className="size-10 text-bone-500" strokeWidth={1.6} />
          <p className="mt-4 max-w-md text-[14px] leading-relaxed text-muted">{t("empty")}</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {phones.map((p, i) => (
            <PhoneRow
              key={`${p.id}:${p.number}:${p.branchId}`}
              phone={p}
              isMain={p.id === mainId}
              busy={busy}
              canUp={i > 0}
              canDown={i < phones.length - 1}
              onUp={() => move(i, -1)}
              onDown={() => move(i, 1)}
              onSave={(v) => update.mutate({ id: p.id, ...v })}
              onDelete={() => {
                if (confirm(t("confirmDelete", { number: p.number }))) remove.mutate(p.id);
              }}
              onError={setError}
            />
          ))}
        </div>
      )}
    </AdminShell>
  );
}

function PhoneRow({
  phone,
  isNew = false,
  isMain = false,
  busy,
  canUp = false,
  canDown = false,
  onUp,
  onDown,
  onSave,
  onDelete,
  onCancel,
  onError,
}: {
  phone?: SitePhone;
  isNew?: boolean;
  isMain?: boolean;
  busy: boolean;
  canUp?: boolean;
  canDown?: boolean;
  onUp?: () => void;
  onDown?: () => void;
  onSave: (v: Patch) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  onError: (code: string | null) => void;
}) {
  const t = useTranslations("phones");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;

  const [number, setNumber] = useState(phone?.number ?? "");
  const [branchId, setBranchId] = useState(phone?.branchId ?? "");
  const [main, setMain] = useState(false);

  const dirty = isNew || number !== phone?.number || branchId !== (phone?.branchId ?? "");

  const save = () => {
    if (!normalizePhone(number)) return onError("bad_phone");
    onSave(
      isNew
        ? { number, branchId: branchId || null, main }
        : { number, branchId: branchId || null },
    );
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2.5 rounded-2xl border bg-white p-3 md:flex-nowrap md:p-3.5",
        isNew ? "mb-2.5 border-brand-400" : "border-bone-300",
        phone?.hidden && "bg-bone-100",
      )}
    >
      {!isNew && (
        <div className="flex gap-1">
          <button
            type="button"
            onClick={onUp}
            disabled={!canUp || busy}
            aria-label={t("up")}
            className={iconBtn}
          >
            <ArrowUp className="size-3.5" strokeWidth={2.4} />
          </button>
          <button
            type="button"
            onClick={onDown}
            disabled={!canDown || busy}
            aria-label={t("down")}
            className={iconBtn}
          >
            <ArrowDown className="size-3.5" strokeWidth={2.4} />
          </button>
        </div>
      )}

      <input
        value={number}
        onChange={(e) => {
          setNumber(formatPhone(e.target.value));
          onError(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && dirty) save();
        }}
        inputMode="tel"
        placeholder={t("placeholder")}
        aria-label={t("number")}
        autoFocus={isNew}
        className={cn(inputCls, "min-w-[12.5rem] flex-1 md:max-w-[15rem]", phone?.hidden && "text-muted")}
      />

      <select
        value={branchId}
        onChange={(e) => {
          setBranchId(e.target.value);
          onError(null);
        }}
        aria-label={t("branch")}
        className={cn(inputCls, "w-auto min-w-[10rem] font-medium md:w-44")}
      >
        <option value="">{t("noBranch")}</option>
        {branches.map((b) => (
          <option key={b.id} value={b.id}>
            {tr(b.city, locale)}
          </option>
        ))}
      </select>

      <div className="flex flex-1 flex-wrap items-center justify-end gap-1.5">
        {isNew ? (
          <label className="mr-auto flex cursor-pointer items-center gap-2 px-1 text-[13px] font-semibold text-muted md:mr-0">
            <input
              type="checkbox"
              checked={main}
              onChange={(e) => setMain(e.target.checked)}
              className="size-4 accent-[var(--color-brand-600)]"
            />
            {t("makeMain")}
          </label>
        ) : (
          <>
            {isMain ? (
              <span className="mr-auto flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1.5 text-[12px] font-bold text-brand-700 md:mr-0">
                <Star className="size-3.5 fill-current" strokeWidth={2} />
                {t("main")}
              </span>
            ) : (
              <button
                type="button"
                disabled={busy || phone?.hidden}
                onClick={() => onSave({ main: true })}
                className="mr-auto flex items-center gap-1.5 rounded-full border border-bone-300 px-3 py-1.5 text-[12px] font-bold text-muted transition-all hover:border-brand-400 hover:text-brand-600 active:scale-95 disabled:pointer-events-none disabled:opacity-40 md:mr-0"
              >
                <Star className="size-3.5" strokeWidth={2} />
                {t("makeMain")}
              </button>
            )}
            <button
              type="button"
              disabled={busy}
              onClick={() => onSave({ hidden: !phone?.hidden })}
              aria-label={phone?.hidden ? t("show") : t("hide")}
              title={phone?.hidden ? t("hidden") : t("visible")}
              className={iconBtn}
            >
              {phone?.hidden ? (
                <EyeOff className="size-3.5" strokeWidth={2.3} />
              ) : (
                <Eye className="size-3.5" strokeWidth={2.3} />
              )}
            </button>
          </>
        )}

        {dirty && (
          <button
            type="button"
            onClick={save}
            disabled={busy}
            className="flex h-9 items-center gap-1.5 rounded-full bg-emerald-500 px-4 text-[12.5px] font-bold text-white transition-all hover:bg-emerald-600 active:scale-95 disabled:opacity-50"
          >
            {busy ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Check className="size-3.5" strokeWidth={2.6} />
            )}
            {tc("save")}
          </button>
        )}

        {isNew ? (
          <button
            type="button"
            onClick={onCancel}
            className="h-9 rounded-full border border-bone-300 px-4 text-[12.5px] font-bold text-muted transition-all hover:text-graphite active:scale-95"
          >
            {tc("cancel")}
          </button>
        ) : (
          <button
            type="button"
            onClick={onDelete}
            disabled={busy}
            aria-label={tc("delete")}
            className={cn(iconBtn, "hover:border-red-300 hover:text-red-500")}
          >
            <Trash2 className="size-3.5" strokeWidth={2.2} />
          </button>
        )}
      </div>
    </div>
  );
}
