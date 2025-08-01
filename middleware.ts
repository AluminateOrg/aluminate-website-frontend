// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply to /admin/(protected) routes
  const isProtectedAdmin = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');

  const token = request.cookies.get('token')?.value;

  if (isProtectedAdmin && !token) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect logged-in users away from login page
  if (pathname === '/admin/login' && token) {
    return NextResponse.redirect(new URL('/admin/profile', request.url)); // or your admin home
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // run middleware only for /admin
};
