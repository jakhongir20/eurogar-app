"use client";

import { createContext, useContext, type ReactNode } from "react";
import { resolveContacts, type SiteContacts } from "@/lib/phones";

/**
 * Kompaniya telefon raqamlari client komponentlarga (header, mobil menyu,
 * CTA, filiallar). Qiymat sayt layout'ida bazadan o'qiladi
 * (`getSiteContacts`), admin paneldan o'zgartirilganda sayt qayta chiziladi.
 */
const ContactsContext = createContext<SiteContacts>(resolveContacts([]));

export function ContactsProvider({
  value,
  children,
}: {
  value: SiteContacts;
  children: ReactNode;
}) {
  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
}

export const useSiteContacts = () => useContext(ContactsContext);
