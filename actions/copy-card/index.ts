"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { InputType, OutputType } from "./types";
import { createSafeAction } from "@/lib/createSafeAction";
import { CopyCard } from "./schema";
import { createAuditLog } from "@/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

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
        const cardToCopy = await db.card.findUnique({
            where: {
                id,
                list: {
                    board: {
                        orgId,
                    },
                },
            },
        });

        if(!cardToCopy) {
            return {
                error: "Card not found.",
            };
        }

        const lastCard = await db.card.findFirst({
            where:{
                listId: cardToCopy.listId,
            },
            orderBy: {
                order: "desc"
            },
            select:{
                order: true
            }
        })
        const newOrder = lastCard ? lastCard.order + 1 : 1

        card = await db.card.create({
            data:{
                title: `${cardToCopy.title} - Copy`,
                order: newOrder,
                listId: cardToCopy.listId,
                description: cardToCopy.description,
            }
        })

        await createAuditLog({
            entityTitle: card.title,
            entityId: card.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.CREATE
        })
        
    } catch (error) {
        console.log(error);
        return {
            error: "Fail to copy.",
        };
    }

    revalidatePath(`/organization/${orgId}}`);
    return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);
