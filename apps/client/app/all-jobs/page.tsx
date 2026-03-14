import AllJobsPage from '@/modules/jobs/all-jobs/page'
import React, { Suspense } from 'react'

const AllJobs = () => {
    return (
        <Suspense fallback={<div className="p-6 text-center">Loading jobs...</div>}>
            <AllJobsPage />
        </Suspense>
    )
}

export default AllJobs