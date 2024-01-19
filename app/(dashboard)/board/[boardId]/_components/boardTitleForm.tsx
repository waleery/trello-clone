"use client";

import { FormInput } from "@/components/form/formInput";
import { Button } from "@/components/ui/button";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";

interface BoardTitleFormProps {
    data: Board;
}

const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true);

        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        }, 100);
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        console.log("I submited", title);
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
                    defaultValue={data.title}
                    className="text-lg font-bold px-[7px] py-1 y-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
                    ref={inputRef}
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
            {data.title}
        </Button>
    );
};
export default BoardTitleForm;
