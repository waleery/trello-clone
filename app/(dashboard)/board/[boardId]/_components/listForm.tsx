"use client";

import { List, Plus, X } from "lucide-react";
import { ListWrapper } from "./listWrapper";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/formInput";
import { useParams } from "next/navigation";
import { FormSubmit } from "@/components/form/formSubmit";
import { Button } from "@/components/ui/button";

const ListForm = () => {
    const params = useParams()

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    if (isEditing) {
        return (
            <ListWrapper>
                <form
                    ref={formRef}
                    className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
                >
                    <FormInput
                        ref={inputRef}
                        id="title"
                        className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
                        placeholder="Enter list title..."
                    />
                    <input
                      hidden
                      value={params.boardId}
                      name='boardId'
                    />
                    <div className="flex items-center gap-x-1">
                      <FormSubmit>
                        Add list
                      </FormSubmit>
                      <Button onClick={disableEditing} size="sm" variant="ghost">
                        <X className="h-5 w-5"/>
                      </Button>
                    </div>
                </form>
            </ListWrapper>
        );
    }

    return (
        <ListWrapper>
            <button
                onClick={enableEditing}
                className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
            >
                <Plus />
                Add a list
            </button>
        </ListWrapper>
    );
};
export default ListForm;
