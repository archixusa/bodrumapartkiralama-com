type LeadKind = "booking" | "boat" | "car" | "transfer" | "tour" | "general";

interface LeadEvent {
  kind: LeadKind;
  subject?: string;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackLead({ kind, subject }: LeadEvent) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "generate_lead",
    lead_kind: kind,
    subject,
  });

  window.gtag?.("event", "generate_lead", {
    currency: "TRY",
    value: 0,
    lead_kind: kind,
  });

  window.fbq?.("track", "Lead", { content_name: subject ?? kind });
}
