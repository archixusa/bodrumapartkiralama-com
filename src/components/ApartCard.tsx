import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Users, BedDouble, Bath, MapPin, Star, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Apartment } from "@/data/apartments";
import { districts } from "@/data/districts";
import { BLUR_KUM } from "@/lib/blur";

export function ApartCard({ apt }: { apt: Apartment }) {
  const t = useTranslations("common");
  const dt = useTranslations("districts");
  const locale = useLocale();
  const isTr = locale === "tr";
  const title = isTr ? apt.titleTr : apt.titleEn;
  const districtName = dt(apt.district);
  const districtUrl = districts.find((d) => d.slug === apt.district)?.urlSlug ?? apt.district;

  return (
    <article className="card group flex flex-col">
      <Link href={`/apartlar/${apt.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={apt.images[0]}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={BLUR_KUM}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {/* Sol üst: kum zemin bölge pill'i + varsa etiketler (spec §4 kart) */}
        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
          <span className="chip-region">
            <MapPin className="h-3 w-3" />
            {districtName}
          </span>
          {apt.tags?.slice(0, 1).map((tag) => (
            <span key={tag} className="chip-accent">{tag}</span>
          ))}
        </div>
        {/* Sağ alt: mürekkep zemin + güneş yıldızlı rating rozeti.
            role="img" + aria-label: SR aksi halde bağlamsız "4.8" okuyordu —
            GuestReviews'taki Stars deseniyle aynı (WCAG 1.1.1). */}
        <div
          className="chip-rating absolute bottom-3 right-3"
          role="img"
          aria-label={`${apt.rating.toFixed(1)} / 5`}
        >
          <Star aria-hidden="true" className="h-3 w-3 fill-gunes-400 text-gunes-400" />
          {apt.rating.toFixed(1)}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-murekkep-900">
            <Link href={`/apartlar/${apt.slug}`} className="transition hover:text-turkuaz-600">
              {title}
            </Link>
          </h3>
          <Link
            href={`/bodrum/${districtUrl}`}
            className="mt-1 inline-flex min-h-8 items-center gap-1 text-xs font-semibold text-turkuaz-600 hover:underline"
          >
            <MapPin className="h-3 w-3" /> {districtName}
          </Link>
        </div>
        {/* Özellik satırı — ayraçlı (spec §4 kart) */}
        <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-1 border-t border-kum-200 pt-3 text-xs font-semibold text-murekkep-700">
          <li className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-turkuaz-600" /> {apt.capacity}
          </li>
          <li aria-hidden="true" className="text-kum-200">•</li>
          <li className="inline-flex items-center gap-1">
            <BedDouble className="h-3.5 w-3.5 text-turkuaz-600" /> {apt.bedrooms}
          </li>
          <li aria-hidden="true" className="text-kum-200">•</li>
          <li className="inline-flex items-center gap-1">
            <Bath className="h-3.5 w-3.5 text-turkuaz-600" /> {apt.bathrooms}
          </li>
          <li aria-hidden="true" className="text-kum-200">•</li>
          <li>{apt.area_m2} m²</li>
        </ul>
        {/* Alt satır: "teklif bazlı" metni + ok linki */}
        <div className="mt-auto flex items-center justify-between pt-1">
          <p className="text-xs font-semibold text-muted">
            {t("priceCta")}
          </p>
          <Link
            href={`/apartlar/${apt.slug}`}
            className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-turkuaz-600 transition hover:text-turkuaz-700"
          >
            {t("details")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
