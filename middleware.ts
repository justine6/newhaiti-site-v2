// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Exclude static files and favicon
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
    return NextResponse.redirect(new URL('/en', request.url));
  }

  return NextResponse.next();
}

// ✅ Ensure matcher avoids static files
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
