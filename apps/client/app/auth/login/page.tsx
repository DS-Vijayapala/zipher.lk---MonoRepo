'use client';

import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstence';
import { create } from 'domain';
import { createSession } from '@/lib/session';


export default function LoginPage() {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const loginMutation = useMutation({
        mutationFn: async (data: { email: string; password: string }) => {
            const res = await axiosInstance.post('/auth/signin', data);
            return res.data;
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },

    });

    const onSubmit = (data: any) => {
        loginMutation.mutate(data, {
            onSuccess: async (response) => {

                await createSession({
                    user: {
                        id: response.id,
                        name: response.name,
                    },
                    accessToken: response.accessToken,
                    refreshToken: response.refreshToken,
                });

                router.push("/dashboard");
            }

        });

    };

    return (
        <div className={clsx(`min-h-screen flex items-center justify-center
         bg-linear-to-br from-blue-50 via-white to-purple-50 px-4 py-8`)}>

            <div className="w-full max-w-md">

                {/* Header */}

                <div className="text-center mb-8">

                    <div className={`inline-flex items-center justify-center
                         w-16 h-16 bg-blue-600 rounded-2xl mb-4`}>

                        <LogIn className="w-8 h-8 text-white" />

                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>

                    <p className="text-gray-600">Sign in to continue to your account</p>

                </div>

                {/* Card */}

                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">



                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* Email */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>

                            <div className="relative">

                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                                <input
                                    type="email"
                                    {...register('email', { required: 'Email is required' })}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="you@example.com"
                                />

                            </div>

                            {errors.email && <p className="text-sm text-red-600 mt-2">{errors.email.message}</p>}

                        </div>

                        {/* Password */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>

                            <div className="relative">

                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password',
                                        { required: 'Password is required' })}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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

                            {errors.password && <p className="text-sm text-red-600 mt-2">{errors.password.message}</p>}

                        </div>

                        {/* Forgot password */}

                        <div className="flex justify-end">

                            <a href="/auth/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                Forgot password?
                            </a>

                        </div>

                        {/* Submit */}

                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className={clsx(
                                'w-full py-3 px-4 rounded-lg font-medium text-white',
                                'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all',
                                loginMutation.isPending && 'opacity-70 cursor-not-allowed'
                            )}>

                            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}

                        </button>

                    </form>

                    {/* Error Alert */}
                    {loginMutation.isError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {(loginMutation.error as any)?.response?.data?.message || 'Login failed'}
                        </div>
                    )}

                    {/* Sign Up */}
                    <div className="text-center pt-4 border-t border-gray-200">

                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <a href="/auth/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                                Sign up
                            </a>
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}
