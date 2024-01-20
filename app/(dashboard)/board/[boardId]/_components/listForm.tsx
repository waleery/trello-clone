'use client'

import { Plus } from "lucide-react"
import { ListWrapper } from "./listWrapper"

const ListForm = () => {
  return (
    <ListWrapper>
        <button className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm">
            <Plus/>
            Add a list
        </button>
    </ListWrapper>
  )
}
export default ListForm