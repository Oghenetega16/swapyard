"use client";

import { ChevronDown, Check } from "lucide-react";

interface FilterCheckboxGroupProps {
    title: string;
    options: string[];
    selected: string[];
    onChange: (item: string) => void;
    maxHeight?: string;
}

export const FilterCheckboxGroup = ({ 
    title, 
    options, 
    selected, 
    onChange, 
    maxHeight = "max-h-48" 
}: FilterCheckboxGroupProps) => (
    <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-sm text-gray-800">{title}</h4>
            <ChevronDown size={16} className="text-gray-400" />
        </div>
        <div className={`space-y-2 ${maxHeight}`}>
            {options.map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center">
                        <input 
                            type="checkbox" 
                            className="peer appearance-none w-4 h-4 border border-gray-300 rounded checked:bg-[#EB3B18] checked:border-[#EB3B18] transition-colors"
                            checked={selected.includes(opt)}
                            onChange={() => onChange(opt)}
                            aria-label={`Select ${opt}`}
                        />
                        <Check size={10} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">{opt}</span>
                </label>
            ))}
        </div>
    </div>
);