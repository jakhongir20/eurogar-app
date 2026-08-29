import { NextResponse } from "next/server";
import { searchProducts } from "@/lib/repo";

/** Ochiq qidiruv — header'dagi qidiruv oynasi shu yerdan o'qiydi */
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") ?? "";
  if (!q.trim()) return NextResponse.json({ products: [] });
  const found = await searchProducts(q, 6);
  return NextResponse.json({
    products: found.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      price: p.price,
      image: p.images[0] ?? "",
    })),
  });
}
