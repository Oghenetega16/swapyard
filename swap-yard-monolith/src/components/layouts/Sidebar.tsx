"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { X, BedDouble, Utensils, Armchair, Baby, Image as ImageIcon, Briefcase, Settings, 
        HelpCircle, LogOut, LogIn, ShoppingCart, Bell, MessageSquare, ChevronRight, User } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

interface UserData {
    firstname?: string;
    lastname?: string;
    email?: string;
    image?: string;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const [user, setUser] = useState<UserData | null>(null);
    const router = useRouter(); 

    useEffect(() => {
        if (!isOpen) return;

        const fetchUser = async () => {
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
            }
        };
        fetchUser();
    }, [isOpen]);

    const handleLogout = async () => {
        setUser(null); 
        onClose(); 
        router.push("/auth/login"); 
    };

    const categories = [
        { name: "Furniture", icon: <Armchair size={20} /> },
        { name: "Kitchen & Dining", icon: <Utensils size={20} /> },
        { name: "Office", icon: <Briefcase size={20} /> },
        { name: "Bedroom", icon: <BedDouble size={20} /> },
        { name: "Decor", icon: <ImageIcon size={20} /> },
        { name: "Baby & Kids", icon: <Baby size={20} /> },
    ];

    const displayName = user 
        ? [user.firstname, user.lastname].filter(Boolean).join(" ") || "User"
        : "Welcome, Guest";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black z-40 cursor-pointer"
                    />
                    
                    {/* Sidebar Panel */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-[#F8F9FA] z-50 flex flex-col overflow-y-auto scrollbar-thin"
                    >
                        
                        {/* HEADER: User Profile */}
                        <div className="p-6 bg-[#002147] text-white flex flex-col shrink-0">
                            <div className="flex justify-end mb-2">
                                <button aria-label="Close menu" onClick={onClose} className="text-white/80 hover:text-white cursor-pointer">
                                    <X size={24} />
                                </button>
                            </div>
                            
                            <Link href={user ? "/profile" : "/auth/login"} onClick={onClose} className="flex items-center gap-4 group cursor-pointer">
                                <div className="h-14 w-14 rounded-full border-2 border-white/20 overflow-hidden bg-white/10 flex items-center justify-center shrink-0">
                                    {user?.image ? (
                                        <img src={user.image} alt={displayName} className="h-full w-full object-cover" />
                                    ) : (
                                        <User size={24} className="text-white" />
                                    )}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h2 className="font-bold text-lg leading-tight truncate group-hover:text-[#EB3B18] transition-colors capitalize">
                                        {displayName}
                                    </h2>
                                    <p className="text-xs text-white/70 truncate mt-0.5">
                                        {user?.email || "Sign in to access your account"}
                                    </p>
                                </div>
                                <ChevronRight size={20} className="text-white/50 group-hover:text-white transition-colors shrink-0" />
                            </Link>
                        </div>

                        <div className="flex-1 flex flex-col">
                            {/* QUICK ACCESS */}
                            <div className="p-6 pb-2">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Quick Access</h3>
                                <div className="space-y-4">
                                    
                                    {user && (
                                        <>
                                            <Link href="/notifications" onClick={onClose} className="flex items-center justify-between text-gray-700 hover:text-[#EB3B18] transition-colors cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <Bell size={20} />
                                                    <span className="font-medium">Notifications</span>
                                                </div>
                                            </Link>
                                            
                                            <Link href="/messages" onClick={onClose} className="flex items-center justify-between text-gray-700 hover:text-[#EB3B18] transition-colors cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <MessageSquare size={20} />
                                                    <span className="font-medium">Messages</span>
                                                </div>
                                            </Link>
                                        </>
                                    )}

                                    <Link href="/cart" onClick={onClose} className="flex items-center justify-between text-gray-700 hover:text-[#EB3B18] transition-colors cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <ShoppingCart size={20} />
                                            <span className="font-medium">My Cart</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="px-6 py-2 shrink-0">
                                <div className="border-b border-gray-200"></div>
                            </div>

                            {/* CATEGORIES */}
                            <div className="p-6 pt-2 pb-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Categories</h3>
                                    <Link href="/categories" onClick={onClose} className="text-[#EB3B18] font-bold text-xs hover:underline cursor-pointer">View All</Link>
                                </div>
                                <div className="space-y-5">
                                    {categories.map((cat) => (
                                        <Link key={cat.name} href={`/categories/${cat.name.toLowerCase()}`} onClick={onClose} className="flex items-center gap-4 text-gray-700 hover:text-[#EB3B18] transition-colors cursor-pointer">
                                            <span className="text-gray-400">{cat.icon}</span>
                                            <span className="font-medium">{cat.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM ACTIONS */}
                        <div className="bg-white border-t border-gray-200 p-6 space-y-5 shrink-0">
                            {user && (
                                <Link href="/settings" onClick={onClose} className="flex items-center gap-4 text-gray-700 hover:text-[#002147] transition-colors cursor-pointer">
                                    <Settings size={20} className="text-gray-400" />
                                    <span className="font-medium">Account Settings</span>
                                </Link>
                            )}

                            <Link href="/help" onClick={onClose} className="flex items-center gap-4 text-gray-700 hover:text-[#002147] transition-colors cursor-pointer">
                                <HelpCircle size={20} className="text-gray-400" />
                                <span className="font-medium">Help & Support</span>
                            </Link>
                            
                            {user ? (
                                <button onClick={handleLogout} className="flex items-center gap-4 text-red-500 hover:text-red-700 transition-colors w-full mt-2 cursor-pointer">
                                    <LogOut size={20} />
                                    <span className="font-medium">Log out</span>
                                </button>
                            ) : (
                                <Link href="/auth/login" onClick={onClose} className="flex items-center gap-4 text-[#002147] hover:text-[#EB3B18] transition-colors w-full mt-2 cursor-pointer">
                                    <LogIn size={20} />
                                    <span className="font-medium">Log in</span>
                                </Link>
                            )}
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};