"use server";

import { BACKEND_URL } from "./constant";
import { SignUpFormSchema, FormState } from "./type";
import { redirect } from "next/navigation";

export async function signUp(

    prevState: FormState,
    formData: FormData

): Promise<FormState> {

    const validation = SignUpFormSchema.safeParse({

        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),

    });

    if (!validation.success) {

        const errors = validation.error.flatten().fieldErrors;

        return { error: errors };
    }

    try {

        const response = await fetch(`${BACKEND_URL}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validation.data),
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: data.errors || { email: ["Failed to sign up"] } };
        }

        redirect("/auth/login");

    } catch (error) {

        console.error("Signup error:", error);

        return { error: { email: ["Network or server error occurred"] } };

    }

}
