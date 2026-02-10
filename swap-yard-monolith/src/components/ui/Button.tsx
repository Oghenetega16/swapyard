import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost" | "google" | "apple";
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
    className, variant = "primary", fullWidth, children, ...props 
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none ring-offset-background transition-all active:scale-95";
    
    const variants = {
        primary: "bg-[#EB3B18] text-white hover:bg-[#bf360c] py-3 px-6 cursor-pointer",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700 py-3 px-6 cursor-pointer",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700 py-2 px-4 cursor-pointer",
        google: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 py-3 px-4 flex gap-2 items-center justify-center cursor-pointer",
        apple: "bg-black text-white hover:bg-gray-800 py-3 px-4 flex gap-2 items-center justify-center cursor-pointer",
    };

    return (
        <button className={cn(baseStyles, variants[variant], fullWidth ? "w-full" : "", className)} {...props}>
            {children}
        </button>
    );
};