"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export interface FAQItem {
  q: string;
  a: string;
}

export function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-[var(--color-border)] rounded-xl border border-[var(--color-border)] bg-white">
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div key={idx}>
            <button
              onClick={() => setOpen(isOpen ? null : idx)}
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
            {/* Answer is ALWAYS rendered (crawlable + accessible); collapse is a
                grid-template-rows 0fr→1fr transition, not a DOM mount, so there
                is no snap. reduced-motion neutralises the transition globally. */}
            <div
              id={`faq-answer-${idx}`}
              role="region"
              className={clsx(
                "grid transition-[grid-template-rows] duration-300 ease-akdeniz",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
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
