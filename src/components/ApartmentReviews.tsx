// Server component — fetches approved reviews for an apartment slug
// directly from Supabase via REST (anon key, RLS allows public read of approved rows).

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
  language: string;
}

interface Summary {
  review_count: number;
  average_rating: number;
}

async function fetchReviews(propertySlug: string): Promise<{ reviews: Review[]; summary: Summary | null }> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return { reviews: [], summary: null };
  }
  try {
    const headers = {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    };

    const [revRes, sumRes] = await Promise.all([
      fetch(
        `${SUPABASE_URL}/rest/v1/apartment_reviews?property_slug=eq.${encodeURIComponent(propertySlug)}&status=eq.approved&order=created_at.desc&limit=20&select=id,rating,title,body,display_mode,display_name,created_at,language`,
        { headers, next: { revalidate: 300, tags: [`reviews:${propertySlug}`] } },
      ),
      fetch(
        `${SUPABASE_URL}/rest/v1/property_review_summary?property_slug=eq.${encodeURIComponent(propertySlug)}&select=review_count,average_rating&limit=1`,
        { headers, next: { revalidate: 300, tags: [`reviews:${propertySlug}`] } },
      ),
    ]);

    const reviews = (revRes.ok ? await revRes.json() : []) as Review[];
    const sumArr = (sumRes.ok ? await sumRes.json() : []) as Summary[];
    return { reviews, summary: sumArr[0] ?? null };
  } catch (err) {
    console.error("[ApartmentReviews] fetch failed", err);
    return { reviews: [], summary: null };
  }
}

function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2, color: "#F59E0B" }} aria-label={`${value} yıldız`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width={size}
          height={size}
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

export async function ApartmentReviews({
  propertySlug,
  locale,
}: {
  propertySlug: string;
  locale: string;
}) {
  const { reviews, summary } = await fetchReviews(propertySlug);
  const isTr = locale === "tr";

  if (!summary || summary.review_count === 0) {
    return null; // No reviews yet — render nothing
  }

  return (
    <section
      style={{
        marginTop: 48,
        paddingTop: 32,
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
      aria-label={isTr ? "Misafir değerlendirmeleri" : "Guest reviews"}
    >
      <header style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 28, marginBottom: 8 }}>
          {isTr ? "Misafir Değerlendirmeleri" : "Guest Reviews"}
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <Stars value={Math.round(summary.average_rating)} size={20} />
          <span style={{ fontSize: 18, fontWeight: 600 }}>
            {Number(summary.average_rating).toFixed(1)} / 5
          </span>
          <span style={{ color: "#64748B", fontSize: 14 }}>
            ({summary.review_count} {isTr ? "değerlendirme" : "reviews"})
          </span>
        </div>
      </header>

      <div style={{ display: "grid", gap: 16 }}>
        {reviews.map((r) => (
          <article
            key={r.id}
            style={{
              padding: 16,
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 12,
              background: "#fff",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
              <div>
                <Stars value={r.rating} size={14} />
                {r.title && (
                  <h3 style={{ fontSize: 16, margin: "6px 0 0" }}>{r.title}</h3>
                )}
              </div>
              <span style={{ fontSize: 13, color: "#64748B" }}>{formatDate(r.created_at, locale)}</span>
            </div>
            <p style={{ margin: "0 0 8px", lineHeight: 1.6, fontSize: 15, color: "#1E293B", whiteSpace: "pre-wrap" }}>
              {r.body}
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "#475569", fontWeight: 500 }}>
              — {r.display_mode === "anonymous" ? (isTr ? "Anonim Misafir" : "Anonymous Guest") : r.display_name ?? (isTr ? "Misafir" : "Guest")}
            </p>
          </article>
        ))}
      </div>

      {summary.review_count > 20 && (
        <p style={{ marginTop: 16, fontSize: 13, color: "#64748B", textAlign: "center" }}>
          {isTr ? "Son 20 değerlendirme gösteriliyor." : "Showing latest 20 reviews."}
        </p>
      )}
    </section>
  );
}
