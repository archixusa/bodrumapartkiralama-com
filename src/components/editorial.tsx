import type { ElementType, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import clsx from "clsx";

/* ── v8 editoryal kompozisyon seti (DESIGN_SPEC.md §v8) ──────────────────────
   İçerik sayfalarının "Word belgesi" hissini kıran dört küçük yapı taşı.
   Kural: hikâye prose KUTUSUZ akar (ProseBlock yalnız ölçü verir), kutu yalnız
   çapa noktalarında (PullQuote/Timeline/PrincipleCards). Hepsi server-safe;
   hareket mevcut ScrollReveal diline data-reveal-child ile bağlanır. */

/**
 * ProseBlock — ortalanmış okuma ölçüsü (~70ch, spec: 65–75ch bandı).
 * Asimetrik ölü boşluğu bitirir: prose sütunu gerçekten ortalanır, kutu yok.
 */
export function ProseBlock({
  as,
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag className={clsx("mx-auto w-full max-w-[70ch] text-pretty", className)}>
      {children}
    </Tag>
  );
}

/**
 * PullQuote — öne çıkan TEK cümle: büyük Fraunces italik + turkuaz vurgu
 * çizgisi (apart marka vurgusu). Çizgi yatay ve üstte — dekoratif yan şerit
 * (border-left) bilinçli olarak kullanılmaz. Metin mevcut çevirilerden gelir;
 * bileşen yalnız sunumdur.
 */
export function PullQuote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={clsx("mx-auto max-w-2xl text-center", className)}>
      <span aria-hidden className="mx-auto block h-1 w-14 rounded-full bg-turkuaz-500" />
      <blockquote className="mt-6 text-balance font-display text-2xl font-semibold italic leading-snug text-murekkep-900 md:text-3xl">
        {children}
      </blockquote>
    </figure>
  );
}

export interface TimelineItem {
  /** Sıra bilgisi taşıyan kısa işaret ("2013", "01"…). Verilmezse 1'den sayılır. */
  marker?: string;
  title: string;
  desc: string;
}

/**
 * Timeline — tarihçe/süreç gibi GERÇEK diziler için dikey zaman çizgisi.
 * Numara yalnız sıranın kendisi bilgi taşıdığında görünür (impeccable:
 * "numbered scaffolding" reflekslerine düşmez — bu bileşen şablon değil,
 * sıralı içerik içindir). Maddeler data-reveal-child ile sahnelenir.
 */
export function Timeline({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  return (
    <ol className={clsx("relative mx-auto max-w-2xl", className)}>
      {/* Ray: 1px yapısal çizgi — işaret noktalarının merkezinden geçer. */}
      <span
        aria-hidden
        className="absolute bottom-8 start-[17px] top-4 w-px bg-kum-200"
      />
      {items.map((it, i) => (
        <li
          key={it.title}
          data-reveal-child
          className="relative pb-9 ps-14 last:pb-0"
        >
          <span
            aria-hidden
            className="absolute start-0 top-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-turkuaz-600/30 bg-turkuaz-50 font-display text-sm font-semibold text-turkuaz-700"
          >
            {it.marker ?? i + 1}
          </span>
          <h3 className="pt-1 text-lg">{it.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/85">{it.desc}</p>
        </li>
      ))}
    </ol>
  );
}

export interface Principle {
  icon?: LucideIcon;
  title: string;
  desc: string;
}

/**
 * PrincipleCards — ilkeler/değerler için 2-3'lü kart grid'i. Mevcut .card
 * dili aynen kullanılır; kartlar data-reveal-child ile (ScrollReveal içinde)
 * sahnelenir. Kart yalnız burada — hikâye prose'u asla kartlanmaz.
 */
export function PrincipleCards({
  items,
  className,
}: {
  items: Principle[];
  className?: string;
}) {
  const cols = items.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3";
  return (
    <div className={clsx("grid gap-5", cols, className)}>
      {items.map((p) => {
        const Icon = p.icon;
        return (
          <div key={p.title} data-reveal-child className="card flex flex-col gap-3 p-6">
            {Icon && (
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-navy-50 text-navy-900">
                <Icon className="h-6 w-6" />
              </span>
            )}
            <h3 className="text-lg">{p.title}</h3>
            <p className="text-sm leading-relaxed text-ink/85">{p.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
