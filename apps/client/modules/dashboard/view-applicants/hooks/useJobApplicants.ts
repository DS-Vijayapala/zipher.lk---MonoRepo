import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstence";
import { ApplicationStatus, JobApplication } from "../types";

interface Params {
    page: number;
    limit: number;
    status: ApplicationStatus | "All";
}

interface Response {
    data: JobApplication[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export const useJobApplicants = ({ page, limit, status }: Params) => {
    return useQuery({
        queryKey: ["job-applicants", page, limit, status],
        queryFn: async (): Promise<Response> => {
            const res = await axiosInstance.get("/job-applicants", {
                params: {
                    page,
                    limit,
                    ...(status !== "All" && { status }),
                },
            });

            return res.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    });
};
