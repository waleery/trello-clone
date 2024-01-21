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

    const onDragEnd = (result: any) => {
        const {destination, source, type} = result;
    
        if(!destination) {
            return;
        }
    
        //If dropped in the same position
        if(destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
    
        //If user moves a list
        if(type === "list") {
            const items = reorder(
                orderedData,
                source.index,
                destination.index
            ).map((item, index) => ({...item, order: index}));

            setOrderedData(items);

            //TODO: Trigger server action
        }

        //If user moves a card
        if(type === "card") {
            let newOrderedData = [...orderedData];

            //Source and destinations lists
            const sourceList = newOrderedData.find((list) => list.id === source.droppableId);
            const destinatonList = newOrderedData.find((list) => list.id === destination.droppableId);
            
            if(!sourceList || !destinatonList) {
                return;
            }

            //Check if cards exists on the source list
            if(!sourceList.cards) {
                sourceList.cards = [];
            }

            //Check if cards exists on the destination list
            if(!destinatonList.cards) {
                destinatonList.cards = [];
            }

            //Moving the card in the same list
            if(source.droppableId === destination.droppableId) {
                const reorderedCards = reorder(
                    sourceList.cards,
                    source.index,
                    destination.index
                )

                reorderedCards.forEach((card, index) => {
                    card.order = index;
                })

                sourceList.cards = reorderedCards;
                
                //Changed 'sourceList' order, but that is a reference to the
                // 'newOrderedData', so we need to update it

                setOrderedData(newOrderedData)

                //TODO: Trigger server action
            
                
            //Moving the card to another list
            } else {
                //Remove the card from the source list
                const [movedCard] = sourceList.cards.splice(source.index, 1);

                //Assign the new listId to the moved card
                movedCard.listId = destination.droppableId;

                //Add the card to the destination list
                destinatonList.cards.splice(destination.index, 0, movedCard);

                //Update the order of the cards in the source list
                sourceList.cards.forEach((card, index) => {
                    card.order = index;
                })

                //Update the order of the cards in the destination list
                destinatonList.cards.forEach((card, index) => {
                    card.order = index
                })

                setOrderedData(newOrderedData)

                //TODO: Trigger server action

            }
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
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
