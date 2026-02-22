"use client";

import AuthLayout from "@/components/layouts/AuthLayout";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Lock, Mail, Loader2 } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import GoogleButton from "../components/googleauthbtn";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  


const AppleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74s2.57-.9 4.31-.68c.72.03 2.75.29 4.03 2.15-3.6 1.83-2.98 5.67.63 7.15-.65 1.63-1.55 3.25-4.05 3.61zm-1.85-15.1c.7-1.12 1.35-2.27.76-3.95-1.8.19-3.48 1.4-3.95 2.76-.56 1.44.13 2.92 1.83 2.77.16 0 1.25-.97 1.36-1.58z" />
    </svg>
);

  const LoginIllustration = (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back!</h2>
      <div className="grid grid-cols-2 gap-4 h-100">
        <div className="bg-gray-200 rounded-lg bg-[url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80')] bg-cover bg-center h-full row-span-2" />
        <div className="bg-gray-200 rounded-lg bg-[url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80')] bg-cover bg-center h-48" />
        <div className="bg-gray-200 rounded-lg bg-[url('https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=80')] bg-cover bg-center h-full" />
      </div>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setSuccess("")

    if (!emailOrPhone.trim() || !password) {
      setError("Email/Phone and password are required.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOrPhone.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.message ?? "Login failed. Please try again.");
        return;
      }
      setSuccess("Login Successful, redirecting to homepage")
      window.location.href = "/";
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="" illustration={LoginIllustration} mobileTopRight={<Logo />}>
      <div className="w-full max-w-md mx-auto pb-32 md:pb-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">
          Login
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Email address / Phone Number"
            placeholder="Enter Email address/Phone Number"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            icon={<Mail className="w-4 h-4" />}
          />

          <Input
            label="Password"
            type="password"
            isPassword
            icon={<Lock className="w-4 h-4" />}
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="w-full flex justify-end">
            <Link
              href="/forgot-password"
              className="text-[#D84315] text-sm font-semibold hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}    </div>
          )}

          {success && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{success}    </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#D84315] py-3 font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
          <p className="mt-5 mb-10 text-center text-gray-600 text-sm">Or Signin Using</p>

          <div className="flex mx-auto items-center justify-center space-x-5">
          <GoogleButton/>
          <AppleIcon />
            </div>


          <div className="text-center mt-8 text-sm text-gray-600">
            New to Swapyard?{" "}
            <Link href="/auth/signup" className="text-[#D84315] font-bold hover:underline">
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
