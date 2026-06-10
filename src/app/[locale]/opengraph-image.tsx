import { ImageResponse } from "next/og";

// Dynamic Open Graph image for every route under /[locale].
//
// Next.js file-convention image: this is auto-injected as <meta property="og:image">
// on EVERY page in this segment, INDEPENDENTLY of whatever each route's
// generateMetadata sets in `openGraph` (route-level openGraph objects do not
// override the segment image). Routes that supply their own openGraph.images
// (e.g. blog posts) simply emit an additional, more specific image.
//
// Branded ("Canlı Akdeniz" + A3 Yelken işareti, DESIGN_SPEC.md §1 + "Logo
// uygulaması"): murekkep→footer koyu degrade, inline yelken işareti (kaynak:
// public/brand/apart-logo-mark.svg, renkler birebir), beyaz somut başlık.
// Renders a real PNG via Satori/ImageResponse so it actually displays in social
// cards (an SVG og:image does not render on Facebook / X / WhatsApp / LinkedIn).

export const runtime = "nodejs";
// Statik alt nötr marka adıyla sınırlı — başlık locale'e göre değiştiği için
// alt'a Türkçe slogan gömülmez (İ18N bütünlüğü bulgusu).
export const alt = "Bodrum Apart Kiralama";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Başlık 4 dilde — [locale] segmentinin file-convention görseli her sayfaya
// auto-inject edildiğinden /en, /de, /ru kartları da kendi dilinde çıkar.
const OG_HEADLINE: Record<string, string> = {
  tr: "Doğrudan mülk sahibinden",
  en: "Directly from the owner",
  de: "Direkt vom Eigentümer",
  ru: "Напрямую от владельца",
};

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const headline = OG_HEADLINE[locale] ?? OG_HEADLINE.en;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundImage:
            "linear-gradient(135deg, #06343B 0%, #0A4A52 45%, #04252B 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark eyebrow — A3 Yelken işareti + harf aralıklı kelime işareti */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: 30,
            letterSpacing: 8,
            color: "#34C8C4",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          <svg width="72" height="72" viewBox="0 0 56 56">
            <path d="M30 6c10 9 14 20 13 31H30z" fill="#0EA5A5" />
            <path d="M26 14c-7 7-10 15-9.5 23H26z" fill="#34C8C4" />
            <path
              d="M8 45c5-3.6 10-3.6 15 0s10 3.6 15 0 7-2.7 10-1.2"
              stroke="#0B7E80"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="45" cy="10" r="5.5" fill="#FFB23E" />
          </svg>
          <span>Bodrum Apart Kiralama</span>
        </div>

        {/* Tagline / headline */}
        <div
          style={{
            marginTop: 40,
            fontSize: 84,
            lineHeight: 1.05,
            color: "#FFFFFF",
            fontWeight: 700,
            maxWidth: 1000,
          }}
        >
          {headline}
        </div>

        {/* Domain */}
        <div
          style={{
            marginTop: 48,
            fontSize: 28,
            color: "#FFFFFF",
            opacity: 0.85,
          }}
        >
          bodrumapartkiralama.com
        </div>
      </div>
    ),
    { ...size },
  );
}
