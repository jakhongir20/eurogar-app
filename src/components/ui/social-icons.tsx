import type { ComponentType } from "react";
import { site } from "@/lib/site";

/** Yagona ijtimoiy tarmoq ikonkalari — footer va aloqa sahifasida bir xil stil */

export function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M21.6 3.4 2.9 10.6c-1 .4-.95 1.8.05 2.1l4.7 1.5 1.8 5.6c.3.9 1.4 1.1 2 .4l2.6-2.7 4.8 3.5c.8.6 1.9.15 2.1-.8l2.5-15.2c.2-1.1-.85-2-1.85-1.6ZM8.5 13.7l9.7-6.1c.25-.15.5.2.3.4l-7.9 7.4c-.3.3-.5.7-.55 1.1l-.3 2.2c-.04.3-.46.33-.54.04l-1.1-3.7c-.13-.5.06-1.05.49-1.34Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2H8.4v3h2.4V21h3.2v-9.5h2.5l.4-3H14Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.5 9.5v5l4.2-2.5-4.2-2.5Z" fill="currentColor" />
    </svg>
  );
}

export const SOCIALS: {
  id: string;
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
}[] = [
  { id: "telegram", label: "Telegram", href: site.telegram, Icon: TelegramIcon },
  { id: "instagram", label: "Instagram", href: site.instagram, Icon: InstagramIcon },
  { id: "facebook", label: "Facebook", href: site.facebook, Icon: FacebookIcon },
  { id: "youtube", label: "YouTube", href: site.youtube, Icon: YoutubeIcon },
];
