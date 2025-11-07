// "use server";

// import axios from "axios";
// import { getSession, updateSessionTokens, deleteSession } from "./session";

// export async function refreshTokenAction(): Promise<{
//     success: boolean;
//     accessToken?: string;
//     error?: string
// }> {

//     try {

//         const session = await getSession();

//         if (!session?.refreshToken) {

//             return { success: false, error: "No refresh token" };

//         }

//         const response = await axios.post(
//             `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
//             { refresh: session.refreshToken },
//             { headers: { "Content-Type": "application/json" } }
//         );

//         const { accessToken, refreshToken } = response.data;

//         if (!accessToken || !refreshToken) {

//             return { success: false, error: "Invalid token response" };

//         }

//         // This works because we're in a Server Action

//         await updateSessionTokens({ accessToken, refreshToken });


//         return { success: true, accessToken };

//     } catch (error: any) {

//         await deleteSession();

//         return {
//             success: false,
//             error: error.response?.data?.message || "Refresh failed"
//         };

//     }

// }