import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "../ui/Logo";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    illustration?: React.ReactNode; 
    mobileTopRight?: React.ReactNode;
    sidebarFooterText?: string; // <--- NEW PROP
}

export default function AuthLayout({ 
    children, 
    title, 
    illustration, 
    mobileTopRight,
    sidebarFooterText = "Login with your username and password to access your account." // Default text
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen w-full flex bg-white md:bg-[#F0F4F8]">
            {/* Desktop Left Side: Illustration */}
            <div className="hidden md:flex w-1/2 bg-[#F0F4F8] flex-col justify-center items-center p-12 relative">
                <div className="absolute top-8 left-8 flex items-center gap-2">
                    <Logo />
                </div>
                
                <div className="w-full max-w-lg">
                    {illustration}
                </div>
                
                {/* Dynamic Sidebar Footer Text */}
                <div className="absolute bottom-8 left-8 text-sm text-gray-500 max-w-md leading-relaxed">
                    {sidebarFooterText}
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full md:w-1/2 flex flex-col bg-white h-screen overflow-y-auto">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between p-4">
                    <Link href="/" className="p-2">
                        <ArrowLeft className="w-6 h-6 cursor-pointer" />
                    </Link>
                    {mobileTopRight && <div>{mobileTopRight}</div>}
                </div>

                <div className="flex-1 flex flex-col justify-center px-6 py-8 md:px-24">
                    {title && (
                        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">
                            {title}
                        </h1>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
}