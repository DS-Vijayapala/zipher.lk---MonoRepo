"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {

    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "GET" });
        router.refresh();
        router.push("/auth/login");
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