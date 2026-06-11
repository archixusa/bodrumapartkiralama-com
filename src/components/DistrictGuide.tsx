import { Check, X, Wallet } from "lucide-react";
import { FAQ } from "@/components/FAQ";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ProseBlock } from "@/components/editorial";
import type { DistrictGuide } from "@/data/districtGuides";

interface Props {
  guide: DistrictGuide;
  districtName: string;
}

/**
 * Rich, ~1500+ word per-district guide block.
 * Only rendered for Turkish locale (en/de/ru fall back to existing shortDescription).
 *
 * v8 editoryal kompozisyon (DESIGN_SPEC.md §v8):
 *   - Prose GERÇEKTEN ortalanır (~70ch ölçü) — eski max-w-4xl şeridi ~100ch
 *     ölçüyle "Word belgesi" gibi okunuyordu.
 *   - Bölüm bandı dönüşümlü (section-soft) — ana sayfadaki ritim diliyle aynı.
 *   - SEÇİCİ kutulama: uygun/uygun-değil kart çifti + sezon notu kutu kalır
 *     (çapa noktaları); rehber gövdesi kutusuz akar.
 *   - Kartlar mevcut ScrollReveal diline bağlanır (data-reveal-child).
 */
export function DistrictGuide({ guide, districtName }: Props) {
  return (
    <section className="section section-soft cv-auto">
      <div className="container-page">
        <ProseBlock>
          <h2 className="text-balance">{guide.subHeading}</h2>
          <p className="mt-5 text-base md:text-[15px] leading-relaxed text-ink/90">
            {guide.lead}
          </p>
        </ProseBlock>

        {/* Suited vs Not suited — seçici kutu çifti (çapa noktası) */}
        <ScrollReveal className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
          <div data-reveal-child className="card p-5">
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
          <div data-reveal-child className="card p-5">
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
        </ScrollReveal>

        {/* Body sections — hikâye/rehber prose'u KUTUSUZ, ortalanmış ölçüde akar */}
        <div className="mt-12 space-y-10">
          {guide.sections.map((s) => (
            <ProseBlock key={s.h2}>
              <h2 className="text-2xl">{s.h2}</h2>
              <div className="mt-4 space-y-4 text-base md:text-[15px] leading-relaxed text-ink/90">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </ProseBlock>
          ))}
        </div>

        {/* Seasonal guidance — tek vurgu kutusu (çapa) */}
        <div className="mx-auto mt-10 flex max-w-[70ch] items-start gap-4 rounded-xl border border-accent-500/30 bg-white p-5">
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
        <div className="mx-auto mt-12 max-w-3xl">
          <h2 className="text-2xl">{districtName} İçin Sıkça Sorulanlar</h2>
          <div className="mt-5">
            <FAQ items={guide.faqs} />
          </div>
        </div>
      </div>
    </section>
  );
}
