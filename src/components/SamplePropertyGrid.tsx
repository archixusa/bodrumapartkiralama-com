"use client";

import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { BedDouble, Users, MapPin, ArrowRight } from "lucide-react";
import type { RequestModalPrefill } from "@/components/RequestModal";
import { sampleProperties } from "@/lib/sample-properties";
import { loc } from "@/lib/i18n-data";

// Lazy-load the heavy client-only modal so it stays out of the initial
// homepage bundle — it only renders after a card's quote button is clicked.
const RequestModal = dynamic(
  () => import("@/components/RequestModal").then((m) => m.RequestModal),
  { ssr: false },
);

export interface SamplePropertyGridLabels {
  /** Badge marking the card as a representative sample. */
  sampleBadge: string;
  /** "Bu tip için teklif al" button. */
  cta: string;
  /** unit suffix-free guest label, e.g. "guests" / "kişi" */
  guestsWord: string;
  /** bedroom word, e.g. "bedroom" / "yatak odası" */
  bedroomsWord: string;
}

export function SamplePropertyGrid({
  locale,
  labels,
}: {
  locale: string;
  labels: SamplePropertyGridLabels;
}) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<RequestModalPrefill>({});

  const openFor = (region: string, propertyType: string) => {
    setPrefill({ region, propertyType });
    setOpen(true);
  };

  return (
    <>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sampleProperties.map((p) => {
          const title = loc(locale, p.title);
          const amenities = (() => {
            switch (locale) {
              case "tr":
                return p.amenities.tr;
              case "de":
                return p.amenities.de;
              case "ru":
                return p.amenities.ru;
              default:
                return p.amenities.en;
            }
          })();
          return (
            <article key={p.id} className="card group flex flex-col overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.image}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                {/* "Örnek" sample badge */}
                <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-navy-900/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {labels.sampleBadge}
                </span>
                {/* Region badge */}
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent-400 px-3 py-1 text-xs font-semibold text-navy-900">
                  <MapPin className="h-3 w-3" />
                  {p.region}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-lg">{title}</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                  <span className="inline-flex items-center gap-1">
                    <BedDouble className="h-4 w-4 text-navy-600" />
                    {p.bedrooms} {labels.bedroomsWord}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-4 w-4 text-navy-600" />
                    {p.guests} {labels.guestsWord}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {amenities.map((a) => (
                    <span key={a} className="chip">
                      {a}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => openFor(p.region, title)}
                  data-lead="sample-quote"
                  className="btn-primary mt-auto w-full justify-center"
                  style={{ minHeight: 44 }}
                >
                  {labels.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <RequestModal
        open={open}
        onClose={() => setOpen(false)}
        locale={locale}
        prefilled={prefill}
      />
    </>
  );
}
