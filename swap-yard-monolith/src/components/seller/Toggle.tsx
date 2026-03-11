import React from "react";

interface ToggleProps {
    checked: boolean;
    onChange: () => void;
    ariaLabel: string;
    className?: string; // Added an optional className prop just in case you need to tweak margins later!
}

export const Toggle = ({ checked, onChange, ariaLabel, className = "" }: ToggleProps) => {
    return (
        <button
            aria-label={ariaLabel}
            type="button"
            onClick={onChange}
            className={`w-11 h-6 shrink-0 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                checked ? 'bg-[#EB3B18]' : 'bg-gray-300'
            } ${className}`}
        >
            <div 
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    checked ? 'translate-x-5' : 'translate-x-0'
                }`} 
            />
        </button>
    );
};