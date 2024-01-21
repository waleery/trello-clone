"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { ListWithCards } from "@/types";

import ListForm from "./listForm";
import ListItem from "./listItem";

interface ListContainerProps {
    data: ListWithCards[];
    boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
     // Create a copy of the original array to avoid modifying it directly.
     const result = Array.from(list);

     // Remove the element to be moved from its current position and store it in 'removed'.
     const [removed] = result.splice(startIndex, 1);
 
     // Insert the 'removed' element at the target index.
     result.splice(endIndex, 0, removed);
 
     // Return the newly reordered array.
     return result;
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {
    const [orderedData, setOrderedData] = useState<ListWithCards[]>(data);

    useEffect(() => {
        setOrderedData(data);
    }, [data]);

    return (
        <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="lists" type="list" direction="horizontal">
                {(provided) => (
                    <ol
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex gap-x-3 h-full"
                    >
                        {orderedData.map((list, index) => {
                            return (
                                <ListItem
                                    key={list.id}
                                    data={list}
                                    index={index}
                                />
                            );
                        })}
                        {provided.placeholder}
                        <ListForm />
                        <div className="flex-shrink-0 w-1  border-green-500 border" />
                    </ol>
                )}
            </Droppable>
        </DragDropContext>
    );
};
export default ListContainer;
