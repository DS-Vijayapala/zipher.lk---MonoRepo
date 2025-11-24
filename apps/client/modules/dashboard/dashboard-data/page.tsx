'use client'

import React from 'react'
import { useDashboardData } from './hooks/useDashBoardData';

const DashBoardPage = () => {

    const { data, isLoading, isError, refetch } = useDashboardData();

    return (
        <>
            <div>DashBoardPage</div>
            <p>{isLoading ? 'Loading...' : isError ? 'Error loading data' : JSON.stringify(data)}</p>
        </>
    )
}

export default DashBoardPage