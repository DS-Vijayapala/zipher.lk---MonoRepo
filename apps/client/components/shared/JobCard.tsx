"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MapPin, GraduationCap } from "lucide-react";

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
    user: User;
}

interface OwnerJobCardProps {
    job: Job;
}

const JobCard: React.FC<OwnerJobCardProps> = ({ job }) => {

    const router = useRouter();

    const handleNavigation = (jobId: string) => {

        router.push(`/jobs/all-jobs/${jobId}`);

        window.scrollTo(0, 0);

    };

    return (

        <div
            className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-md transition-all 
            duration-300 overflow-hidden h-full flex flex-col`}>

            {/* Gradient hover overlay */}

            <div className={`absolute inset-0 hover:shadow-xl`} />

            <div className={`relative p-6 flex flex-col h-full`}>

                {/* Header */}
                <div className={`flex items-start justify-between mb-4`}>

                    <div className={`flex items-center gap-3`}>

                        <div className={`relative`}>

                            {job.user?.image ? (

                                <img
                                    src={job.user.image}
                                    alt="Company"
                                    className={`h-12 w-20 rounded-full object-cover ring-2 ring-lime-100`}
                                />

                            ) : (

                                <div
                                    className={`h-12 w-20 rounded-full ring-2 ring-lime-100 bg-green-700 
                                    flex items-center justify-center text-white font-semibold text-lg`}>
                                    {job.user?.name ? job.user.name.charAt(0).toUpperCase() : "C"}
                                </div>

                            )}


                        </div>

                        <div>

                            <h3 className={`text-lg font-semibold text-green-900 line-clamp-2`}>

                                {job.title}

                            </h3>

                            <p className={`text-sm text-green-700`}>

                                {job.user?.name || "Company Name"}

                            </p>

                        </div>

                    </div>

                </div>

                {/* Tags */}

                <div className={`flex flex-wrap gap-2 items-center mb-4 text-xs font-medium`}>

                    <div className={`flex items-center px-3 py-1.5 bg-lime-100
                         text-green-800 rounded-xl`}>

                        <MapPin className={`w-3 h-3 mr-1.5`} />
                        {job.location}

                    </div>

                    <div className={`flex items-center px-3 py-1.5 bg-blue-100
                         text-blue-800 rounded-xl`}>

                        <GraduationCap className={`w-3 h-3 mr-1.5`} />
                        {job.level}

                    </div>

                </div>

                {/* Description */}

                <div className={`text-sm text-slate-800 leading-relaxed line-clamp-3 mb-6`}>

                    {job.description
                        ? job.description.replace(/<[^>]*>/g, "").slice(0, 120) + "..."
                        : "No description available."}

                </div>

                {/* Button ALWAYS stays at bottom */}

                <div className={`mt-auto`}>

                    <button
                        onClick={() => handleNavigation(job.id)}
                        className={`w-full bg-green-700 hover:bg-green-800
                             text-white cursor-pointer text-sm font-medium 
                             px-4 py-2.5 rounded-xl transition active:scale-95`}>

                        Apply Now

                    </button>

                </div>

            </div>

        </div>

    );

};


export default JobCard;
