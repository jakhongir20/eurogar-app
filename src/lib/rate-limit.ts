/**
 * Formalar uchun oddiy, lekin ishonchli chastota cheklovi.
 *
 * Nega baza? Vercel'da har so'rov alohida nusxada bajarilishi mumkin —
 * xotiradagi hisoblagich nusxalar orasida bo'linib ketadi. Baza bo'lsa
 * cheklov barcha nusxalar uchun umumiy bo'ladi.
 * DATABASE_URL bo'lmasa — xotira rejimi (dev uchun yetarli).
 */
import { hasDb, prisma } from "./repo";

export type LimitAction = "lead" | "order" | "review" | "login";

/** Bir oynada ruxsat etilgan urinishlar soni */
const LIMITS: Record<LimitAction, { max: number; windowMs: number }> = {
  lead: { max: 5, windowMs: 60 * 60 * 1000 }, // soatiga 5 ariza
  order: { max: 5, windowMs: 60 * 60 * 1000 },
  review: { max: 3, windowMs: 60 * 60 * 1000 },
  login: { max: 10, windowMs: 15 * 60 * 1000 }, // parol tanlashga qarshi
};

/* ── xotira rejimi (DATABASE_URL yo'q bo'lganda) ── */
const g = globalThis as unknown as {
  __egRate?: Map<string, { count: number; windowAt: number }>;
};
g.__egRate ??= new Map();

/** So'rov yuborgan mijozning IP manzili (Vercel proxy orqali) */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export interface LimitResult {
  ok: boolean;
  /** Qayta urinib ko'rish mumkin bo'lgunga qadar qolgan sekundlar */
  retryAfter: number;
}

/**
 * Hisoblagichni oshiradi va limitdan oshgan-oshmaganini qaytaradi.
 * Baza xato bersa — so'rovni BLOKLAMAYDI (mijoz ariza yubora olsin).
 */
export async function checkRateLimit(
  req: Request,
  action: LimitAction,
): Promise<LimitResult> {
  const { max, windowMs } = LIMITS[action];
  const key = `${clientIp(req)}:${action}`;
  const now = Date.now();

  if (!hasDb()) {
    const cur = g.__egRate!.get(key);
    if (!cur || now - cur.windowAt > windowMs) {
      g.__egRate!.set(key, { count: 1, windowAt: now });
      return { ok: true, retryAfter: 0 };
    }
    cur.count += 1;
    return cur.count > max
      ? { ok: false, retryAfter: Math.ceil((cur.windowAt + windowMs - now) / 1000) }
      : { ok: true, retryAfter: 0 };
  }

  try {
    const p = await prisma();
    const row = await p.rateLimit.findUnique({ where: { id: key } });

    if (!row || now - row.windowAt.getTime() > windowMs) {
      await p.rateLimit.upsert({
        where: { id: key },
        create: { id: key, count: 1, windowAt: new Date(now) },
        update: { count: 1, windowAt: new Date(now) },
      });
      return { ok: true, retryAfter: 0 };
    }

    const updated = await p.rateLimit.update({
      where: { id: key },
      data: { count: { increment: 1 } },
    });

    if (updated.count > max) {
      const left = row.windowAt.getTime() + windowMs - now;
      return { ok: false, retryAfter: Math.max(1, Math.ceil(left / 1000)) };
    }
    return { ok: true, retryAfter: 0 };
  } catch (e) {
    console.error("[rate-limit] baza xatosi, so'rov o'tkazib yuborildi:", e);
    return { ok: true, retryAfter: 0 };
  }
}

export { HONEYPOT_FIELD, isBot } from "./honeypot";
