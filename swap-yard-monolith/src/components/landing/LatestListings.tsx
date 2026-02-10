import { Star, MapPin, Check } from "lucide-react";
import Image from "next/image";

const listings = [
    { 
        id: 1, 
        title: "Wooden dining table set", 
        category: "Furniture",
        description: "Solid oak table with 6 matching chairs, good condition.",
        price: "₦150,000", 
        rating: 4.8,
        loc: "Lagos", 
        img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500"
    },
    { 
        id: 2, 
        title: "Ceramic Vase set", 
        category: "Decor",
        description: "Set of 3 modern ceramic vases, never used.",
        price: "₦25,000", 
        rating: 5.0,
        loc: "Abuja", 
        img: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&auto=format&fit=crop&q=80" 
    },
    { 
        id: 3, 
        title: "Kitchen Item Total Set", 
        category: "Kitchen",
        description: "Complete set of pots, pans, and utensils.",
        price: "₦85,000", 
        rating: 4.5,
        loc: "Lagos", 
        img: "/assets/images/landing/kitchen-2.jpg" 
    },
    { 
        id: 4, 
        title: "Baby toys", 
        category: "Baby & Kids",
        description: "Assorted soft toys and rattles, sanitized.",
        price: "₦12,000", 
        rating: 4.2,
        loc: "Port Harcourt", 
        img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop&q=80" 
    },
];

// Verified Badge Component (Wavy Circle with Check)
const VerifiedBadge = () => (
    <div className="relative flex items-center justify-center w-5 h-5 text-[#27AE60] shrink-0" aria-label="Verified Seller">
        {/* Wavy Circle SVG */}
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-sm">
            <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12Z" />
        </svg>

        {/* White Checkmark */}
        <Check size={10} className="absolute text-white" strokeWidth={3} />
    </div>
);

export const LatestListings = () => {
    return (
        <section className="py-16 bg-white" aria-labelledby="listings-heading">
            <div className="container mx-auto px-4">
                <h2 id="listings-heading" className="text-2xl font-bold mb-8 text-gray-900">Latest Listings</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {listings.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col h-full cursor-pointer">
                            
                            {/* Image Container */}
                            <div className="h-52 w-full relative shrink-0">
                                <Image 
                                    src={item.img} 
                                    alt={item.title} 
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                                
                                {/* Category Badge (Top Left) */}
                                <div className="absolute top-3 left-3 z-10">
                                    <span className="bg-white/95 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-gray-100 uppercase tracking-wide">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Favorite Button (Top Right) */}
                                <button 
                                    className="absolute top-3 right-3 p-1.5 bg-white/95 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm z-10"
                                    aria-label={`Add ${item.title} to favorites`}
                                >
                                    <Star size={16} fill="currentColor" className={item.id === 1 ? "text-red-500" : ""} />
                                </button>
                            </div>
                            
                            {/* Content Container */}
                            <div className="p-4 flex flex-col grow">
                                {/* Title and Verified Badge */}
                                <div className="flex justify-between items-start gap-2 mb-1">
                                    <h3 className="font-bold text-gray-900 truncate text-base flex-1">{item.title}</h3>
                                    <VerifiedBadge />
                                </div>

                                {/* Description */}
                                <p className="text-xs text-gray-500 mb-4 line-clamp-2 min-h-[2.5em] leading-relaxed">
                                    {item.description}
                                </p>

                                {/* Price, Location, Rating */}
                                <div className="mt-auto">
                                    <div className="flex justify-between items-end mb-3">
                                        <p className="text-black font-extrabold text-lg">{item.price}</p>
                                        
                                        {/* Rating Pill */}
                                        <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded border border-yellow-100">
                                            <Star size={10} className="text-yellow-500 fill-yellow-500" />
                                            <span className="text-[10px] font-bold text-gray-800">{item.rating}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center text-xs text-gray-400">
                                        <MapPin size={12} className="mr-1" /> 
                                        {item.loc}
                                    </div>

                                    {/* Seller Info Divider */}
                                    <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-full bg-gray-200 relative overflow-hidden shrink-0">
                                            {/* Placeholder Avatar */}
                                            <div className="absolute inset-0 bg-gray-300"></div> 
                                        </div>
                                        <span className="text-xs font-medium text-gray-500">John Doe</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};