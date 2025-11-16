"use client";

import React, { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { jobLocations, jobCategories } from "@/modules/jobs/libs/constants";
import { X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import clsx from "clsx";

interface FilterPanelProps {
    onSearch?: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onSearch }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [filters, setFilters] = useState({
        location: searchParams.get("location") || "",
        category: searchParams.get("category") || "",
        level: searchParams.get("level") || "",
    });


    const updateURL = (updatedFilters: any) => {
        const params = new URLSearchParams(window.location.search);

        Object.entries(updatedFilters).forEach(([key, value]) => {
            if (value) params.set(key, value as string);
            else params.delete(key);
        });

        router.push(`/all-jobs?${params.toString()}`);
    };

    const handleChange = (key: string, value: string) => {
        const updated = { ...filters, [key]: value };
        setFilters(updated);
        updateURL(updated);
    };


    const clearFilters = () => {
        setFilters({ location: "", category: "", level: "" });
        router.push("/all-jobs");
    };

    return (
        <div className={`mt-8 p-5 rounded-2xl border bg-white shadow-md w-full`}>
            <div className={`flex flex-col md:flex-row items-center gap-4 w-full`}>

                {/* Location */}
                <div className={`w-full md:w-1/4`}>
                    <Select
                        value={filters.location}
                        onValueChange={(v) => handleChange("location", v)}
                    >
                        <SelectTrigger
                            className={`w-full bg-white border-green-300 text-green-900 cursor-pointer`}
                        >
                            <SelectValue placeholder="Location" />
                        </SelectTrigger>

                        <SelectContent>
                            {jobLocations.map((loc) => (
                                <SelectItem
                                    key={loc}
                                    value={loc}
                                    className={`hover:bg-lime-100`}
                                >
                                    {loc}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Category */}
                <div className={`w-full md:w-1/4`}>
                    <Select
                        value={filters.category}
                        onValueChange={(v) => handleChange("category", v)}
                    >
                        <SelectTrigger
                            className={`w-full bg-white border-green-300 text-green-900 cursor-pointer`}
                        >
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>

                        <SelectContent>
                            {jobCategories.map((cat) => (
                                <SelectItem
                                    key={cat}
                                    value={cat}
                                    className={`hover:bg-lime-100`}
                                >
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Experience Level */}
                <div className={`w-full md:w-1/4`}>
                    <Select
                        value={filters.level}
                        onValueChange={(v) => handleChange("level", v)}
                    >
                        <SelectTrigger
                            className={`w-full bg-white border-green-300 text-green-900 cursor-pointer`}
                        >
                            <SelectValue placeholder="Experience Level" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem className="hover:bg-lime-100" value="intern">Intern</SelectItem>
                            <SelectItem className="hover:bg-lime-100" value="junior">Junior</SelectItem>
                            <SelectItem className="hover:bg-lime-100" value="mid">Mid</SelectItem>
                            <SelectItem className="hover:bg-lime-100" value="senior">Senior</SelectItem>
                            <SelectItem className="hover:bg-lime-100" value="lead">Lead</SelectItem>
                            <SelectItem className="hover:bg-lime-100" value="principal">Principal</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Buttons */}
                <div className={`flex flex-row items-center gap-2 w-full md:w-auto`}>

                    <Button
                        onClick={onSearch}
                        className={`bg-green-700 hover:bg-green-800 text-white px-6 cursor-pointer`}
                    >
                        Search Jobs
                    </Button>

                    {(filters.location || filters.category || filters.level) && (
                        <Button
                            onClick={clearFilters}
                            className={`bg-red-100 text-red-700 border border-red-300 
                         hover:bg-red-200 flex items-center gap-2 px-4 py-2 cursor-pointer`}>
                            Clear
                        </Button>
                    )}

                </div>

            </div>
        </div>
    );
};

export default FilterPanel;
