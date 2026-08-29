import { useLocale, useTranslations } from "next-intl";
import { Mail, MapPin, Phone, Send, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { categories } from "@/data/categories";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/types";
import { t } from "@/lib/utils";
import { Logo } from "./logo";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

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

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.5 9.5v5l4.2-2.5-4.2-2.5Z" fill="currentColor" />
    </svg>
  );
}

const socials = [
  { href: site.telegram, label: "Telegram", Icon: Send },
  { href: site.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.youtube, label: "YouTube", Icon: YoutubeIcon },
];

export function Footer() {
  const tf = useTranslations("footer");
  const tn = useTranslations("nav");
  const tcon = useTranslations("contact");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();

  return (
    <footer className="dark-section relative overflow-hidden bg-ink-950 text-white">
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-70" />
      <div
        className="pointer-events-none absolute -top-40 left-1/4 size-[34rem] rounded-full opacity-[0.14] blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-brand-400), transparent 70%)",
        }}
      />

      <div className="container-x relative">
        {/* yuqori qism */}
        <div className="grid gap-10 py-14 md:grid-cols-2 md:py-18 lg:grid-cols-12 lg:gap-8">
          {/* brend */}
          <div className="lg:col-span-4">
            <Logo tone="dark" className="text-[26px]" />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-white/60">
              {tf("about")}
            </p>

            <div className="mt-6 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="glass-dark flex size-11 items-center justify-center rounded-full text-white/70 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-400 hover:text-ink-950"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* katalog */}
          <div className="lg:col-span-3">
            <h3 className="text-[11.5px] font-bold tracking-[0.2em] text-brand-400 uppercase">
              {tf("catalogTitle")}
            </h3>
            <ul className="mt-5 space-y-2.5">
              {categories.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/catalog/${c.slug}`}
                    className="group inline-flex text-[14px] text-white/55 transition-colors hover:text-white"
                  >
                    <span className="mr-2 w-0 overflow-hidden text-brand-400 transition-all duration-300 group-hover:w-3.5">
                      →
                    </span>
                    {t(c.name, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* kompaniya */}
          <div className="lg:col-span-2">
            <h3 className="text-[11.5px] font-bold tracking-[0.2em] text-brand-400 uppercase">
              {tf("companyTitle")}
            </h3>
            <ul className="mt-5 space-y-2.5">
              {[
                { href: "/about", label: tn("about") },
                { href: "/services", label: tn("services") },
                { href: "/warranty", label: tn("warranty") },
                { href: "/faq", label: tn("faq") },
                { href: "/blog", label: tn("blog") },
                { href: "/contact", label: tn("contact") },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-white/65 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* aloqa */}
          <div className="lg:col-span-3">
            <h3 className="text-[11.5px] font-bold tracking-[0.2em] text-brand-400 uppercase">
              {tf("contactTitle")}
            </h3>
            <ul className="mt-5 space-y-4">
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-400" strokeWidth={2.2} />
                <div className="space-y-1">
                  {site.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="block text-[14.5px] font-semibold text-white/80 transition-colors hover:text-brand-400"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-400" strokeWidth={2.2} />
                <a
                  href={`mailto:${site.email}`}
                  className="text-[14px] text-white/70 transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-400" strokeWidth={2.2} />
                <span className="text-[14px] leading-relaxed text-white/70">
                  {tcon("addressValue")}
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand-400" strokeWidth={2.2} />
                <span className="text-[14px] text-white/70">
                  {tc("workHours")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* pastki chiziq */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-[13px] text-white/55 md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {site.name}. {tf("rights")}.
          </span>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-white">
              {tf("privacy")}
            </Link>
            <span className="hidden md:inline">{site.domain}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
