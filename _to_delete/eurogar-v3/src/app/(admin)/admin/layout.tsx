import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "@/components/providers";
import "../../globals.css";

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

export const metadata: Metadata = {
  title: "Admin panel · EUROGAR",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="uz"
      className={`${manrope.variable} ${unbounded.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-bone-200">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
