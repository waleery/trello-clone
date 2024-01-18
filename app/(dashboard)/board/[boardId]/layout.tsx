import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";

const BoardIdLayout = async ({ children, params }: { children: ReactNode, params: {boardId: string} }) => {
    const {orgId} = auth()

    if(!orgId) return redirect("/select-org")
    
     const board = await db.board.findUnique({
        where:{
            id: params.boardId,
            orgId
        }
     })
     if (!board){
        notFound()
     }
    return (
        <div className="relative h-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${board.imageFullUrl})`}}>
            <main className="relative pt-28 h-full">{children}</main>
        </div>
    );
};

export default BoardIdLayout;
