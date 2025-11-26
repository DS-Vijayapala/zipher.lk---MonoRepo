"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstence";
import { toast } from "react-hot-toast";
import { useDashboardData } from "@/modules/dashboard/dashboard-data/hooks/useDashBoardData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Title from "@/components/shared/Title";
import ZensCard from "@/components/shared/PointCard";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { jobCategories, jobLocations } from "@/modules/jobs/all-jobs/libs/constants";
import ChipInput from "./components/form/ChipInput";
import Image from "next/image";
import { motion } from "framer-motion";
import { log } from "console";

// Types

type JobFormData = {
    title: string;
    category: string;
    location: string;
    level: string;
    salary: string;
    description: string;
    bannerImage: string;
    requirements: string[];
    qualifications: string[];
};


//  Image choices (public folder)
//  Place files under apps/client/public/job-images/

const IMAGE_CHOICES = ["img1.png"];

// Helpers

const countWords = (text = "") =>
    text
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .filter(Boolean).length;


// Component

export default function AddJob() {

    const JOB_COST = 10;

    const { data: dashboardData, isError, refetch: refetchDashboard } = useDashboardData();

    const userPoints = dashboardData?.remainingPoints ?? 0;

    const canPostJob = userPoints >= JOB_COST;

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<JobFormData>({
        defaultValues: {
            title: "",
            category: "",
            location: "",
            level: "",
            salary: "",
            description: "",
            bannerImage: IMAGE_CHOICES[0],
            requirements: [],
            qualifications: [],
        },
    });

    const selectedImage = watch("bannerImage");

    const mutation = useMutation({
        mutationFn: async (payload: JobFormData) => {
            const { data } = await axiosInstance.post("/api/v2/users/post-job", payload);
            return data;
        },
        onSuccess: async (data) => {
            if (data?.success) {
                toast.success("Job posted successfully");
                await refetchDashboard?.();
                reset();
            } else {
                toast.error(data?.message || "Failed to post job");
            }
        },
        onError: (err: any) => {
            const msg = err?.response?.data?.message || "Something went wrong while posting the job";
            toast.error(msg);
        },
    });

    const onSubmit = (form: JobFormData) => {


        console.log("Form submitted:", form);

        // // final validation: ensure arrays have items
        // if (!form.requirements || form.requirements.length === 0) {
        //     toast.error("Add at least one job requirement.");
        //     return;
        // }
        // if (!form.qualifications || form.qualifications.length === 0) {
        //     toast.error("Add at least one education qualification.");
        //     return;
        // }

        // // ensure description word limit (defensive)
        // if (countWords(form.description) > 500) {
        //     toast.error("Description cannot exceed 500 words.");
        //     return;
        // }

        // // normalize salary
        // const payload: JobFormData = {
        //     ...form,
        //     salary: form.salary ? String(Number(form.salary)) : "",
        // };

        // mutation.mutate(payload);
    };

    return (

        <div className="max-w-4xl mx-auto px-4 py-8">

            <Title title="Add New Job" subTitle="Post a new job listing and attract top talent." />

            <div className="mt-6">

                <ZensCard remainingPoints={userPoints} />

                {isError && <p className="text-red-600 text-sm mt-2">Error loading dashboard data.</p>}

            </div>

            {/* ===================== FORM START ===================== */}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className={`mt-6 bg-white rounded-2xl border p-6 shadow-sm 
                    ${!canPostJob ? "opacity-60 pointer-events-none" : ""}`}>

                {/* Hidden inputs for ShadCN selects → required for RHF validation */}

                <input type="hidden" {...register("category", { required: "Select a category" })} />

                <input type="hidden" {...register("location", { required: "Select a location" })} />

                <input type="hidden" {...register("level", { required: "Select experience level" })} />

                {/* ---------------- Job Title ---------------- */}

                <div className="mb-5">

                    <label className="block text-sm font-semibold text-green-800 mb-2">
                        Job Title *
                    </label>

                    <Input
                        {...register("title", {
                            required: "Job title is required",
                            minLength: { value: 3, message: "Minimum 3 characters required" },
                            maxLength: { value: 50, message: "Maximum 50 characters allowed" },
                            pattern: {
                                value: /^[a-zA-Z0-9.,;:'"()!?+\-@#&*/\s]{3,}$/i,
                                message: "Invalid or unsafe characters detected.",
                            },
                        })}
                        placeholder="Senior React Developer"
                    />

                    {errors.title && (
                        <p className="text-xs text-red-600 mt-1">{errors.title.message}</p>
                    )}

                </div>

                {/* ---------------- Description ---------------- */}

                <div className="mb-5">

                    <label className="block text-sm font-semibold text-green-800 mb-2">
                        Job Description *
                    </label>

                    <Textarea
                        {...register("description", {
                            required: "Job description is required",
                            validate: (val: string) =>
                                countWords(val) <= 150 || "Description cannot exceed 150 words",
                            pattern: {
                                value: /^[a-zA-Z0-9.,;:'"()!?+\-@#&*/\s]+$/i,
                                message: "Invalid characters detected.",
                            },
                        })}
                        className="w-full border rounded-xl p-3 min-h-40 bg-white outline-none
                            focus:ring-2 focus:ring-green-600 resize-none"
                        placeholder="Provide a detailed job description (max 150 words)..."
                    />

                    {/* Word counter + error inline */}

                    <div className="flex justify-between items-center mt-2">

                        <div>
                            {errors.description && (
                                <p className="text-xs text-red-600">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        <p
                            className={`text-xs ${countWords(watch("description") ?? "") > 150
                                ? "text-red-600"
                                : "text-slate-500"
                                }`}>

                            {countWords(watch("description") ?? "")} / 150 words

                        </p>

                    </div>

                </div>

                {/* ---------------- 2×2 Grid: Category / Location / Level / Salary ---------------- */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">

                    {/* Job Category */}

                    <div>

                        <label className="block text-sm font-semibold text-green-800 mb-2">
                            Job Category *
                        </label>

                        <Select
                            onValueChange={(v) => setValue("category", v, { shouldValidate: true })}
                        >

                            <SelectTrigger className="w-full">
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

                        {errors.category && (
                            <p className="text-xs text-red-600 mt-1">{errors.category.message}</p>
                        )}

                    </div>

                    {/* Job Location */}

                    <div>

                        <label className="block text-sm font-semibold text-green-800 mb-2">
                            Job Location *
                        </label>

                        <Select
                            onValueChange={(v) => setValue("location", v, { shouldValidate: true })}
                        >

                            <SelectTrigger className="w-full">
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

                        {errors.location && (
                            <p className="text-xs text-red-600 mt-1">{errors.location.message}</p>
                        )}

                    </div>

                    {/* Experience Level */}

                    <div>

                        <label className="block text-sm font-semibold text-green-800 mb-2">
                            Experience Level *
                        </label>

                        <Select
                            onValueChange={(v) => setValue("level", v, { shouldValidate: true })}
                        >

                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select level" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="intern">Intern</SelectItem>
                                <SelectItem value="junior">Junior</SelectItem>
                                <SelectItem value="mid">Mid</SelectItem>
                                <SelectItem value="senior">Senior</SelectItem>
                                <SelectItem value="lead">Lead</SelectItem>
                                <SelectItem value="principal">Principal</SelectItem>
                            </SelectContent>

                        </Select>

                        {errors.level && (
                            <p className="text-xs text-red-600 mt-1">{errors.level.message}</p>
                        )}

                    </div>

                    {/* Salary */}

                    <div>

                        <label className="block text-sm font-semibold text-green-800 mb-2">
                            Salary (LKR) *
                        </label>

                        <Input
                            type="number"
                            min={0}
                            placeholder="e.g., 150000"
                            {...register("salary", {
                                required: "Expected salary is required",
                                min: { value: 0, message: "Salary cannot be negative" },
                                validate: (val) =>
                                    /^[0-9]{1,9}$/i.test(val) || "Invalid salary format",
                            })}
                            className="w-full"
                        />

                        {errors.salary && (
                            <p className="text-xs text-red-600 mt-1">{errors.salary.message}</p>
                        )}

                    </div>

                </div>

                {/* ---------------- Requirements ---------------- */}

                <div className="mb-5">

                    <label className="block text-sm font-semibold text-green-800 mb-2">
                        Job Requirements *
                    </label>

                    <Controller
                        control={control}
                        name="requirements"
                        rules={{
                            validate: (v) =>
                                (Array.isArray(v) && v.length > 0) || "Add at least one requirement",
                        }}
                        render={({ field }) => (
                            <ChipInput
                                value={field.value || []}
                                onChange={field.onChange}
                                placeholder="Type a requirement and press Enter"
                            />
                        )}
                    />

                    {errors.requirements && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.requirements.message as string}
                        </p>
                    )}

                </div>

                {/* ---------------- Qualifications ---------------- */}

                <div className="mb-5">

                    <label className="block text-sm font-semibold text-green-800 mb-2">
                        Education Qualifications *
                    </label>

                    <Controller
                        control={control}
                        name="qualifications"
                        rules={{
                            validate: (v) =>
                                (Array.isArray(v) && v.length > 0) ||
                                "Add at least one qualification",
                        }}
                        render={({ field }) => (
                            <ChipInput
                                value={field.value || []}
                                onChange={field.onChange}
                                placeholder="Type a qualification and press Enter"
                            />
                        )}
                    />

                    {errors.qualifications && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.qualifications.message as string}
                        </p>
                    )}

                </div>

                {/* ---------------- Banner Image Selector ---------------- */}

                <div className="mb-6">

                    <label className="block text-sm font-semibold text-green-800 mb-2">
                        Choose a banner image *
                    </label>

                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">

                        {IMAGE_CHOICES.map((img) => {
                            const fullPath = `/job-images/${img}`;
                            const selected = selectedImage === img;

                            return (
                                <motion.button
                                    key={img}
                                    type="button"
                                    onClick={() => setValue("bannerImage", img, { shouldValidate: true })}
                                    whileTap={{ scale: 0.96 }}
                                    className={`relative mt-1 rounded-lg overflow-hidden border p-0 ${selected
                                        ? "ring-2 ring-offset-2 ring-green-600"
                                        : "border-slate-200"
                                        }`}
                                >
                                    <div className="w-full h-20 sm:h-24 relative">
                                        <Image src={fullPath} alt={img} fill className="object-cover" />
                                    </div>
                                </motion.button>
                            );
                        })}

                    </div>

                    {errors.bannerImage && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.bannerImage as any}
                        </p>
                    )}

                </div>

                {/* ---------------- Buttons ---------------- */}

                <div className="flex items-center gap-4 mt-6">

                    <Button
                        type="submit"
                        disabled={isSubmitting || mutation.isPending || !canPostJob || Object.keys(errors).length > 0}
                        className="px-6 py-2 rounded-xl cursor-pointer">

                        {mutation.isPending ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Publishing...
                            </span>
                        ) : !canPostJob ? (
                            "Not Enough Zens"
                        ) : (
                            `Publish Job (-${JOB_COST} zens)`
                        )}

                    </Button>

                    <button
                        type="button"
                        onClick={() => reset()}
                        className="px-4 py-2 rounded-xl border cursor-pointer bg-green-100 text-green-800">

                        Reset
                    </button>

                </div>

            </form>

        </div>

    );

}
