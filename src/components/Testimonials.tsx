"use client";

import { useLocale } from "next-intl";
import { reviews as allReviews } from "@/data/reviews";
import { loc } from "@/lib/i18n-data";

type L = "tr" | "en" | "de" | "ru";

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
      ? "Bodrum'da tatilini bizimle planlayan ailelerden anılar."
      : pick === "de"
        ? "Eindrücke von Familien, die ihren Bodrum-Urlaub mit uns geplant haben."
        : pick === "ru"
          ? "Впечатления семей, спланировавших отдых в Бодруме вместе с нами."
          : "Stories from families who planned their Bodrum stay with us.";

  const heading = title ?? defaultHeading;
  const sub = subtitle ?? defaultSub;

  // NOTE (E-E-A-T / review-schema authenticity):
  // These testimonial cards are illustrative marketing copy from `data/reviews.ts`,
  // NOT verified, individually-attributable review records. We therefore do NOT
  // emit AggregateRating / Review JSON-LD here and do NOT surface a numeric
  // star-average to users — fabricated machine-readable review schema is a
  // Google manual-action risk and erodes AI/search trust. Real, verified
  // guest reviews (Supabase-backed) drive ApartmentReviews.tsx on property
  // pages; structured review data should originate only from that real source.

  return (
    <section
      className="section section-soft"
      aria-label={heading}
    >
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance">{heading}</h2>
          {sub && <p className="mt-3 text-muted">{sub}</p>}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r) => (
            <figure key={r.id} className="card flex h-full flex-col gap-4 p-6">
              <blockquote className="flex-1 text-[15px] leading-relaxed text-ink/90">
                “{loc(locale, { tr: r.textTr, en: r.textEn })}”
              </blockquote>
              <figcaption className="mt-auto text-sm">
                <span className="font-semibold text-navy-900">{r.author}</span>
                <span className="text-muted">
                  {" · "}
                  {r.city}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
