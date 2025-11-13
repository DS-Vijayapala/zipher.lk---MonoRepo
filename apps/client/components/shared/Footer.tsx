"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
    return (
        <footer className={`bg-slate-50 border-t border-slate-200 mt-24`}>
            <div className={`h-1 w-full bg-linear-to-r from-emerald-500 via-lime-500 to-green-500`} />

            <div className={`container px-4 2xl:px-20 mx-auto pt-16 pb-8`}>

                <div className={`flex flex-col lg:flex-row justify-between w-full gap-12 border-b border-slate-200 pb-12`}>

                    {/* Company Info */}
                    <div className={`lg:max-w-md`}>
                        <Logo />

                        <p className={`text-slate-600 text-sm leading-relaxed mb-6 mt-3`}>
                            Zipher.lk connects talent with opportunities through a seamless,
                            all-in-one platform. We empower individuals and organizations to build
                            meaningful professional relationships and accelerate career growth.
                            Your next career move starts here.
                        </p>

                        {/* Social Icons */}
                        <div className={`flex items-center gap-4`}>
                            <a
                                href="#"
                                aria-label="Facebook"
                                className={`p-3 bg-white border border-slate-200 hover:border-emerald-300 
                                rounded-xl hover:bg-emerald-50 transition-all duration-200 group`}
                            >
                                <Facebook
                                    className={`w-5 h-5 text-slate-600 group-hover:text-emerald-600 transition-colors duration-200`}
                                />
                            </a>

                            <a
                                href="#"
                                aria-label="Twitter"
                                className={`p-3 bg-white border border-slate-200 hover:border-emerald-300 
                                rounded-xl hover:bg-emerald-50 transition-all duration-200 group`}
                            >
                                <Twitter
                                    className={`w-5 h-5 text-slate-600 group-hover:text-emerald-600 transition-colors duration-200`}
                                />
                            </a>

                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className={`p-3 bg-white border border-slate-200 hover:border-emerald-300 
                                rounded-xl hover:bg-emerald-50 transition-all duration-200 group`}
                            >
                                <Linkedin
                                    className={`w-5 h-5 text-slate-600 group-hover:text-emerald-600 transition-colors duration-200`}
                                />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className={`flex-1 flex flex-col md:flex-row justify-start lg:justify-end gap-12 md:gap-20 lg:gap-32`}>

                        {/* Company */}
                        <div>
                            <h3 className={`font-semibold text-slate-800 mb-6 text-lg`}>Company</h3>

                            <ul className={`text-slate-600 space-y-4`}>
                                <li>
                                    <Link
                                        href="/"
                                        className={`hover:text-emerald-600 transition-colors duration-200 text-sm cursor-pointer`}
                                    >
                                        Home
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/about-us"
                                        className={`hover:text-emerald-600 transition-colors duration-200 text-sm cursor-pointer`}
                                    >
                                        About Us
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/privacy-policy"
                                        className={`hover:text-emerald-600 transition-colors duration-200 text-sm cursor-pointer`}
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/terms-and-conditions"
                                        className={`hover:text-emerald-600 transition-colors duration-200 text-sm cursor-pointer`}
                                    >
                                        Terms & Conditions
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/cookie-policy"
                                        className={`hover:text-emerald-600 transition-colors duration-200 text-sm cursor-pointer`}
                                    >
                                        Cookie Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className={`font-semibold text-slate-800 mb-6 text-lg`}>Get in Touch</h3>

                            <div className={`text-slate-600 space-y-4`}>
                                <div className={`flex items-center space-x-3`}>
                                    <Mail className={`w-4 h-4 text-emerald-600 shrink-0`} />

                                    <a
                                        href="mailto:contact.zipherlk@gmail.com"
                                        className={`text-sm hover:text-emerald-600`}
                                    >
                                        contact.zipherlk@gmail.com
                                    </a>
                                </div>

                                <Link
                                    href="/contact-us"
                                    className={`inline-flex items-center space-x-2 mt-4 px-4 py-2 
                                    bg-linear-to-r from-emerald-500 to-lime-500 hover:from-emerald-600
                                    hover:to-lime-600 text-white text-sm font-medium rounded-lg transition-all 
                                    duration-200 transform hover:scale-105`}
                                >
                                    <Mail className={`w-4 h-4`} />
                                    <span>Contact Us</span>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom */}
                <div className={`pt-8 flex flex-col md:flex-row items-center justify-between gap-4`}>
                    <p className={`text-slate-600 text-sm text-center md:text-left`}>
                        Copyright {new Date().getFullYear()} ©
                        <span className={`font-semibold text-emerald-700 ml-1`}>Zipher.lk</span>.
                        All rights reserved.
                    </p>

                    <div className={`flex items-center space-x-6`}>
                        <Link
                            href="/sitemap"
                            className={`text-slate-500 hover:text-emerald-600 text-sm transition-colors duration-200`}
                        >
                            Sitemap
                        </Link>

                        <Link
                            href="/"
                            className={`text-slate-500 hover:text-emerald-600 text-sm transition-colors duration-200`}
                        >
                            Accessibility
                        </Link>
                    </div>
                </div>

            </div>

        </footer>
    );
};

export default Footer;
