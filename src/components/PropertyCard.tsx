"use client";

import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { BedDouble, Users, MapPin, ArrowRight } from "lucide-react";
import type { Property } from "@/lib/properties";
import { loc, locArr } from "@/lib/i18n-data";

// Lazy-load the heavy client-only modal so it stays out of the initial bundle.
const RequestModal = dynamic(
  () => import("@/components/RequestModal").then((m) => m.RequestModal),
  { ssr: false },
);

type L = "tr" | "en" | "de" | "ru";

interface Labels {
  /** "Teklif Al" CTA. */
  cta: string;
  /** unit word for guests, e.g. "kişi" / "guests". */
  guestsWord: string;
  /** unit word for bedrooms, e.g. "oda" / "bed". */
  bedroomsWord: string;
}

const defaultLabels: Record<L, Labels> = {
  tr: { cta: "Teklif Al", guestsWord: "kişi", bedroomsWord: "oda" },
  en: { cta: "Get a Quote", guestsWord: "guests", bedroomsWord: "bed" },
  de: { cta: "Angebot erhalten", guestsWord: "Pers.", bedroomsWord: "Zi." },
  ru: { cta: "Получить предложение", guestsWord: "гост.", bedroomsWord: "спал." },
};

interface Props {
  property: Property;
  locale: string;
  labels?: Partial<Labels>;
}

/**
 * Catalogue card for a published property. Built for when inventory exists —
 * unused while the offer-based empty state is shown. Deliberately has NO price.
 */
export function PropertyCard({ property, locale, labels }: Props) {
  const lang = (locale as L) in defaultLabels ? (locale as L) : "en";
  const t = { ...defaultLabels[lang], ...labels };

  const [open, setOpen] = useState(false);

  const title = loc(locale, {
    tr: property.title.tr,
    en: property.title.en,
    de: property.title.de,
    ru: property.title.ru,
  });
  const amenities = locArr(locale, property.amenities);

  return (
    <>
      <article className="card group flex flex-col overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.coverImage}
            alt={title}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          {property.region && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent-400 px-3 py-1 text-xs font-semibold text-navy-900">
              <MapPin className="h-3 w-3" />
              {property.region}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="text-lg">{title}</h3>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            {property.bedrooms > 0 && (
              <span className="inline-flex items-center gap-1">
                <BedDouble className="h-4 w-4 text-navy-600" />
                {property.bedrooms} {t.bedroomsWord}
              </span>
            )}
            {property.guests > 0 && (
              <span className="inline-flex items-center gap-1">
                <Users className="h-4 w-4 text-navy-600" />
                {property.guests} {t.guestsWord}
              </span>
            )}
          </div>

          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {amenities.map((a) => (
                <span key={a} className="chip">
                  {a}
                </span>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setOpen(true)}
            data-lead="property-card-quote"
            className="btn-primary mt-auto w-full justify-center"
            style={{ minHeight: 44 }}
          >
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </article>

      <RequestModal
        open={open}
        onClose={() => setOpen(false)}
        locale={locale}
        prefilled={{ region: property.region, propertyType: title }}
      />
    </>
  );
}
