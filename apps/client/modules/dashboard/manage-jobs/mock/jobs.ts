import { Job } from "../types"

const ALL_JOBS: Job[] = Array.from({ length: 23 }).map((_, i) => ({
    id: String(i + 1),
    title: `Job Position ${i + 1}`,
    postedAt: "2024-11-12",
    location: i % 2 === 0 ? "Colombo" : "Remote",
    applicants: Math.floor(Math.random() * 30),
    visible: i % 3 !== 0,
}))

export interface PaginatedJobs {
    data: Job[]
    total: number
    page: number
    limit: number
}

export const fetchJobs = async (
    page: number,
    limit: number
): Promise<PaginatedJobs> => {
    await new Promise((r) => setTimeout(r, 500))

    const start = (page - 1) * limit
    const end = start + limit

    return {
        data: ALL_JOBS.slice(start, end),
        total: ALL_JOBS.length,
        page,
        limit,
    }
}

export const toggleVisibility = async (_id: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 300))
}
