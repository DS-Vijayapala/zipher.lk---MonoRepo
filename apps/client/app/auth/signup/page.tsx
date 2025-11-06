"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import clsx from "clsx";
import { BACKEND_URL } from "@/lib/constant";
import { useRouter } from "next/navigation";
import { log } from "console";

type FormValues = {
    name: string;
    email: string;
    password: string;
};

export default function SignUpPage() {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const mutation = useMutation({
        mutationFn: async (data: FormValues) => {
            console.log(data);

            const res = await axios.post(`${BACKEND_URL}/auth/signup`, data);

            console.log(res);


            return res.data;
        },
        onSuccess: () => {
            router.push("/auth/login");
        },
    });

    const onSubmit = (data: FormValues) => {
        mutation.mutate(data);
    };

    return (
        <div
            className={clsx(
                "min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 px-4 py-8"
            )}>

            <div className="w-full max-w-md">

                <div className="text-center mb-8">

                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
                        <User className="w-8 h-8 text-white" />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>

                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        <div>

                            <label className="block text-sm mb-2">Full Name</label>

                            <div className="relative">

                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    {...register("name", { required: "Full name is required" })}
                                    type="text"
                                    className="w-full pl-11 pr-4 py-3 border rounded-lg"
                                    placeholder="John Doe"
                                />
                            </div>

                            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}

                        </div>

                        <div>

                            <label className="block text-sm mb-2">Email</label>

                            <div className="relative">

                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    {...register("email", { required: "Email is required" })}
                                    type="email"
                                    className="w-full pl-11 pr-4 py-3 border rounded-lg"
                                    placeholder="you@example.com"
                                />
                            </div>

                            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}

                        </div>

                        <div>

                            <label className="block text-sm mb-2">Password</label>

                            <div className="relative">

                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    {...register("password", { required: "Password is required" })}
                                    type={showPassword ? "text" : "password"}
                                    className="w-full pl-11 pr-12 py-3 border rounded-lg"
                                    placeholder="••••••••"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>

                            </div>

                            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}

                            {/* Backend Error Display */}

                            {mutation.isError && (

                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm space-y-1 mt-5">
                                    <p>{(mutation.error as any)?.response?.data?.message || "Signup failed"}</p>
                                </div>

                            )}

                        </div>

                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {mutation.isPending ? "Creating Account..." : "Sign Up"}

                            <ArrowRight className="w-5 h-5" />

                        </button>

                    </form>

                </div>

                <p className="text-center text-gray-600 mt-6">

                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-blue-600 font-semibold hover:text-blue-700">
                        Log In
                    </Link>

                </p>

            </div>

        </div>

    );

}
