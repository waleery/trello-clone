import ActivityItem from "@/components/activityItem";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ActivityList = async () => {
    const { orgId } = auth();

    if (!orgId) {
        redirect("/select-org");
    }

    const auditLogs = await db.auditLog.findMany({
        where: {
            orgId,
        },
    });

    return (
        <ol className="space-y-4 mt-4">
            {/* if last element then <p> is shown */}
            <p className="hidden last:block text-xs text-center text-muted-foreground">
                No activity found inside this organization
            </p>
            {auditLogs.map((auditLog) => (
                <ActivityItem key={auditLog.id} data={auditLog} />
            ))}
        </ol>
    );
};
export default ActivityList;
