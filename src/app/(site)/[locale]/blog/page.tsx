import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { articles } from "@/data/articles";
import { getCategory } from "@/data/categories";
import type { Locale } from "@/lib/types";
import { cn, t } from "@/lib/utils";
import { PageHeader } from "@/components/catalog/page-header";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tb = await getTranslations({ locale, namespace: "blog" });
  return pageMetadata({
    locale,
    path: "/blog",
    title: tb("title"),
    description: tb("subtitle"),
  });
}

const fmtDate = (iso: string, locale: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString(
    locale === "uz" ? "uz-UZ" : "ru-RU",
    { day: "numeric", month: "long", year: "numeric" },
  );

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const tb = await getTranslations("blog");
  const tn = await getTranslations("nav");

  const [first, ...rest] = articles;

  return (
    <>
      <PageHeader
        eyebrow={tn("blog")}
        title={tb("title")}
        subtitle={tb("subtitle")}
        crumbs={[{ label: tn("home"), href: "/" }, { label: tn("blog") }]}
      />

      <section className="bg-bone-100 py-12 md:py-18">
        <div className="container-x">
          <RevealGroup
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
            stagger={0.06}
          >
            {/* bosh maqola — 2 ustun kenglikda */}
            {[first, ...rest].map((a, i) => {
              const cat = getCategory(a.categorySlug);
              const big = i === 0;
              return (
                <RevealItem
                  key={a.slug}
                  className={cn("h-full", big && "sm:col-span-2")}
                >
                  <Link
                    href={`/blog/${a.slug}`}
                    className="group/art flex h-full flex-col overflow-hidden rounded-3xl border border-bone-300 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-brand-400 hover:shadow-[0_28px_60px_-28px_rgba(11,74,99,.4)]"
                  >
                    <div
                      className={cn(
                        "relative overflow-hidden bg-bone-200",
                        big ? "aspect-[16/8]" : "aspect-[16/9]",
                      )}
                    >
                      <Image
                        src={a.image}
                        alt={t(a.title, l)}
                        fill
                        priority={i < 2}
                        sizes={big ? "(max-width:640px) 92vw, 62vw" : "(max-width:640px) 92vw, 31vw"}
                        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/art:scale-[1.05]"
                      />
                      {cat && (
                        <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[11.5px] font-bold text-navy-800 backdrop-blur-sm">
                          {t(cat.name, l)}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-5 md:p-6">
                      <div className="flex items-center gap-3 text-[12.5px] text-muted">
                        <span>{fmtDate(a.date, l)}</span>
                        <span className="size-1 rounded-full bg-bone-400" />
                        <span className="flex items-center gap-1">
                          <Clock3 className="size-3.5" strokeWidth={2.2} />
                          {tb("readTime", { min: a.readMinutes })}
                        </span>
                      </div>

                      <h2
                        className={cn(
                          "font-display mt-3 leading-snug font-extrabold text-graphite transition-colors duration-300 group-hover/art:text-brand-600",
                          big ? "text-[20px] md:text-[24px]" : "text-[16.5px]",
                        )}
                      >
                        {t(a.title, l)}
                      </h2>

                      <p className="mt-2.5 line-clamp-2 text-[13.5px] leading-relaxed text-muted">
                        {t(a.excerpt, l)}
                      </p>

                      <span className="mt-auto flex items-center gap-1.5 pt-4 text-[13.5px] font-bold text-brand-600">
                        {tn("blog")}
                        <ArrowUpRight
                          className="size-4 transition-transform duration-300 group-hover/art:translate-x-0.5 group-hover/art:-translate-y-0.5"
                          strokeWidth={2.4}
                        />
                      </span>
                    </div>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
