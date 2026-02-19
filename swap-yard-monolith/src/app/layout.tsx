import type { Metadata } from "next";
import { Manrope } from "next/font/google";
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
                {children}
            </body>
        </html>
    );
}