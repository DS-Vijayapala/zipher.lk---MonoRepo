"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";

interface LogoProps {
    to?: string;
    size?: string;
    highlightSize?: string;
    className?: string;
    onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({
    to = "/",
    size = "text-xl",
    highlightSize = "text-2xl",
    className = "",
    onClick,
}) => {
    return (
        <div
            className={clsx("flex items-center shrink-0", className)}
            onClick={onClick}
        >
            <Link href={to} className="flex items-baseline space-x-1 group">
                <span
                    className={clsx(
                        `${size} font-bold bg-linear-to-r from-green-700 via-lime-600 to-green-600 
            text-transparent bg-clip-text group-hover:from-green-800 
            group-hover:via-lime-700 group-hover:to-green-700 
            transition-all duration-300 ease-in-out`
                    )}
                >
                    <b className={`${highlightSize} font-extrabold tracking-tight`}>Z</b>
                    ipher.lk
                </span>
            </Link>
        </div>
    );
};

export default Logo;
