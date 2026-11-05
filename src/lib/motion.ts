import { useEffect } from "react";

// How far a block has to come into the viewport before it is let in.
export const REVEAL_MARGIN = "0px 0px -10% 0px";
// Blocks arriving together come in one after another; the cap keeps the last
// of a big batch from waiting too long.
const MAX_STEP = 5;

export const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const canAnimate = () =>
    !prefersReducedMotion() && "IntersectionObserver" in window;

/**
 * Arms every `[data-rise]` on the page: each one fades and lifts into place the
 * first time it enters the viewport, then stops being watched. The CSS in
 * index.css only hides `[data-rise]:not([data-in])` under
 * `prefers-reduced-motion: no-preference`, so marking everything `data-in` at
 * once is the still version of the page.
 */
export function useReveal() {
    useEffect(() => {
        const armed = document.querySelectorAll<HTMLElement>("[data-rise]:not([data-in])");

        if (!canAnimate()) {
            armed.forEach(el => el.setAttribute("data-in", ""));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            let step = 0;
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                const el = entry.target as HTMLElement;
                el.style.setProperty("--rise-step", String(Math.min(step++, MAX_STEP)));
                el.setAttribute("data-in", "");
                observer.unobserve(el);
            }
        }, { rootMargin: REVEAL_MARGIN });

        armed.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);
}
