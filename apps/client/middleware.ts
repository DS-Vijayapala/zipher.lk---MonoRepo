import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";


export default async function middleware(req: NextRequest) {

    // Middleware logic can be added here if needed

    const session = await getSession();

    if (!session?.user || !session) {

        return NextResponse.redirect(new URL('/auth/login', req.url));

    }

    return NextResponse.next();

}

export const config = {
    matcher: ['/dashboard/:path*'],
};