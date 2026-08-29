import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, adminToken } from "@/lib/admin-auth";
import { listLeads, listOrders, setOrderStatus } from "@/lib/repo";

async function guard() {
  const c = await cookies();
  return c.get(ADMIN_COOKIE)?.value === adminToken();
}

export async function GET() {
  if (!(await guard()))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const [orders, leads] = await Promise.all([listOrders(), listLeads()]);
  return NextResponse.json({ orders, leads });
}

export async function PATCH(req: Request) {
  if (!(await guard()))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id, status } = await req.json().catch(() => ({}));
  const order = await setOrderStatus(id, status);
  if (!order) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ order });
}
