"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, PhonePrefix } from "@/components/ui/field";
import { useLeadMutation, type LeadPayload } from "@/lib/api";
import { cn, formatPhone, isValidPhone, phoneDigits } from "@/lib/utils";

export function LeadForm({
  source,
  tone = "dark",
  meta,
  layout = "row",
  submitLabel,
  className,
}: {
  source: LeadPayload["source"];
  tone?: "dark" | "light";
  meta?: Record<string, string | number>;
  layout?: "row" | "stack";
  submitLabel?: string;
  className?: string;
}) {
  const t = useTranslations("ctaBand");
  const tc = useTranslations("common");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const mutation = useLeadMutation();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = tc("required");
    if (!isValidPhone(phone)) next.phone = tc("invalidPhone");
    setErrors(next);
    if (Object.keys(next).length) return;

    mutation.mutate({
      name: name.trim(),
      phone: `+998${phoneDigits(phone)}`,
      source,
      meta,
    });
  };

  if (mutation.isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "flex items-center gap-4 rounded-3xl p-5",
          tone === "dark" ? "glass-dark" : "border border-bone-300 bg-white",
          className,
        )}
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 380, damping: 18 }}
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"
        >
          <Check className="size-6" strokeWidth={3} />
        </motion.span>
        <div>
          <p
            className={cn(
              "font-display text-[16px] font-extrabold",
              tone === "dark" ? "text-white" : "text-graphite",
            )}
          >
            {t("success")}
          </p>
          <p
            className={cn(
              "mt-1 text-[13.5px]",
              tone === "dark" ? "text-white/50" : "text-muted",
            )}
          >
            {t("successNote")}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className={cn(
        "flex gap-3",
        layout === "row" ? "flex-col sm:flex-row sm:items-start" : "flex-col",
        className,
      )}
    >
      <Input
        tone={tone}
        placeholder={t("name")}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (errors.name) setErrors((s) => ({ ...s, name: undefined }));
        }}
        error={errors.name}
        autoComplete="name"
        wrapClassName={layout === "row" ? "sm:flex-1" : undefined}
      />

      <div className={cn("relative", layout === "row" && "sm:flex-1")}>
        <Input
          tone={tone}
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
        <PhonePrefix tone={tone} />
      </div>

      <Button
        type="submit"
        variant="primary"
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
        className={cn("shrink-0", layout === "stack" && "w-full")}
      >
        {mutation.isPending ? tc("sending") : (submitLabel ?? t("submit"))}
      </Button>

      <AnimatePresence>
        {mutation.isError && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[13px] font-semibold text-red-400"
          >
            {tc("required")}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
