'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstence';

export const useDashboardData = () => {

    return useQuery({
        queryKey: ['dashboardData'],
        queryFn: async () => {
            const res = await axiosInstance.get('/user/dashboard-data');
            return res.data?.data;
        },
        staleTime: 5 * 60 * 1000, // 5 min cache
        refetchInterval: 5 * 60 * 1000, // 5 min refetch
        refetchOnWindowFocus: false,
    });
};

