import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, adminToken } from "@/lib/admin-auth";
import { deleteReview, listReviews, setReviewStatus } from "@/lib/repo";
import type { ReviewStatus } from "@/lib/types";

async function guard() {
  const c = await cookies();
  return c.get(ADMIN_COOKIE)?.value === adminToken();
}

export async function GET() {
  if (!(await guard()))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ reviews: await listReviews() });
}

/** Tasdiqlash / rad etish — tasdiqlangani saytda chiqadi */
export async function PATCH(req: Request) {
  if (!(await guard()))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id, status } = await req.json().catch(() => ({}));
  if (!["pending", "approved", "rejected"].includes(status))
    return NextResponse.json({ error: "bad_status" }, { status: 400 });
  const review = await setReviewStatus(String(id), status as ReviewStatus);
  if (!review) return NextResponse.json({ error: "not_found" }, { status: 404 });
  revalidatePath("/", "layout"); // bosh sahifadagi sharhlar bloki yangilansin
  return NextResponse.json({ review });
}

export async function DELETE(req: Request) {
  if (!(await guard()))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await req.json().catch(() => ({}));
  const ok = await deleteReview(String(id));
  revalidatePath("/", "layout");
  return NextResponse.json({ ok });
}
