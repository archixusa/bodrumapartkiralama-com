// Server-only: this module imports `next/headers` (draftMode), which Next.js
// only allows in Server Components / Route Handlers — never in client bundles.
import { draftMode } from "next/headers";

/**
 * DB-backed content engine (Supabase `site_content` table).
 *
 * Table shape:
 *   site (text) | section_key (text) | draft (jsonb) | published (jsonb)
 *
 * Anon may SELECT rows where `published` is not null. Localized JSON per row, e.g.
 *   { "tr": {...}, "en": {...}, "de": {...}, "ru": {...} }
 *
 * EMPTY-SAFE: every public function returns `null` on miss / any error so the
 * site never breaks. Pages fall back to in-code defaults.
 */

/** This site's key in the `site_content.site` column. */
export const SITE = "bodrumapartkiralama";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

type ContentRow = {
  draft: unknown | null;
  published: unknown | null;
};

/**
 * Fetch one section of localized content for this site.
 *
 * - In Next.js draft mode → returns the `draft` payload (uncached).
 * - Otherwise → returns the `published` payload (ISR, revalidate 60s, tagged).
 *
 * Returns `null` on any miss or error (never throws).
 *
 * Usage:
 *   const hero = (await getSiteContent<HeroByLocale>("home.hero")) ?? HOME_HERO_DEFAULT;
 *   const copy = hero[locale] ?? hero.en;
 */
export async function getSiteContent<T>(sectionKey: string): Promise<T | null> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;

  let isDraft = false;
  try {
    // draftMode() is sync in Next 14 and async-shaped in Next 15; await is safe for both.
    isDraft = (await draftMode()).isEnabled;
  } catch {
    isDraft = false;
  }

  // Select draft + published; pick based on draft mode after the fetch.
  const url =
    `${SUPABASE_URL}/rest/v1/site_content` +
    `?site=eq.${encodeURIComponent(SITE)}` +
    `&section_key=eq.${encodeURIComponent(sectionKey)}` +
    `&select=draft,published`;

  try {
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Accept: "application/json",
      },
      // Draft mode must always be fresh; normal mode uses ISR.
      ...(isDraft
        ? { cache: "no-store" as const }
        : {
            next: {
              revalidate: 60,
              tags: ["site_content", `content:${sectionKey}`],
            },
          }),
    });

    if (!res.ok) return null;

    const rows = (await res.json()) as ContentRow[] | null;
    if (!Array.isArray(rows) || rows.length === 0) return null;

    const row = rows[0];
    const payload = isDraft ? (row.draft ?? row.published) : row.published;
    if (payload == null) return null;

    return payload as T;
  } catch {
    return null;
  }
}

/**
 * Pick the value for `locale` from a localized record, falling back to `fallback`
 * (typically the English entry). Small helper for `content[locale] ?? content.en`.
 */
export function pick<T>(
  locale: string,
  byLocale: Record<string, T>,
  fallback: T,
): T {
  return byLocale[locale] ?? fallback;
}
