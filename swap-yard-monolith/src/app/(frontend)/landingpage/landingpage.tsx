"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layouts/Sidebar";
import { Navbar } from "@/components/layouts/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureIcons } from "@/components/layouts/FeatureIcons";
import { Categories } from "@/components/landing/Categories";
import { LatestListings } from "@/components/landing/LatestListings";
import { PromoSection } from "@/components/landing/PromoSection";
import { AppDownloadSection } from "@/components/landing/AppDownloadSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen font-sans text-gray-900 bg-[#F9FAFB]">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
            <HeroSection />
            <FeatureIcons />
            <Categories />
            <LatestListings />
            <PromoSection />
            <AppDownloadSection />
            <Testimonials />
            <FAQSection />
            <Footer />
        </div>
    );
}