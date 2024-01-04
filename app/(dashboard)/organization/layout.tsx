import { ReactNode } from "react";
import Sidebar from "../_components/sidebar";

const OrganizationLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
            <div className="flex gap-x-7 border border-red-500">
                <div className="w-64 shrink-0 hidden md:block border border-green-500">
                    <Sidebar />
                </div>
                {children}
            </div>
        </main>
    );
};
export default OrganizationLayout;
