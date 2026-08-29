"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowUpRight, Mail, MapPin, Phone, X } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/types";
import { Logo } from "./logo";
import { NAV } from "./header";

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const tcon = useTranslations("contact");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (next: Locale) => {
    if (next !== locale) router.replace(pathname, { locale: next });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="dark-section fixed inset-0 z-[70] flex flex-col bg-ink-950 lg:hidden"
    >
      {/* fon teksturasi */}
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-brand-500), transparent 70%)",
        }}
      />

      <div className="relative flex h-17 shrink-0 items-center justify-between px-5">
        <Logo tone="dark" />
        <button
          onClick={onClose}
          aria-label={t("close")}
          className="flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 active:scale-90"
        >
          <X className="size-6" strokeWidth={2.2} />
        </button>
      </div>

      <nav className="relative flex-1 overflow-y-auto px-5 pt-6 pb-8">
        <motion.ul
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
          }}
          className="space-y-1"
        >
          {NAV.map((item) => {
            const active =
              item.href !== "/#projects" && pathname.startsWith(item.href);
            return (
              <motion.li
                key={item.key}
                variants={{
                  hidden: { opacity: 0, x: -22, filter: "blur(6px)" },
                  show: {
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center justify-between border-b border-white/8 py-4",
                    active ? "text-brand-400" : "text-white",
                  )}
                >
                  <span className="font-display text-[26px] font-extrabold tracking-tight">
                    {t(item.key)}
                  </span>
                  <ArrowUpRight
                    className="size-5 text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-400"
                    strokeWidth={2.2}
                  />
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 space-y-3"
        >
          <div className="flex items-center rounded-full bg-white/8 p-1 text-[13px] font-bold">
            {(["uz", "ru"] as const).map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={cn(
                  "flex-1 rounded-full py-2.5 uppercase transition-all duration-300",
                  l === locale
                    ? "bg-brand-400 text-ink-950"
                    : "text-white/55 hover:text-white",
                )}
              >
                {l === "uz" ? "O'zbekcha" : "Русский"}
              </button>
            ))}
          </div>

          <a
            href={`tel:${site.phones[0].replace(/\s/g, "")}`}
            className="glass-dark flex items-center gap-3 rounded-2xl px-4 py-3.5 text-white"
          >
            <Phone className="size-4.5 text-brand-400" strokeWidth={2.2} />
            <div className="min-w-0">
              <div className="text-[11px] tracking-wide text-white/45 uppercase">
                {tcon("phone")}
              </div>
              <div className="text-[15px] font-bold">{site.phones[0]}</div>
            </div>
          </a>

          <a
            href={`mailto:${site.email}`}
            className="glass-dark flex items-center gap-3 rounded-2xl px-4 py-3.5 text-white"
          >
            <Mail className="size-4.5 text-brand-400" strokeWidth={2.2} />
            <div className="min-w-0">
              <div className="text-[11px] tracking-wide text-white/45 uppercase">
                {tcon("email")}
              </div>
              <div className="truncate text-[15px] font-bold">{site.email}</div>
            </div>
          </a>

          <div className="glass-dark flex items-start gap-3 rounded-2xl px-4 py-3.5 text-white">
            <MapPin className="mt-0.5 size-4.5 shrink-0 text-brand-400" strokeWidth={2.2} />
            <div>
              <div className="text-[11px] tracking-wide text-white/45 uppercase">
                {tcon("address")}
              </div>
              <div className="text-[14px] font-semibold">
                {tcon("addressValue")}
              </div>
            </div>
          </div>

          <p className="pt-2 text-center text-[12.5px] text-white/35">
            {tc("workHours")}
          </p>
        </motion.div>
      </nav>
    </motion.div>
  );
}
