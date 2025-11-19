"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstence";

interface User {
    image?: string;
    name?: string;
}

export interface Job {
    id: string;
    title: string;
    category?: string;
    description?: string;
    location: string;
    level: string;
    salary?: number;
    jobType?: string;
    createdAt: string;
    user: User;
    applicationCount: number;
}

export interface JobsResponse {
    success: boolean;
    currentPage: number;
    perPage: number;
    totalJobs: number;
    totalPages: number;
    jobs: Job[];
}

const fetchJobs = async (
    page: number,
    limit: number,
    filters?: Record<string, string>
): Promise<JobsResponse> => {

    const params = new URLSearchParams();

    params.set("page", String(page));
    params.set("limit", String(limit));

    // Add filters if present

    if (filters) {

        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });

    }

    const res = await axiosInstance.get(`/jobs/all-jobs?${params.toString()}`);

    return res.data;

};

export const useJobs = (
    page: number = 1,
    limit: number = 10,
    filters: Record<string, string> = {}
) => {

    return useQuery({

        queryKey: ["jobs", page, limit, filters],

        queryFn: () => fetchJobs(page, limit, filters),

        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,

    });

};
