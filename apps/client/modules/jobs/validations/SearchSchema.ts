import { z } from "zod";

export const TitleSearchSchema = z
    .string()
    .trim()
    .min(2, "Add at least 2 characters.")
    .max(50, "cannot exceed 50 characters.")
    .regex(/^[a-zA-Z0-9\s\-,.&()]+$/, "Invalid characters used.");
