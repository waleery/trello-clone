"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { InputType, OutputType } from "./types";
import { createSafeAction } from "@/lib/createSafeAction";
import { UpdateCardOrder } from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        };
    }

    const { items, boardId } = data;
    let updatedCards;

    try {
        const transaction = items.map((card) => db.card.update({
            where: {
                id: card.id,
                list:{
                    board:{
                        orgId
                    }
                },
            },
            data: {
                order: card.order,
                listId: card.listId,
            },
        }));

        updatedCards = await db.$transaction(transaction);
    } catch (error) {
        console.log(error);
        return {
            error: "Fail to reorder",
        };
    }

    revalidatePath(`/board/${boardId}`);
    return { data: updatedCards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
