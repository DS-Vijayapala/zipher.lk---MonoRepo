export type ApplicationStatus = "Pending" | "Accepted" | "Rejected";

export interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    resume?: string;
}

export interface Job {
    id: string;
    title: string;
    location: string;
}

export interface JobApplication {
    _id: string;
    userId: User;
    jobId: Job;
    status: ApplicationStatus;
}
