"use client";

import { useLocale } from "next-intl";
import { Star } from "lucide-react";
import { reviews as allReviews } from "@/data/reviews";
import { loc } from "@/lib/i18n-data";
import { JsonLd } from "@/components/JsonLd";

const ACCENT = "#F26A1E";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

type L = "tr" | "en" | "de" | "ru";

function Stars({ value }: { value: number }) {
  const v = Math.round(value);
  return (
    <span
      className="inline-flex items-center gap-0.5"
      style={{ color: ACCENT }}
      aria-label={`${v}/5`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className="h-4 w-4"
          fill={n <= v ? ACCENT : "none"}
          strokeWidth={1.75}
        />
      ))}
    </span>
  );
}

export function Testimonials({
  district,
  max = 3,
  title,
  subtitle,
}: {
  district?: string;
  max?: number;
  title?: string;
  subtitle?: string;
}) {
  const locale = useLocale();
  const pick = locale as L;

  // Pick reviews: filter by district when given, but fall back to all
  // if fewer than 2 match so the section never looks thin.
  let pool = allReviews;
  if (district) {
    const matched = allReviews.filter((r) => r.district === district);
    pool = matched.length >= 2 ? matched : allReviews;
  }
  const shown = pool.slice(0, Math.max(0, max));

  if (shown.length === 0) return null;

  const defaultHeading =
    pick === "tr"
      ? "Misafirlerimiz ne diyor?"
      : pick === "de"
        ? "Was unsere Gäste sagen"
        : pick === "ru"
          ? "Что говорят наши гости"
          : "What our guests say";
  const defaultSub =
    pick === "tr"
      ? "Bodrum'da tatilini bizimle planlayan ailelerden gerçek yorumlar."
      : pick === "de"
        ? "Echte Bewertungen von Familien, die ihren Bodrum-Urlaub mit uns geplant haben."
        : pick === "ru"
          ? "Реальные отзывы семей, спланировавших отдых в Бодруме вместе с нами."
          : "Real reviews from families who planned their Bodrum stay with us.";

  const heading = title ?? defaultHeading;
  const sub = subtitle ?? defaultSub;

  const avg =
    shown.reduce((sum, r) => sum + r.rating, 0) / shown.length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: "Bodrumapartkiralama.com",
    url: SITE_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Number(avg.toFixed(1)),
      reviewCount: shown.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: shown.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: loc(locale, { tr: r.textTr, en: r.textEn }),
    })),
  };

  return (
    <section
      className="section section-soft"
      aria-label={heading}
    >
      <JsonLd data={jsonLd} />
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance">{heading}</h2>
          {sub && <p className="mt-3 text-muted">{sub}</p>}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r) => (
            <figure key={r.id} className="card flex h-full flex-col gap-4 p-6">
              <Stars value={r.rating} />
              <blockquote className="flex-1 text-[15px] leading-relaxed text-ink/90">
                “{loc(locale, { tr: r.textTr, en: r.textEn })}”
              </blockquote>
              <figcaption className="mt-auto text-sm">
                <span className="font-semibold text-navy-900">{r.author}</span>
                <span className="text-muted">
                  {" · "}
                  {r.city}
                  {" · "}
                  {r.source}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
