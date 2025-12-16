"use client";

import { useUserApplications } from "./hooks/useUserApplications";


const MyJobs = () => {

    const { data, isLoading } = useUserApplications(1, 10, "ALL");

    if (isLoading) return <div>Loading...</div>;

    const applications = data?.applications ?? [];
    const meta = data?.data;

    return (

        <div>

            <h1>My Applications</h1>

            <p>Total Applications: {meta?.totalAppliedJobs ?? 0}</p>
            <p>Page: {meta?.page}</p>
            <p>Limit: {meta?.limit}</p>
            <p>Status Filter: {meta?.status}</p>

            <hr />

            {applications.length === 0 && <p>No applications found</p>}

            {applications.map((app) => (
                <div key={app.id}>
                    <p>Job Title: {app.job.title}</p>
                    <p>Status: {app.status}</p>
                    <p>Posted User: {app.job.user.name}</p>
                    <p>Applied At: {new Date(app.createdAt).toLocaleString()}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default MyJobs;
