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
 * - `connect.facebook.net` / `www.facebook.com` for Meta Pixel — loaded only
 *   after marketing consent (see Analytics.tsx + CookieConsent).
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  `img-src 'self' data: blob: https://${SUPABASE_HOST} https://images.unsplash.com https://www.google-analytics.com https://www.googletagmanager.com https://www.facebook.com`,
  "font-src 'self' data: https://fonts.gstatic.com",
  `connect-src 'self' https://${SUPABASE_HOST} wss://${SUPABASE_HOST} https://www.google-analytics.com https://region1.google-analytics.com https://api.resend.com https://www.facebook.com`,
  "frame-src 'self' https://www.google.com https://www.youtube.com https://www.facebook.com",
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
  images: {
    remotePatterns: [
      { protocol: "https", hostname: SUPABASE_HOST },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
