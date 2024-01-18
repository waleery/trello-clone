import { ReactNode } from "react";
import OrganizationControl from "./_components/organizationControl";

const OrganizationIdLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            {/* <OrganizationControl /> */}
            {children}
        </>
    );
};
export default OrganizationIdLayout;
