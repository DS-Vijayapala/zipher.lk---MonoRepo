"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { get } from "http";
import { getSession } from "@/lib/session";

const AppBar = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [session, setSession] = useState<any>(null);

    useEffect(() => {

        const fetchSession = async () => {

            const session = await getSession();
            setSession(session || null);
            console.log(session);
        };

        fetchSession();

    }, []);

    return (

        <div className="text-sm text-white w-full">

            <div className={`text-center font-medium py-2 bg-linear-to-r
                 from-violet-500 via-[#9938CA] to-[#E0724A]`}>

                <p> Welcome to Auth App.
                    <span className="underline underline-offset-2">Offer Ends Soon!</span>
                </p>

            </div>

            <nav className={`relative h-[70px] flex items-center
                 justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4
                  bg-white text-gray-900 transition-all shadow`}>

                <Link
                    href="/"
                    className="text-2xl font-bold bg-linear-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                    Auth
                </Link>

                <ul className="hidden md:flex items-center space-x-8 md:pl-28">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Portfolio</a></li>
                    <li><a href="#">Pricing</a></li>
                </ul>

                {/* Show Correct Button */}

                {!session ? (
                    <Link
                        href="/auth/login"
                        className={`bg-white hover:bg-gray-50 border border-gray-300 px-9 py-2
                         rounded-full active:scale-95 transition-all hidden md:inline`}>
                        Get started
                    </Link>
                ) : (
                    <div>

                        <span className="mr-4 font-bold">Hello, {session.user.name}</span>

                        <Link
                            href="/auth/logout"
                            className={`bg-white hover:bg-gray-50 border border-gray-300 px-9 py-2
                            rounded-full active:scale-95 transition-all hidden md:inline`}>
                            Log out
                        </Link>

                    </div>
                )}

                <button
                    aria-label="menu-btn"
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="inline-block md:hidden active:scale-90 transition">
                    <div className="w-[30px] h-[30px] flex flex-col justify-center gap-1.5">
                        <span className="w-full h-0.5 bg-gray-900"></span>
                        <span className="w-full h-0.5 bg-gray-900"></span>
                        <span className="w-full h-0.5 bg-gray-900"></span>
                    </div>
                </button>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="absolute top-[70px] left-0 w-full bg-white shadow-sm p-6 md:hidden">
                        <ul className="flex flex-col space-y-4 text-lg">
                            <li><a href="#" className="text-sm">Home</a></li>
                            <li><a href="#" className="text-sm">Services</a></li>
                            <li><a href="#" className="text-sm">Portfolio</a></li>
                            <li><a href="#" className="text-sm">Pricing</a></li>
                        </ul>

                        {/* Mobile Button */}
                        {!session ? (
                            <Link
                                href="/auth/login"
                                className={`mt-4 inline-block bg-white hover:bg-gray-50 border border-gray-300 px-9 py-2 rounded-full active:scale-95 transition-all`}>
                                Get started
                            </Link>
                        ) : (
                            <Link
                                href="/auth/logout"
                                className={`mt-4 inline-block bg-white hover:bg-gray-50 border border-gray-300 px-9 py-2 rounded-full active:scale-95 transition-all`}>
                                Log out
                            </Link>
                        )}
                    </div>
                )}
            </nav>

        </div>
    );
};

export default AppBar;
