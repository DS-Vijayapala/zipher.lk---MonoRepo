"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Mail, Lock, Eye, EyeOff, LogIn, Chrome } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstence";
import { createSession } from "@/lib/session";
import toast from "react-hot-toast";
import Logo from "@/components/shared/Logo";
import { useQueryClient } from '@tanstack/react-query'

export default function LoginPage() {

    const queryClient = useQueryClient();

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const loginMutation = useMutation({
        mutationFn: async (data: { email: string; password: string }) => {
            const res = await axiosInstance.post("/auth/signin", data);
            return res.data;
        },

        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Login failed");
        },
    });

    const onSubmit = (data: any) => {
        loginMutation.mutate(data, {
            onSuccess: async (response) => {
                toast.success("Login successful!");

                await createSession({
                    user: {
                        id: response.id,
                        email: response.email,
                        name: response.name,
                        role: response.role,
                    },
                    accessToken: response.accessToken,
                    refreshToken: response.refreshToken,
                });

                queryClient.invalidateQueries({ queryKey: ["user-session"] });

                toast.success(`Welcome back, ${response.name}!`);
                router.push("/dashboard");
            },
        });
    };

    return (

        <div
            className={clsx(
                `h-screen flex items-center justify-center 
                bg-white px-2 py-5`
            )}
        >
            <div className={`w-full max-w-md`}>


                <div className={`text-center mb-8`}>

                    <div className={`flex justify-center mb-4`}>
                        <Logo size="large" />
                    </div>

                    <h1 className={`text-3xl font-bold text-green-800 mb-2`}>
                        Welcome Back
                    </h1>

                    <p className={`text-slate-800`}>
                        Sign in to continue your journey
                    </p>

                </div>

                {/* Card */}

                <div className={`bg-white rounded-2xl shadow-xl p-8 space-y-6`}>

                    {/* Continue with Google */}

                    <a
                        onClick={() => {
                            toast.loading("Redirecting to Google...");
                            window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`;
                        }}
                        className={clsx(
                            `w-full py-3 px-4 rounded-lg font-medium`,
                            `bg-lime-100 text-green-800 border border-lime-300`,
                            `hover:bg-lime-200 transition-all flex items-center justify-center gap-3 cursor-pointer`
                        )}
                    >
                        <Chrome className={`w-5 h-5 text-green-700`} />
                        <span>Continue with Google</span>
                    </a>

                    {/* Form */}

                    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-5`}>

                        {/* Email */}

                        <div>

                            <label className={`block text-sm font-medium text-green-900 mb-2`}>
                                Email Address
                            </label>

                            <div className={`relative`}>
                                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600`} />

                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    className={`block w-full pl-10 pr-3 py-3 border border-lime-300 rounded-lg 
                                    focus:ring-2 focus:ring-green-700 outline-none text-slate-800`}
                                    placeholder="you@example.com"
                                />
                            </div>

                            {errors.email && (
                                <p className={`text-sm text-red-600 mt-2`}>
                                    {errors.email.message}
                                </p>
                            )}

                        </div>

                        {/* Password */}

                        <div>

                            <label className={`block text-sm font-medium text-green-900 mb-2`}>
                                Password
                            </label>

                            <div className={`relative`}>
                                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5
                                     text-green-600`} />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                    className={`block w-full pl-10 pr-10 py-3 border border-lime-300 rounded-lg 
                                    focus:ring-2 focus:ring-green-700 outline-none text-slate-800`}
                                    placeholder="••••••••"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 text-green-700`}
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>

                            </div>

                            {errors.password && (
                                <p className={`text-sm text-red-600 mt-2`}>
                                    {errors.password.message}
                                </p>
                            )}

                        </div>

                        {/* Submit */}

                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className={clsx(
                                `w-full py-3 px-4 rounded-lg font-medium text-white`,
                                `bg-green-700 hover:bg-green-800`,
                                `focus:ring-4 focus:ring-green-200 transition-all`,
                                loginMutation.isPending && `opacity-70 cursor-not-allowed`
                            )}
                        >

                            {loginMutation.isPending ? "Signing in..." : "Sign In"}

                        </button>

                    </form>

                    {/* Sign Up */}

                    <div className={`text-center pt-4 border-t border-lime-200`}>

                        <p className={`text-sm text-slate-700`}>

                            Don’t have an account?{" "}
                            <a
                                href="/auth/signup"
                                className={`text-green-700 hover:text-green-800 font-medium`}
                            >
                                Sign up
                            </a>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}
