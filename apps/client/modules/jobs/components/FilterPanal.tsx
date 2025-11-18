"use client";

import React, { useState, useEffect } from "react";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { jobLocations, jobCategories } from "@/modules/jobs/libs/constants";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const FilterPanel = ({ onSearch }: { onSearch?: () => void }) => {

    const searchParams = useSearchParams();

    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const [filters, setFilters] = useState({
        title: searchParams.get("title") || "",
        location: searchParams.get("location") || "",
        category: searchParams.get("category") || "",
        level: searchParams.get("level") || "",
    });

    // Local input state ONLY for title (debounced)

    const [titleInput, setTitleInput] = useState(filters.title);

    const updateURL = (updatedFilters: any) => {

        const params = new URLSearchParams(window.location.search);

        Object.entries(updatedFilters).forEach(([key, value]) => {
            value ? params.set(key, value as string) : params.delete(key);
        });

        router.push(`/all-jobs?${params.toString()}`);

    };

    const handleChange = (key: string, value: string) => {

        const updated = { ...filters, [key]: value };
        setFilters(updated);
        updateURL(updated);

    };

    const clearFilters = () => {

        setFilters({ title: "", location: "", category: "", level: "" });
        setTitleInput("");
        router.push("/all-jobs");

    };

    //TITLE DEBOUNCE LOGIC

    useEffect(() => {

        const timeout = setTimeout(() => {

            handleChange("title", titleInput);

        }, 500); // 500ms debounce delay

        return () => clearTimeout(timeout);

    }, [titleInput]);


    return (

        <>

            {/* ====================== MOBILE ====================== */}

            <div className="md:hidden flex items-center justify-between w-full mt-3">

                {/* Mobile search input */}
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    className="w-full rounded-xl border px-4 py-3 text-sm border-gray-300"
                />

                {/* Mobile Filter icon */}

                <Dialog open={isOpen} onOpenChange={setIsOpen}>

                    <DialogTrigger asChild>

                        <button className="ml-3 p-3 rounded-xl border bg-white shadow-sm">
                            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                        </button>

                    </DialogTrigger>

                    <DialogContent className="max-w-sm rounded-xl">

                        <DialogHeader>
                            <DialogTitle className="text-lg font-semibold">Filters</DialogTitle>
                        </DialogHeader>

                        <div className="flex flex-col gap-4 mt-4">

                            {/* Location */}

                            <Select
                                value={filters.location}
                                onValueChange={(v) => handleChange("location", v)}>

                                <SelectTrigger className="w-full bg-white border-green-300 text-gray-900">
                                    <SelectValue placeholder="Location" />
                                </SelectTrigger>

                                <SelectContent>

                                    {jobLocations.map((loc) => (
                                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                                    ))}

                                </SelectContent>

                            </Select>

                            {/* Category */}

                            <Select
                                value={filters.category}
                                onValueChange={(v) => handleChange("category", v)}>

                                <SelectTrigger className="w-full bg-white border-green-300 text-gray-900">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>

                                <SelectContent>

                                    {jobCategories.map((cat) => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}

                                </SelectContent>

                            </Select>

                            {/* Level */}

                            <Select
                                value={filters.level}
                                onValueChange={(v) => handleChange("level", v)}>

                                <SelectTrigger className="w-full bg-white border-green-300 text-gray-900">
                                    <SelectValue placeholder="Experience Level" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="intern">Intern</SelectItem>
                                    <SelectItem value="junior">Junior</SelectItem>
                                    <SelectItem value="mid">Mid</SelectItem>
                                    <SelectItem value="senior">Senior</SelectItem>
                                    <SelectItem value="lead">Lead</SelectItem>
                                    <SelectItem value="principal">Principal</SelectItem>
                                </SelectContent>

                            </Select>

                            {/* Buttons */}

                            <div className="flex flex-col gap-2 mt-3 w-full">

                                <Button
                                    onClick={() => {
                                        onSearch?.();
                                        setIsOpen(false);
                                    }}
                                    className="bg-green-700 text-white hover:bg-green-800 w-full">
                                    Search Jobs
                                </Button>

                                {(filters.title || filters.location || filters.category || filters.level) && (
                                    <Button
                                        onClick={clearFilters}
                                        className="bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 w-full">
                                        Clear
                                    </Button>
                                )}

                            </div>

                        </div>


                    </DialogContent>

                </Dialog>

            </div>

            {/* ====================== DESKTOP ====================== */}

            <div className="hidden md:block mt-8 p-5 rounded-2xl border bg-white shadow-md w-full">

                <h2 className="text-md font-semibold text-green-900 mb-4">
                    Filter Talents
                </h2>

                <div className="flex flex-row items-center gap-4 w-full">

                    {/* Debounced Title Search */}

                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-2 py-1 text-gray-900 placeholder:text-sm"
                    />

                    {/* Location */}
                    <Select
                        value={filters.location}
                        onValueChange={(v) => handleChange("location", v)}>

                        <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900">
                            <SelectValue placeholder="Location" />
                        </SelectTrigger>

                        <SelectContent>

                            {jobLocations.map((loc) => (
                                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                            ))}

                        </SelectContent>

                    </Select>

                    {/* Category */}

                    <Select
                        value={filters.category}
                        onValueChange={(v) => handleChange("category", v)}>

                        <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>

                        <SelectContent>

                            {jobCategories.map((cat) => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}

                        </SelectContent>

                    </Select>

                    {/* Level */}

                    <Select
                        value={filters.level}
                        onValueChange={(v) => handleChange("level", v)}>

                        <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900">
                            <SelectValue placeholder="Experience Level" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="intern">Intern</SelectItem>
                            <SelectItem value="junior">Junior</SelectItem>
                            <SelectItem value="mid">Mid</SelectItem>
                            <SelectItem value="senior">Senior</SelectItem>
                            <SelectItem value="lead">Lead</SelectItem>
                            <SelectItem value="principal">Principal</SelectItem>
                        </SelectContent>

                    </Select>

                    <Button
                        onClick={onSearch}
                        className="bg-green-700 hover:bg-green-800 text-white px-6 cursor-pointer">
                        Search Talents
                    </Button>

                    {(filters.title || filters.location || filters.category || filters.level) && (
                        <Button
                            onClick={clearFilters}
                            className="bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 px-4 cursor-pointer">
                            Clear
                        </Button>
                    )}

                </div>

            </div>

        </>

    );

};


export default FilterPanel;
