"use client";

import React from "react";

const Loading: React.FC = () => {

    return (

        <div
            className={`min-h-[70vh] flex flex-col items-center justify-center
                 bg-white text-slate-600`}>

            {/* Jumping Dots Animation */}

            <div className={`flex items-center space-x-2 mb-6`}>

                <div
                    className={`w-3 h-3 bg-linear-to-r from-green-600 to-lime-500 rounded-full animate-bounce`}
                ></div>

                <div
                    className={`w-3 h-3 bg-linear-to-r from-green-600 to-lime-500 rounded-full animate-bounce`}
                    style={{ animationDelay: "0.1s" }}
                ></div>

                <div
                    className={`w-3 h-3 bg-linear-to-r from-green-600 to-lime-500 rounded-full animate-bounce`}
                    style={{ animationDelay: "0.2s" }}
                ></div>

            </div>

            {/* Loading Text */}

            <p className={`text-lg font-medium text-green-700`}>
                Loading... Please wait
            </p>

        </div>

    );

};


export default Loading;
