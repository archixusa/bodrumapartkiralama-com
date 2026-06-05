import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const SUPABASE_HOST = "ddnigdorbnvnubjejzfu.supabase.co";

/**
 * Content Security Policy.
 *
 * Notes:
 * - `unsafe-inline` / `unsafe-eval` are required by Next.js 14 App Router
 *   (inline bootstrap script, RSC payloads). A nonce-based approach is not
 *   production-ready on Next 14 yet — accepted tradeoff.
 * - `wss://*.supabase.co` enables Supabase Realtime channels (used by
 *   yorum/unsubscribe/newsletter-onayla clients).
 * - `connect.facebook.net` / `*.facebook.com` for Meta Pixel — loaded only
 *   after marketing consent (see Analytics.tsx + CookieConsent).
 * - GA4 uses regional collect endpoints (region1/region2/.../analytics.google.com),
 *   so `*.google-analytics.com` + `*.analytics.google.com` are allowed in
 *   connect-src/img-src rather than enumerating each region.
 * - `*.googletagmanager.com` in frame-src is REQUIRED by the GTM `<noscript>`
 *   fallback iframe (googletagmanager.com/ns.html) rendered in the layout.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://va.vercel-scripts.com https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  `img-src 'self' data: blob: https://${SUPABASE_HOST} https://images.unsplash.com https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://www.facebook.com https://*.facebook.com`,
  "font-src 'self' data: https://fonts.gstatic.com",
  `connect-src 'self' https://${SUPABASE_HOST} wss://${SUPABASE_HOST} https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://www.googletagmanager.com https://api.resend.com https://connect.facebook.net https://www.facebook.com`,
  "frame-src 'self' https://www.google.com https://www.googletagmanager.com https://www.youtube.com https://www.facebook.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Content-Security-Policy", value: CSP },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,

  // Aggressive bundle optimization — modularize tree-shake for hot packages.
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "clsx",
      "@supabase/supabase-js",
      "next-intl",
      "react-markdown",
      "remark-gfm",
      "gray-matter",
    ],
  },

  // Long-term image cache + AVIF/WebP + wider device size buckets.
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2400],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: SUPABASE_HOST },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  /**
   * 301 redirects from dead legacy WordPress/ASP URLs to the correct new
   * pages (SEO migration recovery).
   *
   * IMPORTANT routing facts this map relies on:
   * - localePrefix is "as-needed" with defaultLocale "tr", so Turkish is served
   *   at ROOT. Destinations here are UNPREFIXED (`/apartlar`, NOT `/tr/apartlar`)
   *   to avoid a 301 -> 307 chain.
   * - Canonical district slug is `<name>-apart-kiralama` (see src/data/districts.ts
   *   `urlSlug`), which is also what sitemap.ts emits. Bare district URLs point at
   *   that canonical slug, never at the non-canonical `/bodrum/<bare>` duplicate.
   * - Only sources that currently 404 on production are included; currently-valid
   *   paths (`/apartlar`, `/iletisim`, `/hakkimizda`, `/blog`, `/blog/:slug`,
   *   `/bodrum/:slug`) are intentionally omitted to avoid redirect loops.
   * - www<->apex is handled at the Vercel domain level, not here, to avoid loops.
   */
  async redirects() {
    return [
      // --- Legacy ASP/ASPX home pages -> home ---
      { source: "/anasayfa.aspx", destination: "/", permanent: true },
      { source: "/anasayfa.asp", destination: "/", permanent: true },
      { source: "/default.asp", destination: "/", permanent: true },
      { source: "/index.asp", destination: "/", permanent: true },
      { source: "/index.aspx", destination: "/", permanent: true },

      // --- Legacy apart category URLs -> /apartlar ---
      { source: "/kiralik-apart", destination: "/apartlar", permanent: true },
      { source: "/kiralik-apart/:path*", destination: "/apartlar", permanent: true },
      { source: "/tr/kiralik-apart", destination: "/apartlar", permanent: true },
      { source: "/tr/kiralik-apart/:path*", destination: "/apartlar", permanent: true },
      { source: "/bodrum-apart-kiralama", destination: "/apartlar", permanent: true },
      { source: "/bodrum-apart-kiralama/:path*", destination: "/apartlar", permanent: true },
      { source: "/tr/bodrum-apart-kiralama", destination: "/apartlar", permanent: true },
      { source: "/tr/bodrum-apart-kiralama/:path*", destination: "/apartlar", permanent: true },

      // --- Legacy .asp contact/about -> new pages ---
      { source: "/iletisim.asp", destination: "/iletisim", permanent: true },
      { source: "/hakkimizda.asp", destination: "/hakkimizda", permanent: true },

      // --- Bare district URLs -> canonical /bodrum/<name>-apart-kiralama ---
      { source: "/gumbet", destination: "/bodrum/gumbet-apart-kiralama", permanent: true },
      { source: "/turgutreis", destination: "/bodrum/turgutreis-apart-kiralama", permanent: true },
      { source: "/yalikavak", destination: "/bodrum/yalikavak-apart-kiralama", permanent: true },
      { source: "/bitez", destination: "/bodrum/bitez-apart-kiralama", permanent: true },
      { source: "/ortakent", destination: "/bodrum/ortakent-apart-kiralama", permanent: true },
      { source: "/gundogan", destination: "/bodrum/gundogan-apart-kiralama", permanent: true },

      // --- Legacy WordPress query-style permalinks (?p=<id>) -> /blog ---
      // Use `has` query matcher; the bare `source: "/?p=:id"` syntax is invalid.
      {
        source: "/",
        has: [{ type: "query", key: "p" }],
        destination: "/blog",
        permanent: true,
      },
    ];
  },

  // Security headers + long-cache for static assets.
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
