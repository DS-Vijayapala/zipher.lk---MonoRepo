"use client"

import React from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Job } from "../types"

interface JobDetailsDialogProps {
    open: boolean
    onClose: () => void
    jobId: string | null
}

const JobDetailsDialog: React.FC<JobDetailsDialogProps> = ({
    open,
    onClose,
    jobId,
}) => {
    if (!jobId) return null

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-sm sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-green-800">
                        Job Details
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-slate-500">Job ID</p>
                        <p className="font-medium">{jobId}</p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">Job Title</p>
                        <p className="font-semibold text-green-700">
                            {jobId}
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full border-green-200 text-green-700"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default JobDetailsDialog
