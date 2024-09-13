import { MouseEvent, useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import classNames from "classnames";

import { Button } from "@mui/material";
import { useSwipeable } from "react-swipeable";

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
            <div className="w-auto h-auto flex bg-white justify-center max-h-[150px]">
                <img src={images[current]} alt="CareMinder demo" className="object-cover cursor-pointer" onClick={() => setIsExpanded(true)} />
            </div>
            {isExpanded && <div className="fixed inset-0 z-40 flex items-center justify-center bg-black-950 bg-opacity-80" {...handlers}>
                <Button onClick={() => setIsExpanded(false)} className="fixed z-50 top-[20px] right-[20px] text-white h-fit w-fit border-0 rounded-full">
                    <CloseIcon className="h-8 w-8" />
                </Button>
                <div className="flex flex-row items-center justify-between" onClick={(e) => handleClick(e)}>
                    <Button onClick={() => move(-1)} disabled={current <= 0} className="z-50 fixed top-[calc(50vh-20px)] left-[20px] text-white h-fit w-fit border-0 disabled:text-black-400 rounded-full">
                        <ChevronLeftIcon className="w-12 h-12" />
                    </Button>
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className={classNames("w-screen h-screen transition-transform ease-in-out duration-1000 carousel absolute top-0 left-0", {
                                'translate-x-[-100vw]': index === left,
                                'translate-x-[100vw]': index === right,
                                'translate-x-[0px]': index === current,
                                'hidden': ![left, current, right].includes(index),
                            })}
                        >
                            <div className="w-full h-full flex justify-center items-center caroulsel-container">
                                <img
                                    src={src}
                                    alt="CareMinder demo"
                                    className={classNames("max-w-[90vw] max-h-[80vh]", {
                                    })}
                                />
                            </div>
                        </div>
                    ))}
                    <Button onClick={() => move(+1)} disabled={current >= images.length - 1} className="z-50 fixed top-[calc(50vh-20px)] right-[20px] text-white h-fit w-fit border-0 disabled:text-black-400 rounded-full">
                        <ChevronRightIcon className="w-12 h-12" />
                    </Button>
                </div>
            </div>}
        </>
    );
};

export default Vitrine;
