"use client"

import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/lib/axiosInstence"

export type ProfileResponse = {
    name?: string
    email: string
    phone?: string
    location?: string
    currentPosition?: string
    description?: string
    socialLinks?: {
        linkedin?: string
        github?: string
        twitter?: string
    }
    resumeUrl?: string | null
}

export function useProfile() {
    const query = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const { data } = await axiosInstance.get<ProfileResponse>(
                "/user/profile/me"
            )
            return data
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1, // safe retry
    })

    return {
        profile: query.data,
        resumeUrl: query.data?.resumeUrl ?? null,
        isLoading: query.isLoading,
        isError: query.isError,
        refetchProfile: query.refetch,
    }
}
