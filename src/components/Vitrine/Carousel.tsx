import classNames from "classnames";

interface CarouselProps {
    left: number;
    current: number;
    right: number;
    images: string[];
    containerWidth: string;
    limitSize: boolean;
}
const Carousel = ({ left, right, current, images, containerWidth, limitSize }: CarouselProps) => {
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
                    <img
                        src={src}
                        alt="CareMinder demo"
                        className={classNames({
                            "max-w-[80%] max-h-[80%]": limitSize,
                            "object-cover": !limitSize
                        })}
                    />
                </div>
            </div>
        ))
    );
};

export default Carousel;
