import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";

// Initialize the Manrope font
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
            <body className={manrope.className} suppressHydrationWarning>
                <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
                {children}
                </GoogleOAuthProvider>
            </body>
        </html>
    );
}