"use client";

import { Search, ChevronDown } from "lucide-react";
import { useSellerOrders } from "@/hooks/useSellerOrders";

export default function SellerOrders() {
    const { state, setters, helpers } = useSellerOrders();

    // Dynamically style badges based on Prisma OrderStatus Enum
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'DELIVERED':
            case 'COMPLETED':
            case 'PAID':
            case 'BUYER_CONFIRMED':
                return "text-[#2ECC71] border-[#2ECC71]"; // Green
            case 'SHIPPED':
                return "text-[#F1C40F] border-[#F1C40F]"; // Yellow/Orange
            case 'PENDING_PAYMENT':
            case 'PROCESSING':
                return "text-[#3498DB] border-[#3498DB]"; // Blue
            case 'CANCELLED':
            case 'REFUNDED':
            case 'DISPUTED':
                return "text-[#E74C3C] border-[#E74C3C]"; // Red
            default:
                return "text-gray-500 border-gray-500";
        }
    };

    // Format Prisma Enums (e.g., 'PENDING_PAYMENT' -> 'Pending Payment')
    const formatStatusText = (status: string) => {
        return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    };

    if (state.isLoading) {
        return (
            <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#002147]"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            
            {state.error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium" role="alert">
                    {state.error}
                </div>
            )}

            {/* Top Toolbar: Search & Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                {/* Search Bar */}
                <div className="relative w-full max-w-2xl">
                    <input 
                        type="text" 
                        placeholder="Search by Item, Buyer, or Order ID" 
                        value={state.searchQuery}
                        onChange={(e) => setters.setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
                    />
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-3 shrink-0">
                    <label htmlFor="sortOrders" className="text-sm text-gray-700 font-medium">Sort by:</label>
                    <div className="relative">
                        <select 
                            id="sortOrders"
                            title="Sort Orders"
                            aria-label="Sorting option" 
                            value={state.sortBy}
                            onChange={(e) => setters.setSortBy(e.target.value)}
                            className="appearance-none bg-[#EB3B18] text-white text-sm font-medium px-4 py-2 pr-10 rounded-lg cursor-pointer focus:outline-none shadow-sm"
                        >
                            <option value="Newest">Newest</option>
                            <option value="Oldest">Oldest</option>
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
                            <th className="px-4 py-4 rounded-tl-lg font-medium whitespace-nowrap">Order ID</th>
                            <th className="px-4 py-4 font-medium whitespace-nowrap">Buyer</th>
                            <th className="px-4 py-4 font-medium min-w-50">Item</th>
                            <th className="px-4 py-4 font-medium whitespace-nowrap">Item Condition</th>
                            <th className="px-4 py-4 font-medium whitespace-nowrap">Price</th>
                            <th className="px-4 py-4 rounded-tr-lg font-medium whitespace-nowrap">Order Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-800">
                        {state.orders.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                    No orders found matching your search.
                                </td>
                            </tr>
                        ) : (
                            state.orders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-5 font-mono text-xs text-gray-500">{order.orderId}</td>
                                    <td className="px-4 py-5 font-medium">{order.buyerName}</td>
                                    <td className="px-4 py-5">{order.itemName}</td>
                                    <td className="px-4 py-5 capitalize">{order.condition.toLowerCase()}</td>
                                    <td className="px-4 py-5 font-bold">{helpers.formatPrice(order.price)}</td>
                                    <td className="px-4 py-5">
                                        <span className={`px-4 py-1.5 rounded-md border text-xs font-semibold whitespace-nowrap ${getStatusStyle(order.status)}`}>
                                            {formatStatusText(order.status)}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}