"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const CreateBoard = z.object({
    title: z.string(),
});

export const create = async (formData: FormData) => {
    const { title } = CreateBoard.parse({
        title: formData.get("title"),
    });

    await db.board.create({
        data: {
            title,
        },
    });

    revalidatePath('/organization/org_2aSczl0vMsYIJj39JE3N97BK4Kw')
};
