// hooks/useUser.ts
import { useQuery } from "@tanstack/react-query";

export function useUser() {
    return useQuery({
        queryKey: ["user-session"],
        queryFn: async () => {
            const res = await fetch("/api/session", {
                method: "GET",
                credentials: "include", // send cookies to the server
            });

            if (!res.ok) throw new Error("Failed to fetch session");

            const data = await res.json();

            return data.session ?? null;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
