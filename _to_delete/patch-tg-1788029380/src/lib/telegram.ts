/**
 * Telegram bot integratsiyasi.
 *
 * .env.local (va Vercel'da Environment Variables) ga qo'shiladi:
 *   TELEGRAM_BOT_TOKEN=123456:ABC...        (@BotFather beradi)
 *   TELEGRAM_CHAT_ID=-1001234567890         (menejerlar guruhi — /id buyrug'i aytadi)
 *   TELEGRAM_WEBHOOK_SECRET=istalgan-maxfiy (webhook'ni himoya qiladi)
 *
 * Token bo'lmasa — xabar konsolga yoziladi va xatolik bermaydi,
 * shuning uchun UI bosqichida ham hammasi ishlayveradi.
 */

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
/** Testda soxta server ko'rsatish uchun; prod'da tegilmaydi */
const API_BASE = process.env.TELEGRAM_API_BASE || "https://api.telegram.org";

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Telegram Bot API'ga bitta chaqiruv. Muvaffaqiyatda result, aks holda null. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function tgApi<T = any>(
  method: string,
  payload: Record<string, unknown>,
): Promise<T | null> {
  if (!TOKEN) {
    console.info(`[telegram:mock] ${method}`, JSON.stringify(payload).slice(0, 400));
    return null;
  }
  try {
    const res = await fetch(`${API_BASE}/bot${TOKEN}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.ok) {
      console.error(`[telegram] ${method} failed:`, JSON.stringify(data).slice(0, 300));
      return null;
    }
    return data.result as T;
  } catch (e) {
    console.error(`[telegram] ${method} error:`, e);
    return null;
  }
}

/** Istalgan chatga HTML xabar yuborish */
export async function tgSend(chatId: number | string, html: string) {
  return tgApi("sendMessage", {
    chat_id: chatId,
    text: html,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

/** Menejerlar guruhiga xabar (buyurtma/ariza bildirishnomalari) */
export async function sendTelegram(html: string): Promise<boolean> {
  if (!TOKEN || !CHAT_ID) {
    console.info("[telegram:mock]\n" + html.replace(/<[^>]+>/g, ""));
    return false;
  }
  return (await tgSend(CHAT_ID, html)) !== null;
}

export const money = (n: number) =>
  new Intl.NumberFormat("ru-RU").format(Math.round(n)) + " so'm";
