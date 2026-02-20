"use client";
import { useState } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Logo from "@/components/ui/Logo"; 
import { Lock, Mail, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    
    // Step 1:
    const [step, setStep] = useState<"request" | "reset">("request");

    const [form, setForm] = useState({
        email: "",
        token: "",
        password: "",
    });

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleRequestToken = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: form.email }),
            });
            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Security code sent! Please check your email.");
                setStep("reset"); 
            } else {
                setErrorMessage(data.message || "Failed to send reset email.");
            }
        } catch (error) {
            setErrorMessage("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Step 2
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: form.token, password: form.password }),
            });
            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Password reset successfully! Redirecting...");
                setTimeout(() => router.push("/auth/login"), 2000);
            } else {
                setErrorMessage(data.message || "Invalid token or expired.");
            }
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const ForgotIllustration = (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Security First</h2>
            <div className="grid grid-cols-2 gap-4 h-100">
                <div className="bg-gray-200 rounded-lg bg-[url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80')] bg-cover bg-center h-full row-span-2"></div>
                <div className="bg-gray-200 rounded-lg bg-[url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80')] bg-cover bg-center h-48"></div>
                <div className="bg-gray-200 rounded-lg bg-[url('https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=80')] bg-cover bg-center h-full"></div>
            </div>
        </div>
    );

    return (
        <AuthLayout title="" illustration={ForgotIllustration} mobileTopRight={<Logo />}>
            <div className="w-full max-w-md mx-auto flex flex-col items-center pb-32 md:pb-0">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                    {step === "request" ? "Forgot Password?" : "Set New Password"}
                </h1>
                
                <div className="mb-6">
                    <div className="h-16 w-16 rounded-full border border-[#002147] flex items-center justify-center text-[#002147]">
                        {step === "request" ? <Mail className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                    </div>
                </div>

                <p className="text-center text-gray-600 mb-8 px-4">
                    {step === "request" 
                        ? "Enter your email to receive a secure reset token." 
                        : "Enter the code sent to your email and your new password."}
                </p>

                <form className="w-full space-y-6" onSubmit={step === "request" ? handleRequestToken : handleResetPassword}>
                    {step === "request" ? (
                        <Input 
                            label="Email address" 
                            placeholder="name@company.com" 
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    ) : (
                        <>
                            <Input 
                                label="Reset Token" 
                                placeholder="Paste token from email" 
                                type="text"
                                required
                                value={form.token}
                                onChange={(e) => handleChange("token", e.target.value)}
                            />
                            <Input 
                                label="New Password" 
                                placeholder="Min. 8 characters" 
                                type="password"
                                required
                                value={form.password}
                                onChange={(e) => handleChange("password", e.target.value)}
                            />
                        </>
                    )}

                    <Button 
                        type="submit"
                        variant="primary"
                        fullWidth 
                        disabled={isSubmitting}
                        className="font-bold py-3"
                    >
                        {isSubmitting ? "Processing..." : step === "request" ? "Send Reset Link" : "Update Password"}
                    </Button>

                    {errorMessage && (
                        <div className="p-3 rounded bg-red-50 border border-red-200 text-red-600 text-sm">
                            {errorMessage}
                        </div>
                    )}
                    
                    {successMessage && (
                        <div className="p-3 rounded bg-green-50 border border-green-200 text-green-600 text-sm flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            {successMessage}
                        </div>
                    )}
                </form>

                {step === "reset" && (
                    <button 
                        onClick={() => setStep("request")}
                        className="mt-6 text-sm text-[#002147] hover:underline"
                    >
                        Didn't get the email? Try again
                    </button>
                )}
            </div>
        </AuthLayout>
    );
}