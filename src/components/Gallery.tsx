"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { BLUR_KUM } from "@/lib/blur";

// Lightbox buton etiketleri 4 dilde — sabit İngilizce "close/previous/next"
// tr/de/ru sayfalarında yanlış dilde seslendiriliyordu (WCAG 3.1.2 + İ18N).
const CLOSE_LABEL: Record<string, string> = {
  tr: "Kapat",
  en: "Close",
  de: "Schließen",
  ru: "Закрыть",
};

const PREV_LABEL: Record<string, string> = {
  tr: "Önceki",
  en: "Previous",
  de: "Zurück",
  ru: "Назад",
};

const NEXT_LABEL: Record<string, string> = {
  tr: "Sonraki",
  en: "Next",
  de: "Weiter",
  ru: "Вперёд",
};

function pick(map: Record<string, string>, locale: string): string {
  return map[locale] ?? map.en;
}

export function Gallery({
  images,
  alt,
  locale = "tr", // sitenin varsayılan dili; çağıran sayfa locale'i geçirir
}: {
  images: string[];
  alt: string;
  locale?: string;
}) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Odak yönetimi (RequestModal'daki desenin aynısı — WCAG 2.4.3/2.1.2):
  // açılışta odak kapat butonuna gider, Tab/Shift+Tab diyalog içinde
  // hapsedilir, Escape kapatır, kapanışta odak tetikleyiciye iade edilir.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const node = dialogRef.current;
      if (!node) return;
      const focusables = Array.from(
        node.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !node.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !node.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  const main = images[0];
  const thumbs = images.slice(1, 5);

  return (
    <>
      <div className="grid grid-cols-4 gap-2 overflow-hidden rounded-xl">
        <button
          onClick={() => {
            setIdx(0);
            setOpen(true);
          }}
          className="group relative col-span-4 aspect-[4/3] overflow-hidden rounded-xl md:col-span-2 md:row-span-2 md:aspect-auto"
        >
          <Image
            src={main}
            alt={alt}
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 768px) 50vw, 100vw"
            placeholder="blur"
            blurDataURL={BLUR_KUM}
            className="object-cover transition group-hover:scale-105"
          />
        </button>
        {thumbs.map((src, i) => (
          <button
            key={src + i}
            onClick={() => {
              setIdx(i + 1);
              setOpen(true);
            }}
            className="group relative col-span-2 aspect-[4/3] overflow-hidden rounded-xl md:col-span-1"
          >
            <Image
              src={src}
              alt={`${alt} ${i + 2}`}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              placeholder="blur"
              blurDataURL={BLUR_KUM}
              className="object-cover transition group-hover:scale-105"
            />
            {i === 3 && images.length > 5 && (
              <span className="absolute inset-0 flex items-center justify-center bg-navy-900/60 text-sm font-semibold text-white">
                <ImageIcon className="mr-2 h-4 w-4" /> +{images.length - 5}
              </span>
            )}
          </button>
        ))}
      </div>

      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            ref={closeBtnRef}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            aria-label={pick(CLOSE_LABEL, locale)}
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIdx((idx - 1 + images.length) % images.length);
            }}
            className="absolute left-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20"
            aria-label={pick(PREV_LABEL, locale)}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIdx((idx + 1) % images.length);
            }}
            className="absolute right-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 md:right-16"
            aria-label={pick(NEXT_LABEL, locale)}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[idx]}
              alt={`${alt} ${idx + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
            {idx + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
