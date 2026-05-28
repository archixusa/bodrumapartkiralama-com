"use client";

import { useEffect } from "react";
import { trackLead } from "@/lib/analytics";

/**
 * Global lead-click tracker.
 *
 * Attaches a single delegated, capture-phase click listener on `document`.
 * Any click whose target (or an ancestor) is an `<a>` is inspected:
 *   - href contains wa.me / api.whatsapp.com  → trackLead({ kind: "whatsapp" })
 *   - href starts with tel:                    → trackLead({ kind: "call" })
 *
 * Because the listener lives on `document`, it catches links rendered inside
 * server components too — server-rendered anchors are plain DOM by the time
 * a real user clicks, so delegation works regardless of which component
 * (client or server) emitted the `<a>`.
 *
 * The listener is passive and never calls preventDefault, so navigation is
 * not blocked. Clicks are deduped within a short window to avoid double-firing
 * from synthetic/bubbled events on the same element.
 */
export function LeadTracking() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    let lastFired = 0;
    let lastEl: EventTarget | null = null;

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target || typeof target.closest !== "function") return;

      const anchor = target.closest("a");
      if (!anchor) return;

      // Resolve href: getAttribute keeps tel: intact; href property would
      // resolve relative URLs but for wa.me detection either works.
      const rawHref = anchor.getAttribute("href") || "";
      const href = rawHref.toLowerCase();
      if (!href) return;

      let kind: "whatsapp" | "call" | null = null;
      if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
        kind = "whatsapp";
      } else if (href.startsWith("tel:")) {
        kind = "call";
      }
      if (!kind) return;

      // Dedupe: ignore repeated events on the same element within 500ms.
      const now = Date.now();
      if (anchor === lastEl && now - lastFired < 500) return;
      lastEl = anchor;
      lastFired = now;

      if (kind === "whatsapp") {
        const subject =
          anchor.getAttribute("data-lead") ||
          (typeof window !== "undefined" ? window.location.pathname : undefined) ||
          undefined;
        trackLead({ kind: "whatsapp", subject });
      } else {
        trackLead({ kind: "call" });
      }
    };

    // Capture phase + passive: runs before bubbling handlers, never blocks nav.
    document.addEventListener("click", onClick, { capture: true, passive: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);

  return null;
}
