import { Button } from "@/components/ui/Button";

export const PromoSection = () => {
    return (
        <section 
            className="relative h-100 flex items-center bg-[url('/assets/images/landing/cta-image.png')] bg-cover bg-fixed"
            aria-label="Call to Action"
        >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to get started?</h2>
                <p className="text-gray-200 mb-8 max-w-2xl mx-auto">Explore thousands of  products from trusted sellers near you
                    Browse unique secondhand furniture and home essentials.</p>
                <Button className="bg-[#EB3B18] px-8 py-3">Sign Up Now</Button>
            </div>
        </section>
    );
};