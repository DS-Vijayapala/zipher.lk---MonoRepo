"use client"

import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import axiosInstance from "@/lib/axiosInstence"
import { useProfile } from "../hooks/useProfile"

/* ----------------------------------------
   Form type (UI-focused)
---------------------------------------- */
type ProfileFormValues = {
    fullName: string
    email: string
    phone?: string
    location?: string
    title?: string
    description?: string
    socialLinks: {
        linkedin?: string
        github?: string
        twitter?: string
    }
}

export default function ProfileDetailsForm() {
    const { profile, isLoading, refetchProfile } = useProfile()

    const hasReset = useRef(false)

    const form = useForm<ProfileFormValues>({
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            location: "",
            title: "",
            description: "",
            socialLinks: {},
        },
    })

    /* ---------------- SAFE sync form with profile ---------------- */
    useEffect(() => {
        if (!profile || hasReset.current) return

        form.reset({
            fullName: profile.name ?? "",
            email: profile.email,
            phone: profile.phone ?? "",
            location: profile.location ?? "",
            title: profile.currentPosition ?? "",
            description: profile.description ?? "",
            socialLinks: profile.socialLinks ?? {},
        })

        hasReset.current = true
    }, [profile, form])

    /* ---------------- Save Profile ---------------- */
    const saveProfileMutation = useMutation({
        mutationFn: async (values: ProfileFormValues) => {
            if (values.description && values.description.length > 125) {
                throw new Error("Description must be 125 characters or less")
            }

            return axiosInstance.put("/profile", {
                name: values.fullName,
                phone: values.phone,
                location: values.location,
                currentPosition: values.title,
                description: values.description,
                socialLinks: values.socialLinks,
            })
        },
        onSuccess: () => {
            toast.success("Profile updated")
            hasReset.current = false // allow re-sync after refetch
            refetchProfile()
        },
        onError: (err: any) => {
            toast.error(err.message || "Failed to update profile")
        },
    })

    const onSubmit = (values: ProfileFormValues) => {
        saveProfileMutation.mutate(values)
    }

    if (isLoading) {
        return <div className="p-4 text-gray-500">Loading profile...</div>
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-green-800">Profile Details</CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <Input {...form.register("fullName")} placeholder="Full Name" />

                    <Input
                        {...form.register("email")}
                        disabled
                        placeholder="Email"
                    />

                    <Input
                        {...form.register("phone")}
                        placeholder="Contact Number (optional)"
                    />

                    <Input
                        {...form.register("location")}
                        placeholder="Location"
                    />

                    <Input
                        {...form.register("title")}
                        placeholder="Current Position"
                    />

                    <Input
                        {...form.register("description")}
                        maxLength={125}
                        placeholder="Short description (max 125 characters)"
                    />

                    <Input
                        {...form.register("socialLinks.linkedin")}
                        placeholder="LinkedIn URL"
                    />

                    <Input
                        {...form.register("socialLinks.github")}
                        placeholder="GitHub URL"
                    />

                    <Input
                        {...form.register("socialLinks.twitter")}
                        placeholder="Twitter URL"
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={saveProfileMutation.isPending}
                    >
                        {saveProfileMutation.isPending ? "Saving..." : "Save Profile"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
