"use client";

import { Search, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export const FilterSidebar = () => {
    // Mock States for UI demo
    const [priceRange, setPriceRange] = useState({ min: 10000, max: 50000 });

    return (
        <aside className="w-full bg-white p-4 md:p-0">
            <div className="flex justify-between items-center mb-6 md:hidden">
                 <h2 className="text-xl font-bold">Filters</h2>
                 <button className="text-sm text-[#D84315] font-bold">Close</button>
            </div>

            {/* Header - Desktop Only */}
            <div className="hidden md:block mb-6 pb-4 border-b border-gray-100">
                <h3 className="font-extrabold text-xl text-[#002147]">Filter Options</h3>
            </div>

            {/* Categories */}
            <div className="mb-8">
                <h4 className="font-bold text-sm mb-3">All Categories</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                    {["Furniture", "Kitchen & Dining", "Office", "Bedroom", "Decor", "Baby & Kids", "Outdoor", "Electronics"].map((cat) => (
                        <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input type="checkbox" className="peer appearance-none w-4 h-4 border border-gray-300 rounded checked:bg-[#002147] checked:border-[#002147] transition-colors" />
                                <Check size={10} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                            </div>
                            <span className="text-sm text-gray-600 group-hover:text-gray-900">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="h-px bg-gray-100 w-full mb-6"></div>

            {/* Item Conditions */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-sm">Item Conditions</h4>
                    <ChevronDown size={16} className="text-gray-400" />
                </div>
                <div className="space-y-2">
                    {["New", "Barely Used", "Used", "Needs Repair"].map((cond) => (
                        <label key={cond} className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input type="checkbox" className="peer appearance-none w-4 h-4 border border-gray-300 rounded checked:bg-[#002147] checked:border-[#002147] transition-colors" />
                                <Check size={10} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                            </div>
                            <span className="text-sm text-gray-600 group-hover:text-gray-900">{cond}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="h-px bg-gray-100 w-full mb-6"></div>

            {/* Price Range */}
            <div className="mb-8">
                <h4 className="font-bold text-sm mb-4">Price Range</h4>
                <div className="flex items-center gap-2 mb-4">
                    <div className="bg-gray-50 border border-gray-200 rounded px-2 py-1 w-full">
                        <span className="text-xs text-gray-400 mr-1">₦</span>
                        <input type="number" className="bg-transparent w-full text-sm outline-none" placeholder="Min" defaultValue={10000} />
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="bg-gray-50 border border-gray-200 rounded px-2 py-1 w-full">
                        <span className="text-xs text-gray-400 mr-1">₦</span>
                        <input type="number" className="bg-transparent w-full text-sm outline-none" placeholder="Max" defaultValue={50000} />
                    </div>
                </div>
                {/* Visual Slider Placeholder */}
                <div className="relative h-1 bg-gray-200 rounded-full w-full">
                    <div className="absolute left-[20%] right-[40%] top-0 bottom-0 bg-[#002147] rounded-full"></div>
                    <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-[#002147] rounded-full cursor-pointer hover:scale-110 transition-transform"></div>
                    <div className="absolute right-[40%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-[#002147] rounded-full cursor-pointer hover:scale-110 transition-transform"></div>
                </div>
            </div>

            <div className="h-px bg-gray-100 w-full mb-6"></div>

            {/* Location */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-sm">Location</h4>
                    <ChevronDown size={16} className="text-gray-400" />
                </div>
                <div className="space-y-3">
                    <select className="w-full text-sm border border-gray-300 rounded p-2 text-gray-600 outline-none focus:border-[#002147]">
                        <option>Select State</option>
                        <option>Lagos</option>
                        <option>Abuja</option>
                    </select>
                    <select className="w-full text-sm border border-gray-300 rounded p-2 text-gray-600 outline-none focus:border-[#002147]">
                        <option>Select Town/City</option>
                    </select>
                </div>
            </div>

            {/* Verified Sellers Toggle */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 text-[#27AE60]">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12Z" /></svg>
                    </div>
                    <span className="font-bold text-sm">Verified Sellers</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D84315]"></div>
                </label>
            </div>

            <div className="h-px bg-gray-100 w-full mb-6"></div>

             {/* Delivery Options */}
             <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-sm">Delivery Options</h4>
                    <ChevronDown size={16} className="text-gray-400" />
                </div>
                <div className="space-y-2">
                    {["Delivery Available", "Pickup Only", "Both Available", "Negotiable"].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                             <div className="relative flex items-center">
                                <input type="checkbox" className="peer appearance-none w-4 h-4 border border-gray-300 rounded checked:bg-[#002147] checked:border-[#002147] transition-colors" />
                                <Check size={10} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                            </div>
                            <span className="text-sm text-gray-600 group-hover:text-gray-900">{opt}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden mt-8 pt-4 border-t border-gray-100 flex gap-4">
                <Button variant="outline" fullWidth>Clear All</Button>
                <Button fullWidth>Show Results</Button>
            </div>
        </aside>
    );
};