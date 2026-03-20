"use client";

import { Search, ChevronDown } from "lucide-react";
import { useSellerBilling } from "@/hooks/useSellerBilling";

export default function SellerBillings() {
    const { 
        isLoading, error, stats, transactions, 
        searchQuery, setSearchQuery, sortBy, setSortBy 
    } = useSellerBilling();

    // Helper to determine status colors based on your Prisma Enums
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'PAID':
                return "text-[#2ECC71] border-[#2ECC71]"; // Green
            case 'PENDING':
            case 'PROCESSING':
            case 'ON_HOLD':
                return "text-[#3498DB] border-[#3498DB]"; // Blue
            case 'FAILED':
            case 'REVERSED':
                return "text-[#E74C3C] border-[#E74C3C]"; // Red
            default:
                return "text-gray-500 border-gray-500";
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#002147]"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            
            {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                    {error}
                </div>
            )}

            {/* Top Toolbar: Search & Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="relative w-full max-w-2xl">
                    <input 
                        type="text" 
                        placeholder="Search by Item, Buyer, or Order ID" 
                        aria-label="Search transaction history"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
                    />
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} aria-hidden="true" />
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm text-gray-700 font-medium">Sort by:</span>
                    <div className="relative">
                        <select 
                            aria-label="Sort transactions by date"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none bg-[#002147] text-white text-sm font-medium px-4 py-2 pr-10 rounded-lg cursor-pointer focus:outline-none shadow-sm"
                        >
                            <option value="Newest">Newest</option>
                            <option value="Oldest">Oldest</option>
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
                        <p className="text-2xl font-extrabold text-gray-900">₦{stats.totalSales.toLocaleString()}</p>
                    </div>
                    <div className="h-8 w-8 bg-[#002147] rounded flex items-center justify-center text-white font-bold shrink-0" aria-hidden="true">₦</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Pending Payments</p>
                        <p className="text-2xl font-extrabold text-gray-900">₦{stats.pendingPayments.toLocaleString()}</p>
                    </div>
                    <div className="h-8 w-8 bg-[#002147] rounded flex items-center justify-center text-white font-bold shrink-0" aria-hidden="true">₦</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Earned</p>
                        <p className="text-2xl font-extrabold text-gray-900">₦{stats.totalEarned.toLocaleString()}</p>
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
                            <th className="px-4 py-4 rounded-tl-lg font-medium whitespace-nowrap" scope="col">Order ID</th>
                            <th className="px-4 py-4 font-medium min-w-50" scope="col">Item</th>
                            <th className="px-4 py-4 font-medium whitespace-nowrap" scope="col">Buyer</th>
                            <th className="px-4 py-4 font-medium whitespace-nowrap" scope="col">Payout Date</th>
                            <th className="px-4 py-4 font-medium whitespace-nowrap" scope="col">Amount</th>
                            <th className="px-4 py-4 rounded-tr-lg font-medium whitespace-nowrap" scope="col">Payout Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-800">
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                    No transactions found.
                                </td>
                            </tr>
                        ) : (
                            transactions.map((tx) => (
                                <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-5 font-mono text-xs text-gray-500">{tx.orderId}</td>
                                    <td className="px-4 py-5 font-medium">{tx.itemName}</td>
                                    <td className="px-4 py-5">{tx.buyerName}</td>
                                    <td className="px-4 py-5">
                                        {new Date(tx.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                    </td>
                                    <td className="px-4 py-5 font-bold">₦{tx.amount.toLocaleString()}</td>
                                    <td className="px-4 py-5">
                                        <span className={`px-4 py-1.5 rounded-md border text-xs font-semibold capitalize ${getStatusStyle(tx.status)}`}>
                                            {tx.status.toLowerCase().replace('_', ' ')}
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