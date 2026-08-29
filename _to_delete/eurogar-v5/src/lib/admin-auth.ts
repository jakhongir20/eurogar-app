/** Oddiy parol bilan himoya. Prod'da .env.local ga ADMIN_PASSWORD qo'yiladi. */
export const ADMIN_COOKIE = "eg_admin";

export const adminPassword = () => process.env.ADMIN_PASSWORD || "eurogar2026";

/** Cookie qiymati — parolning oddiy hash'i (demo darajasida yetarli) */
export function adminToken(password = adminPassword()) {
  let h = 0;
  for (let i = 0; i < password.length; i++) {
    h = (h << 5) - h + password.charCodeAt(i);
    h |= 0;
  }
  return `eg.${Math.abs(h).toString(36)}`;
}
