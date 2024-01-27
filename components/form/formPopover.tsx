"use client";

import { useRef, ElementRef } from "react";

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
import { toast } from "sonner";
import { FormPicker } from "./formPicker";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/useProModal";

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
    const closeRef = useRef<ElementRef<"button">>(null)
    const router = useRouter()
    const proModal = useProModal();

    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            toast.success("Board created");
            closeRef.current?.click();
            router.push(`/board/${data.id}`);
        },
        onError: (error) => {
            console.log({ error });
            toast.error(error);
            proModal.onOpen();
        },
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const image = formData.get("image")?.toString() as string;

        execute({ title, image });
    };

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
                <PopoverClose asChild ref={closeRef}>
                    <Button
                        className="h-auto w-auto p-1 absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <form className="space-y-4" action={onSubmit}>
                    <div className="space-y-4">
                        <FormPicker id="image" errors={fieldErrors} />
                        <FormInput
                            id="title"
                            label="Title"
                            type="text"
                            errors={fieldErrors}
                        />
                    </div>
                    <FormSubmit className="w-full">Create</FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};
