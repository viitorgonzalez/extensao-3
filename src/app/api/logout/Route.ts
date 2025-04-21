import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    // Corrigido: criando o cliente Supabase corretamente
    const supabase = createMiddlewareClient({ req, res });

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        if (req.nextUrl.pathname !== '/auth') {
            return NextResponse.redirect(new URL('/auth', req.url));
        }
    }

    if (session && req.nextUrl.pathname === '/auth') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return res;
}

// Ignore routes with "api, _next/static, _next/image or favicon.ico"
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
