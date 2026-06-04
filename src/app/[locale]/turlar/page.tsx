import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Anchor, Waves, Mountain, Landmark } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { InquiryForm } from "@/components/InquiryForm";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { PartnerServiceBanner } from "@/components/PartnerServiceBanner";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.bodrumapartkiralama.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tours" });
  const url =
    locale === "tr"
      ? `${SITE_URL}/turlar`
      : `${SITE_URL}/${locale}/turlar`;
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
  const t = await getTranslations({ locale, namespace: "tours" });
  const c = await getTranslations({ locale, namespace: "common" });
  const isTr = locale === "tr";

  type L = "tr" | "en" | "de" | "ru";
  const pick = locale as L;
  const tx = <T,>(o: Record<L, T>): T => o[pick] ?? o.en;

  const tours = [
    {
      title: t("tour1Title"),
      desc: t("tour1Desc"),
      price: t("tour1Price"),
      icon: Anchor,
      image:
        "https://images.unsplash.com/photo-1727713682954-271a2135c375?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: t("tour2Title"),
      desc: t("tour2Desc"),
      price: t("tour2Price"),
      icon: Waves,
      image:
        "https://images.unsplash.com/photo-1566084091852-0385135abadc?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: t("tour3Title"),
      desc: t("tour3Desc"),
      price: t("tour3Price"),
      icon: Mountain,
      image:
        "https://images.unsplash.com/photo-1598114570969-a4df3e85de9b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: t("tour4Title"),
      desc: t("tour4Desc"),
      price: t("tour4Price"),
      icon: Landmark,
      image:
        "https://images.unsplash.com/photo-1734723042943-db74efd1d40a?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const faqByLocale = {
    tr: [
      {
        q: "Turlara nasıl katılırım?",
        a: "Sağdaki formdan veya WhatsApp'tan tarih ve kişi sayınızı paylaşın. Müsaitliği teyit edip rezervasyon onayı gönderiyoruz.",
      },
      {
        q: "Otelden alış var mı?",
        a: "Çoğu turda merkezi otel ve apartlardan ücretsiz transfer vardır. Apartınızın konumuna göre buluşma noktası belirleniyor.",
      },
      {
        q: "Yemek dahil mi?",
        a: "Mavi tur ve jeep safari turlarında öğle yemeği dahildir. Dalış turlarında küçük ikram ve içecek sunulur.",
      },
      {
        q: "Çocuklar katılabilir mi?",
        a: "Mavi tur ve antik kent turlarına her yaş katılabilir. Dalış için minimum 10 yaş, jeep safari için 7 yaş şartı vardır.",
      },
      {
        q: "Özel tur düzenleyebilir miyiz?",
        a: "Evet. Aileye veya gruba özel tekne, jeep veya rehber kiralanabilir. Form üzerinden bütçenizi ve isteklerinizi paylaşın.",
      },
    ],
    en: [
      {
        q: "How do I join a tour?",
        a: "Share your date and group size via the form or WhatsApp. We confirm availability and send a booking confirmation.",
      },
      {
        q: "Is there hotel pick-up?",
        a: "Most tours include free pick-up from central hotels and apartments. The meeting point depends on your apartment's location.",
      },
      {
        q: "Is lunch included?",
        a: "Lunch is included in the blue cruise and jeep safari tours. Diving tours include light snacks and drinks.",
      },
      {
        q: "Can children join?",
        a: "All ages can join the blue cruise and ancient city tours. Diving requires minimum age 10; jeep safari, age 7.",
      },
      {
        q: "Can we arrange a private tour?",
        a: "Yes. Private boat, jeep or guide can be arranged for your family or group. Share your budget and wishes via the form.",
      },
    ],
    de: [
      {
        q: "Wie nehme ich an einer Tour teil?",
        a: "Teilen Sie uns Datum und Personenzahl über das Formular oder WhatsApp mit. Wir bestätigen die Verfügbarkeit und senden Ihnen eine Buchungsbestätigung.",
      },
      {
        q: "Gibt es eine Abholung am Hotel?",
        a: "Die meisten Touren beinhalten eine kostenlose Abholung von zentralen Hotels und Apartments. Der Treffpunkt richtet sich nach der Lage Ihres Apartments.",
      },
      {
        q: "Ist das Mittagessen inbegriffen?",
        a: "Bei der Blauen Reise und den Jeep-Safari-Touren ist das Mittagessen inbegriffen. Bei Tauchtouren werden kleine Snacks und Getränke gereicht.",
      },
      {
        q: "Können Kinder teilnehmen?",
        a: "An der Blauen Reise und den Touren zu antiken Stätten können alle Altersgruppen teilnehmen. Für das Tauchen gilt ein Mindestalter von 10 Jahren, für die Jeep-Safari von 7 Jahren.",
      },
      {
        q: "Können wir eine private Tour buchen?",
        a: "Ja. Für Ihre Familie oder Gruppe lassen sich ein privates Boot, ein Jeep oder ein Guide buchen. Teilen Sie uns Ihr Budget und Ihre Wünsche über das Formular mit.",
      },
    ],
    ru: [
      {
        q: "Как присоединиться к туру?",
        a: "Сообщите дату и количество человек через форму или WhatsApp. Мы подтвердим наличие мест и пришлём подтверждение бронирования.",
      },
      {
        q: "Есть ли трансфер от отеля?",
        a: "В большинство туров входит бесплатный трансфер от центральных отелей и апартаментов. Место встречи зависит от расположения ваших апартаментов.",
      },
      {
        q: "Входит ли обед?",
        a: "В «Голубой круиз» и джип-сафари обед включён. В дайвинг-турах предлагаются лёгкие закуски и напитки.",
      },
      {
        q: "Могут ли участвовать дети?",
        a: "В «Голубой круиз» и туры по античным городам можно с любого возраста. Для дайвинга минимальный возраст 10 лет, для джип-сафари — 7 лет.",
      },
      {
        q: "Можно ли организовать частный тур?",
        a: "Да. Для вашей семьи или группы можно арендовать частную яхту, джип или гида. Сообщите ваш бюджет и пожелания через форму.",
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
      url: `${SITE_URL}/turlar`,
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
        image="https://images.unsplash.com/photo-1591078314870-fe9b75a1665a?auto=format&fit=crop&w=2000&q=80"
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
          tr: "Bodrum turları (mavi tur, dalış, jeep safari, antik kent) anlaşmalı tur operatörlerimiz tarafından yürütülür. Rehber, ulaşım, öğle yemeği ve sigorta operatörün paket kapsamındadır. Biz uygun turu seçmenize yardımcı oluyoruz.",
          en: "Bodrum tours (blue cruise, diving, jeep safari, ancient cities) are run by our partner tour operators. Guide, transport, lunch and insurance are inside the operator's package. We help you pick the right tour.",
          de: "Die Bodrum-Touren (Blaue Reise, Tauchen, Jeep-Safari, antike Stätten) werden von unseren Partner-Tourveranstaltern durchgeführt. Guide, Transport, Mittagessen und Versicherung sind im Paket des Veranstalters enthalten. Wir helfen Ihnen, die passende Tour auszuwählen.",
          ru: "Туры по Бодруму («Голубой круиз», дайвинг, джип-сафари, античные города) проводят наши партнёры — туроператоры. Гид, транспорт, обед и страховка входят в пакет оператора. Мы помогаем вам выбрать подходящий тур.",
        })}
        whatsappNumber={c("whatsappNumber")}
        whatsappTemplate={tx({
          tr: "Merhaba, Bodrum turları hakkında bilgi almak istiyorum. Tarih ve katılımcı sayısını söyleyince partner operatörünüze yönlendirir misiniz?",
          en: "Hello, I'd like info about Bodrum tours. Once I share date and group size, could you connect me with your partner operator?",
          de: "Hallo, ich hätte gerne Informationen zu den Bodrum-Touren. Könnten Sie mich, sobald ich Datum und Teilnehmerzahl mitteile, an Ihren Partnerbetreiber weiterleiten?",
          ru: "Здравствуйте, я хотел бы узнать о турах по Бодруму. Когда я сообщу дату и количество участников, не могли бы вы направить меня к вашему партнёру-оператору?",
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
              title: "Hangi tur, kaç kişi",
              desc: "Mavi tur, dalış, jeep safari ya da antik kent — tercihinizi ve katılımcı sayısını yazın.",
            },
            {
              num: "2",
              title: "Müsait tarih ve operatör",
              desc: "Tarihinize müsait operatörü ve fiyatı paylaşırız.",
            },
            {
              num: "3",
              title: "Rezervasyon ve katılım",
              desc: "Operatör buluşma noktasını size iletir; rehber kendisi karşılar.",
            },
          ],
          en: [
            {
              num: "1",
              title: "Which tour, how many people",
              desc: "Blue cruise, diving, jeep safari or ancient-city tour — share your pick and group size.",
            },
            {
              num: "2",
              title: "Available dates and operator",
              desc: "We share an operator available on your date and the price.",
            },
            {
              num: "3",
              title: "Booking and meeting point",
              desc: "The operator sends the meeting point; the guide receives you on the day.",
            },
          ],
          de: [
            {
              num: "1",
              title: "Welche Tour, wie viele Personen",
              desc: "Blaue Reise, Tauchen, Jeep-Safari oder Tour zu antiken Stätten — teilen Sie uns Ihre Wahl und die Teilnehmerzahl mit.",
            },
            {
              num: "2",
              title: "Verfügbare Termine und Veranstalter",
              desc: "Wir nennen Ihnen einen an Ihrem Termin verfügbaren Veranstalter und den Preis.",
            },
            {
              num: "3",
              title: "Buchung und Treffpunkt",
              desc: "Der Veranstalter teilt Ihnen den Treffpunkt mit; der Guide empfängt Sie am Tag der Tour.",
            },
          ],
          ru: [
            {
              num: "1",
              title: "Какой тур и сколько человек",
              desc: "«Голубой круиз», дайвинг, джип-сафари или тур по античному городу — укажите ваш выбор и количество участников.",
            },
            {
              num: "2",
              title: "Доступные даты и оператор",
              desc: "Мы сообщим оператора, доступного на вашу дату, и цену.",
            },
            {
              num: "3",
              title: "Бронирование и место встречи",
              desc: "Оператор сообщит место встречи; гид встретит вас в день тура.",
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
            "Mavi tur, dalış, jeep safari, antik kent ve şehir turları",
            "Sertifikalı yerel rehberler ve lisanslı operatörler",
            "Öğle yemeği, ulaşım ve sigorta paket içinde (turca göre değişir)",
            "Bireysel veya özel tur (kendi grubunuza özel)",
            "Sözleşme ve ödeme operatör üzerinden yapılır",
          ],
          en: [
            "Blue cruise, diving, jeep safari, ancient-city and city tours",
            "Certified local guides and licensed operators",
            "Lunch, transport and insurance included (varies by tour)",
            "Individual or private group tours",
            "Contract and payment handled by the operator",
          ],
          de: [
            "Blaue Reise, Tauchen, Jeep-Safari, Touren zu antiken Stätten und Stadttouren",
            "Zertifizierte lokale Guides und lizenzierte Veranstalter",
            "Mittagessen, Transport und Versicherung im Paket enthalten (je nach Tour unterschiedlich)",
            "Einzel- oder private Gruppentouren (exklusiv für Ihre Gruppe)",
            "Vertrag und Zahlung erfolgen über den Veranstalter",
          ],
          ru: [
            "«Голубой круиз», дайвинг, джип-сафари, туры по античным городам и городские туры",
            "Сертифицированные местные гиды и лицензированные операторы",
            "Обед, транспорт и страховка включены в пакет (зависит от тура)",
            "Индивидуальные или частные групповые туры (только для вашей группы)",
            "Договор и оплата оформляются через оператора",
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
              service="tour"
              subjectLine={t("h1")}
              fields={{ date: true, people: true }}
              whatsappNumber={c("whatsappNumber")}
              whatsappTemplate={tx({
                tr: "Merhaba, Bodrum turları hakkında bilgi almak istiyorum.",
                en: "Hello, I'd like info about Bodrum tours.",
                de: "Hallo, ich hätte gerne Informationen zu den Bodrum-Touren.",
                ru: "Здравствуйте, я хотел бы узнать о турах по Бодруму.",
              })}
            />
          </aside>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container-page">
          <h2 className="text-center">{t("carouselTitle")}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tours.map((tour) => {
              const Icon = tour.icon;
              return (
                <article key={tour.title} className="card overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/95 text-navy-900">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 p-5">
                    <h3 className="text-lg">{tour.title}</h3>
                    <p className="text-sm text-muted">{tour.desc}</p>
                    <p className="mt-auto text-sm font-bold text-navy-900">{tour.price}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
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
