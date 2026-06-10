// Server-only yardımcı: site GENELİ onaylı yorum özeti.
//
// `property_review_summary` görünümündeki (mülk başına review_count +
// average_rating) satırları toplayıp ağırlıklı ortalama üretir. LocalBusiness
// JSON-LD'sindeki AggregateRating YALNIZ bu gerçek veriden beslenir
// (DESIGN_SPEC.md §7) — veri yoksa `null` döner ve şemaya hiç eklenmez.
// Empty-safe: env eksikse, istek başarısızsa veya hiç yorum yoksa `null`.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export interface SiteReviewAggregate {
  /** Ağırlıklı ortalama puan, 1 ondalık basamağa yuvarlanmış (1–5). */
  ratingValue: number;
  /** Onaylı yorumların toplam adedi. */
  reviewCount: number;
}

export async function getSiteReviewAggregate(): Promise<SiteReviewAggregate | null> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/property_review_summary?select=review_count,average_rating`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        next: { revalidate: 3600, tags: ["reviews:aggregate"] },
      },
    );
    if (!res.ok) return null;
    const rows = (await res.json()) as {
      review_count: number | null;
      average_rating: number | null;
    }[];
    if (!Array.isArray(rows)) return null;

    let count = 0;
    let weighted = 0;
    for (const row of rows) {
      const c = Number(row.review_count);
      const avg = Number(row.average_rating);
      if (Number.isFinite(c) && c > 0 && Number.isFinite(avg) && avg > 0) {
        count += c;
        weighted += avg * c;
      }
    }
    if (count === 0) return null;

    return {
      ratingValue: Math.round((weighted / count) * 10) / 10,
      reviewCount: count,
    };
  } catch (err) {
    console.error("[reviews] site aggregate fetch failed", err);
    return null;
  }
}
