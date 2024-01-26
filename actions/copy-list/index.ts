"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { InputType, OutputType } from "./types";
import { createSafeAction } from "@/lib/createSafeAction";
import { CopyList } from "./schema";
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
    let list;

    try {
        const listToCopy = await db.list.findUnique({
            where: {
                id,
                boardId,
                board: {
                    orgId,
                },
            },
            include: {
                cards: true,
            },
        });

        if (!listToCopy) {
            return {
                error: "List not found.",
            };
        }

        const lastList = await db.list.findFirst({
            where: {
                boardId,
            },
            orderBy: {
                order: "desc",
            },
            select: { order: true },
        });

        const newOrder = lastList ? lastList.order + 1 : 1;

        list = await db.list.create({
            data: {
                boardId: listToCopy.boardId,
                title: `${listToCopy.title} - Copy`,
                order: newOrder,
                cards: {
                    createMany: {
                        data: listToCopy.cards.map((card) => ({
                            title: card.title,
                            description: card.description,
                            order: card.order,
                        })),
                    },
                },
            },
            include: {
                cards: true,
            }
        });

        await createAuditLog({
            entityTitle: list.title,
            entityId: list.id,
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
    return { data: list };
};

export const copyList = createSafeAction(CopyList, handler);
