import type { Config } from "tailwindcss";

// ── "Canlı Akdeniz" çekirdek paleti (bodrum-design-preview/DESIGN_SPEC.md §1) ──
// Tek doğruluk kaynağı spec'tir; ÇEKİRDEK hex'ler oradan alınmıştır.
// Spec'te OLMAYAN belgeli türevler (spec tablosuna işlenene kadar burada):
//   turkuaz-100/200  → hero degrade/dalga ara tonları (YALNIZ dekor)
//   turkuaz-700      → "hover turkuaz-700/koyu" kuralının hex karşılığı
//   navy-100/200/300 → koyu zemin üzerindeki açık metin/dekor tonları
const turkuaz = {
  50: "#E6FAF8",
  100: "#CFEFEA", // türev — hero degrade ara tonu (yalnız dekor)
  200: "#A9E4DD", // türev — hero degrade/dalga açık tonu (yalnız dekor)
  300: "#34C8C4",
  500: "#0EA5A5",
  600: "#0B7E80", // metin/link + birincil CTA zemini (AA kontrast)
  700: "#06676A", // türev — birincil CTA hover (koyu turkuaz)
};
// v2: BEGONVİL/PEMBE TAMAMEN KALDIRILDI (DESIGN_SPEC.md "v2 DEĞİŞİKLİĞİ").
// Eski `begonvil-*` sınıf adları kırılmasın diye token'lar turkuaza eşitlendi.
const begonvil = {
  50: turkuaz[50], //  = turkuaz-50
  500: turkuaz[600], // = turkuaz-600 (CTA zemini, beyaz metin)
  600: turkuaz[700], // = turkuaz-700 (hover / koyu)
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
        // WhatsApp yeşilleri: buton zeminleri KOYU ton (beyaz metinle 5.02:1,
        // AA) — açık platform yeşili #1FAE54 beyazla 2.90:1 verdiğinden
        // YALNIZ ikon/dekor vurgusu olarak kullanılır (brand).
        whatsapp: {
          DEFAULT: "#15803D", // buton/pill zemini (beyaz metin, AA)
          dark: "#166534", //    hover (beyazla 7.13:1)
          brand: "#1FAE54", //   platform yeşili — yalnız ikon/dekor
        },
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
          400: gunes[400], //   YALNIZ yıldız ikonu/puan (v2 kuralı)
          500: turkuaz[600], // CTA/vurgu (v2: begonvil yerine turkuaz)
          600: turkuaz[700], // koyu vurgu / hover
        },
        // Soluk metin — spec'in #5E7A7E'si kum-100/turkuaz-50 zeminlerde 4.5:1
        // altında kaldığından koyulaştırıldı; ÜÇ REPO ORTAK değer (spec §1
        // kontrast kuralları): kum-100'de 4.78:1, turkuaz-50'de 5.05:1.
        muted: "#546E70",
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
        btn: "0 12px 26px -12px rgba(11,126,128,.65)",
        btnTurkuaz: "0 12px 26px -12px rgba(14,165,165,.7)",
        btnWa: "0 10px 22px -12px rgba(21,128,61,.8)",
      },
      backgroundImage: {
        // Koyu hero degradesi (murekkep-900 → murekkep-700 → footer-bg) —
        // evinizi-kiraya-verin hero'su gibi koyu bantlarda kullanılır.
        "hero-gradient":
          "linear-gradient(165deg,#06343B 0%,#0A4A52 55%,#04252B 100%)",
      },
      transitionTimingFunction: {
        akdeniz: "cubic-bezier(.2,.7,.2,1)",
      },
    },
  },
  plugins: [],
};
export default config;
