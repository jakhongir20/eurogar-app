"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ADMIN_LANG_COOKIE, ADMIN_LOCALES } from "@/lib/admin-locale";
import { cn } from "@/lib/utils";

/** Bir yil saqlanadi; layout serverda o'qiydi */
function saveAdminLang(locale: string) {
  document.cookie = `${ADMIN_LANG_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/** UZ | RU — saytning header'idagi almashtirgich bilan bir xil ko'rinish */
export function AdminLangSwitch({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const locale = useLocale();
  const t = useTranslations("common");
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const pick = (next: string) => {
    if (next === locale) return;
    saveAdminLang(next);
    /* Layout serverda cookie'dan tilni qayta o'qiydi; client holat
       (ochiq modal, qidiruv, kesh) saqlanib qoladi */
    startTransition(() => router.refresh());
  };

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={cn(
        "flex items-center rounded-full p-0.5 text-[12.5px] font-bold transition-opacity",
        tone === "dark" ? "bg-white/10" : "bg-bone-300/70",
        pending && "opacity-60",
        className,
      )}
    >
      {ADMIN_LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => pick(l)}
          aria-pressed={l === locale}
          className={cn(
            "rounded-full px-2.5 py-1.5 uppercase transition-all duration-300",
            l === locale
              ? tone === "dark"
                ? "bg-white text-ink-950 shadow-sm"
                : "bg-white text-graphite shadow-sm"
              : tone === "dark"
                ? "text-white/60 hover:text-white"
                : "text-muted hover:text-graphite",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
