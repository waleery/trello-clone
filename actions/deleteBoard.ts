'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const deleteBoard = async (id: string) => {
    await db.board.delete({
        where: { id },
    });

    revalidatePath('/organization/org_2aSczl0vMsYIJj39JE3N97BK4Kw')

};
export default deleteBoard;
