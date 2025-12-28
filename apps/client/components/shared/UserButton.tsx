"use client";

import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Settings, ClipboardList, ClipboardClock } from "lucide-react";

interface UserButtonProps {
    userData: {
        name?: string;
        email?: string;
        image?: string;
    };
    logout: () => void;
    navigate: (path: string) => void;
}

const UserButton: React.FC<UserButtonProps> = ({ userData, logout, navigate }) => {

    const handleNavigate = (path: string) => {

        window.scrollTo({ top: 0, behavior: "smooth" });

        navigate(path);

    };

    return (

        <DropdownMenu>

            <DropdownMenuTrigger className="focus:outline-none">

                <div
                    className="relative rounded-full hover:ring-2 hover:ring-green-200 
                     transition-all duration-200 p-0.5"
                >

                    <Avatar className="h-8 w-8 cursor-pointer">

                        <AvatarImage src={userData?.image} alt={userData?.name} />

                        <AvatarFallback
                            className="bg-linear-to-br from-green-500 to-lime-500 
                         text-white text-sm"
                        >

                            {userData?.name ? (

                                userData.name.charAt(0).toUpperCase()

                            ) : (

                                <User className="h-4 w-4" />
                            )}

                        </AvatarFallback>

                    </Avatar>

                </div>

            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 mr-4" align="end" sideOffset={8}>

                {/* User Info Header */}

                <div className="px-3 py-2 border-b border-slate-100">

                    <p className="text-sm font-medium text-green-900 leading-none">

                        {userData?.name || "User"}

                    </p>

                    <p className="text-xs text-slate-500 mt-1 leading-none truncate">

                        {userData?.email || "user@example.com"}

                    </p>

                </div>

                {/* Dashboard */}

                <DropdownMenuItem
                    className="cursor-pointer focus:bg-slate-50 max-sm:hidden max-lg:hidden"
                    onClick={() => handleNavigate("/dashboard")}
                >

                    <Settings className="h-4 w-4 mr-3" />

                    <span>Dashboard</span>

                </DropdownMenuItem>


                {/* Profile */}
                <DropdownMenuItem
                    className="cursor-pointer focus:bg-slate-50 max-sm:hidden max-lg:hidden"
                    onClick={() => handleNavigate("/dashboard/profile")}
                >

                    <User className="h-4 w-4 mr-3" />

                    <span>Profile</span>

                </DropdownMenuItem>


                {/* My Jobs */}
                <DropdownMenuItem
                    className="cursor-pointer focus:bg-slate-50 max-sm:hidden max-lg:hidden"
                    onClick={() => handleNavigate("/dashboard/my-jobs")}
                >

                    <ClipboardList className="h-4 w-4 mr-3" />

                    <span>My Jobs</span>

                </DropdownMenuItem>

                {/* View Applicants */}
                <DropdownMenuItem
                    className="cursor-pointer focus:bg-slate-50 max-sm:hidden max-lg:hidden"
                    onClick={() => handleNavigate("/dashboard/view-applicants")}
                >

                    <ClipboardClock className="h-4 w-4 mr-3" />

                    <span>View Applicants</span>

                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Logout */}

                <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                    onClick={logout}
                >

                    <LogOut className="h-4 w-4 mr-3" />

                    <span>Logout</span>

                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>

    );

};


export default UserButton;
