import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "../config/site";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import ModalProvider from "@/components/providers/modalProvider";
import QueryProvider from "@/components/providers/queryProivider";

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
        <ClerkProvider clerkJSVersion={'4.70.2-snapshot.v86eb801'}>
            <html lang="en">
                <body className={inter.className}>
                    <QueryProvider>
                        {children}
                        <Toaster />
                        <ModalProvider />
                    </QueryProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
