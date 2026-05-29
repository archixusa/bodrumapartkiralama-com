import { MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

const WHATSAPP_NUMBER = "905385124088";

type Copy = {
  heading: string;
  body: string;
  whatsapp: string;
  waText: string;
  secondary: string;
  secondaryHref: "/iletisim" | "/apartlar";
};

const COPY: Record<"tr" | "en" | "de" | "ru", Copy> = {
  tr: {
    heading: "Bu bölgede uygun bir apart mı arıyorsunuz?",
    body: "WhatsApp'tan birkaç öneri gönderelim — tarihlerinizi ve kişi sayınızı yazmanız yeterli. Aileniz için en uygun seçenekleri birlikte bulalım.",
    whatsapp: "WhatsApp'tan yazın",
    waText: "Merhaba, blogda bu bölgeyi okudum. Uygun bir apart için birkaç öneri alabilir miyim?",
    secondary: "Apartları görün",
    secondaryHref: "/apartlar",
  },
  en: {
    heading: "Looking for the right apartment in this area?",
    body: "Send us a quick message on WhatsApp — just your dates and how many of you there are. We'll help you find the best options for your family.",
    whatsapp: "Message us on WhatsApp",
    waText: "Hi, I read your blog about this area. Could you send me a few suitable apartment options?",
    secondary: "Browse apartments",
    secondaryHref: "/apartlar",
  },
  de: {
    heading: "Suchen Sie eine passende Ferienwohnung in dieser Gegend?",
    body: "Schreiben Sie uns kurz über WhatsApp — nur Ihre Daten und die Personenzahl. Wir finden gemeinsam die besten Optionen für Ihre Familie.",
    whatsapp: "Über WhatsApp schreiben",
    waText: "Hallo, ich habe Ihren Blog über diese Gegend gelesen. Könnten Sie mir ein paar passende Apartment-Vorschläge senden?",
    secondary: "Apartments ansehen",
    secondaryHref: "/apartlar",
  },
  ru: {
    heading: "Ищете подходящие апартаменты в этом районе?",
    body: "Напишите нам в WhatsApp — просто укажите даты и количество гостей. Вместе подберём лучшие варианты для вашей семьи.",
    whatsapp: "Написать в WhatsApp",
    waText: "Здравствуйте, я прочитал(а) ваш блог об этом районе. Можете прислать несколько подходящих вариантов апартаментов?",
    secondary: "Смотреть апартаменты",
    secondaryHref: "/apartlar",
  },
};

export function BlogCta({ locale }: { locale: string }) {
  const copy = COPY[(locale as "tr" | "en" | "de" | "ru") in COPY ? (locale as keyof typeof COPY) : "en"];
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(copy.waText)}`;

  return (
    <div className="mt-12 rounded-2xl border border-accent-400/40 bg-accent-400/5 p-6 sm:p-8">
      <h3 className="text-xl font-bold text-navy-900">{copy.heading}</h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{copy.body}</p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          data-lead="blog-whatsapp"
          className="btn-primary"
        >
          <MessageCircle className="h-4 w-4" />
          {copy.whatsapp}
        </a>
        <Link href={copy.secondaryHref} className="btn-secondary">
          {copy.secondary}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
