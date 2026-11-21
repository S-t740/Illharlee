import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Check for non-empty Supabase auth tokens in cookies
    const hasAuthToken = request.cookies.getAll().some(
      (cookie) =>
        cookie.name.includes('sb-') &&
        (cookie.name.includes('-auth-token') || cookie.name.includes('auth-token')) &&
        Boolean(cookie.value && cookie.value.trim().length > 0)
    );

    if (!hasAuthToken) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
