"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    MapPin,
    GraduationCap,
    Tag,
    Users,
    CalendarDays,
    Briefcase,
} from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

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
    jobType?: string;
    category?: string;
    createdAt?: string;
    applicationCount?: number;
    user: User;
}

interface OwnerJobCardProps {
    job: Job;
}

const JobCard: React.FC<OwnerJobCardProps> = ({ job }) => {

    const router = useRouter();

    const trimmedTitle =
        job.title.length > 30 ? job.title.substring(0, 30) + "..." : job.title;

    return (

        <Card className="relative bg-white rounded-2xl shadow-md 
        hover:shadow-lg transition-all duration-300 flex 
        flex-col min-h-[350px] h-full">

            {/* FLOATING LEVEL BADGE */}

            <div className="absolute top-4 right-4 z-10">

                <Badge className="px-3 py-1 bg-blue-100 text-blue-800 rounded-xl flex 
                items-center text-xs shadow-sm">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    {job.level}
                </Badge>

            </div>

            <CardContent className="p-6 flex flex-col justify-between h-full">

                {/* TOP SECTION */}

                <div className="flex flex-col gap-4">

                    {/* Avatar + Title */}

                    <div className="flex justify-between items-start">

                        <div className="flex items-start gap-3">

                            <Avatar className="h-12 w-12 border shadow-sm">

                                <AvatarImage src={job.user?.image} />
                                <AvatarFallback className="bg-green-700 text-white">
                                    {job.user?.name?.charAt(0)?.toUpperCase() ?? "C"}
                                </AvatarFallback>

                            </Avatar>

                            <div>

                                <h3 className="text-lg font-semibold text-green-900 leading-tight line-clamp-1">
                                    {trimmedTitle}
                                </h3>

                                <p className="text-sm text-green-700">
                                    {job.user?.name || "Company Name"}
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* LOCATION + CATEGORY (two items) */}

                    <div className="flex items-center gap-3 w-full">

                        <div className="flex-1">

                            <Badge className="px-3 py-1.5 bg-lime-100 text-green-800 rounded-xl w-full flex items-center text-xs">
                                <MapPin className="w-3 h-3 mr-1" />
                                {job.location}
                            </Badge>

                        </div>

                        {job.category && (

                            <Badge className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-xl flex items-center text-xs">
                                <Tag className="w-3 h-3 mr-1" />
                                {job.category}
                            </Badge>

                        )}

                    </div>

                    {/* TYPE + USERS APPLIED */}

                    <div className="flex justify-between items-center">

                        <div>

                            <Badge className="px-3 py-1.5 bg-orange-100 text-orange-800 rounded-xl flex items-center text-xs">
                                <Briefcase className="w-3 h-3 mr-1" />
                                {job.jobType ?? "Full Time"}
                            </Badge>

                        </div>

                        <Badge className="px-3 py-1.5 bg-slate-100 text-slate-700
                         rounded-xl flex items-center gap-1 text-xs hover:bg-slate-200 
                         transition cursor-pointer">
                            <Users className="w-3 h-3" />
                            {job.applicationCount ?? 0} users applied
                        </Badge>

                    </div>

                    {/* DESCRIPTION */}

                    <p className="text-sm text-slate-800 leading-relaxed line-clamp-2">
                        {job.description
                            ? job.description.replace(/<[^>]*>/g, "").slice(0, 120) + "..."
                            : "No description available."}
                    </p>

                </div>

                {/* BOTTOM ROW */}

                <div className="flex items-center justify-between pt-3 mt-auto">

                    <span className="flex items-center text-xs text-slate-600">
                        <CalendarDays className="w-3 h-3 mr-1" />
                        Posted {job.createdAt ? dayjs(job.createdAt).fromNow() : "recently"}
                    </span>

                    <Button
                        onClick={() => {
                            router.push(`/all-jobs/jobs-details/${job.id}`);
                            window.scrollTo(0, 0);
                        }}
                        className="px-5 py-2 rounded-xl bg-green-700 hover:bg-green-800
                         text-white text-xs font-medium active:scale-95 transition cursor-pointer">
                        Apply Now
                    </Button>

                </div>

            </CardContent>

        </Card>

    );

};


export default JobCard;
