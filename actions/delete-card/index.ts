"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { InputType, OutputType } from "./types";
import { createSafeAction } from "@/lib/createSafeAction";
import { DeleteCard } from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        };
    }

    const { id, boardId } = data;
    let card;

    try {
        card = await db.card.delete({
            where:{
                id: id,
                list:{
                    board:{
                        orgId
                    }
                }
            }
        })
        
    } catch (error) {
        console.log(error);
        return {
            error: "Fail to delete.",
        };
    }

    revalidatePath(`/organization/${orgId}}`);
    return { data: card };
};

export const deleteCard = createSafeAction(DeleteCard, handler);
