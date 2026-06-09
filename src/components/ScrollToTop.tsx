"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

type L = "tr" | "en" | "de" | "ru";

const LABELS: Record<L, string> = {
  tr: "Yukarı dön",
  en: "Back to top",
  de: "Nach oben",
  ru: "Наверх",
};

/**
 * "Yukarı dön" butonu — sayfa ~600px kaydırılınca görünür.
 *
 * Konum: WhatsAppFab (md+, bottom-6) ve MobileStickyCta'nın (<md, alt çubuk)
 * ÜZERİNDE durur; ikisini de örtmez. Spec token'ları: kum zemin + kum-cizgi
 * kenarlık, hover'da turkuaz kenarlık, mürekkep tonlu gölge.
 * prefers-reduced-motion'da kaydırma anında yapılır (smooth kapalı).
 */
export function ScrollToTop({ locale }: { locale: string }) {
  const [visible, setVisible] = useState(false);
  const lang: L = (locale as L) in LABELS ? (locale as L) : "en";

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const scrollTop = () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label={LABELS[lang]}
      title={LABELS[lang]}
      className="fixed bottom-[88px] right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-kum-200 bg-kum-50/90 text-murekkep-900 shadow-card backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-turkuaz-500 hover:text-turkuaz-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-turkuaz-500 focus-visible:ring-offset-2 md:bottom-24 md:right-6"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
