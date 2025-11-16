// app/jobs/page.tsx (Production Ready)

"use client";

import React, { useState } from "react";
import Title from "@/components/shared/Title";
import Footer from "@/components/shared/Footer";
import JobCard from "@/components/shared/JobCard";
import FilterPanel from "@/modules/jobs/components/FilterPanal";
import { Button } from "@/components/ui/button";
import { useJobs } from "@/hooks/useJobs";
import Loading from "@/components/shared/Loading";

const AllJobsPage = () => {
    const [page, setPage] = useState<number>(1);
    const limit = 15; // production perPage

    const { data, isLoading, isError } = useJobs(page, limit);

    const jobs = data?.jobs || [];
    const totalPages = data?.totalPages || 1;

    return (

        <div className="min-h-screen w-full flex flex-col items-center bg-white dark:bg-black">

            <div className="w-full max-w-6xl px-4 pt-10">

                {/* Title */}
                <Title
                    title="Latest Talents"
                    subTitle="Find your next career opportunity here."
                />

                {/* Filter Component */}

                <FilterPanel />

                {/* Job Listing */}

                <div className="mt-10">

                    {isLoading && (
                        <Loading />
                    )}

                    {isError && (
                        <p className="text-center text-red-500">Failed to load jobs.</p>
                    )}

                    {!isLoading && jobs.length === 0 && (
                        <p className="text-center text-green-800 font-medium">No jobs found.</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {jobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}

                    </div>

                </div>

                {/* Pagination */}

                <div className="flex justify-center items-center gap-4 mt-10">

                    <Button
                        variant="outline"
                        className="border-green-400 text-green-700 hover:bg-green-100 cursor-pointer"
                        disabled={page === 1}
                        onClick={() => {
                            setPage((prev) => Math.max(1, prev - 1));
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}>
                        Previous
                    </Button>

                    <span className="text-green-800 font-semibold">
                        Page {page} of {totalPages}
                    </span>

                    <Button
                        className="bg-green-700 hover:bg-green-800 text-white cursor-pointer"
                        disabled={page === totalPages}
                        onClick={() => {
                            setPage((prev) => prev + 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}>
                        Next
                    </Button>

                </div>


            </div>

            <div className="w-full mt-10">
                <Footer />
            </div>

        </div>

    );

};


export default AllJobsPage;