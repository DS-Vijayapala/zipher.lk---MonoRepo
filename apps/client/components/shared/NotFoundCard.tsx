"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SearchX } from "lucide-react";

interface NotFoundCardProps {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
}

export const NotFoundCard: React.FC<NotFoundCardProps> = ({
    title = "No Data Found",
    description = "We couldn’t find any results matching your criteria.",
    icon,
}) => {

    return (

        <div className="w-full flex justify-center mt-6">

            <Card className={`max-w-md w-full border-gray-200 bg-green-50/40 shadow-sm 
                rounded-xl p-6 flex  items-center text-center`}>

                <CardHeader className="w-full flex flex-col items-center p-0">

                    <div className="mb-3">
                        {icon ? icon : <SearchX className="w-10 h-10 text-green-700" />}
                    </div>

                    <CardTitle className="text-green-800 text-lg md:text-xl">
                        {title}
                    </CardTitle>

                    <CardDescription className="text-green-700 mt-2 text-sm md:text-base">
                        {description}
                    </CardDescription>

                </CardHeader>

            </Card>

        </div>

    );

};
