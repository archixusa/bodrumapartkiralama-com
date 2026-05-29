import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check, Car, Gauge, ShieldCheck, Crown } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { InquiryForm } from "@/components/InquiryForm";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PartnerServiceBanner } from "@/components/PartnerServiceBanner";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "car" });
  const url =
    locale === "tr"
      ? `${SITE_URL}/arac-kiralama`
      : `${SITE_URL}/${locale}/arac-kiralama`;
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: { canonical: url },
    openGraph: { title: t("metaTitle"), description: t("metaDesc"), url },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "car" });
  const c = await getTranslations({ locale, namespace: "common" });
  const isTr = locale === "tr";

  type L = "tr" | "en" | "de" | "ru";
  const pick = locale as L;
  const tx = <T,>(o: Record<L, T>): T => o[pick] ?? o.en;

  const classes = [
    { title: t("carClass1Title"), desc: t("carClass1Desc"), price: t("carClass1Price"), icon: Car },
    { title: t("carClass2Title"), desc: t("carClass2Desc"), price: t("carClass2Price"), icon: Gauge },
    { title: t("carClass3Title"), desc: t("carClass3Desc"), price: t("carClass3Price"), icon: ShieldCheck },
    { title: t("carClass4Title"), desc: t("carClass4Desc"), price: t("carClass4Price"), icon: Crown },
  ];

  const included = [t("inc1"), t("inc2"), t("inc3"), t("inc4"), t("inc5"), t("inc6")];

  const faqByLocale = {
    tr: [
      {
        q: "Aracı havalimanında nasıl teslim alırım?",
        a: "Rezervasyon onayından sonra havalimanı buluşma noktası size mesajla bildirilir. Uçuş takibi yapılır, gecikmelerde ek ücret yoktur.",
      },
      {
        q: "Hangi sigortalar dahil?",
        a: "Tam kasko + zorunlu trafik sigortası fiyata dahildir. Lastik, cam ve far gibi ek korumalar düşük ek ücretle eklenebilir.",
      },
      {
        q: "Minimum yaş ve ehliyet süresi nedir?",
        a: "Sürücü 21 yaşında ve en az 1 yıllık ehliyete sahip olmalıdır. Premium araçlar için 25 yaş + 3 yıl ehliyet gerekir.",
      },
      {
        q: "Farklı şehirde iade mümkün mü?",
        a: "Bodrum içinde farklı noktalarda iade ücretsizdir. Bodrum dışında (örn. Marmaris, İzmir) iade için ek ücret uygulanır.",
      },
      {
        q: "Yakıt politikası nedir?",
        a: "Dolu alıp dolu teslim politikası uygulanır. Eksik teslim durumunda piyasa fiyatı üzerinden yakıt farkı tahsil edilir.",
      },
    ],
    en: [
      {
        q: "How do I pick up at the airport?",
        a: "After confirmation, the airport meeting point is sent to you. Flight tracking is in place, no extra fee for delays.",
      },
      {
        q: "Which insurance is included?",
        a: "Full collision and traffic insurance are included. Additional coverage for tyres, glass and headlights is available at a small surcharge.",
      },
      {
        q: "What is the minimum age and licence period?",
        a: "Drivers must be 21+ with at least 1 year of licence experience. Premium cars require 25+ with 3 years of licence.",
      },
      {
        q: "Can I return in a different city?",
        a: "Returning at a different point within Bodrum is free. Returns outside Bodrum (e.g. Marmaris, Izmir) incur an extra fee.",
      },
      {
        q: "What is the fuel policy?",
        a: "Full-to-full policy. If returned less than full, fuel is charged at market price.",
      },
    ],
    de: [
      {
        q: "Wie übernehme ich den Wagen am Flughafen?",
        a: "Nach der Bestätigung erhalten Sie den Treffpunkt am Flughafen per Nachricht. Ihr Flug wird verfolgt, bei Verspätungen fällt keine zusätzliche Gebühr an.",
      },
      {
        q: "Welche Versicherungen sind inbegriffen?",
        a: "Vollkasko- und gesetzliche Haftpflichtversicherung sind im Preis enthalten. Zusatzschutz für Reifen, Glas und Scheinwerfer ist gegen einen geringen Aufpreis möglich.",
      },
      {
        q: "Welches Mindestalter und welche Führerscheindauer gelten?",
        a: "Fahrer müssen mindestens 21 Jahre alt sein und seit mindestens 1 Jahr einen Führerschein besitzen. Für Premium-Fahrzeuge gelten 25 Jahre und 3 Jahre Führerschein.",
      },
      {
        q: "Ist eine Rückgabe in einer anderen Stadt möglich?",
        a: "Die Rückgabe an einem anderen Standort innerhalb von Bodrum ist kostenlos. Für Rückgaben außerhalb von Bodrum (z. B. Marmaris, Izmir) fällt eine zusätzliche Gebühr an.",
      },
      {
        q: "Wie lautet die Tankregelung?",
        a: "Es gilt die Regelung „voll übernehmen, voll zurückgeben“. Wird das Fahrzeug nicht vollgetankt zurückgegeben, wird der Kraftstoff zum Marktpreis berechnet.",
      },
    ],
    ru: [
      {
        q: "Как забрать автомобиль в аэропорту?",
        a: "После подтверждения бронирования мы пришлём вам место встречи в аэропорту. Рейс отслеживается, за задержки доплаты нет.",
      },
      {
        q: "Какие страховки включены?",
        a: "Полное КАСКО и обязательная страховка ответственности включены в цену. Дополнительную защиту шин, стёкол и фар можно добавить за небольшую доплату.",
      },
      {
        q: "Каков минимальный возраст и стаж вождения?",
        a: "Водителю должно быть не менее 21 года и иметь права не менее 1 года. Для премиальных автомобилей требуется возраст от 25 лет и стаж 3 года.",
      },
      {
        q: "Можно ли вернуть автомобиль в другом городе?",
        a: "Возврат в другой точке в пределах Бодрума бесплатный. За возврат за пределами Бодрума (например, в Мармарисе, Измире) взимается дополнительная плата.",
      },
      {
        q: "Какова политика по топливу?",
        a: "Действует правило «получить полный — вернуть полный бак». При возврате с неполным баком топливо оплачивается по рыночной цене.",
      },
    ],
  };
  const faqItems = tx(faqByLocale);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: t("h1"),
      description: t("metaDesc"),
      provider: { "@type": "LodgingBusiness", name: "Bodrumapartkiralama.com" },
      areaServed: "Bodrum, Muğla, TR",
      url: `${SITE_URL}/arac-kiralama`,
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
        title={t("h1")}
        subtitle={t("subtitle")}
        badge={tx({
          tr: "Partner Hizmet · Bodrum 2026",
          en: "Partner Service · Bodrum 2026",
          de: "Partnerservice · Bodrum 2026",
          ru: "Партнёрская услуга · Бодрум 2026",
        })}
        image="https://images.unsplash.com/photo-1598114570969?auto=format&fit=crop&w=2000&q=80"
        crumbs={[
          {
            href: "/",
            label: tx({ tr: "Ana Sayfa", en: "Home", de: "Startseite", ru: "Главная" }),
          },
          { label: t("h1") },
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
          tr: "Araç kiralama, Bodrum yarımadasında çalışan anlaşmalı rent-a-car ortaklarımızdan sağlanır. Aracın teslim alımı, sigorta ve iade işlemleri operatörle yapılır. Biz uygun aracı bulup sizi operatörle buluşturuyoruz.",
          en: "Cars are supplied by our partner rent-a-car operators based in Bodrum. Vehicle pickup, insurance and return are handled by the operator. We help you find the right car and connect you to the operator.",
          de: "Mietwagen werden von unseren Partner-Autovermietungen auf der Halbinsel Bodrum bereitgestellt. Fahrzeugübernahme, Versicherung und Rückgabe werden vom Betreiber abgewickelt. Wir helfen Ihnen, das passende Fahrzeug zu finden, und bringen Sie mit dem Betreiber zusammen.",
          ru: "Автомобили предоставляют наши партнёры — компании по аренде на полуострове Бодрум. Получение, страховку и возврат автомобиля оформляет оператор. Мы помогаем подобрать подходящую машину и связываем вас с оператором.",
        })}
        whatsappNumber={c("whatsappNumber")}
        whatsappTemplate={tx({
          tr: "Merhaba, Bodrum'da araç kiralamak istiyorum. Tarih ve teslim noktası için partner operatörünüzle eşleştirir misiniz?",
          en: "Hello, I'd like to rent a car in Bodrum. Could you match me with your partner operator for dates and pickup location?",
          de: "Hallo, ich möchte in Bodrum einen Mietwagen buchen. Könnten Sie mich für Datum und Abholort an Ihren Partnerbetreiber vermitteln?",
          ru: "Здравствуйте, я хочу арендовать автомобиль в Бодруме. Не могли бы вы подобрать мне вашего партнёра-оператора по датам и месту получения?",
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
              title: "İhtiyaç ve tarihi paylaşın",
              desc: "Kaç kişi, kaç gün, hangi sınıf araç, teslim ve iade noktası.",
            },
            {
              num: "2",
              title: "Uygun aracı bulalım",
              desc: "Anlaşmalı filolardan müsait ve bütçenize uygun aracı seçeneklerini iletiriz.",
            },
            {
              num: "3",
              title: "Teslim operatörle",
              desc: "Araç teslim, sözleşme imzası ve ödeme operatör ile yapılır; biz süreci kolaylaştırırız.",
            },
          ],
          en: [
            {
              num: "1",
              title: "Share dates and needs",
              desc: "Number of passengers, days, vehicle class, pickup and drop-off.",
            },
            {
              num: "2",
              title: "We find a suitable car",
              desc: "We suggest available cars from partner fleets matching your budget.",
            },
            {
              num: "3",
              title: "Pickup with the operator",
              desc: "Vehicle handover, contract and payment are done with the operator; we facilitate the process.",
            },
          ],
          de: [
            {
              num: "1",
              title: "Bedarf und Daten mitteilen",
              desc: "Personenzahl, Anzahl der Tage, Fahrzeugklasse sowie Abhol- und Rückgabeort.",
            },
            {
              num: "2",
              title: "Wir finden das passende Fahrzeug",
              desc: "Wir schlagen Ihnen verfügbare Fahrzeuge aus den Partnerflotten vor, die zu Ihrem Budget passen.",
            },
            {
              num: "3",
              title: "Übernahme beim Betreiber",
              desc: "Fahrzeugübergabe, Vertrag und Zahlung erfolgen beim Betreiber; wir begleiten den Ablauf.",
            },
          ],
          ru: [
            {
              num: "1",
              title: "Сообщите даты и пожелания",
              desc: "Количество человек, дней, класс автомобиля, место получения и возврата.",
            },
            {
              num: "2",
              title: "Мы подберём подходящий автомобиль",
              desc: "Предложим доступные машины из партнёрских автопарков под ваш бюджет.",
            },
            {
              num: "3",
              title: "Получение у оператора",
              desc: "Передача автомобиля, договор и оплата оформляются у оператора; мы сопровождаем процесс.",
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
            "Milas-Bodrum Havalimanı, Bodrum merkez, Yalıkavak, Turgutreis, Bitez teslim",
            "Ekonomiden lükse, her bütçeye araç",
            "Tam sigorta ve sınırsız km opsiyonları operatör politikasına göre değişir",
            "Otele teslim çoğu noktada ücretsiz; iade noktası farklı olabilir",
            "Sözleşme, kasko ve fatura operatör tarafından düzenlenir",
          ],
          en: [
            "Pickup at Milas-Bodrum Airport, Bodrum centre, Yalıkavak, Turgutreis, Bitez",
            "Economy, compact, SUV and premium-class vehicles",
            "Full insurance and unlimited mileage options vary by operator policy",
            "Hotel delivery often free; return point can differ from pickup",
            "Contract, insurance and invoicing handled by the operator",
          ],
          de: [
            "Übernahme am Flughafen Milas-Bodrum, im Zentrum von Bodrum, in Yalıkavak, Turgutreis und Bitez",
            "Fahrzeuge für jedes Budget — von der Economy-Klasse bis zur Luxusklasse",
            "Vollversicherung und Optionen mit unbegrenzten Kilometern je nach Betreiberrichtlinie",
            "Lieferung zum Hotel an den meisten Orten kostenlos; der Rückgabeort kann abweichen",
            "Vertrag, Kaskoversicherung und Rechnung werden vom Betreiber ausgestellt",
          ],
          ru: [
            "Получение в аэропорту Милас-Бодрум, центре Бодрума, Ялыкаваке, Тургутрейсе и Битезе",
            "Автомобили на любой бюджет — от эконома до люкса",
            "Полная страховка и опции с безлимитным пробегом зависят от политики оператора",
            "Доставка в отель в большинстве мест бесплатна; место возврата может отличаться",
            "Договор, КАСКО и счёт оформляет оператор",
          ],
        })}
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4 text-[15px] leading-relaxed text-ink/90">
            <p>{t("intro1")}</p>
            <p>{t("intro2")}</p>
            <p>{t("intro3")}</p>
          </div>
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <InquiryForm
              service="car"
              subjectLine={t("h1")}
              fields={{ date: true, pickup: true, dropoff: true }}
              whatsappNumber={c("whatsappNumber")}
              whatsappTemplate={tx({
                tr: "Merhaba, Bodrum'da araç kiralamak istiyorum.",
                en: "Hello, I'd like to rent a car in Bodrum.",
                de: "Hallo, ich möchte in Bodrum einen Mietwagen buchen.",
                ru: "Здравствуйте, я хочу арендовать автомобиль в Бодруме.",
              })}
            />
          </aside>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container-page">
          <h2 className="text-center">{t("carouselTitle")}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {classes.map((cls) => {
              const Icon = cls.icon;
              return (
                <article key={cls.title} className="card flex flex-col gap-3 p-5">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-navy-50 text-navy-900">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg">{cls.title}</h3>
                  <p className="text-sm text-muted">{cls.desc}</p>
                  <p className="mt-auto text-sm font-bold text-navy-900">{cls.price}</p>
                </article>
              );
            })}
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
