"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Empty-safe scroll-reveal (spec v4 §Animasyon (a) + v7 orkestrasyon incelmesi).
 *
 * Content is rendered fully visible by default — the reveal only ENHANCES an
 * already-visible default. The opacity/translateY start state is applied by the
 * `[data-reveal]` / `[data-reveal-child="armed"]` rules in globals.css **only**
 * when JS marks the document `.js-reveal` (set in the effect below) AND the
 * user has not requested reduced motion. So for crawlers, no-JS visitors,
 * prefers-reduced-motion users, or any headless render, the section ships at
 * full opacity and never blanks out (impeccable rule: never gate content
 * visibility on a class-triggered transition).
 *
 * Motion is transform + opacity only (compositor) → CLS 0; the element keeps
 * its box, only its paint shifts. `will-change` is set just before each
 * element's own transition and cleared once it lands, so no GPU layer lingers.
 *
 * v7 — batch orchestration: children opted in via `data-reveal-child` are now
 * observed INDIVIDUALLY (the native equivalent of GSAP ScrollTrigger.batch()).
 * Previously the whole grid armed when the CONTAINER crossed the threshold, so
 * below-the-fold cards played their entrance while still off-screen and sat
 * "finished" by the time the user scrolled to them. Now each child reveals as
 * IT enters; children crossing in the same IntersectionObserver callback form
 * a batch sharing one stagger ramp — desktop grids cascade row by row, mobile
 * stacks cascade card by card, and the cascade always happens ON SCREEN.
 * DÜRÜST KARAR (spec v7): bu, ~30 satır native IO ile çözülüyor; GSAP/anime.js
 * bundle maliyetini (23–60KB gz) haklı çıkaracak ek bir değer yok.
 */
export function ScrollReveal({
  as,
  children,
  className,
  /** Per-child stagger step in ms (only applies to [data-reveal-child]). */
  stagger = 60,
  /** Cap so a same-batch row never waits long for its last item. */
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

    // Mark the document so the CSS start-state rules activate. Idempotent.
    document.documentElement.classList.add("js-reveal");

    const items = Array.from(
      el.querySelectorAll<HTMLElement>("[data-reveal-child]"),
    );

    // Arm container + children. Each child owns its state — the server-rendered
    // attribute value ("", "true") matches no hidden rule, so pre-JS HTML is
    // always fully visible (empty-safe).
    el.setAttribute("data-reveal", "armed");
    items.forEach((item) => item.setAttribute("data-reveal-child", "armed"));

    /** Reveal one element after `delay` ms. The GPU hint lives only for the
     *  element's own transition window (will-change discipline). */
    const reveal = (
      target: HTMLElement,
      attr: "data-reveal" | "data-reveal-child",
      delay: number,
    ) => {
      target.style.transitionDelay = delay ? `${delay}ms` : "";
      target.style.willChange = "transform, opacity";
      target.setAttribute(attr, "in");
      const clear = () => {
        target.style.willChange = "";
        target.style.transitionDelay = "";
      };
      target.addEventListener("transitionend", clear, { once: true });
      // Fallback: ensure the hint drops even if transitionend is missed
      // (property cut short). delay + ~600ms transition + buffer.
      window.setTimeout(clear, delay + 900);
    };

    // Container: threshold 0 → un-hides as soon as its first pixel crosses
    // the line, ALWAYS at-or-before its first child (children sit inside it;
    // a tall grid at 0.15 would otherwise reveal after its first card and
    // swallow that card's transition behind the still-hidden parent).
    const ioSelf = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          obs.unobserve(entry.target);
          reveal(entry.target as HTMLElement, "data-reveal", 0);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    const ioChildren = new IntersectionObserver(
      (entries, obs) => {
        // Everything that crossed in this frame forms one stagger batch, in
        // DOM order (entries usually arrive in observe order — sort defends
        // against engines that don't guarantee it).
        const batch = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .sort((a, b) =>
            a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
              ? -1
              : 1,
          );
        batch.forEach((target, i) => {
          obs.unobserve(target);
          reveal(target, "data-reveal-child", Math.min(i, maxStagger) * stagger);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    ioSelf.observe(el);
    items.forEach((item) => ioChildren.observe(item));
    return () => {
      ioSelf.disconnect();
      ioChildren.disconnect();
    };
  }, [stagger, maxStagger]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
