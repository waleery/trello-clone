import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/lib/createSafeAction";

import { DeleteCard } from "./schema";


export type InputType = z.infer<typeof DeleteCard>
export type OutputType = ActionState<InputType, Card>
