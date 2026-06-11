import clsx from "clsx";

// ── "A3 Yelken" marka kimliği (DESIGN_SPEC.md "Logo uygulaması") ─────────────
// Kaynak işaret: public/brand/apart-logo-mark.svg — viewBox/renkler kaynakla
// BİREBİR aynıdır (spec kuralı: değiştirilmez). Header/Footer'da inline SVG
// olarak kullanılır; ekstra ağ isteği yoktur.

/** Yelken işareti — salt dekoratif, erişilebilir ad lockup/Link'ten gelir. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 56"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
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
  );
}

/**
 * İki satırlı lockup (spec): üstte Plus Jakarta 800 "BodrumApart"
 * ("Bodrum" murekkep-900 / "Apart" turkuaz-600; koyu zeminde beyaz /
 * turkuaz-300), altta harf-aralıklı "KİRALAMA" satırı (~0.56em,
 * letter-spacing .34em, muted — koyu zeminde navy-200).
 */
export function BrandLockup({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const dark = variant === "dark";
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <BrandMark className="h-10 w-10 shrink-0" />
      <span className="flex flex-col">
        <span
          className={clsx(
            // font-bold (700): 800 ağırlığı font diyetinde elendi (tek kullanım
            // burasıydı) — preload edilen woff2 sayısını azaltır, LCP bulgusu.
            "font-sans text-lg font-bold leading-none tracking-tight",
            dark ? "text-white" : "text-murekkep-900"
          )}
        >
          Bodrum
          <span className={dark ? "text-turkuaz-300" : "text-turkuaz-600"}>
            Apart
          </span>
        </span>
        {/* 18px üst satırın ~0.56em'i ≈ 10px; .34em harf aralığı. */}
        <span
          className={clsx(
            "mt-1 text-[10px] font-semibold uppercase leading-none tracking-[0.34em]",
            dark ? "text-navy-200" : "text-muted"
          )}
        >
          KİRALAMA
        </span>
      </span>
    </span>
  );
}
