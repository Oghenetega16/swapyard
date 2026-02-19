"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Logo() {
    const pathname = usePathname();

    const authPages = ["/login", "/signup", "/verify", "/forgot-password"];
    const isAuthPage = authPages.includes(pathname);

    return (
        <Link href="/" className="flex items-center gap-2">
            <div className="w-7.5 h-7.5 relative"> 
                <Image 
                    src={!isAuthPage ? "/assets/icons/swapyard-logo.svg" : "/assets/icons/swapyard-logo-black.svg"} 
                    alt="SwapYard Logo" 
                    width={52} 
                    height={52}
                    className="object-contain"
                    priority 
                />
            </div>
            <span 
                className={`font-bold text-lg md:text-2xl leading-[33.97px] transition-colors duration-300 ${
                    !isAuthPage ? "text-white" : "text-black"
                }`}
            >
                SwapYard
            </span>
        </Link>
    );
}