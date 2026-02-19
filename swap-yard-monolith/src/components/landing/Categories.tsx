"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categoriesData = [
    {
        title: "Furniture",
        href: "#",
        images: [
            "/assets/images/landing/furniture-1.jpg",
            "/assets/images/landing/furniture-2.jpg",
            "/assets/images/landing/furniture-3.jpg",
            "/assets/images/landing/furniture-4.jpg",
        ]
    },
    {
        title: "Electronics",
        href: "#",
        images: [
            "/assets/images/landing/electronics-1.jpg",
            "/assets/images/landing/electronics-2.jpg",
            "/assets/images/landing/electronics-3.jpg",
            "/assets/images/landing/electronics-4.jpg",
        ]
    },
    {
        title: "Decor",
        href: "#",
        images: [
            "/assets/images/landing/decor-1.jpg",
            "/assets/images/landing/decor-2.jpg",
            "/assets/images/landing/decor-3.jpg",
            "/assets/images/landing/decor-4.jpg",
        ]
    },
    {
        title: "Office",
        href: "#",
        images: [
            "/assets/images/landing/office-1.jpg",
            "/assets/images/landing/office-2.jpg",
            "/assets/images/landing/office-3.jpg",
            "/assets/images/landing/office-4.jpg",
        ]
    },
    {
        title: "Bedroom",
        href: "#",
        images: [
            "/assets/images/landing/bedroom-1.jpg",
            "/assets/images/landing/bedroom-2.jpg",
            "/assets/images/landing/bedroom-3.jpg",
            "/assets/images/landing/bedroom-4.jpg",
        ]
    },
    {
        title: "Baby & Kids",
        href: "#",
        images: [
            "/assets/images/landing/baby-1.jpg",
            "/assets/images/landing/baby-2.jpg",
            "/assets/images/landing/baby-3.jpg",
            "/assets/images/landing/baby-4.jpg",
        ]
    },
    {
        title: "Kitchen & Dining",
        href: "#",
        images: [
            "/assets/images/landing/kitchen-1.jpg",
            "/assets/images/landing/kitchen-2.jpg",
            "/assets/images/landing/kitchen-3.jpg",
            "/assets/images/landing/kitchen-4.jpg",
        ]
    }
];

// Reusable Card Component with Animation Logic
const CategoryCard = ({ title, images, href }: { title: string, images: string[], href: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000); 
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <Link 
            href={href} 
            className="h-64 md:h-70 w-full md:w-87.5 shrink-0 rounded-xl overflow-hidden relative group cursor-pointer block shadow-sm hover:shadow-lg transition-all duration-300"
            aria-label={`Browse ${title}`}
        >
            <div className="absolute inset-0 bg-gray-100">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image 
                            src={images[currentIndex]} 
                            alt={`${title} example`}
                            fill
                            className="object-cover transition-transform duration-6000 ease-linear group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 350px"
                            priority={true}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
            
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-5 left-5 z-10">
                <span className="bg-white/95 backdrop-blur-md px-5 py-2 rounded-lg text-sm font-bold text-gray-900 shadow-md">
                    {title}
                </span>
            </div>
        </Link>
    );
};

export const Categories = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = 370; 
            const targetScroll = direction === 'left' 
                ? container.scrollLeft - scrollAmount 
                : container.scrollLeft + scrollAmount;
            
            container.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-16 bg-[#F9FAFB]" aria-labelledby="categories-heading">
            <div className="container mx-auto px-4">
                
                {/* Header Container with Title (Left) and Arrows (Right) */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                        <h2 id="categories-heading" className="text-2xl font-bold text-gray-900">
                            What are you looking for?
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">Discover every second-hand item you need!</p>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-3">
                        <button 
                            onClick={() => scroll('left')}
                            className="p-3 rounded-full cursor-pointer border border-gray-300 bg-white hover:bg-gray-50 hover:border-[#EB3B18] hover:text-[#EB3B18] transition-colors shadow-sm"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button 
                            onClick={() => scroll('right')}
                            className="p-3 rounded-full cursor-pointer border border-gray-300 bg-white hover:bg-gray-50 hover:border-[#EB3B18] hover:text-[#EB3B18] transition-colors shadow-sm"
                            aria-label="Scroll right"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
                
                {/* Horizontal Scrollable Container */}
                <div 
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar
                >
                    {categoriesData.map((category) => (
                        <CategoryCard 
                            key={category.title}
                            title={category.title}
                            href={category.href}
                            images={category.images}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};