import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Users, BedDouble, Bath, MapPin, Star } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Apartment } from "@/data/apartments";
import { districts } from "@/data/districts";
import { formatTRY } from "@/lib/format";

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
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {apt.tags && apt.tags.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1">
            {apt.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="chip-accent">{tag}</span>
            ))}
          </div>
        )}
        <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-xs font-semibold text-success shadow">
          <Star className="h-3 w-3 fill-current" />
          {apt.rating.toFixed(1)}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <Link
            href={`/bodrum/${districtUrl}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-navy-600 hover:underline"
          >
            <MapPin className="h-3 w-3" /> {districtName}
          </Link>
          <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-snug text-navy-900">
            <Link href={`/apartlar/${apt.slug}`} className="hover:text-navy-600">
              {title}
            </Link>
          </h3>
        </div>
        <ul className="flex flex-wrap gap-3 text-xs text-muted">
          <li className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {apt.capacity}
          </li>
          <li className="inline-flex items-center gap-1">
            <BedDouble className="h-3.5 w-3.5" /> {apt.bedrooms}
          </li>
          <li className="inline-flex items-center gap-1">
            <Bath className="h-3.5 w-3.5" /> {apt.bathrooms}
          </li>
          <li>{apt.area_m2} m²</li>
        </ul>
        <div className="mt-auto flex items-center justify-between border-t border-[var(--color-border)] pt-3">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted">
              {t("from")}
            </p>
            <p className="text-base font-bold text-navy-900">
              {formatTRY(apt.lowSeasonPrice)}{" "}
              <span className="text-xs font-normal text-muted">{t("perNight")}</span>
            </p>
          </div>
          <Link href={`/apartlar/${apt.slug}`} className="btn-primary !px-3 !py-2 !text-xs">
            {t("details")}
          </Link>
        </div>
      </div>
    </article>
  );
}
