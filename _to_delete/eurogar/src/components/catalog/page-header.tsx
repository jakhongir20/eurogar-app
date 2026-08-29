import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section";

export interface Crumb {
  label: string;
  href?: string;
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  crumbs = [],
  aside,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "dark-section relative -mt-17 overflow-hidden bg-ink-900 pt-17 text-white md:-mt-20 md:pt-20 lg:-mt-[7.5rem] lg:pt-[7.5rem]",
        className,
      )}
    >
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-70" />
      <div
        className="pointer-events-none absolute -top-24 right-0 size-[32rem] rounded-full opacity-[0.13] blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-brand-400), transparent 70%)",
        }}
      />

      <div className="container-x relative pt-10 pb-14 md:pt-14 md:pb-18">
        {crumbs.length > 0 && (
          <Reveal dir="up">
            <nav className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/40">
              {crumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {c.href ? (
                    <Link
                      href={c.href}
                      className="transition-colors hover:text-brand-400"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white/70">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && (
                    <ChevronRight className="size-3.5 text-white/25" />
                  )}
                </span>
              ))}
            </nav>
          </Reveal>
        )}

        <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {eyebrow && (
              <Reveal dir="up">
                <Eyebrow tone="dark">{eyebrow}</Eyebrow>
              </Reveal>
            )}
            <Reveal dir="up" delay={0.06}>
              <h1 className="font-display mt-3.5 text-[clamp(2rem,5vw,3.5rem)] leading-[1.03] font-black text-balance-tight">
                {title}
              </h1>
            </Reveal>
            {subtitle && (
              <Reveal dir="up" delay={0.12}>
                <p className="mt-4 text-[15px] leading-relaxed text-white/50 md:text-[16.5px]">
                  {subtitle}
                </p>
              </Reveal>
            )}
          </div>
          {aside && (
            <Reveal dir="up" delay={0.16} className="shrink-0">
              {aside}
            </Reveal>
          )}
        </div>
      </div>

      {/* pastki yumshoq o'tish */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-bone-100/0" />
    </header>
  );
}
