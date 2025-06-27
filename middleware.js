import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/coming-soon') ||
    pathname === '/' ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/public') ||
    pathname.startsWith('/howitwork') ||// <-- Add this line!
    pathname.startsWith('/services') || // <-- Add this line!
    pathname.startsWith('/plans') ||
    pathname.startsWith('/commercial') ||
    pathname.startsWith('/support') ||
    pathname.startsWith('/auth/login') ||
    pathname.startsWith('/auth/register') ||
    pathname.startsWith('/chat') ||
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/locations') ||
    pathname.startsWith('/orders') ||
    pathname.startsWith('/profile') 


  ) {
    return NextResponse.next();
  }
  return NextResponse.rewrite(new URL('/coming-soon', request.url));
}