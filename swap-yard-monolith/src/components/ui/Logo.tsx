"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Logo() {
    const pathname = usePathname();

    const authPages = ["/login", "/signup", "/verify", "/forgot-password"];
    
    const useBlackTheme = authPages.includes(pathname || "") || pathname?.startsWith("/seller");

    return (
        <Link href="/" className="flex items-center gap-2">
            <div className="w-7.5 h-7.5 relative"> 
                <Image 
                    src={useBlackTheme ? "/assets/icons/swapyard-logo-black.svg" : "/assets/icons/swapyard-logo.svg"} 
                    alt="SwapYard Logo" 
                    width={52} 
                    height={52}
                    className="object-contain"
                    priority 
                />
            </div>
            <span 
                className={`font-bold text-lg md:text-2xl leading-[33.97px] transition-colors duration-300 ${
                    useBlackTheme ? "text-black" : "text-white"
                }`}
            >
                SwapYard
            </span>
        </Link>
    );
}