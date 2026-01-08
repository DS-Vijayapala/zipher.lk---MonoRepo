import axios from "@/lib/axiosInstence"
import { useQuery } from "@tanstack/react-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"
export interface Job {
    id: string
    title: string
    location: string
    postedAt: string
    visible: boolean
    applicants: number
}

export interface ManageJobsResponse {
    data: Job[]
    total: number
}


export const PAGE_LIMIT = 10

export const getUserPostedJobs = async (page: number) => {
    const { data } = await axios.get<ManageJobsResponse>(
        `/jobs/manage?page=${page}&limit=${PAGE_LIMIT}`
    )
    return data
}

export const toggleJobVisibility = async (jobId: string) => {
    const { data } = await axios.patch(
        `/jobs/manage/toggle-visibility`,
        { jobId }
    )
    return data
}




export const useGetUserPostedJobs = (page: number) => {
    return useQuery({
        queryKey: ["manage-jobs", page],
        queryFn: () => getUserPostedJobs(page),
        placeholderData: (previousData) => previousData,
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    })
}


export const useToggleJobVisibility = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: toggleJobVisibility,
        onMutate: async (jobId) => {
            await queryClient.cancelQueries({ queryKey: ["manage-jobs"] })
            const previous = queryClient.getQueriesData({ queryKey: ["manage-jobs"] })

            previous.forEach(([key, data]) => {
                queryClient.setQueryData(key, (old: any) => {
                    if (!old) return old

                    return {
                        ...old,
                        data: old.data.map((job: any) =>
                            job.id === jobId
                                ? { ...job, visible: !job.visible }
                                : job
                        ),
                    }
                })
            })

            return { previous }
        },

        onError: (_err, _jobId, context) => {
            context?.previous?.forEach(([key, data]) => {
                queryClient.setQueryData(key, data)
            })
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["manage-jobs"] })
        },
    })
}

