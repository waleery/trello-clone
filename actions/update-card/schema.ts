import { min } from "lodash";
import { z } from "zod";

export const UpadteCard = z.object({
    boardId: z.string(),
    description: z.optional(
        z.string({
            required_error: "Description is required",
            invalid_type_error: "Description must be a string",
        })
        .min(3, {
            message: "Description must be at least 3 characters long",
        })
    ),
    title: z.optional(
        z.string({
            //this checks if there is any value
            required_error: "Title is required",
            invalid_type_error: "Title must be a string",
        })
        .min(3, {
            message: "Title must be at least 3 characters long",
        })
        .refine((value) => value !== "", {
            message: "Title is required",
        })),
    id: z.string(),
});
