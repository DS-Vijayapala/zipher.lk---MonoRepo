"use server";

import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export type Session = {

    user: {
        id: string;
        name: string;
    }
    // accessToken: string;
    // refreshToken: string;
};

const secretKey = process.env.SESSION_SECRET_KEY!;

export async function createSession(payload: Session) {

    const expireAt = new Date();
    expireAt.setDate(expireAt.getDate() + 7); // 7 days

    const session = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expireAt)
        .sign(new TextEncoder()
            .encode(secretKey));

    const cookieStore = await cookies();

    cookieStore.set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expireAt,
        sameSite: "lax",
        path: "/"
    });

}

export async function getSession() {

    const cookieStore = await cookies();

    const token = cookieStore.get("session")?.value;

    if (!token) return null;

    try {

        const encodedKey = new TextEncoder().encode(secretKey);

        const { payload } = await jwtVerify(token, encodedKey, {
            algorithms: ['HS256'],
        });

        return payload as Session;

    } catch (error) {

        console.error("Invalid or expired session:", error);

        redirect('/auth/login');

        return null;

    }

}