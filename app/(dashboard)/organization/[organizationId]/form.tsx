"use client";

import { create } from "@/actions/createBoard";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import FormInput from "./formInput";

export const Form = () => {
    const initialState = { message: null, errors: { title: []} };
    const [state, dispatch] = useFormState(create, initialState);

    return (
        <form action={dispatch}>
            <div className="flex flex-col space-y-2">
                <FormInput errors={state?.errors} />
            </div>
            
            <Button type="submit">Create</Button>
        </form>
    );
};