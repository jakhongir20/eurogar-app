/**
 * Telegram botni bir buyruqda sozlash:
 *
 *   bun run tg:setup                        # NEXT_PUBLIC_SITE_URL dan oladi
 *   bun run tg:setup https://sayt.vercel.app  # yoki URL beriladi
 *
 * Nima qiladi: getMe bilan tokenni tekshiradi, webhook'ni
 * <URL>/api/telegram/webhook ga o'rnatadi (maxfiy sarlavha bilan)
 * va joriy holatni ko'rsatadi.
 */
import nextEnv from "@next/env";
import crypto from "node:crypto";

nextEnv.loadEnvConfig(process.cwd(), false, { info: () => {}, error: console.error });

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API = process.env.TELEGRAM_API_BASE || "https://api.telegram.org";

if (!TOKEN) {
  console.log(`❌ TELEGRAM_BOT_TOKEN topilmadi.

Qadamlar:
  1. Telegram'da @BotFather ga yozing → /newbot → nom va username bering
  2. Bergan tokenini .env.local ga qo'shing:  TELEGRAM_BOT_TOKEN=123:ABC...
  3. Vercel → Settings → Environment Variables ga ham xuddi shuni qo'shing
  4. Qayta ishga tushiring: bun run tg:setup`);
  process.exit(1);
}

const call = async (method, payload = {}) => {
  const res = await fetch(`${API}/bot${TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};

const me = await call("getMe");
if (!me.ok) {
  console.log("❌ Token noto'g'ri ko'rinadi:", me.description ?? "");
  process.exit(1);
}
console.log(`✅ Bot topildi: @${me.result.username} (${me.result.first_name})`);

const base = (process.argv[2] || process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");
if (!/^https:\/\//.test(base)) {
  console.log(`
⚠️  Webhook uchun https URL kerak. Vercel'dagi manzilingizni bering:

    bun run tg:setup https://sizning-loyiha.vercel.app
`);
  process.exit(1);
}

let secret = process.env.TELEGRAM_WEBHOOK_SECRET;
if (!secret) {
  secret = crypto.randomBytes(16).toString("hex");
  console.log(`
ℹ️  TELEGRAM_WEBHOOK_SECRET yo'q edi — yangi taklif:

    TELEGRAM_WEBHOOK_SECRET=${secret}

  Buni .env.local GA HAM, Vercel env GA HAM qo'shing, keyin
  qayta deploy qilib, shu skriptni yana ishga tushiring.
  (Secret'siz ham ishlaydi, lekin himoyasiz qoladi.)`);
}

const url = `${base}/api/telegram/webhook`;
const hook = await call("setWebhook", {
  url,
  secret_token: secret,
  allowed_updates: ["message"],
  drop_pending_updates: true,
});
console.log(hook.ok ? `✅ Webhook o'rnatildi: ${url}` : `❌ setWebhook: ${hook.description}`);

const info = await call("getWebhookInfo");
if (info.ok) {
  const w = info.result;
  console.log(`ℹ️  Holat: url=${w.url || "—"} | kutilayotgan=${w.pending_update_count}` +
    (w.last_error_message ? ` | oxirgi xato: ${w.last_error_message}` : ""));
}

console.log(`
Keyingi qadamlar:
  1. Menejerlar guruhini oching (yo'q bo'lsa yarating) va @${me.result.username} ni qo'shing
  2. Guruhda yozing:  /id@${me.result.username}
  3. Bot aytgan raqamni TELEGRAM_CHAT_ID qilib .env.local va Vercel'ga qo'shing
  4. Sinov: botga shaxsiy xabar yozing — "Tez orada bog'lanamiz" javobi kelishi kerak,
     saytdan ariza yuboring — guruhga xabar tushadi.`);
