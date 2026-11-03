import { createContext, useContext, useEffect } from "react";

// Lets anything inside a carousel card (the image lightbox) hold the carousel still.
export const HoldContext = createContext<(held: boolean) => void>(() => { });

export const useHoldCarousel = (held: boolean) => {
    const hold = useContext(HoldContext);
    useEffect(() => {
        if (!held) return;
        hold(true);
        return () => hold(false);
    }, [held, hold]);
};
