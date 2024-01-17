"use client";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverClose,
} from "@/components/ui/popover";

import { useAction } from "@/hooks/useAction";
import { createBoard } from "@/actions/create-board";

import { FormInput } from "./formInput";
import { FormSubmit } from "./formSubmit";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface FormPopoverProps {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

export const FormPopover = ({
    children,
    side = "bottom",
    align,
    sideOffset = 0,
}: FormPopoverProps) => {

    const {execute, fieldErrors} = useAction(createBoard, {
        onSuccess: (data) => {
            console.log({data})
        },
        onError: (error) => {
            console.log({error})
        }
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;

        execute({title});
    }


    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent
                align={align}
                className="w-80 p-3"
                side={side}
                sideOffset={sideOffset}
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    CreateBoard
                </div>
                <PopoverClose asChild>
                    <Button
                        className="h-auto w-auto p-1 absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <form className="space-y-4" action={onSubmit}>
                    <div className="space-y-4">
                        <FormInput id="title" label="Title" type="text" errors={fieldErrors} />
                    </div>
                    <FormSubmit className="w-full">Create</FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};
