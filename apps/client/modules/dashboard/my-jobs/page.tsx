"use client";


import { useUserApplications } from "./hooks/useUserApplications";

const MyJobs = () => {

    const { data, isLoading } = useUserApplications(1, 10, "ALL");

    console.log(data);


    if (isLoading) return <div>Loading...</div>;

    const applications = data?.applications ?? [];
    const total = data?.totalApplications ?? 0;

    return (
        <div>
            <h1>My Applications</h1>
            <p>Total: {total}</p>

            {applications.map((app) => (
                <div key={app.id}>{app.jobId.title}</div>
            ))}
        </div>
    );
};

export default MyJobs;
