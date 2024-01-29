import { ReactNode } from "react";
import Navbar from "./_components/navbar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="h-full bg-slate-50">
            <Navbar />
            {children}
        </div>
    );
};
export default DashboardLayout;
