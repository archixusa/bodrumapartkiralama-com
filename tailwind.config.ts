import type { Config } from "tailwindcss";

// ── "Canlı Akdeniz" çekirdek paleti (bodrum-design-preview/DESIGN_SPEC.md §1) ──
// Tek doğruluk kaynağı spec'tir; buradaki hex'ler oradan birebir alınmıştır.
const turkuaz = {
  50: "#E6FAF8",
  300: "#34C8C4",
  500: "#0EA5A5",
  600: "#0B7E80", // metin/link olarak turkuaz (AA kontrast)
};
const begonvil = {
  50: "#FCE7F2",
  500: "#E0218A", // birincil CTA (beyaz metinle)
  600: "#B5176F", // hover / küçük metin
};
const gunes = {
  300: "#FFCB70",
  400: "#FFB23E", // yıldız/rozet/ikon — metin İÇİN DEĞİL
};
const kum = {
  50: "#FFF8F0", // kum-bg — sayfa zemini
  100: "#FBEEDD", // kum-koyu — alternatif bölüm zemini
  200: "#F0E2CF", // kum-cizgi — kenarlıklar
};
const murekkep = {
  700: "#0A4A52", // ikincil koyu
  900: "#06343B", // ana metin (deniz mürekkebi)
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Yeni birinci sınıf token'lar
        turkuaz,
        begonvil,
        gunes,
        kum,
        murekkep,
        footer: "#04252B",
        whatsapp: "#1FAE54",
        // ── Geriye dönük eşleme: eski sınıf adları yeni paleti gösterir ──
        // (sınıf adları kalır, değerler değişir — tüm sayfalar otomatik geçer)
        navy: {
          50: turkuaz[50], //  açık zemin / chip
          100: "#CFEAE6", //   koyu zeminde açık metin
          200: "#9DC4C2", //   koyu zeminde soluk metin
          300: "#7FD6CD", //   açık dalga tonu
          400: turkuaz[300],
          500: turkuaz[500],
          600: turkuaz[600], // metin/link (AA)
          700: murekkep[700],
          800: murekkep[700],
          900: murekkep[900], // başlık / koyu zemin
        },
        sand: kum,
        accent: {
          400: gunes[400], //   yıldız/rozet/dekor (üzerine koyu metin)
          500: begonvil[500], // CTA vurgusu
          600: begonvil[600], // küçük metin için koyu begonvil
        },
        muted: "#5E7A7E",
        ink: murekkep[900],
        success: "#0F6E56",
        warning: "#C2750E",
        danger: "#A32D2D",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "Georgia", "serif"],
      },
      // Spec §3: input/buton 12px · kart 18–26px · hero/CTA panelleri 34px
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "18px",
        xl: "26px",
        "2xl": "34px",
      },
      maxWidth: {
        container: "1200px",
      },
      // Spec §3: yumuşak, mürekkep tonlu gölgeler
      boxShadow: {
        card: "0 8px 24px -16px rgba(6,52,59,.35)",
        cardHover: "0 18px 40px -22px rgba(6,52,59,.45)",
        btn: "0 12px 26px -12px rgba(224,33,138,.75)",
        btnTurkuaz: "0 12px 26px -12px rgba(14,165,165,.7)",
        btnWa: "0 10px 22px -12px rgba(31,174,84,.8)",
      },
      transitionTimingFunction: {
        akdeniz: "cubic-bezier(.2,.7,.2,1)",
      },
    },
  },
  plugins: [],
};
export default config;
