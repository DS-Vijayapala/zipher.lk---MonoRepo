"use server";

import axiosInstance from "./axiosInstence";
import { getSession } from "./session";

export const getProfile = async () => {

    try {

        const session = await getSession();

        if (!session || !session.accessToken) {
            return {
                ok: false,
                error: "No valid session found. User is not authenticated.",
            };
        }

        const response = await axiosInstance.get("/auth/protected", {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });

        return {
            ok: true,
            data: response.data,
        };

    } catch (err: any) {

        if (err.response) {

            return {
                ok: false,
                status: err.response.status,
                error: err.response.data?.message || "Request failed",
            };

        }

        if (err.request) {
            return {
                ok: false,
                error: "Server did not respond. Check your network connection.",
            };
        }

        return {
            ok: false,
            error: err.message || "Unknown error occurred.",
        };

    }

};
