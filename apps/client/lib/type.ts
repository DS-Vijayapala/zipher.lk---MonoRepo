import { z } from "zod";

export type FormState = {
    error?: Record<string, string[]>;
    message?: string[];
} | undefined;

export const SignUpFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(100),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(100)
        .regex(/[A-Z]/, { message: "Must contain one uppercase letter" })
        .regex(/[a-z]/, { message: "Must contain one lowercase letter" })
        .regex(/[0-9]/, { message: "Must contain one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Must contain one special character" }),
});
