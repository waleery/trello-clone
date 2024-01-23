import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/lib/createSafeAction";

import { UpadteCard } from "./schema";


export type InputType = z.infer<typeof UpadteCard>
export type OutputType = ActionState<InputType, Card>
