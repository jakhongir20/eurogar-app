import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { ADMIN_COOKIE, adminToken } from "./lib/admin-auth";

/** Next.js 16: middleware → proxy */
const intl = createMiddleware(routing);

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  /* ── /admin himoyasi ── */
  if (pathname.startsWith("/admin")) {
    const isLogin = pathname === "/admin/login";
    const ok = req.cookies.get(ADMIN_COOKIE)?.value === adminToken();

    if (!ok && !isLogin) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    if (ok && isLogin) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return intl(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/admin/:path*"],
};
