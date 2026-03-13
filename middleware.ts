import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

const protectedRoutes = ['/dashboard', '/music', '/lessons', '/contact'];

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const isProtected = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  if (isProtected && !user) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/music/:path*', '/lessons/:path*', '/contact/:path*'],
};
