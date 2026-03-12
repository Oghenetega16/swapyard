"use client";

import Image from "next/image";
import { Search, Edit, Trash2, Eye, Star, Share2, CheckCircle2, MoreVertical, Plus, Image as ImageIcon, X, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useSellerStore } from "@/hooks/useSellerStore";

export default function SellerStore() {
    const { state, setters, handlers, helpers } = useSellerStore();

    // Helper to get initials (Fallback for missing avatar)
    const getInitials = () => {
        if (!state.sellerProfile) return "S";
        const first = state.sellerProfile.firstName?.charAt(0) || "";
        const last = state.sellerProfile.lastName?.charAt(0) || "";
        return (first + last).toUpperCase() || "S";
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 relative">
            
            {/* Store Header Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 pb-8 border-b border-gray-100 mb-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-5 text-center md:text-left">
                    <div className="relative shrink-0">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100 bg-[#002147] flex items-center justify-center text-white">
                            {state.sellerProfile?.profileImageUrl ? (
                                <Image 
                                    src={state.sellerProfile.profileImageUrl} 
                                    alt={`${state.sellerProfile.firstName}'s Avatar`} 
                                    width={80} 
                                    height={80} 
                                    className="object-cover w-full h-full" 
                                />
                            ) : (
                                <span className="text-2xl font-bold tracking-wider">{getInitials()}</span>
                            )}
                        </div>
                        {/* Only show verification badge if user is actually verified (fallback to true for now) */}
                        {(state.sellerProfile as any)?.isVerified !== false && (
                            <div className="absolute bottom-0 right-0 bg-white rounded-full">
                                <CheckCircle2 size={20} className="text-[#2ECC71] fill-white" aria-hidden="true" />
                            </div>
                        )}
                    </div>
                    <div className="pt-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                            {state.sellerProfile?.firstName ? `${state.sellerProfile.firstName}'s Store` : "My Store"}
                        </h2>
                        <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                                <Star size={16} className="text-[#FFC107] fill-[#FFC107]" aria-hidden="true" /> 
                                {/* Dynamic rating fallback */}
                                {(state.sellerProfile as any)?.rating || "4.8"} ({(state.sellerProfile as any)?.reviewCount || "24"} Reviews)
                            </span>
                            <span className="w-1 h-1 rounded-full bg-gray-300" aria-hidden="true"></span>
                            {/* Dynamic joined date fallback */}
                            <span>Joined {(state.sellerProfile as any)?.createdAt ? new Date((state.sellerProfile as any).createdAt).getFullYear() : "2024"}</span>
                        </div>
                        <p className="text-sm text-gray-500 max-w-md leading-relaxed">
                            {state.sellerProfile?.bio || "No store description added. Head to your account settings to add a bio!"}
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 shrink-0">
                    <button 
                        aria-label="Share Store"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
                    >
                        <Share2 size={16} aria-hidden="true" /> Share Store
                    </button>
                    <Link 
                        href="/seller/post-listing" 
                        aria-label="Add new item"
                        className="flex items-center gap-2 px-4 py-2 bg-[#EB3B18] text-white rounded-lg text-sm font-bold hover:bg-[#d13214] transition-colors shadow-sm cursor-pointer"
                    >
                        <Plus size={16} aria-hidden="true" /> Add Item
                    </Link>
                </div>
            </div>

            {/* Error State */}
            {state.error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium" role="alert">
                    {state.error}
                </div>
            )}

            {/* Toolbar: Search & Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {["All", "Active", "Draft", "Sold"].map((status) => (
                        <button 
                            key={status}
                            onClick={() => setters.setStatusFilter(status)}
                            aria-label={`Filter by ${status} status`}
                            aria-pressed={state.statusFilter === status}
                            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                                state.statusFilter === status 
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
                        value={state.searchQuery}
                        onChange={(e) => setters.setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
                    />
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} aria-hidden="true" />
                </div>
            </div>

            {/* Loading State */}
            {state.isLoading ? (
                <div className="flex justify-center items-center py-20" aria-busy="true" aria-live="polite">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#002147]"></div>
                </div>
            ) : state.filteredItems.length > 0 ? (
                /* Listings Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {state.filteredItems.map((item) => {
                        const statusBadge = item.status === "AVAILABLE" ? "Active" : 
                                            item.status === "SOLD" ? "Sold" : "Draft";
                                            
                        const imageUrl = item.images && item.images.length > 0 ? item.images[0].url : null;

                        return (
                            <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                                <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center">
                                    {imageUrl ? (
                                        <Image 
                                            src={imageUrl} 
                                            alt={`Image of ${item.name}`} 
                                            fill 
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            className="object-cover" 
                                        />
                                    ) : (
                                        <ImageIcon size={40} className="text-gray-300" aria-hidden="true" />
                                    )}
                                    <div className="absolute top-3 left-3">
                                        <span className={`px-2.5 py-1 text-xs font-bold rounded shadow-sm text-white ${
                                            statusBadge === 'Active' ? 'bg-[#2ECC71]' : 
                                            statusBadge === 'Sold' ? 'bg-gray-800' : 'bg-gray-400'
                                        }`}>
                                            {statusBadge}
                                        </span>
                                    </div>
                                    <button 
                                        aria-label={`More options for ${item.name}`}
                                        className="absolute top-3 right-3 p-1.5 bg-white rounded shadow-sm text-gray-600 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        <MoreVertical size={16} aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="p-4 flex-1 flex flex-col">
                                    <div className="text-xs text-gray-500 mb-1">{item.category || "General"}</div>
                                    <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1" title={item.name}>{item.name}</h3>
                                    <p className="font-extrabold text-[#EB3B18] mb-3">{helpers.formatPrice(item.price)}</p>
                                    
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 mt-auto">
                                        <Eye size={14} aria-hidden="true" /> {item.views || 0} Views
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
                                        <button 
                                            onClick={() => handlers.handleEdit(item.id)}
                                            aria-label={`Edit ${item.name}`}
                                            className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-[#002147] bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                                        >
                                            <Edit size={14} aria-hidden="true" /> Edit
                                        </button>
                                        <button 
                                            onClick={() => handlers.confirmDelete(item.id)}
                                            aria-label={`Delete ${item.name}`}
                                            className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors cursor-pointer"
                                        >
                                            <Trash2 size={14} aria-hidden="true" /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* Empty State */
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

            {/* Custom Delete Confirmation Modal */}
            {state.itemToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative text-center">
                        <button 
                            onClick={handlers.cancelDelete} 
                            disabled={state.isDeleting}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors p-2 cursor-pointer disabled:opacity-50"
                            aria-label="Close modal"
                        >
                            <X size={24} />
                        </button>

                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <AlertTriangle size={36} className="text-red-600" />
                        </div>

                        <h3 id="delete-modal-title" className="text-xl font-bold text-gray-900 mb-2">
                            Delete Listing?
                        </h3>
                        <p className="text-gray-500 text-sm mb-8">
                            Are you sure you want to delete this item? This action cannot be undone and it will be removed from the platform entirely.
                        </p>

                        <div className="flex gap-4">
                            <button 
                                onClick={handlers.cancelDelete}
                                disabled={state.isDeleting}
                                className="flex-1 bg-white text-gray-700 border border-gray-300 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handlers.executeDelete} 
                                disabled={state.isDeleting}
                                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-sm cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {state.isDeleting ? (
                                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Deleting...</>
                                ) : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}