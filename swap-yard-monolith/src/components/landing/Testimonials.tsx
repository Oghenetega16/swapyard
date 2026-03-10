"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
    {
        id: 1,
        name: "Alice M.",
        location: "Lagos, NG",
        text: "Sold my old sofa in 2 days! The process was so simple and the buyer was verified. Highly recommend.",
        avatar: "https://i.pravatar.cc/150?img=32",
        rating: 5,
    },
    {
        id: 2,
        name: "John D.",
        location: "Abuja, NG",
        text: "Great platform for finding affordable furniture for my new apartment. The map feature is a lifesaver.",
        avatar: "https://i.pravatar.cc/150?img=12",
        rating: 5,
    },
    {
        id: 3,
        name: "Sarah K.",
        location: "Port Harcourt, NG",
        text: "I was skeptical at first, but the verified seller badge gave me peace of mind. The blender works perfectly!",
        avatar: "https://i.pravatar.cc/150?img=5",
        rating: 5,
    },
    {
        id: 4,
        name: "Michael O.",
        location: "Kano, NG",
        text: "Finally a place to sell my used electronics without dealing with endless spam calls. Very secure.",
        avatar: "https://i.pravatar.cc/150?img=11",
        rating: 4,
    },
];

export const Testimonials = () => {
    const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); 
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const currentTestimonials = isMobile 
        ? [TESTIMONIALS[index % TESTIMONIALS.length]]
        : [
            TESTIMONIALS[index % TESTIMONIALS.length],
            TESTIMONIALS[(index + 1) % TESTIMONIALS.length],
        ];

    return (
        <section className="py-16 md:py-20 bg-white overflow-hidden" aria-labelledby="testimonials-heading">
            {/* FIX: Applied the consistent responsive padding to the container */}
            <div className="container mx-auto px-6 md:px-10 lg:px-12 xl:px-4 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
                
                    {/* Left Side: Header Section */}
                    <div className="w-full lg:w-1/3 lg:sticky lg:top-24">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-2.5 w-16 bg-[#EB3B18] rounded-full"></div>
                            <span className="text-[#333] font-medium text-lg">Testimonials</span>
                        </div>
                        
                        <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 md:mb-6 leading-tight">
                            What Our Users <br className="hidden lg:block" /> Are Saying
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base max-w-2xl">
                            Don’t just take our word for it—hear from real buyers and sellers who trust us to connect them with great deals. See why our community loves using Swapyard.
                        </p>
                    </div>

                    {/* Right Side: Cards */}
                    <div className="w-full lg:w-2/3">
                        <div className={`grid grid-cols-1 ${!isMobile ? 'md:grid-cols-2' : ''} gap-6 md:gap-8 min-h-60 md:min-h-75`}>
                            <AnimatePresence mode="popLayout">
                                {currentTestimonials.map((testimonial) => (
                                    <motion.div
                                        key={testimonial.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="bg-gray-50 p-6 md:p-8 pt-8 md:pt-10 rounded-xl relative flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div>
                                            <div
                                                className="h-10 w-10 md:h-12 md:w-12 bg-[#002147] rounded-full flex items-center justify-center absolute -top-5 left-6 md:-top-6 md:left-8 shadow-lg z-10"
                                                aria-hidden="true"
                                            >
                                                <FaQuoteLeft className="text-white text-sm md:text-lg" />
                                            </div>

                                            {/* Stars */}
                                            <div className="flex gap-1 mb-3 md:mb-4 mt-2 md:mt-0">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        fill={i < testimonial.rating ? "#FFC107" : "none"} 
                                                        className={i < testimonial.rating ? "text-[#FFC107]" : "text-gray-300"}
                                                        size={16}
                                                    />
                                                ))}
                                            </div>

                                            <p className="text-gray-600 mb-6 text-sm md:text-[15px] leading-relaxed">
                                                "{testimonial.text}"
                                            </p>
                                        </div>

                                        {/* User Info */}
                                        <div className="flex items-center gap-3 md:gap-4 mt-auto">
                                            <div className="relative h-10 w-10 md:h-12 md:w-12 shrink-0 border-2 border-white rounded-full shadow-sm">
                                                <Image
                                                    src={testimonial.avatar}
                                                    alt={testimonial.name}
                                                    fill
                                                    className="rounded-full object-cover"
                                                    sizes="(max-width: 768px) 40px, 48px"
                                                />
                                            </div>
                                            <div>
                                                <div className="text-sm md:text-base font-bold text-gray-900">{testimonial.name}</div>
                                                <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide">{testimonial.location}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex justify-center lg:justify-start gap-2 mt-6 md:mt-10 lg:ml-2">
                            {TESTIMONIALS.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIndex(i)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        i === index % TESTIMONIALS.length 
                                        ? "w-8 bg-[#EB3B18]" 
                                        : "w-2 bg-gray-300 hover:bg-gray-400"
                                    }`}
                                    aria-label={`Go to testimonial slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};