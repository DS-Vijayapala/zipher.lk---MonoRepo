// this file only handle resume upload UI and logic


"use client"

import { useEffect, useState } from "react"
import { FileText, Upload, Download, Eye, Edit3 } from "lucide-react"
import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"
import axiosInstance from "@/lib/axiosInstence"
import { useProfile } from "../hooks/useProfile"

export default function ResumeSection() {

    const { resumeUrl, refetchProfile } = useProfile()

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isEdit, setIsEdit] = useState(false)

    const uploadResumeMutation = useMutation({

        mutationFn: async () => {

            if (!selectedFile) return

            const formData = new FormData()

            formData.append("resume", selectedFile)

            return axiosInstance.post("/profile/upload-resume", formData)

        },

        onSuccess: () => {
            toast.success("Resume uploaded")
            setSelectedFile(null)
            setIsEdit(false)
            refetchProfile()
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
                    <p className="text-gray-500 text-sm">
                        Keep your resume up to date
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
                {isEdit || !resumeUrl ? (
                    <>
                        {/* File Picker */}
                        <label
                            htmlFor="resumeUpload"
                            className={`inline-flex items-center gap-2 bg-green-600
                                hover:bg-green-700 text-white px-4 py-2.5 rounded-lg 
                                font-medium cursor-pointer transition"`}
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

                                    setSelectedFile(file)
                                }}
                            />
                        </label>

                        {/* Save */}
                        <button
                            onClick={() => uploadResumeMutation.mutate()}
                            disabled={!selectedFile}
                            className={`inline-flex items-center gap-2 bg-lime-600
                            hover:bg-lime-700 disabled:bg-gray-300 text-white
                                px-4 py-2.5 rounded-lg font-medium transition"`}
                        >
                            <Download className="w-4 h-4" />
                            Save Resume
                        </button>

                        {/* Cancel */}
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
                        {/* View */}
                        <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 bg-green-600
                             hover:bg-green-700 text-white px-4 py-2.5 rounded-lg 
                                font-medium transition"`}
                        >
                            <Eye className="w-4 h-4" />
                            View Resume
                        </a>

                        {/* Edit */}
                        <button
                            onClick={() => setIsEdit(true)}
                            className={`inline-flex items-center gap-2 text-green-700
                                bg-green-50 border border-green-200 px-4 py-2.5 
                                rounded-lg font-medium hover:bg-green-100 transition`}
                        >
                            <Edit3 className="w-4 h-4" />
                            Update Resume
                        </button>
                    </>
                )}
            </div>

            {/* Selected File Indicator */}
            {selectedFile && (
                <div className="mt-4 p-4 bg-lime-50 border border-lime-200 rounded-lg">
                    <div className="flex items-center gap-2 text-lime-800">
                        <FileText className="w-4 h-4" />
                        <span className="font-medium">{selectedFile.name}</span>
                    </div>
                </div>
            )}
        </div>
    )
}
