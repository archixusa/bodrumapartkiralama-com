import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { District } from "@/data/districts";
import { loc } from "@/lib/i18n-data";

export function DistrictCard({ district }: { district: District }) {
  const dt = useTranslations("districts");
  const locale = useLocale();
  const isTr = locale === "tr";

  return (
    <Link
      href={`/bodrum/${district.urlSlug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-xl shadow-card outline-none transition duration-300 hover:shadow-cardHover focus-visible:ring-2 focus-visible:ring-turkuaz-500 focus-visible:ring-offset-2"
    >
      <Image
        src={district.heroImage}
        alt={`${district.name}, Bodrum`}
        fill
        loading="lazy"
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover transition duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <h3 className="text-xl font-bold text-white drop-shadow">
          {dt(district.slug)}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-white/85">
          {loc(locale, {
            tr: district.shortDescTr,
            en: district.shortDescEn,
            de: district.shortDescDe,
            ru: district.shortDescRu,
          })}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-turkuaz-300 transition group-hover:gap-2">
          {isTr ? "Bölgeyi gör" : "View district"}
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
