import {
    TrendingUp,
} from 'lucide-react';


type StatsCardProps = {
    title: string;
    count: number | string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    color: string;
    description?: string;
    trend?: number;
    onClick?: () => void;
};


const StatsCard = ({ title, count, icon: Icon, color, description, trend, onClick }: StatsCardProps) => (

    <div
        onClick={onClick}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg 
        transition-all duration-300 hover:-translate-y-1 cursor-pointer">

        <div className="flex items-start justify-between">

            <div className="flex-1">

                <div className="flex items-center space-x-3 mb-4">

                    <div className={`p-3 rounded-xl bg-${color}-50`}>

                        <Icon className={`w-6 h-6 text-${color}-600`} />

                    </div>

                    <div>

                        <h3 className="font-semibold text-green-800 text-sm">{title}</h3>

                        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}

                    </div>

                </div>

                <div className="flex items-end justify-between">

                    <div>

                        <p className="text-3xl font-bold text-green-700">{count}</p>

                        {trend && (
                            <div className="flex items-center mt-2">

                                <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />

                                <span className="text-sm text-emerald-600 font-medium">+{trend}% this week</span>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>

    </div>

);

export default StatsCard