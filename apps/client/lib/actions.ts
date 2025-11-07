"use server"

import axiosInstance from "./axiosInstence"
import { getSession } from "./session"


export const getProfile = async () => {

    const session = await getSession()

    const response = await axiosInstance.get("/auth/protected", {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })

    const result = await response.data

    return result

}