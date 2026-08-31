/**
 * Yandex Metrika — hisoblagich va maqsadlar (celi).
 *
 * Hisoblagich raqami `NEXT_PUBLIC_YANDEX_METRIKA_ID` da. Qo'yilmasa —
 * analitika umuman yuklanmaydi va sayt oddiy ishlayveradi (dev'da ham
 * statistika ifloslanmaydi).
 *
 * Maqsadlar Metrika kabinetida "JavaScript-hodisa" turida, aynan shu
 * identifikatorlar bilan yaratiladi.
 */

declare global {
  interface Window {
    ym?: (
      id: number,
      action: string,
      ...args: unknown[]
    ) => void;
  }
}

/** Kuzatuv maqsadlari — kabinetdagi nomlar bilan bir xil bo'lishi shart */
export const GOALS = {
  /** Ariza yuborildi (qo'ng'iroq so'rovi, aloqa formasi, kalkulyator) */
  lead: "lead_submit",
  /** Savatdan buyurtma rasmiylashtirildi */
  order: "order_submit",
  /** Sharh qoldirildi */
  review: "review_submit",
  /** Telefon raqamiga bosildi */
  phone: "phone_click",
  /** Telegram'ga o'tildi */
  telegram: "telegram_click",
  /** Boshqa ijtimoiy tarmoq */
  social: "social_click",
  /** Kalkulyatorda hisob-kitob qilindi */
  calculator: "calculator_use",
} as const;

export type Goal = (typeof GOALS)[keyof typeof GOALS];

export function metrikaId(): number | null {
  const raw = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  const id = raw ? Number(raw) : NaN;
  return Number.isFinite(id) && id > 0 ? id : null;
}

/**
 * Maqsadni qayd etadi. Metrika ulanmagan bo'lsa — hech narsa qilmaydi,
 * shuning uchun chaqiruvni shart bilan o'rash shart emas.
 */
export function trackGoal(goal: Goal, params?: Record<string, unknown>) {
  const id = metrikaId();
  if (!id || typeof window === "undefined" || !window.ym) return;
  try {
    window.ym(id, "reachGoal", goal, params);
  } catch {
    /* analitika hech qachon saytni buzmasin */
  }
}
