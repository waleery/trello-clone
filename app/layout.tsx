import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "../config/site";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        //default title on the root page
        default: siteConfig.name,

        //title on other pages, example "My organization | Achiveo"
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: [{ url: "/logo.svg", href: "/logo.svg" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>{children}</body>
            </html>
        </ClerkProvider>
    );
}
