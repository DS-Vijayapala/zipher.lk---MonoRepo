// export const authFetch = async (url: string, options: RequestInit = {}) => {
//     let response = await fetch(url, options);

//     if (response.status !== 401) return response;

//     const refreshRes = await fetch("http://localhost:3000/api/auth/update", {
//         method: "GET",
//     });


//     console.log(refreshRes);


//     if (!refreshRes.ok) {
//         throw new Error("Session expired");
//     }

//     const { accessToken } = await refreshRes.json();

//     options.headers = {
//         ...options.headers,
//         Authorization: `Bearer ${accessToken}`
//     };

//     return fetch(url, options);
// };
