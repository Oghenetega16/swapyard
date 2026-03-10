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
    return (
        <div className="font-sans text-gray-900">
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