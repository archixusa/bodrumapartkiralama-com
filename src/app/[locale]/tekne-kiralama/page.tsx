import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check, Anchor, Calendar, Users, Sun } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { InquiryForm } from "@/components/InquiryForm";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PartnerServiceBanner } from "@/components/PartnerServiceBanner";
import { ServiceRelatedLinks } from "@/components/ServiceRelatedLinks";
import { RelatedGuides, type RelatedLink } from "@/components/RelatedGuides";
import { getSiteContent } from "@/lib/content";
import { buildAlternates, buildLocaleUrl, defaultOgImages } from "@/lib/seo";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.bodrumapartkiralama.com";

const RELATED_LINKS: RelatedLink[] = [
  {
    href: "/turlar",
    labels: { tr: "Bodrum turları", en: "Bodrum tours", de: "Bodrum-Touren", ru: "Туры по Бодруму" },
  },
  {
    href: "/blog/bodrum-tekne-turu-rehberi",
    labels: { tr: "Bodrum tekne turu rehberi", en: "Bodrum boat tour guide", de: "Bodrum Bootstour-Reiseführer", ru: "Гид по морским прогулкам" },
  },
  {
    href: "/blog/bodrum-plajlari",
    labels: { tr: "Bodrum plajları rehberi", en: "Bodrum beaches guide", de: "Strände von Bodrum", ru: "Путеводитель по пляжам" },
  },
];

// ── DB-backed hero copy (section_key "tekne.hero") ───────────────────────────
// Falls back to the in-code default below when no published row exists, so the
// page renders byte-identical to today for normal visitors.
type TekneHeroCopy = { kicker: string; title: string; sub: string };
type ByLocale<T> = Record<"tr" | "en" | "de" | "ru", T>;

