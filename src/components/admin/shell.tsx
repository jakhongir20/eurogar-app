"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Send,
  ShoppingCart,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";

const NAV = [
  { href: "/admin", label: "Boshqaruv paneli", Icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Mahsulotlar", Icon: Package },
  { href: "/admin/orders", label: "Buyurtmalar", Icon: ShoppingCart },
  { href: "/admin/leads", label: "Arizalar", Icon: Send },
];

export function AdminShell({
  children,
  title,
  action,
}: {
  children: ReactNode;
  title: string;
  action?: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  };

  const links = (
    <nav className="space-y-1">
      {NAV.map(({ href, label, Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3.5 py-3 text-[14px] font-semibold transition-all duration-300",
              active
                ? "bg-brand-400 text-ink-950 shadow-[0_8px_22px_-12px_rgba(41,171,226,.9)]"
                : "text-white/55 hover:bg-white/8 hover:text-white",
            )}
          >
            <Icon className="size-[18px] shrink-0" strokeWidth={2.2} />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-dvh">
      {/* ── sidebar (desktop) ── */}
      <aside className="dark-section sticky top-0 hidden h-dvh w-64 shrink-0 flex-col bg-ink-950 p-4 lg:flex">
        <Link href="/admin" className="px-2 py-3">
          <Logo tone="dark" />
          <div className="mt-1 text-[10.5px] font-bold tracking-[0.22em] text-brand-400 uppercase">
            Admin panel
          </div>
        </Link>

        <div className="mt-6 flex-1">{links}</div>

        <div className="space-y-1 border-t border-white/8 pt-3">
          <a
            href="/uz"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-[14px] font-semibold text-white/60 transition-colors hover:bg-white/8 hover:text-white"
          >
            <ExternalLink className="size-[18px]" strokeWidth={2.2} />
            Saytni ochish
          </a>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-[14px] font-semibold text-white/60 transition-colors hover:bg-red-500/15 hover:text-red-400"
          >
            <LogOut className="size-[18px]" strokeWidth={2.2} />
            Chiqish
          </button>
        </div>
      </aside>

      {/* ── mobil sidebar ── */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
            aria-label="close"
          />
          <aside className="dark-section absolute top-0 left-0 flex h-full w-72 flex-col bg-ink-950 p-4">
            <div className="flex items-center justify-between px-2 py-3">
              <Logo tone="dark" />
              <button
                onClick={() => setOpen(false)}
                className="flex size-10 items-center justify-center rounded-full text-white hover:bg-white/10"
              >
                <X className="size-5" strokeWidth={2.3} />
              </button>
            </div>
            <div className="mt-4 flex-1">{links}</div>
            <button
              onClick={logout}
              className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-[14px] font-semibold text-white/60 hover:text-red-400"
            >
              <LogOut className="size-[18px]" strokeWidth={2.2} />
              Chiqish
            </button>
          </aside>
        </div>
      )}

      {/* ── kontent ── */}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 border-b border-bone-300 bg-bone-100/85 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 md:px-6">
            <button
              onClick={() => setOpen(true)}
              className="flex size-10 items-center justify-center rounded-full text-graphite hover:bg-bone-300 lg:hidden"
              aria-label="menu"
            >
              <Menu className="size-5" strokeWidth={2.3} />
            </button>
            <h1 className="font-display truncate text-[17px] font-extrabold text-graphite md:text-[19px]">
              {title}
            </h1>
            <div className="ml-auto flex items-center gap-2">{action}</div>
          </div>
        </header>

        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
