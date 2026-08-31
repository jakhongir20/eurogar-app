import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminSecret, createAdminToken } from "@/lib/admin-auth";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  /* Parol tanlashga (brute-force) qarshi cheklov */
  const limit = await checkRateLimit(req, "login");
  if (!limit.ok) {
    return NextResponse.json(
      { error: "too_many_requests" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const secret = adminSecret();
  if (!secret.ok) {
    /* Parol sozlanmagan yoki zaif — kirishga umuman ruxsat berilmaydi */
    console.error(`[admin] ADMIN_PASSWORD muammosi: ${secret.reason}`);
    return NextResponse.json(
      { error: "not_configured", reason: secret.reason },
      { status: 503 },
    );
  }

  const { password } = await req.json().catch(() => ({ password: "" }));
  if (typeof password !== "string" || password !== secret.secret) {
    return NextResponse.json({ error: "wrong_password" }, { status: 401 });
  }

  const token = await createAdminToken();
  if (!token)
    return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE);
  return res;
}
