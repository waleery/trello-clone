"use client";

import { upadteCard } from "@/actions/update-card";
import { FormSubmit } from "@/components/form/formSubmit";
import { FormTextArea } from "@/components/form/formTextArea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { set } from "zod";

interface DescriptionProps {
    data: CardWithList;
}

const Description = ({ data }: DescriptionProps) => {
    const queryClient = useQueryClient();
    const params = useParams();

    const [isEditing, setIsEditing] = useState(false);

    const [description, setDescription] = useState(data.description);


    const formRef = useRef<ElementRef<"form">>(null);
    const textAreaRef = useRef<ElementRef<"textarea">>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textAreaRef.current?.focus();
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

    const { execute, fieldErrors } = useAction(upadteCard, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id],
            });
            queryClient.invalidateQueries({ queryKey: ["card-logs", data.id] });

            toast.success(`Card ${data.title} updated`);
            setDescription(data.description);
            disableEditing();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const onSubmit = (formData: FormData) => {
        const description = formData.get("description") as string;
        const boardId = params.boardId as string;

        execute({ description, boardId, id: data.id });
    };

    return (
        <div className="flex items-start gap-x-3 w-full">
            <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">
                    Description
                </p>
                {isEditing ? (
                    <form ref={formRef} className="space-y-2" action={onSubmit}>
                        <FormTextArea
                            id="description"
                            className="w-full mt-2"
                            placeholder="Add a more detailed description..."
                            defaultValue={description || undefined}
                            errors={fieldErrors}
                            ref={textAreaRef}
                        />
                        <div className="flex items-center gap-x-2">
                            <FormSubmit>Save</FormSubmit>
                            <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={disableEditing}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div
                        onClick={enableEditing}
                        role="button"
                        className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
                    >
                        {description ||
                            "Add a more detailed description..."}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Description;

Description.Skeleton = function DescriptionSkeleton() {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="h-6 w-6 bg-neutral-200" />
            <div className="w-full">
                <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
                <Skeleton className="w-full h-[78px] mb-2 bg-neutral-200" />
            </div>
        </div>
    );
};
