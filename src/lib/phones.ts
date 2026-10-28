/**
 * Kompaniya telefon raqamlari — admin paneldan boshqariladi
 * (/panel/admin/phones). Bu fayl brauzerga ham ketadi: bazaga tegmaydi,
 * faqat tiplar va qoidalar. Bazadan o'qish — `src/lib/repo.ts`.
 */
import { branches } from "./site";
import { formatPhone } from "./utils";

/** Bazada raqam bo'lmasa (yoki jadval hali yaratilmagan bo'lsa) chiqadigan raqam */
export const DEFAULT_PHONE = "+998 55 055 05 05";

export interface SitePhone {
  id: string;
  /** "+998 55 055 05 05" */
  number: string;
  /** asosiy raqam: header, mobil menyu, qo'ng'iroq bloki, Telegram bot */
  main: boolean;
  /** filial id'si (tashkent | jizzakh | samarkand); null — umumiy raqam */
  branchId: string | null;
  hidden: boolean;
  sortOrder: number;
}

/** Saytga uzatiladigan tayyor ko'rinish */
export interface SiteContacts {
  /** asosiy raqam */
  main: string;
  /** barcha ko'rinadigan raqamlar — asosiysi birinchi, takrorsiz */
  phones: string[];
  /** filial id → raqam (raqam biriktirilmagan filialda — asosiy raqam) */
  branchPhones: Record<string, string>;
}

export const BRANCH_IDS: readonly string[] = branches.map((b) => b.id);

export function resolveContacts(rows: SitePhone[]): SiteContacts {
  const visible = rows
    .filter((r) => !r.hidden && r.number)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const main = (visible.find((r) => r.main) ?? visible[0])?.number ?? DEFAULT_PHONE;
  const phones = [...new Set([main, ...visible.map((r) => r.number)])];
  const branchPhones = Object.fromEntries(
    BRANCH_IDS.map((id) => [id, visible.find((r) => r.branchId === id)?.number ?? main]),
  );
  return { main, phones, branchPhones };
}

/** Saytda haqiqatda "asosiy" bo'lib chiqadigan raqam id'si (admin uchun) */
export function effectiveMainId(rows: SitePhone[]): string | null {
  const visible = rows
    .filter((r) => !r.hidden)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  return (visible.find((r) => r.main) ?? visible[0])?.id ?? null;
}

/** tel: havolasi — faqat raqamlar va + */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/**
 * Admin kiritgan raqamni tekshiradi va "+998 XX XXX XX XX" ko'rinishiga
 * keltiradi. 9 raqam (55 055 05 05) yoki 998 bilan 12 raqam qabul qilinadi.
 */
export function normalizePhone(raw: unknown): string | null {
  const digits = String(raw ?? "").replace(/\D/g, "");
  const local =
    digits.length === 12 && digits.startsWith("998")
      ? digits.slice(3)
      : digits.length === 9
        ? digits
        : null;
  return local ? formatPhone(local) : null;
}
