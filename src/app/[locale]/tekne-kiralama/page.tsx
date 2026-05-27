import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check, Anchor, Calendar, Users, Sun } from "lucide-react";
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
  const t = await getTranslations({ locale, namespace: "boat" });
  const url =
    locale === "tr"
      ? `${SITE_URL}/tekne-kiralama`
      : `${SITE_URL}/${locale}/tekne-kiralama`;
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
  const t = await getTranslations({ locale, namespace: "boat" });
  const c = await getTranslations({ locale, namespace: "common" });
  const isTr = locale === "tr";

  const types = [
    { title: t("boatType1Title"), desc: t("boatType1Desc"), price: t("boatType1Price"), icon: Sun },
    { title: t("boatType2Title"), desc: t("boatType2Desc"), price: t("boatType2Price"), icon: Anchor },
    { title: t("boatType3Title"), desc: t("boatType3Desc"), price: t("boatType3Price"), icon: Calendar },
    { title: t("boatType4Title"), desc: t("boatType4Desc"), price: t("boatType4Price"), icon: Users },
  ];

  const routes = [t("route1"), t("route2"), t("route3"), t("route4"), t("route5")];

  const faqItems = [
    {
      q: isTr ? "Tekneyi nasıl rezerve ederim?" : "How do I book a boat?",
      a: isTr
        ? "Sağdaki formu doldurun veya WhatsApp'tan yazın. 1 saat içinde size müsaitlik ve net fiyat teklifi gönderiyoruz."
        : "Fill in the form on the right or message us on WhatsApp. We send availability and a fixed quote within 1 hour.",
    },
    {
      q: isTr ? "Fiyata neler dahil?" : "What is included in the price?",
      a: isTr
        ? "Kaptan, yakıt, sigorta, mola yerlerinde yüzme molaları, öğle yemeği ve içecek (alkol hariç) dahildir. Şef, müzik sistemi, alkol gibi ekler talep üzerine eklenir."
        : "Captain, fuel, insurance, swim stops, lunch and non-alcoholic drinks are included. Chef, sound system, alcohol etc. are added on request.",
    },
    {
      q: isTr ? "Hangi günler kalkış olur?" : "Which days do tours run?",
      a: isTr
        ? "Günlük tekne turları haziran-eylül arasında her gün, mayıs-ekim arasında haftada 3-5 gün kalkar. Mavi tur paketleri her gün başlatılabilir."
        : "Daily tours run every day from June to September, and 3-5 days a week from May to October. Blue cruise packages can start any day.",
    },
    {
      q: isTr ? "Çocuklarla katılabilir miyiz?" : "Can we bring children?",
      a: isTr
        ? "Evet. Tüm teknelerimizde can yeleği vardır. Bebekler ve çocuklar için özel önlem alıyoruz; lütfen yaşları formda belirtin."
        : "Yes. Life vests are available on all boats. We take special care for infants and children — please note their ages in the form.",
    },
    {
      q: isTr ? "Hava bozarsa ne oluyor?" : "What happens if the weather is bad?",
      a: isTr
        ? "Hava koşulları nedeniyle iptal edilen turlarda ücret iade edilir veya başka bir güne kaydırılır. Karar kaptanın güvenlik değerlendirmesine göre verilir."
        : "If a tour is cancelled due to weather, you'll get a full refund or a free reschedule. The captain's safety assessment is final.",
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
      url: `${SITE_URL}/tekne-kiralama`,
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
        image="https://images.unsplash.com/photo-1500627964684-141351970a7f?auto=format&fit=crop&w=2000&q=80"
        crumbs={[{ href: "/", label: isTr ? "Ana Sayfa" : "Home" }, { label: t("h1") }]}
      />

      <PartnerServiceBanner
        isTr={isTr}
        serviceLabel={isTr ? "Partner Hizmet" : "Partner Service"}
        description={
          isTr
            ? "Tekne kiralama operasyonu, Bodrum'da yıllardır çalışan lisanslı yerel kaptan ve charter ortaklarımız tarafından yürütülür. Talebinizi alıyor, mevcut uygun teknelerle eşleştiriyor ve sizi doğrudan operatöre yönlendiriyoruz. Sözleşme ve ödeme operatörle yapılır."
            : "Boat rentals are operated by our licensed local captain and charter partners in Bodrum. We collect your request, match you with available boats and connect you directly with the operator. Contract and payment are with the operator."
        }
        whatsappNumber={c("whatsappNumber")}
        whatsappTemplate={
          isTr
            ? "Merhaba, Bodrum'da tekne kiralamak istiyorum. Tarih ve kişi sayısı için partner operatörünüze yönlendirir misiniz?"
            : "Hello, I'd like to rent a boat in Bodrum. Could you connect me with your partner operator with dates and group size?"
        }
        whatsappCtaLabel={isTr ? "WhatsApp ile sor" : "Ask on WhatsApp"}
        steps={[
          {
            num: "1",
            title: isTr ? "Tarihi ve kişi sayısını yazın" : "Share dates and group size",
            desc: isTr
              ? "Sağdaki formu doldurun ya da WhatsApp'tan kısa bir mesaj atın."
              : "Use the form on the right or send a short WhatsApp message.",
          },
          {
            num: "2",
            title: isTr ? "Müsait teknelerle eşleştirelim" : "We match available boats",
            desc: isTr
              ? "Bütçe ve tarih için uygun gulet, tur teknesi veya motoryat seçeneklerini iletelim."
              : "We send you suitable gulet, day-tour or motoryacht options for your dates.",
          },
          {
            num: "3",
            title: isTr ? "Operatörle doğrudan rezervasyon" : "Book directly with the operator",
            desc: isTr
              ? "Beğendiğiniz tekne için operatörle iletişim kuruyoruz; sözleşme ve ödeme onlarla yapılır."
              : "We introduce you to the operator; contract and payment happen directly with them.",
          },
        ]}
        coverageTitle={isTr ? "Partner Hizmet Kapsamı" : "Partner Service Scope"}
        coverage={
          isTr
            ? [
                "Bodrum, Yalıkavak ve Turgutreis kalkışlı turlar",
                "Günlük tekne, mavi tur gulet ve özel motoryat",
                "Kaptanlı kiralama (bareboat dahil değil)",
                "Sigorta ve denetimleri güncel lisanslı operatörler",
                "Ödeme, fatura ve sözleşme operatör tarafından yapılır",
              ]
            : [
                "Tours starting from Bodrum, Yalıkavak and Turgutreis",
                "Day-tour boats, blue-cruise gulets and private motoryachts",
                "Skippered rentals (bareboat not included)",
                "Licensed operators with current insurance and inspections",
                "Payment, invoicing and contracts handled by the operator",
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
              service="boat"
              subjectLine={t("h1")}
              fields={{ date: true, people: true }}
              whatsappNumber={c("whatsappNumber")}
              whatsappTemplate={isTr ? "Merhaba, Bodrum'da tekne kiralamak istiyorum." : "Hello, I'd like to rent a boat in Bodrum."}
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
          <h2>{isTr ? "Sıkça Sorulanlar" : "Frequently Asked Questions"}</h2>
          <div className="mt-6">
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>
    </>
  );
}
