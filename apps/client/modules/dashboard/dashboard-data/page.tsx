'use client'

import React from 'react'
import { useDashboardData } from './hooks/useDashBoardData';
import ActionButton from '@/modules/dashboard/dashboard-data/components/ActionButton';
import StatsCard from '@/modules/dashboard/dashboard-data/components/StatsCard';
import ZensCard from '@/components/shared/PointCard';
import Title from '@/components/shared/Title';
import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button';
import { CheckCircle, ClipboardList, Eye, FileText, Plus, RefreshCcw, Send, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Error from '@/components/shared/Error';

const DashBoardPage = () => {

    const { data, isLoading, isError, refetch, isFetching, error } = useDashboardData();

    const router = useRouter();

    const dashboardData = {
        appliedJobCount: data?.appliedJobCount ?? 0,
        pendingJobCount: data?.PendingJobCount ?? 0,
        acceptedJobCount: data?.acceptedJobCount ?? 0,
        remainingPoints: data?.remainingPoints ?? 0,
    };

    if (isLoading) return <Loading />

    if (isError) {
        return (
            <div className="min-h-[80vh] items-center justify-center flex">
                <Error
                    isShow={true}
                    title="Something went wrong!"
                    messages={error instanceof Error ? error.message : "Unknown error"}
                    pathName='Go To Home'
                />
            </div>
        );
    }

    return (

        <div className="min-h-screen">

            <div className="container max-w-6xl mx-auto px-4 py-8 space-y-8">

                {/* Header Section */}

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    <Title
                        title="Dashboard"
                        subTitle="Track your job applications and stay updated in one place."
                    />

                    <div className="flex items-center space-x-4">

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => refetch()}
                            className="cursor-pointer"
                        >
                            <RefreshCcw
                                className={`w-4 h-4 mr-2 ${isFetching ? "animate-spin" : ""}`}
                            />
                            {isFetching ? "Refreshing..." : "Refresh Data"}
                        </Button>

                        <Button
                            size="sm"
                            className='cursor-pointer'
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                                router.push("/dashboard/add-job")
                            }}
                        >
                            <Plus className="w-4 h-4" />
                            Add New Job
                        </Button>

                    </div>

                </div>

                {/* Points Card */}

                <ZensCard remainingPoints={dashboardData.remainingPoints} />

                {/* Stats */}

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

                    <StatsCard
                        title="Applied Jobs"
                        count={dashboardData.appliedJobCount}
                        icon={Send}
                        color="blue"
                        description="Jobs you have applied"
                        onClick={() => router.push("/owner/applications")}
                    />

                    <StatsCard
                        title="Pending Jobs"
                        count={dashboardData.pendingJobCount}
                        icon={Eye}
                        color="amber"
                        description="Jobs awaiting approval"
                        onClick={() => router.push("/owner/applications")}
                    />

                    <StatsCard
                        title="Accepted Jobs"
                        count={dashboardData.acceptedJobCount}
                        icon={CheckCircle}
                        color="purple"
                        description="Jobs that have been approved"
                        onClick={() => router.push("/owner/applications")}
                    />

                </div>

                {/* Quick Actions */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <div className="lg:col-span-2 space-y-6">

                        <h2 className="text-xl font-bold text-green-800 mb-6">
                            Quick Actions
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                            <ActionButton
                                title="My Jobs"
                                description="Track your Applied jobs"
                                icon={ClipboardList}
                                onClick={() => router.push("/dashboard/my-jobs")}
                                isPrimary
                            />

                            <ActionButton
                                title="View Applicants"
                                description="Review candidate applications"
                                icon={FileText}
                                onClick={() => router.push("/dashboard/view-applicants")}
                                isPrimary
                            />

                            <ActionButton
                                title="Manage Jobs"
                                description="Edit your own job posts"
                                icon={Settings}
                                onClick={() => router.push("/dashboard/manage-jobs")}
                                isPrimary
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};


export default DashBoardPage;