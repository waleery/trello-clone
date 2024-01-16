"use client";

import { createBoard } from "@/actions/create-board";
import { FormInput } from "@/components/form/formInput";
import { FormSubmit } from "@/components/form/formSubmit";
import { useAction } from "@/hooks/useAction";

export const Form = () => {
    const {execute, fieldErrors} = useAction(createBoard,{
        onSuccess: (data) => {
            console.log(data, "success")
        },
        onError: (error) => {
            console.error(error, "error")
        }
    })

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        
        execute({title})
    }

    return (
        <form action={onSubmit}>
            <div className="flex flex-col space-y-2 mb-2">
                <FormInput errors={fieldErrors} id="title" label="Board Title"/>
            </div>
            <FormSubmit>Save</FormSubmit>
        </form>
    );
};
