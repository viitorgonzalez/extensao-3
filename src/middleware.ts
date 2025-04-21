import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()

    const supabase = createMiddlewareClient({ req, res })

    const {
        data: {
            session
        }
    } = await supabase.auth.getSession()

    if (!session) {
        if (req.nextUrl.pathname !== '/login') {
            return NextResponse.redirect(new URL('/login', req.url)); 
        }
    }

    if (session && req.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return res
}

// ignore roots with "api, _next/static, _next/image or favicon.ico"
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}
