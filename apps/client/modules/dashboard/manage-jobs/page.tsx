"use client"

import React, { useState } from "react"
import moment from "moment"
import {
    Eye,
    EyeOff,
    Users,
    Calendar,
    MapPin,
} from "lucide-react"
import toast from "react-hot-toast"

import Title from "@/components/shared/Title"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import Loading from "@/components/shared/Loading"
import JobDetailsDialog from "./components/JobDetailsDialog"

import {
    useGetUserPostedJobs,
    useToggleJobVisibility,
    PAGE_LIMIT,
    Job,
} from "./hooks/useManageJobs"

const ManageJobs: React.FC = () => {
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false)
    const [selectedJob, setSelectedJob] = useState<Job | null>(null)

    // ✅ API data
    const { data, isLoading } = useGetUserPostedJobs(page)
    const toggleMutation = useToggleJobVisibility()

    if (isLoading) return <Loading />

    const totalPages = Math.ceil((data?.total ?? 0) / PAGE_LIMIT)

    const onToggle = (job: Job) => {
        toggleMutation.mutate(job.id)
        toast.success(`Job status changed to ${job.visible ? "Hidden" : "Visible"}`)
    }

    const openDetails = (job: Job) => {
        setSelectedJob(job)
        setOpen(true)
    }

    return (
        <div className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
            <Title
                title="Manage Your Jobs"
                subTitle="View, control visibility, and manage job postings"
            />

            {/* ================= Desktop Table ================= */}
            <Card className="hidden lg:block border-green-100">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-green-900">Job Details</TableHead>
                            <TableHead className="text-green-900">Posted Date</TableHead>
                            <TableHead className="text-green-900">Location</TableHead>
                            <TableHead className="text-center text-green-900">Applicants</TableHead>
                            <TableHead className="text-center text-green-900">Visibility</TableHead>
                            <TableHead className="text-center text-green-900">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data?.data.map((job) => (
                            <TableRow key={job.id}>
                                <TableCell className="font-medium text-green-800">
                                    {job.title}
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Calendar className="w-4 h-4" />
                                        {moment(job.postedAt).format("MMM DD, YYYY")}
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <MapPin className="w-4 h-4" />
                                        {job.location}
                                    </div>
                                </TableCell>

                                <TableCell className="text-center">
                                    <Badge className="bg-blue-50 text-blue-700">
                                        <Users className="w-4 h-4 mr-1" />
                                        {job.applicants}
                                    </Badge>
                                </TableCell>

                                <TableCell className="text-center">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => onToggle(job)}
                                        className={`cursor-pointer ${job.visible
                                            ? "text-green-700 hover:bg-green-100"
                                            : "text-slate-500 hover:bg-slate-100"
                                            }`}
                                    >
                                        {job.visible ? <Eye /> : <EyeOff />}
                                        {job.visible ? "Visible" : "Hidden"}
                                    </Button>
                                </TableCell>

                                <TableCell className="text-center">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-green-200 text-green-700 hover:bg-green-200 cursor-pointer"
                                        onClick={() => openDetails(job)}
                                    >
                                        Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            {/* ================= Mobile Cards ================= */}
            <div className="lg:hidden space-y-3">
                {data?.data.map((job) => (
                    <Card key={job.id} className="p-4 border-green-100">
                        {/* Title + Visibility */}
                        <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                                {job.title}
                            </h3>

                            <div
                                className={`flex items-center gap-1 text-xs font-medium ${job.visible ? "text-green-700" : "text-slate-500"
                                    }`}
                            >
                                {job.visible ? (
                                    <>
                                        <Eye className="w-3.5 h-3.5" />
                                        Visible
                                    </>
                                ) : (
                                    <>
                                        <EyeOff className="w-3.5 h-3.5" />
                                        Hidden
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Date + Location */}
                        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {moment(job.postedAt).format("MMM DD")}
                            </div>

                            <div className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {job.location}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                                <Users className="w-3.5 h-3.5" />
                                Applied {job.applicants} Candidates
                            </div>

                            <Button
                                size="sm"
                                variant="outline"
                                className="border-green-200 text-green-700 hover:bg-green-100 h-8 px-3"
                                onClick={() => openDetails(job)}
                            >
                                Details
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* ================= Pagination ================= */}
            {totalPages > 1 && (
                <Pagination className="justify-center">
                    <PaginationContent>
                        <PaginationItem className="cursor-pointer">
                            <PaginationPrevious
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <PaginationItem key={i} className="cursor-pointer">
                                <PaginationLink
                                    isActive={page === i + 1}
                                    onClick={() => setPage(i + 1)}
                                    className={
                                        page === i + 1
                                            ? "bg-green-700 text-white"
                                            : "text-green-700"
                                    }
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem className="cursor-pointer">
                            <PaginationNext
                                onClick={() =>
                                    setPage((p) => Math.min(totalPages, p + 1))
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}

            {/* ================= Dialog ================= */}
            <JobDetailsDialog
                open={open}
                onClose={() => setOpen(false)}
                jobId={selectedJob?.id || ""}
            />
        </div>
    )
}

export default ManageJobs
