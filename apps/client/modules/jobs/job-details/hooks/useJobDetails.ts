"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstence";

export interface User {
    id?: string;
    name?: string;
    image?: string;
}

export interface Job {
    id: string;
    title: string;
    description?: string;
    location: string;
    level: string;
    coverImage?: string;
    jobType?: string;
    category?: string;
    requirements?: string[];
    qualifications?: string[];
    createdAt?: string;
    salary?: number;
    visible?: boolean;
    applicationCount?: number;
    user: User;
}

export interface JobDetailsResponse {
    job: Job;
    isApplied: boolean;
    relatedJobs: Job[];
}

async function fetchJobDetails(jobId: string): Promise<JobDetailsResponse> {
    try {
        // axios request
        const res = await axiosInstance.get(`/jobs/job-data/${jobId}`);

        console.log("Job Details Response:", res.data);

        return res.data; // direct return

    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Unable to load job";
        throw new Error(message);
    }
}

export function useJobDetails(jobId: string | undefined) {
    return useQuery({
        queryKey: ["job-details", jobId],
        queryFn: () => fetchJobDetails(jobId!),
        enabled: !!jobId,
        staleTime: 1000 * 60 * 3, // 3-minute cache
        retry: 1,
    });
}
