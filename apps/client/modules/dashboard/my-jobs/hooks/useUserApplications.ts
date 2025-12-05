"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstence";
import { toast } from "react-hot-toast";
import { StatusType, UserApplicationsResponse } from "../type";

/* ------------------ Fetch Function ------------------ */

const fetchUserApplications = async (
    page: number,
    limit: number,
    status: StatusType
): Promise<UserApplicationsResponse> => {

    try {

        const params = new URLSearchParams();

        params.set("page", String(page));
        params.set("limit", String(limit));
        params.set("status", status);

        const res = await axiosInstance.get(
            `/jobs/job-applications?${params.toString()}`
        );

        if (!res.data.success) {
            throw new Error(res.data.message || "Failed to load applications");
        }

        return res.data;

    } catch (err: any) {
        const msg =
            err?.response?.data?.message ||
            err?.message ||
            "Failed to fetch job applications";

        toast.error(msg);
        throw err;
    }

};

/* ------------------ Hook ------------------ */

export const useUserApplications = (
    page: number = 1,
    limit: number = 10,
    status: StatusType = "ALL"
) => {
    return useQuery({

        queryKey: ["user-applications", page, limit, status],
        queryFn: () => fetchUserApplications(page, limit, status),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
    });
};
