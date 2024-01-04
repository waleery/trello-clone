"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";

interface SidebarProps {
    storageKey?: string;
}

const Sidebar = ({ storageKey = "achiveo-sidebar-project" }) => {
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
        storageKey,
        {}
    );

    const { organization: activeOrganization, isLoaded: isLoadedOrganization } =
        useOrganization();

    const { userMemberships, isLoaded: isLoadedOrganizationList } =
        useOrganizationList({
            userMemberships: {
                infinite: true,
            },
        });

    const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
        (acc: string[], key: string) => {
            if (expanded[key]) {
                acc.push(key);
            }
            return acc;
        },
        []
    );

    const onExpand = (id: string) => {
        setExpanded((current) => ({
            ...current,
            [id]: !expanded[id],
        }));
    };
    console.log("-------")
    console.log(isLoadedOrganization)
    console.log(activeOrganization)
    console.log(isLoadedOrganizationList)
    console.log(userMemberships)

    if (
        !isLoadedOrganization ||
        !isLoadedOrganizationList ||
        userMemberships.isLoading
    ) {
        return (
            <>
                <Skeleton />
            </>
        );
    }
    
    return <div>Sidebar </div>;
};

export default Sidebar;
