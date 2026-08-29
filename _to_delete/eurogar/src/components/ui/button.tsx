"use client";

import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "light" | "outline" | "ghost" | "glass";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold " +
  "transition-[transform,box-shadow,color,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45 select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-400 text-ink-950 shadow-[0_10px_30px_-10px_rgba(245,181,68,.75)] hover:shadow-[0_18px_44px_-12px_rgba(245,181,68,.9)] hover:-translate-y-0.5",
  dark: "bg-ink-900 text-white hover:bg-ink-800 shadow-[0_10px_30px_-12px_rgba(11,14,19,.6)] hover:-translate-y-0.5",
  light:
    "bg-white text-graphite border border-bone-300 hover:border-graphite/25 shadow-[0_2px_10px_-4px_rgba(20,24,31,.15)] hover:-translate-y-0.5",
  outline:
    "border border-current/25 text-current hover:bg-current/[0.06] hover:-translate-y-0.5",
  ghost: "text-current hover:bg-current/[0.07]",
  glass:
    "glass-dark text-white hover:bg-white/12 hover:-translate-y-0.5 backdrop-blur-xl",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[13px]",
  md: "h-12 px-6 text-[14px]",
  lg: "h-14 px-8 text-[15px] md:h-[60px] md:px-10 md:text-base",
};

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  /** yorug'lik yugurishi effekti */
  sheen?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      iconRight,
      sheen = true,
      children,
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {sheen && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,.45),transparent)] transition-transform duration-700 ease-out group-hover/btn:translate-x-full"
          />
        )}
        {icon && <span className="relative shrink-0">{icon}</span>}
        <span className="relative">{children}</span>
        {iconRight && (
          <span className="relative shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1">
            {iconRight}
          </span>
        )}
      </button>
    );
  },
);

/** <Link> ichida ishlatiladigan ko'rinish — bir xil uslub, lekin <span> */
export function ButtonShell({
  variant = "primary",
  size = "md",
  className,
  icon,
  iconRight,
  sheen = true,
  children,
}: Omit<ButtonProps, "ref"> & { children?: ReactNode }) {
  return (
    <span className={cn(base, variants[variant], sizes[size], className)}>
      {sheen && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,.45),transparent)] transition-transform duration-700 ease-out group-hover/btn:translate-x-full"
        />
      )}
      {icon && <span className="relative shrink-0">{icon}</span>}
      <span className="relative">{children}</span>
      {iconRight && (
        <span className="relative shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1">
          {iconRight}
        </span>
      )}
    </span>
  );
}
