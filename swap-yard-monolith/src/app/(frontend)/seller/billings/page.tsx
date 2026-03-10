"use client";

import { Search, ChevronDown } from "lucide-react";

export default function SellerBillings() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            
            {/* Top Toolbar: Search & Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="relative w-full max-w-2xl">
                    <input 
                        type="text" 
                        placeholder="Search Listings" 
                        aria-label="Search transaction history"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
                    />
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} aria-hidden="true" />
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm text-gray-700 font-medium">Sort by:</span>
                    <div className="relative">
                        <select 
                            aria-label="Sort transactions by date"
                            className="appearance-none bg-[#002147] text-white text-sm font-medium px-4 py-2 pr-10 rounded-lg cursor-pointer focus:outline-none shadow-sm"
                        >
                            <option>Newest</option>
                            <option>Oldest</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" aria-hidden="true" />
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="bg-gray-50 rounded-xl p-5 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Sales</p>
                        <p className="text-2xl font-extrabold text-gray-900">₦90,000</p>
                    </div>
                    <div className="h-8 w-8 bg-[#002147] rounded flex items-center justify-center text-white font-bold shrink-0" aria-hidden="true">₦</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Pending Payments</p>
                        <p className="text-2xl font-extrabold text-gray-900">₦30,000</p>
                    </div>
                    <div className="h-8 w-8 bg-[#002147] rounded flex items-center justify-center text-white font-bold shrink-0" aria-hidden="true">₦</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Earned</p>
                        <p className="text-2xl font-extrabold text-gray-900">₦60,000</p>
                    </div>
                    <div className="h-8 w-8 bg-[#002147] rounded flex items-center justify-center text-white font-bold shrink-0" aria-hidden="true">₦</div>
                </div>
            </div>

            {/* Transaction History */}
            <h3 className="text-xl font-bold text-gray-900 mb-6">Transaction History</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-200">
                    <thead>
                        <tr className="bg-[#002147] text-white text-sm">
                            <th className="px-4 py-4 rounded-tl-lg font-medium" scope="col">Order ID</th>
                            <th className="px-4 py-4 font-medium" scope="col">Item</th>
                            <th className="px-4 py-4 font-medium" scope="col">Buyer</th>
                            <th className="px-4 py-4 font-medium" scope="col">Payout Date</th>
                            <th className="px-4 py-4 font-medium" scope="col">Amount</th>
                            <th className="px-4 py-4 rounded-tr-lg font-medium" scope="col">Payout Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-800">
                        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-5">#12345</td>
                            <td className="px-4 py-5">Blender. Kenwood blender</td>
                            <td className="px-4 py-5">Madam B</td>
                            <td className="px-4 py-5">02/06/2025</td>
                            <td className="px-4 py-5 font-bold">₦50,000</td>
                            <td className="px-4 py-5">
                                <span className="px-4 py-1.5 rounded-md text-[#3498DB] border border-[#3498DB] text-xs font-semibold">Pending</span>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-5">#12345</td>
                            <td className="px-4 py-5">Brand New Bike</td>
                            <td className="px-4 py-5">Sarah John</td>
                            <td className="px-4 py-5">02/06/2025</td>
                            <td className="px-4 py-5 font-bold">₦40,000</td>
                            <td className="px-4 py-5">
                                <span className="px-4 py-1.5 rounded-md text-[#2ECC71] border border-[#2ECC71] text-xs font-semibold">Paid</span>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-5">#12345</td>
                            <td className="px-4 py-5">White Leather Funiture</td>
                            <td className="px-4 py-5">Emily Dada</td>
                            <td className="px-4 py-5">02/06/2025</td>
                            <td className="px-4 py-5 font-bold">₦50,000</td>
                            <td className="px-4 py-5">
                                <span className="px-4 py-1.5 rounded-md text-[#2ECC71] border border-[#2ECC71] text-xs font-semibold">Paid</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};