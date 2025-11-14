"use client";

import React from "react";

interface TitleProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    subTitle?: string;
    position?: string;
    className?: string;
}

const Title: React.FC<TitleProps> = ({
    title,
    subTitle,
    position = "text-left",
    className = "",
    ...props
}) => {

    return (

        <div
            className={`mb-8 ${position} ${className}`}
            {...props}>

            <h1 className={`text-xl sm:text-2xl font-bold text-green-800 mb-2`}>
                {title}
            </h1>

            {subTitle && (

                <p className={`text-gray-600`}>
                    {subTitle}
                </p>

            )}

        </div>

    );

};

export default Title;
