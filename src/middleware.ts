import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    if(request.cookies.get('username')?.value?.length && request.nextUrl.pathname === '/start') {
        return NextResponse.redirect(new URL('/pokemon', request.url));
    }
}