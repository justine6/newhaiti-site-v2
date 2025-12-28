// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  isSupportedLocale,
} from "@/lib/i18n/settings";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip Next internals & static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // ✅ Check if path already has a locale prefix: /en, /fr, /ht, /es
  const hasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  // ✅ Decide locale (cookie → Accept-Language → default)
  const cookieLocale = req.cookies.get("locale")?.value ?? "";
  const headerLocale = req.headers.get("accept-language") ?? "";

  let locale: string = DEFAULT_LOCALE;

  if (isSupportedLocale(cookieLocale)) {
    locale = cookieLocale.toLowerCase();
  } else if (headerLocale) {
    const preferred = headerLocale.split(",")[0]?.split("-")[0]?.toLowerCase() ?? "";
    if (isSupportedLocale(preferred)) {
      locale = preferred;
    }
  }

  // Only redirect the bare root `/`
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  // Any other non-localized path: just continue
  return NextResponse.next();
}

// Limit middleware to paths where it makes sense
export const config = {
  matcher: ["/", "/((?!_next|api|static|images|favicon.ico).*)"],
};