const TEKNE_HERO_DEFAULT: ByLocale<TekneHeroCopy> = {
  tr: {
    kicker: "Partner Hizmet · Bodrum 2026",
    title: "Bodrum Tekne Kiralama",
    sub: "Günlük tur, mavi tur, özel charter — her plana uygun tekne ve rota.",
  },
  en: {
    kicker: "Partner Service · Bodrum 2026",
    title: "Bodrum Boat Rental",
    sub: "Daily tour, blue cruise, private charter — a boat and route for every plan.",
  },
  de: {
    kicker: "Partnerservice · Bodrum 2026",
    title: "Bodrum Bootsverleih",
    sub: "Tagestour, Blaue Reise, Privatcharter – ein Boot und eine Route für jeden Plan.",
  },
  ru: {
    kicker: "Партнёрская услуга · Бодрум 2026",
    title: "Аренда яхт в Бодруме",
    sub: "Дневная прогулка, круиз вдоль побережья, частный чартер — яхта и маршрут под любой план.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "boat" });
  const url =
    locale === "tr"
      ? `${SITE_URL}/tekne-kiralama`
      : `${SITE_URL}/${locale}/tekne-kiralama`;
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: buildAlternates(locale, "/tekne-kiralama"),
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
  const t = await getTranslations({ locale, namespace: "boat" });
  const c = await getTranslations({ locale, namespace: "common" });
  const isTr = locale === "tr";

  type L = "tr" | "en" | "de" | "ru";
  const pick = locale as L;
  const tx = <T,>(o: Record<L, T>): T => o[pick] ?? o.en;

  // ── HERO (DB-backed; falls back to in-code default when no published row) ──
  const hero =
    (await getSiteContent<ByLocale<TekneHeroCopy>>("tekne.hero")) ??
    TEKNE_HERO_DEFAULT;
  const heroCopy = hero[pick] ?? hero.en;

  const types = [
    { title: t("boatType1Title"), desc: t("boatType1Desc"), price: t("boatType1Price"), icon: Sun },
    { title: t("boatType2Title"), desc: t("boatType2Desc"), price: t("boatType2Price"), icon: Anchor },
    { title: t("boatType3Title"), desc: t("boatType3Desc"), price: t("boatType3Price"), icon: Calendar },
    { title: t("boatType4Title"), desc: t("boatType4Desc"), price: t("boatType4Price"), icon: Users },
  ];

  const routes = [t("route1"), t("route2"), t("route3"), t("route4"), t("route5")];

  const faqByLocale = {
    tr: [
      {
        q: "Tekneyi nasıl rezerve ederim?",
        a: "Sağdaki formu doldurun veya WhatsApp'tan yazın. 1 saat içinde size müsaitlik ve net fiyat teklifi gönderiyoruz.",
      },
      {
        q: "Fiyata neler dahil?",
        a: "Kaptan, yakıt, sigorta, mola yerlerinde yüzme molaları, öğle yemeği ve içecek (alkol hariç) dahildir. Şef, müzik sistemi, alkol gibi ekler talep üzerine eklenir.",
      },
      {
        q: "Hangi günler kalkış olur?",
        a: "Günlük tekne turları haziran-eylül arasında her gün, mayıs-ekim arasında haftada 3-5 gün kalkar. Mavi tur paketleri her gün başlatılabilir.",
      },
      {
        q: "Çocuklarla katılabilir miyiz?",
        a: "Evet. Tüm teknelerimizde can yeleği vardır. Bebekler ve çocuklar için özel önlem alıyoruz; lütfen yaşları formda belirtin.",
      },
      {
        q: "Hava bozarsa ne oluyor?",
        a: "Hava koşulları nedeniyle iptal edilen turlarda ücret iade edilir veya başka bir güne kaydırılır. Karar kaptanın güvenlik değerlendirmesine göre verilir.",
      },
    ],
    en: [
      {
        q: "How do I book a boat?",
        a: "Fill in the form on the right or message us on WhatsApp. We send availability and a fixed quote within 1 hour.",
      },
      {
        q: "What is included in the price?",
        a: "Captain, fuel, insurance, swim stops, lunch and non-alcoholic drinks are included. Chef, sound system, alcohol etc. are added on request.",
      },
      {
        q: "Which days do tours run?",
        a: "Daily tours run every day from June to September, and 3-5 days a week from May to October. Blue cruise packages can start any day.",
      },
      {
        q: "Can we bring children?",
        a: "Yes. Life vests are available on all boats. We take special care for infants and children — please note their ages in the form.",
      },
      {
        q: "What happens if the weather is bad?",
        a: "If a tour is cancelled due to weather, you'll get a full refund or a free reschedule. The captain's safety assessment is final.",
      },
    ],
    de: [
      {
        q: "Wie buche ich ein Boot?",
        a: "Füllen Sie das Formular rechts aus oder schreiben Sie uns auf WhatsApp. Innerhalb von 1 Stunde senden wir Ihnen die Verfügbarkeit und ein verbindliches Angebot.",
      },
      {
        q: "Was ist im Preis enthalten?",
        a: "Kapitän, Kraftstoff, Versicherung, Badestopps an den Anlegestellen, Mittagessen und alkoholfreie Getränke sind inbegriffen. Koch, Soundsystem, Alkohol und Ähnliches kommen auf Wunsch hinzu.",
      },
      {
        q: "An welchen Tagen finden die Touren statt?",
        a: "Tagestouren finden von Juni bis September täglich statt, von Mai bis Oktober an 3-5 Tagen pro Woche. Pakete für die Blaue Reise können an jedem Tag beginnen.",
      },
      {
        q: "Können wir mit Kindern teilnehmen?",
        a: "Ja. Auf allen unseren Booten sind Rettungswesten vorhanden. Für Babys und Kinder treffen wir besondere Vorkehrungen — bitte geben Sie ihr Alter im Formular an.",
      },
      {
        q: "Was passiert bei schlechtem Wetter?",
        a: "Wird eine Tour wetterbedingt abgesagt, erhalten Sie eine vollständige Rückerstattung oder eine kostenlose Umbuchung. Maßgeblich ist die Sicherheitseinschätzung des Kapitäns.",
      },
    ],
    ru: [
      {
        q: "Как забронировать яхту?",
        a: "Заполните форму справа или напишите нам в WhatsApp. В течение 1 часа мы пришлём вам наличие мест и фиксированное предложение.",
      },
      {
        q: "Что входит в стоимость?",
        a: "В стоимость входят капитан, топливо, страховка, остановки для купания, обед и безалкогольные напитки. Повар, музыкальная система, алкоголь и прочее добавляются по запросу.",
      },
      {
        q: "В какие дни отправляются туры?",
        a: "Дневные туры на яхте отправляются ежедневно с июня по сентябрь и 3-5 дней в неделю с мая по октябрь. Пакеты «Голубого круиза» можно начинать в любой день.",
      },
      {
        q: "Можно ли с детьми?",
        a: "Да. На всех наших яхтах есть спасательные жилеты. Для младенцев и детей мы принимаем особые меры предосторожности — пожалуйста, укажите их возраст в форме.",
      },
      {
        q: "Что будет при плохой погоде?",
        a: "Если тур отменяется из-за погоды, вы получите полный возврат средств или бесплатный перенос на другой день. Решение принимается на основе оценки безопасности капитаном.",
      },
    ],
  };
  const faqItems = tx(faqByLocale);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: heroCopy.title,
      serviceType: tx({
        tr: "Tekne kiralama",
        en: "Boat rental",
        de: "Bootsverleih",
        ru: "Аренда яхт",
      }),
      description: t("metaDesc"),
      provider: {
        "@type": "Organization",
        name: "Bodrumapartkiralama.com",
        url: SITE_URL,
      },
      areaServed: { "@type": "Place", name: "Bodrum" },
      url: `${SITE_URL}/tekne-kiralama`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      // Locale-duyarlı item URL'leri (district/blog deseni): breadcrumb halkaları
      // sayfanın gerçek locale-prefix'li canonical'iyle eşleşir; eskiden
      // locale-kör SITE_URL idi.
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: tx({ tr: "Ana Sayfa", en: "Home", de: "Startseite", ru: "Главная" }),
          item: buildLocaleUrl(locale, ""),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: heroCopy.title,
          item: buildLocaleUrl(locale, "/tekne-kiralama"),
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
        image="https://images.unsplash.com/photo-1564166489229-dfb970a591bf?auto=format&fit=crop&w=2000&q=80"
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
          tr: "Tekne kiralama operasyonu, Bodrum'da yıllardır çalışan lisanslı yerel kaptan ve charter ortaklarımız tarafından yürütülür. Talebinizi alıyor, mevcut uygun teknelerle eşleştiriyor ve sizi doğrudan operatöre yönlendiriyoruz. Sözleşme ve ödeme operatörle yapılır.",
          en: "Boat rentals are operated by our licensed local captain and charter partners in Bodrum. We collect your request, match you with available boats and connect you directly with the operator. Contract and payment are with the operator.",
          de: "Die Bootsvermietung wird von unseren lizenzierten lokalen Kapitänen und Charterpartnern durchgeführt, die seit Jahren in Bodrum tätig sind. Wir nehmen Ihre Anfrage auf, bringen Sie mit verfügbaren Booten zusammen und leiten Sie direkt an den Betreiber weiter. Vertrag und Zahlung erfolgen beim Betreiber.",
          ru: "Аренду яхт обеспечивают наши лицензированные местные капитаны и чартерные партнёры, работающие в Бодруме много лет. Мы принимаем вашу заявку, подбираем доступные яхты и направляем вас напрямую к оператору. Договор и оплата оформляются у оператора.",
        })}
        whatsappNumber={c("whatsappNumber")}
        whatsappTemplate={tx({
          tr: "Merhaba, Bodrum'da tekne kiralamak istiyorum. Tarih ve kişi sayısı için partner operatörünüze yönlendirir misiniz?",
          en: "Hello, I'd like to rent a boat in Bodrum. Could you connect me with your partner operator with dates and group size?",
          de: "Hallo, ich möchte in Bodrum ein Boot mieten. Könnten Sie mich mit Datum und Personenzahl an Ihren Partnerbetreiber weiterleiten?",
          ru: "Здравствуйте, я хочу арендовать яхту в Бодруме. Не могли бы вы связать меня с вашим партнёром-оператором, указав даты и количество человек?",
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
              title: "Tarihi ve kişi sayısını yazın",
              desc: "Sağdaki formu doldurun ya da WhatsApp'tan kısa bir mesaj atın.",
            },
            {
              num: "2",
              title: "Müsait teknelerle eşleştirelim",
              desc: "Bütçe ve tarih için uygun gulet, tur teknesi veya motoryat seçeneklerini iletelim.",
            },
            {
              num: "3",
              title: "Operatörle doğrudan rezervasyon",
              desc: "Beğendiğiniz tekne için operatörle iletişim kuruyoruz; sözleşme ve ödeme onlarla yapılır.",
            },
          ],
          en: [
            {
              num: "1",
              title: "Share dates and group size",
              desc: "Use the form on the right or send a short WhatsApp message.",
            },
            {
              num: "2",
              title: "We match available boats",
              desc: "We send you suitable gulet, day-tour or motoryacht options for your dates.",
            },
            {
              num: "3",
              title: "Book directly with the operator",
              desc: "We introduce you to the operator; contract and payment happen directly with them.",
            },
          ],
          de: [
            {
              num: "1",
              title: "Datum und Personenzahl angeben",
              desc: "Füllen Sie das Formular rechts aus oder schreiben Sie uns kurz auf WhatsApp.",
            },
            {
              num: "2",
              title: "Wir bringen Sie mit verfügbaren Booten zusammen",
              desc: "Wir senden Ihnen passende Gulet-, Tagestour- oder Motoryacht-Optionen für Ihr Budget und Datum.",
            },
            {
              num: "3",
              title: "Direkte Buchung beim Betreiber",
              desc: "Für das gewünschte Boot stellen wir den Kontakt zum Betreiber her; Vertrag und Zahlung erfolgen mit ihm.",
            },
          ],
          ru: [
            {
              num: "1",
              title: "Укажите даты и количество человек",
              desc: "Заполните форму справа или отправьте короткое сообщение в WhatsApp.",
            },
            {
              num: "2",
              title: "Мы подберём доступные яхты",
              desc: "Пришлём подходящие варианты гулетов, прогулочных яхт или моторных яхт под ваш бюджет и даты.",
            },
            {
              num: "3",
              title: "Бронирование напрямую у оператора",
              desc: "Для выбранной яхты мы связываем вас с оператором; договор и оплата оформляются с ним.",
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
            "Bodrum, Yalıkavak ve Turgutreis kalkışlı turlar",
            "Günlük tekne, mavi tur gulet ve özel motoryat",
            "Kaptanlı kiralama (bareboat dahil değil)",
            "Sigorta ve denetimleri güncel lisanslı operatörler",
            "Ödeme, fatura ve sözleşme operatör tarafından yapılır",
          ],
          en: [
            "Tours starting from Bodrum, Yalıkavak and Turgutreis",
            "Day-tour boats, blue-cruise gulets and private motoryachts",
            "Skippered rentals (bareboat not included)",
            "Licensed operators with current insurance and inspections",
            "Payment, invoicing and contracts handled by the operator",
          ],
          de: [
            "Touren mit Start in Bodrum, Yalıkavak und Turgutreis",
            "Tagesausflugsboote, Gulets für die Blaue Reise und private Motoryachten",
            "Vermietung mit Skipper (Bareboat nicht inbegriffen)",
            "Lizenzierte Betreiber mit aktueller Versicherung und Prüfungen",
            "Zahlung, Rechnung und Vertrag werden vom Betreiber abgewickelt",
          ],
          ru: [
            "Туры с отправлением из Бодрума, Ялыкавака и Тургутрейса",
            "Прогулочные яхты, гулеты для «Голубого круиза» и частные моторные яхты",
            "Аренда с капитаном (без бербоут-чартера)",
            "Лицензированные операторы с действующей страховкой и техосмотром",
            "Оплату, счёт и договор оформляет оператор",
          ],
        })}
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4 text-base md:text-[15px] leading-relaxed text-ink/90">
            <p>{t("intro1")}</p>
            <p>{t("intro2")}</p>
            <p>{t("intro3")}</p>
            <ServiceRelatedLinks locale={locale} />
            <RelatedGuides locale={locale} links={RELATED_LINKS} />
          </div>
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <InquiryForm
              service="boat"
              subjectLine={heroCopy.title}
              fields={{ date: true, people: true }}
              whatsappNumber={c("whatsappNumber")}
              whatsappTemplate={tx({
                tr: "Merhaba, Bodrum'da tekne kiralamak istiyorum.",
                en: "Hello, I'd like to rent a boat in Bodrum.",
                de: "Hallo, ich möchte in Bodrum ein Boot mieten.",
                ru: "Здравствуйте, я хочу арендовать яхту в Бодруме.",
              })}
            />
          </aside>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container-page">
          <h2 className="text-center">{t("carouselTitle")}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {types.map((type) => {
              const Icon = type.icon;
              return (
                <article key={type.title} className="card flex flex-col gap-3 p-5">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-navy-50 text-navy-900">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg">{type.title}</h3>
                  <p className="text-sm text-muted">{type.desc}</p>
                  <p className="mt-auto text-sm font-bold text-navy-900">{type.price}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page max-w-3xl">
          <h2 className="text-center">{t("popularRoutesTitle")}</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {routes.map((route, i) => (
              <li key={i} className="flex items-start gap-2 rounded-md border border-[var(--color-border)] bg-white p-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>{route}</span>
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
