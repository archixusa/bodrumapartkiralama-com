// Server component — pulls the latest APPROVED guest reviews SITE-WIDE from
// Supabase (apartment_reviews) via PostgREST, mirroring the empty-safe pattern
// in ApartmentReviews.tsx. Renders NOTHING when env vars are missing, the
// request fails or there are no approved rows — fabricated content is never
// shown (DESIGN_SPEC.md "v2 EK KURAL: SAHTE YORUM YASAĞI"). No Review /
// AggregateRating JSON-LD is emitted here; structured data stays in the
// layout's LocalBusiness schema (real data, empty-safe).

import { REVIEW_STAR_COLOR } from "@/lib/brand";
import { ANON, DATE_LOCALE, GUEST, HEADING, SUB, pick } from "@/lib/review-i18n";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

interface Review {
  id: string;
  rating: number;
  title: string | null;
  body: string;
  display_mode: "named" | "anonymous";
  display_name: string | null;
  created_at: string;
}

async function fetchLatestApproved(limit: number): Promise<Review[]> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return [];
  }
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/apartment_reviews?status=eq.approved&order=created_at.desc&limit=${limit}&select=id,rating,title,body,display_mode,display_name,created_at`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        next: { revalidate: 300, tags: ["reviews:site"] },
      },
    );
    if (!res.ok) return [];
    return (await res.json()) as Review[];
  } catch (err) {
    console.error("[GuestReviews] fetch failed", err);
    return [];
  }
}

// Sözlükler @/lib/review-i18n'de — ApartmentReviews ile ortak kaynak
// (İ18N bütünlüğü: iki yorum yüzeyi aynı metinleri aynı dilde gösterir).

function Stars({ value }: { value: number }) {
  // role="img": aria-label generic <span> üzerinde ARIA'da desteklenmez —
  // rol verilmeden ekran okuyucular puanı seslendirmez (WCAG 1.1.1/4.1.2).
  return (
    <span
      role="img"
      style={{ display: "inline-flex", gap: 2, color: REVIEW_STAR_COLOR }}
      aria-label={`${value} / 5`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          aria-hidden="true"
          focusable="false"
          width={15}
          height={15}
          viewBox="0 0 24 24"
          fill={n <= value ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

export async function GuestReviews({
  locale,
  max = 3,
}: {
  locale: string;
  max?: number;
}) {
  const limit = Math.min(Math.max(max, 3), 6); // site-wide band: 3–6 reviews
  const reviews = await fetchLatestApproved(limit);

  if (reviews.length === 0) {
    return null; // empty-safe: no approved reviews → section not rendered
  }

  const heading = pick(HEADING, locale);

  return (
    <section className="section section-soft" aria-label={heading}>
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance">{heading}</h2>
          <p className="mt-3 text-muted">{pick(SUB, locale)}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.id} className="card flex h-full flex-col gap-4 p-6">
              <div className="flex items-center justify-between gap-2">
                <Stars value={r.rating} />
                <span className="text-xs text-muted">
                  {new Date(r.created_at).toLocaleDateString(
                    DATE_LOCALE[locale] ?? DATE_LOCALE.en,
                    { day: "numeric", month: "long", year: "numeric" },
                  )}
                </span>
              </div>
              {r.title && <h3 className="text-base">{r.title}</h3>}
              <blockquote className="line-clamp-5 flex-1 whitespace-pre-wrap text-base md:text-[15px] leading-relaxed text-ink/90">
                {r.body}
              </blockquote>
              <figcaption className="mt-auto text-sm font-semibold text-navy-900">
                —{" "}
                {r.display_mode === "anonymous"
                  ? pick(ANON, locale)
                  : (r.display_name ?? pick(GUEST, locale))}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
