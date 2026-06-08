import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { InquiryForm } from "@/components/InquiryForm";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PartnerServiceBanner } from "@/components/PartnerServiceBanner";
import { ServiceRelatedLinks } from "@/components/ServiceRelatedLinks";
import { RelatedGuides, type RelatedLink } from "@/components/RelatedGuides";
import { getSiteContent } from "@/lib/content";
import { buildAlternates, defaultOgImages } from "@/lib/seo";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.bodrumapartkiralama.com";

const RELATED_LINKS: RelatedLink[] = [
  {
    href: "/arac-kiralama",
    labels: { tr: "Araç kiralama", en: "Car rental", de: "Mietwagen", ru: "Аренда авто" },
  },
  {
    href: "/blog/bodrum-havalimanindan-merkeze-ulasim",
    labels: { tr: "Havalimanından ulaşım rehberi", en: "Airport transport guide", de: "Anreise vom Flughafen", ru: "Как добраться из аэропорта" },
  },
];

// ── DB-backed hero copy (section_key "transfer.hero") ────────────────────────
// Falls back to the in-code default below when no published row exists, so the
// page renders byte-identical to today for normal visitors.
type TransferHeroCopy = { kicker: string; title: string; sub: string };
type ByLocale<T> = Record<"tr" | "en" | "de" | "ru", T>;

