"use client";

import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { Mail } from "lucide-react";
import Image from "next/image"; // 1. Import Next.js Image
import React, { useRef } from "react";

export default function VerificationPage() {
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
        const target = e.target as HTMLInputElement;
        if (target.value.length >= 1 && index < 3) {
        inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
        inputs.current[index - 1]?.focus();
        }
    };

    const footerText = "Sign up to easily buy and sell pre-loved furniture and household items. Whether you're clearing out space or hunting for great deals, our platform makes it simple, safe, and trusted.";

    const VerifyIllustration = (
        <div className="w-full h-125 rounded-2xl overflow-hidden shadow-xl relative">
            <Image 
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80" 
                alt="Verification Security" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
            />
            <div className="absolute inset-0 bg-black/10"></div>
        </div>
    );

    return (
        <AuthLayout 
            title="" 
            illustration={VerifyIllustration}
            mobileTopRight={<Logo />}
            sidebarFooterText={footerText}
        >
            <div className="w-full max-w-md mx-auto flex flex-col items-center pb-32 md:pb-0">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Verification</h1>
                    
                    <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center border-2 border-[#002147]">
                        <Mail className="w-8 h-8 text-[#002147]" />
                    </div>
                </div>

                <h2 className="text-center font-bold text-lg mb-2">We&apos;ve emailed you a code</h2>
                <p className="text-center text-gray-600 text-sm mb-8">
                    To continue, enter the code sent to <br/>
                    <span className="font-semibold text-gray-900">MuyiwaTola2025@gmail.com</span>
                </p>

                <div className="flex gap-4 mb-8">
                    {[0, 1, 2, 3].map((i) => (
                        <input
                            key={i}
                            ref={(el) => { inputs.current[i] = el; }} 
                            type="text"
                            maxLength={1}
                            className="w-14 h-14 rounded-lg border border-gray-400 text-center text-2xl font-bold focus:border-[#002147] focus:ring-1 focus:ring-[#002147] outline-none transition-all"
                            onInput={(e) => handleInput(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            aria-label={`Digit ${i + 1}`}
                        />
                    ))}
                </div>

                <Button 
                    disabled 
                    className="w-full bg-gray-300 text-white hover:bg-gray-400 mb-6 cursor-not-allowed font-bold"
                    aria-label="Verify Code"
                >
                    Verify Code
                </Button>

                <div className="text-center text-sm font-bold text-gray-700">
                    Didn&apos;t receive code?
                </div>
                <button className="text-[#D84315] font-bold text-sm mt-2 cursor-pointer underline decoration-2 underline-offset-4">
                    Resend Code
                </button>

                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#F0F4F8] px-6 py-6 text-center z-10 border-t border-gray-100">
                    <p className="text-xs text-gray-600 leading-relaxed">
                        {footerText}
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}