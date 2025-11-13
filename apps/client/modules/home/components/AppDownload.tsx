"use client"

import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Zap, CheckCircle, Download, Smartphone, Users, Star } from "lucide-react";

const AppDownload = () => {

    return (

        <div className="container px-4 2xl:px-20 mx-auto my-16">

            <div className={`relative bg-linear-to-br from-emerald-800 via-green-700 to-lime-600
             text-white rounded-3xl shadow-2xl overflow-hidden`}>

                {/* Animated Background Elements */}

                <div className="absolute inset-0 overflow-hidden">

                    <motion.div
                        className="absolute top-20 right-10 w-24 h-24 bg-white/5 rounded-full"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <motion.div
                        className="absolute left-100 bottom-30 w-24 h-24 bg-white/5 rounded-full"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <motion.div
                        className="absolute left-50 bottom-80 w-24 h-24 bg-white/5 rounded-full"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <motion.div
                        className="absolute bottom-20 left-16 w-20 h-20 bg-lime-300/10 rounded-full"
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <motion.div
                        className="absolute top-32 right-1/3 w-14 h-14 bg-emerald-300/15 rounded-full"
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    />

                </div>

                <div className="relative z-10 p-6 sm:p-10 lg:p-12">

                    <div className="grid lg:grid-cols-2 gap-10 items-center">

                        {/* Content Section */}

                        <div className="space-y-6">

                            {/* Status Badge */}

                            <motion.div
                                className={`inline-flex items-center space-x-2 bg-lime-500/20 backdrop-blur-sm 
                                border border-lime-400/30 rounded-full px-3 py-1.5`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >

                                <Zap className="w-3.5 h-3.5 text-lime-200" />

                                <span className="text-lime-100 font-medium text-xs">Coming Soon</span>

                            </motion.div>

                            {/* Main Heading */}

                            <div>

                                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold leading-snug mb-4">

                                    <span className="bg-linear-to-r from-lime-200 to-white bg-clip-text text-transparent">

                                        Zipher.lk

                                    </span>

                                    <br />

                                    <span className="text-white">In Your Pocket</span>

                                </h1>

                                <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-6 max-w-md">

                                    Discover jobs, grow your network, and stay connected to opportunities — anytime, anywhere.

                                </p>

                            </div>

                            {/* Feature Highlights */}

                            <div className="space-y-3">

                                <h3 className="text-base font-semibold text-lime-200 mb-2">Highlights:</h3>

                                <div className="space-y-2">
                                    {[
                                        "Instant job alerts",
                                        "One-tap applications",
                                        "On-the-go interview scheduling",
                                        "Seamless professional networking"
                                    ].map((text, i) => (

                                        <motion.div
                                            key={i}
                                            className="flex items-center space-x-2"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: i * 0.2 }}
                                            viewport={{ once: true }}
                                        >

                                            <CheckCircle className="w-4 h-4 text-lime-300 shrink-0" />

                                            <span className="text-emerald-100 text-sm">{text}</span>

                                        </motion.div>

                                    ))}

                                </div>

                            </div>

                            {/* Store Buttons */}

                            <div className="space-y-3">

                                <p className="text-emerald-200 font-medium text-sm">Available on both platforms:</p>

                                <div className="flex flex-col sm:flex-row gap-3">

                                    {["Google Play", "App Store"].map((store, i) => (

                                        <motion.div
                                            key={store}
                                            className={`bg-white/10 backdrop-blur-sm rounded-xl p-3 border cursor-pointer
                                             border-white/20 flex items-center space-x-3 hover:bg-white/15 transition`}
                                            whileHover={{ scale: 1.05 }}
                                        >

                                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">

                                                <Download className="w-5 h-5 text-white" />

                                            </div>

                                            <div>

                                                <p className="text-white text-sm font-medium">{store}</p>

                                                <p className="text-emerald-200 text-xs">Coming Soon</p>

                                            </div>

                                        </motion.div>

                                    ))}

                                </div>

                            </div>

                        </div>

                        {/* Visual Section (Phone) */}

                        <motion.div
                            className="flex justify-center lg:ml-30 max-sm:hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}

                        >

                            <div className={`relative w-52 h-104 bg-slate-900 rounded-[2.5rem] shadow-2xl border-8
                             border-slate-800 overflow-hidden`}>

                                <div className={`absolute inset-3 bg-linear-to-br
                                 from-emerald-50 to-lime-50 rounded-4xl overflow-hidden`}>

                                    <div className="h-6 bg-emerald-600 flex items-center justify-center">

                                        <div className="flex space-x-1">

                                            <div className="w-1 h-1 bg-white rounded-full"></div>
                                            <div className="w-1 h-1 bg-white rounded-full"></div>
                                            <div className="w-1 h-1 bg-white rounded-full"></div>

                                        </div>

                                    </div>

                                    {/* App Preview */}

                                    <div className="p-4 space-y-3">

                                        <div className="text-center">

                                            <div className={`w-14 h-14 bg-linear-to-r from-emerald-500 to-lime-500 
                                            rounded-xl mx-auto mb-2 flex items-center justify-center`}>

                                                <span className="text-xl font-bold text-white">Z</span>

                                            </div>

                                            <h3 className="font-bold text-slate-800 text-sm">Zipher Mobile</h3>

                                            <p className="text-xs text-slate-600">Your Career Companion</p>

                                        </div>

                                        {/* Feature Cards */}

                                        <div className="space-y-2">

                                            {[
                                                { icon: Smartphone, title: "Job Search", desc: "Find roles anywhere" },
                                                { icon: Users, title: "Networking", desc: "Connect with peers" },
                                                { icon: Star, title: "Growth", desc: "Track progress" }
                                            ].map((f, i) => (

                                                <motion.div
                                                    key={f.title}
                                                    className="bg-white rounded-lg p-3 shadow-sm flex items-center space-x-2"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: i * 0.2 }}
                                                    viewport={{ once: true }}
                                                >

                                                    <f.icon className="w-4 h-4 text-emerald-600" />

                                                    <div>

                                                        <p className="font-medium text-slate-800 text-xs">{f.title}</p>

                                                        <p className="text-[10px] text-slate-600">{f.desc}</p>

                                                    </div>

                                                </motion.div>

                                            ))}

                                        </div>

                                    </div>

                                </div>

                                {/* Home indicator */}

                                <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-600 rounded-full`}></div>

                            </div>

                        </motion.div>

                    </div>

                </div>

            </div>

        </div>

    );

};


export default AppDownload;

