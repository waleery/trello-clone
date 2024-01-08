import { Button } from "@/components/ui/button";

interface BoardProps {
    title: string;
    id: string;
}

const Board = ({ title, id }: BoardProps) => {
    return (
        <form className="flex items-center gap-x-2">
            <p>Board title: {title}</p>
            <Button type="submit" variant="destructive" size="sm">
                Delete
            </Button>
        </form>
    );
};
export default Board;
