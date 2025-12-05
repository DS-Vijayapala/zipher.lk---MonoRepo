export const STATUS = ["ALL", "Pending", "Accepted", "Rejected"] as const;

export type StatusType = (typeof STATUS)[number];

interface User {
    name: string;
    image: string;
}

export interface JobApplication {
    id: string;
    status: string;
    date: string;
    jobId: {
        title: string;
        location: string;
        userID: User;
    };
}

export interface UserApplicationsResponse {
    success: boolean;
    message?: string;
    currentPage: number;
    perPage: number;
    totalApplications: number;
    totalPages: number;
    applications: JobApplication[];
}