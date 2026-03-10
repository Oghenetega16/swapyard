"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, Bell, User } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

interface NavbarProps {
    onOpenSidebar: () => void;
}

interface UserData {
    image?: string; 
    firstname?: string;
    lastname?: string;
    email?: string;
}

export const Navbar = ({ onOpenSidebar }: NavbarProps) => {
    const pathname = usePathname();
    const isLandingPage = pathname === "/";
    const [isScrolled, setIsScrolled] = useState(false);

    const [user, setUser] = useState<UserData | null>(null);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/auth/me", { method: "GET" });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            } finally {
                setAuthChecked(true);
            }
        };

        checkAuth();
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navBackgroundClass =
        isLandingPage && !isScrolled
        ? "bg-transparent/10 backdrop-blur-sm py-6 transition-all duration-300"
        : "bg-[#012E4C] shadow-md py-4 transition-all duration-300";

    const isAuth = user !== null;

    // --- LOGIC TO HIDE NAVBAR ON SPECIFIC PAGES ---
    const hiddenRoutes = ["/auth/login", "/auth/signup", "/auth/verify", "/seller/verify"];

    const shouldHideNavbar = hiddenRoutes.some(route => pathname?.startsWith(route));

    if (shouldHideNavbar) {
        return null;
    }

    return (
        <nav
            className={`fixed w-full z-30 top-0 text-white transition-all duration-300 ${navBackgroundClass}`}
            aria-label="Main Navigation"
        >
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                <div className="w-full md:w-auto flex items-center justify-between gap-4">
                    <button className="md:hidden" onClick={onOpenSidebar} aria-label="Open main menu">
                        <Menu className="text-white w-8 h-8" />
                    </button>
                    <Logo />
                </div>

                <div className="hidden md:flex gap-10 items-center text-sm font-medium">
                    <Link href="/" className="hover:text-[#EB3B18] transition-colors">Home</Link>
                    <Link href="/listings" className="hover:text-[#EB3B18] transition-colors">Items</Link>
                    <Link href="#" className="hover:text-[#EB3B18] transition-colors">About</Link>
                    <Link href="#" className="hover:text-[#EB3B18] transition-colors">Blog</Link>
                </div>

                {!authChecked ? (
                    <div className="hidden md:flex gap-3 opacity-70">
                        <span className="px-4 py-2">…</span>
                    </div>
                ) : isAuth ? (
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/notifications" aria-label="Notifications" className="hover:text-[#EB3B18] transition-colors relative">
                            <Bell size={22} />
                        </Link>
                        
                        <Link href="/cart" aria-label="Cart" className="hover:text-[#EB3B18] transition-colors">
                            <ShoppingCart size={22} />
                        </Link>

                        <Link href="/profile" aria-label="User Profile">
                            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-transparent hover:border-[#EB3B18] transition-all bg-white/20 flex items-center justify-center shadow-inner">
                                {user.image ? (
                                    <img 
                                        src={user.image} 
                                        alt="Profile Avatar" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User size={18} className="text-white" />
                                )}
                            </div>
                        </Link>
                    </div>
                ) : (
                    <div className="hidden md:flex gap-3">
                        <Link href="/auth/login" className="px-4 py-2 hover:text-gray-200 transition-colors">
                            Log In
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="px-5 py-2 bg-[#EB3B18] rounded-md font-bold hover:bg-[#bf360c] transition-colors shadow-sm"
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};