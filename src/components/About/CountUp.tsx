import { useEffect, useRef, useState } from "react";
import { canAnimate, REVEAL_MARGIN } from "@/lib/motion";

const DURATION_MS = 1400;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Counts from 0 up to `value` the first time it scrolls into view.
const CountUp = ({ value, prefix = "", className }: { value: number; prefix?: string; className?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [shown, setShown] = useState(() => (canAnimate() ? 0 : value));

    useEffect(() => {
        const el = ref.current;
        if (!el || !canAnimate()) {
            setShown(value);
            return;
        }

        let frame = 0;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            const start = performance.now();
            const tick = (now: number) => {
                const t = Math.min(1, (now - start) / DURATION_MS);
                setShown(Math.round(value * easeOut(t)));
                if (t < 1) frame = requestAnimationFrame(tick);
            };
            frame = requestAnimationFrame(tick);
        }, { rootMargin: REVEAL_MARGIN });

        observer.observe(el);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [value]);

    const final = `${prefix}${value}`;
    return (
        <span ref={ref} className={`inline-grid tabular-nums ${className ?? ""}`}>
            <span className="sr-only">{final}</span>
            {/* The final value holds the width so the number doesn't jitter while counting. */}
            <span aria-hidden="true" className="invisible col-start-1 row-start-1">{final}</span>
            <span aria-hidden="true" className="col-start-1 row-start-1">{prefix}{shown}</span>
        </span>
    );
};

export default CountUp;
