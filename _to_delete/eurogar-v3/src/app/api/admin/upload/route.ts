import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { ADMIN_COOKIE, adminToken } from "@/lib/admin-auth";

const ALLOWED = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/svg+xml",
];
const MAX = 20 * 1024 * 1024; // 20 MB — asl fotolar uchun

/**
 * Saytdagi barcha mahsulot rasmlari 4:3 nisbatda ko'rsatiladi.
 * Eng katta render — mahsulot sahifasidagi asosiy rasm: 628 CSS px,
 * ya'ni retina ekranda 1256 px. 1600×1200 zaxira bilan yetadi.
 *
 * Shuning uchun yuklangan har qanday rasm shu kanvaga solinadi:
 * kesilmaydi (fit: contain), bo'sh joy oq bilan to'ldiriladi.
 * Natija — WebP, chunki u JPEG'dan ~30% yengil.
 */
const TARGET_W = 1600;
const TARGET_H = 1200;
/** Bundan kichik asl rasm sifatsiz chiqadi — adminni ogohlantiramiz */
const MIN_SOURCE_W = 1200;

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

  const dir = join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const input = Buffer.from(await file.arrayBuffer());

  /* SVG — vektor, qayta ishlanmaydi */
  if (file.type === "image/svg+xml") {
    const name = `${stamp}.svg`;
    await writeFile(join(dir, name), input);
    return NextResponse.json({ url: `/uploads/${name}` });
  }

  try {
    const meta = await sharp(input).metadata();
    const srcW = meta.width ?? 0;

    const output = await sharp(input)
      .rotate() // EXIF burilishini qo'llaydi
      .resize(TARGET_W, TARGET_H, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .flatten({ background: "#ffffff" }) // PNG shaffofligini oqqa aylantiradi
      .webp({ quality: 82 })
      .toBuffer();

    const name = `${stamp}.webp`;
    await writeFile(join(dir, name), output);

    return NextResponse.json({
      url: `/uploads/${name}`,
      width: TARGET_W,
      height: TARGET_H,
      bytes: output.length,
      warning:
        srcW && srcW < MIN_SOURCE_W
          ? `Asl rasm kichik (${srcW}px). Sifat uchun kamida ${MIN_SOURCE_W}px kenglik tavsiya etiladi.`
          : undefined,
    });
  } catch {
    return NextResponse.json({ error: "bad_image" }, { status: 422 });
  }
}
