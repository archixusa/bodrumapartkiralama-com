"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export interface FAQItem {
  q: string;
  a: string;
}

export function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  // Per-item flag: true once the collapse transition has FINISHED, so the
  // closed panel can leave the a11y tree (aria-hidden + visibility:hidden)
  // without snapping the open animation. Starts true for items that ship
  // closed; the initially-open item (0) starts revealed.
  const [settledClosed, setSettledClosed] = useState<Record<number, boolean>>(
    () =>
      Object.fromEntries(
        items.map((_, idx) => [idx, idx !== 0]),
      ) as Record<number, boolean>,
  );
  const prevReduceRef = useRef<boolean | null>(null);

  const prefersReducedMotion = () => {
    if (prevReduceRef.current !== null) return prevReduceRef.current;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
    prevReduceRef.current = reduce;
    return reduce;
  };

  const toggle = (idx: number) => {
    const willOpen = open !== idx;
    if (willOpen) {
      // Opening: re-enter the a11y tree immediately so the content is exposed
      // as it expands.
      setSettledClosed((s) => ({ ...s, [idx]: false }));
      setOpen(idx);
    } else {
      setOpen(null);
      // Closing: with reduced motion there is no transitionend to wait for,
      // so settle the closed state synchronously.
      if (prefersReducedMotion()) {
        setSettledClosed((s) => ({ ...s, [idx]: true }));
      }
    }
  };

  return (
    <div className="divide-y divide-[var(--color-border)] rounded-xl border border-[var(--color-border)] bg-white">
      {items.map((item, idx) => {
        const isOpen = open === idx;
        // A panel is hidden from the a11y tree only once it is BOTH closed and
        // its collapse transition has settled — never while open or animating.
        const hidden = !isOpen && settledClosed[idx];
        return (
          <div key={idx}>
            <button
              id={`faq-q-${idx}`}
              onClick={() => toggle(idx)}
              className="flex min-h-11 w-full items-start justify-between gap-4 px-5 py-4 text-left transition hover:bg-navy-50/40"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${idx}`}
            >
              <span className="text-base font-semibold text-navy-900">{item.q}</span>
              <ChevronDown
                className={clsx(
                  "h-5 w-5 shrink-0 text-navy-600 transition-transform duration-200 ease-akdeniz",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {/* Answer is ALWAYS in the DOM (crawlable); collapse is a
                grid-template-rows 0fr→1fr transition, not a DOM mount, so there
                is no snap. Once fully closed (transitionend) the panel leaves
                the a11y tree via aria-hidden + visibility:hidden so screen
                readers don't read content that the button reports as collapsed.
                role="region" is bound to its question via aria-labelledby so it
                is a NAMED landmark (no anonymous "region" noise). reduced-motion
                neutralises the transition globally. */}
            <div
              id={`faq-answer-${idx}`}
              role="region"
              aria-labelledby={`faq-q-${idx}`}
              aria-hidden={hidden || undefined}
              onTransitionEnd={(e) => {
                // Only react to the grid-template-rows transition on this node.
                if (e.target !== e.currentTarget) return;
                if (e.propertyName !== "grid-template-rows") return;
                if (!isOpen) setSettledClosed((s) => ({ ...s, [idx]: true }));
              }}
              className={clsx(
                "grid transition-[grid-template-rows] duration-300 ease-akdeniz",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                hidden && "invisible"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-sm leading-relaxed text-muted">
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
