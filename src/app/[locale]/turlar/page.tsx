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
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

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

  const tours = [
    {
      title: t("tour1Title"),
      desc: t("tour1Desc"),
      price: t("tour1Price"),
      icon: Anchor,
      image:
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: t("tour2Title"),
      desc: t("tour2Desc"),
      price: t("tour2Price"),
      icon: Waves,
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: t("tour3Title"),
      desc: t("tour3Desc"),
      price: t("tour3Price"),
      icon: Mountain,
      image:
        "https://images.unsplash.com/photo-1533740566848-5f7d3e04e3d7?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: t("tour4Title"),
      desc: t("tour4Desc"),
      price: t("tour4Price"),
      icon: Landmark,
      image:
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const faqItems = [
    {
      q: isTr ? "Turlara nasıl katılırım?" : "How do I join a tour?",
      a: isTr
        ? "Sağdaki formdan veya WhatsApp'tan tarih ve kişi sayınızı paylaşın. Müsaitliği teyit edip rezervasyon onayı gönderiyoruz."
        : "Share your date and group size via the form or WhatsApp. We confirm availability and send a booking confirmation.",
    },
    {
      q: isTr ? "Otelden alış var mı?" : "Is there hotel pick-up?",
      a: isTr
        ? "Çoğu turda merkezi otel ve apartlardan ücretsiz transfer vardır. Apartınızın konumuna göre buluşma noktası belirleniyor."
        : "Most tours include free pick-up from central hotels and apartments. The meeting point depends on your apartment's location.",
    },
    {
      q: isTr ? "Yemek dahil mi?" : "Is lunch included?",
      a: isTr
        ? "Mavi tur ve jeep safari turlarında öğle yemeği dahildir. Dalış turlarında küçük ikram ve içecek sunulur."
        : "Lunch is included in the blue cruise and jeep safari tours. Diving tours include light snacks and drinks.",
    },
    {
      q: isTr ? "Çocuklar katılabilir mi?" : "Can children join?",
      a: isTr
        ? "Mavi tur ve antik kent turlarına her yaş katılabilir. Dalış için minimum 10 yaş, jeep safari için 7 yaş şartı vardır."
        : "All ages can join the blue cruise and ancient city tours. Diving requires minimum age 10; jeep safari, age 7.",
    },
    {
      q: isTr ? "Özel tur düzenleyebilir miyiz?" : "Can we arrange a private tour?",
      a: isTr
        ? "Evet. Aileye veya gruba özel tekne, jeep veya rehber kiralanabilir. Form üzerinden bütçenizi ve isteklerinizi paylaşın."
        : "Yes. Private boat, jeep or guide can be arranged for your family or group. Share your budget and wishes via the form.",
    },
  ];

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
        badge={isTr ? "Partner Hizmet · Bodrum 2026" : "Partner Service · Bodrum 2026"}
        image="https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=2000&q=80"
        crumbs={[{ href: "/", label: isTr ? "Ana Sayfa" : "Home" }, { label: t("h1") }]}
      />

      <PartnerServiceBanner
        isTr={isTr}
        serviceLabel={isTr ? "Partner Hizmet" : "Partner Service"}
        description={
          isTr
            ? "Bodrum turları (mavi tur, dalış, jeep safari, antik kent) anlaşmalı tur operatörlerimiz tarafından yürütülür. Rehber, ulaşım, öğle yemeği ve sigorta operatörün paket kapsamındadır. Biz uygun turu seçmenize yardımcı oluyoruz."
            : "Bodrum tours (blue cruise, diving, jeep safari, ancient cities) are run by our partner tour operators. Guide, transport, lunch and insurance are inside the operator's package. We help you pick the right tour."
        }
        whatsappNumber={c("whatsappNumber")}
        whatsappTemplate={
          isTr
            ? "Merhaba, Bodrum turları hakkında bilgi almak istiyorum. Tarih ve katılımcı sayısını söyleyince partner operatörünüze yönlendirir misiniz?"
            : "Hello, I'd like info about Bodrum tours. Once I share date and group size, could you connect me with your partner operator?"
        }
        whatsappCtaLabel={isTr ? "WhatsApp ile sor" : "Ask on WhatsApp"}
        steps={[
          {
            num: "1",
            title: isTr ? "Hangi tur, kaç kişi" : "Which tour, how many people",
            desc: isTr
              ? "Mavi tur, dalış, jeep safari ya da antik kent — tercihinizi ve katılımcı sayısını yazın."
              : "Blue cruise, diving, jeep safari or ancient-city tour — share your pick and group size.",
          },
          {
            num: "2",
            title: isTr ? "Müsait tarih ve operatör" : "Available dates and operator",
            desc: isTr
              ? "Tarihinize müsait operatörü ve fiyatı paylaşırız."
              : "We share an operator available on your date and the price.",
          },
          {
            num: "3",
            title: isTr ? "Rezervasyon ve katılım" : "Booking and meeting point",
            desc: isTr
              ? "Operatör buluşma noktasını size iletir; rehber kendisi karşılar."
              : "The operator sends the meeting point; the guide receives you on the day.",
          },
        ]}
        coverageTitle={isTr ? "Partner Hizmet Kapsamı" : "Partner Service Scope"}
        coverage={
          isTr
            ? [
                "Mavi tur, dalış, jeep safari, antik kent ve şehir turları",
                "Sertifikalı yerel rehberler ve lisanslı operatörler",
                "Öğle yemeği, ulaşım ve sigorta paket içinde (turca göre değişir)",
                "Bireysel veya özel tur (kendi grubunuza özel)",
                "Sözleşme ve ödeme operatör üzerinden yapılır",
              ]
            : [
                "Blue cruise, diving, jeep safari, ancient-city and city tours",
                "Certified local guides and licensed operators",
                "Lunch, transport and insurance included (varies by tour)",
                "Individual or private group tours",
                "Contract and payment handled by the operator",
              ]
        }
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
              whatsappTemplate={isTr ? "Merhaba, Bodrum turları hakkında bilgi almak istiyorum." : "Hello, I'd like info about Bodrum tours."}
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
          <h2>{isTr ? "Sıkça Sorulanlar" : "Frequently Asked Questions"}</h2>
          <div className="mt-6">
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>
    </>
  );
}
