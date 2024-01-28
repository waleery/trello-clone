"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { InputType, OutputType } from "./types";
import { createSafeAction } from "@/lib/createSafeAction";
import { DeleteBoard } from "./schema";
import { redirect } from "next/navigation";
import { createAuditLog } from "@/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { decreaseAvailableCount } from "@/lib/orgLimits";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();
    const isPro = await checkSubscription()

    if (!userId || !orgId) {
        return{
            error: "Unauthorized",
        }
    }

    const { id } = data;
    let board;

    try {
        board = await db.board.delete({
            where: {
                id,
                orgId,
            },
        });

        if(!isPro){
            await decreaseAvailableCount()
        }

        await createAuditLog({
            entityTitle: board.title,
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.DELETE
        })

    } catch (error) {
        return {
            error: "Fail to delete.",
        };
    }

    revalidatePath(`/organization/${orgId}}`);
    redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
