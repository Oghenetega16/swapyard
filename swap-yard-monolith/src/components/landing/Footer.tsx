import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { FaTelegramPlane, FaWhatsapp} from "react-icons/fa";
import Logo from "@/components/ui/Logo";

export const Footer = () => {
    return (
        <footer className="bg-[#012E4C] text-white pt-16 pb-12" aria-label="Footer">
            <div className="container mx-auto px-4">
                
                {/* Top Section: Logo */}
                <div className="mb-12">
                    <Logo />
                </div>

                {/* Main Grid: 5 Columns */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
                    
                    {/* Column 1: Browse */}
                    <div className="flex flex-col space-y-4 text-sm text-gray-300 pt-1">
                        <Link href="#" className="hover:text-white transition-colors">Browse Listings</Link>
                        <Link href="#" className="hover:text-white transition-colors">Sell an item</Link>
                        <Link href="#" className="hover:text-white transition-colors">Popular Categories</Link>
                    </div>

                    {/* Column 2: Company */}
                    <div>
                        <h4 className="font-bold mb-6 text-white">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Our Services</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Help */}
                    <div>
                        <h4 className="font-bold mb-6 text-white">Help</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Legal */}
                    <div>
                        <h4 className="font-bold mb-6 text-white">Legal</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li><Link href="#" className="hover:text-white transition-colors">Terms of Use</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Make a Report</Link></li>
                        </ul>
                    </div>

                    {/* Column 5: Contact & Socials */}
                    <div>
                        <h4 className="font-bold mb-6 text-white">Contact Us</h4>
                        <div className="space-y-4 text-sm text-gray-300 mb-8">
                            <p>E. Hello@swapyard.com</p>
                            <p>P. (+234) 82334670000</p>
                        </div>
                        
                        {/* Social Icons */}
                        <div className="flex gap-3">
                            <Link 
                                href="#" 
                                className="h-10 w-10 bg-white rounded-full cursor-pointer flex items-center justify-center text-[#012E4C] hover:bg-gray-200 transition-colors" 
                                aria-label="Facebook"
                            >
                                <Facebook size={20} className="fill-current stroke-none" />
                            </Link>
                            <Link 
                                href="#" 
                                className="h-10 w-10 bg-white rounded-full cursor-pointer flex items-center justify-center text-[#012E4C] hover:bg-gray-200 transition-colors" 
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </Link>
                            <Link 
                                href="#" 
                                className="h-10 w-10 bg-white rounded-full cursor-pointer flex items-center justify-center text-[#012E4C] hover:bg-gray-200 transition-colors" 
                                aria-label="Telegram"
                            >
                                <FaTelegramPlane size={20} />
                            </Link>
                            <Link 
                                href="#" 
                                className="h-10 w-10 bg-white rounded-full cursor-pointer flex items-center justify-center text-[#012E4C] hover:bg-gray-200 transition-colors" 
                                aria-label="WhatsApp"
                            >
                                <FaWhatsapp size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};