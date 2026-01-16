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
import Loading from "@/components/shared/Loading"

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

const isValidSriLankanPhone = (phone?: string) => {
    if (!phone) return true
    return /^(?:\+94|94|0)(7[01245678])[0-9]{7}$/.test(phone)
}

const isValidUrl = (url?: string) => {
    if (!url) return true
    try {
        new URL(url)
        return true
    } catch {
        return false
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

    const saveProfileMutation = useMutation({
        mutationFn: async (values: ProfileFormValues) => {
            if (values.description && values.description.length > 125) {
                throw new Error("Description must be 125 characters or less")
            }

            if (!isValidSriLankanPhone(values.phone)) {
                throw new Error("Invalid Sri Lankan phone number")
            }

            if (
                !isValidUrl(values.socialLinks.linkedin) ||
                !isValidUrl(values.socialLinks.github) ||
                !isValidUrl(values.socialLinks.twitter)
            ) {
                throw new Error("Invalid social link URL")
            }

            const cleanUrl = (value?: string) =>
                value && value.trim().length > 0 ? value.trim() : undefined;

            const payload = {
                name: values.fullName.trim(),
                phone: values.phone?.trim(),
                location: values.location?.trim(),
                currentPosition: values.title?.trim(),
                description: values.description?.trim(),

                linkedin: cleanUrl(values.socialLinks.linkedin),
                github: cleanUrl(values.socialLinks.github),
                twitter: cleanUrl(values.socialLinks.twitter),
            }

            return axiosInstance.patch("/user/profile", payload)
        },
        onSuccess: () => {
            toast.success("Profile updated")
            hasReset.current = false
            refetchProfile()
        },
        onError: (err: any) => {
            toast.error(err.message || "Failed to update profile")
            console.error(err)
        },
    })


    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-green-800">Profile Details</CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={form.handleSubmit((v) => saveProfileMutation.mutate(v))}
                    className="space-y-4"
                >
                    <Input {...form.register("fullName")} placeholder="Full Name" />
                    <Input {...form.register("email")} disabled placeholder="Email" />
                    <Input {...form.register("phone")} placeholder="Contact Number" />
                    <Input {...form.register("location")} placeholder="Location" />
                    <Input {...form.register("title")} placeholder="Current Position" />
                    <Input
                        {...form.register("description")}
                        maxLength={125}
                        placeholder="Short description (max 125 characters)"
                    />
                    <Input {...form.register("socialLinks.linkedin")} placeholder="LinkedIn URL" />
                    <Input {...form.register("socialLinks.github")} placeholder="GitHub URL" />
                    <Input {...form.register("socialLinks.twitter")} placeholder="Twitter URL" />

                    <Button
                        type="submit"
                        className="w-full cursor-pointer"
                        disabled={saveProfileMutation.isPending}
                    >
                        {saveProfileMutation.isPending ? "Saving..." : "Save Profile"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
