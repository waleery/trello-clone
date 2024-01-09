"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
    message?: string | null,
    errors?: {
        title?: string[];
    },
};

const CreateBoard = z.object({
    title: z.string().min(3, {
        message: "Board title must be at least 3 characters long", 
    }),
});

export const create = async (prevState: State, formData: FormData) : Promise<State> => {
    const validatedFields = CreateBoard.safeParse({
        title: formData.get("title"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields",
        };
    }

    const { title } = validatedFields.data;

    try {
        await db.board.create({
            data: {
                title,
            },
        });
    } catch (error) {
        return {
            message: "Database Error",
        };
    }

    revalidatePath("/organization/org_2aSczl0vMsYIJj39JE3N97BK4Kw");
    redirect("/organization/org_2aSczl0vMsYIJj39JE3N97BK4Kw");
};
