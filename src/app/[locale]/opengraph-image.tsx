import { ImageResponse } from "next/og";

// Dynamic Open Graph image for every route under /[locale].
//
// Next.js file-convention image: this is auto-injected as <meta property="og:image">
// on EVERY page in this segment, INDEPENDENTLY of whatever each route's
// generateMetadata sets in `openGraph` (route-level openGraph objects do not
// override the segment image). Routes that supply their own openGraph.images
// (e.g. blog posts) simply emit an additional, more specific image.
//
// Branded: navy background (no gold), white wordmark + Turkish tagline.
// Renders a real PNG via Satori/ImageResponse so it actually displays in social
// cards (an SVG og:image does not render on Facebook / X / WhatsApp / LinkedIn).

export const runtime = "nodejs";
export const alt = "Bodrum Apart Kiralama — Doğrudan mülk sahibinden";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
            "linear-gradient(135deg, #042C53 0%, #0a1f44 45%, #185FA5 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: 30,
            letterSpacing: 8,
            color: "#9DC3EC",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: "#185FA5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            B
          </div>
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
          Doğrudan mülk sahibinden
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
