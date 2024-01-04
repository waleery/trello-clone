"use client";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const OrganizationControl = () => {
    const params = useParams();
    const { setActive } = useOrganizationList();
    const { organization: activeOrganization } = useOrganization();

    useEffect(() => {
        if (!setActive) return;

        if (activeOrganization && params.organizationId !== activeOrganization?.id) {
            setActive({
                organization: params.organizationId as string,
            });
        }
        
    }, [setActive, params.organizationId, activeOrganization]);
    return null;
};
export default OrganizationControl;
