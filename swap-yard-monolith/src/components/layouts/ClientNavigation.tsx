"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layouts/Sidebar";
import { Navbar } from "@/components/layouts/Navbar";
import { SellerNavbar } from "@/components/seller/SellerNavbar"; 

export const ClientNavigation = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    // Check if we are in the seller hub
    const isSellerRoute = pathname?.startsWith("/seller");

    return (
        <>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            {/* Swap the navbars based on the route */}
            {isSellerRoute ? (
                <SellerNavbar onOpenSidebar={() => setSidebarOpen(true)} />
            ) : (
                <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
            )}
        </>
    );
};