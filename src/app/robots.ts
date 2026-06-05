import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.bodrumapartkiralama.com";

/**
 * Robots.txt — served at /robots.txt by Next.js Metadata Files API.
 *
 * Disallowed paths:
 *   - /api/                 server-only routes
 *   - /yorum/               token-gated review pages
 *   - /unsubscribe          confirmation flow, not useful in search
 *   - /newsletter-onayla    confirmation flow, not useful in search
 *
 * AI crawler policy: explicit Allow for major AI search/training bots so we
 * show up in AI Overviews, ChatGPT search, Perplexity, Claude, etc. — citation
 * traffic from these surfaces is real and rising. Bytespider (ByteDance / TikTok
 * training) is blocked because it doesn't drive citation traffic.
 */
const DISALLOWED = ["/api/", "/yorum/", "/unsubscribe", "/newsletter-onayla"];

const AI_BOTS_ALLOW = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // OpenAI search index
  "ChatGPT-User", // ChatGPT on-demand fetch
  "PerplexityBot", // Perplexity index
  "Perplexity-User", // Perplexity on-demand fetch
  "ClaudeBot", // Anthropic
  "Google-Extended", // Gemini / AI Overviews opt-in
  "Applebot-Extended", // Apple Intelligence opt-in
  "CCBot", // Common Crawl (feeds many model trainers)
];

const AI_BOTS_DISALLOW = [
  "Bytespider", // ByteDance / TikTok training — block
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOWED,
      },
      ...AI_BOTS_ALLOW.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOWED,
      })),
      ...AI_BOTS_DISALLOW.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
