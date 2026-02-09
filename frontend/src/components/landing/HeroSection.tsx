import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

const NIGERIAN_STATES = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
    "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe",
    "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
    "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
    "Taraba", "Yobe", "Zamfara"
];

export const HeroSection = () => {
    return (
        <section
            className="relative h-150 md:h-175 flex items-center justify-center bg-[url('/assets/images/landing/landing-image.png')] bg-cover bg-center"
            aria-label="Hero Section"
        >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 w-full max-w-4xl px-4 text-center mt-16">
                {/* Search Bar Container */}
                <div 
                    className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row gap-2 max-w-2xl mx-auto mb-12"
                    role="search"
                >
                    <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200 py-2">
                        <Search className="text-gray-400 w-5 h-5 mr-2" aria-hidden="true" />
                        <input 
                            type="text" 
                            placeholder="What are you looking for?" 
                            className="w-full outline-none text-gray-700 placeholder:text-gray-400" 
                            aria-label="Search items"
                        />
                    </div>

                    <div className="flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200 py-2 w-full md:w-1/4">
                        <MapPin className="text-gray-400 w-5 h-5 mr-2" aria-hidden="true" />
                        <select 
                            className="bg-transparent outline-none text-gray-700 w-full cursor-pointer"
                            aria-label="Select location"
                        >
                            <option value="">Location</option>
                            {/* Mapping all 36 States + FCT */}
                            {NIGERIAN_STATES.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center px-4 py-2 w-full md:w-1/4">
                        <select 
                            className="bg-transparent outline-none text-gray-700 w-full cursor-pointer"
                            aria-label="Select category"
                        >
                            <option value="">Type</option>
                            <option value="furniture">Furniture</option>
                            <option value="electronics">Electronics</option>
                        </select>
                    </div>
                    
                    <button 
                        className="bg-[#EB3B18] p-3 rounded-md text-white md:w-auto w-full flex justify-center hover:bg-[#bf360c] transition-colors cursor-pointer"
                        aria-label="Submit search"
                    >
                        <Search aria-hidden="true" />
                    </button>
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                    Buy and Sell Furniture & Household Items <span className="text-[#EB3B18]">Locally</span>
                </h1>
                <p className="text-gray-200 mb-8 max-w-xl mx-auto">
                    A marketplace for secondhand furniture, decor, appliances, and more. We make local buying safe and easy. No noise. No spam. Just good deals from people nearby.
                </p>

                <div className="flex gap-4 justify-center">
                    <Button className="bg-[#EB3B18] px-8 py-3 text-lg">Start Selling</Button>
                    <Button variant="outline" className="bg-transparent border-white text-white px-8 py-3 text-lg hover:bg-white/20">Browse Listings</Button>
                </div>
            </div>
        </section>
    );
};