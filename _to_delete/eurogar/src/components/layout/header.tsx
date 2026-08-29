"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, Phone, Search, ShoppingBag, X } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { cartCount, useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/types";
import { Logo } from "./logo";
import { SearchOverlay } from "./search-overlay";
import { MobileMenu } from "./mobile-menu";

export const NAV = [
  { key: "catalog", href: "/catalog" },
  { key: "calculator", href: "/calculator" },
  { key: "projects", href: "/#projects" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const lines = useCart((s) => s.lines);
  const openCart = useCart((s) => s.open);
  const count = cartCount(lines);

  /** Bosh sahifada header dastlab shaffof — hero to'q rangda */
  const overHero = pathname === "/";
  const solid = scrolled || !overHero;

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  const switchLocale = (next: Locale) => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  return (
    <>
      {/* ── yuqori nozik chiziq: telefon + ish vaqti ── */}
      <div
        className={cn(
          "relative z-50 hidden border-b transition-colors duration-500 lg:block",
          solid
            ? "border-bone-300 bg-bone-100 text-muted"
            : "border-white/10 bg-ink-950/40 text-white/60",
        )}
      >
        <div className="container-x flex h-10 items-center justify-between text-[12.5px]">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {tc("workHours")}
          </span>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${site.phones[0].replace(/\s/g, "")}`}
              className={cn(
                "font-semibold transition-colors",
                solid ? "hover:text-graphite" : "hover:text-white",
              )}
            >
              {site.phones[0]}
            </a>
            <a
              href={site.telegram}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "transition-colors",
                solid ? "hover:text-graphite" : "hover:text-white",
              )}
            >
              Telegram
            </a>
          </div>
        </div>
      </div>

      {/* ── asosiy header ── */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          solid
            ? "border-b border-bone-300 bg-bone-100/85 backdrop-blur-xl supports-[backdrop-filter]:bg-bone-100/72"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-x flex h-17 items-center gap-3 md:h-20">
          <Link href="/" aria-label={site.name} className="shrink-0">
            <Logo tone={solid ? "light" : "dark"} />
          </Link>

          {/* desktop nav */}
          <nav className="ml-8 hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active =
                item.href !== "/#projects" && pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "group/nav relative rounded-full px-3.5 py-2 text-[14px] font-semibold transition-colors duration-300",
                    solid
                      ? active
                        ? "text-graphite"
                        : "text-muted hover:text-graphite"
                      : active
                        ? "text-white"
                        : "text-white/65 hover:text-white",
                  )}
                >
                  {t(item.key)}
                  <span
                    className={cn(
                      "absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-brand-400 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      active ? "w-5" : "w-0 group-hover/nav:w-5",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1.5 md:gap-2">
            {/* til */}
            <div
              className={cn(
                "hidden items-center rounded-full p-0.5 text-[12.5px] font-bold sm:flex",
                solid ? "bg-bone-300/70" : "bg-white/10",
              )}
            >
              {(["uz", "ru"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => switchLocale(l)}
                  className={cn(
                    "rounded-full px-2.5 py-1.5 uppercase transition-all duration-300",
                    l === locale
                      ? solid
                        ? "bg-white text-graphite shadow-sm"
                        : "bg-white/90 text-ink-950"
                      : solid
                        ? "text-muted hover:text-graphite"
                        : "text-white/60 hover:text-white",
                  )}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* qidiruv */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label={tc("search")}
              className={cn(
                "flex size-11 items-center justify-center rounded-full transition-all duration-300 active:scale-90",
                solid
                  ? "text-graphite hover:bg-bone-300/70"
                  : "text-white hover:bg-white/10",
              )}
            >
              <Search className="size-[19px]" strokeWidth={2.2} />
            </button>

            {/* telefon (mobil) */}
            <a
              href={`tel:${site.phones[0].replace(/\s/g, "")}`}
              aria-label={tc("callUs")}
              className={cn(
                "flex size-11 items-center justify-center rounded-full transition-all duration-300 active:scale-90 lg:hidden",
                solid
                  ? "text-graphite hover:bg-bone-300/70"
                  : "text-white hover:bg-white/10",
              )}
            >
              <Phone className="size-[19px]" strokeWidth={2.2} />
            </a>

            {/* savat */}
            <button
              onClick={openCart}
              aria-label={t("cart")}
              className={cn(
                "relative flex size-11 items-center justify-center rounded-full transition-all duration-300 active:scale-90",
                solid
                  ? "text-graphite hover:bg-bone-300/70"
                  : "text-white hover:bg-white/10",
              )}
            >
              <ShoppingBag className="size-[19px]" strokeWidth={2.2} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 520, damping: 22 }}
                    className="absolute -top-0.5 -right-0.5 flex min-w-5 items-center justify-center rounded-full bg-brand-400 px-1 text-[10.5px] font-extrabold text-ink-950 tabular-nums"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* CTA (desktop) */}
            <Link
              href="/calculator"
              className="ml-1 hidden rounded-full bg-brand-400 px-5 py-3 text-[13.5px] font-bold text-ink-950 shadow-[0_8px_24px_-10px_rgba(245,181,68,.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-10px_rgba(245,181,68,.95)] active:scale-95 xl:block"
            >
              {t("calculator")}
            </Link>

            {/* burger */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label={t("menu")}
              className={cn(
                "flex size-11 items-center justify-center rounded-full transition-all duration-300 active:scale-90 lg:hidden",
                solid
                  ? "text-graphite hover:bg-bone-300/70"
                  : "text-white hover:bg-white/10",
              )}
            >
              <Menu className="size-[21px]" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export { X };
