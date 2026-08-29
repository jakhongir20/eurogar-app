import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ADMIN_COOKIE, adminToken } from "@/lib/admin-auth";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"];
const MAX = 6 * 1024 * 1024; // 6 MB

export async function POST(req: Request) {
  const c = await cookies();
  if (c.get(ADMIN_COOKIE)?.value !== adminToken())
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File))
    return NextResponse.json({ error: "no_file" }, { status: 400 });

  if (!ALLOWED.includes(file.type))
    return NextResponse.json({ error: "bad_type" }, { status: 415 });
  if (file.size > MAX)
    return NextResponse.json({ error: "too_large" }, { status: 413 });

  const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const dir = join(process.cwd(), "public", "uploads");

  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, name), Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ url: `/uploads/${name}` });
}
