"use client";

import { Button } from "@/components/ui/Button";

// Import your separate components
import { FilterCheckboxGroup } from "./FilterCheckboxGroup";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { LocationFilter } from "./LocationFilter";
import { VerifiedToggle } from "./VerifiedToggle";

// Updated Interface to accept ALL filter props
interface FilterSidebarProps {
    // Categories
    selectedCategories: string[];
    onToggleCategory: (category: string) => void;
    // Conditions
    selectedConditions: string[];
    onToggleCondition: (condition: string) => void;
    // Price
    priceRange: { min: number; max: number };
    onPriceChange: (type: 'min' | 'max', value: number) => void;
    // Location
    location: { state: string; city: string };
    onLocationChange: (type: 'state' | 'city', value: string) => void;
    // Verified
    isVerified: boolean;
    onToggleVerified: () => void;
    // Delivery
    selectedDelivery: string[];
    onToggleDelivery: (option: string) => void;
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
    onToggleDelivery
}: FilterSidebarProps) => {

    return (
        <aside 
            className="w-full bg-white px-4 pt-6 md:pr-2 h-[calc(100vh-140px)] overflow-y-auto sticky top-28 pb-10"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#E5E7EB transparent' }}
        >
            <style jsx>{`
                aside::-webkit-scrollbar { width: 4px; }
                aside::-webkit-scrollbar-track { background: transparent; }
                aside::-webkit-scrollbar-thumb { background-color: #E5E7EB; border-radius: 20px; }
            `}</style>

            {/* Mobile Header */}
            <div className="flex justify-between items-center mb-6 md:hidden">
                 <h2 className="text-xl font-bold">Filters</h2>
                 <button className="text-sm text-[#EB3B18] font-bold" aria-label="Close filters">Close</button>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block mb-6 pb-4 border-b border-gray-100">
                <h3 className="font-bold text-lg text-[#002147]">Filter Options</h3>
            </div>

            {/* Categories */}
            <FilterCheckboxGroup 
                title="All Categories" 
                options={["Furniture", "Kitchen & Dining", "Office", "Bedroom", "Decor", "Baby & Kids", "Outdoor", "Electronics"]}
                selected={selectedCategories} 
                onChange={onToggleCategory}
            />

            <div className="h-px bg-gray-100 w-full mb-6"></div>

            {/* Item Conditions */}
            <FilterCheckboxGroup 
                title="Item Conditions" 
                options={["New", "Barely Used", "Used", "Needs Repair"]}
                selected={selectedConditions}
                onChange={onToggleCondition}
                maxHeight="max-h-auto"
            />

            <div className="h-px bg-gray-100 w-full mb-6"></div>

            {/* Price Range */}
            <PriceRangeFilter 
                min={priceRange.min} 
                max={priceRange.max} 
                onChange={onPriceChange} 
            />

            <div className="h-px bg-gray-100 w-full mb-6"></div>

            {/* Location - Now Functional via Props */}
            <LocationFilter 
                state={location.state}
                city={location.city}
                onStateChange={(val) => onLocationChange('state', val)}
                onCityChange={(val) => onLocationChange('city', val)}
            />

            {/* Verified - Now Functional via Props */}
            <VerifiedToggle 
                checked={isVerified} 
                onChange={onToggleVerified} 
            />

            <div className="h-px bg-gray-100 w-full mb-6"></div>

            {/* Delivery - Now Functional via Props */}
            <FilterCheckboxGroup 
                title="Delivery Options" 
                options={["Delivery Available", "Pickup Only", "Both Available", "Negotiable"]}
                selected={selectedDelivery}
                onChange={onToggleDelivery}
                maxHeight="max-h-auto"
            />

            {/* Mobile Actions */}
            <div className="md:hidden mt-8 pt-4 border-t border-gray-100 flex gap-4">
                <Button variant="outline" fullWidth aria-label="Clear all filters">Clear All</Button>
                <Button fullWidth aria-label="Show filtered results">Show Results</Button>
            </div>
        </aside>
    );
};