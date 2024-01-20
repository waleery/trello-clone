import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ListContainer from "./_components/listContainer";

interface BoardIdPageProps {
    params: {
        boardId: string;
    };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
    const { orgId } = auth();

    if (!orgId) redirect("/select-org");

    const lists = await db.list.findMany({
        where: {
            boardId: params.boardId,
            board: {
                orgId: orgId,
            },
        },
        include: {
            cards: {
                orderBy: {
                    order: "asc",
                },
            },
        },
        orderBy: {
            order: "asc",
        },
    });
    return (
        <div className="p-4 h-full overflow-x-auto border-red-500 border">
            <ListContainer boardId={params.boardId} data={lists}/>
        </div>
    );
};
export default BoardIdPage;
