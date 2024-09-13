import { MouseEvent, useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { Button } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import Carousel from "./Carousel";

const Vitrine = ({ images }: { images: string[] }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const [left, setLeft] = useState<number>(-1);
    const [current, setCurrent] = useState<number>(0);
    const [right, setRight] = useState<number>(1);

    const move = (count: number) => {
        const middle = current + count;
        const prev = middle - 1;
        const next = middle + 1;
        setCurrent(middle);
        setLeft(prev);
        setRight(next);
    }

    const handlers = useSwipeable({
        onSwipedLeft: () => current < images.length - 1 && move(1),
        onSwipedRight: () => current > 0 && move(-1),
        trackMouse: true,
    });

    useEffect(() => {
        if (isExpanded) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';

        return () => { document.body.style.overflow = '' };
    }, [isExpanded]);

    function handleClick(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>): void {
        const target = e.target as HTMLElement;
        if (target.classList.contains('caroulsel-container')) setIsExpanded(false);
    }

    return (
        <>
            <div className="flex bg-white justify-center h-[150px] w-[280px] relative">
                <button onClick={() => move(-1)} disabled={current <= 0} className="p-0 z-30 absolute top-[calc(50%-12px)] left-[-24px] text-black-950 h-fit w-6 border-0 disabled:text-black-400 rounded-full mr-auto">
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <div className="w-full h-full relative overflow-hidden cursor-pointer"
                    onClick={() => setIsExpanded(true)} {...handlers}>
                    <Carousel
                        images={images}
                        left={left}
                        right={right}
                        current={current}
                        containerWidth="280px"
                        limitSize={false}
                    />

                </div>
                <button onClick={() => move(1)} disabled={current >= images.length - 1} className="p-0 z-30 absolute top-[calc(50%-12px)] right-[-24px] text-black-950 h-fit w-fit border-0 disabled:text-black-400 rounded-full ml-auto">
                    <ChevronRightIcon className="w-6 h-6" />
                </button>
            </div>
            {isExpanded && <div className="fixed inset-0 z-40 flex items-center justify-center bg-black-950 bg-opacity-80" {...handlers}>
                <Button onClick={() => setIsExpanded(false)} className="fixed z-50 top-[20px] right-[20px] text-white h-fit w-fit border-0 rounded-full">
                    <CloseIcon className="h-8 w-8" />
                </Button>
                <div className="flex flex-row items-center justify-between" onClick={(e) => handleClick(e)}>
                    <Button onClick={() => move(-1)} disabled={current <= 0} className="z-50 fixed top-[calc(50vh-20px)] left-[20px] text-white h-fit w-fit border-0 disabled:text-black-400 rounded-full">
                        <ChevronLeftIcon className="w-12 h-12" />
                    </Button>
                    <Carousel
                        images={images}
                        left={left}
                        right={right}
                        current={current}
                        containerWidth="100vw"
                        limitSize={true}
                    />
                    <Button onClick={() => move(+1)} disabled={current >= images.length - 1} className="z-50 fixed top-[calc(50vh-20px)] right-[20px] text-white h-fit w-fit border-0 disabled:text-black-400 rounded-full">
                        <ChevronRightIcon className="w-12 h-12" />
                    </Button>
                </div>
            </div>}
        </>
    );
};

export default Vitrine;
