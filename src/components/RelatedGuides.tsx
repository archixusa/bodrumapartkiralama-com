import { ArrowRight, Compass } from "lucide-react";
import { Link } from "@/i18n/routing";

type L = "tr" | "en" | "de" | "ru";

/** A single related link with per-locale anchor text. */
export interface RelatedLink {
  href: string;
  labels: Record<L, string>;
}

const TITLE: Record<L, string> = {
  tr: "İlgili rehberler ve sayfalar",
  en: "Related guides and pages",
  de: "Verwandte Reiseführer und Seiten",
  ru: "Связанные гиды и страницы",
};

// The pillar always leads the list so every spoke links back to the hub.
const PILLAR: RelatedLink = {
  href: "/bodrum-tatil-rehberi",
  labels: {
    tr: "Bodrum Tatil Rehberi",
    en: "Bodrum Travel Guide",
    de: "Bodrum Reiseführer",
    ru: "Путеводитель по Бодруму",
  },
};

/**
 * Spoke→hub related-links block. Renders the pillar guide first (so internal
 * links flow back to the hub) followed by any contextual `links` the page
 * passes. Localised for all four site locales; natural, varied anchor text.
 *
 * Dedupes by href and caps at a tasteful number so no page over-links.
 */
export function RelatedGuides({
  locale,
  links = [],
}: {
  locale: string;
  links?: RelatedLink[];
}) {
  const pick: L = (["tr", "en", "de", "ru"] as const).includes(locale as L)
    ? (locale as L)
    : "en";

  const seen = new Set<string>();
  const all = [PILLAR, ...links].filter((l) => {
    if (seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });

  return (
    <div className="mt-10 rounded-xl border border-kum-200 bg-turkuaz-50 p-5 sm:p-6">
      <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
        <Compass className="h-4 w-4 text-turkuaz-600" />
        {TITLE[pick]}
      </p>
      {/* Rehber kartları — kum-cizgi kenarlıklı beyaz mini kartlar, hover'da
          -2px lift + turkuaz kenarlık (spec §5 mikro etkileşim). */}
      <ul className="grid gap-3 sm:grid-cols-2">
        {all.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group flex items-center justify-between gap-2 rounded-lg border border-kum-200 bg-white px-4 py-3 text-sm font-semibold text-murekkep-900 shadow-card transition duration-200 ease-akdeniz hover:-translate-y-0.5 hover:border-turkuaz-500 hover:text-turkuaz-600 hover:shadow-cardHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turkuaz-600 focus-visible:ring-offset-2"
            >
              {l.labels[pick]}
              <ArrowRight className="h-4 w-4 shrink-0 text-turkuaz-600 transition group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
