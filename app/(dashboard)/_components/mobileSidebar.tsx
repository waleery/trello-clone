"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useMobileSidebar } from "@/hooks/useMobileSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./sidebar";

const MobileSidebar = () => {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);
    const { onOpen, onClose, isOpen } = useMobileSidebar((state) => state);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    if (!isMounted) return null;

    return (
        <>
            <Button
                onClick={onOpen}
                className="block md:hidden mr-2"
                variant="ghost"
                size="sm"
            >
                <Menu className="h-4 w-4" />
            </Button>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent side="left" className="p-2 pt-10 overflow-y-scroll">
                    <Sidebar storageKey="t-sidebar-mobile-state"/>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default MobileSidebar;
