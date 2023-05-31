import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';


export const middleware = async (request: NextRequest) => {
    const session = await getToken({ req: request, secret: process.env.JWT_SECRET, secureCookie: true }); 
    if (request.nextUrl.pathname.startsWith("/cart") && session === null) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/orders") && session === null) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}