import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import {
  ADMIN_BASE,
  ADMIN_COOKIE,
  ADMIN_LOGIN,
  verifyAdminToken,
} from "./lib/admin-auth";

/** Next.js 16: middleware → proxy */
const intl = createMiddleware(routing);

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  /* ── Admin panel himoyasi (ADMIN_BASE = /panel/admin) ── */
  if (pathname === "/panel" || pathname.startsWith("/panel/")) {
    const isLogin = pathname === ADMIN_LOGIN;
    const ok = await verifyAdminToken(req.cookies.get(ADMIN_COOKIE)?.value);

    if (!ok && !isLogin) {
      const url = req.nextUrl.clone();
      url.pathname = ADMIN_LOGIN;
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    if (ok && isLogin) {
      const url = req.nextUrl.clone();
      url.pathname = ADMIN_BASE;
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return intl(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/panel/:path*"],
};
