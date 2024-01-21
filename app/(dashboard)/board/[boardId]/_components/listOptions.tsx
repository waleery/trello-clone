"use client";

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/form/formSubmit";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverClose,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/useAction";
import { List } from "@prisma/client";
import { exec } from "child_process";
import { MoreHorizontal, X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface ListOptionsProps {
    data: List;
    onAddCard: () => void;
}

const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
    const closeRef = useRef<ElementRef<'button'>>(null);

    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess: (data) => {
            toast.success(`List ${data.title} deleted`);
            closeRef.current?.click();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const { execute: executeCopy } = useAction(copyList, {
        onSuccess: (data) => {
            toast.success(`List ${data.title} copied`);
            closeRef.current?.click();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const onDelete= (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;

        executeDelete({ id, boardId });
    }

    const onCopy= (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;

        executeCopy({ id, boardId });
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-1" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="px-0 pt-3 pb-0"
                side="bottom"
                align="start"
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    List actions
                </div>
                <PopoverClose asChild>
                    <Button
                        className="h-auto w-auto p-1 absolute top-2 right-2 text-neutral-600"
                        size="sm"
                        variant="ghost"
                        ref={closeRef}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>

                <Button
                    onClick={onAddCard}
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    variant="ghost"
                >
                    Add card...
                </Button>
                {/* COPY FORM */}
                <form action={onCopy}>
                    <input hidden name="id" id="id" value={data.id} />
                    <input
                        hidden
                        name="boardId"
                        id="boardId"
                        value={data.boardId}
                    />
                    <FormSubmit
                        variant="ghost"
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    >
                        Copy list....
                    </FormSubmit>
                </form>
                <Separator />
                {/* DELETE FORM */}
                <form action={onDelete}>
                    <input hidden name="id" id="id" value={data.id} />
                    <input
                        hidden
                        name="boardId"
                        id="boardId"
                        value={data.boardId}
                    />
                    <FormSubmit
                        variant="ghost"
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    >
                        Delete this list....
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};
export default ListOptions;
