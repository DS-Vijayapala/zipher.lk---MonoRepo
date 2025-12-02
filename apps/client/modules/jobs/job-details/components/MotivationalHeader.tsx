"use client";
import { motion } from "framer-motion";

export default function MotivationalHeader() {
    return (
        <div
            className={`
        h-40 md:h-48 w-full 
        bg-linear-to-r from-green-600 via-green-500 to-green-800
        animate-gradient bg-size-[200%_200%] 
        rounded-lg 
        flex flex-col items-center justify-center text-center
      `}
        >
            {/* Zipher.lk Tag */}
            <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-white/80 text-sm md:text-base font-semibold tracking-wide drop-shadow"
            >
                powered by <span className="text-white font-bold">zipher.lk</span>
            </motion.span>

            {/* Quote */}
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="text-white font-semibold text-lg md:text-xl px-4 drop-shadow-md mt-1"
            >
                “Opportunities are closer than you think - keep moving forward.”
            </motion.p>
        </div>
    );
}
