"use client";

import { useState } from "react";
import { Footer } from "@/components/landing/Footer"; 
import { FilterSidebar } from "@/components/listings/filters/FilterSidebar";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingsMap } from "@/components/listings/ListingMap"; 
import { FeatureIcons } from "@/components/layouts/FeatureIcons";
import { Search, Map, X, SlidersHorizontal, ChevronDown, Grid } from "lucide-react";
import { useMarketplace } from "@/hooks/buyer/useMarketplace";

export default function ListingsPage() {
    const { state, setters, helpers } = useMarketplace();
    
    // UI Layout States
    const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid'); 

    // --- DERIVE ACTIVE FILTERS FOR CHIPS ---
    const currentActiveFilters = [
        ...(state.filters.q ? [{ type: 'q', label: `Search: ${state.filters.q}`, value: state.filters.q }] : []),
        ...state.filters.categories.map(cat => ({ type: 'category', label: cat, value: cat })),
        ...state.filters.conditions.map(cond => ({ type: 'condition', label: cond === 'FAIRLYNEW' ? 'Used - Like New' : cond, value: cond })),
        ...state.filters.delivery.map(del => ({ type: 'delivery', label: del, value: del })),
        ...(state.filters.state ? [{ type: 'state', label: `State: ${state.filters.state}`, value: state.filters.state }] : []),
        ...(state.filters.isVerified ? [{ type: 'verified', label: 'Verified Sellers Only', value: 'verified' }] : []),
        ...(state.filters.minPrice > 0 || state.filters.maxPrice < 1000000 
            ? [{ type: 'price', label: `Price: ₦${state.filters.minPrice} - ₦${state.filters.maxPrice}`, value: 'price' }] 
            : []),
    ];

    const removeFilterChip = (filter: { type: string, value: string }) => {
        switch (filter.type) {
            case 'q': setters.updateFilter("q", ""); break;
            case 'state': setters.updateFilter("state", ""); break;
            case 'verified': setters.updateFilter("isVerified", false); break;
            case 'price': 
                setters.updateFilter("minPrice", 0); 
                setters.updateFilter("maxPrice", 1000000); 
                break;
            case 'category': setters.toggleArrayFilter("categories", filter.value); break;
            case 'condition': setters.toggleArrayFilter("conditions", filter.value); break;
            case 'delivery': setters.toggleArrayFilter("delivery", filter.value); break;
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] text-gray-900">
            <main className="container mx-auto px-6 md:px-10 lg:px-12 xl:px-4 max-w-7xl pt-24 pb-8 md:pt-28 md:pb-12">
                
                {/* Search Bar */}
                <div className="flex justify-end mb-6">
                    <div className="relative w-full max-w-md">
                        <input 
                            type="text" 
                            placeholder="Search for items" 
                            value={state.filters.q}
                            onChange={(e) => setters.updateFilter("q", e.target.value)}
                            className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#002147] shadow-sm"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filter Sidebar */}
                    <div className="hidden md:block w-64 shrink-0">
                        <FilterSidebar 
                            selectedCategories={state.filters.categories} 
                            onToggleCategory={(val) => setters.toggleArrayFilter("categories", val)}
                            selectedConditions={state.filters.conditions}
                            onToggleCondition={(val) => setters.toggleArrayFilter("conditions", val)}
                            priceRange={{ min: state.filters.minPrice, max: state.filters.maxPrice }}
                            onPriceChange={(type, val) => setters.updateFilter(type === 'min' ? 'minPrice' : 'maxPrice', val)}
                            location={{ state: state.filters.state, city: "" }}
                            onLocationChange={(type, val) => { if (type === 'state') setters.updateFilter("state", val) }}
                            isVerified={state.filters.isVerified}
                            onToggleVerified={() => setters.updateFilter("isVerified", !state.filters.isVerified)}
                            selectedDelivery={state.filters.delivery}
                            onToggleDelivery={(val) => setters.toggleArrayFilter("delivery", val)}
                        />
                    </div>

                    {/* Mobile Sidebar Modal */}
                    {isMobileFilterOpen && (
                        <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setMobileFilterOpen(false)}>
                            <div className="absolute right-0 top-0 bottom-0 w-[85%] bg-white p-4 overflow-y-auto" onClick={e => e.stopPropagation()}>
                                <FilterSidebar 
                                    selectedCategories={state.filters.categories} 
                                    onToggleCategory={(val) => setters.toggleArrayFilter("categories", val)}
                                    selectedConditions={state.filters.conditions}
                                    onToggleCondition={(val) => setters.toggleArrayFilter("conditions", val)}
                                    priceRange={{ min: state.filters.minPrice, max: state.filters.maxPrice }}
                                    onPriceChange={(type, val) => setters.updateFilter(type === 'min' ? 'minPrice' : 'maxPrice', val)}
                                    location={{ state: state.filters.state, city: "" }}
                                    onLocationChange={(type, val) => { if (type === 'state') setters.updateFilter("state", val) }}
                                    isVerified={state.filters.isVerified}
                                    onToggleVerified={() => setters.updateFilter("isVerified", !state.filters.isVerified)}
                                    selectedDelivery={state.filters.delivery}
                                    onToggleDelivery={(val) => setters.toggleArrayFilter("delivery", val)}
                                    onCloseMobile={() => setMobileFilterOpen(false)}
                                    onClearAllMobile={setters.clearAllFilters}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex-1">
                        {/* Filters Toolbar */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-3 md:hidden">
                                <button type="button" onClick={() => setMobileFilterOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 shadow-sm flex-1 justify-center cursor-pointer">
                                    <SlidersHorizontal size={16} /> Filter
                                </button>
                                <div className="relative flex-1">
                                    <select
                                        aria-label="Sort filter"
                                        className="w-full appearance-none px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 shadow-sm focus:outline-none cursor-pointer"
                                        value={state.sortBy}
                                        onChange={(e) => setters.setSortBy(e.target.value)}
                                    >
                                        <option>Newest</option>
                                        <option>Oldest</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>A-Z</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                                </div>
                                <button type="button" onClick={() => setViewMode(prev => prev === 'grid' ? 'map' : 'grid')} className="p-2 bg-white border border-gray-200 rounded-lg text-[#002147] shadow-sm cursor-pointer" aria-label="Toggle View">
                                    {viewMode === 'grid' ? <Map size={20} /> : <Grid size={20} />}
                                </button>
                            </div>

                            {/* Active Filter Chips */}
                            <div className="hidden md:flex flex-wrap items-center gap-2 flex-1">
                                {currentActiveFilters.length > 0 && (
                                    <span className="text-sm font-medium text-gray-600 mr-2">Active Filters:</span>
                                )}
                                {currentActiveFilters.map((filter, index) => (
                                    <div key={`${filter.type}-${filter.value}-${index}`} className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-700">
                                        {filter.label} 
                                        <button type="button" aria-label="Close option" onClick={() => removeFilterChip(filter)} className="focus:outline-none cursor-pointer">
                                            <X size={12} className="ml-1 hover:text-[#EB3B18]"/>
                                        </button>
                                    </div>
                                ))}
                                {currentActiveFilters.length > 0 && (
                                    <button type="button" onClick={setters.clearAllFilters} className="text-xs font-bold text-[#D84315] hover:underline ml-2 cursor-pointer">Clear All</button>
                                )}
                            </div>

                            {/* Desktop Sort & View Toggle */}
                            <div className="hidden md:flex items-center gap-3 shrink-0">
                                <button type="button" onClick={() => setViewMode(prev => prev === 'grid' ? 'map' : 'grid')} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-[#002147] hover:bg-gray-50 shadow-sm cursor-pointer" aria-label="Toggle View">
                                    {viewMode === 'grid' ? <><Map size={16} /> Map view</> : <><Grid size={16} /> Grid view</>}
                                </button>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500 font-bold">Sort by:</span>
                                    <div className="relative">
                                        <select
                                            aria-label="Sort filter"
                                            className="appearance-none pl-1 pr-8 py-2 bg-transparent text-sm text-gray-900 cursor-pointer focus:outline-none font-medium" 
                                            value={state.sortBy} 
                                            onChange={(e) => setters.setSortBy(e.target.value)}
                                        >
                                            <option>Newest</option>
                                            <option>Oldest</option>
                                            <option>Price: Low to High</option>
                                            <option>Price: High to Low</option>
                                            <option>A-Z</option>
                                        </select>
                                        <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 mb-6">
                            Showing {state.totalResults > 0 ? (state.page - 1) * 12 + 1 : 0}-{Math.min(state.page * 12, state.totalResults)} Of {state.totalResults} results
                        </p>

                        {/* CONTENT: GRID OR MAP */}
                        {state.isLoading ? (
                             <div className="flex justify-center items-center h-64">
                                 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#002147]"></div>
                             </div>
                        ) : viewMode === 'grid' ? (
                            <>
                                {state.listings.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                        {state.listings.map((item) => (
                                            <ListingCard 
                                                key={item.id} 
                                                id={item.id}
                                                title={item.name}
                                                price={helpers.formatPrice(item.price)}
                                                category={item.category?.name || "General"}
                                                condition={item.condition}
                                                location={`${item.location ? `${item.location}, ` : ''}${item.state || 'Nigeria'}`}
                                                image={item.images?.[0]?.url || '/assets/placeholder.jpg'}
                                                isVerified={true} 
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                                        <Search size={48} className="mx-auto text-gray-300 mb-4" />
                                        <p className="text-gray-900 font-bold text-lg mb-1">No items found</p>
                                        <p className="text-gray-500 text-sm">Try adjusting your filters or search query.</p>
                                    </div>
                                )}

                                {/* Pagination Controls */}
                                {state.totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-4 mt-12 pt-8">
                                        <button type="button" onClick={() => setters.setPage(state.page - 1)} disabled={state.page === 1} className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50 cursor-pointer">Previous</button>
                                        <span className="text-sm font-medium text-gray-600">Page {state.page} of {state.totalPages}</span>
                                        <button type="button" onClick={() => setters.setPage(state.page + 1)} disabled={state.page === state.totalPages} className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50 cursor-pointer">Next</button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <ListingsMap listings={state.listings as any} />
                        )}
                    </div>
                </div>
            </main>
            
            <FeatureIcons />
            <Footer />
        </div>
    );
}