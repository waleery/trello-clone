"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { InputType, OutputType } from "./types";
import { createSafeAction } from "@/lib/createSafeAction";
import { CreateCard } from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        };
    }

    const { title, boardId, listId } = data;
    let card;

    try {
        const list = await db.list.findUnique({
            where: {
                id: listId,
                board: {
                    orgId,
                },
            },
        });

        if (!list) {
            return {
                error: "List not found",
            };
        }

        const lastCard = await db.card.findFirst({
            where: {
                listId,
            },
            orderBy: {
                order: "desc",
            },
            select: { order: true },
        });

        const newOrder = lastCard ? lastCard.order + 1 : 1;

        card = await db.card.create({
            data: {
                title,
                listId,
                order: newOrder,
            },
        })
    } catch (error) {
        return {
            error: "Fail to create",
        };
    }

    revalidatePath(`/board/${boardId}`);
    return { data: card };
};

export const createCard = createSafeAction(CreateCard, handler);
