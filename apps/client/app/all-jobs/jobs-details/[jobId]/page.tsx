
import JobDetailsAndApply from '@/modules/jobs/job-details/page';


type JobDetailsPageProps = {
    params: {
        jobId: string;
    };
};


export default async function JobDetailsPage({ params }:

    { params: Promise<JobDetailsPageProps['params']> }) {

    const { jobId } = await params;

    return <JobDetailsAndApply id={jobId} />;
}
