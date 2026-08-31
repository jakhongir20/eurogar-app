import { NextResponse } from "next/server";
import { addReview } from "@/lib/repo";
import { checkRateLimit, isBot } from "@/lib/rate-limit";
import { escapeHtml, sendTelegram } from "@/lib/telegram";

/** TZ 2.10: sharh yuboriladi → moderatsiyaga tushadi (admin tasdiqlagach saytda chiqadi) */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const text = String(body?.text ?? "").trim();
  const rating = Math.min(5, Math.max(1, Number(body?.rating ?? 5)));

  if (!name || text.length < 10) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (isBot(body)) return NextResponse.json({ ok: true, id: "" });

  const limit = await checkRateLimit(req, "review");
  if (!limit.ok) {
    return NextResponse.json(
      { error: "too_many_requests" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const review = await addReview({
    name: name.slice(0, 80),
    phone: String(body?.phone ?? "").slice(0, 30),
    rating,
    text: text.slice(0, 1200),
  });

  await sendTelegram(
    `⭐ <b>Yangi sharh (moderatsiya kutmoqda)</b>\n\n` +
      `👤 ${escapeHtml(review.name)}` +
      (review.phone ? `\n📞 ${escapeHtml(review.phone)}` : "") +
      `\n${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}\n\n` +
      `«${escapeHtml(review.text)}»\n\n` +
      `Tasdiqlash: /admin/reviews`,
  );

  return NextResponse.json({ ok: true, id: review.id });
}
