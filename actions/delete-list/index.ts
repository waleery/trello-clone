"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { InputType, OutputType } from "./types";
import { createSafeAction } from "@/lib/createSafeAction";
import { DeleteList } from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        };
    }

    const { id, boardId } = data;
    let list;

    try {
        list = await db.list.delete({
            where: {
                id,
                boardId,
                board: {
                    orgId,
                },
            },
        });
    } catch (error) {
        console.log(error)
        return {
            error: "Fail to delete.",
        };
    }

    revalidatePath(`/organization/${orgId}}`);
    return {data: list}
};

export const deleteList = createSafeAction(DeleteList, handler);
