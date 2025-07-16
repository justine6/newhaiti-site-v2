// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale } from './lib/i18n/settings'; // ✅ import your actual setting

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Ignore static files, API, and favicon
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ✅ Redirect root to default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  // ✅ Redirect top-level /join to default locale
  if (pathname === '/join') {
    return NextResponse.redirect(new URL(`/${defaultLocale}/join`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // ✅ Match all routes except API, _next, static files, and favicon
    '/((?!api|_next|favicon.ico|.*\\..*).*)',
  ],
};
