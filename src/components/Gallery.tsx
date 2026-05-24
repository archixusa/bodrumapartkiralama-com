"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

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
            sizes="(min-width: 768px) 50vw, 100vw"
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
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="close"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIdx((idx - 1 + images.length) % images.length);
            }}
            className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIdx((idx + 1) % images.length);
            }}
            className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 md:right-16"
            aria-label="next"
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
