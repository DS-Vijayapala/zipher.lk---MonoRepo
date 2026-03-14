import { deleteSession, getSession, updateSessionTokens } from "@/lib/session";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getSession();

    if (!session?.refreshToken) {
        return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
            { refresh: session.refreshToken },
            { headers: { "Content-Type": "application/json" } }
        );

        const { accessToken, refreshToken } = response.data;

        await updateSessionTokens({ accessToken, refreshToken });

        return NextResponse.json({
            accessToken,
            refreshToken,
            message: "Token refreshed successfully",
        });
    } catch (error: any) {
        await deleteSession();
        return NextResponse.json(
            { error: error.response?.data?.message || "Refresh failed" },
            { status: 401 }
        );
    }
}