"use client";

import axiosInstance from "@/lib/axiosInstence";
import { useRouter } from "next/navigation";

export default function LogoutButton() {

    const router = useRouter();

    const handleLogout = async () => {
        try {
            await Promise.all([
                axiosInstance.post("/auth/signout"),
                fetch("/api/auth/logout", { method: "GET" })
            ]);

            router.push("/auth/login");

        } catch (error) {

            console.error("Logout failed:", error);

            router.push("/auth/login");

        }

    };

    return (

        <button
            onClick={handleLogout}
            className="bg-white hover:bg-purple-200 border border-gray-300 px-9 py-2
                 rounded-full active:scale-95 transition-all hidden md:inline cursor-pointer"
        >
            Log out
        </button>
    );
}