import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Clock3 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { articles, getArticle, similarArticles } from "@/data/articles";
import { getCategory } from "@/data/categories";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/types";
import { t } from "@/lib/utils";
import { articleLd, breadcrumbLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/catalog/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ShareButtons } from "@/components/blog/share-buttons";
import { ButtonShell } from "@/components/ui/button";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    articles.map((a) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const l = locale as Locale;
  return pageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: t(a.title, l),
    description: t(a.excerpt, l),
    images: [a.image],
    type: "article",
    publishedTime: a.date,
  });
}

const fmtDate = (iso: string, locale: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString(
    locale === "uz" ? "uz-UZ" : "ru-RU",
    { day: "numeric", month: "long", year: "numeric" },
  );

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = getArticle(slug);
  if (!article) notFound();

  const l = locale as Locale;
  const tn = await getTranslations("nav");
  const tb = await getTranslations("blog");
  const cat = getCategory(article.categorySlug);
  const similar = similarArticles(slug);

  return (
    <>
      <JsonLd
        data={articleLd({
          title: t(article.title, l),
          description: t(article.excerpt, l),
          image: article.image,
          url: `/${l}/blog/${article.slug}`,
          datePublished: article.date,
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: tn("home"), url: `/${l}` },
          { name: tn("blog"), url: `/${l}/blog` },
          { name: t(article.title, l), url: `/${l}/blog/${article.slug}` },
        ])}
      />
      <PageHeader
        eyebrow={cat ? t(cat.name, l) : tn("blog")}
        title={t(article.title, l)}
        crumbs={[
          { label: tn("home"), href: "/" },
          { label: tn("blog"), href: "/blog" },
          { label: t(article.title, l) },
        ]}
      />

      <section className="bg-bone-100 py-10 md:py-16">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            {/* meta qator */}
            <Reveal>
              <div className="flex flex-wrap items-center gap-3 text-[13.5px] text-muted">
                <span>{fmtDate(article.date, l)}</span>
                <span className="size-1 rounded-full bg-bone-400" />
                <span className="flex items-center gap-1.5">
                  <Clock3 className="size-4" strokeWidth={2.2} />
                  {tb("readTime", { min: article.readMinutes })}
                </span>
              </div>
            </Reveal>

            {/* muqova rasm */}
            <Reveal delay={0.06}>
              <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-3xl border border-bone-300 bg-bone-200">
                <Image
                  src={article.image}
                  alt={t(article.title, l)}
                  fill
                  priority
                  sizes="(max-width: 900px) 92vw, 768px"
                  className="object-cover"
                />
              </div>
            </Reveal>

            {/* matn */}
            <Reveal delay={0.1}>
              <div className="mt-8">
                {article.body.map((block, i) => {
                  if (block.type === "h2")
                    return (
                      <h2
                        key={i}
                        className="font-display mt-9 mb-4 text-[clamp(1.2rem,2.6vw,1.55rem)] leading-snug font-extrabold text-graphite first:mt-0"
                      >
                        {t(block.text, l)}
                      </h2>
                    );
                  if (block.type === "list")
                    return (
                      <ul key={i} className="my-5 space-y-2.5">
                        {block.items.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-[15.5px] leading-relaxed text-graphite"
                          >
                            <span className="mt-[0.62em] size-1.5 shrink-0 rounded-full bg-brand-500" />
                            {t(item, l)}
                          </li>
                        ))}
                      </ul>
                    );
                  return (
                    <p
                      key={i}
                      className="my-4 text-[15.5px] leading-[1.75] text-graphite/90"
                    >
                      {t(block.text, l)}
                    </p>
                  );
                })}
              </div>
            </Reveal>

            {/* ulashish + toifa CTA */}
            <Reveal delay={0.05}>
              <div className="mt-10 flex flex-col gap-5 border-t border-bone-300 pt-7 sm:flex-row sm:items-center sm:justify-between">
                <ShareButtons title={t(article.title, l)} />
                {cat && (
                  <Link href={`/catalog/${cat.slug}`} className="group/btn shrink-0">
                    <ButtonShell
                      variant="dark"
                      size="md"
                      iconRight={<ArrowRight className="size-4" strokeWidth={2.4} />}
                    >
                      {tb("inCategory")}
                    </ButtonShell>
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* o'xshash maqolalar — TZ 2.9 */}
      {similar.length > 0 && (
        <section className="border-t border-bone-300 bg-bone-200 py-14 md:py-18">
          <div className="container-x">
            <h2 className="font-display text-[clamp(1.4rem,3vw,1.9rem)] font-extrabold text-graphite">
              {tb("similar")}
            </h2>
            <RevealGroup
              className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
              stagger={0.07}
            >
              {similar.map((a) => (
                <RevealItem key={a.slug} className="h-full">
                  <Link
                    href={`/blog/${a.slug}`}
                    className="group/sim flex h-full flex-col overflow-hidden rounded-3xl border border-bone-300 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-brand-400 hover:shadow-[0_24px_50px_-26px_rgba(11,74,99,.4)]"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-bone-200">
                      <Image
                        src={a.image}
                        alt={t(a.title, l)}
                        fill
                        sizes="(max-width:640px) 92vw, 31vw"
                        className="object-cover transition-transform duration-700 group-hover/sim:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-[15.5px] leading-snug font-extrabold text-graphite transition-colors group-hover/sim:text-brand-600">
                        {t(a.title, l)}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted">
                        {t(a.excerpt, l)}
                      </p>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}
    </>
  );
}
