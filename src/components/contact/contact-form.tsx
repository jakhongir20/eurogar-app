"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Check, Send } from "lucide-react";
import { useLeadMutation } from "@/lib/api";
import { regionKeys } from "@/lib/site";
import {
  formatPhone,
  isValidPhone,
  phoneDigits,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useHoneypot } from "@/components/ui/honeypot";
import { HONEYPOT_FIELD } from "@/lib/honeypot";
import { Input, PhoneInput, Select, Textarea } from "@/components/ui/field";

export function ContactForm() {
  const tcon = useTranslations("contact");
  const tc = useTranslations("common");
  const tcta = useTranslations("ctaBand");
  const treg = useTranslations("regions");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const mutation = useLeadMutation();
  const hp = useHoneypot();

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
      note: message.trim(),
      source: "contact",
      meta: region ? { Viloyat: treg(region) } : undefined,
      [HONEYPOT_FIELD]: hp.value,
    });
  };

  if (mutation.isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center rounded-[2rem] border border-bone-300 bg-white px-6 py-14 text-center"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.12, type: "spring", stiffness: 340, damping: 17 }}
          className="flex size-16 items-center justify-center rounded-full bg-emerald-500 text-white"
        >
          <Check className="size-8" strokeWidth={3} />
        </motion.span>
        <p className="font-display mt-5 text-[19px] font-extrabold text-graphite">
          {tcta("success")}
        </p>
        <p className="mt-2 text-[14px] text-muted">{tcta("successNote")}</p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-[2rem] border border-bone-300 bg-white p-6 md:p-8"
    >
      {hp.field}
      <h2 className="font-display text-[19px] font-extrabold text-graphite">
        {tcon("formTitle")}
      </h2>

      <div className="mt-6 space-y-4">
        <Input
          label={tcta("name")}
          value={name}
          autoComplete="name"
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((s) => ({ ...s, name: undefined }));
          }}
          error={errors.name}
        />

        <PhoneInput
          label={tcta("phone")}
          value={formatPhone(phone).replace("+998 ", "")}
          onChange={(e) => {
            setPhone(e.target.value);
            if (errors.phone) setErrors((s) => ({ ...s, phone: undefined }));
          }}
          error={errors.phone}
        />

        <Select
          label={tcon("region")}
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="">{tcon("chooseRegion")}</option>
          {regionKeys.map((k) => (
            <option key={k} value={k}>
              {treg(k)}
            </option>
          ))}
        </Select>

        <Textarea
          label={tcon("message")}
          placeholder={tcon("messagePlaceholder")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
        className="mt-6 w-full"
      >
        {mutation.isPending ? tc("sending") : tc("send")}
      </Button>
    </form>
  );
}
