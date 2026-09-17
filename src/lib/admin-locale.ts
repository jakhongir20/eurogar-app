import type { Locale } from "@/lib/types";

/**
 * Admin panel tili — sayt tilidan mustaqil. Cookie'da saqlanadi va admin
 * layout'i serverda o'qiydi, shuning uchun sahifa birinchi chizilishdayoq
 * to'g'ri tilda chiqadi (uz → ru "miltillashi" bo'lmaydi).
 */
export const ADMIN_LOCALES = ["uz", "ru"] as const satisfies readonly Locale[];

export const ADMIN_LANG_COOKIE = "eg_admin_lang";

export const toAdminLocale = (value?: string | null): Locale =>
  value === "ru" ? "ru" : "uz";
