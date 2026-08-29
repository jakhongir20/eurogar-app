import { cn } from "@/lib/utils";

/**
 * EUROGAR lockup — belgi + so'z-belgi.
 *
 * So'z-belgidagi ikki tonlilik (yuqori yarmi siyan, pastki yarmi navy)
 * qattiq to'xtashli gradient orqali beriladi — asl logotipdagidek.
 *
 * tone="light" → to'q fon uchun (oq/siyan)
 * tone="dark"  → och fon uchun (siyan/navy)
 */
export function Logo({
  tone = "dark",
  className,
  withMark = true,
}: {
  tone?: "dark" | "light";
  className?: string;
  /** belgi (garaj ikonkasi) ko'rsatilsinmi */
  withMark?: boolean;
}) {
  const onLight = tone === "dark";

  const wordmark = onLight
    ? "linear-gradient(180deg, var(--color-brand-400) 0 48%, var(--color-navy-800) 48% 100%)"
    : "linear-gradient(180deg, var(--color-brand-300) 0 48%, #ffffff 48% 100%)";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {withMark && (
        <Mark
          className="h-8 w-auto shrink-0 md:h-9"
          cyan={onLight ? "var(--color-brand-400)" : "var(--color-brand-300)"}
          navy={onLight ? "var(--color-navy-800)" : "#ffffff"}
        />
      )}
      <span
        className="font-display text-[20px] leading-none font-extrabold tracking-[-0.045em] md:text-[22px]"
        style={{
          backgroundImage: wordmark,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        EUROGAR
      </span>
    </span>
  );
}

function Mark({
  className,
  cyan,
  navy,
}: {
  className?: string;
  cyan: string;
  navy: string;
}) {
  return (
    <svg viewBox="0 0 128 104" fill="none" className={className} aria-hidden>
      <rect
        x="2.4"
        y="2.4"
        width="123.2"
        height="99.2"
        rx="30"
        stroke={navy}
        strokeWidth="3.2"
      />
      <path
        d="M18 47 L64 18 L110 47"
        stroke={cyan}
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24.5 43.5 V80" stroke={cyan} strokeWidth="7.5" strokeLinecap="round" />
      <path d="M103.5 43.5 V80" stroke={cyan} strokeWidth="7.5" strokeLinecap="round" />
      <g fill={navy}>
        <rect x="39" y="43" width="50" height="6.4" rx="1" />
        <rect x="39.5" y="51.5" width="4" height="9" rx="1" />
        <rect x="84.5" y="51.5" width="4" height="9" rx="1" />
        <rect x="45" y="52.5" width="38" height="4.1" rx="0.8" />
        <rect x="45" y="58.6" width="38" height="4.1" rx="0.8" />
        <rect x="45" y="64.7" width="38" height="4.1" rx="0.8" />
        <rect x="45" y="70.8" width="38" height="4.1" rx="0.8" />
      </g>
      <g stroke={navy} strokeWidth="1.7" strokeLinecap="round" fill="none">
        <rect
          x="57.4"
          y="80.4"
          width="7.4"
          height="11.4"
          rx="2.2"
          transform="rotate(-28 61 86)"
        />
        <path d="M66.6 80.4 a4.2 4.2 0 0 1 1.1 4.2" />
        <path d="M69.4 77.6 a7.6 7.6 0 0 1 1.9 7.6" />
      </g>
      <circle cx="60.4" cy="87.4" r="1.05" fill={navy} />
    </svg>
  );
}
