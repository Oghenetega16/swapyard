"use client";

import { Search, ChevronDown } from "lucide-react";

export default function SellerOrders() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            
            {/* Top Toolbar: Search & Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                {/* Search Bar */}
                <div className="relative w-full max-w-2xl">
                    <input 
                        type="text" 
                        placeholder="Search Listings" 
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
                    />
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm text-gray-700 font-medium">Sort by:</span>
                    <div className="relative">
                        <select aria-label="Sorting option" className="appearance-none bg-[#EB3B18] text-white text-sm font-medium px-4 py-2 pr-10 rounded-lg cursor-pointer focus:outline-none shadow-sm">
                            <option>Newest</option>
                            <option>Oldest</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-200">
                    <thead>
                        <tr className="bg-[#002147] text-white text-sm">
                            <th className="px-4 py-4 rounded-tl-lg font-medium">Order ID</th>
                            <th className="px-4 py-4 font-medium">Buyers</th>
                            <th className="px-4 py-4 font-medium">Item</th>
                            <th className="px-4 py-4 font-medium">Item Condition</th>
                            <th className="px-4 py-4 font-medium">Price</th>
                            <th className="px-4 py-4 rounded-tr-lg font-medium">Order Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-800">
                        {/* Pending Order */}
                        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-5">#12345</td>
                            <td className="px-4 py-5">Olajide Mobilade</td>
                            <td className="px-4 py-5">Blender. Kenwood blender</td>
                            <td className="px-4 py-5">Used</td>
                            <td className="px-4 py-5 font-bold">₦50,000</td>
                            <td className="px-4 py-5">
                                <span className="px-4 py-1.5 rounded-md text-[#3498DB] border border-[#3498DB] text-xs font-semibold">Pending</span>
                            </td>
                        </tr>
                        
                        {/* Shipped Order */}
                        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-5">#12345</td>
                            <td className="px-4 py-5">Sarah John</td>
                            <td className="px-4 py-5">Blender. Kenwood blender</td>
                            <td className="px-4 py-5">Barely Used</td>
                            <td className="px-4 py-5 font-bold">₦40,000</td>
                            <td className="px-4 py-5">
                                <span className="px-4 py-1.5 rounded-md text-[#F1C40F] border border-[#F1C40F] text-xs font-semibold">Shipped</span>
                            </td>
                        </tr>
                        
                        {/* Delivered Order */}
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-5">#12345</td>
                            <td className="px-4 py-5">Emily Dada</td>
                            <td className="px-4 py-5">White Leather Funiture</td>
                            <td className="px-4 py-5">New</td>
                            <td className="px-4 py-5 font-bold">₦50,000</td>
                            <td className="px-4 py-5">
                                <span className="px-4 py-1.5 rounded-md text-[#2ECC71] border border-[#2ECC71] text-xs font-semibold">Delivered</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};