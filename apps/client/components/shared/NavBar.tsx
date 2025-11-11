"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/session";
import LogoutButton from "./LogoutButton";
import Logo from "./Logo";

const NavBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [session, setSession] = useState<any>(null);

    const router = useRouter();

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            setSession(session || null);
            console.log(session);
        };

        fetchSession();
    }, []);

    return (
        <div className="text-sm text-slate-800 w-full font-semibold">

            {/* Navbar */}
            <nav
                className={`relative h-[70px] flex items-center justify-between 
          px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-slate-800 
          transition-all shadow-md`}
            >
                {/* Logo */}
                <Logo size="text-xl" highlightSize="text-2xl" />

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center space-x-8 md:pl-28">
                    <li>
                        <Link
                            href="/"
                            className="hover:text-green-700 transition-colors duration-200"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/all-jobs"
                            className="hover:text-green-700 transition-colors duration-200"
                        >
                            Find Jobs
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/pricing"
                            className="hover:text-green-700 transition-colors duration-200"
                        >
                            Pricing
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact-us"
                            className="hover:text-green-700 transition-colors duration-200"
                        >
                            Contact Us
                        </Link>
                    </li>
                </ul>

                {/* Right Side Buttons */}
                {!session ? (
                    <Link
                        href="/auth/login"
                        className={`bg-green-700 text-white hover:bg-green-800 
              px-9 py-2 rounded-full active:scale-95 transition-all hidden md:inline`}
                    >
                        Get started
                    </Link>
                ) : (
                    <div>
                        <span className="mr-4 font-bold text-green-800">
                            Hello, {session.user.name}
                        </span>
                        <LogoutButton />
                    </div>
                )}

                {/* Mobile Menu Toggle */}
                <button
                    aria-label="menu-btn"
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="inline-block md:hidden active:scale-90 transition"
                >
                    <div className="w-[30px] h-[30px] flex flex-col justify-center gap-1.5">
                        <span className="w-full h-0.5 bg-green-800"></span>
                        <span className="w-full h-0.5 bg-green-800"></span>
                        <span className="w-full h-0.5 bg-green-800"></span>
                    </div>
                </button>

                {/* Mobile Dropdown */}
                {isMobileMenuOpen && (
                    <div className="absolute top-[70px] left-0 w-full shadow-sm p-6 md:hidden">
                        <ul className="flex flex-col space-y-4 text-lg">
                            <li>
                                <Link
                                    href="/"
                                    className="text-slate-800 hover:text-green-700 transition"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/all-jobs"
                                    className="text-slate-800 hover:text-green-700 transition"
                                >
                                    Find Jobs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pricing"
                                    className="text-slate-800 hover:text-green-700 transition"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact-us"
                                    className="text-slate-800 hover:text-green-700 transition"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>

                        {/* Mobile Button */}
                        {!session ? (
                            <Link
                                href="/auth/login"
                                className={`mt-5 inline-block w-full text-center 
                  bg-green-700 hover:bg-green-800 text-white 
                  px-9 py-2 rounded-full active:scale-95 transition-all`}
                            >
                                Get started
                            </Link>
                        ) : (
                            <LogoutButton />
                        )}
                    </div>
                )}
            </nav>
        </div>
    );
};

export default NavBar;
