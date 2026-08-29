import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, adminToken } from "@/lib/admin-auth";
import { deleteProduct, getProductById, updateProduct } from "@/lib/repo";

async function guard() {
  const c = await cookies();
  return c.get(ADMIN_COOKIE)?.value === adminToken();
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await guard()))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ product });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await guard()))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const patch = await req.json().catch(() => null);
  const product = await updateProduct(id, patch ?? {});
  if (!product) return NextResponse.json({ error: "not_found" }, { status: 404 });
  revalidatePath("/", "layout");
  return NextResponse.json({ product });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await guard()))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const ok = await deleteProduct(id);
  revalidatePath("/", "layout");
  return NextResponse.json({ ok });
}
