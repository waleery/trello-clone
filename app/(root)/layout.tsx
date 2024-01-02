import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
    return <ClerkProvider>{children}</ClerkProvider>;
};
export default RootLayout;
