"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MessageCircle, ArrowRight } from "lucide-react";
import { getPhone } from "@/lib/contact";

// Lazy-load the heavy client-only modal so it stays out of the initial bundle.
// Chunk yalnız ilk "Teklif al" tıklamasında iner (aşağıdaki `mounted` kapısı) —
// koşulsuz render edilince next/dynamic chunk'ı hydration sonrası HER sayfada
// hemen indiriyordu (regresyon bulgusu).
const RequestModal = dynamic(
  () => import("@/components/RequestModal").then((m) => m.RequestModal),
  { ssr: false },
);

type L = "tr" | "en" | "de" | "ru";

const LABELS: Record<L, { offer: string; wa: string }> = {
  tr: { offer: "Teklif al", wa: "WhatsApp ile iletişime geçin" },
  en: { offer: "Get a quote", wa: "Contact us on WhatsApp" },
  de: { offer: "Angebot erhalten", wa: "Per WhatsApp kontaktieren" },
  ru: { offer: "Получить предложение", wa: "Связаться в WhatsApp" },
};

/**
 * Mobil yapışkan CTA çubuğu (DESIGN_SPEC.md §4): yalnız <md ekranlarda altta
 * sabit WhatsApp + "Teklif al" çifti. WhatsAppFab md+ ekranlarda kalır;
 * mobilde bu çubuk FAB'ın görevini devralır — çakışma olmaz.
 */
export function MobileStickyCta({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  // Modal ilk açılışa kadar hiç mount edilmez → dynamic chunk da inmez.
  const [mounted, setMounted] = useState(false);
  const lang: L = (locale as L) in LABELS ? (locale as L) : "en";
  const t = LABELS[lang];

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-kum-200 bg-kum-50/95 px-3 pb-[max(env(safe-area-inset-bottom),0.625rem)] pt-2.5 backdrop-blur-[14px] md:hidden">
        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${getPhone(locale).wa}`}
            target="_blank"
            rel="noopener noreferrer"
            data-lead="sticky-bar-whatsapp"
            aria-label={t.wa}
            className="btn-whatsapp flex-1"
            style={{ minHeight: 48 }}
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setMounted(true);
              setOpen(true);
            }}
            data-lead="sticky-bar-quote"
            className="btn-primary flex-1"
            style={{ minHeight: 48 }}
          >
            {t.offer}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {mounted && (
        <RequestModal
          open={open}
          onClose={() => setOpen(false)}
          locale={locale}
          prefilled={{}}
        />
      )}
    </>
  );
}
