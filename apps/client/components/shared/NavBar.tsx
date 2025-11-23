"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Menu, X, User, LogOut } from "lucide-react";
import Logo from "../shared/Logo";
import UserButton from "@/components/shared/UserButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import axiosInstance from "@/lib/axiosInstence";
import { useUser } from "@/hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";

const NavBar: React.FC = () => {

    const queryClient = useQueryClient();

    const { data: session, isLoading } = useUser();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const pathname = usePathname();

    const router = useRouter();

    const links = [

        { name: "Home", path: "/" },
        { name: "Jobs", path: "/all-jobs" },
        { name: "Dashboard", path: "/dashboard" },

    ];


    // Lock body scroll when login modal open

    const logout = async () => {

        try {

            await Promise.all([
                axiosInstance.post("/auth/signout"),
                fetch("/api/auth/logout", { method: "GET" }),
            ]);

            // THIS refreshes navbar immediately

            queryClient.invalidateQueries({ queryKey: ["user-session"] });

            router.push("/auth/login");

            toast.success("You have been logged out successfully.");

        } catch (error) {

            console.error("Logout failed:", error);

            router.push("/auth/login");

        }

    };

    return (

        <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b
         border-slate-200 shadow-sm`}>

            <div className="container px-4 2xl:px-20 mx-auto">

                <div className="flex items-center justify-between h-14">

                    {/* Logo */}

                    <div className="shrink-0">

                        <Logo highlightSize="text-2xl" size="text-xl" />

                    </div>

                    {/* Desktop Navigation */}

                    <div className="hidden md:flex items-center gap-8">

                        <nav
                            className="flex items-center gap-6"
                            role="navigation"
                            aria-label="Main navigation">

                            {links.map((link) => (

                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={cn(
                                        "relative text-sm font-medium transition-all duration-200 py-2 px-1 group",
                                        pathname === link.path || pathname.startsWith(`${link.path}/`)
                                            ? "text-green-700"
                                            : "text-slate-600 hover:text-green-600"
                                    )}
                                    aria-current={
                                        pathname === link.path || pathname.startsWith(`${link.path}/`)
                                            ? "page"
                                            : undefined
                                    }>

                                    {link.name}

                                    <span
                                        className={cn(
                                            "absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-green-600 to-lime-500 transition-all duration-200",
                                            pathname === link.path || pathname.startsWith(`${link.path}/`)
                                                ? "w-full"
                                                : "w-0 group-hover:w-full"
                                        )}
                                    />

                                </Link>


                            ))}

                        </nav>

                        {/* Auth Section */}

                        <div className="flex items-center gap-4 pl-4 border-l border-slate-200">

                            {session ? (
                                <UserButton
                                    userData={session.user}
                                    logout={logout}
                                    navigate={router.push} />
                            ) : (

                                <Link
                                    href={'/auth/login'}
                                    className={`bg-linear-to-r from-green-600
                                     to-lime-600 text-white text-sm font-medium
                                      px-4 py-2 rounded-lg hover:from-green-700
                                       hover:to-lime-700 transition-all duration-200
                                        shadow-sm focus:outline-none `}>

                                    Login

                                </Link>

                            )}

                        </div>

                    </div>

                    {/* Mobile Menu Button */}

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`md:hidden p-2 rounded-lg text-slate-600
                         hover:text-green-600 hover:bg-slate-50 transition-colors
                          focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-2"
                        aria-label="Toggle mobile menu`}
                        aria-expanded={mobileMenuOpen}
                    >

                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}

                    </button>

                </div>

                {/* Mobile Menu */}

                <div
                    className={cn(
                        "md:hidden border-t border-slate-200 bg-white transition-transform duration-300 overflow-hidden",
                        mobileMenuOpen ? "max-h-screen" : "max-h-0"
                    )}
                    role="menu"
                    aria-label="Mobile menu"
                >

                    <div className="py-4 space-y-2">

                        {links.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                role="menuitem"
                                className={cn(
                                    "block px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                                    link.path === pathname
                                        ? "text-green-700 bg-green-50"
                                        : "text-slate-600 hover:text-green-600 hover:bg-slate-50"
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                            >

                                {link.name}

                            </Link>

                        ))}

                        {/* Mobile Auth Section */}

                        <div className="pt-2 border-t border-slate-100 mt-2">

                            {session ? (

                                <div className="space-y-2">

                                    <div className="flex items-center gap-3 px-4 py-2">

                                        <Avatar className="h-8 w-8">

                                            <AvatarImage src={session?.user?.image} alt={session?.user?.name} />

                                            <AvatarFallback className={`bg-linear-to-br from-green-500
                                             to-lime-500 text-white text-sm`}>

                                                {session?.user?.name ?
                                                    session.user.name.charAt(0).toUpperCase() :
                                                    <User className="h-4 w-4" />}

                                            </AvatarFallback>

                                        </Avatar>

                                        <div className="flex-1 min-w-0">

                                            <p className="text-sm font-medium text-slate-800 truncate">
                                                {session?.user?.name || "User"}
                                            </p>

                                            <p className="text-xs text-slate-500 truncate">
                                                {session?.user?.email || "user@example.com"}
                                            </p>

                                        </div>

                                    </div>

                                    <button
                                        onClick={() => {
                                            logout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className={`flex items-center gap-3 w-full px-4 py-2 text-sm
                                         text-red-600 hover:bg-red-50 rounded-lg transition-colors
                                          text-left focus:outline-none focus:ring-2 focus:ring-red-500
                                           focus:ring-offset-2 focus:ring-offset-white`}
                                    >

                                        <LogOut className="h-4 w-4" />

                                        Logout

                                    </button>

                                </div>

                            ) : (

                                <Link
                                    href={'/auth/login'}
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`w-full bg-linear-to-r from-green-600 to-lime-600
                                     text-white text-sm font-medium px-4 py-2 rounded-lg
                                      hover:from-green-700 hover:to-lime-700 transition-all 
                                      duration-200 shadow-sm focus:outline-none focus:ring-2
                                       focus:ring-green-500 focus:ring-offset-2`}
                                >

                                    Login

                                </Link>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </nav>

    );

};


export default NavBar;
