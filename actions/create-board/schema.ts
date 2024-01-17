import { z } from "zod";

export const CreateBoard = z.object({
    title: z
        .string({
            //this checks if there is any value
            required_error: "Title is required",
            invalid_type_error: "Title must be a string",
        })
        .min(3, {
            message: "Title must be at least 3 characters long",
        })
        .refine(value => value !== '', {
            message: "Title is required",
        }),
    image: z
        .string({
            required_error: "Image is required",
            invalid_type_error: "Image must be a string",
        })
});
