"use client";

import { ListWithCards } from "@/types";
import { List } from "@prisma/client";
import ListForm from "./listForm";
import { useEffect, useState } from "react";
import ListItem from "./listItem";

interface ListContainerProps {
    data: ListWithCards[];
    boardId: string;
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {
    const [orderedData, setOrderedData] = useState<ListWithCards[]>(data);

    useEffect(() => {
        setOrderedData(data);
    },[data])


    return (
        <ol className="flex gap-x-3 h-full">
            {orderedData.map((list, index) =>{
               return (
                <ListItem
                    key={list.id}
                    data={list}
                    index={index}
                />
               ) 
            })}
            <ListForm/>
            <div className="flex-shrink-0 w-1  border-green-500 border"/>
        </ol>
    );
};
export default ListContainer;
