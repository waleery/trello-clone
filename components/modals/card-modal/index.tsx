"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/useCardModal";

const CardModal = () => {
    const { id, isOpen, onClose } = useCardModal((state) => state);

    
    return (
        <Dialog open={isOpen} onOpenChange={onClose} >
            <DialogContent>I am a modal</DialogContent>
        </Dialog>
    );
};
export default CardModal;
