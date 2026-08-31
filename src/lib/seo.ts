import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/routing";
import { siteUrl } from "./site-url";

/**
 * SEO yordamchilari — kanonik havolalar, hreflang va indekslash siyosati.
 *
 * MUHIM (vaqtinchalik manzil): domen hali olinmagan. Agar sayt *.vercel.app
 * manzilida indekslansa, keyin eurogar.uz ga o'tganda ikki nusxa kontent va
 * yo'qotilgan pozitsiyalar muammosi chiqadi. Shuning uchun vaqtinchalik
 * manzilda indekslash O'CHIQ. NEXT_PUBLIC_SITE_URL ga haqiqiy domen
 * yozilgan zahoti indekslash o'z-o'zidan yoqiladi.
 */

export function isTemporaryHost(url = siteUrl()): boolean {
  return /\.vercel\.app$|^https?:\/\/localhost|^https?:\/\/127\./.test(url);
}

/** Qidiruv tizimlari uchun indekslash ruxsati */
export const robotsPolicy = (): Metadata["robots"] =>
  isTemporaryHost()
    ? { index: false, follow: false, googleBot: { index: false, follow: false } }
    : { index: true, follow: true };

/**
 * Sahifa manzillari: kanonik + har ikkala til uchun hreflang.
 * `path` — tilsiz yo'l, masalan "/catalog" yoki "" (bosh sahifa).
 */
export function alternatesFor(locale: string, path = ""): Metadata["alternates"] {
  const clean = path && !path.startsWith("/") ? `/${path}` : path;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}${clean}`;
  /* x-default — tilni tanlamagan foydalanuvchi uchun asosiy variant */
  languages["x-default"] = `/${locales[0]}${clean}`;
  return { canonical: `/${locale}${clean}`, languages };
}

/** Sahifa metadata'sini bir joydan yig'ish */
export function pageMetadata(opts: {
  locale: string;
  path?: string;
  title: string;
  description: string;
  images?: string[];
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const { locale, path = "", title, description, images, type = "website" } = opts;
  return {
    title,
    description,
    alternates: alternatesFor(locale, path),
    robots: robotsPolicy(),
    openGraph: {
      title,
      description,
      url: `${siteUrl()}/${locale}${path}`,
      siteName: "EUROGAR",
      locale: locale === "uz" ? "uz_UZ" : "ru_RU",
      type,
      ...(images?.length ? { images } : {}),
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images?.length ? { images } : {}),
    },
  };
}

/* ──────────────────── JSON-LD (strukturaviy ma'lumotlar) ──────────────────── */

const abs = (p: string) => (p.startsWith("http") ? p : `${siteUrl()}${p}`);

export const ORG_ID = () => `${siteUrl()}/#organization`;

/**
 * Kompaniya + uchta filial. LocalBusiness qidiruv natijalarida manzil,
 * ish vaqti va telefon ko'rsatilishiga imkon beradi (Google/Yandex).
 */
export function organizationLd(l: Locale, data: {
  name: string;
  description: string;
  phones: readonly string[];
  email: string;
  socials: string[];
  branches: { id: string; city: string; lat: number; lng: number; phone: string; main?: boolean }[];
}) {
  const openingHours = {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID(),
        name: data.name,
        url: siteUrl(),
        logo: abs("/logo/eurogar-mark.svg"),
        description: data.description,
        email: data.email,
        telephone: data.phones[0],
        sameAs: data.socials,
        areaServed: { "@type": "Country", name: "Uzbekistan" },
        contactPoint: data.phones.map((p) => ({
          "@type": "ContactPoint",
          telephone: p,
          contactType: "sales",
          availableLanguage: ["uz", "ru"],
        })),
      },
      ...data.branches.map((b) => ({
        "@type": "LocalBusiness",
        "@id": `${siteUrl()}/#branch-${b.id}`,
        name: `${data.name} — ${b.city}`,
        parentOrganization: { "@id": ORG_ID() },
        url: `${siteUrl()}/${l}/contact`,
        telephone: b.phone,
        image: abs("/logo/eurogar-mark.svg"),
        address: {
          "@type": "PostalAddress",
          addressLocality: b.city,
          addressCountry: "UZ",
        },
        geo: { "@type": "GeoCoordinates", latitude: b.lat, longitude: b.lng },
        openingHoursSpecification: [openingHours],
        priceRange: "$$",
      })),
      {
        "@type": "WebSite",
        "@id": `${siteUrl()}/#website`,
        url: siteUrl(),
        name: data.name,
        inLanguage: l,
        publisher: { "@id": ORG_ID() },
      },
    ],
  };
}

/** Sahifa yo'li (non → katalog → mahsulot) */
export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.url),
    })),
  };
}

export function productLd(p: {
  name: string;
  description: string;
  image: string;
  url: string;
  price: number;
  inStock: boolean;
  sku: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: abs(p.image),
    sku: p.sku,
    brand: { "@type": "Brand", name: "EUROGAR" },
    offers: {
      "@type": "Offer",
      url: abs(p.url),
      priceCurrency: "UZS",
      price: p.price,
      availability: p.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@id": ORG_ID() },
    },
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function articleLd(a: {
  title: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    image: abs(a.image),
    datePublished: a.datePublished,
    dateModified: a.datePublished,
    mainEntityOfPage: abs(a.url),
    author: { "@id": ORG_ID() },
    publisher: { "@id": ORG_ID() },
  };
}
