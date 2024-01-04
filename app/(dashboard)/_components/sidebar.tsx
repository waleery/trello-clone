"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import {NavItem, Organization} from "./nav-item";

interface SidebarProps {
    storageKey?: string;
}

const Sidebar = ({ storageKey = "achiveo-sidebar-project" } : SidebarProps) => {
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

    // { "123": true, "456": false, "789": true} => ["123", "789"]
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
    console.log("-------");
    console.log(isLoadedOrganization);
    console.log(activeOrganization);
    console.log(isLoadedOrganizationList);
    console.log(userMemberships);

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

    return (
        <>
            <div className="font-medium text-xs flex items-center mb-1">
                <span className="pl-4">Workspaces</span>
                <Button
                    asChild
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="ml-auto"
                >
                    <Link href="/select-org">
                        <Plus className="h-4 w-4 " />
                    </Link>
                </Button>
            </div>
            <Accordion
                type="multiple"
                defaultValue={defaultAccordionValue}
                className="space-y-2"
            >
                {userMemberships.data.map(({ organization }) => (
                    <NavItem
                        key={organization.id}
                        isActive={activeOrganization?.id === organization.id}
                        isExpanded={expanded[organization.id]}
                        organization={organization as Organization}
                        onExpand={onExpand}
                    />
                ))}
            </Accordion>
        </>
    );
};

export default Sidebar;
