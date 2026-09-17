"use client";

import type { ReactNode } from "react";
import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import type { Locale } from "@/lib/types";

/**
 * Client provider ataylab: server versiyasi berilmagan sozlamalar uchun
 * `src/i18n/request.ts` ni chaqiradi — u saytning [locale] marshrutiga
 * bog'langan, admin panelda locale segmenti yo'q.
 */
export function AdminIntlProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: AbstractIntlMessages;
  children: ReactNode;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Asia/Tashkent"
    >
      {children}
    </NextIntlClientProvider>
  );
}
