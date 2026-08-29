import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[11.5px] font-bold tracking-[0.22em] uppercase",
        tone === "dark" ? "text-brand-400" : "text-brand-600",
        className,
      )}
    >
      <span
        className={cn(
          "h-px w-7",
          tone === "dark" ? "bg-brand-400/60" : "bg-brand-500/50",
        )}
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "light",
  align = "left",
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center",
        className,
      )}
    >
      <div
        className={cn(
          "max-w-2xl",
          align === "center" && "mx-auto text-center",
        )}
      >
        {eyebrow && (
          <Reveal dir="up">
            <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <Reveal dir="up" delay={0.06}>
          <h2
            className={cn(
              "font-display mt-4 text-[clamp(1.75rem,4.2vw,3.1rem)] leading-[1.05] font-extrabold text-balance-tight",
              tone === "dark" ? "text-white" : "text-graphite",
            )}
          >
            {title}
          </h2>
        </Reveal>
        {subtitle && (
          <Reveal dir="up" delay={0.12}>
            <p
              className={cn(
                "mt-4 text-[15px] leading-relaxed md:text-[16.5px]",
                tone === "dark" ? "text-white/55" : "text-muted",
              )}
            >
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>
      {action && (
        <Reveal dir="up" delay={0.16} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  );
}

export function Section({
  children,
  className,
  tone = "light",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark" | "bone";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-18 md:py-26 lg:py-32",
        tone === "dark" && "dark-section bg-ink-900 text-white",
        tone === "bone" && "bg-bone-200",
        tone === "light" && "bg-bone-100",
        className,
      )}
    >
      {children}
    </section>
  );
}
