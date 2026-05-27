import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

/**
 * Robots.txt — served at /robots.txt by Next.js Metadata Files API.
 *
 * Disallowed paths:
 *   - /api/                 server-only routes
 *   - /yorum/               token-gated review pages
 *   - /unsubscribe          confirmation flow, not useful in search
 *   - /newsletter-onayla    confirmation flow, not useful in search
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/yorum/", "/unsubscribe", "/newsletter-onayla"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
