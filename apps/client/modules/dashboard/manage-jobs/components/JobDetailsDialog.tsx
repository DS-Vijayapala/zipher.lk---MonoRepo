"use client";

import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useJobDetails } from "@/modules/jobs/job-details/hooks/useJobDetails";
import { jobCategories, jobLocations } from "@/modules/jobs/all-jobs/libs/constants";
import ChipInput from "../../add-job/components/form/ChipInput";
import Loading from "@/components/shared/Loading";
import { toast } from "react-hot-toast";
import axiosInstance from "@/lib/axiosInstence";

interface Props {
    open: boolean;
    onClose: () => void;
    jobId: string | null;
}

type EditJobFormData = {
    title: string;
    category: string;
    location: string;
    level: string;
    salary: number;
    description: string;
    requirements: string[];
    qualifications: string[];
};

const countWords = (text?: string) =>
    (text ?? "")
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .filter(Boolean).length;

export default function EditJobDetailsDialog({
    open,
    onClose,
    jobId,
}: Props) {
    const { data, isLoading, isError, error } =
        useJobDetails(jobId ?? undefined);

    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
        formState: { isSubmitting },
    } = useForm<EditJobFormData>();

    /* sync API data into form */
    useEffect(() => {
        if (!open) return;
        if (!data?.job) return;

        // defer reset until Dialog content is mounted
        requestAnimationFrame(() => {
            reset({
                title: data.job.title ?? "",
                category: data.job.category ?? "",
                location: data.job.location ?? "",
                level: data.job.level ?? "",
                salary: data.job.salary ?? 0,
                description: data.job.description ?? "",
                requirements: data.job.requirements ?? [],
                qualifications: data.job.qualifications ?? [],
            });
        });
    }, [open, data, reset]);


    const mutation = useMutation({
        mutationFn: async (payload: EditJobFormData) => {
            console.log("EDIT JOB PAYLOAD:", payload);
            await axiosInstance.patch(`/jobs/manage/${jobId}`, payload);
            return payload;
        },
        onSuccess: async () => {
            // 🔥 Invalidate related frontend caches
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["job-details", jobId] }),
            ]);

            toast.success("Job updated successfully");
            onClose();
        },
        onError: (error) => {
            toast.error("Something went wrong");
            console.error("Edit job error:", error);
        },
    });


    if (!jobId) return null;


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[95vh] p-0">
                <DialogHeader className="px-6 py-4 border-b">
                    <DialogTitle className="text-lg font-semibold text-green-800">
                        Edit Job
                    </DialogTitle>
                </DialogHeader>

                {isLoading && <Loading />}

                {isError && (
                    <p className="p-6 text-sm text-red-600">
                        {(error as Error)?.message}
                    </p>
                )}

                {data && (
                    <form
                        onSubmit={handleSubmit((values) =>
                            mutation.mutate(values)
                        )}
                        className="h-full"
                    >
                        <ScrollArea className="h-[calc(95vh-140px)] px-6 py-6">
                            <div className="space-y-6">

                                {/* Job Title */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-green-800">
                                        Job Title *
                                    </label>
                                    <Input {...register("title")} />
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-green-800">
                                        Job Description *
                                    </label>
                                    <Textarea
                                        {...register("description")}
                                        className="min-h-[120px]"
                                    />
                                    <p className="text-xs text-slate-500 text-right">
                                        {countWords(watch("description"))} / 150 words
                                    </p>
                                </div>

                                {/* Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-green-800">
                                            Job Category *
                                        </label>
                                        <Select
                                            value={watch("category")}
                                            onValueChange={(v) =>
                                                setValue("category", v)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {jobCategories.map((c) => (
                                                    <SelectItem key={c} value={c}>
                                                        {c}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-green-800">
                                            Job Location *
                                        </label>
                                        <Select
                                            value={watch("location")}
                                            onValueChange={(v) =>
                                                setValue("location", v)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select location" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {jobLocations.map((l) => (
                                                    <SelectItem key={l} value={l}>
                                                        {l}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-green-800">
                                            Experience Level *
                                        </label>
                                        <Select
                                            value={watch("level")}
                                            onValueChange={(v) =>
                                                setValue("level", v)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="intern">Intern</SelectItem>
                                                <SelectItem value="junior">Junior</SelectItem>
                                                <SelectItem value="mid">Mid</SelectItem>
                                                <SelectItem value="senior">Senior</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-green-800">
                                            Salary (LKR)
                                        </label>
                                        <Input
                                            type="number"
                                            {...register("salary", { valueAsNumber: true })}
                                        />
                                    </div>
                                </div>

                                {/* Requirements */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-green-800">
                                        Job Requirements *
                                    </label>
                                    <Controller
                                        name="requirements"
                                        control={control}
                                        render={({ field }) => (
                                            <ChipInput
                                                value={field.value ?? []}
                                                onChange={field.onChange}
                                                placeholder="Type and press Enter"
                                            />
                                        )}
                                    />
                                </div>

                                {/* Qualifications */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-green-800">
                                        Qualifications *
                                    </label>
                                    <Controller
                                        name="qualifications"
                                        control={control}
                                        render={({ field }) => (
                                            <ChipInput
                                                value={field.value ?? []}
                                                onChange={field.onChange}
                                                placeholder="Type and press Enter"
                                            />
                                        )}
                                    />
                                </div>

                            </div>
                        </ScrollArea>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={isSubmitting || mutation.isPending}
                            >
                                {mutation.isPending ? "Updating..." : "Save"}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
