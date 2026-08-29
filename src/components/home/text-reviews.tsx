"use client";

import { type FormEvent, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Check, MessageSquarePlus, Quote, Send, Star, X } from "lucide-react";
import { useReviewMutation } from "@/lib/api";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import type { Locale, Review } from "@/lib/types";
import { cn, formatPhone, isValidPhone } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, PhonePrefix, Textarea } from "@/components/ui/field";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

/**
 * TZ 2.10: yozma sharhlar — faqat admin tasdiqlaganlari ko'rinadi,
 * yangi sharh "Fikr qoldirish" formasi orqali moderatsiyaga tushadi.
 */

function Stars({ n, className }: { n: number; className?: string }) {
  return (
    <span className={cn("flex gap-0.5", className)} aria-label={`${n}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i <= n ? "fill-amber-400 text-amber-400" : "text-bone-400",
          )}
          strokeWidth={1.8}
        />
      ))}
    </span>
  );
}

export function TextReviews({ reviews }: { reviews: Review[] }) {
  const t = useTranslations("reviews");
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState(false);

  /* uz-UZ oy nomlari brauzerlarda notekis — o'zimiz yozamiz */
  const MONTHS: Record<Locale, string[]> = {
    uz: ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"],
    ru: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
  };
  const monthYear = (iso: string) => {
    const d = new Date(iso);
    return `${MONTHS[locale][d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="container-x mt-10">
      {reviews.length > 0 && (
        <RevealGroup
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5"
          stagger={0.06}
        >
          {reviews.map((r) => (
            <RevealItem key={r.id} className="h-full">
              <figure className="relative flex h-full flex-col rounded-3xl border border-bone-300 bg-white p-6">
                <Quote
                  className="absolute top-5 right-5 size-6 text-brand-200"
                  strokeWidth={1.6}
                  aria-hidden
                />
                <Stars n={r.rating} />
                <blockquote className="mt-3.5 flex-1 text-[14.5px] leading-relaxed text-graphite">
                  {r.text}
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3 border-t border-bone-300 pt-4">
                  <span className="flex size-9 items-center justify-center rounded-full bg-navy-900 text-[13px] font-extrabold text-brand-400">
                    {r.name.trim().charAt(0).toUpperCase()}
                  </span>
                  <span>
                    <span className="block text-[13.5px] font-bold text-graphite">
                      {r.name}
                    </span>
                    <span className="block text-[12px] text-muted">
                      {monthYear(r.createdAt)}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      )}

      {/* CTA */}
      <Reveal delay={0.05}>
        <div
          className={cn(
            "mt-6 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-bone-400 bg-white/70 px-6 text-center",
            reviews.length === 0 ? "py-10" : "py-8 sm:flex-row sm:justify-between sm:text-left",
          )}
        >
          <p className="max-w-xl text-[14.5px] leading-relaxed text-muted">
            {t("ctaText")}
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => setOpen(true)}
            icon={<MessageSquarePlus className="size-[17px]" strokeWidth={2.2} />}
            className="shrink-0"
          >
            {t("leaveReview")}
          </Button>
        </div>
      </Reveal>

      <AnimatePresence>
        {open && <ReviewModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────── Sharh formasi (modal) ──────────────── */

function ReviewModal({ onClose }: { onClose: () => void }) {
  const t = useTranslations("reviews");
  const tc = useTranslations("common");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; text?: string }>({});
  const mutation = useReviewMutation();

  useEffect(() => {
    lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [onClose]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = tc("required");
    if (phone.trim() && !isValidPhone(phone)) next.phone = tc("invalidPhone");
    if (text.trim().length < 10) next.text = t("textTooShort");
    setErrors(next);
    if (Object.keys(next).length) return;
    mutation.mutate({
      name: name.trim(),
      phone: phone.trim() ? formatPhone(phone) : "",
      rating,
      text: text.trim(),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[96] flex items-center justify-center overflow-y-auto p-4"
    >
      <button
        onClick={onClose}
        aria-label={tc("back")}
        className="fixed inset-0 cursor-default bg-navy-950/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative my-auto w-full max-w-lg rounded-[2rem] border border-bone-300 bg-bone-100 p-6 shadow-[0_50px_110px_-35px_rgba(4,34,47,.55)] md:p-8"
      >
        <button
          onClick={onClose}
          aria-label={tc("back")}
          className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-bone-300 hover:text-graphite active:scale-90"
        >
          <X className="size-5" strokeWidth={2.2} />
        </button>

        {mutation.isSuccess ? (
          <div className="flex flex-col items-center py-8 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="size-7" strokeWidth={3} />
            </span>
            <h3 className="font-display mt-5 text-[20px] font-extrabold text-graphite">
              {t("thanksTitle")}
            </h3>
            <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-muted">
              {t("thanksText")}
            </p>
            <Button variant="light" size="md" onClick={onClose} className="mt-6">
              {tc("back")}
            </Button>
          </div>
        ) : (
          <>
            <h3 className="font-display pr-8 text-[20px] font-extrabold text-graphite">
              {t("formTitle")}
            </h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
              {t("formText")}
            </p>

            <form onSubmit={submit} className="mt-5 space-y-3.5" noValidate>
              {/* baho */}
              <div>
                <div className="mb-1.5 text-[12.5px] font-semibold text-muted">
                  {t("ratingLabel")}
                </div>
                <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(i)}
                      onMouseEnter={() => setHover(i)}
                      aria-label={`${i}/5`}
                      className="p-0.5 transition-transform active:scale-90"
                    >
                      <Star
                        className={cn(
                          "size-7 transition-colors",
                          i <= (hover || rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-bone-400",
                        )}
                        strokeWidth={1.6}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <Input
                placeholder={t("nameLabel")}
                value={name}
                autoComplete="name"
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((s) => ({ ...s, name: undefined }));
                }}
                error={errors.name}
              />

              <div>
                <div className="relative">
                  <Input
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
                  <PhonePrefix />
                </div>
                <p className="mt-1.5 text-[12px] text-muted">{t("phoneHint")}</p>
              </div>

              <Textarea
                placeholder={t("textLabel")}
                rows={4}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (errors.text) setErrors((s) => ({ ...s, text: undefined }));
                }}
                error={errors.text}
              />

              {mutation.isError && (
                <p className="text-[13px] font-semibold text-red-500">
                  {t("errorText")}
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={mutation.isPending}
                className="w-full"
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
              >
                {t("send")}
              </Button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
