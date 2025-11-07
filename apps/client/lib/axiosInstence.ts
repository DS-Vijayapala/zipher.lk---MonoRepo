import axios from "axios";
import { getSession, deleteSession } from "./session";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000",
    headers: { "Content-Type": "application/json" },
});

// In-memory token storage (only for access token during request cycle)

let memoryAccessToken: string | null = null;

let isRefreshing = false;

let refreshPromise: Promise<string> | null = null;

// Request interceptor: attach access token

axiosInstance.interceptors.request.use(

    async (config) => {

        // Try memory first (for refreshed tokens)

        let token = memoryAccessToken;

        // If not in memory, get from session

        if (!token) {

            const session = await getSession();

            token = session?.accessToken || null;

            if (token) {

                memoryAccessToken = token;

            }

        }

        if (token) {
            const cleanToken = String(token).replace(/"/g, "").trim();
            config.headers.Authorization = `Bearer ${cleanToken}`;
        }

        return config;

    },

    (error) => Promise.reject(error)

);


// Response interceptor: handle 401 and refresh token

axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {

                if (isRefreshing && refreshPromise) {
                    const newAccessToken = await refreshPromise;
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest);
                }

                isRefreshing = true;

                refreshPromise = refreshAccessToken();

                const newAccessToken = await refreshPromise;

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest);

            } catch (refreshError) {

                // Clear memory token

                memoryAccessToken = null;

                // Delete session if possible (only works in Server Action context)

                try {

                    await deleteSession();

                } catch {

                    // Ignore if we can't delete session here
                }

                return Promise.reject(new Error("Session expired. Please login again."));

            } finally {

                isRefreshing = false;
                refreshPromise = null;
            }

        }

        return Promise.reject(error);

    }

);


async function refreshAccessToken(): Promise<string> {

    const session = await getSession();

    if (!session?.refreshToken) {

        memoryAccessToken = null;

        throw new Error("No refresh token available");

    }

    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
        { refresh: session.refreshToken },
        { headers: { "Content-Type": "application/json" } }
    );

    const { accessToken, refreshToken } = response.data;

    if (!accessToken) {

        memoryAccessToken = null;

        throw new Error("Invalid token response");
    }

    // Store new access token in memory for immediate use

    memoryAccessToken = accessToken;

    // Note: We can't update the session cookie here due to Next.js restrictions
    // The session will be updated on the next server action that explicitly calls updateSessionTokens

    return accessToken;

}

// Helper to clear memory token (call this on logout)

export function clearMemoryToken() {
    memoryAccessToken = null;
}

export default axiosInstance;