"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/useCardModal";
import { CardWithList } from "@/types";

import { useQuery } from "@tanstack/react-query";

import { fetcher } from "@/lib/fetcher";

const CardModal = () => {
    const { id, isOpen, onClose } = useCardModal((state) => state);

    const { data: cardData } = useQuery<CardWithList>({
        queryKey: ["card", id],
        queryFn: () => fetcher(`/api/cards/${id}`),
    });
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>{cardData?.title}</DialogContent>
        </Dialog>
    );
};
export default CardModal;
