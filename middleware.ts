import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    const isProtected =
        request.nextUrl.pathname.startsWith("/my-bookings") ||
        request.nextUrl.pathname.startsWith("/events/create") ||
        request.nextUrl.pathname.startsWith("/my-events");

    if (isProtected) {

        const token = request.cookies.get("auth_token")?.value;

        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        try {
            const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_dev_password");
            await jwtVerify(token, secretKey);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/my-bookings/:path*", "/events/create", "/my-events/:path*"],
};
