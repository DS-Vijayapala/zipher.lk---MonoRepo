"use client"

import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Sparkles, Users, Briefcase, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from "next/navigation";

const Hero = () => {

    const navigate = useRouter()

    const messages = [
        'Talent Meets Opportunity',
        'Your Career, Your Future, Your Platform',
        'Empowering Your Professional Journey',
        'Discover Your Next Big Opportunity',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentIndex(prev => (prev + 1) % messages.length);

        }, 10000); // 3s per headline

        return () => clearInterval(interval);

    }, []);

    const onExploreAll = () => navigate.push("/all-jobs");

    const onGetStarted = () => navigate.push('/owner/dashboard');

    return (

        <div className="container 2xl:px-20 mx-auto my-10 mt-8">

            <div className={`relative bg-linear-to-br from-emerald-600 via-green-600 to-lime-600
             text-white py-24 text-center mx-2 rounded-3xl shadow-2xl overflow-hidden`}>

                {/* Animated Background Elements */}

                <div className="absolute inset-0 overflow-hidden">

                    <div
                        className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full animate-bounce"
                        style={{ animationDelay: '0s', animationDuration: '6s' }}>

                    </div>

                    <div
                        className="absolute bottom-20 right-16 w-24 h-24 bg-lime-300/10 rounded-full animate-bounce"
                        style={{ animationDelay: '2s', animationDuration: '8s' }}>

                    </div>

                    <div
                        className="absolute top-32 right-20 w-16 h-16 bg-emerald-300/15 rounded-full animate-bounce"
                        style={{ animationDelay: '4s', animationDuration: '7s' }}>

                    </div>

                    {/* Grid Pattern */}

                    <div className="absolute inset-0 opacity-5">

                        <div className="grid grid-cols-12 gap-4 h-full">

                            {Array.from({ length: 48 }, (_, i) => (

                                <div
                                    key={i}
                                    className="border border-white/20 rounded">

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

                {/* Content */}

                <div className="relative z-10">

                    {/* Animated Main Heading */}

                    <div className="mb-6">

                        <AnimatePresence mode="wait">

                            <motion.h1
                                key={currentIndex}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 1 }}
                                className="text-3xl md:text-4xl lg:text-6xl font-bold mb-2 tracking-tight"
                            >

                                <span className="bg-linear-to-r from-lime-200 to-emerald-200 bg-clip-text text-transparent">

                                    {messages[currentIndex]}

                                </span>

                            </motion.h1>

                        </AnimatePresence>

                        <p className="text-xl md:text-2xl font-medium text-white/80 mt-4">

                            All in One Place

                        </p>

                    </div>

                    {/* Subheading */}

                    <div className="mb-12 max-w-3xl mx-auto px-6">

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="text-base md:text-lg font-medium text-white/90 leading-relaxed"
                        >

                            Discover opportunities, connect with professionals, and manage your career journey.
                            Zipher.lk empowers individuals and organizations through one seamless platform.

                        </motion.p>

                    </div>

                    {/* Action Buttons */}

                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onExploreAll}
                            className={`group bg-white text-emerald-700 px-4 py-2 rounded-xl font-semibold 
                            text-lg shadow-lg flex items-center space-x-2 min-w-[200px] cursor-pointer`}
                        >

                            <Search className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />

                            <span>Explore Jobs</span>

                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />

                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onGetStarted}
                            className={`group bg-linear-to-r from-lime-500 to-emerald-500 text-white 
                            px-4 py-2 rounded-xl font-semibold text-lg shadow-lg flex items-center 
                            space-x-2 min-w-[200px] border-2 border-white/20 cursor-pointer`}
                        >

                            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />

                            <span>Get Started</span>

                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />

                        </motion.button>

                    </div>

                    {/* Feature Icons */}

                    <div className="flex justify-center items-center space-x-8 md:space-x-12 mt-12">

                        {[
                            { icon: Search, label: 'Find Jobs', color: 'text-lime-200' },
                            { icon: Users, label: 'Connect', color: 'text-emerald-200' },
                            { icon: Briefcase, label: 'Hire Talent', color: 'text-green-200' },
                            { icon: TrendingUp, label: 'Grow Career', color: 'text-lime-200' },
                        ].map((feature, idx) => (

                            <motion.div
                                key={idx}
                                className="group text-center"
                                whileHover={{ scale: 1.05 }}
                            >

                                <div className="p-2 bg-white/10 rounded-2xl backdrop-blur-sm mb-2">

                                    <feature.icon className={`w-5 h-5 mx-auto ${feature.color}`} />

                                </div>

                                <p className="text-sm text-white/80 font-medium">{feature.label}</p>

                            </motion.div>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    );

};


export default Hero;
