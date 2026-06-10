"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MessageCircle, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

// Lazy-load the heavy client-only modal so it stays out of the initial bundle —
// it only mounts after the visitor asks for tailored options.
const RequestModal = dynamic(
  () => import("@/components/RequestModal").then((m) => m.RequestModal),
  { ssr: false },
);

type L = "tr" | "en" | "de" | "ru";

interface Props {
  locale: string;
  /** Bare WhatsApp number (digits only, country code first). */
  whatsappNumber: string;
}

const copy: Record<
  L,
  {
    heading: string;
    p1: string;
    p2: string;
    ctaOffer: string;
    ctaWhatsapp: string;
    waText: string;
    trust: string[];
  }
> = {
  tr: {
    heading: "Koleksiyonumuz hazırlanıyor",
    p1: "Şu an sabit bir katalog yayınlamıyoruz. Sahte ilan göstermek yerine, tarihinize ve grubunuza göre size uygun apartları tek tek seçip iletiyoruz.",
    p2: "Tarihinizi ve kişi sayınızı paylaşın; doğrudan mülk sahipleriyle çalıştığımız apartlar arasından size en uygun seçenekleri kısa sürede gönderelim.",
    ctaOffer: "Bana Uygun Apartları Göster",
    ctaWhatsapp: "WhatsApp'tan Sor",
    waText: "Merhaba, Bodrum'da uygun apart arıyorum.",
    trust: ["Doğrudan mülk sahibi", "Aracısız & şeffaf", "7/24 yerel destek"],
  },
  en: {
    heading: "Our collection is being prepared",
    p1: "We don't publish a fixed catalogue right now. Instead of showing fake listings, we hand-pick the apartments that fit your dates and your group.",
    p2: "Share your dates and group size and we'll quickly send you the best options from the apartments we work with — directly with the owners.",
    ctaOffer: "Show Apartments That Fit Me",
    ctaWhatsapp: "Ask on WhatsApp",
    waText: "Hello, I'm looking for a suitable apartment in Bodrum.",
    trust: ["Directly with the owner", "No middlemen, transparent", "24/7 local support"],
  },
  de: {
    heading: "Unsere Auswahl wird vorbereitet",
    p1: "Wir veröffentlichen derzeit keinen festen Katalog. Statt unechte Inserate zu zeigen, wählen wir die Apartments aus, die zu Ihren Reisedaten und Ihrer Gruppe passen.",
    p2: "Teilen Sie uns Ihre Reisedaten und Personenzahl mit — wir senden Ihnen rasch die passendsten Optionen aus den Apartments, mit denen wir direkt bei den Eigentümern arbeiten.",
    ctaOffer: "Passende Apartments anzeigen",
    ctaWhatsapp: "Per WhatsApp fragen",
    waText: "Hallo, ich suche eine passende Ferienwohnung in Bodrum.",
    trust: ["Direkt beim Eigentümer", "Ohne Vermittler, transparent", "Lokaler Support rund um die Uhr"],
  },
  ru: {
    heading: "Наша коллекция готовится",
    p1: "Сейчас мы не публикуем фиксированный каталог. Вместо фальшивых объявлений мы подбираем апартаменты, подходящие под ваши даты и вашу группу.",
    p2: "Назовите ваши даты и число гостей — мы быстро пришлём лучшие варианты из апартаментов, с которыми работаем напрямую у владельцев.",
    ctaOffer: "Показать подходящие апартаменты",
    ctaWhatsapp: "Спросить в WhatsApp",
    waText: "Здравствуйте, ищу подходящие апартаменты в Бодруме.",
    trust: ["Напрямую у владельца", "Без посредников, прозрачно", "Местная поддержка 24/7"],
  },
};

export function EmptyStateOfferBased({ locale, whatsappNumber }: Props) {
  const t = copy[(locale as L) in copy ? (locale as L) : "en"];
  const [open, setOpen] = useState(false);

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    t.waText,
  )}`;

  return (
    <>
      <div className="mx-auto max-w-2xl">
        <div className="card flex flex-col items-center gap-5 p-8 text-center md:p-12">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-turkuaz-500/10 text-turkuaz-600">
            <Sparkles className="h-7 w-7" />
          </span>

          <div className="flex flex-col gap-3">
            <h2 className="text-balance text-2xl md:text-3xl">{t.heading}</h2>
            <p className="text-base md:text-[15px] leading-relaxed text-muted">{t.p1}</p>
            <p className="text-base md:text-[15px] leading-relaxed text-muted">{t.p2}</p>
          </div>

          <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              data-lead="empty-state-offer"
              className="btn-primary w-full justify-center sm:w-auto"
              style={{ minHeight: 48 }}
            >
              {t.ctaOffer}
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              data-lead="empty-state-whatsapp"
              className="btn-secondary w-full justify-center sm:w-auto"
              style={{ minHeight: 48 }}
            >
              <MessageCircle className="h-4 w-4" />
              {t.ctaWhatsapp}
            </a>
          </div>

          {/* Trust micro-signals */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
            {t.trust.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-accent-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
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
