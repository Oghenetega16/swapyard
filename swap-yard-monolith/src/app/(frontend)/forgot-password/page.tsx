"use client";
import { useState, useEffect } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Logo from "@/components/ui/Logo"; 
import { Lock } from "lucide-react";
import { s } from "framer-motion/client";
import { email } from "zod";
import { error } from "console";




export default function ForgotPasswordPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

        const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
         setErrorMessage("");
        setSuccessMessage("");
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/auth/resetpassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: form.email, password: form.password }),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccessMessage(data.message);
            } else {
                setErrorMessage(`Error: ${data.message}`);
            }

            window.location.href = "/auth/login";
        } catch (error) {
            setErrorMessage("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const ForgotIllustration = (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back!</h2>
            <div className="grid grid-cols-2 gap-4 h-100">
                <div 
                    className="bg-gray-200 rounded-lg bg-[url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80')] bg-cover bg-center h-full row-span-2"
                    role="img"
                    aria-label="Living room interior"
                ></div>
                <div 
                    className="bg-gray-200 rounded-lg bg-[url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80')] bg-cover bg-center h-48"
                    role="img"
                    aria-label="Stylish chair"
                ></div>
                <div 
                    className="bg-gray-200 rounded-lg bg-[url('https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=80')] bg-cover bg-center h-full"
                    role="img"
                    aria-label="Modern furniture set"
                ></div>
            </div>
        </div>
    );

    return (
        <AuthLayout 
            title="" 
            illustration={ForgotIllustration}
            mobileTopRight={<Logo />}
        >
            <div className="w-full max-w-md mx-auto flex flex-col items-center pb-32 md:pb-0">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Forgot Password?</h1>
                <div className="mb-6">
                    <div className="h-16 w-16 rounded-full border border-[#002147] flex items-center justify-center text-[#002147]">
                        <Lock className="w-6 h-6" aria-hidden="true" />
                    </div>
                </div>
                <p className="text-center text-gray-600 mb-8 px-4">Enter your email address or phone number to get a security code</p>

                <form className="w-full space-y-6" onSubmit={handleSubmit}>
                    <Input 
                        label="Email address" 
                        placeholder="Enter Email address/ Phone Number" 
                        type="text"
                        aria-label="Email or Phone Number"
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                    <Input 
                        label="New Password" 
                        placeholder="Enter New Password" 
                        type="password"
                        aria-label="New Password"
                        onChange={(e) => handleChange("password", e.target.value)}
                    />
                    <Button 
                        type="submit"
                        variant="primary"
                        fullWidth 
                        className="font-bold" 
                        aria-label="Reset Password"
                    >
                        {isSubmitting ? "Resetting..." : "Reset Password"}
                    </Button>
                    {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>   }
                    {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
                </form>

                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#F0F4F8] px-6 py-6 text-center z-10">
                    <p className="text-sm text-gray-800 leading-relaxed">Login with your username and password to access your account.</p>
                </div>
            </div>
        </AuthLayout>
    );
}