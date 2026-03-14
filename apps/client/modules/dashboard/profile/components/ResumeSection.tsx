"use client"

import { useState } from "react"
import { FileText, Upload, Download, Eye, Edit3 } from "lucide-react"
import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"

import axiosInstance from "@/lib/axiosInstence"
import { useProfile } from "../hooks/useProfile"

const MAX_RESUME_SIZE_MB = 2
const MAX_RESUME_SIZE = MAX_RESUME_SIZE_MB * 1024 * 1024

export default function ResumeSection() {
    const { resumeUrl, refetchProfile } = useProfile()

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isEdit, setIsEdit] = useState(false)

    // Mutation to upload resume
    const uploadResumeMutation = useMutation({
        mutationFn: async () => {
            if (!selectedFile) {
                throw new Error("No resume selected")
            }

            const formData = new FormData()
            formData.append("file", selectedFile)

            return axiosInstance.post(
                "/user/resume/upload",
                formData,
                {
                    timeout: 60000, // 60 seconds
                }
            )
        },

        onSuccess: () => {
            toast.success("Resume uploaded successfully")
            setSelectedFile(null)
            setIsEdit(false)
            refetchProfile()
        },

        onError: (err: any) => {
            toast.error(
                'Something went wrong while uploading the resume. Please try again.'
            )
        },
    })

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">

                <div className={`w-12 h-12 bg-linear-to-br from-green-500 to-lime-500 
                rounded-xl flex items-center justify-center shadow-sm`}>
                    <FileText className="text-white w-6 h-6" />
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-green-800">Resume</h2>
                    <p className="text-gray-500 text-sm">Keep your resume up to date</p>
                </div>

            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">

                {isEdit || !resumeUrl ? (
                    <>
                        <label
                            htmlFor="resumeUpload"
                            className={`inline-flex items-center gap-2 bg-green-600
                             hover:bg-green-700 text-white px-4 py-2.5 rounded-lg 
                             font-medium cursor-pointer transition`}
                        >
                            <Upload className="w-4 h-4" />
                            {selectedFile ? "File Selected" : "Choose Resume"}
                            <input
                                id="resumeUpload"
                                type="file"
                                accept="application/pdf"
                                hidden
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (!file) return

                                    if (file.type !== "application/pdf") {
                                        toast.error("Only PDF files are allowed")
                                        return
                                    }

                                    if (file.size > MAX_RESUME_SIZE) {
                                        toast.error(`Resume must be under ${MAX_RESUME_SIZE_MB}MB`)
                                        return
                                    }

                                    setSelectedFile(file)
                                }}
                            />
                        </label>

                        <button
                            onClick={() => uploadResumeMutation.mutate()}
                            disabled={!selectedFile || uploadResumeMutation.isPending}
                            className={`inline-flex items-center gap-2 bg-lime-600
                             hover:bg-lime-700 disabled:bg-gray-300
                              text-white px-4 py-2.5 rounded-lg font-medium transition cursor-pointer`}
                        >
                            <Download className="w-4 h-4" />
                            {uploadResumeMutation.isPending ? "Uploading..." : "Save Resume"}
                        </button>

                        <button
                            onClick={() => {
                                setIsEdit(false)
                                setSelectedFile(null)
                            }}
                            className="px-4 py-2.5 border rounded-lg text-gray-600 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 bg-green-600
                             hover:bg-green-700 text-white px-4 py-2.5 
                             rounded-lg font-medium transition`}
                        >
                            <Eye className="w-4 h-4" />
                            View Resume
                        </a>

                        <button
                            onClick={() => setIsEdit(true)}
                            className={`inline-flex items-center gap-2 text-green-700
                             bg-green-50 border border-green-200 px-4 py-2.5 
                             rounded-lg font-medium hover:bg-green-100 transition cursor-pointer`}
                        >
                            <Edit3 className="w-4 h-4" />
                            Update Resume
                        </button>
                    </>
                )}
            </div>

            {selectedFile && (
                <div className="mt-4 p-4 bg-lime-50 border border-lime-200 rounded-lg">
                    <div className="flex items-center gap-2 text-lime-800">
                        <FileText className="w-4 h-4" />
                        <span className="font-medium text-xs">
                            {selectedFile.name.length > 125
                                ? `${selectedFile.name.slice(0, 125)}...`
                                : selectedFile.name}
                        </span>
                    </div>
                </div>
            )}

        </div>
    )
}
