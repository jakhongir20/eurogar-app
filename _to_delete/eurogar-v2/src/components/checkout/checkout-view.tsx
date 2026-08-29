"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Check, PartyPopper, Send, ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cartTotal, useCart } from "@/lib/cart-store";
import { useOrderMutation } from "@/lib/api";
import type { Locale } from "@/lib/types";
import {
  cn,
  formatPhone,
  formatPrice,
  isValidPhone,
  phoneDigits,
  t as tr,
} from "@/lib/utils";
import { Button, ButtonShell } from "@/components/ui/button";
import { Input, PhonePrefix, Textarea } from "@/components/ui/field";

export function CheckoutView() {
  const locale = useLocale() as Locale;
  const tch = useTranslations("checkout");
  const tcart = useTranslations("cart");
  const tc = useTranslations("common");

  const { lines, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [code, setCode] = useState<string | null>(null);

  const mutation = useOrderMutation();
  const total = cartTotal(lines);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = tc("required");
    if (!isValidPhone(phone)) next.phone = tc("invalidPhone");
    setErrors(next);
    if (Object.keys(next).length || lines.length === 0) return;

    mutation.mutate(
      {
        name: name.trim(),
        phone: `+998${phoneDigits(phone)}`,
        note: note.trim(),
        items: lines.map((l) => ({ name: l.name, qty: l.qty, price: l.price })),
      },
      {
        onSuccess: (res) => {
          setCode(res.code);
          clear();
        },
      },
    );
  };

  /* ── muvaffaqiyat ekrani ── */
  if (code) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-xl rounded-[2rem] border border-bone-300 bg-white p-8 text-center md:p-12"
      >
        <motion.span
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 320, damping: 16 }}
          className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-500 text-white"
        >
          <PartyPopper className="size-9" strokeWidth={2.2} />
        </motion.span>

        <h2 className="font-display mt-6 text-[24px] font-extrabold text-graphite md:text-[30px]">
          {tch("successTitle")}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          {tch("successText")}
        </p>
        <div className="font-display mt-4 inline-block rounded-2xl bg-bone-200 px-5 py-3 text-[20px] font-black tracking-wide text-graphite">
          {code}
        </div>
        <p className="mt-4 text-[13.5px] text-muted">{tch("successNote")}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="group/btn">
            <ButtonShell variant="dark" size="lg" className="w-full sm:w-auto">
              {tch("backHome")}
            </ButtonShell>
          </Link>
          <Link href="/catalog" className="group/btn">
            <ButtonShell variant="light" size="lg" className="w-full sm:w-auto">
              {tcart("goCatalog")}
            </ButtonShell>
          </Link>
        </div>
      </motion.div>
    );
  }

  /* ── bo'sh savat ── */
  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center rounded-[2rem] border border-dashed border-bone-400 bg-white/60 px-6 py-16 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-bone-200">
          <ShoppingBag className="size-8 text-bone-500" strokeWidth={1.6} />
        </div>
        <p className="font-display mt-5 text-[19px] font-extrabold text-graphite">
          {tcart("empty")}
        </p>
        <p className="mt-2 text-[14px] text-muted">{tch("emptyRedirect")}</p>
        <Link href="/catalog" className="group/btn mt-6">
          <ButtonShell variant="primary" size="lg">
            {tcart("goCatalog")}
          </ButtonShell>
        </Link>
      </div>
    );
  }

  /* ── forma ── */
  return (
    <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
      <form
        onSubmit={submit}
        noValidate
        className="rounded-[2rem] border border-bone-300 bg-white p-6 md:p-8 lg:col-span-3"
      >
        <h2 className="font-display text-[20px] font-extrabold text-graphite">
          {tch("title")}
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">
          {tch("subtitle")}
        </p>

        <div className="mt-7 space-y-4">
          <Input
            label={tch("name")}
            placeholder={tch("namePlaceholder")}
            value={name}
            autoComplete="name"
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((s) => ({ ...s, name: undefined }));
            }}
            error={errors.name}
          />

          <div className="relative">
            <Input
              label={tch("phone")}
              inputMode="tel"
              autoComplete="tel"
              placeholder="90 123 45 67"
              className="pl-[4.4rem] font-medium tracking-wide"
              value={formatPhone(phone).replace("+998 ", "")}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((s) => ({ ...s, phone: undefined }));
              }}
              error={errors.phone}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[1.9rem]">
              <PhonePrefix />
            </div>
          </div>

          <Textarea
            label={tch("note")}
            placeholder={tch("notePlaceholder")}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={mutation.isPending}
          icon={
            mutation.isPending ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                className="block size-4 rounded-full border-2 border-ink-950/25 border-t-ink-950"
              />
            ) : (
              <Send className="size-[17px]" strokeWidth={2.3} />
            )
          }
          className="mt-7 w-full"
        >
          {mutation.isPending ? tc("sending") : tch("submit")}
        </Button>

        <p className="mt-4 text-center text-[12.5px] leading-relaxed text-muted">
          {tch("agree")}
        </p>
      </form>

      {/* ── buyurtma xulosasi ── */}
      <aside className="lg:col-span-2">
        <div className="rounded-[2rem] border border-bone-300 bg-bone-200/70 p-6 lg:sticky lg:top-28">
          <h3 className="font-display text-[16px] font-extrabold text-graphite">
            {tch("yourOrder")}
          </h3>

          <ul className="mt-5 space-y-3">
            {lines.map((l) => (
              <li key={l.productId} className="flex gap-3">
                <span className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-bone-300 bg-white">
                  <Image
                    src={l.image}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  <span className="absolute right-0 bottom-0 flex size-5 items-center justify-center rounded-tl-lg bg-ink-900 text-[10.5px] font-extrabold text-white">
                    {l.qty}
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-2 text-[13px] leading-snug font-bold text-graphite">
                    {tr(l.name, locale)}
                  </span>
                  <span className="mt-1 block text-[13px] font-extrabold text-brand-600">
                    {formatPrice(l.price * l.qty, locale)}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-bone-400/60 pt-4">
            <div className="flex items-baseline justify-between">
              <span className="text-[14px] font-semibold text-muted">
                {tc("total")}
              </span>
              <span className="font-display text-[22px] font-black text-graphite">
                {formatPrice(total, locale)}
              </span>
            </div>
            <p className="mt-2 flex items-start gap-1.5 text-[12.5px] leading-relaxed text-muted">
              <Check className={cn("mt-0.5 size-3.5 shrink-0 text-emerald-500")} strokeWidth={3} />
              {tcart("priceNote")}
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
