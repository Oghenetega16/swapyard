"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

interface NavbarProps {
    onOpenSidebar: () => void;
}

export const Navbar = ({ onOpenSidebar }: NavbarProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    
    useEffect(() => {
        const checkAuth = async () => {
            const token = await fetch("/api/auth/me")
            setIsAuth(!!token);
        };
        checkAuth();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav 
            className={`fixed w-full z-30 top-0 text-white transition-all duration-300 ${
                isScrolled 
                    ? "bg-[#012E4C]/90 backdrop-blur-md shadow-md py-4" // Scrolled: Dark glass, compact
                    : "bg-transparent/10 backdrop-blur-sm py-6"        // Top: Transparent, spacious
            }`}
            aria-label="Main Navigation"
        >
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button 
                        className="md:hidden" 
                        onClick={onOpenSidebar}
                        aria-label="Open main menu"
                    >
                        <Menu className="text-white w-8 h-8" />
                    </button>
                    {/* Note: Ensure Logo is visible on dark background */}
                    <Logo /> 
                </div>

                <div className="hidden md:flex gap-10 items-center text-sm font-medium">
                    <Link href="#" className="hover:text-[#EB3B18] transition-colors">Home</Link>
                    <Link href="#" className="hover:text-[#EB3B18] transition-colors">Items</Link>
                    <Link href="#" className="hover:text-[#EB3B18] transition-colors">About</Link>
                    <Link href="#" className="hover:text-[#EB3B18] transition-colors">Blog</Link>
                </div>
                
                                
                {
                    isAuth ? (
                        <div className="hidden md:flex gap-3">
                            <Link 
                                href="/" 
                                className="px-5 py-2 bg-[#EB3B18] rounded-md font-bold hover:bg-[#bf360c] transition-colors shadow-sm" 
                            >
                                Dashboard
                            </Link>
                        </div>
                ):(<div className="hidden md:flex gap-3">
                    <Link 
                        href="/auth/login" 
                        className="px-4 py-2 hover:text-gray-200 transition-colors"
                    >
                        Log In
                    </Link>
                    <Link 
                        href="/auth/signup" 
                        className="px-5 py-2 bg-[#EB3B18] rounded-md font-bold hover:bg-[#bf360c] transition-colors shadow-sm"
                    >
                        Sign Up
                    </Link>
                </div>

                )      
                }
                
            </div>
        </nav>
    );
};