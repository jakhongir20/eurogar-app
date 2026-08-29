import { NextResponse } from "next/server";
import { addOrder } from "@/lib/store";
import { escapeHtml, money, sendTelegram } from "@/lib/telegram";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.phone || !Array.isArray(body.items)) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const total = body.items.reduce(
    (a: number, i: { price: number; qty: number }) => a + i.price * i.qty,
    0,
  );

  const order = addOrder({
    name: String(body.name).slice(0, 120),
    phone: String(body.phone).slice(0, 30),
    note: String(body.note ?? "").slice(0, 1000),
    items: body.items,
    total,
    source: "cart",
  });

  const lines = order.items
    .map(
      (i: { name: { uz: string }; qty: number; price: number }, n: number) =>
        `${n + 1}. ${escapeHtml(i.name.uz)} — ${i.qty} × ${money(i.price)}`,
    )
    .join("\n");

  await sendTelegram(
    `🛒 <b>Yangi buyurtma ${order.code}</b>\n\n` +
      `👤 ${escapeHtml(order.name)}\n` +
      `📞 ${escapeHtml(order.phone)}\n` +
      (order.note ? `📝 ${escapeHtml(order.note)}\n` : "") +
      `\n${lines}\n\n` +
      `💰 <b>Jami: ${money(order.total)}</b>`,
  );

  return NextResponse.json({ ok: true, code: order.code, id: order.id });
}
