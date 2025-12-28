import { JobApplication } from "./types";

export const mockApplicants: JobApplication[] = Array.from(
    { length: 23 },
    (_, i) => ({
        _id: String(i + 1),
        status:
            i % 3 === 0 ? "Pending" : i % 3 === 1 ? "Accepted" : "Rejected",
        userId: {
            id: `u${i + 1}`,
            name: `Applicant ${i + 1}`,
            email: `user${i + 1}@example.com`,
            image: `https://i.pravatar.cc/150?img=${i + 1}`,
            resume: "#",
        },
        jobId: {
            id: `j${i + 1}`,
            title: i % 2 === 0 ? "Frontend Developer" : "Backend Engineer",
            location: i % 2 === 0 ? "Colombo" : "Remote",
        },
    })
);
