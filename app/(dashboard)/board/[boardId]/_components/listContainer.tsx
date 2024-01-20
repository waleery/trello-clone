"use client";

import { ListWithCards } from "@/types";
import { List } from "@prisma/client";
import ListForm from "./listForm";

interface ListContainerProps {
    data: ListWithCards[];
    boardId: string;
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {
    return (
        <ol className="border-yellow-500 border">
            <ListForm/>
            <div className="flex-shrink-0 w-1  border-green-500 border"/>
        </ol>
    );
};
export default ListContainer;
