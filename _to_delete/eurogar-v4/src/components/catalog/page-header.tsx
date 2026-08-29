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
        "relative -mt-17 overflow-hidden border-b border-bone-300 pt-17 md:-mt-20 md:pt-20 lg:-mt-[7.5rem] lg:pt-[7.5rem]",
        className,
      )}
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, var(--color-bone-100) 60%, var(--color-bone-200) 100%)",
      }}
    >
      <div className="grid-texture-light pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute -top-24 right-0 size-[32rem] rounded-full opacity-60 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-brand-100), transparent 70%)",
        }}
      />

      <div className="container-x relative pt-10 pb-14 md:pt-14 md:pb-18">
        {crumbs.length > 0 && (
          <Reveal dir="up">
            <nav className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
              {crumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {c.href ? (
                    <Link
                      href={c.href}
                      className="transition-colors hover:text-brand-600"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-graphite">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && (
                    <ChevronRight className="size-3.5 text-bone-500" />
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
                <Eyebrow>{eyebrow}</Eyebrow>
              </Reveal>
            )}
            <Reveal dir="up" delay={0.06}>
              <h1 className="font-display mt-3.5 text-[clamp(2rem,5vw,3.5rem)] leading-[1.03] font-black text-balance-tight text-graphite">
                {title}
              </h1>
            </Reveal>
            {subtitle && (
              <Reveal dir="up" delay={0.12}>
                <p className="mt-4 text-[15px] leading-relaxed text-muted md:text-[16.5px]">
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
    </header>
  );
}
