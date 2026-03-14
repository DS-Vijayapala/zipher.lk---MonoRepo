
import React from 'react';

type ActionButtonProps = {
    title: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onClick: () => void;
    isPrimary?: boolean;
};



const ActionButton = ({ title, description, icon: Icon, onClick, isPrimary = false }: ActionButtonProps) => (
    <button
        onClick={onClick}
        className={`w-full text-left p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 group ${isPrimary
            ? 'bg-linear-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl'
            : 'bg-white hover:shadow-lg border border-gray-100 hover:border-emerald-200'
            }`}
    >
        <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-xl ${isPrimary ? 'bg-white/20' : 'bg-emerald-50 group-hover:bg-emerald-100'
                } transition-colors`}>
                <Icon className={`w-6 h-6 ${isPrimary ? 'text-white' : 'text-emerald-600'}`} />
            </div>
            <div className="flex-1">
                <h3 className={`font-semibold mb-2 ${isPrimary ? 'text-white' : 'text-gray-900'}`}>
                    {title}
                </h3>
                <p className={`text-sm ${isPrimary ? 'text-emerald-100' : 'text-gray-600'}`}>
                    {description}
                </p>
            </div>
            <div className={`transition-transform group-hover:translate-x-1 ${isPrimary ? 'text-white' : 'text-gray-400'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    </button>
);

export default ActionButton