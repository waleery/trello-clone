'use server'

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"

import { InputType, OutputType } from "./types"
import { createSafeAction } from "@/lib/createSafeAction"
import { UpdateBoard } from "./schema"

const handler = async (data: InputType): Promise<OutputType> => {
    const {userId, orgId} = auth()

    if(!userId || !orgId) {
        return{
            error: "Unauthorized"
        }
    }

    const {title, id} = data
    let board

    try {
        board = await db.board.update({
            where: {
                id,
                orgId
            },
            data: {
                title
            }
        })
    } catch (error) {
        return {
            error: "Fail to update."
        }
    }

    revalidatePath(`/board/${id}`)
    return {data: board}
}

export const updateBoard = createSafeAction(UpdateBoard, handler)