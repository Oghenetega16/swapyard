import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { FaTelegramPlane, FaWhatsapp} from "react-icons/fa";
import Logo from "@/components/ui/Logo";

export const Footer = () => {
    return (
        <footer className="bg-[#012E4C] text-white pt-12 md:pt-16 pb-8 md:pb-12" aria-label="Footer">
            <div className="container mx-auto px-6 md:px-10 lg:px-12 xl:px-4 max-w-7xl">
                
                {/* Top Section: Logo */}
                <div className="mb-10 md:mb-12">
                    <Logo />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-10 mb-12 md:mb-16">
                    
                    {/* Column 1: Browse */}
                    <div className="flex flex-col space-y-4 text-sm text-gray-300 pt-1 lg:col-span-1">
                        <Link href="#" className="hover:text-white transition-colors">Browse Listings</Link>
                        <Link href="#" className="hover:text-white transition-colors">Sell an item</Link>
                        <Link href="#" className="hover:text-white transition-colors">Popular Categories</Link>
                    </div>

                    {/* Column 2: Company */}
                    <div className="lg:col-span-1">
                        <h4 className="font-bold mb-4 md:mb-6 text-white text-base md:text-lg">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Our Services</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Help */}
                    <div className="lg:col-span-1">
                        <h4 className="font-bold mb-4 md:mb-6 text-white text-base md:text-lg">Help</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Legal */}
                    <div className="lg:col-span-1">
                        <h4 className="font-bold mb-4 md:mb-6 text-white text-base md:text-lg">Legal</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li><Link href="#" className="hover:text-white transition-colors">Terms of Use</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Make a Report</Link></li>
                        </ul>
                    </div>

                    {/* Column 5: Contact & Socials */}
                    <div className="col-span-2 lg:col-span-2 mt-4 md:mt-0">
                        <h4 className="font-bold mb-4 md:mb-6 text-white text-base md:text-lg">Contact Us</h4>
                        <div className="space-y-3 text-sm text-gray-300 mb-6 md:mb-8">
                            <p className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                                <span className="text-white">Email:</span> 
                                <a href="mailto:Hello@swapyard.com" className="hover:text-white transition-colors">Hello@swapyard.com</a>
                            </p>
                            <p className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                                <span className="text-white">Phone:</span> 
                                <a href="tel:+23482334670000" className="hover:text-white transition-colors">(+234) 82334670000</a>
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap lg:flex-nowrap gap-3 md:gap-4">
                            <Link 
                                href="#" 
                                className="h-10 w-10 md:h-11 md:w-11 bg-white rounded-full cursor-pointer flex items-center justify-center text-[#012E4C] hover:bg-gray-200 hover:-translate-y-1 transition-all shrink-0" 
                                aria-label="Facebook"
                            >
                                <Facebook size={20} className="fill-current stroke-none" />
                            </Link>
                            <Link 
                                href="#" 
                                className="h-10 w-10 md:h-11 md:w-11 bg-white rounded-full cursor-pointer flex items-center justify-center text-[#012E4C] hover:bg-gray-200 hover:-translate-y-1 transition-all shrink-0" 
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </Link>
                            <Link 
                                href="#" 
                                className="h-10 w-10 md:h-11 md:w-11 bg-white rounded-full cursor-pointer flex items-center justify-center text-[#012E4C] hover:bg-gray-200 hover:-translate-y-1 transition-all shrink-0" 
                                aria-label="Telegram"
                            >
                                <FaTelegramPlane size={20} />
                            </Link>
                            <Link 
                                href="#" 
                                className="h-10 w-10 md:h-11 md:w-11 bg-white rounded-full cursor-pointer flex items-center justify-center text-[#012E4C] hover:bg-gray-200 hover:-translate-y-1 transition-all shrink-0" 
                                aria-label="WhatsApp"
                            >
                                <FaWhatsapp size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Copyright Divider */}
                <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} SwapYard. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};