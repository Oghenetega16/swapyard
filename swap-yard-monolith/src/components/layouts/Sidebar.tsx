"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, BedDouble, Utensils, Armchair, Baby, Image as ImageIcon, Briefcase, Settings, HelpCircle, LogOut } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const categories = [
        { name: "Furniture", icon: <Armchair size={20} /> },
        { name: "Kitchen & Dining", icon: <Utensils size={20} /> },
        { name: "Office", icon: <Briefcase size={20} /> },
        { name: "Bedroom", icon: <BedDouble size={20} /> },
        { name: "Decor", icon: <ImageIcon size={20} /> },
        { name: "Baby & Kids", icon: <Baby size={20} /> },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black z-40"
                    />
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-[#F8F9FA] z-50 flex flex-col overflow-y-auto"
                    >
                    
                        {/* Header */}
                        <div className="p-6 flex items-center justify-between border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">SY</div>
                                <span className="font-bold text-xl">SwapYard</span>
                            </div>
                            <button aria-label="Close button" onClick={onClose}><X size={28} /></button>
                        </div>

                        {/* User Profile Snippet */}
                        <div className="p-6 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-green-700 overflow-hidden">
                                <img src="https://i.pravatar.cc/150?img=11" alt="User" />
                            </div>
                            <span className="font-bold text-gray-900">Welcome</span>
                        </div>

                        <div className="px-6 pb-2 border-b border-gray-200" />

                        {/* Categories */}
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">Categories</h3>
                                <Link href="#" className="text-[#D84315] font-bold text-sm underline">View All</Link>
                            </div>
                            <div className="space-y-6">
                                {categories.map((cat) => (
                                    <div key={cat.name} className="flex items-center gap-4 text-gray-600">
                                        {cat.icon}
                                        <span>{cat.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="px-6 py-2 border-t border-gray-200 mt-auto" />

                        {/* Bottom Actions */}
                        <div className="p-6 space-y-6">
                            <div className="flex items-center gap-4 text-gray-700">
                                <Settings size={20} />
                                <span>Account</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-700">
                                <HelpCircle size={20} />
                                <span>About & Help</span>
                            </div>
                            <div className="flex items-center gap-4 text-red-500 mt-8">
                                <LogOut size={20} />
                                <span>Log out</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};