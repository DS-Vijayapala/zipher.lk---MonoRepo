"use client"

import Title from "@/components/shared/Title"
import ResumeSection from "./components/ResumeSection"
import ProfileDetailsForm from "./components/ProfileDetailsForm"
import { useProfile } from "./hooks/useProfile"
import Loading from "@/components/shared/Loading"

export default function ProfilePage() {


    const { isLoading } = useProfile()

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <Title
                title="Complete Your Profile"
                subTitle="Keep your profile and resume up to date"
            />

            {/* Resume upload */}
            <ResumeSection />

            {/* Profile details */}
            <ProfileDetailsForm />
        </div>
    )
}
