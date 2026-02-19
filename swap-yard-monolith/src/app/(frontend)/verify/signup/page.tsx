"use client";

import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";
import { Lock, Mail } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function SignupPage() {
    const [role, setRole] = useState("buyer");

    const footerText = "Sign up to easily buy and sell pre-loved furniture and household items. Whether you're clearing out space or hunting for great deals, our platform makes it simple, safe, and trusted.";

    const SignupIllustration = (
        <div className="relative w-full h-125 rounded-2xl overflow-hidden shadow-xl">
            <Image 
                src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80" 
                alt="Welcome to SwapYard" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
            />
        </div>
    );

    return (
        <AuthLayout 
            title="Create Account" 
            illustration={SignupIllustration}
            mobileTopRight={<Logo />}
            sidebarFooterText={footerText} 
        >
            <div className="w-full max-w-md mx-auto pb-8 md:pb-0">
                <form className="space-y-4">
                    <div className="space-y-4">
                        <Input label="First name" placeholder="Enter your first name" />
                        <Input label="Last name" placeholder="Enter your last name" />
                    </div>

                    {/* Radio Group */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Choose your starting mode</label>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="role" checked={role === 'buyer'} onChange={() => setRole('buyer')} className="accent-[#EB3B18] w-4 h-4" />
                                <span className="text-sm text-gray-700">Buyer</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="role" checked={role === 'seller'} onChange={() => setRole('seller')} className="accent-[#EB3B18] w-4 h-4" />
                                <span className="text-sm text-gray-700">Seller</span>
                            </label>
                        </div>
                    </div>

                    {/* State Select */}
                    <div className="space-y-1.5">
                        <label htmlFor="states" className="text-sm font-medium text-gray-700">State</label>
                        <div className="relative">
                            <select id="states" className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EB3B18]">
                                <option>Lagos</option>
                                <option>Abuja</option>
                                <option>Rivers</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>

                    <Input label="Email" placeholder="Enter your email address" icon={<Mail className="w-4 h-4"/>} />

                    {/* Phone Input Group */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-1">
                            <label htmlFor="telephone" className="text-sm font-medium text-gray-700 block mb-[2.5px]">Tel</label>
                            <div className="relative">
                                <select id="telephone" className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-2 text-sm">
                                    <option>+234</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <Input label="Phone number" placeholder="Phone number" />
                        </div>
                    </div>

                    <Input label="Password" isPassword icon={<Lock className="w-4 h-4"/>} placeholder="Set your login password" />
                    <Input label="Confirm password" isPassword icon={<Lock className="w-4 h-4"/>} placeholder="Enter your login password again" />

                    <div className="flex items-start gap-2 pt-2">
                        <input aria-label="Terms and policy agree checkbox" type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-[#EB3B18] focus:ring-[#EB3B18] accent-[#EB3B18]" />
                        <span className="text-xs text-gray-600 leading-tight">
                            I agree to the Terms of use and privacy policy of SwapYard.<br/>
                            <span className="text-gray-400">I also agree to receive more information about it&apos;s products and services</span>
                        </span>
                    </div>

                    <Button 
                        fullWidth 
                        variant="primary" 
                        className="mt-6 font-bold"
                    >
                        Create Account
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}