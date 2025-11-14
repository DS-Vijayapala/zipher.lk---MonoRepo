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
    createdAt: string;
    user: User;
}

export interface JobsResponse {
    success: boolean;
    currentPage: number;
    perPage: number;
    totalJobs: number;
    totalPages: number;
    jobs: Job[];
}

const fetchJobs = async (page: number, limit: number): Promise<JobsResponse> => {

    const res = await axiosInstance.get(`/jobs/all-jobs?page=${page}&limit=${limit}`);

    return res.data;

};

export const useJobs = (page: number = 1, limit: number = 10) => {

    return useQuery({

        queryKey: ["jobs", page, limit],

        queryFn: () => fetchJobs(page, limit),

        // Cache for 5 minutes

        staleTime: 5 * 60 * 1000,

        gcTime: 5 * 60 * 1000,

        refetchOnWindowFocus: false,

        retry: 1,

    });

};
