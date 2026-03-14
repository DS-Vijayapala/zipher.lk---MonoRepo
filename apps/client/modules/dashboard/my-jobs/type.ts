export const STATUS = ["ALL", "Pending", "Accepted", "Rejected"] as const;

export type StatusType = (typeof STATUS)[number];

interface User {
    name: string;
    image: string;
}

export interface JobSummary {
    id: string;
    title: string;
    user: User;
    level: string;
    location: string;
    category: string;
    description: string;
    salary: string;
}

export interface JobApplication {
    id: string;
    status: "Pending" | "Accepted" | "Rejected";
    createdAt: string;
    updatedAt: string;

    jobId: string;
    job: JobSummary;

    userId: string;
    user: User;
}

export interface UserApplicationsMeta {
    page: number;
    limit: number;
    allpages: number;
    status: "ALL" | "Pending" | "Accepted" | "Rejected";
    totalAppliedJobs: number;
}

export interface UserApplicationsResponse {
    success: boolean;
    message?: string;
    applications: JobApplication[];
    data: UserApplicationsMeta;
}
