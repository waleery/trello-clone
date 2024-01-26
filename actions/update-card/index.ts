'use server'

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"

import { InputType, OutputType } from "./types"
import { createSafeAction } from "@/lib/createSafeAction"
import { UpadteCard } from "./schema"
import { createAuditLog } from "@/lib/createAuditLog"
import { ACTION, ENTITY_TYPE } from "@prisma/client"

const handler = async (data: InputType): Promise<OutputType> => {
    const {userId, orgId} = auth()

    if(!userId || !orgId) {
        return{
            error: "Unauthorized"
        }
    }

    const {id, boardId, ...values} = data
    let card

    try {
        card = await db.card.update({
            where: {
                id,
                list:{
                    board:{
                        orgId
                    }
                }
            },
            data: {
                ...values
            }
        })
        await createAuditLog({
            entityTitle: card.title,
            entityId: card.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.UPDATE
        })
    } catch (error) {
        return {
            error: "Fail to update."
        }
    } 

    revalidatePath(`/board/${boardId}`)
    return {data: card}
}

export const upadteCard = createSafeAction(UpadteCard, handler)