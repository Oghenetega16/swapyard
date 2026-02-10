"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layouts/Navbar"; 
import { Footer } from "@/components/landing/Footer"; 
import { FilterSidebar } from "@/components/listings/filters/FilterSidebar";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingsMap } from "@/components/listings/ListingMap"; // Ensure this matches your path
import { Sidebar } from "@/components/layouts/Sidebar";
import { FeatureIcons } from "@/components/layouts/FeatureIcons";
import { Search, Map, X, SlidersHorizontal, ChevronDown, Grid } from "lucide-react";

// Mock Data with Coordinates
const MOCK_LISTINGS = [
    { id: "1", title: "Clothes Hanger", category: "Bedroom", condition: "Used", delivery: "Pickup Only", price: "₦ 40,000", location: "Abia, Umuahia", isVerified: true, lat: 5.526, lng: 7.490, image: "https://images.unsplash.com/photo-1517153295259-74eb0b416cee?w=500" },
    { id: "2", title: "Book Shelf Organizer", category: "Decor", condition: "New", delivery: "Delivery Available", price: "₦ 140,000", location: "Ogun, Ogere", isVerified: true, lat: 6.956, lng: 3.611, image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500" },
    { id: "3", title: "Shoe Rack", category: "Furniture", condition: "Barely Used", delivery: "Both Available", price: "₦ 35,700", location: "Oyo, Ibadan", rating: 4.5, reviews: 1, lat: 7.377, lng: 3.947, image: "https://images.unsplash.com/photo-1595515106967-1b072e4a42b1?w=500" },
    { id: "4", title: "Sofa Chair", category: "Furniture", condition: "Used", delivery: "Negotiable", price: "₦ 45,700", location: "Lagos, Gbagada", rating: 5, reviews: 2, isVerified: true, lat: 6.556, lng: 3.391, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500" },
    { id: "5", title: "Wooden Dining Table Set", category: "Furniture", condition: "Barely Used", delivery: "Pickup Only", price: "₦ 450,000", location: "Oyo, Ibadan", rating: 4, reviews: 1, isVerified: true, lat: 7.400, lng: 3.900, image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500" },
    { id: "6", title: "Ceramic Vases Set", category: "Decor", condition: "New", delivery: "Delivery Available", price: "₦ 45,000", location: "Lagos, Bariga", rating: 4.5, reviews: 1, lat: 6.540, lng: 3.388, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500" },
    { id: "7", title: "Baby Toys", category: "Baby & Kids", condition: "Needs Repair", delivery: "Both Available", price: "₦ 25,000", location: "Oyo, Ibadan", isVerified: true, lat: 7.350, lng: 3.920, image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500" },
    { id: "8", title: "Red with pillows", category: "Furniture", condition: "Used", delivery: "Pickup Only", price: "₦ 120,000", location: "Oyo, Ibadan", isVerified: true, lat: 7.380, lng: 3.950, image: "https://images.unsplash.com/photo-1505693416388-b0346efee958?w=500" },
];

export default function ListingsPage() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid'); // View Mode State

    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("Newest");
    
    // Filter States
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
    const [location, setLocation] = useState({ state: "", city: "" });
    const [isVerified, setIsVerified] = useState(false);
    const [selectedDelivery, setSelectedDelivery] = useState<string[]>([]);

    // --- DERIVE ACTIVE FILTERS ---
    const currentActiveFilters = [
        ...selectedCategories.map(cat => ({ type: 'category', label: cat, value: cat })),
        ...selectedConditions.map(cond => ({ type: 'condition', label: cond, value: cond })),
        ...selectedDelivery.map(del => ({ type: 'delivery', label: del, value: del })),
        ...(priceRange.min > 0 || priceRange.max < 1000000 
            ? [{ type: 'price', label: `₦${priceRange.min.toLocaleString()} - ₦${priceRange.max.toLocaleString()}`, value: 'price' }] 
            : []),
        ...(location.state ? [{ type: 'location-state', label: location.state, value: 'state' }] : []),
        ...(location.city ? [{ type: 'location-city', label: location.city, value: 'city' }] : []),
        ...(isVerified ? [{ type: 'verified', label: 'Verified Seller', value: 'verified' }] : [])
    ];

    // --- HANDLERS ---
    const toggleCategory = (category: string) => {
        setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
    };

    const toggleCondition = (condition: string) => {
        setSelectedConditions(prev => prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]);
    };

    const handlePriceChange = (type: 'min' | 'max', value: number) => {
        setPriceRange(p => ({ ...p, [type]: type === 'min' ? Math.min(value, p.max - 1000) : Math.max(value, p.min + 1000) }));
    };

    const handleLocationChange = (type: 'state' | 'city', value: string) => {
        setLocation(prev => ({ 
            ...prev, 
            [type]: value,
            city: type === 'state' ? "" : (type === 'city' ? value : prev.city)
        }));
    };

    const toggleVerified = () => {
        setIsVerified(prev => !prev);
    };

    const toggleDelivery = (option: string) => {
        setSelectedDelivery(prev => prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]);
    };

    const removeFilter = (filter: { type: string, value: string }) => {
        switch (filter.type) {
            case 'category': toggleCategory(filter.value); break;
            case 'condition': toggleCondition(filter.value); break;
            case 'delivery': toggleDelivery(filter.value); break;
            case 'price': setPriceRange({ min: 0, max: 1000000 }); break;
            case 'location-state': setLocation({ state: "", city: "" }); break;
            case 'location-city': setLocation(prev => ({ ...prev, city: "" })); break;
            case 'verified': setIsVerified(false); break;
        }
    };

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedConditions([]);
        setPriceRange({ min: 0, max: 1000000 });
        setLocation({ state: "", city: "" });
        setIsVerified(false);
        setSelectedDelivery([]);
    };

    // --- FILTERING LOGIC ---
    const filteredListings = useMemo(() => {
        let result = [...MOCK_LISTINGS];

        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(item => 
                item.title.toLowerCase().includes(lowerQuery) || 
                item.category.toLowerCase().includes(lowerQuery)
            );
        }

        if (selectedCategories.length > 0) {
            result = result.filter(item => selectedCategories.includes(item.category));
        }

        if (selectedConditions.length > 0) {
            result = result.filter(item => selectedConditions.includes(item.condition));
        }

        result = result.filter(item => {
            const price = parseInt(item.price.replace(/[^0-9]/g, ''));
            return price >= priceRange.min && price <= priceRange.max;
        });

        if (location.state) result = result.filter(item => item.location.includes(location.state));
        if (location.city) result = result.filter(item => item.location.includes(location.city));
        if (isVerified) result = result.filter(item => item.isVerified === true);
        if (selectedDelivery.length > 0) result = result.filter(item => selectedDelivery.includes(item.delivery!));

        result.sort((a, b) => {
            const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
            const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));

        switch (sortBy) {
            case "Price: Low to High": return priceA - priceB;
            case "Price: High to Low": return priceB - priceA;
            case "A-Z": return a.title.localeCompare(b.title);
            case "Oldest": return parseInt(a.id) - parseInt(b.id);
            case "Newest": default: return parseInt(b.id) - parseInt(a.id);
        }
    });

    return result;
}, [searchQuery, sortBy, selectedCategories, selectedConditions, priceRange, location, isVerified, selectedDelivery]);

    return (
        <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-900">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <Navbar onOpenSidebar={() => setSidebarOpen(true)} />

            <div className="bg-[#002147] pt-10 pb-12 px-4"></div>

            <main className="container mx-auto px-4 py-8">
                {/* Search Bar */}
                <div className="flex justify-end mb-6">
                    <div className="relative w-full max-w-md">
                        <input 
                            type="text" 
                            placeholder="Search for items" 
                            aria-label="Search listings"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-1 placeholder:text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#002147]"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="hidden md:block w-64 shrink-0">
                        <FilterSidebar 
                            selectedCategories={selectedCategories} 
                            onToggleCategory={toggleCategory}
                            selectedConditions={selectedConditions}
                            onToggleCondition={toggleCondition}
                            priceRange={priceRange}
                            onPriceChange={handlePriceChange}
                            location={location}
                            onLocationChange={handleLocationChange}
                            isVerified={isVerified}
                            onToggleVerified={toggleVerified}
                            selectedDelivery={selectedDelivery}
                            onToggleDelivery={toggleDelivery}
                        />
                    </div>

                    {isMobileFilterOpen && (
                        <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setMobileFilterOpen(false)}>
                            <div className="absolute right-0 top-0 bottom-0 w-[85%] bg-white p-4 overflow-y-auto" onClick={e => e.stopPropagation()}>
                                <FilterSidebar 
                                    selectedCategories={selectedCategories} 
                                    onToggleCategory={toggleCategory}
                                    selectedConditions={selectedConditions}
                                    onToggleCondition={toggleCondition}
                                    priceRange={priceRange}
                                    onPriceChange={handlePriceChange}
                                    location={location}
                                    onLocationChange={handleLocationChange}
                                    isVerified={isVerified}
                                    onToggleVerified={toggleVerified}
                                    selectedDelivery={selectedDelivery}
                                    onToggleDelivery={toggleDelivery}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex-1">
                        {/* Filters Toolbar */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-3 md:hidden">
                                <button onClick={() => setMobileFilterOpen(true)} aria-label="Open filters" className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 shadow-sm flex-1 justify-center">
                                    <SlidersHorizontal size={16} /> Filter
                                </button>
                                <div className="relative flex-1">
                                    <select 
                                        className="w-full appearance-none px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 shadow-sm focus:outline-none"
                                        aria-label="Sort listings"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option>Newest</option>
                                        <option>Oldest</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>A-Z</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                                </div>
                                {/* Mobile Map Toggle Button */}
                                <button 
                                    onClick={() => setViewMode(prev => prev === 'grid' ? 'map' : 'grid')}
                                    className="p-2 bg-white border border-gray-200 rounded-lg text-[#002147] shadow-sm" 
                                    aria-label="Toggle map view"
                                >
                                    {viewMode === 'grid' ? <Map size={20} /> : <Grid size={20} />}
                                </button>
                            </div>

                            {/* Desktop Active Filters Display */}
                            <div className="hidden md:flex flex-wrap items-center gap-2 flex-1">
                                {currentActiveFilters.length > 0 && (
                                    <span className="text-sm font-medium text-gray-600 mr-2">Active Filters:</span>
                                )}
                                
                                {currentActiveFilters.map((filter, index) => (
                                    <div key={`${filter.type}-${filter.value}-${index}`} className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-700 animate-in fade-in zoom-in duration-200">
                                        {filter.label} 
                                        <button 
                                            onClick={() => removeFilter(filter)} 
                                            aria-label={`Remove filter ${filter.label}`} 
                                            className="focus:outline-none"
                                        >
                                            <X size={12} className="ml-1 cursor-pointer hover:text-[#EB3B18]"/>
                                        </button>
                                    </div>
                                ))}
                                
                                {currentActiveFilters.length > 0 && (
                                    <button onClick={clearAllFilters} className="text-xs font-bold text-[#D84315] hover:underline ml-2" aria-label="Clear all filters">Clear All</button>
                                )}
                            </div>

                            <div className="hidden md:flex items-center gap-3 shrink-0">
                                {/* Desktop Map Toggle Button */}
                                <button 
                                    onClick={() => setViewMode(prev => prev === 'grid' ? 'map' : 'grid')}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 cursor-pointer rounded-lg text-sm text-[#002147] hover:bg-gray-50 transition-colors shadow-sm" 
                                    aria-label="Toggle map view"
                                >
                                    {viewMode === 'grid' ? <><Map size={16} /> Map view</> : <><Grid size={16} /> Grid view</>}
                                </button>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500 font-bold">Sort by:</span>
                                    <div className="relative">
                                        <select 
                                            className="appearance-none pl-1 pr-8 py-2 bg-transparent text-sm text-gray-900 cursor-pointer focus:outline-none" 
                                            aria-label="Sort listings" 
                                            value={sortBy} 
                                            onChange={(e) => setSortBy(e.target.value)}
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
                            Showing {filteredListings.length > 0 ? 1 : 0}-{filteredListings.length} Of {filteredListings.length} results
                        </p>

                        {/* --- CONDITIONAL RENDERING FOR GRID OR MAP --- */}
                        {viewMode === 'grid' ? (
                            <>
                                {filteredListings.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                        {filteredListings.map((item) => (
                                            <ListingCard key={item.id} {...item} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 text-gray-500">
                                        <p>No items found matching your criteria.</p>
                                    </div>
                                )}

                                {filteredListings.length > 0 && (
                                        <div className="mt-12 flex justify-center">
                                            <button className="px-6 py-3 bg-white text-sm text-[#EB3B18] font-bold cursor-pointer rounded-lg hover:bg-[#EB3B18] hover:text-white transition-all shadow-sm" aria-label="Load more listings">Load More</button>
                                        </div>
                                )}
                            </>
                        ) : (
                            // Render Map with filtered listings
                            <ListingsMap listings={filteredListings} />
                        )}
                    </div>
                </div>
            </main>
            <FeatureIcons />
            <Footer />
        </div>
    );
}