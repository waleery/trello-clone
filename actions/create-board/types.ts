import {z} from 'zod'
import { Board } from '@prisma/client'

import { ActionState } from '@/lib/createSafeAction'
import { CreateBoard } from './schema'

//Type inference for input data
export type InputType = z.infer<typeof CreateBoard>

//define output type
export type OutputType = ActionState<InputType, Board>