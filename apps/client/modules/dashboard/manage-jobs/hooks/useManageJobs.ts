import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchJobs, toggleVisibility } from "../mock/jobs"

export const PAGE_SIZE = 9

export const useManageJobs = (page: number) => {
    const qc = useQueryClient()

    const query = useQuery({
        queryKey: ["manage-jobs", page],
        queryFn: () => fetchJobs(page, PAGE_SIZE),
        placeholderData: (previousData) => previousData,
    })

    const visibilityMutation = useMutation({
        mutationFn: toggleVisibility,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["manage-jobs"] })
        },
    })

    return {
        ...query,
        toggleVisibility: visibilityMutation.mutate,
    }
}
