import type { Metadata } from "next";
import { cookies } from "next/headers";
import { fontVars } from "@/app/fonts";
import { Providers } from "@/components/providers";
import { AdminIntlProvider } from "@/components/admin/intl-provider";
import { ADMIN_LANG_COOKIE, toAdminLocale } from "@/lib/admin-locale";
import uz from "@/messages/admin/uz.json";
import ru from "@/messages/admin/ru.json";
import "../../../globals.css";

/* Admin matnlari saytnikidan alohida: ommaviy sahifalarga yuklanmaydi.
   Ikkala fayl ham serverda qoladi — brauzerga faqat tanlangani ketadi. */
const MESSAGES = { uz, ru };

export const metadata: Metadata = {
  title: "Admin panel · EUROGAR",
  robots: { index: false, follow: false },
};

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = toAdminLocale((await cookies()).get(ADMIN_LANG_COOKIE)?.value);

  return (
    <html
      lang={locale}
      className={`${fontVars} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-bone-200">
        <AdminIntlProvider locale={locale} messages={MESSAGES[locale]}>
          <Providers>{children}</Providers>
        </AdminIntlProvider>
      </body>
    </html>
  );
}
