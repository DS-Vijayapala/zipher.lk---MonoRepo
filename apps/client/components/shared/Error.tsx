"use client";

interface ErrorProps {
    title?: string;
    messages?: string | string[];
}

export default function ErrorMessage({ title = "Error", messages }: ErrorProps) {

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

        </div>

    );

}
