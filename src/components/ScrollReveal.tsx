"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Empty-safe scroll-reveal (spec v4 §Animasyon (a)).
 *
 * Content is rendered fully visible by default — the reveal only ENHANCES an
 * already-visible default. The opacity/translateY start state is applied by the
 * `[data-reveal]` rule in globals.css **only** when JS marks the document
 * `.js-reveal` (set in the effect below) AND the user has not requested reduced
 * motion. So for crawlers, no-JS visitors, prefers-reduced-motion users, or any
 * headless render, the section ships at full opacity and never blanks out
 * (impeccable rule: never gate content visibility on a class-triggered
 * transition).
 *
 * Motion is transform + opacity only (compositor) → CLS 0; the element keeps
 * its box, only its paint shifts. `will-change` is set when armed and cleared
 * once revealed, so no GPU layer lingers.
 *
 * Children may opt into a stagger by carrying `data-reveal-child` — each such
 * descendant gets an index-based delay so a grid cascades in instead of
 * snapping as one block.
 */
export function ScrollReveal({
  as,
  children,
  className,
  /** Per-child stagger step in ms (only applies to [data-reveal-child]). */
  stagger = 60,
  /** Cap so long lists don't wait seconds for the last item. */
  maxStagger = 6,
  ...rest
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  stagger?: number;
  maxStagger?: number;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Honour reduced-motion: arm nothing, leave content at its visible default.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || !("IntersectionObserver" in window)) return;

    // Mark the document so the CSS start-state rule activates. Idempotent.
    document.documentElement.classList.add("js-reveal");

    // Stagger children: stamp an index-derived delay (capped) on opted-in nodes.
    const children = el.querySelectorAll<HTMLElement>("[data-reveal-child]");
    children.forEach((child, i) => {
      child.style.transitionDelay = `${Math.min(i, maxStagger) * stagger}ms`;
    });

    el.setAttribute("data-reveal", "armed");
    el.style.willChange = "transform, opacity";

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target as HTMLElement;
          target.setAttribute("data-reveal", "in");
          obs.unobserve(target);
          // Clear the GPU hint once the one-shot reveal has fired.
          const clear = () => {
            target.style.willChange = "";
          };
          target.addEventListener("transitionend", clear, { once: true });
          // Fallback: ensure the hint is dropped even if transitionend is
          // missed (e.g. property cut short). ~900ms covers the longest reveal.
          window.setTimeout(clear, 900);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [stagger, maxStagger]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
