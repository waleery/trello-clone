"use client";

import ActivityItem from "@/components/activityItem";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";

interface ActivityProps {
    items: AuditLog[];
}

const Activity = ({ items }: ActivityProps) => {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <ActivityIcon className="h-5 w-5 mt-0.5 text-neutral-700" />
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">Activity</p>
                <ol className="mt-2 space-y-4">
                    {items.map((item) => (
                        <ActivityItem key={item.id} data={item} />
                    ))}
                </ol>
            </div>
        </div>
    );
};
export default Activity;

Activity.Skeleton = function ActivitySkeleton() {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="bg-neutral-200 h-6 w-6" />
            <div className="w-full">
                <Skeleton className="bg-neutral-200 h-6 w-24 mb-2" />
                <Skeleton className="bg-neutral-200 h-10 w-full" />
            </div>
        </div>
    );
};
