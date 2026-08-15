"use client";

import { forwardRef, useId } from "react";
import type {
  ComponentPropsWithoutRef,
  ReactNode,
  SelectHTMLAttributes,
} from "react";
import { AlertCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────
   Umumiy o'ram: label + xato matni
   tone="dark"  → to'q fon ustida
   ──────────────────────────────────────────── */

type Tone = "light" | "dark";

function Wrap({
  id,
  label,
  error,
  hint,
  tone = "light",
  className,
  children,
}: {
  id: string;
  label?: string;
  error?: string;
  hint?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "mb-2 block text-[13px] font-semibold tracking-wide",
            tone === "dark" ? "text-white/70" : "text-muted",
          )}
        >
          {label}
        </label>
      )}
      {children}
      {error ? (
        <p className="mt-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-red-500">
          <AlertCircle className="size-3.5 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p
          className={cn(
            "mt-1.5 text-[12.5px]",
            tone === "dark" ? "text-white/60" : "text-muted",
          )}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const control = (tone: Tone, invalid?: boolean) =>
  cn(
    "w-full rounded-2xl px-4 text-[15px] outline-none transition-all duration-250",
    "placeholder:text-current/35",
    tone === "dark"
      ? "bg-white/[0.055] text-white border border-white/12 focus:border-brand-400/70 focus:bg-white/[0.09] focus:shadow-[0_0_0_4px_rgba(41,171,226,.13)]"
      : "bg-white text-graphite border border-bone-300 focus:border-brand-400 focus:shadow-[0_0_0_4px_rgba(41,171,226,.16)]",
    invalid &&
      "border-red-400/80 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,.14)]",
  );

/* ──────────────── Input ──────────────── */

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: string;
  hint?: string;
  tone?: Tone;
  wrapClassName?: string;
  addon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, tone = "light", wrapClassName, addon, className, ...props },
  ref,
) {
  const auto = useId();
  const id = props.id ?? auto;
  return (
    <Wrap
      id={id}
      label={label}
      error={error}
      hint={hint}
      tone={tone}
      className={wrapClassName}
    >
      <div className="relative">
        <input
          ref={ref}
          id={id}
          aria-invalid={!!error}
          className={cn(control(tone, !!error), "h-13 py-3.5", addon && "pr-16", className)}
          {...props}
        />
        {addon && (
          <span
            className={cn(
              "pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[13px] font-semibold",
              tone === "dark" ? "text-white/60" : "text-muted",
            )}
          >
            {addon}
          </span>
        )}
      </div>
    </Wrap>
  );
});

/* ──────────────── Textarea ──────────────── */

export interface TextareaProps extends ComponentPropsWithoutRef<"textarea"> {
  label?: string;
  error?: string;
  hint?: string;
  tone?: Tone;
  wrapClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, error, hint, tone = "light", wrapClassName, className, ...props },
    ref,
  ) {
    const auto = useId();
    const id = props.id ?? auto;
    return (
      <Wrap
        id={id}
        label={label}
        error={error}
        hint={hint}
        tone={tone}
        className={wrapClassName}
      >
        <textarea
          ref={ref}
          id={id}
          rows={4}
          aria-invalid={!!error}
          className={cn(control(tone, !!error), "resize-none py-3.5", className)}
          {...props}
        />
      </Wrap>
    );
  },
);

/* ──────────────── Select ──────────────── */

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  tone?: Tone;
  wrapClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { label, error, hint, tone = "light", wrapClassName, className, children, ...props },
    ref,
  ) {
    const auto = useId();
    const id = props.id ?? auto;
    return (
      <Wrap
        id={id}
        label={label}
        error={error}
        hint={hint}
        tone={tone}
        className={wrapClassName}
      >
        <div className="relative">
          <select
            ref={ref}
            id={id}
            aria-invalid={!!error}
            className={cn(
              control(tone, !!error),
              "h-13 appearance-none py-3.5 pr-11",
              tone === "dark" && "[&>option]:bg-ink-800 [&>option]:text-white",
              className,
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown
            className={cn(
              "pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2",
              tone === "dark" ? "text-white/65" : "text-muted",
            )}
          />
        </div>
      </Wrap>
    );
  },
);

/* ──────────────── Telefon maydoni ──────────────── */

export const PhoneInput = forwardRef<HTMLInputElement, InputProps>(
  function PhoneInput({ className, ...props }, ref) {
    return (
      <Input
        ref={ref}
        inputMode="tel"
        autoComplete="tel"
        placeholder="90 123 45 67"
        className={cn("pl-[4.75rem] font-medium tracking-wide", className)}
        {...props}
      />
    );
  },
);

/** PhoneInput bilan birga ishlatiladigan +998 prefiksi */
export function PhonePrefix({ tone = "light" }: { tone?: Tone }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute bottom-0 left-4 flex h-13 items-center text-[15px] font-semibold",
        tone === "dark" ? "text-white/55" : "text-muted",
      )}
    >
      +998
    </span>
  );
}
