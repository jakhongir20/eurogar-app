import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import "../../globals.css";

/* Shriftlar loyiha ichida — Google Fonts'ga tashqi so'rov yo'q (tezroq + GDPR) */
const manrope = localFont({
  variable: "--font-manrope",
  display: "swap",
  src: [
    { path: "../../../fonts/manrope-latin-wght-normal.woff2", weight: "200 800", style: "normal" },
    { path: "../../../fonts/manrope-latin-ext-wght-normal.woff2", weight: "200 800", style: "normal" },
    { path: "../../../fonts/manrope-cyrillic-wght-normal.woff2", weight: "200 800", style: "normal" },
  ],
});

const unbounded = localFont({
  variable: "--font-unbounded",
  display: "swap",
  src: [
    { path: "../../../fonts/unbounded-latin-wght-normal.woff2", weight: "200 900", style: "normal" },
    { path: "../../../fonts/unbounded-latin-ext-wght-normal.woff2", weight: "200 900", style: "normal" },
    { path: "../../../fonts/unbounded-cyrillic-wght-normal.woff2", weight: "200 900", style: "normal" },
  ],
});

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
    metadataBase: new URL("https://eurogar.uz"),
    alternates: {
      canonical: `/${locale}`,
      languages: { uz: "/uz", ru: "/ru" },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "uz" ? "uz_UZ" : "ru_RU",
      type: "website",
    },
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

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${unbounded.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider>
          <Providers>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
