import classNames from "classnames";
import { useEffect, useRef } from "react";

const isVideo = (src: string) => /\.(mp4|webm|ogg)(\?|$)/i.test(src);

interface CarouselProps {
    left: number;
    current: number;
    right: number;
    images: string[];
    containerWidth: string;
    limitSize: boolean;
}
const Carousel = ({ left, right, current, images, containerWidth, limitSize }: CarouselProps) => {
    const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

    useEffect(() => {
        Object.entries(videoRefs.current).forEach(([index, video]) => {
            if (!video) return;
            if (Number(index) === current) {
                video.currentTime = 0;
                video.play().catch(() => { /* autoplay may be blocked until interaction */ });
            } else {
                video.pause();
            }
        });
    }, [current, images]);

    return (
        images.map((src, index) => (
            <div
                key={index}
                className={classNames("w-full h-full transition-transform ease-in-out duration-1000 carousel", {
                    'hidden': ![left, current, right].includes(index),
                    'top-0 left-0': limitSize,
                    'absolute': limitSize || [left, current, right].includes(index)
                })}
                style={{
                    transform: index === left
                        ? `translateX(-${containerWidth}`
                        : index === right
                            ? `translateX(${containerWidth}`
                            : "translateX(0px)"
                }}
            >
                <div className="w-full h-full flex justify-center items-center caroulsel-container">
                    {isVideo(src) ? (
                        <video
                            ref={(el) => { videoRefs.current[index] = el; }}
                            src={src}
                            className={classNames({
                                "max-w-[80%] max-h-[80%]": limitSize,
                                "object-cover object-top w-full h-full": !limitSize
                            })}
                            muted
                            loop
                            playsInline
                            autoPlay
                            controls={limitSize}
                        />
                    ) : (
                        <img
                            src={src}
                            alt="Project demo"
                            className={classNames({
                                "max-w-[80%] max-h-[80%]": limitSize,
                                "object-cover": !limitSize
                            })}
                        />
                    )}
                </div>
            </div>
        ))
    );
};

export default Carousel;
