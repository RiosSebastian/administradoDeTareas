import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Si el usuario tiene token y trata de entrar a Login/Register, mándalo al Dashboard
  if (token && (pathname === '/login' || pathname === '/register' || pathname === '/')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. Si el usuario NO tiene token y trata de entrar a algo que no sea Login/Register, mándalo al Login
  if (!token && pathname !== '/login' && pathname !== '/register') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Aplicar a todas las rutas excepto archivos estáticos (imágenes, favicon, etc)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};