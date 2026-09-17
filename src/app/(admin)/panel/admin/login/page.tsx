"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { LogIn } from "lucide-react";
import { ADMIN_BASE } from "@/lib/admin-auth";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/field";
import { AdminLangSwitch } from "@/components/admin/lang-switch";

export default function AdminLoginPage() {
  const t = useTranslations("login");
  const tc = useTranslations("common");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      if (res.status === 429) {
        setError(t("tooMany"));
      } else if (data?.error === "not_configured") {
        setError(data.reason === "leaked" ? t("leaked") : t("notConfigured"));
      } else {
        setError(t("wrong"));
      }
      return;
    }
    router.replace(ADMIN_BASE);
    router.refresh();
  };

  return (
    <div className="dark-section relative flex min-h-dvh items-center justify-center overflow-hidden bg-ink-950 p-5 text-white">
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-70" />
      <AdminLangSwitch tone="dark" className="absolute top-5 right-5" />
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 size-[34rem] -translate-x-1/2 rounded-full opacity-[0.15] blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-brand-400), transparent 70%)",
        }}
      />

      <motion.form
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onSubmit={submit}
        className="glass-dark relative w-full max-w-sm rounded-[2rem] p-7 md:p-8"
      >
        <div className="flex flex-col items-center text-center">
          <Logo tone="dark" className="text-[24px]" />
          <div className="mt-1.5 text-[10.5px] font-bold tracking-[0.22em] text-brand-400 uppercase">
            {tc("adminPanel")}
          </div>
        </div>

        <div className="mt-8">
          <PasswordInput
            tone="dark"
            label={t("password")}
            autoFocus
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            error={error}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          icon={
            loading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                className="block size-4 rounded-full border-2 border-ink-950/25 border-t-ink-950"
              />
            ) : (
              <LogIn className="size-[17px]" strokeWidth={2.3} />
            )
          }
          className="mt-5 w-full"
        >
          {loading ? t("checking") : t("submit")}
        </Button>
      </motion.form>
    </div>
  );
}
