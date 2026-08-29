"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { KeyRound, LogIn } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";

export default function AdminLoginPage() {
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
      setError("Parol noto'g'ri");
      return;
    }
    router.replace("/admin");
    router.refresh();
  };

  return (
    <div className="dark-section relative flex min-h-dvh items-center justify-center overflow-hidden bg-ink-950 p-5 text-white">
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-70" />
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
            Admin panel
          </div>
        </div>

        <div className="mt-8">
          <Input
            tone="dark"
            type="password"
            label="Parol"
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
          {loading ? "Tekshirilmoqda…" : "Kirish"}
        </Button>

        <p className="mt-5 flex items-start gap-2 text-[12px] leading-relaxed text-white/60">
          <KeyRound className="mt-0.5 size-3.5 shrink-0" strokeWidth={2.2} />
          Demo parol: <span className="font-bold text-white">eurogar2026</span>
          {" — "}prod&apos;da .env faylidagi ADMIN_PASSWORD bilan almashtiriladi.
        </p>
      </motion.form>
    </div>
  );
}
