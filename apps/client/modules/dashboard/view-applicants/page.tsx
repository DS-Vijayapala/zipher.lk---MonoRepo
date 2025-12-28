"use client";

import { useState } from "react";
import {
    Check,
    X,
    Clock,
    MapPin,
    Mail,
    FileText,
    UserStar,
    Loader2,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Title from "@/components/shared/Title";
import Loading from "@/components/shared/Loading";
import { Badge } from "@/components/ui/badge";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { ApplicationStatus } from "./types";
import { useJobApplicants } from "./hooks/useJobApplicants";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstence";
import toast from "react-hot-toast";

const PAGE_SIZE = 6;

const ViewApplicants = () => {

    const [status, setStatus] = useState<ApplicationStatus | "All">("All");

    const [page, setPage] = useState(1);

    const { data, isLoading } = useJobApplicants({
        page,
        limit: PAGE_SIZE,
        status,
    });

    const applicants = data?.data ?? [];

    const totalPages = data?.meta.totalPages ?? 1;

    const queryClient = useQueryClient();

    const [updatingId, setUpdatingId] = useState<string | null>(null);

    // Mutation to update application status

    const updateStatus = useMutation({
        mutationFn: async ({
            id,
            status,
        }: {
            id: string;
            status: ApplicationStatus;
        }) => {
            await axiosInstance.patch(
                `/job-applicants/${id}/status`,
                { status }
            );
        },
        onSuccess: (_, variables) => {
            toast.success(
                variables.status === "Accepted"
                    ? "Application Accepted"
                    : "Application Rejected"
            );
            queryClient.invalidateQueries({
                queryKey: ["job-applicants"],
            });
        },
        onError: () => {
            toast.error("Something went wrong. Please try again.");
        },
        onSettled: () => {
            setUpdatingId(null);
        },
    });

    const statusBadge = (status: ApplicationStatus) => {
        const map = {
            Accepted: "bg-green-100 text-green-700 border-green-200",
            Rejected: "bg-red-100 text-red-700 border-red-200",
            Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
        };

        const icon = {
            Accepted: <Check className="w-4 h-4" />,
            Rejected: <X className="w-4 h-4" />,
            Pending: <Clock className="w-4 h-4" />,
        };

        return (
            <Badge
                className={`inline-flex items-center gap-2 px-3 py-1 
                    rounded-full border text-sm font-medium ${map[status]}`}
            >
                {icon[status]}
                {status}
            </Badge>
        );
    };

    return (

        <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

            <Title
                title="View Applicants"
                subTitle="Manage and review all job applications in one place."
            />

            {/* Filters */}

            <Card className="p-4 mb-6">

                <div className="flex gap-2 flex-wrap">

                    {["All", "Pending", "Accepted", "Rejected"].map((s) => (
                        <Button
                            key={s}
                            variant="outline"
                            onClick={() => {
                                setStatus(s as any);
                                setPage(1);
                            }}
                            className={`cursor-pointer ${status === s
                                ? "bg-green-100 text-green-700 border-green-200"
                                : ""
                                }`}>
                            {s}
                        </Button>
                    ))}

                </div>

            </Card>

            {/* Cards */}

            {isLoading ? (
                <Loading />
            ) : applicants.length === 0 ? (

                <Card className="p-8 text-center">
                    <FileText className="mx-auto mb-2 text-gray-400" />
                    No applications found
                </Card>

            ) : (

                <div className="grid gap-4 lg:grid-cols-2">

                    {applicants.map((app) => {
                        const isUpdating = updateStatus.isPending && updatingId === app.id;

                        return (

                            <Card key={app.id} className="relative p-5">

                                <div className="absolute top-4 right-4">
                                    {statusBadge(app.status)}
                                </div>

                                {/* Header */}
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full border flex items-center 
                                    justify-center overflow-hidden bg-green-100
                                     text-green-700 font-semibold`}>

                                        {app.user?.image ? (
                                            <img
                                                src={app.user.image}
                                                alt={app.user.name}
                                                className="w-full h-full object-cover"
                                            />

                                        ) : (

                                            <span className="text-lg">
                                                {app.user?.name?.charAt(0).toUpperCase() ?? "?"}
                                            </span>
                                        )}

                                    </div>

                                    <div>

                                        <h3 className="font-semibold">{app.user.name}</h3>

                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {app.job.location}
                                        </p>

                                    </div>

                                </div>

                                {/* Job + Contact */}

                                <div>

                                    <p className="font-medium text-green-800">
                                        {app.job.title}
                                    </p>

                                    <p className="text-sm text-gray-600 flex items-center gap-1">
                                        <Mail className="w-4 h-4 text-green-600" />
                                        {app.user.email}
                                    </p>

                                </div>

                                {/* Actions */}

                                <div className="flex flex-col sm:flex-row gap-2">

                                    {status === "Pending" && (

                                        <>
                                            <Button
                                                disabled={isUpdating}
                                                onClick={() => {
                                                    setUpdatingId(app.id);
                                                    updateStatus.mutate({
                                                        id: app.id,
                                                        status: "Accepted",
                                                    });
                                                }}
                                                variant="outline"
                                                className="flex-1 text-green-600 border-green-200"
                                            >
                                                {isUpdating ? (
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                ) : (
                                                    <Check className="w-4 h-4 mr-1" />
                                                )}
                                                Accept
                                            </Button>

                                            <Button
                                                disabled={isUpdating}
                                                onClick={() => {
                                                    setUpdatingId(app.id);
                                                    updateStatus.mutate({
                                                        id: app.id,
                                                        status: "Rejected",
                                                    });
                                                }}
                                                variant="outline"
                                                className="flex-1 text-red-600 border-red-200"
                                            >
                                                {isUpdating ? (
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                ) : (
                                                    <X className="w-4 h-4 mr-1" />
                                                )}
                                                Reject
                                            </Button>
                                        </>
                                    )}

                                    {status === "Accepted" && (

                                        <Button
                                            disabled={isUpdating}
                                            onClick={() => {
                                                setUpdatingId(app.id);
                                                updateStatus.mutate({
                                                    id: app.id,
                                                    status: "Rejected",
                                                });
                                            }}
                                            variant="outline"
                                            className="text-red-600 border-red-200"
                                        >
                                            {isUpdating ? (
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            ) : (
                                                <X className="w-4 h-4 mr-1" />
                                            )}
                                            Reject
                                        </Button>

                                    )}

                                    {status === "Rejected" && (

                                        <Button
                                            disabled={isUpdating}
                                            onClick={() => {
                                                setUpdatingId(app.id);
                                                updateStatus.mutate({
                                                    id: app.id,
                                                    status: "Accepted",
                                                });
                                            }}
                                            variant="outline"
                                            className="text-green-600 border-green-200"
                                        >
                                            {isUpdating ? (
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            ) : (
                                                <Check className="w-4 h-4 mr-1" />
                                            )}
                                            Accept
                                        </Button>

                                    )}

                                </div>

                                <Button className="bg-linear-to-r from-green-600 to-lime-500
                                 text-white w-full cursor-pointer">
                                    <UserStar className="w-4 h-4 mr-2" />
                                    View Resume
                                </Button>

                            </Card>

                        );

                    })}

                </div>

            )}

            {/* Pagination */}

            {totalPages > 1 && (

                <Pagination className="mt-8">

                    <PaginationContent>

                        <PaginationItem>
                            <PaginationPrevious
                                className="cursor-pointer"
                                onClick={() => page > 1 && setPage(page - 1)}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    isActive={page === i + 1}
                                    onClick={() => setPage(i + 1)}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                className="cursor-pointer"
                                onClick={() =>
                                    page < totalPages && setPage(page + 1)
                                }
                            />
                        </PaginationItem>

                    </PaginationContent>

                </Pagination>

            )}

        </div>

    );

};

export default ViewApplicants;
