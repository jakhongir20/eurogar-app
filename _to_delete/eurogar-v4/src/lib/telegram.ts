/**
 * Telegram bot integratsiyasi.
 *
 * .env.local ga qo'shiladi:
 *   TELEGRAM_BOT_TOKEN=123456:ABC...
 *   TELEGRAM_CHAT_ID=-1001234567890     (menejerlar guruhi)
 *
 * Token bo'lmasa — konsolga yozadi va xatolik bermaydi,
 * shuning uchun UI bosqichida ham hammasi ishlayveradi.
 */

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendTelegram(html: string): Promise<boolean> {
  if (!TOKEN || !CHAT_ID) {
    console.info("[telegram:mock]\n" + html.replace(/<[^>]+>/g, ""));
    return false;
  }
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: html,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );
    if (!res.ok) console.error("[telegram] failed:", await res.text());
    return res.ok;
  } catch (e) {
    console.error("[telegram] error:", e);
    return false;
  }
}

export const money = (n: number) =>
  new Intl.NumberFormat("ru-RU").format(Math.round(n)) + " so'm";
