"use client";

import { Check } from "lucide-react";

interface VerifiedToggleProps {
    checked: boolean;
    onChange: () => void;
}

export const VerifiedToggle = ({ checked, onChange }: VerifiedToggleProps) => (
    <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-5 h-5 text-[#27AE60]" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12Z" />
                </svg>
                <Check size={12} className="absolute text-white" strokeWidth={3} />
            </div>
            <span className="font-semibold text-sm text-gray-800">Verified Sellers</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
            <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={checked}
                onChange={onChange}
                aria-label="Toggle verified sellers only"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#EB3B18]"></div>
        </label>
    </div>
);