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
            className="relative min-h-dvh md:min-h-162.5 flex items-center justify-center bg-[url('/assets/images/landing/landing-image.png')] bg-cover bg-center py-24"
            aria-label="Hero Section"
        >
            <div className="absolute inset-0 bg-black/60"></div>
            
            <div className="relative z-10 w-full max-w-4xl px-4 text-center flex flex-col items-center mt-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                    Buy and Sell Furniture & Household Items <span className="text-[#EB3B18]">Locally</span>
                </h1>
                <p className="text-gray-200 text-sm md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                    A marketplace for secondhand furniture, decor, appliances, and more. We make local buying safe and easy. No noise. No spam. Just good deals from people nearby.
                </p>

                <div 
                    className="bg-white p-2 rounded-xl shadow-2xl flex flex-col md:flex-row gap-2 w-full max-w-3xl mx-auto mb-10"
                    role="search"
                >
                    <div className="flex-1 flex items-center px-4 py-3 md:py-2 border-b md:border-b-0 md:border-r border-gray-100 text-left">
                        <Search className="text-gray-400 w-5 h-5 mr-3 shrink-0" aria-hidden="true" />
                        <input 
                            type="text" 
                            placeholder="What are you looking for?" 
                            className="w-full outline-none text-gray-700 placeholder:text-gray-400 text-sm md:text-base bg-transparent" 
                            aria-label="Search items"
                        />
                    </div>

                    <div className="flex items-center px-4 py-3 md:py-2 border-b md:border-b-0 md:border-r border-gray-100 w-full md:w-50">
                        <MapPin className="text-gray-400 w-5 h-5 mr-3 shrink-0" aria-hidden="true" />
                        <select 
                            className="bg-transparent outline-none text-gray-700 w-full cursor-pointer text-sm md:text-base"
                            aria-label="Select location"
                        >
                            <option value="" disabled hidden>Location</option>
                            {NIGERIAN_STATES.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center px-4 py-3 md:py-2 w-full md:w-40">
                        <select 
                            className="bg-transparent outline-none text-gray-700 w-full cursor-pointer text-sm md:text-base"
                            aria-label="Select category"
                        >
                            <option value="" disabled hidden>Type</option>
                            <option value="furniture">Furniture</option>
                            <option value="electronics">Electronics</option>
                        </select>
                    </div>
                    
                    <button 
                        className="bg-[#EB3B18] p-4 md:p-3 rounded-lg text-white md:w-auto w-full flex justify-center hover:bg-[#bf360c] transition-colors cursor-pointer shrink-0 mt-2 md:mt-0 shadow-md"
                        aria-label="Submit search"
                    >
                        <Search aria-hidden="true" />
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                    <Button className="bg-[#EB3B18] px-8 py-3.5 text-base w-full sm:w-auto">Start Selling</Button>
                    <Button variant="outline" className="bg-transparent border-white text-white px-8 py-3.5 text-base hover:bg-white/20 w-full sm:w-auto">Browse Listings</Button>
                </div>
            </div>
        </section>
    );
};