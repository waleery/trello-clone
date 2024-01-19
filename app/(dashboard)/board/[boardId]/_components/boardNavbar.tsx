import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Board } from "@prisma/client";
import BoardTitleForm from "./boardTitleForm";

interface BoardNavbarProps {
    data: Board;
}

const BoardNavbar = async ({ data }: BoardNavbarProps) => {
    return (
        <div className="w-full h-fit min-h-[3.5rem] py-2 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
            <BoardTitleForm data={data} />
        </div>
    );
};
export default BoardNavbar;
