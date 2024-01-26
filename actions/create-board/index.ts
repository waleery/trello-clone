"use server";

import { auth } from "@clerk/nextjs";

import { InputType, OutputType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { hasAvailableCount, incrementAvailableCount } from "@/lib/orgLimits";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        };
    }

    const canCreate = await hasAvailableCount()

    if(!canCreate){
        return{
            error: "You have reached the maximum number of boards for your plan. Please upgrade to create more boards."
        }
    }

    const { title, image } = data;

    const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
        image.split("|");

    if (
        !imageId ||
        !imageThumbUrl ||
        !imageFullUrl ||
        !imageLinkHTML ||
        !imageUserName
    ) {
        return {
            error: "Missing image fields. Failed to create board",
        };
    }

    let board;
    try {
        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageLinkHTML,
                imageUserName,
            },
        });

        await incrementAvailableCount()

        await createAuditLog({
            entityTitle: board.title,
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.CREATE
        })
    } catch (error) {
        return {
            error: "Database error. Failed to create board",
        };
    }

    //future path
    revalidatePath(`/boards/${board.id}`);
    return { data: board };
    
};

export const createBoard = createSafeAction(CreateBoard, handler);
