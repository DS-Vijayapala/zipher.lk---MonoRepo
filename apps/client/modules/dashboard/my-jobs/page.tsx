"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import {
    Briefcase,
    CheckCircle,
    Clock,
    XCircle,
    User
} from "lucide-react";

import { useUserApplications } from "./hooks/useUserApplications";

import Title from "@/components/shared/Title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import Loading from "@/components/shared/Loading";
import StatCard from "./components/StatCard";

/* =========================
   STATUS CONFIG
========================= */

const statusConfig = {
    Accepted: {
        icon: CheckCircle,
        label: "Accepted",
    },
    Rejected: {
        icon: XCircle,
        label: "Rejected",
    },
    Pending: {
        icon: Clock,
        label: "Pending",
    },
} as const;

/* =========================
   PAGE
========================= */

const MyJobs = () => {
    const router = useRouter();

    /* 🔹 pagination state */
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading } = useUserApplications(page, limit, "ALL");

    if (isLoading) return <Loading />;

    const applications = data?.applications ?? [];
    const meta = data?.data;

    const totalPages = meta?.allpages ?? 1;

    const stats = {
        total: meta?.totalAppliedJobs ?? 0,
        pending: applications.filter(a => a.status === "Pending").length,
        accepted: applications.filter(a => a.status === "Accepted").length,
        rejected: applications.filter(a => a.status === "Rejected").length,
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

            {/* Header */}
            <Title
                title="My Applications"
                subTitle="Track the status of jobs you applied for"
            />

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatCard label="Total" value={stats.total} />
                <StatCard label="Pending" value={stats.pending} tone="warning" />
                <StatCard label="Accepted" value={stats.accepted} tone="success" />
                <StatCard label="Rejected" value={stats.rejected} tone="destructive" />
            </div>

            {/* Empty State */}
            {applications.length === 0 && (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <Briefcase className="w-10 h-10 text-muted-foreground" />
                        <p className="mt-3 text-muted-foreground">
                            No applications found
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Applications */}
            <div className="space-y-4">
                {applications.map((app) => {
                    const config = statusConfig[app.status];
                    const StatusIcon = config.icon;

                    return (
                        <Card key={app.id} className="border-green-100 shadow-md hover:shadow-2xl transition-shadow">
                            <CardHeader className="pb-1.5">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                                    {/* LEFT CONTENT */}
                                    <div className="space-y-2 flex-1">
                                        <h3 className="font-semibold text-base text-green-800">
                                            {app.job.title}
                                        </h3>

                                        {/* Job meta */}
                                        <div className="flex flex-wrap gap-2">
                                            {app.job.category && (
                                                <Badge variant="outline" className=" text-green-700 py-1.5">
                                                    {app.job.category}
                                                </Badge>
                                            )}
                                            {app.job.level && (
                                                <Badge variant="outline" className=" text-green-700 py-1.5">
                                                    {app.job.level}
                                                </Badge>
                                            )}
                                            {app.job.location && (
                                                <Badge variant="outline" className="py-1.5 text-green-700">
                                                    {app.job.location}
                                                </Badge>
                                            )}
                                            <Badge variant="outline" className="py-1.5 text-green-700">
                                                {app.job.salary ? `LKR ${app.job.salary}` : "Competitive"}
                                            </Badge>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm text-muted-foreground">
                                            {app.job.description.length > 175
                                                ? app.job.description.slice(0, 175) + "..."
                                                : app.job.description}
                                        </p>

                                        {/* MOBILE BUTTONS (below description) */}

                                        <div className="flex items-center gap-2 pt-2 md:hidden">
                                            <Badge
                                                className="cursor-pointer bg-green-600 hover:bg-green-700 text-white py-2"
                                                onClick={() =>
                                                    router.push(`/all-jobs/jobs-details/${app.jobId}`)
                                                }
                                            >
                                                View Details
                                            </Badge>

                                            <Badge
                                                variant="outline"
                                                className="flex items-center gap-1 border-lime-300 text-lime-700 py-2"
                                            >
                                                <StatusIcon className="w-3.5 h-3.5" />
                                                {config.label}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* 🔼 DESKTOP BUTTONS (right side) */}

                                    <div className="hidden md:flex flex-col items-end gap-2">
                                        <Badge
                                            className="cursor-pointer bg-green-600 hover:bg-green-700 text-white py-2"
                                            onClick={() =>
                                                router.push(`/all-jobs/jobs-details/${app.jobId}`)
                                            }
                                        >
                                            View Details
                                        </Badge>

                                        <Badge
                                            variant="outline"
                                            className="flex items-center gap-1 border-lime-300 text-lime-700 py-2"
                                        >
                                            <StatusIcon className="w-3.5 h-3.5" />
                                            {config.label}
                                        </Badge>
                                    </div>
                                </div>

                            </CardHeader>


                            <Separator />

                            <CardContent className="pt-4 flex items-center justify-between gap-4">
                                {/* Posted User */}
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={app.job.user.image} />
                                        <AvatarFallback>
                                            <User className="w-4 h-4" />
                                        </AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Posted by
                                        </p>
                                        <p className="text-sm font-medium">
                                            {app.job.user.name}
                                        </p>

                                    </div>
                                </div>

                                <p className="text-xs text-muted-foreground whitespace-nowrap">
                                    Applied {moment(app.createdAt).format("MMM DD, YYYY")}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* =========================
               PAGINATION
            ========================= */}

            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                className={`cursor-pointer ${page === 1 && "pointer-events-none opacity-50"
                                    }`}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map((_, i) => {
                            const p = i + 1;
                            return (
                                <PaginationItem key={p}>
                                    <PaginationLink
                                        isActive={page === p}
                                        onClick={() => setPage(p)}
                                        className={`cursor-pointer ${page === p
                                            ? "bg-green-600 text-white hover:bg-green-700"
                                            : "text-green-700"
                                            }`}
                                    >
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                className={`cursor-pointer ${page === totalPages && "pointer-events-none opacity-50"
                                    }`}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

export default MyJobs;

