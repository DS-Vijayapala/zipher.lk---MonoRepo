"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ErrorProps {
    title?: string;
    messages?: string | string[];
    isShow?: boolean;
    path?: string;
    pathName?: string;
}

export default function ErrorMessage({
    title = "Error",
    messages,
    isShow = false,
    path,
    pathName }: ErrorProps) {

    const router = useRouter();

    return (

        <div className={`w-full max-w-2xl mx-auto rounded-md border border-gray-300
         bg-red-50 p-4 text-red-700 flex flex-col items-center justify-center gap-2`}>
            <h2 className="font-semibold text-center">{title}</h2>

            {Array.isArray(messages) ? (

                <ul className="list-disc list-inside text-center space-y-1">
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>

            ) : (

                <p className="text-center">{messages}</p>
            )}

            <div className="mt-5">
                {
                    isShow ?
                        <Button
                            className="cursor-pointer"
                            onClick={() => router.push(path ?? "/")}>
                            {pathName ?? "Home"}
                        </Button> : null
                }

            </div>
        </div>

    );

}
