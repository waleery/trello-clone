"use client";

import { FormSubmit } from "@/components/form/formSubmit";
import { FormTextArea } from "@/components/form/formTextArea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { forwardRef } from "react";

interface CardFormProps {
    listId: string;
    enableEditing: () => void;
    disableEditing: () => void;
    isEditing: boolean;
}
export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
    ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
        if (isEditing) {
            return (
                <form className="m-1 py-0.5 px-1 space-y-4">
                    <FormTextArea
                        id="title"
                        onKeyDown={() => {}}
                        ref={ref}
                        placeholder="Enter a title for new card..."
                    />
                    <input hidden id="listId" name="listId" value={listId} />
                    <div className="flex items-center gap-x-1" >
                        <FormSubmit>
                            Add card
                        </FormSubmit>
                        <Button onClick={disableEditing} size="sm" variant="ghost">
                            <X className="h-5 w-5"/>
                        </Button>
                    </div>
                </form>
            );
        }

        return (
            <div className="pt-2 px-2">
                <Button
                    onClick={enableEditing}
                    className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
                    size="sm"
                    variant="ghost"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add a card
                </Button>
            </div>
        );
    }
);

CardForm.displayName = "CardForm";
