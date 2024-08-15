import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next({
        request: {
            headers: new Headers(request.headers),
        },
    })
    response.headers.set('x-url', request.url)
    return response
}

export const config = {
    matcher: [
        // Match any requests but not css or js files
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};