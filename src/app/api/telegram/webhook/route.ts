import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { tgSend } from "@/lib/telegram";

/**
 * Telegram webhook — botga kelgan xabarlar shu yerga tushadi
 * (`bun run tg:setup` webhook'ni ro'yxatdan o'tkazadi).
 *
 * Vazifalari (KP sharti):
 *  - mijoz botga yozsa → avtomatik javob: "Tez orada siz bilan bog'lanamiz"
 *  - /id buyrug'i → shu chatning ID sini aytadi (menejerlar guruhini
 *    TELEGRAM_CHAT_ID ga ulashda kerak; guruhda /id@BotNomi deb yoziladi)
 *  - guruhlardagi oddiy suhbatga aralashmaydi
 */

/** Saytning jonli manzili — so'rovning o'zidan olinadi (domen almashsa ham to'g'ri qoladi) */
function liveOrigin(req: Request): string | null {
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  return host && !host.startsWith("localhost") ? `https://${host}` : null;
}

const welcome = (origin: string | null) =>
  `👋 Assalomu alaykum! <b>${site.name}</b> botiga xush kelibsiz.\n\n` +
  `Savolingiz yoki buyurtmangizni shu yerga yozib qoldiring.\n\n` +
  `☎️ ${site.phones[0]}\n🕘 Dush–Shan, 9:00–18:00` +
  (origin ? `\n🌐 ${origin}` : "");

const RECEIVED =
  `✅ Xabaringiz qabul qilindi!\n\n` +
  `<b>Tez orada siz bilan bog'lanamiz.</b>\n\n` +
  `Shoshilinch bo'lsa: ☎️ ${site.phones[0]}`;

export async function POST(req: Request) {
  /* Webhook'ni faqat Telegram chaqira olishi uchun maxfiy sarlavha tekshiruvi */
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (secret && req.headers.get("x-telegram-bot-api-secret-token") !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const update = await req.json().catch(() => null);
  const msg = update?.message ?? update?.channel_post;
  const chatId: number | undefined = msg?.chat?.id;

  /* Telegram 200 kutadi — aks holda qayta-qayta uraveradi */
  if (!chatId) return NextResponse.json({ ok: true });

  const text: string = typeof msg.text === "string" ? msg.text : "";
  const isPrivate = msg.chat?.type === "private";

  try {
    if (/^\/id(@\w+)?\b/.test(text)) {
      /* Guruh ID sini bilish uchun: guruhga botni qo'shib /id deb yoziladi */
      await tgSend(
        chatId,
        `🆔 Bu chat ID si: <code>${chatId}</code>\n\n` +
          `Buni <code>TELEGRAM_CHAT_ID</code> qilib qo'ysangiz, ` +
          `buyurtma va arizalar shu yerga tushadi.`,
      );
    } else if (isPrivate) {
      await tgSend(
        chatId,
        /^\/start\b/.test(text) ? welcome(liveOrigin(req)) : RECEIVED,
      );
    }
    /* guruhdagi oddiy xabarlar — javobsiz, spam bo'lmasin */
  } catch {
    /* javob berilmasa ham 200 qaytaramiz */
  }

  return NextResponse.json({ ok: true });
}
