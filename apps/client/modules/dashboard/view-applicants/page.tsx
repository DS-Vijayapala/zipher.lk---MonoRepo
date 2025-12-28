"use client";

import { useEffect, useState } from "react";
import {
    Check,
    X,
    Clock,
    MapPin,
    Mail,
    Download,
    FileText,
    UserStar
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Title from "@/components/shared/Title";

import { ApplicationStatus, JobApplication } from "./types";
import { fetchApplicants } from "./hooks/mockApi";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import Loading from "@/components/shared/Loading";
import { Badge } from "@/components/ui/badge";

const PAGE_SIZE = 6;

const ViewApplicants = () => {
    const [data, setData] = useState<JobApplication[]>([]);
    const [status, setStatus] =
        useState<ApplicationStatus | "All">("All");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetchApplicants({
            status,
            page,
            limit: PAGE_SIZE,
        }).then((res) => {
            setData(res.data);
            setTotalPages(res.totalPages);
            setLoading(false);
        });
    }, [status, page]);

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
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full 
                    border text-sm font-medium ${map[status]}`}
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
                                setPage(1); // reset page
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
            {loading ? (
                <Loading />
            ) : data.length === 0 ? (
                <Card className="p-8 text-center">
                    <FileText className="mx-auto mb-2 text-gray-400" />
                    No applications found
                </Card>
            ) : (
                <div className="grid gap-4 lg:grid-cols-2">
                    {data.map((app) => (
                        <Card key={app._id} className="relative p-5">

                            {/* Status badge – top right */}
                            <div className="absolute top-4 right-4">
                                {statusBadge(app.status)}
                            </div>

                            {/* Header */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={app.userId.image}
                                    className="w-12 h-12 rounded-full border"
                                />
                                <div>
                                    <h3 className="font-semibold">{app.userId.name}</h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {app.jobId.location}
                                    </p>
                                </div>
                            </div>

                            {/* Job + Contact */}
                            <div>
                                <p className="font-medium text-green-800">{app.jobId.title}</p>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <Mail className="w-4 h-4 text-green-600" />
                                    {app.userId.email}
                                </p>
                            </div>

                            {/* Action buttons – ABOVE resume */}
                            <div className="flex flex-col sm:flex-row gap-2">
                                {status === "Pending" && (
                                    <div className="flex gap-2 w-full">
                                        <Button
                                            variant="outline"
                                            className="flex-1 w-full text-green-600 border-green-200 hover:bg-green-50 cursor-pointer"
                                        >
                                            <Check className="w-4 h-4 mr-1" />
                                            Accept
                                        </Button>

                                        <Button
                                            variant="outline"
                                            className="flex-1 w-full text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
                                        >
                                            <X className="w-4 h-4 mr-1" />
                                            Reject
                                        </Button>
                                    </div>

                                )}

                                {status === "Accepted" && (
                                    <Button
                                        variant="outline"
                                        className="text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
                                    >
                                        <X className="w-4 h-4 mr-1" />
                                        Reject
                                    </Button>
                                )}

                                {status === "Rejected" && (
                                    <Button
                                        variant="outline"
                                        className="text-green-600 border-green-200 hover:bg-green-50 cursor-pointer"
                                    >
                                        <Check className="w-4 h-4 mr-1" />
                                        Accept
                                    </Button>
                                )}
                            </div>

                            {/* Resume button */}
                            <Button className="bg-linear-to-r from-green-600 to-lime-500
                             text-white w-full sm:w-full cursor-pointer">
                                <UserStar className="w-4 h-4 mr-2" />
                                View Resume
                            </Button>

                        </Card>

                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination className="mt-8">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious className="cursor-pointer"
                                onClick={() => page > 1 && setPage(page - 1)}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <PaginationItem key={i} className="cursor-pointer">
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
