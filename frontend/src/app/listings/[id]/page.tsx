"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layouts/Navbar"; 
import { Footer } from "@/components/landing/Footer"; 
import { FeatureIcons } from "@/components/layouts/FeatureIcons";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingsMap } from "@/components/listings/ListingMap"; 
import { MOCK_LISTINGS } from "@/lib/mockListings"; // 
import { 
    MapPin, 
    Star, 
    Minus, 
    Plus, 
    Heart, 
    MessageSquare, 
    ShoppingCart, 
    Share2, 
    ChevronLeft
} from "lucide-react";

export default function ItemDetailsPage() {
    const params = useParams(); 
    const [quantity, setQuantity] = useState(1);

    // --- 1. FIND THE ITEM DYNAMICALLY ---
    const foundItem = MOCK_LISTINGS.find((item) => item.id === params.id);

    // Handle case where item isn't found
    if (!foundItem) {
        return (
            <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center text-[#002147]">
                <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
                <Link href="/listings" className="text-[#EB3B18] hover:underline flex items-center gap-2">
                    <ChevronLeft size={20} /> Back to Listings
                </Link>
            </div>
        );
    }

    // --- 2. CONSTRUCT DYNAMIC DETAILS ---
    // Map the simple data from the list to the detailed structure your UI expects
    const itemDetails = {
        ...foundItem,
        originalPrice: foundItem.price, 
        // Use description from data or fallback
        description: foundItem.description || `This ${foundItem.title} is listed in the ${foundItem.category} category. It is located in ${foundItem.location}. Condition: ${foundItem.condition}.`,
        listedDate: "Listed 3 days ago", 
        // Ensure seller object exists
        seller: foundItem.seller || {
            name: "Verified Seller",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
            joined: "2023",
            rating: 4.5,
            reviewCount: 10
        },
        // Build the attributes table dynamically
        attributes: [
            { label: "Condition", value: foundItem.condition },
            { label: "Category", value: foundItem.category },
            { label: "Location", value: foundItem.location },
            { label: "Delivery", value: foundItem.delivery },
            { label: "Item ID", value: `#${foundItem.id}00${foundItem.id}` },
            { label: "Verified", value: foundItem.isVerified ? "Yes" : "No" },
        ],
        // Create an image gallery (Reusing the main image since mock data has only one)
        images: [
            foundItem.image,
            foundItem.image, // Duplicate for gallery view
            foundItem.image  // Duplicate for gallery view
        ]
    };

    // Filter out the current item and take the first 4 remaining
    const relatedItems = MOCK_LISTINGS.filter(item => item.id !== foundItem.id).slice(0, 4);

    const handleIncrement = () => setQuantity(q => q + 1);
    const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

    return (
        <div className="min-h-screen bg-[#F9FAFB] text-gray-900 mt-18">
            <Navbar onOpenSidebar={() => {}} /> 

            <main className="container mx-auto px-4 py-8">
                {/* --- MAIN CONTENT GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                    
                    {/* LEFT COLUMN: IMAGES (7 Columns) */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-2 gap-4 h-fit">
                            {/* Main Large Image */}
                            <div className="col-span-2 relative aspect-4/3 bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
                                <Image 
                                    src={itemDetails.images[0]} 
                                    alt={itemDetails.title}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                    priority
                                />
                                <button 
                                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white text-gray-600 transition-colors" 
                                    aria-label="Share listing"
                                >
                                    <Share2 size={20} />
                                </button>
                            </div>
                            
                            {/* Sub Images */}
                            {itemDetails.images.slice(1).map((img, idx) => (
                                <div key={idx} className="relative aspect-4/3 bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
                                    <Image 
                                        src={img} 
                                        alt={`Product view ${idx + 2}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                    {idx === 1 && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                            <div className="w-12 h-12 bg-[#EB3B18] rounded-full flex items-center justify-center text-white shadow-lg">
                                                <div className="w-0 h-0 border-l-8 border-l-white border-y-[6px] border-y-transparent ml-1"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: DETAILS (5 Columns) */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="container mx-auto">
                            <Link 
                                href="/listings" 
                                className="text-[#EB3B18] hover:text-[#bf360c] text-sm font-bold flex items-center gap-1 w-fit"
                                aria-label="Go back to listings page"
                            >
                                <ChevronLeft size={16} /> Back to Listings
                            </Link>
                        </div>
                        
                        {/* Title & Price Header */}
                        <div>
                            <h1 className="text-3xl font-bold text-[#002147] mb-2">{itemDetails.title}</h1>
                            <div className="flex items-center gap-4 mb-2">
                                <span className="text-2xl font-extrabold text-gray-900">{itemDetails.price}</span>
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">Active listing</span>
                            </div>
                            <div className="flex items-center text-gray-500 text-sm">
                                <MapPin size={16} className="mr-1" />
                                {itemDetails.location}
                                <span className="mx-2">•</span>
                                {itemDetails.listedDate}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="text-gray-600 text-sm leading-relaxed">
                            <p>{itemDetails.description}</p>
                        </div>

                        {/* Attributes Table */}
                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <div className="bg-[#002147] text-white px-4 py-2 text-sm font-bold flex justify-between">
                                <span>Feature</span>
                                <span>Description</span>
                            </div>
                            <div className="bg-white">
                                {itemDetails.attributes.map((attr, index) => (
                                    <div key={index} className="flex justify-between px-4 py-3 text-sm border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                        <span className="font-semibold text-gray-700">{attr.label}</span>
                                        <span className="text-gray-600">{attr.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions Row */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                {/* Quantity */}
                                <div className="flex items-center border border-gray-300 rounded-lg h-12">
                                    <button 
                                        onClick={handleDecrement} 
                                        className="w-10 h-full flex items-center justify-center hover:bg-gray-100 text-[#002147] rounded-l-lg"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-10 text-center font-bold text-gray-900" aria-label={`Current quantity ${quantity}`}>{quantity}</span>
                                    <button 
                                        onClick={handleIncrement} 
                                        className="w-10 h-full flex items-center justify-center hover:bg-gray-100 text-[#002147] rounded-r-lg"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <span className="text-xs text-gray-500">{quantity} Item(s) added</span>
                                
                                {/* Wishlist */}
                                <button 
                                    className="ml-auto w-12 h-12 flex items-center justify-center border border-gray-300 rounded-lg text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"
                                    aria-label="Add to wishlist"
                                >
                                    <Heart size={20} />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button 
                                    className="flex items-center justify-center gap-2 bg-[#EB3B18] hover:bg-[#d43315] text-white font-bold py-3.5 rounded-lg shadow-sm transition-all transform active:scale-95"
                                    aria-label="Add item to cart"
                                >
                                    <ShoppingCart size={18} /> Add to cart
                                </button>
                                <button 
                                    className="flex items-center justify-center gap-2 bg-white border border-[#EB3B18] text-[#EB3B18] hover:bg-orange-50 font-bold py-3.5 rounded-lg transition-all"
                                    aria-label="Message the seller"
                                >
                                    <MessageSquare size={18} /> Message Seller
                                </button>
                            </div>
                        </div>

                        {/* Mini Map Location */}
                        <div>
                            <h3 className="font-bold text-[#002147] mb-3">Location</h3>
                            <div className="h-48 rounded-xl overflow-hidden border border-gray-200 shadow-sm relative">
                                <ListingsMap 
                                    listings={[{
                                        id: itemDetails.id,
                                        title: itemDetails.title,
                                        price: itemDetails.price,
                                        location: itemDetails.location,
                                        image: itemDetails.images[0],
                                        lat: itemDetails.lat,
                                        lng: itemDetails.lng
                                    }]}
                                />
                            </div>
                        </div>

                        {/* Seller Details */}
                        <div>
                            <h3 className="font-bold text-[#002147] mb-3">Seller Details</h3>
                            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                                            <Image src={itemDetails.seller.image} alt={itemDetails.seller.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">{itemDetails.seller.name} <span className="font-normal text-gray-500 text-xs">• {itemDetails.location}</span></h4>
                                            <div className="flex items-center gap-1 mt-1">
                                                <div className="flex text-yellow-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={12} fill={i < Math.round(itemDetails.seller.rating) ? "currentColor" : "none"} />
                                                    ))}
                                                </div>
                                                <span className="text-xs text-gray-500">from {itemDetails.seller.reviewCount} Review(s)</span>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-1">Joined SwapYard in {itemDetails.seller.joined}</p>
                                        </div>
                                    </div>
                                    <button 
                                        className="text-xs font-bold text-[#002147] hover:underline"
                                        aria-label="View seller profile"
                                    >
                                        View More
                                    </button>
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-[#002147]">OM</div>
                                            <span className="text-xs font-bold text-gray-700">Olajide M</span>
                                        </div>
                                        <button 
                                            className="text-xs font-bold text-[#002147]"
                                            aria-label="View all seller reviews"
                                        >
                                            View all
                                        </button>
                                    </div>
                                    <div className="flex text-yellow-400 mb-1">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < 4 ? "currentColor" : "none"} />)}
                                    </div>
                                    <p className="text-xs text-gray-600 italic">&ldquo;I got the chair perfectly fine. Smooth communication. Fast delivery.&rdquo;</p>
                                    <p className="text-[10px] text-gray-400 mt-1">Oct 01, 2025</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* --- RELATED ITEMS SECTION --- */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-[#002147] mb-6">You Might Also Like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {relatedItems.map((item) => (
                            <ListingCard key={item.id} {...item} />
                        ))}
                    </div>
                </div>

            </main>

            <FeatureIcons />
            <Footer />
        </div>
    );
}