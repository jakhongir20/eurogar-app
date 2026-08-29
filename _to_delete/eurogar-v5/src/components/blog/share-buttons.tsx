"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Link2, Send } from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2H8.4v3h2.4V21h3.2v-9.5h2.5l.4-3H14Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** TZ 2.9: ijtimoiy tarmoqqa ulashish tugmalari (Telegram, Facebook) */
export function ShareButtons({ title }: { title: string }) {
  const tb = useTranslations("blog");
  const tc = useTranslations("common");
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";

  const share = (kind: "tg" | "fb") => {
    const u = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    const target =
      kind === "tg"
        ? `https://t.me/share/url?url=${u}&text=${text}`
        : `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    window.open(target, "_blank", "noopener,width=600,height=520");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard yopiq bo'lsa jim o'tamiz */
    }
  };

  const btn =
    "flex items-center gap-2 rounded-full border border-bone-300 bg-white px-4 py-2.5 text-[13px] font-semibold text-graphite transition-all hover:-translate-y-0.5 hover:border-graphite/25 active:scale-95";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[13px] font-bold text-muted">{tb("share")}:</span>
      <button onClick={() => share("tg")} className={btn} data-url={url ? "" : undefined}>
        <Send className="size-4 text-brand-600" strokeWidth={2.2} />
        Telegram
      </button>
      <button onClick={() => share("fb")} className={btn}>
        <FacebookIcon className="size-4 text-brand-600" />
        Facebook
      </button>
      <button onClick={copy} className={btn}>
        {copied ? (
          <Check className="size-4 text-emerald-600" strokeWidth={2.6} />
        ) : (
          <Link2 className="size-4 text-brand-600" strokeWidth={2.2} />
        )}
        {copied ? tc("copied") : "URL"}
      </button>
    </div>
  );
}
