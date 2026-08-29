import { cn } from "@/lib/utils";

export function Logo({
  tone = "dark",
  className,
}: {
  /** dark = to'q fon ustida (oq matn) */
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-display inline-flex items-baseline gap-[1px] text-[21px] leading-none font-extrabold tracking-[-0.06em] md:text-[23px]",
        tone === "dark" ? "text-white" : "text-graphite",
        className,
      )}
    >
      <span className="relative">
        EUR
        <span
          aria-hidden
          className="absolute -top-[3px] -right-[3px] size-[5px] rounded-full bg-brand-400"
        />
      </span>
      <span className="text-brand-400">O</span>
      <span>GAR</span>
    </span>
  );
}
