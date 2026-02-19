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
    const [contract, setContract] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        state: "Lagos",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstname: form.firstname,
                    lastname: form.lastname,
                    email: form.email,
                    password: form.password,
                    phoneNumber: form.phoneNumber,
                    state: form.state,
                    role: role.toUpperCase(),
                    contract: contract, 
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Something went wrong");
                return;
            }

            
            window.location.href = "/auth/login";

        } catch {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    };

    const footerText =
        "Sign up to easily buy and sell pre-loved furniture and household items. Whether you're clearing out space or hunting for great deals, our platform makes it simple, safe, and trusted.";

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
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <Input
                            label="First name"
                            placeholder="Enter your first name"
                            value={form.firstname}
                            onChange={(e) => handleChange("firstname", e.target.value)}
                        />
                        <Input
                            label="Last name"
                            placeholder="Enter your last name"
                            value={form.lastname}
                            onChange={(e) => handleChange("lastname", e.target.value)}
                        />
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Choose your starting mode
                        </label>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    checked={role === "buyer"}
                                    onChange={() => setRole("buyer")}
                                    className="accent-[#EB3B18] w-4 h-4"
                                />
                                <span className="text-sm text-gray-700">Buyer</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    checked={role === "seller"}
                                    onChange={() => setRole("seller")}
                                    className="accent-[#EB3B18] w-4 h-4"
                                />
                                <span className="text-sm text-gray-700">Seller</span>
                            </label>
                        </div>
                    </div>

                    {/* State */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            State
                        </label>
                        <select
                            value={form.state}
                            onChange={(e) => handleChange("state", e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm"
                        >
                            <option>Lagos</option>
                            <option>Abuja</option>
                            <option>Rivers</option>
                        </select>
                    </div>

                    <Input
                        label="Email"
                        placeholder="Enter your email address"
                        icon={<Mail className="w-4 h-4" />}
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />

                    <Input
                        label="Phone number"
                        placeholder="Phone number"
                        value={form.phoneNumber}
                        onChange={(e) => handleChange("phoneNumber", e.target.value)}
                    />

                    <Input
                        label="Password"
                        isPassword
                        icon={<Lock className="w-4 h-4" />}
                        placeholder="Set your login password"
                        value={form.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                    />

                    <Input
                        label="Confirm password"
                        isPassword
                        icon={<Lock className="w-4 h-4" />}
                        placeholder="Enter your login password again"
                        value={form.confirmPassword}
                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    />

                    {/* Contract (optional) */}
                    <div className="flex items-start gap-2 pt-2">
                        <input
                            type="checkbox"
                            checked={contract}
                            onChange={(e) => setContract(e.target.checked)}
                            className="mt-1 w-4 h-4 accent-[#EB3B18]"
                        />
                        <span className="text-xs text-gray-600">
                            I agree to the Terms of use and privacy policy of SwapYard.
                        </span>
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}

                    <Button
                        fullWidth
                        variant="primary"
                        className="mt-6 font-bold"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}
