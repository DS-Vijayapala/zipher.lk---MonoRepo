"use client";

import React from "react";
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, MapPin, Bookmark, User, BookmarkPlus, Star, CheckCircle } from "lucide-react";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import axiosInstance from "@/lib/axiosInstence";
import { useJobDetails } from "@/modules/jobs/job-details/hooks/useJobDetails";
import JobCard from "@/components/shared/JobCard";
import Loading from "@/components/shared/Loading";
import { SessionPayload } from "@/lib/session";
import { useUser } from "@/hooks/useUser";
import { Toggle } from "@/components/ui/toggle";
import MotivationalHeader from "./components/MotivationalHeader";

interface Props {
    id: string;
}

/**
 * JobDetailsAndApply
 * Final clean version
 */
export default function JobDetailsAndApply({ id }: Props) {

    const qc = useQueryClient();

    const router = useRouter();

    const { data: session } = useUser();

    const isSaved = false; // dummy for now

    // fetch job details
    const { data, isLoading, isError } = useJobDetails(id);

    // loading state
    if (isLoading) return <Loading />;

    if (isError || !data) {
        console.log("Job load error:", id); // test log
        return <div className="p-10 text-center">Unable to load job.</div>;
    }

    const { job, relatedJobs, isApplied } = data;

    console.log("Job details:", job); // test log

    // ---------- Add to list mutation ----------
    // const addToList = useMutation({
    //     // mutationFn: async () => {
    //     //     console.log("addToList clicked:", job.id); // test log
    //     //     // try real API first
    //     //     try {
    //     //         const res = await axiosInstance.post(`/api/v2/jobs/${job.id}/add-to-list`);
    //     //         console.log("addToList response:", res.data); // test log
    //     //         return res.data;
    //     //     } catch (err) {
    //     //         // API not implemented → simulate success
    //     //         console.warn("addToList API failed, using dummy fallback"); // test log
    //     //         await new Promise((r) => setTimeout(r, 500));
    //     //         return { ok: true };
    //     //     }
    //     // },
    //     // onSuccess: () => {
    //     //     toast.success("Added to list"); // user feedback
    //     //     // small comment: refresh queries
    //     //     // qc.invalidateQueries(["job-details", id]);
    //     // },
    //     // onError: (err: any) => {
    //     //     console.error("addToList error:", err);
    //     //     toast.error("Failed to add to list");
    //     // },
    // });

    // ---------- Apply mutation ----------
    // const apply = useMutation({
    //     // mutationFn: async () => {
    //     //     console.log("apply clicked:", job.id); // test log
    //     //     try {
    //     //         const res = await axiosInstance.post(`/api/v2/jobs/${job.id}/apply`);
    //     //         console.log("apply response:", res.data); // test log
    //     //         return res.data;
    //     //     } catch (err) {
    //     //         console.warn("apply API failed, using dummy fallback"); // test log
    //     //         await new Promise((r) => setTimeout(r, 700));
    //     //         return { ok: true };
    //     //     }
    //     // },
    //     // onSuccess: () => {
    //     //     toast.success("Application sent");
    //     //     qc.invalidateQueries(["job-details", id]);
    //     // },
    //     // onError: (err: any) => {
    //     //     console.error("apply error:", err);
    //     //     toast.error("Failed to apply");
    //     // },
    // });

    // ---------- UI ----------

    return (

        <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-6">

            {/* Main column */}

            <div>

                {/* Header Section */}

                <Card className="overflow-hidden">

                    <div className="relative">

                        {/* COVER Message */}

                        <div>
                            <MotivationalHeader />
                        </div>

                        {/* CONTENT */}

                        <div className="p-4 md:p-6">

                            {/* TOP SECTION */}

                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                                {/* LEFT: Avatar + Title */}

                                <div className="flex items-center md:items-start gap-4">

                                    <Avatar className="min-w-12 min-h-12">
                                        <AvatarImage src={job.user?.image ?? ""} />
                                        <AvatarFallback>
                                            <User size={16} />
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex flex-col gap-1">
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold leading-snug wrap-break-word">
                                            {job.title}
                                        </h2>
                                    </div>

                                </div>

                                {/* RIGHT: Actions */}

                                <div className="flex flex-wrap md:flex-nowrap items-center md:items-start gap-2">

                                    {session ? (

                                        <>

                                            {/* SAVE JOB ICON */}
                                            <Toggle
                                                className="p-2 rounded-md border hover:bg-green-50 flex items-center justify-center cursor-pointer"
                                            //  onClick={() => addToList.mutate()}
                                            >
                                                {isSaved ? (
                                                    <Bookmark className="text-green-600" size={18} />
                                                ) : (
                                                    <BookmarkPlus className="text-green-400" size={18} />
                                                )}
                                            </Toggle>

                                            <Button
                                                size="sm"
                                                className="w-full md:w-auto"
                                            // onClick={() => apply.mutate()}
                                            >
                                                {isApplied ? "Already Applied" : "Apply"}
                                            </Button>

                                        </>

                                    ) : (

                                        <Button
                                            size="sm"
                                            className="w-full md:w-auto"
                                            onClick={() => router.push("/auth/login")}
                                        >
                                            Login to Apply
                                        </Button>

                                    )}

                                </div>

                            </div>

                            {/* INFO BADGES */}

                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

                                <div className="p-3 bg-green-50 rounded-md">
                                    <div className="text-xs text-green-800">Company</div>
                                    <div className="font-medium">{job.user?.name}</div>
                                </div>

                                <div className="p-3 bg-green-50 rounded-md">
                                    <div className="text-xs  text-green-800">Location</div>
                                    <div className="font-medium">{job.location}</div>
                                </div>

                                <div className="p-3 bg-green-50 rounded-md">
                                    <div className="text-xs  text-green-800">Level</div>
                                    <div className="font-medium">{job.level}</div>
                                </div>


                                <div className="p-3 bg-green-50 rounded-md">
                                    <div className="text-xs  text-green-800">Job Type</div>
                                    <div className="font-medium">{job.jobType ?? "Full Time"}</div>
                                </div>

                                <div className="p-3 bg-green-50 rounded-md">
                                    <div className="text-xs  text-green-800">Salary</div>
                                    <div className="font-medium">{job.salary === 0 ? "Competitive" : job.salary}</div>
                                </div>

                            </div>

                        </div>

                    </div>

                </Card>


                <div className="flex flex-col md:flex-row md:gap-6">

                    {/* LEFT SIDE — Description (8/12) */}
                    <div className="w-full md:w-8/12 mt-5 md:mt-10">

                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle className="text-green-800">Job Description</CardTitle>
                                <CardDescription>Read the full role details</CardDescription>
                            </CardHeader>

                            <CardContent>

                                <p className="text-sm leading-relaxed whitespace-pre-line ">
                                    {job.description}
                                </p>

                                <div>
                                    <h3 className="text-md font-semibold mt-6 mb-2 text-green-800"> Daily Tasks</h3>
                                    <p className="text-sm leading-relaxed whitespace-pre-line">
                                        {job.requirements?.join("\n")}
                                    </p>
                                </div>


                                <div>
                                    <h3 className="text-md font-semibold mt-6 mb-2 text-green-800">Requirements</h3>
                                    <p className="text-sm leading-relaxed whitespace-pre-line">
                                        {job.qualifications?.join("\n")}
                                    </p>
                                </div>


                            </CardContent>

                            <CardFooter className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">
                                    Posted {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Recently"}
                                </span>

                                {session && (
                                    <Button size="sm">
                                        {isApplied ? "Already Applied" : "Apply Now"}
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>

                    </div>

                    {/* RIGHT SIDE — More From + Tips (4/12) */}
                    <div className="w-full md:w-4/12 mt-4 md:mt-4">

                        {/* MORE FROM */}
                        <h3 className="text-lg font-semibold mb-3 text-green-800">
                            More from {job.user?.name}
                        </h3>

                        {/* Make job cards show 1 per row on mobile, 1 per row on MD (no 2 columns) */}
                        <div className="grid grid-cols-1 gap-4 mb-6">
                            {relatedJobs?.slice(0, 2).map((r: any) => (
                                <JobCard
                                    key={r.id}
                                    job={{
                                        id: r.id,
                                        title: r.title,
                                        location: r.location,
                                        level: r.level,
                                        createdAt: r.createdAt,
                                        jobType: r.jobType,
                                        description: r.title,
                                        category: r.category,
                                        user: {
                                            image: r.user?.image,
                                            name: r.user?.name,
                                        },
                                    }}
                                />
                            ))}
                        </div>


                        {/* APPLICATION TIPS */}

                        <aside className="mt-6">

                            <Card className="rounded-2xl border border-blue-200 bg-blue-50/40 shadow-sm">

                                <CardHeader className="pb-2 flex flex-row items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
                                        <Star className="w-5 h-5 text-blue-600" />
                                    </div>

                                    <CardTitle className="text-base md:text-lg text-green-900">
                                        Application Tips
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="text-sm text-slate-700 space-y-4 mt-2">

                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-3 h-3 text-green-600 mt-0.5" />
                                        <span>Customize your resume to highlight relevant skills</span>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-3 h-3 text-green-600 mt-0.5" />
                                        <span>Write a compelling cover letter</span>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-3 h-3 text-green-600 mt-0.5" />
                                        <span>Research the company culture and values</span>
                                    </div>

                                </CardContent>
                            </Card>

                        </aside>

                    </div>

                </div>

            </div>

        </div>

    );

}
