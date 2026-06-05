"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MessageCircle, ArrowRight } from "lucide-react";

// Lazy-load the heavy client-only modal so it stays out of the initial
// homepage bundle — it only mounts after the offer button is clicked.
const RequestModal = dynamic(
  () => import("@/components/RequestModal").then((m) => m.RequestModal),
  { ssr: false },
);

interface Props {
  locale: string;
  /** Primary "Teklif Al / Get an Offer" label. */
  offerLabel: string;
  /** WhatsApp secondary link label. */
  whatsappLabel: string;
  /** Bare WhatsApp number (digits only, country code first). */
  whatsappNumber: string;
  /** Prefilled WhatsApp message text. */
  whatsappText: string;
}

/**
 * Lean offer-emphasis CTA pair for the homepage: a primary button that opens
 * the lead {@link RequestModal} plus a WhatsApp secondary link. Replaces the
 * removed sample-property grid — honest, offer-based, no prices, no fake cards.
 */
export function OfferCtaButton({
  locale,
  offerLabel,
  whatsappLabel,
  whatsappNumber,
  whatsappText,
}: Props) {
  const [open, setOpen] = useState(false);

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappText,
  )}`;

  return (
    <>
      <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          data-lead="home-offer"
          className="btn-primary w-full justify-center sm:w-auto"
          style={{ minHeight: 48 }}
        >
          {offerLabel}
          <ArrowRight className="h-4 w-4" />
        </button>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          data-lead="home-offer-whatsapp"
          className="btn-secondary w-full justify-center sm:w-auto"
          style={{ minHeight: 48 }}
        >
          <MessageCircle className="h-4 w-4" />
          {whatsappLabel}
        </a>
      </div>

      <RequestModal
        open={open}
        onClose={() => setOpen(false)}
        locale={locale}
        prefilled={{}}
      />
    </>
  );
}
