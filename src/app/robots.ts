import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

/**
 * Robots.txt — served at /robots.txt by Next.js Metadata Files API.
 *
 * Output:
 *   User-agent: *
 *   Allow: /
 *   Disallow: /api/
 *   Sitemap: <SITE_URL>/sitemap.xml
 *   Host:    <SITE_URL>
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/yorum/", "/unsubscribe"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
