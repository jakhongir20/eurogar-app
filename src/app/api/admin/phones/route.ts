import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/admin-auth";
import {
  PhonesNotMigratedError,
  createSitePhone,
  deleteSitePhone,
  listSitePhones,
  reorderSitePhones,
  updateSitePhone,
} from "@/lib/repo";
import { BRANCH_IDS, normalizePhone } from "@/lib/phones";

/**
 * Kompaniya telefon raqamlari (admin → «Telefon raqamlar»).
 * Har bir o'zgarishdan keyin butun sayt qayta chiziladi: header, footer,
 * filiallar, Aloqa / Kafolat / Maxfiylik sahifalari, OG rasm.
 */

async function guard() {
  const c = await cookies();
  return verifyAdminToken(c.get(ADMIN_COOKIE)?.value);
}

const fail = (error: string, status = 400) =>
  NextResponse.json({ error }, { status });

async function handle(fn: () => Promise<Response>) {
  if (!(await guard())) return fail("unauthorized", 401);
  try {
    return await fn();
  } catch (e) {
    if (e instanceof PhonesNotMigratedError) return fail("not_migrated", 503);
    console.error("[api/admin/phones]", e);
    return fail("server_error", 500);
  }
}

const refreshSite = () => revalidatePath("/", "layout");

/** "" / null → umumiy raqam; noma'lum filial → xato (undefined) */
function parseBranch(v: unknown): string | null | undefined {
  if (v === null || v === "" || v === undefined) return null;
  const s = String(v);
  return BRANCH_IDS.includes(s) ? s : undefined;
}

/** Saytda kamida bitta ko'rinadigan raqam qolishi shart */
async function isLastVisible(id: string) {
  const all = await listSitePhones();
  const target = all.find((p) => p.id === id);
  return Boolean(target && !target.hidden) && all.filter((p) => !p.hidden).length <= 1;
}

export async function GET() {
  return handle(async () => NextResponse.json({ phones: await listSitePhones() }));
}

export async function POST(req: Request) {
  return handle(async () => {
    const body = await req.json().catch(() => ({}));
    const number = normalizePhone(body?.number);
    if (!number) return fail("bad_phone");
    const branchId = parseBranch(body?.branchId);
    if (branchId === undefined) return fail("bad_branch");
    const phone = await createSitePhone({
      number,
      branchId,
      main: Boolean(body?.main),
      hidden: Boolean(body?.hidden),
    });
    refreshSite();
    return NextResponse.json({ phone });
  });
}

/** Bitta raqamni o'zgartirish yoki `{ order: [id, …] }` — tartibni saqlash */
export async function PATCH(req: Request) {
  return handle(async () => {
    const body = await req.json().catch(() => ({}));

    if (Array.isArray(body?.order)) {
      await reorderSitePhones(body.order.map(String).slice(0, 100));
      refreshSite();
      return NextResponse.json({ ok: true });
    }

    const id = String(body?.id ?? "");
    const patch: Parameters<typeof updateSitePhone>[1] = {};

    if (body?.number !== undefined) {
      const number = normalizePhone(body.number);
      if (!number) return fail("bad_phone");
      patch.number = number;
    }
    if (body?.branchId !== undefined) {
      const branchId = parseBranch(body.branchId);
      if (branchId === undefined) return fail("bad_branch");
      patch.branchId = branchId;
    }
    if (body?.main !== undefined) patch.main = Boolean(body.main);
    if (body?.hidden !== undefined) {
      patch.hidden = Boolean(body.hidden);
      if (patch.hidden && (await isLastVisible(id))) return fail("last_visible");
    }

    const phone = await updateSitePhone(id, patch);
    if (!phone) return fail("not_found", 404);
    refreshSite();
    return NextResponse.json({ phone });
  });
}

export async function DELETE(req: Request) {
  return handle(async () => {
    const { id } = await req.json().catch(() => ({}));
    if (await isLastVisible(String(id))) return fail("last_visible");
    const ok = await deleteSitePhone(String(id));
    if (!ok) return fail("not_found", 404);
    refreshSite();
    return NextResponse.json({ ok });
  });
}
