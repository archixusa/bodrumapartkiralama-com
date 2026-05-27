import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { AnalyticsScripts, GtmNoScript } from "@/components/Analytics";
import { CookieConsent } from "@/components/CookieConsent";
import { SeasonBanner } from "@/components/SeasonBanner";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { JsonLd } from "@/components/JsonLd";
import { districts } from "@/data/districts";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

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
    images: [
      {
        url: "/og-default.svg",
        width: 1200,
        height: 630,
        alt: "Bodrum Apart Kiralama",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.svg"],
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
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: [{ url: "/apple-touch-icon.svg", type: "image/svg+xml" }],
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
  themeColor: "#042C53",
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

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "LodgingBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: "Bodrumapartkiralama.com",
    url: SITE_URL,
    logo: `${SITE_URL}/logo_kare.svg`,
    image: `${SITE_URL}/og-default.svg`,
    description:
      "Bodrum yarımadasında apart kiralama hizmeti veren yerel platform.",
    telephone: "+905385124088",
    email: "info@bodrumapartkiralama.com",
    priceRange: "₺₺",
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
  };

  return (
    <html lang={locale} className={jakarta.variable}>
      <body className="bg-white font-sans text-ink antialiased">
        <JsonLd data={localBusinessLd} />
        <GtmNoScript />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-navy-900 focus:px-3 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <SeasonBanner />
          <Header />
          <main id="main" className="min-h-[60vh]">
            {children}
          </main>
          <Footer />
          <WhatsAppFab />
          <ExitIntentModal />
          <CookieConsent />
          <AnalyticsScripts />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
