import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { fontVars } from "@/app/fonts";
import { siteUrl } from "@/lib/site-url";
import { alternatesFor, organizationLd, robotsPolicy } from "@/lib/seo";
import { branches, site } from "@/lib/site";
import { getSiteContacts } from "@/lib/repo";
import { t as tr } from "@/lib/utils";
import { JsonLd } from "@/components/seo/json-ld";
import { YandexMetrika } from "@/components/analytics/yandex-metrika";
import { Providers } from "@/components/providers";
import { ContactsProvider } from "@/components/contacts-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import "../../globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0e13" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: { default: t("title"), template: `%s · EUROGAR` },
    description: t("description"),
    /* Domen hali olinmagan — canonical jonli manzilga ishora qilishi shart,
       aks holda qidiruv tizimlari mavjud bo'lmagan URL'ni indekslaydi.
       NEXT_PUBLIC_SITE_URL qo'yilgach o'zi to'g'ri manzilga o'tadi. */
    metadataBase: new URL(siteUrl()),
    alternates: alternatesFor(locale),
    robots: robotsPolicy(),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${siteUrl()}/${locale}`,
      siteName: "EUROGAR",
      locale: locale === "uz" ? "uz_UZ" : "ru_RU",
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const tm = await getTranslations({ locale, namespace: "meta" });
  const l = locale as (typeof routing.locales)[number];
  /* Telefon raqamlar — admin paneldan (baza ishlamasa standart raqam) */
  const contacts = await getSiteContacts();

  /* Kompaniya + 3 filial strukturaviy ma'lumotlari — qidiruv natijalarida
     manzil, ish vaqti va telefon chiqishi uchun (LocalBusiness) */
  const orgLd = organizationLd(l, {
    name: site.name,
    description: tm("description"),
    phones: contacts.phones,
    email: site.email,
    socials: [site.telegram, site.instagram, site.facebook, site.youtube],
    branches: branches.map((b) => ({
      id: b.id,
      city: tr(b.city, l),
      lat: b.lat,
      lng: b.lng,
      phone: contacts.branchPhones[b.id] ?? contacts.main,
      main: b.main,
    })),
  });

  return (
    <html
      lang={locale}
      className={`${fontVars} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider>
          <Providers>
            <ContactsProvider value={contacts}>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer phones={contacts.phones} />
              <CartDrawer />
            </ContactsProvider>
          </Providers>
        </NextIntlClientProvider>
        <JsonLd data={orgLd} />
        {/* useSearchParams Suspense ichida bo'lishi shart */}
        <Suspense fallback={null}>
          <YandexMetrika />
        </Suspense>
      </body>
    </html>
  );
}
