"use client";

import React, { useEffect, useState, useMemo } from "react";
import Title from "@/components/shared/Title";
import Footer from "@/components/shared/Footer";
import JobCard from "@/components/shared/JobCard";
import FilterPanel from "@/modules/jobs/components/FilterPanal";
import { Button } from "@/components/ui/button";
import { useJobs } from "@/hooks/useJobs";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/shared/Loading";
import { NotFoundCard } from "@/components/shared/NotFoundCard";
import ErrorMessage from "@/components/shared/Error";
import { TitleSearchSchema } from "./validations/SearchSchema";

const AllJobsPage = () => {

    const [page, setPage] = useState<number>(1);

    const limit = 15;

    const searchParams = useSearchParams();

    // Build filters from URL params (memoized)

    const filters = useMemo(() => ({
        title: searchParams.get("title") || "",
        location: searchParams.get("location") || "",
        category: searchParams.get("category") || "",
        level: searchParams.get("level") || "",
    }), [searchParams]);

    // Detect if user is filtering

    const hasFilters = useMemo(() => {

        return (
            filters.title ||
            filters.location ||
            filters.category ||
            filters.level
        );

    }, [filters]);

    // Fetch jobs using the GLOBAL HOOK (unchanged behavior)

    const { data, isLoading, isError } = useJobs(
        page,
        limit,
        hasFilters ? filters : {}
    );

    const jobs = data?.jobs || [];

    const totalPages = data?.totalPages || 1;

    // Auto-scroll to top when pagination changes

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    return (

        <div className=" w-full flex flex-col items-center bg-white dark:bg-black">

            <div className="w-full max-w-6xl px-4 pt-10">

                {/* Page Title */}

                <Title
                    title="Latest Talents"
                    subTitle="Find your next career opportunity here."
                />

                {/* FILTER PANEL */}

                <FilterPanel />

                {/* JOB LISTING */}

                <div className="mt-10">

                    {isLoading && <Loading />}

                    {isError && (
                        <ErrorMessage
                            title="Failed to load jobs"
                            messages="An unexpected error occurred."
                        />
                    )}

                    {!isLoading && !isError && jobs.length === 0 && (
                        <NotFoundCard />
                    )}

                    {jobs.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobs.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    )}

                </div>

                {/* PAGINATION */}

                <div className="flex justify-center items-center gap-4 mt-10">

                    <Button
                        variant="outline"
                        className="border-green-400 text-green-700 hover:bg-green-100 cursor-pointer"
                        disabled={page === 1}
                        onClick={() => setPage((prev) => Math.max(1, prev - 1))}>
                        Previous
                    </Button>

                    <span className="text-green-800 font-semibold">
                        Page {page} of {totalPages}
                    </span>

                    <Button
                        className="bg-green-700 hover:bg-green-800 text-white cursor-pointer"
                        disabled={page === totalPages}
                        onClick={() => setPage((prev) => prev + 1)}>
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