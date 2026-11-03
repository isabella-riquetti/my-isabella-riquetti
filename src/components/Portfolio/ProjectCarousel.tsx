import { FocusEvent, ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { HoldContext } from "./carouselHold";

const CARD_WIDTH = 280;
const GAP = 64;
const STEP = CARD_WIDTH + GAP;
// Room on each side for the card's own image arrows, which sit outside the card.
const EDGE = 32;
const MAX_VISIBLE = 4;
const INTERVAL_MS = 5000;
const SLIDE_MS = 700;

const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
    useEffect(() => {
        const media = window.matchMedia(query);
        const onChange = () => setMatches(media.matches);
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, [query]);
    return matches;
};

const usePageHidden = () => {
    const [hidden, setHidden] = useState(document.hidden);
    useEffect(() => {
        const onChange = () => setHidden(document.hidden);
        document.addEventListener("visibilitychange", onChange);
        return () => document.removeEventListener("visibilitychange", onChange);
    }, []);
    return hidden;
};

const ProjectCarousel = ({ items, label }: { items: ReactNode[]; label: string }) => {
    const n = items.length;
    // Copies of the first/last cards on each side make the loop seamless.
    const clones = Math.min(MAX_VISIBLE, n);
    const slots = [...items.slice(n - clones), ...items, ...items.slice(0, clones)];

    const outerRef = useRef<HTMLDivElement>(null);
    const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
    const moving = useRef(false);

    const [layout, setLayout] = useState({ visible: 1, edge: EDGE });
    const [index, setIndex] = useState(clones);
    const [animate, setAnimate] = useState(true);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [holds, setHolds] = useState(0);
    const [restart, setRestart] = useState(0);

    const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
    const pageHidden = usePageHidden();
    const paused = hovered || focused || holds > 0 || reducedMotion || pageHidden;

    const hold = useCallback((held: boolean) => setHolds(h => h + (held ? 1 : -1)), []);

    useLayoutEffect(() => {
        const el = outerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(([entry]) => {
            const width = entry.contentRect.width;
            const visible = Math.max(1, Math.min(clones, Math.floor((width - 2 * EDGE + GAP) / STEP)));
            const edge = Math.max(0, Math.min(EDGE, (width - (visible * STEP - GAP)) / 2));
            setLayout({ visible, edge });
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, [clones]);

    const move = useCallback((delta: number) => {
        if (moving.current || delta === 0) return;
        moving.current = true;
        setAnimate(true);
        setIndex(i => i + delta);
        window.setTimeout(() => {
            // Once the slide lands on a clone, jump to the real card without animating.
            setAnimate(false);
            setIndex(i => (i >= clones + n ? i - n : i < clones ? i + n : i));
            moving.current = false;
        }, SLIDE_MS);
    }, [clones, n]);

    const navigate = (delta: number) => {
        move(delta);
        setRestart(r => r + 1);
    };

    useEffect(() => {
        if (animate) return;
        let inner = 0;
        const outer = requestAnimationFrame(() => { inner = requestAnimationFrame(() => setAnimate(true)); });
        return () => { cancelAnimationFrame(outer); cancelAnimationFrame(inner); };
    }, [animate]);

    useEffect(() => {
        if (paused) return;
        const id = window.setInterval(() => move(1), INTERVAL_MS);
        return () => window.clearInterval(id);
    }, [paused, move, restart]);

    // Cards outside the window can't be focused or clicked.
    useEffect(() => {
        slotRefs.current.forEach((el, i) => {
            if (!el) return;
            const inView = i >= index && i < index + layout.visible;
            el.toggleAttribute("inert", !inView);
            el.setAttribute("aria-hidden", String(!inView));
        });
    }, [index, layout.visible]);

    const onFocus = (e: FocusEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).matches(":focus-visible")) setFocused(true);
    };
    const onBlur = (e: FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
    };

    const active = (((index - clones) % n) + n) % n;
    const { visible, edge } = layout;

    return (
        <HoldContext.Provider value={hold}>
            <div
                ref={outerRef}
                className="w-full"
                role="region"
                aria-roledescription="carousel"
                aria-label={label}
                onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
                onFocus={onFocus}
                onBlur={onBlur}
            >
                <div className="mx-auto overflow-hidden py-6" style={{ width: visible * STEP - GAP + 2 * edge, maxWidth: "100%" }}>
                    <div
                        className="flex items-stretch"
                        style={{
                            gap: GAP,
                            transform: `translateX(${edge - index * STEP}px)`,
                            transition: animate ? `transform ${SLIDE_MS}ms ease-in-out` : "none",
                        }}
                    >
                        {slots.map((item, i) => (
                            <div
                                key={i}
                                ref={(el) => { slotRefs.current[i] = el; }}
                                className="flex-none"
                                style={{ width: CARD_WIDTH }}
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`${(((i - clones) % n) + n) % n + 1} of ${n}`}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-2">
                    <button onClick={() => navigate(-1)} aria-label="Previous project" className="p-0 border-0 bg-transparent text-black-950 rounded-full">
                        <ChevronLeftIcon className="w-7 h-7" />
                    </button>
                    <div className="flex items-center gap-2">
                        {items.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => navigate(i - active)}
                                aria-label={`Go to project ${i + 1}`}
                                aria-current={i === active}
                                className={classNames("p-0 border-0 h-2 rounded-full transition-all duration-300", {
                                    "w-6 bg-purple-600": i === active,
                                    "w-2 bg-black-300": i !== active,
                                })}
                            />
                        ))}
                    </div>
                    <button onClick={() => navigate(1)} aria-label="Next project" className="p-0 border-0 bg-transparent text-black-950 rounded-full">
                        <ChevronRightIcon className="w-7 h-7" />
                    </button>
                </div>
            </div>
        </HoldContext.Provider>
    );
};

export default ProjectCarousel;
