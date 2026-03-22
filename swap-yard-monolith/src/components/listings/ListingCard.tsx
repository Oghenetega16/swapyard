"use client";

import { useState } from "react";
import { Heart, MapPin, Star, Check } from "lucide-react";
import { IoCart } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

interface ListingCardProps {
    id: string;
    title: string;
    category: string;
    price: string;
    location: string;
    image: string;
    rating?: number;
    reviews?: number;
    isVerified?: boolean;
    condition: string;
}

export const ListingCard = ({
    id,
    title,
    category,
    price,
    location,
    image,
    rating,
    reviews,
    isVerified,
    condition
}: ListingCardProps) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    const handleCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Added to cart");
    };

    return (
        <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full relative">
            
            {/* Absolute Action Buttons (Outside the Link) */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                {/* Heart / Like Button */}
                <button
                    type="button"
                    onClick={handleLike}
                    className={`p-2 bg-white rounded-full shadow-sm transition-all duration-300 cursor-pointer ${
                        isLiked 
                            ? "text-[#EB3B18] opacity-100" 
                            : "text-gray-400 opacity-0 group-hover:opacity-100 hover:text-[#EB3B18] hover:bg-red-50" 
                    }`}
                    aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
                >
                    <Heart 
                        size={16} 
                        fill={isLiked ? "#EB3B18" : "none"} 
                        className="transition-colors duration-300"
                    />
                </button>

                {/* Cart Button */}
                <button
                    type="button"
                    onClick={handleCart}
                    className="p-2 bg-white rounded-full shadow-sm text-gray-400 opacity-0 group-hover:opacity-100 hover:text-[#EB3B18] hover:bg-orange-50 transition-all duration-300 cursor-pointer"
                    aria-label="Add to cart"
                >
                    <IoCart size={16} />
                </button>
            </div>

            {/* Category Tag (Outside the Link so it stays on top) */}
            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-700 rounded-sm z-10 pointer-events-none">
                {category}
            </span>

            {/* Clickable Area (The Link) */}
            <Link href={`/listings/${id}`} className="flex flex-col h-full outline-none focus:ring-2 focus:ring-[#002147]">
                
                {/* Image Container */}
                <div className="relative h-48 w-full bg-gray-100 shrink-0">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col grow">
                    {/* Category & Rating Row */}
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400 font-medium">{category}</span>
                        <div className="flex items-center gap-1">
                            {rating ? (
                                <>
                                    <Star size={10} className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-[10px] text-gray-500">({reviews})</span>
                                </>
                            ) : (
                                <span className="text-[10px] text-gray-300">No ratings</span>
                            )}
                        </div>
                    </div>

                    {/* Title & Verified */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-gray-900 text-sm line-clamp-1 group-hover:text-[#EB3B18] transition-colors">
                            {title}
                        </h3>
                        {isVerified && (
                            <div 
                                className="relative flex items-center justify-center w-4 h-4 text-[#27AE60] shrink-0" 
                                title="Verified Seller"
                                aria-label="Verified Seller"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                    <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12Z" />
                                </svg>
                                <Check size={8} className="absolute text-white" strokeWidth={4} />
                            </div>
                        )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-xs text-gray-500 mb-4">
                        <MapPin size={12} className="mr-1 shrink-0" />
                        <span className="truncate">{location}</span>
                    </div>

                    {/* Price */}
                    <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                        <span className="font-extrabold text-[#002147] text-lg">{price}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};