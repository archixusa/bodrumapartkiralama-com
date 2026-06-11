import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnalyticsScripts, GtmNoScript } from "@/components/Analytics";
import { LeadTracking } from "@/components/LeadTracking";
import { JsonLd } from "@/components/JsonLd";
// Heavy below-fold client-only widgets. The `next/dynamic` + `ssr:false` lazy
// imports live inside this Client Component because Next.js 15 disallows them in
// Server Components.
import {
  SeasonBannerLazy,
  DeferredClientWidgets,
} from "@/components/DeferredClientWidgets";
import { districts } from "@/data/districts";
import { getPhone } from "@/lib/contact";
import { getSiteReviewAggregate } from "@/lib/reviews";

// Font diyeti (LCP bulgusu): 4 woff2 preload'u hero görseliyle bant genişliği
// yarışıyordu. Jakarta'da kullanılmayan 800 elendi (BrandLockup font-bold'a
// indirildi); Fraunces yalnız h1/h2'de 600/700 kullanır — 400/500 elendi ve
// preload kapatıldı (display:swap ile fallback'ten geç takas, LCP'yi bloklamaz).
// Böylece preload yalnız gövde fontunun 2 subset dosyasına iner.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

// "Canlı Akdeniz" display voice (DESIGN_SPEC.md §2): Fraunces — yalnız h1/h2
// (600) ve tek tük 700 vurgu. latin-ext TR glyph'leri için kalır.
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display",
  weight: ["600", "700"],
  preload: false,
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.bodrumapartkiralama.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bodrum Apart Kiralama 2026",
    template: "%s | Bodrumapartkiralama.com",
  },
  description:
    "Bodrum'da aile bütçesine uygun apart kiralama. Gümbet, Turgutreis, Yalıkavak ve diğer bölgelerde günlük kiralık daire. Doğrudan mülk sahibiyle iletişim.",
  applicationName: "Bodrumapartkiralama",
  keywords: [
    "Bodrum apart kiralama",
    "Bodrum kiralık daire",
    "Gümbet apart",
    "Turgutreis apart",
    "Yalıkavak apart",
    "günlük kiralık ev Bodrum",
  ],
  openGraph: {
    type: "website",
    siteName: "Bodrumapartkiralama.com",
    locale: "tr_TR",
    // Default og:image is supplied by the file-convention
    // `app/[locale]/opengraph-image.tsx` (a real branded PNG). It is injected
    // automatically on every route and is not clobbered by route-level
    // `openGraph` objects, so we no longer reference the static SVG here (SVG
    // does not render in social cards).
  },
  twitter: {
    card: "summary_large_image",
    // twitter:image is supplied by `app/[locale]/twitter-image.tsx`.
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      tr: SITE_URL,
      en: `${SITE_URL}/en`,
      de: `${SITE_URL}/de`,
      ru: `${SITE_URL}/ru`,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/icon.svg",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    // Add Google Search Console / Bing verification codes via env when ready.
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#06343B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  // AggregateRating yalnız GERÇEK yorum verisinden (property_review_summary,
  // server-side). Veri yoksa/istek başarısızsa şemaya hiç eklenmez — sahte
  // değer asla (DESIGN_SPEC.md §7).
  const reviewAggregate = await getSiteReviewAggregate();

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "LodgingBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: "Bodrumapartkiralama.com",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/apart-logo-512.png`,
    image: `${SITE_URL}/og-default.svg`,
    description:
      "Bodrum yarımadasında apart kiralama hizmeti veren yerel platform.",
    // Yapısal veri TEK kanonik telefonla beyan edilir: aynı @id varlığı tüm
    // dillerde yayımlandığından locale'e göre değişen numara Google için tek
    // varlığı iki farklı telefonla tanımlardı (NAP çelişkisi). UI'da görünen
    // numara locale'e göre değişebilir; şemadaki NAP sabit kalır.
    telephone: getPhone("tr").tel,
    email: "info@bodrumapartkiralama.com",
    priceRange: "₺₺",
    sameAs: [
      "https://www.facebook.com/BodrumApartKiralama",
      "https://www.instagram.com/bodrumapartkiralama",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bodrum",
      addressRegion: "Muğla",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.0344,
      longitude: 27.4305,
    },
    areaServed: ["Bodrum", ...districts.map((d) => d.name)],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    ...(reviewAggregate
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: reviewAggregate.ratingValue,
            reviewCount: reviewAggregate.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };

  // WebSite düğümü — layout'ta TEK SEFER, her sayfada (spec v3 SEO:
  // "Organization + WebSite JSON-LD (layout'a, tek sefer)").
  // LocalBusiness/LodgingBusiness zaten Organization alt türü olduğundan ayrı
  // bir Organization düğümü AÇILMAZ — publisher #organization'a referans verir.
  // SearchAction ana sayfadaki tekil WebSite düğümünden buraya taşındı.
  const webSiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Bodrumapartkiralama.com",
    // Tek #website varlığı 4 dilde aynı @id ile yayımlanır; inLanguage sayfadan
    // sayfaya değişince aynı varlık çelişen dil beyanı taşıyordu. Site 4 dilde
    // yayın yaptığından dizi olarak sabitlendi (hakem bulgusu).
    inLanguage: ["tr", "en", "de", "ru"],
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/apartlar?district={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang={locale} className={`${jakarta.variable} ${fraunces.variable}`}>
      <head>
        {/* Warm up connections to third-party origins used on every page. */}
        <link
          rel="dns-prefetch"
          href="https://ddnigdorbnvnubjejzfu.supabase.co"
        />
        <link
          rel="preconnect"
          href="https://ddnigdorbnvnubjejzfu.supabase.co"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin=""
        />
      </head>
      <body className="bg-kum-50 font-sans text-ink antialiased">
        <JsonLd data={[localBusinessLd, webSiteLd]} />
        <GtmNoScript />
        <LeadTracking />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-navy-900 focus:px-3 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <SeasonBannerLazy />
          <Header />
          <main id="main" className="min-h-[60vh]">
            {children}
          </main>
          <Footer />
          <DeferredClientWidgets locale={locale} />
          <AnalyticsScripts />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
