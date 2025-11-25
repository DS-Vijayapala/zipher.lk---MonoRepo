import { AlertTriangle, Leaf, Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const JOB_COST = 10;

const JOB_APPLY_COST = 5;

const ZensCard = ({ remainingPoints = 0 }) => {

    // Determine color scheme dynamically

    const getColorScheme = () => {

        if (remainingPoints === 0) {

            return {
                bg: "bg-red-50/50",
                border: "border-red-200",
                iconBg: "bg-red-100",
                icon: AlertTriangle,
                title: "text-red-900",
                subtitle: "text-red-700",
                balance: "text-red-600",
            };

        } else if (remainingPoints < JOB_COST) {

            return {
                bg: "bg-amber-50/50",
                border: "border-amber-200",
                iconBg: "bg-amber-100",
                icon: AlertTriangle,
                title: "text-amber-900",
                subtitle: "text-amber-700",
                balance: "text-amber-600",
            };

        } else if (remainingPoints < 50) {

            return {
                bg: "bg-emerald-50/50",
                border: "border-emerald-200",
                iconBg: "bg-emerald-100",
                icon: Leaf,
                title: "text-emerald-900",
                subtitle: "text-emerald-700",
                balance: "text-emerald-600",
            };

        } else {

            return {
                bg: "bg-emerald-50/30",
                border: "border-emerald-300",
                iconBg: "bg-emerald-100",
                icon: Leaf,
                title: "text-emerald-900",
                subtitle: "text-emerald-700",
                balance: "text-emerald-600",
            };

        }

    };

    const colors = getColorScheme();

    const IconComponent = colors.icon;

    return (

        <div className="mb-8">

            <div className={`rounded-2xl border-2 p-6 shadow-sm transition-all duration-300 
                hover:shadow-md ${colors.bg} ${colors.border}`}>

                <div className="flex items-center justify-between mb-4">

                    {/* Left side: Icon + Details */}

                    <div className="flex items-center gap-4">

                        <div className={`p-3 rounded-xl ${colors.iconBg}`}>

                            <IconComponent className="w-6 h-6" />

                        </div>

                        <div>

                            <h3 className={`font-semibold text-lg flex items-center gap-2 ${colors.title}`}>

                                Platform Points

                                <TooltipProvider>

                                    <Tooltip>

                                        <TooltipTrigger asChild>

                                            <Info className="w-5 h-5 text-gray-500 cursor-pointer
                                             hover:text-gray-700" />

                                        </TooltipTrigger>

                                        <TooltipContent
                                            side="top"
                                            className="max-w-xs text-sm leading-relaxed bg-white
                                             text-gray-700 border border-gray-200 rounded-lg
                                              shadow-md p-3 mb-2 !after:hidden"
                                        >

                                            <p className="font-semibold text-emerald-700 mb-1">What are Points?</p>

                                            <p className="mb-2">Points are your platform credits. They are
                                                used for different actions:</p>

                                            <ul className="list-disc list-inside space-y-1 mb-2">

                                                <li>

                                                    <span className="font-medium text-emerald-600">
                                                        {JOB_COST} points</span> required to post a new job.

                                                </li>

                                                <li>

                                                    <span className="font-medium text-emerald-600">
                                                        {JOB_APPLY_COST} points</span> required to apply for a job.

                                                </li>

                                            </ul>

                                            <p className="text-emerald-600 font-medium">
                                                Bonus: Every month, you get 100 points free.</p>

                                        </TooltipContent>

                                    </Tooltip>

                                </TooltipProvider>

                            </h3>

                            <p className={`text-sm ${colors.subtitle}`}>

                                {remainingPoints} points available for your account.

                            </p>

                        </div>

                    </div>

                    {/* Right side: Balance */}

                    <div className="text-right">

                        <div className={`text-3xl font-bold ${colors.balance}`}>

                            {remainingPoints}{" "}

                            <span className="text-sm font-medium opacity-75">points</span>

                        </div>

                        <div className="text-xs text-gray-500 font-medium mt-1">

                            Your Balance

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};


export default ZensCard;
