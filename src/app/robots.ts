import type { MetadataRoute } from "next";
import { isTemporaryHost } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();

  /* Vaqtinchalik manzilda (*.vercel.app) indekslashni yopamiz — domen
     olingach, NEXT_PUBLIC_SITE_URL yangilanadi va indekslash yoqiladi.
     Sabab: vaqtinchalik manzil indekslansa, keyin haqiqiy domenga
     o'tganda ikki nusxa kontent muammosi chiqadi. */
  if (isTemporaryHost(base)) {
    /* Deploy loglarida ko'rinib tursin — domen ulangach unutilmasin */
    console.warn(
      `[SEO] Sayt vaqtinchalik manzilda (${base}) — indekslash O'CHIQ. ` +
        `Domen ulangach Vercel'da NEXT_PUBLIC_SITE_URL=https://eurogar.uz ` +
        `qo'ying va qayta deploy qiling, indekslash o'zi yoqiladi.`,
    );
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/", "/*/checkout", "/*/cart"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
