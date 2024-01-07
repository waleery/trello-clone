'use server'

import { db } from "@/lib/db"

export const create = async (formData: FormData) => {
    const title = formData.get('title') as string

    await db.board.create({
        data:{
          title,  
        }
    })
}