"use client";

import React from "react";
import JobCard from "@/components/shared/JobCard";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Loading from "@/components/shared/Loading";
import Title from "@/components/shared/Title";
import { useJobs } from "@/hooks/useJobs";

interface User {
    image?: string;
    name?: string;
}

interface Job {
    id: string;
    title: string;
    description?: string;
    location: string;
    level: string;
    userID: User;
}

const SampleJobListing: React.FC = () => {

    const navigate = useRouter();

    // Use dynamic useJobs hook → limit = 15 for this page

    const { data, isLoading } = useJobs(1, 6);

    // Extract jobs (fallback to empty array)

    const latestJobs = data?.jobs || [];

    const navigateToAllJobs = () => {
        navigate.push("/all-jobs");
    };

    return (
        <div className={`container 2xl:px-20 mx-auto my-16 px-4`}>

            {/* Header Section */}

            <Title
                title="Newest Opportunities Awaiting You"
                subTitle="Stay updated with the latest job postings and take the next step in your career."
                position="text-center"
            />

            {/* Jobs Grid Section */}

            <section className={`mb-12`}>

                {isLoading ? (

                    <div className={`text-center py-16`}>
                        <Loading />
                    </div>

                ) : latestJobs.length > 0 ? (

                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>

                        {latestJobs.map((job) => (
                            <div
                                key={job.id}
                                className={`transform hover:scale-105 transition-all duration-300`}
                            >
                                <JobCard job={job} key={job.id} />
                            </div>
                        ))}

                    </div>

                ) : (

                    <div className={`text-center py-16`}>
                        <p className={`text-green-700 text-lg`}>
                            No jobs found.
                        </p>
                    </div>

                )}

            </section>

            {/* Call to Action Section */}

            {latestJobs.length > 0 && (

                <div className={`text-center`}>

                    <div className={`max-w-md mx-auto`}>

                        <button
                            onClick={navigateToAllJobs}
                            className={`group inline-flex items-center px-4 py-2 bg-linear-to-r from-emerald-600 
                            to-lime-600 hover:from-emerald-700 hover:to-lime-700 text-white 
                            font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 
                            transition-all duration-300 space-x-3 cursor-pointer`}>

                            <span className={`text-lg`}>View All Jobs</span>

                            <ArrowRight
                                className={`w-5 h-5 group-hover:translate-x-1 
                                    transition-transform duration-300`}
                            />

                        </button>

                    </div>

                </div>

            )}

        </div>

    );

};


export default SampleJobListing;
