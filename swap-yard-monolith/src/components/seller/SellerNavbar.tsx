"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MessageSquare, ShoppingBag, Bell, Menu } from "lucide-react";
import Logo from "@/components/ui/Logo";

interface SellerNavbarProps {
    onOpenSidebar?: () => void;
}

export const SellerNavbar = ({ onOpenSidebar }: SellerNavbarProps) => {
    const pathname = usePathname();

    const navLinks = [
        { name: "Dashboard", href: "/seller/overview" },
        { name: "Products", href: "/seller/products" },
        { name: "My Store", href: "/seller/store" },
        { name: "Help", href: "/seller/help" },
    ];

    return (
        <nav className="fixed w-full z-40 top-0 bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-20">
                
                {/* Left: Logo & Mobile Menu */}
                <div className="flex items-center gap-4">
                    <button className="md:hidden text-gray-900" onClick={onOpenSidebar} aria-label="Open mobile menu">
                        <Menu size={24} />
                    </button>
                    <Logo /> 
                </div>

                {/* Center: Navigation Links (Hidden on mobile) */}
                <div className="hidden lg:flex items-center gap-8 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || pathname?.startsWith(link.href);
                        return (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                className={`text-sm font-medium transition-colors ${
                                    isActive ? "text-[#002147] font-bold" : "text-gray-600 hover:text-[#002147]"
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Right: Icons and Avatar Toggle */}
                <div className="flex items-center gap-4 md:gap-6 text-gray-900">
                    
                    {/* Icons */}
                    <div className="hidden sm:flex items-center gap-5">
                        <Link href="/seller/messages" className="hover:text-[#EB3B18] transition-colors relative">
                            <MessageSquare size={22} />
                        </Link>
                        <Link href="/seller/orders" className="hover:text-[#EB3B18] transition-colors">
                            <ShoppingBag size={22} />
                        </Link>
                        <Link href="/seller/notifications" className="hover:text-[#EB3B18] transition-colors relative">
                            <Bell size={22} />
                        </Link>
                    </div>

                    <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

                    {/* Role Toggle Switch containing the Profile Picture */}
                    <button 
                        className="hidden md:flex items-center justify-between w-26 h-11 border border-gray-900 rounded-full px-1 bg-white cursor-pointer hover:bg-gray-50 transition-colors shrink-0"
                        title="Switch to Buyer mode"
                    >
                        <span className="text-xs font-bold text-[#002147] pl-2.5 tracking-wide">SELLER</span>
                        
                        {/* Profile Picture inside the toggle */}
                        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-gray-200">
                            <Image 
                                src="https://i.pravatar.cc/150?img=47" 
                                alt="Profile Avatar" 
                                width={36} 
                                height={36} 
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </button>
                    
                    {/* Mobile-only avatar (shows when the toggle is hidden on small screens) */}
                    <Link href="/seller/account" className="md:hidden shrink-0">
                        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-transparent hover:border-[#EB3B18] transition-colors bg-gray-100">
                            <Image 
                                src="https://i.pravatar.cc/150?img=47" 
                                alt="Profile Avatar" 
                                width={36} 
                                height={36} 
                                className="object-cover"
                            />
                        </div>
                    </Link>

                </div>

            </div>
        </nav>
    );
};