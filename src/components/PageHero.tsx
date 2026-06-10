import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";
import { BLUR_KUM } from "@/lib/blur";

interface Crumb {
  href?: string;
  label: string;
}

interface Props {
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  badge?: string;
  crumbs?: Crumb[];
}

export function PageHero({
  title,
  subtitle,
  image,
  imageAlt,
  badge,
  crumbs,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      {image && (
        <Image
          src={image}
          alt={imageAlt ?? title}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_KUM}
          className="object-cover opacity-40"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/60 to-navy-900/90" />
      <div className="container-page relative py-14 md:py-20">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="breadcrumb" className="mb-3 flex flex-wrap items-center gap-1 text-xs text-white/80">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                {c.href ? (
                  <Link href={c.href} className="hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span>{c.label}</span>
                )}
                {i < crumbs.length - 1 && (
                  <ChevronRight className="h-3 w-3 opacity-60" />
                )}
              </span>
            ))}
          </nav>
        )}
        {badge && <span className="chip-accent">{badge}</span>}
        <h1 className={`text-white ${badge ? "mt-4" : ""}`}>{title}</h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-base text-white/85 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
