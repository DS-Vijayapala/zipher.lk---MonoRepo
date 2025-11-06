"use client";

import React from "react";
import { cn } from "../../../lib/utils";
import { useFormState, useFormStatus } from "react-dom";

const SignUpPage = () => {

    const [state, setState] = React.useState("login");

    const { pending } = useFormStatus();

    const [data, setData] = React.useState({
        name: "",
        email: "",
        password: "",
    });

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Add sign-up / login logic
    };

    return (
        <div
            className={cn(
                "min-h-screen flex items-center justify-center bg-gradient-to-br",
                "from-green-50 to-green-100 dark:from-green-900 dark:to-green-950 p-4"
            )}
        >
            <form
                onSubmit={handleSubmit}
                className={cn(
                    "w-full sm:w-[360px] text-center border rounded-3xl px-8 py-10",
                    "border-green-200 dark:border-green-700",
                    "bg-white/90 dark:bg-green-950/80 backdrop-blur-lg shadow-xl"
                )}
            >
                {/* Header */}
                <h1
                    className={cn(
                        "text-3xl font-semibold mb-2",
                        "text-green-700 dark:text-green-100"
                    )}
                >
                    {state === "login" ? "Welcome Back" : "Create Account"}
                </h1>

                <p
                    className={cn(
                        "text-sm mb-8",
                        "text-pink-500 dark:text-pink-300"
                    )}
                >
                    {state === "login"
                        ? "Login to continue your journey ✨"
                        : "Join us and start your journey 🚀"}
                </p>

                {/* Name Input */}
                {state !== "login" && (
                    <div
                        className={cn(
                            "flex items-center w-full mt-4 bg-white dark:bg-pink-900",
                            "border border-pink-200 dark:border-pink-700",
                            "h-12 rounded-full overflow-hidden pl-6 gap-2",
                            "focus-within:ring-2 focus-within:ring-pink-500 transition"
                        )}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-pink-500 dark:text-pink-400"
                            viewBox="0 0 24 24"
                        >
                            <path d="M20 21a8 8 0 0 0-16 0" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>

                        <input
                            type="text"
                            placeholder="Full Name"
                            className="bg-transparent text-pink-700 dark:text-pink-100 placeholder-pink-400 outline-none text-sm w-full h-full"
                            name="name"
                            value={data.name}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                )}

                {/* Email Input */}
                <div
                    className={cn(
                        "flex items-center w-full mt-4 bg-white dark:bg-pink-900",
                        "border border-pink-200 dark:border-pink-700",
                        "h-12 rounded-full overflow-hidden pl-6 gap-2",
                        "focus-within:ring-2 focus-within:ring-pink-500 transition"
                    )}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-pink-500 dark:text-pink-400"
                        viewBox="0 0 24 24"
                    >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>

                    <input
                        type="email"
                        placeholder="Email Address"
                        className="bg-transparent text-pink-700 dark:text-pink-100 placeholder-pink-400 outline-none text-sm w-full h-full"
                        name="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        required
                    />
                </div>

                {/* Password Input */}
                <div
                    className={cn(
                        "flex items-center mt-4 w-full bg-white dark:bg-pink-900",
                        "border border-pink-200 dark:border-pink-700",
                        "h-12 rounded-full overflow-hidden pl-6 gap-2",
                        "focus-within:ring-2 focus-within:ring-pink-500 transition"
                    )}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-pink-500 dark:text-pink-400"
                        viewBox="0 0 24 24"
                    >
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>

                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-transparent text-pink-700 dark:text-pink-100 placeholder-pink-400 outline-none text-sm w-full h-full"
                        name="password"
                        value={data.password}
                        onChange={onChangeHandler}
                        required
                    />
                </div>

                {/* Forgot Password */}
                {state === "login" && (
                    <div className="mt-4 text-right">
                        <a
                            className="text-sm text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300 transition"
                            href="#"
                        >
                            Forgot password?
                        </a>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className={cn(
                        "mt-6 w-full h-11 rounded-full text-white font-semibold transition-all active:scale-[0.98]",
                        "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700",
                        "shadow-lg shadow-pink-200 dark:shadow-pink-900/40"
                    )}
                >
                    {state === "login" ? "Login" : "Create Account"}
                </button>

                {/* Switch Mode */}
                <p className="text-pink-600 dark:text-pink-300 text-sm mt-6 mb-2">
                    {state === "login"
                        ? "Don't have an account? "
                        : "Already have an account? "}
                    <button
                        type="button"
                        className="text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300 font-medium transition"
                        onClick={() =>
                            setState((prev) =>
                                prev === "login" ? "register" : "login"
                            )
                        }
                    >
                        {state === "login" ? "Register" : "Login"}
                    </button>
                </p>
            </form>
        </div>
    );
};

export default SignUpPage;
