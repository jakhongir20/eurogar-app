import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, ExternalLink, Mail, MapPin, Phone, Send } from "lucide-react";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/catalog/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/ui/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tn = await getTranslations("nav");

  const cards = [
    {
      Icon: Phone,
      label: t("phone"),
      lines: site.phones,
      hrefs: site.phones.map((p) => `tel:${p.replace(/\s/g, "")}`),
    },
    {
      Icon: Mail,
      label: t("email"),
      lines: [site.email],
      hrefs: [`mailto:${site.email}`],
    },
    { Icon: MapPin, label: t("address"), lines: [t("addressValue")] },
    { Icon: Clock, label: t("hours"), lines: t("hoursValue").split("\n") },
  ];

  return (
    <>
      <PageHeader
        eyebrow={tn("contact")}
        title={t("title")}
        subtitle={t("subtitle")}
        crumbs={[{ label: tn("home"), href: "/" }, { label: tn("contact") }]}
      />

      <section className="bg-bone-100 py-12 md:py-18">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
            {/* chap: kontaktlar */}
            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                {cards.map((c, i) => (
                  <Reveal key={c.label} delay={i * 0.06}>
                    <div className="h-full rounded-3xl border border-bone-300 bg-white p-5">
                      <span className="flex size-11 items-center justify-center rounded-2xl bg-ink-900 text-brand-400">
                        <c.Icon className="size-5" strokeWidth={2.1} />
                      </span>
                      <div className="mt-4 text-[11.5px] font-bold tracking-[0.14em] text-muted uppercase">
                        {c.label}
                      </div>
                      <div className="mt-1.5 space-y-0.5">
                        {c.lines.map((line, j) =>
                          c.hrefs?.[j] ? (
                            <a
                              key={line}
                              href={c.hrefs[j]}
                              className="block text-[14.5px] font-bold text-graphite transition-colors hover:text-brand-600"
                            >
                              {line}
                            </a>
                          ) : (
                            <div
                              key={line}
                              className="text-[14px] leading-relaxed font-semibold text-graphite"
                            >
                              {line}
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* messenjerlar */}
              <Reveal delay={0.2}>
                <div className="mt-4 rounded-3xl border border-bone-300 bg-white p-5">
                  <div className="text-[11.5px] font-bold tracking-[0.14em] text-muted uppercase">
                    {t("social")}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={site.telegram}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2.5 text-[13.5px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-400 hover:text-ink-950"
                    >
                      <Send className="size-4" strokeWidth={2.3} />
                      Telegram
                    </a>
                    <a
                      href={site.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-full border border-bone-300 px-4 py-2.5 text-[13.5px] font-bold text-graphite transition-all hover:-translate-y-0.5 hover:border-graphite/25"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={site.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-full border border-bone-300 px-4 py-2.5 text-[13.5px] font-bold text-graphite transition-all hover:-translate-y-0.5 hover:border-graphite/25"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* xarita */}
              <Reveal delay={0.26}>
                <div className="mt-4 overflow-hidden rounded-3xl border border-bone-300 bg-white">
                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-[14px] font-bold text-graphite">
                      {t("mapTitle")}
                    </span>
                    <a
                      href={site.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-[13px] font-semibold text-brand-600 transition-colors hover:text-brand-700"
                    >
                      {t("openInMaps")}
                      <ExternalLink className="size-3.5" strokeWidth={2.3} />
                    </a>
                  </div>
                  <iframe
                    title={t("mapTitle")}
                    src={`https://yandex.uz/map-widget/v1/?ll=${site.geo.lng}%2C${site.geo.lat}&z=16&pt=${site.geo.lng},${site.geo.lat},pm2rdm`}
                    className="h-72 w-full border-0 md:h-80"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
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
