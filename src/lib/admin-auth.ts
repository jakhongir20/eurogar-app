/**
 * Admin panel autentifikatsiyasi.
 *
 * Parol FAQAT `ADMIN_PASSWORD` muhit o'zgaruvchisidan olinadi — kodda
 * standart qiymat YO'Q. Sabab: repozitoriya ochiq, kodga yozilgan parol
 * hammaga ko'rinadi. Parol qo'yilmasa admin panel umuman ochilmaydi.
 *
 * Sessiya tokeni — HMAC-SHA256 imzosi + amal qilish muddati.
 * Web Crypto ishlatiladi, shuning uchun proxy (Edge) va API route'larda
 * bir xil ishlaydi.
 */

export const ADMIN_COOKIE = "eg_admin";

/**
 * Admin panel manzili. Ataylab `/admin` emas — bu manzilni botlar va
 * qiziquvchilar birinchi navbatda sinab ko'rishadi. Bu himoya emas (asosiy
 * himoya — parol va HMAC token), lekin ortiqcha e'tibordan xoli qiladi.
 *
 * O'zgartirilsa: shu qatorni va `src/app/(admin)/panel/` papka nomini
 * birga o'zgartiring — Next.js marshrutlari papka nomidan olinadi.
 */
export const ADMIN_BASE = "/panel/admin";
export const ADMIN_LOGIN = `${ADMIN_BASE}/login`;

/** Ochiq repoda «yonib ketgan» parollar — qabul qilinmaydi */
const LEAKED = new Set(["eurogar2026", "admin", "password", "12345678"]);

const MIN_LEN = 8;

export type AdminSecretState =
  | { ok: true; secret: string }
  | { ok: false; reason: "missing" | "too_short" | "leaked" };

export function adminSecret(): AdminSecretState {
  const p = process.env.ADMIN_PASSWORD;
  if (!p) return { ok: false, reason: "missing" };
  if (LEAKED.has(p.toLowerCase())) return { ok: false, reason: "leaked" };
  if (p.length < MIN_LEN) return { ok: false, reason: "too_short" };
  return { ok: true, secret: p };
}

/* ─────────────────────────── HMAC ─────────────────────────── */

const enc = new TextEncoder();

function b64url(bytes: Uint8Array) {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(secret: string, payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return b64url(new Uint8Array(sig));
}

/** Vaqt bo'yicha sizib chiqmaydigan taqqoslash */
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

const TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 kun

/** Login muvaffaqiyatli bo'lgach cookie'ga yoziladigan token */
export async function createAdminToken(): Promise<string | null> {
  const s = adminSecret();
  if (!s.ok) return null;
  const exp = String(Date.now() + TTL_MS);
  return `${exp}.${await sign(s.secret, exp)}`;
}

/** Har bir himoyalangan so'rovda tekshiriladi */
export async function verifyAdminToken(token?: string): Promise<boolean> {
  const s = adminSecret();
  if (!s.ok || !token) return false;

  const dot = token.indexOf(".");
  if (dot < 1) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  const exp = Number(payload);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;

  return safeEqual(sig, await sign(s.secret, payload));
}
