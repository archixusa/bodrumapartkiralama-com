import { Link } from "@/i18n/routing";

type L = "tr" | "en" | "de" | "ru";

const COPY: Record<
  L,
  { lead: string; apart: string; mid: string; home: string; tail: string }
> = {
  tr: {
    lead: "Konaklamanızı da planlıyorsanız ",
    apart: "Bodrum apart koleksiyonumuza",
    mid: " göz atabilir, dilerseniz ",
    home: "ana sayfamızı",
    tail: " ziyaret edebilirsiniz.",
  },
  en: {
    lead: "Planning your stay too? Browse our ",
    apart: "Bodrum apartment collection",
    mid: " or visit the ",
    home: "homepage",
    tail: ".",
  },
  de: {
    lead: "Planen Sie auch Ihren Aufenthalt? Sehen Sie sich unsere ",
    apart: "Bodrum-Apartmentkollektion an",
    mid: " oder besuchen Sie die ",
    home: "Startseite",
    tail: ".",
  },
  ru: {
    lead: "Планируете и проживание? Посмотрите нашу ",
    apart: "коллекцию апартаментов в Бодруме",
    mid: " или перейдите на ",
    home: "главную страницу",
    tail: ".",
  },
};

/**
 * Contextual internal-link line for service pages: links back to /apartlar and
 * the homepage in a natural sentence (no link-stuffing). Localised for all four
 * locales.
 */
export function ServiceRelatedLinks({ locale }: { locale: string }) {
  const c = COPY[(locale as L) in COPY ? (locale as L) : "en"];
  return (
    <p className="text-sm text-muted">
      {c.lead}
      <Link href="/apartlar" className="font-semibold text-navy-600 hover:underline">
        {c.apart}
      </Link>
      {c.mid}
      <Link href="/" className="font-semibold text-navy-600 hover:underline">
        {c.home}
      </Link>
      {c.tail}
    </p>
  );
}
