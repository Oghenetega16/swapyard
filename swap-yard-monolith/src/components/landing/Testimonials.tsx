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

    // Auto-cycle every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const currentTestimonials = [
        TESTIMONIALS[index % TESTIMONIALS.length],
        TESTIMONIALS[(index + 1) % TESTIMONIALS.length],
    ];

    return (
        <section className="py-20 bg-white" aria-labelledby="testimonials-heading">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-start gap-12">
                
                    {/* Left Side: Header Section */}
                    <div className="md:w-1/3 sticky top-24">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-2.5 w-16.5 bg-[#EB3B18] rounded-full"></div>
                            <span className="text-[#333] font-medium text-lg">Testimonials</span>
                        </div>
                        
                        <h2 id="testimonials-heading" className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">What Our Users <br/> Are Saying</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">Don’t just take our word for it—hear from real buyers and sellers who trust us to connect them with great deals. See why our community loves using Swapyard.</p>
                    </div>

                    {/* Right Side: Cards */}
                    <div className="md:w-2/3 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-75">
                            <AnimatePresence mode="popLayout">
                                {currentTestimonials.map((testimonial) => (
                                    <motion.div
                                        key={testimonial.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="bg-gray-50 p-8 pt-10 rounded-xl relative flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div>
                                            <div
                                                className="h-12 w-12 bg-[#002147] rounded-full flex items-center justify-center absolute -top-6 left-8 shadow-lg z-10"
                                                aria-hidden="true"
                                            >
                                                <FaQuoteLeft size={20} color="white" />
                                            </div>

                                            {/* Stars */}
                                            <div className="flex gap-1 mb-4 mt-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        fill={i < testimonial.rating ? "#FFC107" : "none"} // Gold color
                                                        className={i < testimonial.rating ? "text-[#FFC107]" : "text-gray-300"}
                                                        size={18}
                                                    />
                                                ))}
                                            </div>

                                            <p className="text-gray-600 mb-6 text-[15px] leading-relaxed">{testimonial.text}</p>
                                        </div>

                                        {/* User Info */}
                                        <div className="flex items-center gap-4 mt-auto">
                                            <div className="relative h-12 w-12 shrink-0 border-2 border-white rounded-full shadow-sm">
                                                <Image
                                                    src={testimonial.avatar}
                                                    alt={testimonial.name}
                                                    fill
                                                    className="rounded-full object-cover"
                                                    sizes="48px"
                                                />
                                            </div>
                                            <div>
                                                <div className="text-base font-bold text-gray-900">{testimonial.name}</div>
                                                <div className="text-xs text-gray-500 uppercase tracking-wide">{testimonial.location}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex justify-center md:justify-start gap-2 mt-10 ml-2">
                            {TESTIMONIALS.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIndex(i)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                    i === index % TESTIMONIALS.length ? "w-8 bg-[#EB3B18]" : "w-2 bg-gray-300 hover:bg-gray-400"
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