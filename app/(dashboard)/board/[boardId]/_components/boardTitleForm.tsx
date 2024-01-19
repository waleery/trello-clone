"use client";

import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/form/formInput";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface BoardTitleFormProps {
    data: Board;
}

const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
    const {execute, fieldErrors} = useAction(updateBoard, {
        onSuccess: (data) => {
            toast.success(`Board "${data.title}" updated!`);
            setTitle(data.title);
            disableEditing();
        },
        onError: (error) => {
            //if there are errors, focus on the input
            focusInput();
            toast.error(error);
        }
    })

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const [title, setTitle] = useState(data.title);
    const [isEditing, setIsEditing] = useState(false);

    const focusInput = () => {
        inputRef.current?.focus();
        inputRef.current?.select();
    }

    //if there are errors, focus on the input
    if(fieldErrors){
        focusInput()
    }

    const enableEditing = () => {
        setIsEditing(true);

        setTimeout(() => {
            focusInput();
        }, 100);
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        execute({id: data.id, title})
    };

    const onBlur = () => {
        formRef.current?.requestSubmit()
    }

    if (isEditing) {
        return (
            <form
                ref={formRef}
                action={onSubmit}
                className="flex items-center gap-x-2"
            >
                <FormInput
                    id="title"
                    onBlur={onBlur}
                    defaultValue={title}
                    className="text-lg font-bold px-[7px] py-1 y-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
                    ref={inputRef}
                    errors={fieldErrors}
                    />
            </form>
        );
    }

    return (
        <Button
            className="font-bold text-lg h-auto w-auto p-1 px-2"
            variant="transparent"
            onClick={enableEditing}
        >
            {title}
        </Button>
    );
};
export default BoardTitleForm;
