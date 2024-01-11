"use server";

import { auth } from "@clerk/nextjs";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { CreateBoard } from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId } = auth();

    if (!userId) {
        return {
            error: "Unauthorized",
        };
    }

    const { title } = data;

    let board;
    try {
        board = await db.board.create({
            data: { title },
        });
    } catch (error) {
        return {
            error: "Database error. Failed to create board",
        };
    }

    //future path
    revalidatePath(`/boards/${board.id}`);
    return { data: board };

};

export const createBoard = createSafeAction(CreateBoard, handler)