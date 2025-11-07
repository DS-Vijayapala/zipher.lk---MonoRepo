"use server";

import axiosInstance from "./axiosInstence";
import { getSession } from "./session";

export const getProfile = async () => {

    try {

        const session = await getSession();

        if (!session) {
            return {
                ok: false,
                error: "Not authenticated",
            };
        }

        const response = await axiosInstance.get("/auth/protected");

        return {
            ok: true,
            data: response.data,
        };

    }
    catch (err: any) {

        return {
            ok: false,
            error: err.response?.data?.message || err.message || "Request failed",
        };

    }

};
