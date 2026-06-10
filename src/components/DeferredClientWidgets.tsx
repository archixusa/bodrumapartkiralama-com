"use client";

import dynamic from "next/dynamic";

/**
 * Client-only wrapper for heavy, below-fold widgets.
 *
 * Next.js 15 disallows `next/dynamic` with `{ ssr: false }` inside Server
 * Components, so the lazy imports live here in a Client Component instead.
 * Behavior is unchanged: these widgets stay client-only and load lazily so
 * they don't block LCP.
 */
const SeasonBanner = dynamic(
  () => import("@/components/SeasonBanner").then((m) => m.SeasonBanner),
  { ssr: false },
);
const WhatsAppFab = dynamic(
  () => import("@/components/WhatsAppFab").then((m) => m.WhatsAppFab),
  { ssr: false },
);
const MobileStickyCta = dynamic(
  () => import("@/components/MobileStickyCta").then((m) => m.MobileStickyCta),
  { ssr: false },
);
const ExitIntentModal = dynamic(
  () => import("@/components/ExitIntentModal").then((m) => m.ExitIntentModal),
  { ssr: false },
);
const CookieConsent = dynamic(
  () => import("@/components/CookieConsent").then((m) => m.CookieConsent),
  { ssr: false },
);
const ScrollToTop = dynamic(
  () => import("@/components/ScrollToTop").then((m) => m.ScrollToTop),
  { ssr: false },
);

export function SeasonBannerLazy() {
  return <SeasonBanner />;
}

export function DeferredClientWidgets({ locale }: { locale: string }) {
  return (
    <>
      <WhatsAppFab locale={locale} />
      <MobileStickyCta locale={locale} />
      <ScrollToTop locale={locale} />
      <ExitIntentModal />
      <CookieConsent />
    </>
  );
}
