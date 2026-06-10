"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const STORAGE_KEY = "bak-cookie-consent-v1";

interface ConsentState {
  decision: "accept-all" | "necessary-only" | "custom";
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

/**
 * Loads analytics scripts only if the user has granted consent.
 *
 * - Analytics scripts (GTM, GA): require `analytics` consent.
 * - Marketing scripts (Meta Pixel): require `marketing` consent.
 *
 * Returns `null` until the user has made a decision (banner is shown by `CookieConsent`).
 */
export function AnalyticsScripts() {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    setConsent(readConsent());
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ConsentState>).detail;
      if (detail) setConsent(detail);
    };
    window.addEventListener("bak:cookie-consent", handler);
    return () => window.removeEventListener("bak:cookie-consent", handler);
  }, []);

  if (!consent) return null;

  const allowAnalytics = consent.analytics;
  const allowMarketing = consent.marketing;

  return (
    <>
      {allowAnalytics && GTM_ID && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}
      {allowAnalytics && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      )}
      {/* Pazarlama pikseli iki parça (regresyon bulgusu düzeltmesi):
          1) fbq KUYRUK STUB'ı afterInteractive ile erken tanımlanır — ucuz,
             ağ isteği yok. Böylece hydration→lazyOnload penceresindeki
             erken Lead tıklamaları (window.fbq?.('track','Lead') çağrıları,
             src/lib/analytics.ts) kuyruğa girer, sessizce DÜŞMEZ.
          2) Ağır fbevents.js + init/PageView lazyOnload'da kalır — ana
             thread etkileşimden önce bloklanmaz (spec v3 script kuralı). */}
      {allowMarketing && META_PIXEL_ID && (
        <>
          <Script id="meta-pixel-stub" strategy="afterInteractive">
            {`!function(f){if(f.fbq)return;var n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];}(window);`}
          </Script>
          <Script id="meta-pixel-init" strategy="lazyOnload">
            {`(function(b,e,v){var t=b.createElement(e);t.async=!0;t.src=v;var s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);})(document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${META_PIXEL_ID}');fbq('track', 'PageView');`}
          </Script>
        </>
      )}
    </>
  );
}

export function GtmNoScript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
