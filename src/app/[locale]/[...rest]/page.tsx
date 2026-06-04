import { notFound } from "next/navigation";

/**
 * Catch-all for any unmatched path under a locale.
 *
 * With `localePrefix: "as-needed"`, next-intl middleware rewrites every
 * non-excluded request into the `[locale]` segment. Without a catch-all route
 * here, an unknown path (e.g. /bu-sayfa-yok) would fall through to Next.js's
 * bare framework 404 instead of our branded `[locale]/not-found.tsx`.
 *
 * This route has the lowest routing priority, so real static/dynamic routes
 * (`/apartlar`, `/bodrum/[district]`, `/blog/[slug]`, ...) always win. Anything
 * that reaches here is genuinely unknown, so we render the branded 404 (HTTP
 * 404) inside the full site layout (header/footer/WhatsApp).
 */
export default function CatchAllNotFound() {
  notFound();
}
