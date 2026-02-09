"use client";

import AuthLayout from "@/components/layouts/AuthLayout";
import { Input } from "@/components/ui/Input";
import { Lock } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

// Inline SVG components
const GoogleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.04-3.71 1.04-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const AppleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74s2.57-.9 4.31-.68c.72.03 2.75.29 4.03 2.15-3.6 1.83-2.98 5.67.63 7.15-.65 1.63-1.55 3.25-4.05 3.61zm-1.85-15.1c.7-1.12 1.35-2.27.76-3.95-1.8.19-3.48 1.4-3.95 2.76-.56 1.44.13 2.92 1.83 2.77.16 0 1.25-.97 1.36-1.58z" />
    </svg>
);

export default function LoginPage() {
    const LoginIllustration = (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back!</h2>
            <div className="grid grid-cols-2 gap-4 h-100">
                <div className="bg-gray-200 rounded-lg bg-[url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80')] bg-cover bg-center h-full row-span-2"></div>
                <div className="bg-gray-200 rounded-lg bg-[url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80')] bg-cover bg-center h-48"></div>
                <div className="bg-gray-200 rounded-lg bg-[url('https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=80')] bg-cover bg-center h-full"></div>
            </div>
        </div>
    );

    return (
        <AuthLayout
            title=""
            illustration={LoginIllustration}
            mobileTopRight={<Logo />}
        >
            <div className="w-full max-w-md mx-auto pb-32 md:pb-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">Login</h1>
                
                <form className="space-y-6">
                    <Input
                        label="Email address / Phone Number"
                        placeholder="Enter Email address/Phone Number"
                    />
                    <Input
                        label="Password"
                        type="password"
                        isPassword
                        icon={<Lock className="w-4 h-4" />}
                        placeholder="******"
                    />
                    <div className="w-full flex justify-end">
                        <Link
                            href="/forgot-password"
                            className="text-[#D84315] text-sm font-semibold hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-4 text-gray-500">Or Continue with</span>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            type="button"
                            className="p-3 rounded-full cursor-pointer shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
                            aria-label="Continue with Google"
                        >
                            <GoogleIcon />
                        </button>
                        
                        <button
                            type="button"
                            className="p-3 rounded-full cursor-pointer shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
                            aria-label="Continue with Apple"
                        >
                            <AppleIcon />
                        </button>
                    </div>

                    <div className="text-center mt-8 text-sm text-gray-600">
                        New to Swapyard?{" "}
                        <Link
                            href="/signup"
                            className="text-[#D84315] font-bold hover:underline"
                        >
                            Create account
                        </Link>
                    </div>
                </form>

                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#F0F4F8] px-6 py-6 text-center z-10">
                    <p className="text-sm text-gray-800 leading-relaxed">
                        Login with your username and password to access your account.
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}