import { NextResponse } from "next/server";
import { addLead } from "@/lib/store";
import { escapeHtml, sendTelegram } from "@/lib/telegram";

const TITLES: Record<string, string> = {
  cta: "📞 Qo'ng'iroq so'rovi",
  contact: "✉️ Aloqa formasi",
  calculator: "🧮 Kalkulyator arizasi",
};

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.phone) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const source = ["cta", "contact", "calculator"].includes(body.source)
    ? body.source
    : "cta";

  const lead = addLead({
    name: String(body.name).slice(0, 120),
    phone: String(body.phone).slice(0, 30),
    note: String(body.note ?? "").slice(0, 1000),
    source,
    meta: body.meta ?? undefined,
  });

  const meta = lead.meta
    ? "\n" +
      Object.entries(lead.meta)
        .map(([k, v]) => `• ${escapeHtml(k)}: ${escapeHtml(String(v))}`)
        .join("\n")
    : "";

  await sendTelegram(
    `<b>${TITLES[source]}</b>\n\n` +
      `👤 ${escapeHtml(lead.name)}\n` +
      `📞 ${escapeHtml(lead.phone)}\n` +
      (lead.note ? `📝 ${escapeHtml(lead.note)}\n` : "") +
      meta,
  );

  return NextResponse.json({ ok: true, id: lead.id });
}
