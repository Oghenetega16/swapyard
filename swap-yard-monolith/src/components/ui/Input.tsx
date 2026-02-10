import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
    isPassword?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, icon, isPassword, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const inputType = isPassword ? (showPassword ? "text" : "password") : props.type;

        return (
            <div className="space-y-1.5 w-full">
                {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
                <div className="relative group">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#EB3B18]">
                            {icon}
                        </div>
                    )}
                    <input
                        type={inputType}
                        className={cn(
                            "flex w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EB3B18] focus:border-transparent transition-all disabled:cursor-not-allowed disabled:opacity-50",
                            icon ? "pl-10" : "",
                            isPassword ? "pr-10" : "",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    )}
                </div>
            </div>
        );
    }
);
Input.displayName = "Input";