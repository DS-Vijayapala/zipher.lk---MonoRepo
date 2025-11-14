import { createSession, Role } from "@/lib/session";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url)

    const accessToken = searchParams.get("accessToken")

    const refreshToken = searchParams.get("refreshToken")

    const userId = searchParams.get("userId")

    const name = searchParams.get("name")

    const role = searchParams.get("role")

    const email = searchParams.get("email")

    if (!accessToken || !refreshToken || !userId || !name || !role || !email) {

        throw new Error("Google Auth Failed");
    }

    await createSession({
        user: {
            id: userId,
            email: email,
            name: name,
            role: role as Role,
        },
        accessToken,
        refreshToken
    })

    redirect("/")
}