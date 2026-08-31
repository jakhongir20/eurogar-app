/**
 * Saytning kanonik manzili.
 *
 * Tartib:
 *  1. NEXT_PUBLIC_SITE_URL — domen olingach shu yerga yoziladi
 *  2. VERCEL_PROJECT_PRODUCTION_URL — Vercel'ning doimiy manzili
 *  3. localhost — dev
 *
 * Bu metadata (canonical, OpenGraph) uchun ishlatiladi: canonical mavjud
 * bo'lmagan domenga ishora qilsa, qidiruv tizimlari sahifani indekslamaydi.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}
