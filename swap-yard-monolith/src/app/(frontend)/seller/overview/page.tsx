"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, ShoppingCart, Package, Image as ImageIcon } from "lucide-react";
import { useSellerOverview } from "@/hooks/useSellerOverview";

export default function SellerOverview() {
    const { state, helpers } = useSellerOverview();

    // Status styling helper from the Orders page
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'DELIVERED':
            case 'COMPLETED':
            case 'PAID':
                return "text-green-600 border-green-300 bg-green-50";
            case 'SHIPPED':
                return "text-yellow-600 border-yellow-300 bg-yellow-50";
            case 'PENDING_PAYMENT':
            case 'PROCESSING':
                return "text-blue-600 border-blue-200 bg-blue-50";
            case 'CANCELLED':
            case 'REFUNDED':
                return "text-red-600 border-red-200 bg-red-50";
            default:
                return "text-gray-500 border-gray-200 bg-gray-50";
        }
    };

    const formatStatusText = (status: string) => {
        return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    };

    if (state.isLoading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#002147]"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[#002147] mb-6">Overview</h2>

            {state.error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                    {state.error}
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {/* Total Sales */}
                <div className="bg-gray-50 rounded-xl p-5 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Sales</p>
                        <p className="text-2xl font-extrabold text-gray-900">{helpers.formatPrice(state.stats.totalSales)}</p>
                    </div>
                    <div className="h-8 w-8 bg-[#002147] rounded flex items-center justify-center text-white font-bold shrink-0">
                        ₦
                    </div>
                </div>

                {/* Total Orders */}
                <div className="bg-gray-50 rounded-xl p-5 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
                        <p className="text-2xl font-extrabold text-gray-900">{state.stats.totalOrders}</p>
                    </div>
                    <div className="h-8 w-8 bg-[#002147] rounded flex items-center justify-center text-white shrink-0">
                        <ShoppingCart size={16} />
                    </div>
                </div>

                {/* Customers */}
                <div className="bg-gray-50 rounded-xl p-5 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Customers</p>
                        <p className="text-2xl font-extrabold text-gray-900">{state.stats.totalCustomers}</p>
                    </div>
                    <div className="h-8 w-8 bg-[#002147] rounded flex items-center justify-center text-white shrink-0">
                        <Package size={16} />
                    </div>
                </div>

                {/* Post New Listing Button */}
                <Link 
                    href="/seller/post-listing" 
                    className="bg-[#EB3B18] hover:bg-[#d13214] text-white rounded-xl p-5 flex items-center justify-center gap-2 transition-colors shadow-sm h-full"
                >
                    <Plus size={20} />
                    <span className="font-bold text-lg leading-tight text-center">Post New<br/>Listing</span>
                </Link>
            </div>

            {/* Posted Listings Section */}
            <div className="mb-10">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Recent Listings</h3>
                    <Link href="/seller/store" className="text-sm font-bold text-[#EB3B18] hover:underline">View All</Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {state.recentListings.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">You haven't posted any listings yet.</p>
                    ) : (
                        state.recentListings.map((listing) => (
                            <div key={listing.id} className="flex gap-4 items-center bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                                <div className="h-24 w-24 relative rounded-lg overflow-hidden shrink-0 bg-gray-200 flex items-center justify-center">
                                    {listing.image ? (
                                        <Image src={listing.image} alt={listing.name} fill className="object-cover" />
                                    ) : (
                                        <ImageIcon className="text-gray-400" size={24} />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{listing.category || "General"}</p>
                                    <p className="font-bold text-gray-900 mb-0.5">{helpers.formatPrice(listing.price)}</p>
                                    <p className="text-sm text-gray-800 font-semibold truncate" title={listing.name}>{listing.name}</p>
                                    <p className="text-xs text-gray-500 capitalize mt-1 border border-gray-200 bg-white inline-block px-2 py-0.5 rounded">
                                        {listing.condition.toLowerCase()}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Order History Section */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                    <Link href="/seller/orders" className="text-sm font-bold text-[#EB3B18] hover:underline">View All</Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-200">
                        <thead>
                            <tr className="bg-[#002147] text-white text-sm">
                                <th className="px-4 py-3 rounded-tl-lg font-medium whitespace-nowrap">Order ID</th>
                                <th className="px-4 py-3 font-medium min-w-50">Item</th>
                                <th className="px-4 py-3 font-medium whitespace-nowrap">Buyer</th>
                                <th className="px-4 py-3 font-medium whitespace-nowrap">Item Condition</th>
                                <th className="px-4 py-3 font-medium whitespace-nowrap">Price</th>
                                <th className="px-4 py-3 rounded-tr-lg font-medium whitespace-nowrap">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-800">
                            {state.recentOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500 italic">
                                        No recent orders.
                                    </td>
                                </tr>
                            ) : (
                                state.recentOrders.map((order) => (
                                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4 font-mono text-xs text-gray-500">{order.orderId}</td>
                                        <td className="px-4 py-4 font-medium">{order.itemName}</td>
                                        <td className="px-4 py-4">{order.buyerName}</td>
                                        <td className="px-4 py-4 capitalize">{order.condition.toLowerCase()}</td>
                                        <td className="px-4 py-4 font-bold">{helpers.formatPrice(order.price)}</td>
                                        <td className="px-4 py-4">
                                            <span className={`px-3 py-1 rounded border text-xs font-medium whitespace-nowrap ${getStatusStyle(order.status)}`}>
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
        </div>
    );
}