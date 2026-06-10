import { Handshake, MessageCircle, Check } from "lucide-react";

interface Step {
  num: string;
  title: string;
  desc: string;
}

interface Props {
  serviceLabel: string;
  description: string;
  whatsappNumber: string;
  whatsappTemplate: string;
  steps: Step[];
  coverageTitle: string;
  coverage: string[];
  whatsappCtaLabel: string;
  isTr: boolean;
}

/**
 * "Partner Hizmet" banner for non-core service pages (tekne, araç, transfer, turlar).
 *
 * Clearly tells the visitor this is a partner-operated service brokered through us,
 * not something we own/operate. Includes WhatsApp template link and an at-a-glance
 * "How it works" + "Coverage" section.
 */
export function PartnerServiceBanner({
  serviceLabel,
  description,
  whatsappNumber,
  whatsappTemplate,
  steps,
  coverageTitle,
  coverage,
  whatsappCtaLabel,
  isTr,
}: Props) {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappTemplate)}`;
  const howTitle = isTr ? "Nasıl Çalışıyor?" : "How does it work?";

  return (
    <section className="border-b border-[var(--color-border)] bg-navy-50/60">
      <div className="container-page py-8 md:py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-900">
              <Handshake className="h-3.5 w-3.5" />
              {serviceLabel}
            </span>
            <p className="mt-3 text-base md:text-[15px] leading-relaxed text-ink/85">
              {description}
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-whatsapp-dark"
          >
            <MessageCircle className="h-4 w-4" />
            {whatsappCtaLabel}
          </a>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1fr]">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-navy-900">
              {howTitle}
            </h3>
            <ol className="mt-3 space-y-3">
              {steps.map((s) => (
                <li key={s.num} className="flex gap-3">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
                    {s.num}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">
                      {s.title}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-navy-900">
              {coverageTitle}
            </h3>
            <ul className="mt-3 grid gap-2">
              {coverage.map((c, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-ink/85"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
