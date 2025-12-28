import { mockApplicants } from "../mockApplicants";
import { ApplicationStatus, JobApplication } from "../types";

interface FetchParams {
    status: ApplicationStatus | "All";
    page: number;
    limit: number;
}

export const fetchApplicants = async ({
    status,
    page,
    limit,
}: FetchParams): Promise<{
    data: JobApplication[];
    total: number;
    totalPages: number;
}> => {
    await new Promise((r) => setTimeout(r, 600)); // latency

    let filtered =
        status === "All"
            ? mockApplicants
            : mockApplicants.filter((a) => a.status === status);

    // sort latest first (like backend)
    filtered = [...filtered].reverse();

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);

    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return { data, total, totalPages };
};
