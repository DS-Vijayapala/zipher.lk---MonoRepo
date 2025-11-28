"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

interface ChipInputProps {
    label?: string;
    value: string[];
    onChange: (val: string[]) => void;
    placeholder?: string;
}

export default function ChipInput({
    value,
    onChange,
    placeholder = "Add item and press Enter",
}: ChipInputProps) {

    const [input, setInput] = useState("");

    // SECURE WHITELIST REGEX

    // Allows: Letters, numbers, spaces, basic punctuation.

    const SAFE_REGEX = /^[\p{L}\p{N}\p{M}\p{Pd}\p{Pc}\p{Zs}.,;:'’"()!?+\-@#&*/]+$/u;

    const sanitizeInput = (text: string) => {
        const trimmed = text.trim();

        // Reject empty
        if (!trimmed) return null;

        // Reject duplicates
        if (value.includes(trimmed)) return null;

        // Reject unsafe strings (XSS / SQLi / HTML injection)
        if (!SAFE_REGEX.test(trimmed)) return null;

        return trimmed;

    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Enter") {

            e.preventDefault();

            const safeValue = sanitizeInput(input);

            if (safeValue) {
                onChange([...value, safeValue]);
            }

            setInput("");
        }

    };

    const removeChip = (chip: string) => {

        const updated = value.filter((c) => c !== chip);

        onChange(updated);

    };

    return (

        <div className="border rounded-xl p-2 bg-white min-h-[50px]">

            <div className="flex flex-wrap gap-2">

                {value.map((chip) => (
                    <div
                        key={chip}
                        className={`flex items-center bg-green-100 text-slate-900 px-3 py-1
                         rounded-lg text-sm`}>

                        {chip}

                        <X
                            className="w-4 h-4 ml-2 cursor-pointer text-green-600"
                            onClick={() => removeChip(chip)}
                        />

                    </div>

                ))}

                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-1 outline-none text-sm py-1 min-w-[150px] ml-1"
                />

            </div>

        </div>

    );

}
