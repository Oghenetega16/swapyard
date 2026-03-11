import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";
// Import your new wrapper here
import { ClientNavigation } from "@/components/layouts/ClientNavigation"; 

const manrope = Manrope({ 
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "SwapYard",
    description: "Buy and Sell Furniture & Household Items Locally",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${manrope.className} min-h-screen flex flex-col bg-[#F9FAFB]`} suppressHydrationWarning>
                <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
                    
                    <ClientNavigation />
                    
                    {/* Main content area */}
                    <main className="flex-1">
                        {children}
                    </main>

                </GoogleOAuthProvider>
            </body>
        </html>
    );
}