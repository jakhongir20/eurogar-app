import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { SOCIALS } from "@/components/ui/social-icons";
import { PageHeader } from "@/components/catalog/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { Branches } from "@/components/contact/branches";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageMetadata({
    locale,
    path: "/contact",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tb = await getTranslations("branches");
  const tn = await getTranslations("nav");

  return (
    <>
      <PageHeader
        eyebrow={tn("contact")}
        title={t("title")}
        subtitle={t("subtitle")}
        crumbs={[{ label: tn("home"), href: "/" }, { label: tn("contact") }]}
      />

      {/* ── filiallar (xarita bilan) ── */}
      <section className="bg-bone-100 py-12 md:py-16">
        <div className="container-x">
          <Reveal>
            <Eyebrow>{tb("eyebrow")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-3.5 mb-8 text-[clamp(1.5rem,3.4vw,2.2rem)] font-extrabold text-graphite">
              {tb("title")}
            </h2>
          </Reveal>
          <Branches withMap />
        </div>
      </section>

      {/* ── aloqa kanallari + forma ── */}
      <section className="border-t border-bone-300 bg-bone-200 py-12 md:py-16">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-3">
              {/* telefonlar */}
              <Reveal>
                <div className="rounded-3xl border border-bone-300 bg-white p-5 md:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-navy-900 text-brand-400">
                      <Phone className="size-5" strokeWidth={2.1} />
                    </span>
                    <span className="text-[11.5px] font-bold tracking-[0.14em] text-muted uppercase">
                      {t("phone")}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {site.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s/g, "")}`}
                        className="rounded-2xl border border-bone-300 px-4 py-3 text-center text-[14.5px] font-bold text-graphite transition-all hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-600"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* email + ish vaqti */}
              <div className="grid gap-3 sm:grid-cols-2">
                <Reveal delay={0.06}>
                  <div className="h-full rounded-3xl border border-bone-300 bg-white p-5">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-navy-900 text-brand-400">
                      <Mail className="size-5" strokeWidth={2.1} />
                    </span>
                    <div className="mt-4 text-[11.5px] font-bold tracking-[0.14em] text-muted uppercase">
                      {t("email")}
                    </div>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-1.5 block text-[14.5px] font-bold text-graphite transition-colors hover:text-brand-600"
                    >
                      {site.email}
                    </a>
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="h-full rounded-3xl border border-bone-300 bg-white p-5">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-navy-900 text-brand-400">
                      <Clock className="size-5" strokeWidth={2.1} />
                    </span>
                    <div className="mt-4 text-[11.5px] font-bold tracking-[0.14em] text-muted uppercase">
                      {t("hours")}
                    </div>
                    <div className="mt-1.5 space-y-0.5">
                      {t("hoursValue")
                        .split("\n")
                        .map((line) => (
                          <div
                            key={line}
                            className="text-[14px] leading-relaxed font-semibold text-graphite"
                          >
                            {line}
                          </div>
                        ))}
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* ijtimoiy tarmoqlar */}
              <Reveal delay={0.14}>
                <div className="rounded-3xl border border-bone-300 bg-white p-5">
                  <div className="text-[11.5px] font-bold tracking-[0.14em] text-muted uppercase">
                    {t("social")}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SOCIALS.map(({ id, label, href, Icon }) => (
                      <a
                        key={id}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-full border border-bone-300 bg-white px-4 py-2.5 text-[13.5px] font-bold text-graphite transition-all hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-600"
                      >
                        <Icon className="size-4 text-brand-600" />
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* o'ng: forma */}
            <Reveal dir="left" delay={0.1}>
              <div className="lg:sticky lg:top-28">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
