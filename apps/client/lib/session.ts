"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
}

export type SessionPayload = {
    user: {
        id: string;
        name: string;
        role: Role;
    };
    accessToken: string;
    refreshToken: string;
};

const secret = new TextEncoder().encode(process.env.SESSION_SECRET_KEY);

const SESSION_NAME = "session-token";

const EXPIRES_IN = "7d"; // or "1h" if shorter auth needed

// Create Session Cookie

export async function createSession(payload: SessionPayload) {

    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(EXPIRES_IN)
        .sign(secret);

    (await cookies()).set(SESSION_NAME, token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });
}
export async function getSession(): Promise<SessionPayload | null> {

    const cookie = (await cookies()).get(SESSION_NAME)?.value;

    if (!cookie) return null;

    try {

        const { payload } = await jwtVerify(cookie, secret);

        return payload as SessionPayload;

    } catch {

        return null;

    }
}

export async function deleteSession() {

    (await cookies()).set(SESSION_NAME, "", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 0,
    });

}

export async function updateSessionTokens(
    { accessToken, refreshToken }: { accessToken: string; refreshToken: string; }) {

    const cookie = (await cookies()).get(SESSION_NAME)?.value;

    if (!cookie) return;

    const { payload } = await jwtVerify(cookie, secret);

    if (!payload) throw new Error("Invalid session payload");

    const newPayload: SessionPayload = {
        user: {
            id: (payload as SessionPayload).user.id,
            name: (payload as SessionPayload).user.name,
            role: (payload as SessionPayload).user.role,
        },
        accessToken,
        refreshToken
    };

    await createSession(newPayload);
}
