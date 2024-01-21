"use client";

import { ListWithCards } from "@/types";
import ListHeader from "./listHeader";

interface ListItemProps {
    data: ListWithCards;
    index: number;
}

const ListItem = ({ data, index }: ListItemProps) => {
    return (
        <li className="shrink-0 h-full w-[272px] select-none border">
            <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
                <ListHeader data={data}/>
            </div>
        </li>
    );
};
export default ListItem;
