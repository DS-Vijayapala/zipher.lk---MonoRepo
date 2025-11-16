import React from 'react';

type JobDetailsPageProps = {
    params: {
        jobId: string;
    };
};


export default async function JobDetailsPage({ params }:
    { params: Promise<JobDetailsPageProps['params']> }) {

    const { jobId } = await params;

    return (
        <div>
            Job ID: {jobId}
        </div>
    );
}
