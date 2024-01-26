import { AuditLog } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { generateLogMessage } from "@/lib/generateLogMessage";
import { format } from "date-fns";

interface ActivityItemProps {
    data: AuditLog;
}

const ActivityItem = ({ data }: ActivityItemProps) => {
    return (
        <li className="flex items-center gap-x-2">
            <Avatar className="h-8 w-8">
                <AvatarImage src={data.userImage}/>
            </Avatar>
            <div className=" flex flex-col space-y-0.5">
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold lowercase text-neutral-700">
                       {data?.userName || data?.userSurname ? `${data.userName} ${data.userSurname} ` : `${data?.userNick} `}
                    </span>
                    {generateLogMessage(data)}
                </p>

                <p className="text-xs text-muted-foreground">
                   {format(new Date(data.createdAt), "d.MM.yyyy 'at' H:mm a")} 
                </p>
            </div>
        </li>
    );
};
export default ActivityItem;
