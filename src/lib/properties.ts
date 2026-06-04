/**
 * Published property catalogue access (read-only, anon).
 *
 * The live site has NO inventory yet, and the `status` column may not even
 * exist in the live database. This module is therefore **empty-safe by
 * design**: any error — missing env, missing table, missing column, network
 * failure — resolves to an empty array so the page falls back to the
 * offer-based empty state instead of throwing.
 *
 * There is intentionally NO price field anywhere — the site is offer-based.
 */

import type { DistrictSlug } from "@/data/districts";

export interface Property {
  id: string;
  slug: string;
  /** Localized display title. */
  title: { tr: string; en: string; de?: string; ru?: string };
  /** District display name (already proper-cased), e.g. "Gümbet". */
  region: string;
  /** District slug, used for filtering + image fallbacks. */
  regionSlug: DistrictSlug | string;
  bedrooms: number;
  guests: number;
  /** Localized amenity chips. */
  amenities: {
    tr: string[];
    en: string[];
    de?: string[];
    ru?: string[];
  };
  /** Cover image URL (absolute or app-relative). */
  coverImage: string;
}

/** Shape we expect back from the Supabase `properties` table (best-effort). */
interface PropertyRow {
  id?: string | number;
  slug?: string;
  title?: unknown;
  region?: string;
  region_slug?: string;
  bedrooms?: number;
  guests?: number;
  amenities?: unknown;
  cover_image?: string;
  [key: string]: unknown;
}

const PLACEHOLDER_COVER = "/images/hero/bodrum-hero.webp";

/** Coerce an unknown DB value into our localized title shape. */
function toLocalizedTitle(raw: unknown, fallback: string): Property["title"] {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const o = raw as Record<string, unknown>;
    const str = (v: unknown) => (typeof v === "string" ? v : undefined);
    const tr = str(o.tr) ?? fallback;
    return {
      tr,
      en: str(o.en) ?? tr,
      de: str(o.de),
      ru: str(o.ru),
    };
  }
  const s = typeof raw === "string" ? raw : fallback;
  return { tr: s, en: s };
}

/** Coerce an unknown DB value into our localized amenities shape. */
function toLocalizedAmenities(raw: unknown): Property["amenities"] {
  const arr = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const o = raw as Record<string, unknown>;
    const tr = arr(o.tr);
    return {
      tr,
      en: arr(o.en).length ? arr(o.en) : tr,
      de: arr(o.de).length ? arr(o.de) : undefined,
      ru: arr(o.ru).length ? arr(o.ru) : undefined,
    };
  }
  if (Array.isArray(raw)) {
    const flat = arr(raw);
    return { tr: flat, en: flat };
  }
  return { tr: [], en: [] };
}

/** Map a raw DB row to a strongly-typed Property. */
function mapRow(row: PropertyRow): Property {
  const id = String(row.id ?? row.slug ?? crypto.randomUUID());
  const slug = String(row.slug ?? id);
  const title = toLocalizedTitle(row.title, slug);
  return {
    id,
    slug,
    title,
    region: typeof row.region === "string" ? row.region : "",
    regionSlug:
      typeof row.region_slug === "string" ? row.region_slug : "",
    bedrooms: typeof row.bedrooms === "number" ? row.bedrooms : 0,
    guests: typeof row.guests === "number" ? row.guests : 0,
    amenities: toLocalizedAmenities(row.amenities),
    coverImage:
      typeof row.cover_image === "string" && row.cover_image
        ? row.cover_image
        : PLACEHOLDER_COVER,
  };
}

export interface GetPublishedPropertiesOptions {
  /** Optional region filter — matches the `region_slug` column. */
  region?: string;
}

/**
 * Fetch active, published properties ordered by newest first.
 *
 * Uses a direct PostgREST fetch with the public anon key (same pattern as
 * {@link RequestModal}). Empty-safe: returns `[]` on ANY error so the page
 * renders the offer-based empty state without crashing.
 */
export async function getPublishedProperties(
  opts: GetPublishedPropertiesOptions = {}
): Promise<Property[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) return [];

    const params = new URLSearchParams();
    params.set("select", "*");
    params.set("is_active", "eq.true");
    params.set("status", "eq.published");
    params.set("order", "created_at.desc");
    if (opts.region) {
      params.set("region_slug", `eq.${opts.region}`);
    }

    const res = await fetch(
      `${supabaseUrl}/rest/v1/properties?${params.toString()}`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Accept: "application/json",
        },
        // ISR: page sets `revalidate`; keep the fetch on the same cadence.
        next: { revalidate: 60 },
      }
    );

    // A missing table/column returns 400/404 — treat as "no inventory yet".
    if (!res.ok) return [];

    const data = (await res.json()) as unknown;
    if (!Array.isArray(data)) return [];

    return data.map((row) => mapRow(row as PropertyRow));
  } catch {
    // Network error, JSON parse error, missing crypto, etc. — fall back empty.
    return [];
  }
}
