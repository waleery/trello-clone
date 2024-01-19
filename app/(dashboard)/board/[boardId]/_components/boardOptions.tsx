"use client";

import { toast } from "sonner";
import { MoreHorizontal, X } from "lucide-react";

import { deleteBoard } from "@/actions/delete-board";
import { useAction } from "@/hooks/useAction";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverTrigger,
    PopoverClose,
    PopoverContent,
} from "@/components/ui/popover";


interface BoardOptionsProps {
    id: string;
}

const BoardOptions = ({ id }: BoardOptionsProps) => {
    const {execute, isLoading} = useAction(deleteBoard,{
        onError: (error) => {
            toast.error(error);
        }
    })

    const onDelete = () => {
        execute({id});
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="transparent">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="px-0 pt-3 pb-3"
                side="bottom"
                align="start"
            >
                <div className="text-small font-medium text-center text-neutral-600 pb-4">
                    Board Actions
                </div>
                <PopoverClose asChild>
                    <Button
                        className="h-auto w-auto absolute p-2 top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <Button
                    variant="ghost"
                    onClick={onDelete}
                    disabled={isLoading}
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm "
                >
                    Delete this board
                </Button>
            </PopoverContent>
        </Popover>
    );
};
export default BoardOptions;
