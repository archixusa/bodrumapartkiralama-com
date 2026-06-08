import { Check, X, Wallet } from "lucide-react";
import { FAQ } from "@/components/FAQ";
import type { DistrictGuide } from "@/data/districtGuides";

interface Props {
  guide: DistrictGuide;
  districtName: string;
}

/**
 * Rich, ~1500+ word per-district guide block.
 * Only rendered for Turkish locale (en/de/ru fall back to existing shortDescription).
 *
 * Sections:
 *   - Sub-heading + lead
 *   - Suited / Not-suited bullet pairs
 *   - Multiple H2 body sections
 *   - Indicative price band card
 *   - 5 district-specific FAQs (FAQ component, native accordion)
 */
export function DistrictGuide({ guide, districtName }: Props) {
  return (
    <section className="section">
      <div className="container-page max-w-4xl">
        <h2 className="text-balance">{guide.subHeading}</h2>
        <p className="mt-5 text-[15px] leading-relaxed text-ink/90">
          {guide.lead}
        </p>

        {/* Suited vs Not suited */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="card p-5">
            <h3 className="flex items-center gap-2 text-base font-bold text-navy-900">
              <Check className="h-5 w-5 text-success" />
              {districtName} kimler için uygun?
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-ink/85">
              {guide.suitedFor.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-5">
            <h3 className="flex items-center gap-2 text-base font-bold text-navy-900">
              <X className="h-5 w-5 text-danger" />
              Bu bölgeyi tercih etmemeli olanlar
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-ink/85">
              {guide.notSuitedFor.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-danger/80" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Body sections */}
        <div className="mt-12 space-y-10">
          {guide.sections.map((s) => (
            <div key={s.h2}>
              <h2 className="text-2xl">{s.h2}</h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink/90">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Seasonal guidance */}
        <div className="mt-10 flex items-start gap-4 rounded-xl border border-accent-500/30 bg-accent-500/5 p-5">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-accent-500/15 text-accent-600">
            <Wallet className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold text-navy-900">
              {districtName} — sezon ve konaklama notu
            </p>
            <p className="mt-1 text-sm text-ink/85">{guide.priceBand.note}</p>
            <p className="mt-2 text-xs text-muted">
              Tarihinize ve mülke göre kişiye özel teklif hazırlıyoruz; fiyat
              için iletişime geçin.
            </p>
          </div>
        </div>

        {/* Guide FAQ — separate block from the page's existing district FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl">{districtName} İçin Sıkça Sorulanlar</h2>
          <div className="mt-5">
            <FAQ items={guide.faqs} />
          </div>
        </div>
      </div>
    </section>
  );
}
