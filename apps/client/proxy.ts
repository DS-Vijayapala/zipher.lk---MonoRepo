// Middleware For Authentication and Route Protection

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

export default async function middleware(req: NextRequest) {

    const session = await getSession();

    const { pathname } = req.nextUrl;

    const isLoggedIn = Boolean(session?.user);


    // BLOCK auth pages if user is already logged in

    const authRoutes = ["/auth/login", "/auth/signup", "/auth/register"];

    if (isLoggedIn && authRoutes.includes(pathname)) {

        return NextResponse.redirect(new URL("/", req.url));

    }

    // PROTECT dashboard routes

    if (!isLoggedIn && pathname.startsWith("/dashboard")) {

        return NextResponse.redirect(new URL("/auth/login", req.url));

    }

    // Allow everything else

    return NextResponse.next();

}

export const config = {
    matcher: [
        "/dashboard/:path*", // protected dashboard
        "/auth/login",       // block when logged in
        "/auth/signup",      // block when logged in
    ],
};
