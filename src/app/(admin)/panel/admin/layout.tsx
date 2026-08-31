import type { Metadata } from "next";
import { fontVars } from "@/app/fonts";
import { Providers } from "@/components/providers";
import "../../../globals.css";



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
      className={`${fontVars} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-bone-200">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
