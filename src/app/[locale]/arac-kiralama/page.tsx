import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check, Car, Gauge, ShieldCheck, Crown } from "lucide-react";
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

  const classes = [
    { title: t("carClass1Title"), desc: t("carClass1Desc"), price: t("carClass1Price"), icon: Car },
    { title: t("carClass2Title"), desc: t("carClass2Desc"), price: t("carClass2Price"), icon: Gauge },
    { title: t("carClass3Title"), desc: t("carClass3Desc"), price: t("carClass3Price"), icon: ShieldCheck },
    { title: t("carClass4Title"), desc: t("carClass4Desc"), price: t("carClass4Price"), icon: Crown },
  ];

  const included = [t("inc1"), t("inc2"), t("inc3"), t("inc4"), t("inc5"), t("inc6")];

  const faqItems = [
    {
      q: isTr ? "Aracı havalimanında nasıl teslim alırım?" : "How do I pick up at the airport?",
      a: isTr
        ? "Rezervasyon onayından sonra havalimanı buluşma noktası size mesajla bildirilir. Uçuş takibi yapılır, gecikmelerde ek ücret yoktur."
        : "After confirmation, the airport meeting point is sent to you. Flight tracking is in place, no extra fee for delays.",
    },
    {
      q: isTr ? "Hangi sigortalar dahil?" : "Which insurance is included?",
      a: isTr
        ? "Tam kasko + zorunlu trafik sigortası fiyata dahildir. Lastik, cam ve far gibi ek korumalar düşük ek ücretle eklenebilir."
        : "Full collision and traffic insurance are included. Additional coverage for tyres, glass and headlights is available at a small surcharge.",
    },
    {
      q: isTr ? "Minimum yaş ve ehliyet süresi nedir?" : "What is the minimum age and licence period?",
      a: isTr
        ? "Sürücü 21 yaşında ve en az 1 yıllık ehliyete sahip olmalıdır. Premium araçlar için 25 yaş + 3 yıl ehliyet gerekir."
        : "Drivers must be 21+ with at least 1 year of licence experience. Premium cars require 25+ with 3 years of licence.",
    },
    {
      q: isTr ? "Farklı şehirde iade mümkün mü?" : "Can I return in a different city?",
      a: isTr
        ? "Bodrum içinde farklı noktalarda iade ücretsizdir. Bodrum dışında (örn. Marmaris, İzmir) iade için ek ücret uygulanır."
        : "Returning at a different point within Bodrum is free. Returns outside Bodrum (e.g. Marmaris, Izmir) incur an extra fee.",
    },
    {
      q: isTr ? "Yakıt politikası nedir?" : "What is the fuel policy?",
      a: isTr
        ? "Dolu alıp dolu teslim politikası uygulanır. Eksik teslim durumunda piyasa fiyatı üzerinden yakıt farkı tahsil edilir."
        : "Full-to-full policy. If returned less than full, fuel is charged at market price.",
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
        badge="Bodrum 2026"
        image="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80"
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
              service="car"
              subjectLine={t("h1")}
              fields={{ date: true, pickup: true, dropoff: true }}
              whatsappNumber={c("whatsappNumber")}
              whatsappTemplate={isTr ? "Merhaba, Bodrum'da araç kiralamak istiyorum." : "Hello, I'd like to rent a car in Bodrum."}
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
          <h2>{isTr ? "Sıkça Sorulanlar" : "Frequently Asked Questions"}</h2>
          <div className="mt-6">
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>
    </>
  );
}
