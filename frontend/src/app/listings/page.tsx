"use client";

import { useState } from "react";
import { Navbar } from "@/components/layouts/Navbar"; // Reusing your Navbar
import { Footer } from "@/components/landing/Footer"; // Reusing your Footer
import { FilterSidebar } from "@/components/listings/FilterSidebar";
import { ListingCard } from "@/components/listings/ListingCard";
import { Sidebar } from "@/components/layouts/Sidebar";
import { Search, Map, MapPin, X, SlidersHorizontal, ChevronDown } from "lucide-react";

// Mock Data
const MOCK_LISTINGS = [
  { id: "1", title: "Clothes Hanger", category: "Bedroom", price: "₦ 40,000", location: "Abia, Umuahia", isVerified: true, image: "https://images.unsplash.com/photo-1517153295259-74eb0b416cee?w=500" },
  { id: "2", title: "Book Shelf Organizer", category: "Decor", price: "₦ 140,000", location: "Ogun, Ogere", isVerified: true, image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500" },
  { id: "3", title: "Shoe Rack", category: "Furniture", price: "₦ 35,700", location: "Oyo, Ibadan", rating: 4.5, reviews: 1, image: "https://images.unsplash.com/photo-1595515106967-1b072e4a42b1?w=500" },
  { id: "4", title: "Sofa Chair", category: "Furniture", price: "₦ 45,700", location: "Lagos, Gbagada", rating: 5, reviews: 2, isVerified: true, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500" },
  { id: "5", title: "Wooden Dining Table Set", category: "Furniture", price: "₦ 450,000", location: "Oyo, Ibadan", rating: 4, reviews: 1, isVerified: true, image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500" },
  { id: "6", title: "Ceramic Vases Set", category: "Decor", price: "₦ 45,000", location: "Lagos, Bariga", rating: 4.5, reviews: 1, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500" },
  { id: "7", title: "Baby Toys", category: "Baby & Kids", price: "₦ 25,000", location: "Oyo, Ibadan", isVerified: true, image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500" },
  { id: "8", title: "Red with pillows", category: "Furniture", price: "₦ 120,000", location: "Oyo, Ibadan", isVerified: true, image: "https://images.unsplash.com/photo-1505693416388-b0346efee958?w=500" },
];

export default function ListingsPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-900">
       <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
       {/* Use a darkened Navbar if you want it visible over the dark header, or default */}
       <Navbar onOpenSidebar={() => setSidebarOpen(true)} />

       {/* Header Section */}
       <div className="bg-[#002147] pt-28 pb-12 px-4">
           <div className="container mx-auto">
               <h1 className="text-3xl md:text-4xl font-bold text-white text-center md:text-left">Listings</h1>
           </div>
       </div>

       <main className="container mx-auto px-4 py-8">
           
           {/* Search Bar - Desktop style sitting above grid */}
           <div className="mb-6 relative max-w-2xl">
               <input 
                  type="text" 
                  placeholder="Search for items" 
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#002147] shadow-sm"
               />
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
           </div>

           <div className="flex flex-col md:flex-row gap-8">
               
               {/* Left Sidebar - Desktop */}
               <div className="hidden md:block w-64 shrink-0">
                   <FilterSidebar />
               </div>

               {/* Mobile Filter Drawer (Hidden by default) */}
               {isMobileFilterOpen && (
                   <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setMobileFilterOpen(false)}>
                       <div className="absolute right-0 top-0 bottom-0 w-[85%] bg-white p-4 overflow-y-auto" onClick={e => e.stopPropagation()}>
                           <FilterSidebar />
                       </div>
                   </div>
               )}

               {/* Main Content */}
               <div className="flex-1">
                   
                   {/* Filters Toolbar */}
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                       
                       {/* Mobile Tools Row */}
                       <div className="flex items-center gap-3 md:hidden">
                            <button 
                                onClick={() => setMobileFilterOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 shadow-sm flex-1 justify-center"
                            >
                                <SlidersHorizontal size={16} /> Filter
                            </button>
                            <div className="relative flex-1">
                                <select className="w-full appearance-none px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 shadow-sm focus:outline-none">
                                    <option>Newest</option>
                                    <option>Oldest</option>
                                    <option>Price: Low to High</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                            </div>
                            <button className="p-2 bg-white border border-gray-200 rounded-lg text-[#002147] shadow-sm">
                                <Map size={20} />
                            </button>
                       </div>

                       {/* Desktop Active Filters & Tools */}
                       <div className="hidden md:flex flex-wrap items-center gap-2">
                           <span className="text-sm font-medium text-gray-600 mr-2">Active Filters:</span>
                           <div className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-700">
                               Barely Used <X size={12} className="ml-1 cursor-pointer hover:text-red-500"/>
                           </div>
                           <div className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-700">
                               Delivery Available <X size={12} className="ml-1 cursor-pointer hover:text-red-500"/>
                           </div>
                           <div className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-700">
                               ₦10,000-₦50,000 <X size={12} className="ml-1 cursor-pointer hover:text-red-500"/>
                           </div>
                           <button className="text-xs font-bold text-[#D84315] hover:underline ml-2">Clear All</button>
                       </div>

                       <div className="hidden md:flex items-center gap-3">
                           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-[#002147] hover:bg-gray-50 transition-colors shadow-sm">
                               <Map size={16} /> Map view
                           </button>
                           <div className="flex items-center gap-2">
                               <span className="text-sm text-gray-500">Sort by:</span>
                               <div className="relative">
                                    <select className="appearance-none pl-3 pr-8 py-2 bg-transparent font-bold text-sm text-gray-900 cursor-pointer focus:outline-none">
                                        <option>Newest</option>
                                        <option>Oldest</option>
                                        <option>A-Z</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                               </div>
                           </div>
                       </div>
                   </div>

                   {/* Results Count */}
                   <p className="text-sm text-gray-500 mb-6">Showing 1-14 Of 40 results</p>

                   {/* Product Grid */}
                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                       {MOCK_LISTINGS.map((item) => (
                           <ListingCard 
                                key={item.id}
                                {...item}
                           />
                       ))}
                   </div>

                   {/* Load More */}
                   <div className="mt-12 flex justify-center">
                       <button className="px-8 py-3 bg-white border border-gray-200 text-[#D84315] font-bold rounded-lg hover:bg-[#D84315] hover:text-white transition-all shadow-sm">
                           Load More
                       </button>
                   </div>
               </div>
           </div>
       </main>

       {/* Banner Section above Footer */}
       <div className="bg-[#F3F4F6] py-12 mt-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#002147] flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-[#002147] mb-1">Secure Transactions</h3>
                        <p className="text-sm text-gray-600">Your transactions are secure and with the latest encryption.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#002147] flex items-center justify-center shrink-0">
                         <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-[#002147] mb-1">Easy Returns & Refunds</h3>
                        <p className="text-sm text-gray-600">Hassle-free returns, refunds and exchanges on eligible items.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#002147] flex items-center justify-center shrink-0">
                        <MapPin className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-[#002147] mb-1">Localized Experience</h3>
                        <p className="text-sm text-gray-600">Browse and sell items locally with location-based listings.</p>
                    </div>
                </div>
            </div>
       </div>

       <Footer />
    </div>
  );
}