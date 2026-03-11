"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Edit, Trash2, Eye, Star, Share2, CheckCircle2, MoreVertical, Plus } from "lucide-react";
import Link from "next/link";

// Mock Data for the store
const MOCK_STORE_ITEMS = [
    {
        id: "1",
        title: "Kenwood Blender (Good condition)",
        price: "₦54,000",
        category: "Electronics",
        status: "Active",
        views: 142,
        image: "/assets/images/landing/electronics-1.jpg"
    },
    {
        id: "2",
        title: "White Leather Sofa",
        price: "₦120,000",
        category: "Furniture",
        status: "Active",
        views: 315,
        image: "/assets/images/landing/furniture-1.jpg"
    },
    {
        id: "3",
        title: "Brand New Mountain Bike",
        price: "₦85,000",
        category: "Sports",
        status: "Sold",
        views: 520,
        image: "/assets/images/landing/decor-1.jpg"
    },
    {
        id: "4",
        title: "Wooden Office Desk",
        price: "₦45,000",
        category: "Office",
        status: "Draft",
        views: 0,
        image: "/assets/images/landing/office-1.jpg"
    }
];

export default function SellerStore() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    // Filter logic
    const filteredItems = MOCK_STORE_ITEMS.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All" || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            
            {/* Store Header Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 pb-8 border-b border-gray-100 mb-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-5 text-center md:text-left">
                    <div className="relative shrink-0">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100">
                            <Image src="https://i.pravatar.cc/150?img=47" alt="Olajide Mobilade" width={80} height={80} className="object-cover" />
                        </div>
                        <div className="absolute bottom-0 right-0 bg-white rounded-full">
                            <CheckCircle2 size={20} className="text-[#2ECC71] fill-white" />
                        </div>
                    </div>
                    <div className="pt-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Olajide's Store</h2>
                        <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1"><Star size={16} className="text-[#FFC107] fill-[#FFC107]" /> 4.8 (24 Reviews)</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span>Joined 2024</span>
                        </div>
                        <p className="text-sm text-gray-500 max-w-md leading-relaxed">
                            Selling top quality fairly used electronics and household furniture. Fast responses and secure transactions!
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 shrink-0">
                    <button 
                        aria-label="Share Store"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
                    >
                        <Share2 size={16} /> Share Store
                    </button>
                    <Link 
                        href="/seller/post-listing" 
                        aria-label="Add new item"
                        className="flex items-center gap-2 px-4 py-2 bg-[#EB3B18] text-white rounded-lg text-sm font-bold hover:bg-[#d13214] transition-colors shadow-sm cursor-pointer"
                    >
                        <Plus size={16} /> Add Item
                    </Link>
                </div>
            </div>

            {/* Toolbar: Search & Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {["All", "Active", "Draft", "Sold"].map((status) => (
                        <button 
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            aria-label={`Filter by ${status} status`}
                            aria-pressed={statusFilter === status}
                            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                                statusFilter === status 
                                ? "bg-[#002147] text-white" 
                                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-72 shrink-0">
                    <input 
                        type="text" 
                        placeholder="Search your listings..." 
                        aria-label="Search your listings"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
                    />
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} aria-hidden="true" />
                </div>
            </div>

            {/* Listings Grid */}
            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                            {/* Image & Status Badge */}
                            <div className="relative h-48 w-full bg-gray-100">
                                <Image src={item.image} alt={`Image of ${item.title}`} fill className="object-cover" />
                                <div className="absolute top-3 left-3">
                                    <span className={`px-2.5 py-1 text-xs font-bold rounded shadow-sm text-white ${
                                        item.status === 'Active' ? 'bg-[#2ECC71]' : 
                                        item.status === 'Sold' ? 'bg-gray-800' : 'bg-gray-400'
                                    }`}>
                                        {item.status}
                                    </span>
                                </div>
                                <button 
                                    aria-label={`More options for ${item.title}`}
                                    className="absolute top-3 right-3 p-1.5 bg-white rounded shadow-sm text-gray-600 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                >
                                    <MoreVertical size={16} />
                                </button>
                            </div>

                            {/* Details */}
                            <div className="p-4 flex-1 flex flex-col">
                                <div className="text-xs text-gray-500 mb-1">{item.category}</div>
                                <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1" title={item.title}>{item.title}</h3>
                                <p className="font-extrabold text-[#EB3B18] mb-3">{item.price}</p>
                                
                                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 mt-auto">
                                    <Eye size={14} aria-hidden="true" /> {item.views} Views
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
                                    <button 
                                        aria-label={`Edit ${item.title}`}
                                        className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-[#002147] bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                                    >
                                        <Edit size={14} /> Edit
                                    </button>
                                    <button 
                                        aria-label={`Delete ${item.title}`}
                                        className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors cursor-pointer"
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 px-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="text-gray-400" size={24} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No listings found</h3>
                    <p className="text-gray-500 text-sm max-w-sm mx-auto">
                        We couldn't find any listings matching your current filters. Try clearing your search or adding a new item!
                    </p>
                </div>
            )}
        </div>
    );
}