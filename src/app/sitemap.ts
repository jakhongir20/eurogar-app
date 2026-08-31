import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { categories } from "@/data/categories";
import { articles } from "@/data/articles";
import { listProducts } from "@/lib/repo";
import { siteUrl } from "@/lib/site-url";

/**
 * Sayt xaritasi — ikkala tilda, hreflang bilan.
 * Mahsulotlar bazadan olinadi, shuning uchun admin qo'shgan yangi mahsulot
 * keyingi qayta yaratishda xaritaga o'zi tushadi.
 */
export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const now = new Date();

  /** Bitta yo'lni ikkala til uchun yozadi va o'zaro hreflang bog'laydi */
  const forBothLocales = (
    path: string,
    priority: number,
    changeFrequency: Entry["changeFrequency"],
    lastModified: Date = now,
  ): Entry[] =>
    locales.map((l) => ({
      url: `${base}/${l}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((x) => [x, `${base}/${x}${path}`]),
        ),
      },
    }));

  const staticPages: [string, number, Entry["changeFrequency"]][] = [
    ["", 1, "weekly"],
    ["/catalog", 0.9, "weekly"],
    ["/calculator", 0.8, "monthly"],
    ["/services", 0.8, "monthly"],
    ["/about", 0.7, "monthly"],
    ["/contact", 0.7, "monthly"],
    ["/blog", 0.7, "weekly"],
    ["/faq", 0.6, "monthly"],
    ["/warranty", 0.6, "yearly"],
    ["/privacy", 0.2, "yearly"],
  ];

  const entries: Entry[] = staticPages.flatMap(([p, prio, freq]) =>
    forBothLocales(p, prio, freq),
  );

  for (const c of categories) {
    entries.push(...forBothLocales(`/catalog/${c.slug}`, 0.8, "weekly"));
  }

  const products = await listProducts();
  for (const p of products) {
    entries.push(...forBothLocales(`/product/${p.slug}`, 0.7, "weekly"));
  }

  for (const a of articles) {
    entries.push(
      ...forBothLocales(`/blog/${a.slug}`, 0.6, "monthly", new Date(a.date)),
    );
  }

  /* Savat va buyurtma sahifalari indekslanmaydi — xaritaga ham kirmaydi */
  return entries;
}
