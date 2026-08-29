"use client";

import { useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Check, Info, Minus, Plus, Send, Sparkles } from "lucide-react";
import {
  calcTypes,
  calculate,
  getCalcType,
  type CalcInput,
} from "@/data/calculator";
import { useLeadMutation } from "@/lib/api";
import type { Locale } from "@/lib/types";
import {
  cn,
  formatPrice,
  formatPhone,
  isValidPhone,
  phoneDigits,
  t as tr,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, PhonePrefix, Select } from "@/components/ui/field";

export function CalculatorView() {
  const locale = useLocale() as Locale;
  const tcalc = useTranslations("calculator");
  const tc = useTranslations("common");
  const tcta = useTranslations("ctaBand");

  const [typeId, setTypeId] = useState(calcTypes[0].id);
  const type = getCalcType(typeId)!;

  const [state, setState] = useState<Omit<CalcInput, "typeId">>({
    width: calcTypes[0].width.default,
    height: calcTypes[0].height.default,
    depth: calcTypes[0].depth?.default,
    materialId: calcTypes[0].materials[0].id,
    controlId: calcTypes[0].controls[0].id,
    qty: 1,
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const mutation = useLeadMutation();

  const pickType = (id: string) => {
    const t = getCalcType(id)!;
    setTypeId(id);
    setState({
      width: t.width.default,
      height: t.height.default,
      depth: t.depth?.default,
      materialId: t.materials[0].id,
      controlId: t.controls[0].id,
      qty: 1,
    });
  };

  /* validatsiya */
  const fieldErrors = useMemo(() => {
    const e: Record<string, string> = {};
    const check = (
      key: "width" | "height" | "depth",
      cfg?: { min: number; max: number },
    ) => {
      if (!cfg) return;
      const v = state[key];
      if (v == null || Number.isNaN(v)) e[key] = tcalc("errNumber");
      else if (v < cfg.min) e[key] = tcalc("errMin", { min: cfg.min });
      else if (v > cfg.max) e[key] = tcalc("errMax", { max: cfg.max });
    };
    check("width", type.width);
    check("height", type.height);
    check("depth", type.depth);
    return e;
  }, [state, type, tcalc]);

  const valid = Object.keys(fieldErrors).length === 0;
  const result = useMemo(
    () => (valid ? calculate({ ...state, typeId }) : null),
    [state, typeId, valid],
  );

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = tc("required");
    if (!isValidPhone(phone)) next.phone = tc("invalidPhone");
    setErrors(next);
    if (Object.keys(next).length || !result) return;

    const material = type.materials.find((m) => m.id === state.materialId);
    const control = type.controls.find((c) => c.id === state.controlId);

    mutation.mutate({
      name: name.trim(),
      phone: `+998${phoneDigits(phone)}`,
      source: "calculator",
      meta: {
        "Mahsulot turi": tr(type.label, "uz"),
        "O'lchami": `${state.width}×${state.height}${state.depth ? `×${state.depth}` : ""} mm`,
        Material: tr(material?.label, "uz"),
        Boshqaruv: tr(control?.label, "uz"),
        Soni: state.qty,
        "Taxminiy narx": formatPrice(result.total, "uz"),
      },
    });
  };

  const numField = (
    key: "width" | "height" | "depth",
    label: string,
    cfg?: { min: number; max: number },
  ) => {
    if (!cfg) return null;
    return (
      <Input
        key={key}
        label={label}
        type="number"
        inputMode="numeric"
        value={state[key] ?? ""}
        min={cfg.min}
        max={cfg.max}
        addon={tcalc("mm")}
        onChange={(e) =>
          setState((s) => ({ ...s, [key]: Number(e.target.value) }))
        }
        error={fieldErrors[key]}
        hint={!fieldErrors[key] ? `${cfg.min}–${cfg.max} ${tcalc("mm")}` : undefined}
      />
    );
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
      {/* ── chap: sozlamalar ── */}
      <div className="space-y-6 lg:col-span-3">
        {/* 1. tur */}
        <div className="rounded-[2rem] border border-bone-300 bg-white p-5 md:p-7">
          <StepTitle n={1} title={tcalc("step1")} />
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {calcTypes.map((ct) => {
              const active = ct.id === typeId;
              return (
                <button
                  key={ct.id}
                  onClick={() => pickType(ct.id)}
                  className={cn(
                    "group relative flex items-center gap-3 overflow-hidden rounded-2xl border-2 p-2.5 text-left transition-all duration-400",
                    active
                      ? "border-brand-400 bg-brand-200/25 shadow-[0_10px_26px_-14px_rgba(41,171,226,.9)]"
                      : "border-bone-300 bg-white hover:border-bone-400",
                  )}
                >
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-bone-200">
                    <Image
                      src={ct.image}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </span>
                  <span className="min-w-0 flex-1 text-[13.5px] leading-snug font-bold text-graphite">
                    {tr(ct.label, locale)}
                  </span>
                  <AnimatePresence>
                    {active && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-400 text-ink-950"
                      >
                        <Check className="size-3.5" strokeWidth={3.2} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. o'lchamlar */}
        <div className="rounded-[2rem] border border-bone-300 bg-white p-5 md:p-7">
          <StepTitle n={2} title={tcalc("step2")} />

          <motion.div
            key={typeId}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {numField("width", tcalc("width"), type.width)}
              {numField("height", tcalc("height"), type.height)}
              {numField("depth", tcalc("depth"), type.depth)}
            </div>

            <Select
              label={tcalc("material")}
              value={state.materialId}
              onChange={(e) =>
                setState((s) => ({ ...s, materialId: e.target.value }))
              }
            >
              {type.materials.map((m) => (
                <option key={m.id} value={m.id}>
                  {tr(m.label, locale)}
                </option>
              ))}
            </Select>

            {type.controls.length > 1 && (
              <Select
                label={tcalc("control")}
                value={state.controlId}
                onChange={(e) =>
                  setState((s) => ({ ...s, controlId: e.target.value }))
                }
              >
                {type.controls.map((c) => (
                  <option key={c.id} value={c.id}>
                    {tr(c.label, locale)}
                    {c.add ? ` (+${formatPrice(c.add, locale)})` : ""}
                  </option>
                ))}
              </Select>
            )}

            <div>
              <div className="mb-2 block text-[13px] font-semibold tracking-wide text-muted">
                {tcalc("quantity")}
              </div>
              <div className="flex h-13 w-fit items-center rounded-2xl border border-bone-300 bg-white px-1">
                <button
                  onClick={() =>
                    setState((s) => ({ ...s, qty: Math.max(1, s.qty - 1) }))
                  }
                  className="flex size-10 items-center justify-center rounded-xl text-muted transition-colors hover:text-graphite active:scale-90"
                  aria-label="−"
                >
                  <Minus className="size-4" strokeWidth={2.6} />
                </button>
                <span className="w-12 text-center text-[16px] font-extrabold text-graphite tabular-nums">
                  {state.qty}
                </span>
                <button
                  onClick={() =>
                    setState((s) => ({ ...s, qty: Math.min(99, s.qty + 1) }))
                  }
                  className="flex size-10 items-center justify-center rounded-xl text-muted transition-colors hover:text-graphite active:scale-90"
                  aria-label="+"
                >
                  <Plus className="size-4" strokeWidth={2.6} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── o'ng: natija ── */}
      <aside className="lg:col-span-2">
        <div className="dark-section relative overflow-hidden rounded-[2rem] bg-ink-900 p-6 text-white lg:sticky lg:top-28 md:p-7">
          <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
          <div
            className="pointer-events-none absolute -top-20 -right-16 size-72 rounded-full opacity-25 blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, var(--color-brand-400), transparent 70%)",
            }}
          />

          <div className="relative">
            <StepTitle n={3} title={tcalc("step3")} tone="dark" />

            <div className="mt-6">
              <div className="text-[12px] font-bold tracking-[0.16em] text-white/60 uppercase">
                {tcalc("estimate")}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={result?.total ?? "err"}
                  initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display mt-2 text-[clamp(1.6rem,4.5vw,2.4rem)] leading-none font-black text-brand-400"
                >
                  {result ? formatPrice(result.total, locale) : "—"}
                </motion.div>
              </AnimatePresence>
              {result && (
                <div className="mt-2 text-[13px] text-white/60">
                  {tcalc("area")}: {result.area} {type.perMeter ? "m" : "m²"}
                  {state.qty > 1 && ` × ${state.qty}`}
                </div>
              )}
            </div>

            {/* tafsilot */}
            {result && (
              <dl className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-[13.5px]">
                <Row label={tcalc("base")} value={formatPrice(result.base, locale)} />
                {result.materialExtra > 0 && (
                  <Row
                    label={tcalc("materialCost")}
                    value={`+ ${formatPrice(result.materialExtra, locale)}`}
                  />
                )}
                {result.controlCost > 0 && (
                  <Row
                    label={tcalc("controlCost")}
                    value={`+ ${formatPrice(result.controlCost, locale)}`}
                  />
                )}
                <Row
                  label={tcalc("assembly")}
                  value={`+ ${formatPrice(result.baseFee, locale)}`}
                />
                <Row
                  label={tcalc("install")}
                  value={tcalc("free")}
                  accent
                />
              </dl>
            )}

            <p className="mt-5 flex items-start gap-2 rounded-2xl bg-white/[0.055] p-3.5 text-[12.5px] leading-relaxed text-white/65">
              <Info className="mt-0.5 size-4 shrink-0 text-brand-400" strokeWidth={2.2} />
              {tcalc("disclaimer")}
            </p>

            {/* ariza */}
            <div className="mt-6 border-t border-white/10 pt-6">
              {mutation.isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check className="size-7" strokeWidth={3} />
                  </span>
                  <p className="font-display mt-4 text-[16px] font-extrabold">
                    {tcalc("requestSent")}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/65">
                    {tcalc("requestNote")}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-3">
                  <div className="flex items-center gap-2 text-[13.5px] font-bold text-white">
                    <Sparkles className="size-4 text-brand-400" strokeWidth={2.4} />
                    {tcalc("leaveRequest")}
                  </div>

                  <Input
                    tone="dark"
                    placeholder={tcta("name")}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((s) => ({ ...s, name: undefined }));
                    }}
                    error={errors.name}
                    autoComplete="name"
                  />

                  <div className="relative">
                    <Input
                      tone="dark"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="90 123 45 67"
                      className="pl-[4.4rem] font-medium tracking-wide"
                      value={formatPhone(phone).replace("+998 ", "")}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone)
                          setErrors((s) => ({ ...s, phone: undefined }));
                      }}
                      error={errors.phone}
                    />
                    <PhonePrefix tone="dark" />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={!result || mutation.isPending}
                    icon={
                      mutation.isPending ? (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 0.9,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="block size-4 rounded-full border-2 border-ink-950/25 border-t-ink-950"
                        />
                      ) : (
                        <Send className="size-[17px]" strokeWidth={2.3} />
                      )
                    }
                    className="w-full"
                  >
                    {mutation.isPending ? tc("sending") : tcalc("leaveRequest")}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function StepTitle({
  n,
  title,
  tone = "light",
}: {
  n: number;
  title: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold",
          tone === "dark" ? "bg-brand-400 text-ink-950" : "bg-ink-900 text-white",
        )}
      >
        {n}
      </span>
      <h2
        className={cn(
          "font-display text-[17px] font-extrabold",
          tone === "dark" ? "text-white" : "text-graphite",
        )}
      >
        {title}
      </h2>
    </div>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-white/60">{label}</dt>
      <dd
        className={cn(
          "font-semibold tabular-nums",
          accent ? "text-emerald-400" : "text-white/85",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
