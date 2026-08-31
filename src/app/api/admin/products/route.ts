import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/admin-auth";
import { createProduct, listProducts, productStats } from "@/lib/repo";

async function guard() {
  const c = await cookies();
  return verifyAdminToken(c.get(ADMIN_COOKIE)?.value);
}

export async function GET() {
  if (!(await guard()))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const [products, stats] = await Promise.all([
    listProducts({ includeHidden: true }),
    productStats(),
  ]);
  return NextResponse.json({ products, stats });
}

export async function POST(req: Request) {
  if (!(await guard()))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const product = await createProduct(body);
  revalidatePath("/", "layout"); // katalog/bosh sahifa kesh yangilansin
  return NextResponse.json({ product }, { status: 201 });
}
