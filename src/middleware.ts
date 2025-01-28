import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'






export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const publicPaths = ['/login', '/signup', '/verifyemail']
    const protectedPaths = ['/profilepage']
    const token = request.cookies.get('token')?.value || ''
    if (publicPaths.includes(pathname) && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (protectedPaths.includes(pathname) && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/verifyemail',
        '/profilepage',
    ]
}