"use client";

import { useEffect, useState } from "react";
import CardModal from "../modals/card-modal";
import ProModal from "../modals/proModal";

const ModalProvider = () => {
    //protect for hydration error
    const [isMounted, setIsMounted] = useState(false);

    //useEffect is rendered only on client side
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;
    return (
        <>
            <CardModal />
            <ProModal />
        </>
    );
};
export default ModalProvider;
