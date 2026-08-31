/**
 * Botlarga qarshi yashirin maydon ("asal qopqon").
 *
 * Odam bu maydonni ko'rmaydi va to'ldirmaydi; formalarni avtomatik
 * to'ldiruvchi bot esa hamma maydonni to'ldiradi. To'ldirilgan bo'lsa —
 * so'rovni jimgina rad etamiz.
 *
 * Bu fayl sof konstanta: ham server (API), ham brauzer tomonida ishlatiladi.
 */

export const HONEYPOT_FIELD = "company_site";

export function isBot(body: Record<string, unknown> | null): boolean {
  const v = body?.[HONEYPOT_FIELD];
  return typeof v === "string" && v.trim().length > 0;
}
