import type { Metadata } from "next";

/**
 * Canonical site origin (www). Mirrors the value used across pages/layout so a
 * single helper builds every absolute SEO URL consistently.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.bodrumapartkiralama.com";

/**
 * Build the absolute, locale-aware URL for a given locale + path.
 *
 * `localePrefix: "as-needed"` means Turkish (the default locale) lives at the
 * ROOT (no /tr prefix) while en/de/ru are prefixed. So:
 *   buildLocaleUrl("tr", "/apartlar")  -> https://www.bodrumapartkiralama.com/apartlar
 *   buildLocaleUrl("en", "/apartlar")  -> https://www.bodrumapartkiralama.com/en/apartlar
 *   buildLocaleUrl("tr", "")           -> https://www.bodrumapartkiralama.com
 *
 * @param locale  one of "tr" | "en" | "de" | "ru"
 * @param path    path WITHOUT a locale prefix and WITHOUT a trailing slash,
 *                starting with "/" (or "" for the homepage).
 */
export function buildLocaleUrl(locale: string, path: string): string {
  const clean = path === "/" ? "" : path; // homepage root, no trailing slash
  return locale === "tr"
    ? `${SITE_URL}${clean}`
    : `${SITE_URL}/${locale}${clean}`;
}

/**
 * Build a Next.js Metadata `alternates` block with a self-referencing canonical
 * (for the current locale) plus a full hreflang set for all four locales and an
 * `x-default` pointing at the Turkish/root URL.
 *
 * Apply this in `generateMetadata` of every indexable route:
 *   alternates: buildAlternates(locale, "/apartlar")
 *
 * @param currentLocale  the locale of the page being rendered (drives canonical)
 * @param path           path WITHOUT a locale prefix, starting with "/" (or ""
 *                       for the homepage). Build dynamic paths from the slug,
 *                       e.g. `/blog/${slug}` or `/bodrum/${urlSlug}`.
 */
/**
 * Default branded OG/Twitter image for a route, pointing at the dynamic
 * `app/[locale]/opengraph-image.tsx` PNG.
 *
 * Why this exists: Next.js auto-injects the file-convention OG image only when a
 * route does NOT return its own `openGraph` object. Almost every page here sets
 * `openGraph: { title, description, url }`, which OVERRIDES the inherited image
 * and drops `og:image` entirely. Spreading `defaultOgImages(locale)` into a
 * route's `openGraph`/`twitter` restores the branded image on those pages.
 *
 * Routes that already set a more specific image (e.g. a blog hero) should keep
 * their own `images` and skip this helper.
 */
export function defaultOgImages(currentLocale: string): {
  openGraph: { images: { url: string; width: number; height: number; alt: string }[] };
  twitter: { images: string[] };
} {
  // The dynamic image lives at the metadata route `/[locale]/opengraph-image`.
  // With `localePrefix: "as-needed"`, the default locale (tr) is served WITHOUT
  // a prefix (`/opengraph-image`) — the prefixed `/tr/opengraph-image` 307s to
  // it — while en/de/ru are prefixed. Emit the final (non-redirecting) URL so
  // social crawlers fetch the PNG directly. metadataBase makes it absolute.
  const url =
    currentLocale === "tr"
      ? "/opengraph-image"
      : `/${currentLocale}/opengraph-image`;
  const alt = "Bodrum Apart Kiralama — Doğrudan mülk sahibinden";
  return {
    openGraph: { images: [{ url, width: 1200, height: 630, alt }] },
    twitter: { images: [url] },
  };
}

export function buildAlternates(
  currentLocale: string,
  path: string,
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: buildLocaleUrl(currentLocale, path),
    languages: {
      tr: buildLocaleUrl("tr", path),
      en: buildLocaleUrl("en", path),
      de: buildLocaleUrl("de", path),
      ru: buildLocaleUrl("ru", path),
      "x-default": buildLocaleUrl("tr", path),
    },
  };
}
