"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { InputType, OutputType } from "./types";
import { createSafeAction } from "@/lib/createSafeAction";
import { UpdateListOrder } from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        };
        
    }

    const { items, boardId } = data;
    let lists;

    try {
        //we need to update the order of each list
        const transaction = items.map((list) => 
            db.list.update({
                where: {
                    id: list.id,
                    board:{
                        orgId
                    }
                },
                data: {
                    order: list.order,
                },
            })
        );

        lists = await db.$transaction(transaction);
    } catch (error) {
        console.log(error)
        return {
            error: "Fail to reorder",
        };
    }

    revalidatePath(`/board/${boardId}`);
    return { data: lists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
