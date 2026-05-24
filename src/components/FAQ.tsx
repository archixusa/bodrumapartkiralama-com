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
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition hover:bg-navy-50/40"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-navy-900">{item.q}</span>
              <ChevronDown
                className={clsx(
                  "h-5 w-5 shrink-0 text-navy-600 transition",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
