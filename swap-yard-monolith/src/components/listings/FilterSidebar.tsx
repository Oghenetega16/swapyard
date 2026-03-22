"use client";

import { ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface FilterSidebarProps {
    selectedCategories: string[];
    onToggleCategory: (category: string) => void;
    selectedConditions: string[];
    onToggleCondition: (condition: string) => void;
    priceRange: { min: number; max: number };
    onPriceChange: (type: "min" | "max", value: number) => void;
    location: { state: string; city: string };
    onLocationChange: (type: "state" | "city", value: string) => void;
    isVerified: boolean;
    onToggleVerified: () => void;
    selectedDelivery: string[];
    onToggleDelivery: (option: string) => void;
    onCloseMobile?: () => void;    
    onClearAllMobile?: () => void; 
}

export const FilterSidebar = ({
    selectedCategories,
    onToggleCategory,
    selectedConditions,
    onToggleCondition,
    priceRange,
    onPriceChange,
    location,
    onLocationChange,
    isVerified,
    onToggleVerified,
    selectedDelivery,
    onToggleDelivery,
    onCloseMobile,
    onClearAllMobile
}: FilterSidebarProps) => {

    const conditionMap = [
        { label: "New", value: "NEW" },
        { label: "Used - Like New", value: "FAIRLYNEW" },
        { label: "Second Hand", value: "SECONDHAND" },
        { label: "Good", value: "GOOD" },
        { label: "Fair", value: "FAIR" }
    ];

    return (
        <aside className="w-full bg-white p-4 md:p-0">
            {/* Mobile Header */}
            <div className="flex justify-between items-center mb-6 md:hidden">
                 <h2 className="text-xl font-bold">Filters</h2>
                 <button type="button" onClick={onCloseMobile} className="text-sm text-[#D84315] font-bold cursor-pointer">Close</button>
            </div>

            {/* Desktop Header */}
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
                                <input 
                                    type="checkbox" 
                                    aria-label={`Category ${cat}`}
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => onToggleCategory(cat)}
                                    className="peer appearance-none w-4 h-4 border border-gray-300 rounded checked:bg-[#002147] checked:border-[#002147] transition-colors cursor-pointer" 
                                />
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
                    {conditionMap.map((cond) => (
                        <label key={cond.value} className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input 
                                    type="checkbox" 
                                    aria-label={`Condition ${cond.label}`}
                                    checked={selectedConditions.includes(cond.value)}
                                    onChange={() => onToggleCondition(cond.value)}
                                    className="peer appearance-none w-4 h-4 border border-gray-300 rounded checked:bg-[#002147] checked:border-[#002147] transition-colors cursor-pointer" 
                                />
                                <Check size={10} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                            </div>
                            <span className="text-sm text-gray-600 group-hover:text-gray-900">{cond.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="h-px bg-gray-100 w-full mb-6"></div>

            {/* Price Range */}
            <div className="mb-8">
                <h4 className="font-bold text-sm mb-4">Price Range</h4>
                <div className="flex items-center gap-2 mb-4">
                    <div className="bg-gray-50 border border-gray-200 rounded px-2 py-1 w-full flex items-center">
                        <span className="text-xs text-gray-400 mr-1">₦</span>
                        <input 
                            type="number" 
                            aria-label="Minimum Price"
                            value={priceRange.min || ""}
                            onChange={(e) => onPriceChange("min", Number(e.target.value))}
                            className="bg-transparent w-full text-sm outline-none" 
                            placeholder="0" 
                        />
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="bg-gray-50 border border-gray-200 rounded px-2 py-1 w-full flex items-center">
                        <span className="text-xs text-gray-400 mr-1">₦</span>
                        <input 
                            type="number" 
                            aria-label="Maximum Price"
                            value={priceRange.max || ""}
                            onChange={(e) => onPriceChange("max", Number(e.target.value))}
                            className="bg-transparent w-full text-sm outline-none" 
                            placeholder="Max" 
                        />
                    </div>
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
                    <select 
                        aria-label="Select State"
                        value={location.state}
                        onChange={(e) => onLocationChange("state", e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded p-2 text-gray-600 outline-none focus:border-[#002147] cursor-pointer"
                    >
                        <option value="">Select State</option>
                        <option value="Lagos">Lagos</option>
                        <option value="Abuja">Abuja</option>
                        <option value="Ogun">Ogun</option>
                    </select>
                    <select 
                        aria-label="Select City"
                        value={location.city}
                        onChange={(e) => onLocationChange("city", e.target.value)}
                        disabled={!location.state}
                        className="w-full text-sm border border-gray-300 rounded p-2 text-gray-600 outline-none focus:border-[#002147] disabled:opacity-50 cursor-pointer"
                    >
                        <option value="">Select Town/City</option>
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
                    <input 
                        type="checkbox" 
                        aria-label="Toggle Verified Sellers"
                        checked={isVerified}
                        onChange={onToggleVerified}
                        className="sr-only peer" 
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D84315]"></div>
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
                                <input 
                                    type="checkbox" 
                                    aria-label={`Delivery Option ${opt}`}
                                    checked={selectedDelivery.includes(opt)}
                                    onChange={() => onToggleDelivery(opt)}
                                    className="peer appearance-none w-4 h-4 border border-gray-300 rounded checked:bg-[#002147] checked:border-[#002147] transition-colors cursor-pointer" 
                                />
                                <Check size={10} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                            </div>
                            <span className="text-sm text-gray-600 group-hover:text-gray-900">{opt}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden mt-8 pt-4 border-t border-gray-100 flex gap-4">
                <Button type="button" variant="outline" className="w-full" onClick={onClearAllMobile}>Clear All</Button>
                <Button type="button" className="w-full" onClick={onCloseMobile}>Show Results</Button>
            </div>
        </aside>
    );
};