const TRANSFER_HERO_DEFAULT: ByLocale<TransferHeroCopy> = {
  tr: {
    kicker: "Partner Hizmet · Bodrum 2026",
    title: "Bodrum Havalimanı Özel Transfer",
    sub: "Milas-Bodrum Havalimanı'ndan apartınızın kapısına özel araçla.",
  },
  en: {
    kicker: "Partner Service · Bodrum 2026",
    title: "Bodrum Airport Private Transfer",
    sub: "From Milas-Bodrum Airport to your apartment door in a private vehicle.",
  },
  de: {
    kicker: "Partnerservice · Bodrum 2026",
    title: "Bodrum Flughafen-Privattransfer",
    sub: "Vom Flughafen Milas-Bodrum bis vor Ihre Wohnungstür im privaten Fahrzeug.",
  },
  ru: {
    kicker: "Партнёрская услуга · Бодрум 2026",
    title: "Индивидуальный трансфер из аэропорта Бодрума",
    sub: "От аэропорта Milas-Bodrum до двери ваших апартаментов на отдельном автомобиле.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "transfer" });
  const url =
    locale === "tr"
      ? `${SITE_URL}/vip-transfer`
      : `${SITE_URL}/${locale}/vip-transfer`;
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: buildAlternates(locale, "/vip-transfer"),
    openGraph: { title: t("metaTitle"), description: t("metaDesc"), url, ...defaultOgImages(locale).openGraph },
    twitter: defaultOgImages(locale).twitter,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "transfer" });
  const c = await getTranslations({ locale, namespace: "common" });
  const isTr = locale === "tr";

  type L = "tr" | "en" | "de" | "ru";
  const pick = locale as L;
  const tx = <T,>(o: Record<L, T>): T => o[pick] ?? o.en;

  // ── HERO (DB-backed; falls back to in-code default when no published row) ──
  const hero =
    (await getSiteContent<ByLocale<TransferHeroCopy>>("transfer.hero")) ??
    TRANSFER_HERO_DEFAULT;
  const heroCopy = hero[pick] ?? hero.en;

  const vehicles = [
    {
      title: t("vehicle1Title"),
      desc: t("vehicle1Desc"),
      image:
        "https://images.unsplash.com/photo-1592309905620-e5b59f6dcb98?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: t("vehicle2Title"),
      desc: t("vehicle2Desc"),
      image:
        "https://images.unsplash.com/photo-1656426650699-a76ffe479608?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: t("vehicle3Title"),
      desc: t("vehicle3Desc"),
      image:
        "https://images.unsplash.com/photo-1656426630273-ca84171a2010?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const included = [t("inc1"), t("inc2"), t("inc3"), t("inc4"), t("inc5"), t("inc6")];

  const faqByLocale = {
    tr: [
      {
        q: "Fiyat nasıl belirleniyor?",
        a: "Fiyat; kişi sayısı, varış bölgesi, araç tipi ve gidiş-dönüş tercihine göre belirlenir. Form gönderdiğinizde size sabit, KDV dahil net teklif sunuyoruz.",
      },
      {
        q: "Uçuş gecikirse ek ücret var mı?",
        a: "Hayır. Şoförümüz uçuş takibi yapar ve gerektiği kadar bekler. Gece geç saat veya tatil dönemlerinde de ek ücret almıyoruz.",
      },
      {
        q: "Bebek koltuğu var mı?",
        a: "Evet. Bebek (0-1 yaş), çocuk (1-4 yaş) ve büyütücü (4-12 yaş) koltuk talep üzerine ücretsiz sağlanır. Lütfen formda belirtin.",
      },
      {
        q: "Tek yön veya gidiş-dönüş, hangisi daha mantıklı?",
        a: "Gidiş-dönüş seçtiğinizde %10 indirim uygulanıyor. Dönüş tarihinizden emin değilseniz dönüşü sonra da rezerve edebilirsiniz.",
      },
      {
        q: "Hangi bölgelere transfer sağlıyorsunuz?",
        a: "Milas-Bodrum Havalimanı'ndan tüm Bodrum yarımadasına: Gümbet, Turgutreis, Yalıkavak, Bitez, Ortakent, Gündoğan, Torba ve Bodrum merkez.",
      },
    ],
    en: [
      {
        q: "How is the price set?",
        a: "Price is set by group size, destination, vehicle type and one-way/round-trip choice. When you submit the form, we send a fixed quote (taxes included).",
      },
      {
        q: "Is there a surcharge for flight delays?",
        a: "No. Our driver tracks your flight and waits as needed. We don't charge surcharges at night or during peak season.",
      },
      {
        q: "Are baby seats available?",
        a: "Yes. Infant (0-1), toddler (1-4) and booster (4-12) seats are provided free on request — please note it in the form.",
      },
      {
        q: "Should I book one-way or round-trip?",
        a: "Round-trip gets a 10% discount. If you're not sure about your return date, you can book the return later.",
      },
      {
        q: "Which areas do you serve?",
        a: "From Milas-Bodrum Airport to the entire Bodrum peninsula: Gümbet, Turgutreis, Yalıkavak, Bitez, Ortakent, Gündoğan, Torba and Bodrum centre.",
      },
    ],
    de: [
      {
        q: "Wie wird der Preis festgelegt?",
        a: "Der Preis richtet sich nach Personenzahl, Zielort, Fahrzeugtyp und der Wahl zwischen Einzelfahrt und Hin- und Rückfahrt. Sobald Sie das Formular absenden, senden wir Ihnen ein verbindliches Angebot (inklusive Steuern).",
      },
      {
        q: "Fällt bei Flugverspätungen ein Aufpreis an?",
        a: "Nein. Unser Fahrer verfolgt Ihren Flug und wartet so lange wie nötig. Auch nachts oder in der Hochsaison berechnen wir keine Aufschläge.",
      },
      {
        q: "Sind Kindersitze verfügbar?",
        a: "Ja. Babyschalen (0-1 Jahr), Kindersitze (1-4 Jahre) und Sitzerhöhungen (4-12 Jahre) stellen wir Ihnen auf Wunsch kostenlos bereit — bitte vermerken Sie dies im Formular.",
      },
      {
        q: "Lohnt sich eine Einzelfahrt oder Hin- und Rückfahrt?",
        a: "Bei einer Hin- und Rückfahrt gewähren wir 10 % Rabatt. Wenn Sie Ihr Rückreisedatum noch nicht kennen, können Sie die Rückfahrt auch später buchen.",
      },
      {
        q: "Welche Gebiete bedienen Sie?",
        a: "Vom Flughafen Milas-Bodrum auf die gesamte Halbinsel Bodrum: Gümbet, Turgutreis, Yalıkavak, Bitez, Ortakent, Gündoğan, Torba und das Zentrum von Bodrum.",
      },
    ],
    ru: [
      {
        q: "Как формируется цена?",
        a: "Цена зависит от количества пассажиров, района прибытия, типа автомобиля и выбора между поездкой в одну сторону и туда-обратно. После отправки формы мы пришлём вам фиксированное предложение (с учётом налогов).",
      },
      {
        q: "Есть ли доплата за задержку рейса?",
        a: "Нет. Наш водитель отслеживает ваш рейс и ждёт столько, сколько нужно. Мы не берём доплат ни ночью, ни в высокий сезон.",
      },
      {
        q: "Есть ли детские кресла?",
        a: "Да. Кресла для младенцев (0-1 год), детей (1-4 года) и бустеры (4-12 лет) предоставляются бесплатно по запросу — пожалуйста, укажите это в форме.",
      },
      {
        q: "Что выгоднее: в одну сторону или туда-обратно?",
        a: "При выборе поездки туда-обратно действует скидка 10 %. Если вы ещё не уверены в дате обратной поездки, её можно забронировать позже.",
      },
      {
        q: "В какие районы вы осуществляете трансфер?",
        a: "Из аэропорта Милас-Бодрум по всему полуострову Бодрум: Гюмбет, Тургутрейс, Ялыкавак, Битез, Ортакент, Гюндоган, Торба и центр Бодрума.",
      },
    ],
  };
  const faqItems = tx(faqByLocale);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      name: heroCopy.title,
      description: t("metaDesc"),
      provider: { "@type": "LodgingBusiness", name: "Bodrumapartkiralama.com" },
      areaServed: "Bodrum, Muğla, TR",
      url: `${SITE_URL}/vip-transfer`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: tx({ tr: "Ana Sayfa", en: "Home", de: "Startseite", ru: "Главная" }),
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: heroCopy.title,
          item: `${SITE_URL}/vip-transfer`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        title={heroCopy.title}
        subtitle={heroCopy.sub}
        badge={heroCopy.kicker}
        image="https://images.unsplash.com/photo-1595880992139-8cf2ef915d78?auto=format&fit=crop&w=2000&q=80"
        crumbs={[
          {
            href: "/",
            label: tx({ tr: "Ana Sayfa", en: "Home", de: "Startseite", ru: "Главная" }),
          },
          { label: heroCopy.title },
        ]}
      />

      <PartnerServiceBanner
        isTr={isTr}
        serviceLabel={tx({
          tr: "Partner Hizmet",
          en: "Partner Service",
          de: "Partnerservice",
          ru: "Партнёрская услуга",
        })}
        description={tx({
          tr: "Havalimanı transferleri, Bodrum bölgesinde uçuş takibi yapabilen ve sigortalı özel araç filosuna sahip transfer ortaklarımızla yürütülür. Misafir karşılama, araç değişikliği ve gece operasyonu operatör tarafında çalışır.",
          en: "Airport transfers are operated by our partners with flight-tracking and insured private fleets in Bodrum. Guest meet-and-greet, vehicle changes and night operations run on the operator side.",
          de: "Flughafentransfers werden von unseren Partnern in der Region Bodrum durchgeführt, die Flüge verfolgen und über eine versicherte Privattransfer-Flotte verfügen. Empfang der Gäste, Fahrzeugwechsel und Nachtbetrieb laufen auf der Seite des Betreibers.",
          ru: "Трансферы из аэропорта выполняют наши партнёры в регионе Бодрум, отслеживающие рейсы и располагающие застрахованным автопарком для индивидуальных трансферов. Встреча гостей, замена автомобиля и ночные перевозки обеспечиваются со стороны оператора.",
        })}
        whatsappNumber={c("whatsappNumber")}
        whatsappTemplate={tx({
          tr: "Merhaba, Milas-Bodrum Havalimanı transferi için partner operatörünüze yönlendirir misiniz? Tarih, saat ve kişi sayısını paylaşacağım.",
          en: "Hello, could you connect me with your partner operator for a Milas-Bodrum Airport transfer? I'll share date, time and group size.",
          de: "Hallo, könnten Sie mich für einen Transfer ab dem Flughafen Milas-Bodrum an Ihren Partnerbetreiber weiterleiten? Ich teile Datum, Uhrzeit und Personenzahl mit.",
          ru: "Здравствуйте, не могли бы вы направить меня к вашему партнёру-оператору для трансфера из аэропорта Милас-Бодрум? Я сообщу дату, время и количество человек.",
        })}
        whatsappCtaLabel={tx({
          tr: "WhatsApp ile sor",
          en: "Ask on WhatsApp",
          de: "Per WhatsApp anfragen",
          ru: "Спросить в WhatsApp",
        })}
        steps={tx({
          tr: [
            {
              num: "1",
              title: "Uçuş ve adres bilgisi",
              desc: "Uçuş numarası, varış saati ve apart adresini iletin.",
            },
            {
              num: "2",
              title: "Araç sınıfı ve teklif teyidi",
              desc: "Kişi/bagaj sayısına göre sedan, minivan ya da geniş Sprinter önerelim; bölgeye göre net bir teklif teyit edelim.",
            },
            {
              num: "3",
              title: "Karşılama ve transfer",
              desc: "Şoför uçuş takibini operatör üzerinden yapar; tabela ile sizi karşılar.",
            },
          ],
          en: [
            {
              num: "1",
              title: "Flight and address info",
              desc: "Share your flight number, arrival time and apartment address.",
            },
            {
              num: "2",
              title: "Vehicle class and quote",
              desc: "We suggest sedan, minivan or spacious Sprinter by group/luggage; confirm a clear quote for your district.",
            },
            {
              num: "3",
              title: "Meet & transfer",
              desc: "The operator's driver tracks your flight and meets you with a sign at arrivals.",
            },
          ],
          de: [
            {
              num: "1",
              title: "Flug- und Adressdaten",
              desc: "Teilen Sie uns Ihre Flugnummer, die Ankunftszeit und die Adresse des Apartments mit.",
            },
            {
              num: "2",
              title: "Fahrzeugklasse und Angebot",
              desc: "Je nach Personen- und Gepäckzahl empfehlen wir Limousine, Minivan oder Privat-Sprinter und bestätigen ein klares Angebot für Ihren Zielort.",
            },
            {
              num: "3",
              title: "Empfang & Transfer",
              desc: "Der Fahrer verfolgt Ihren Flug über den Betreiber und empfängt Sie mit einem Namensschild am Ankunftsbereich.",
            },
          ],
          ru: [
            {
              num: "1",
              title: "Данные о рейсе и адресе",
              desc: "Сообщите номер рейса, время прибытия и адрес апартаментов.",
            },
            {
              num: "2",
              title: "Класс автомобиля и предложение",
              desc: "В зависимости от числа пассажиров и багажа предложим седан, минивэн или Sprinter для индивидуального трансфера и подтвердим понятное предложение для вашего района.",
            },
            {
              num: "3",
              title: "Встреча и трансфер",
              desc: "Водитель отслеживает ваш рейс через оператора и встречает вас с табличкой в зоне прилёта.",
            },
          ],
        })}
        coverageTitle={tx({
          tr: "Partner Hizmet Kapsamı",
          en: "Partner Service Scope",
          de: "Umfang des Partnerservice",
          ru: "Что входит в партнёрскую услугу",
        })}
        coverage={tx({
          tr: [
            "Milas-Bodrum Havalimanı'ndan tüm Bodrum bölgelerine transfer",
            "1-3 kişi sedan, 4-7 kişi Vito/Caravelle, 8-16 kişi geniş Sprinter",
            "Uçuş takibi, bebek koltuğu ve net teklif",
            "Tek yön veya gidiş-dönüş",
            "Şoför, sigorta, fatura ve ödeme operatör üzerinden",
          ],
          en: [
            "Transfer from Milas-Bodrum Airport to all Bodrum districts",
            "1-3 pax sedan, 4-7 pax Vito/Caravelle, 8-16 pax spacious Sprinter",
            "Flight tracking, child seat and a clear quote",
            "One-way or round-trip",
            "Driver, insurance, invoicing and payment handled by the operator",
          ],
          de: [
            "Transfer vom Flughafen Milas-Bodrum in alle Bezirke von Bodrum",
            "1-3 Personen Limousine, 4-7 Personen Vito/Caravelle, 8-16 Personen Sprinter",
            "Flugverfolgung, Kindersitz und klares Angebot",
            "Einzelfahrt oder Hin- und Rückfahrt",
            "Fahrer, Versicherung, Rechnung und Zahlung über den Betreiber",
          ],
          ru: [
            "Трансфер из аэропорта Милас-Бодрум во все районы Бодрума",
            "1-3 человека — седан, 4-7 — Vito/Caravelle, 8-16 — Sprinter",
            "Отслеживание рейса, детское кресло и понятное предложение",
            "В одну сторону или туда-обратно",
            "Водитель, страховка, счёт и оплата — через оператора",
          ],
        })}
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4 text-[15px] leading-relaxed text-ink/90">
            <p>{t("intro1")}</p>
            <p>{t("intro2")}</p>
            <p>{t("intro3")}</p>
            <ServiceRelatedLinks locale={locale} />
            <RelatedGuides locale={locale} links={RELATED_LINKS} />
          </div>
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <InquiryForm
              service="transfer"
              subjectLine={heroCopy.title}
              fields={{ date: true, people: true, pickup: true, dropoff: true }}
              whatsappNumber={c("whatsappNumber")}
              whatsappTemplate={tx({
                tr: "Merhaba, Milas-Bodrum Havalimanı transferi için bilgi almak istiyorum.",
                en: "Hello, I'd like info about Milas-Bodrum Airport transfer.",
                de: "Hallo, ich hätte gerne Informationen zum Transfer ab dem Flughafen Milas-Bodrum.",
                ru: "Здравствуйте, я хотел бы узнать о трансфере из аэропорта Милас-Бодрум.",
              })}
            />
          </aside>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container-page">
          <h2 className="text-center">{t("vehicleTitle")}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((v) => (
              <article key={v.title} className="card overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={v.image}
                    alt={v.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 p-5">
                  <h3 className="text-lg">{v.title}</h3>
                  <p className="text-sm text-muted">{v.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page max-w-4xl">
          <h2 className="text-center">{t("includedTitle")}</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item, i) => (
              <li key={i} className="flex items-start gap-2 rounded-md border border-[var(--color-border)] bg-white p-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container-page max-w-4xl">
          <h2>
            {tx({
              tr: "Sıkça Sorulanlar",
              en: "Frequently Asked Questions",
              de: "Häufig gestellte Fragen",
              ru: "Часто задаваемые вопросы",
            })}
          </h2>
          <div className="mt-6">
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>
    </>
  );
}
