import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { InquiryForm } from "@/components/InquiryForm";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

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
  const t = await getTranslations({ locale, namespace: "transfer" });
  const c = await getTranslations({ locale, namespace: "common" });
  const isTr = locale === "tr";

  const vehicles = [
    {
      title: t("vehicle1Title"),
      desc: t("vehicle1Desc"),
      image:
        "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: t("vehicle2Title"),
      desc: t("vehicle2Desc"),
      image:
        "https://images.unsplash.com/photo-1601932195800-fae5a0c44889?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: t("vehicle3Title"),
      desc: t("vehicle3Desc"),
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const included = [t("inc1"), t("inc2"), t("inc3"), t("inc4"), t("inc5"), t("inc6")];

  const faqItems = [
    {
      q: isTr ? "Fiyat nasıl belirleniyor?" : "How is the price set?",
      a: isTr
        ? "Fiyat; kişi sayısı, varış bölgesi, araç tipi ve gidiş-dönüş tercihine göre belirlenir. Form gönderdiğinizde size sabit, KDV dahil net teklif sunuyoruz."
        : "Price is set by group size, destination, vehicle type and one-way/round-trip choice. When you submit the form, we send a fixed quote (taxes included).",
    },
    {
      q: isTr ? "Uçuş gecikirse ek ücret var mı?" : "Is there a surcharge for flight delays?",
      a: isTr
        ? "Hayır. Şoförümüz uçuş takibi yapar ve gerektiği kadar bekler. Gece geç saat veya tatil dönemlerinde de ek ücret almıyoruz."
        : "No. Our driver tracks your flight and waits as needed. We don't charge surcharges at night or during peak season.",
    },
    {
      q: isTr ? "Bebek koltuğu var mı?" : "Are baby seats available?",
      a: isTr
        ? "Evet. Bebek (0-1 yaş), çocuk (1-4 yaş) ve büyütücü (4-12 yaş) koltuk talep üzerine ücretsiz sağlanır. Lütfen formda belirtin."
        : "Yes. Infant (0-1), toddler (1-4) and booster (4-12) seats are provided free on request — please note it in the form.",
    },
    {
      q: isTr ? "Tek yön veya gidiş-dönüş, hangisi daha mantıklı?" : "Should I book one-way or round-trip?",
      a: isTr
        ? "Gidiş-dönüş seçtiğinizde %10 indirim uygulanıyor. Dönüş tarihinizden emin değilseniz dönüşü sonra da rezerve edebilirsiniz."
        : "Round-trip gets a 10% discount. If you're not sure about your return date, you can book the return later.",
    },
    {
      q: isTr ? "Hangi bölgelere transfer sağlıyorsunuz?" : "Which areas do you serve?",
      a: isTr
        ? "Milas-Bodrum Havalimanı'ndan tüm Bodrum yarımadasına: Gümbet, Turgutreis, Yalıkavak, Bitez, Ortakent, Gündoğan, Torba ve Bodrum merkez."
        : "From Milas-Bodrum Airport to the entire Bodrum peninsula: Gümbet, Turgutreis, Yalıkavak, Bitez, Ortakent, Gündoğan, Torba and Bodrum centre.",
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      name: t("h1"),
      description: t("metaDesc"),
      provider: { "@type": "LodgingBusiness", name: "Bodrumapartkiralama.com" },
      areaServed: "Bodrum, Muğla, TR",
      url: `${SITE_URL}/vip-transfer`,
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
        badge="Bodrum 2026"
        image="https://images.unsplash.com/photo-1503424886307-b090341d25d1?auto=format&fit=crop&w=2000&q=80"
        crumbs={[{ href: "/", label: isTr ? "Ana Sayfa" : "Home" }, { label: t("h1") }]}
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
              service="transfer"
              subjectLine={t("h1")}
              fields={{ date: true, people: true, pickup: true, dropoff: true }}
              whatsappNumber={c("whatsappNumber")}
              whatsappTemplate={
                isTr
                  ? "Merhaba, Milas-Bodrum Havalimanı transferi için bilgi almak istiyorum."
                  : "Hello, I'd like info about Milas-Bodrum Airport transfer."
              }
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
          <h2>{isTr ? "Sıkça Sorulanlar" : "Frequently Asked Questions"}</h2>
          <div className="mt-6">
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>
    </>
  );
}
