import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPin, Check, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { ApartCard } from "@/components/ApartCard";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { districts, getDistrict } from "@/data/districts";
import { getApartmentsByDistrict } from "@/data/apartments";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

export function generateStaticParams() {
  return districts.map((d) => ({ district: d.urlSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; district: string }>;
}): Promise<Metadata> {
  const { locale, district: districtParam } = await params;
  const d = getDistrict(districtParam);
  if (!d) return {};
  const t = await getTranslations({ locale, namespace: "district" });
  const dt = await getTranslations({ locale, namespace: "districts" });
  const districtName = dt(d.slug);
  const url =
    locale === "tr"
      ? `${SITE_URL}/bodrum/${d.urlSlug}`
      : `${SITE_URL}/${locale}/bodrum/${d.urlSlug}`;
  return {
    title: t("metaTitle", { district: districtName }),
    description: t("metaDesc", { district: districtName }),
    alternates: { canonical: url },
    openGraph: {
      title: t("metaTitle", { district: districtName }),
      description: t("metaDesc", { district: districtName }),
      url,
      type: "website",
      images: [{ url: d.heroImage, width: 1600, height: 900, alt: districtName }],
    },
  };
}

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ locale: string; district: string }>;
}) {
  const { locale, district: districtParam } = await params;
  setRequestLocale(locale);
  const d = getDistrict(districtParam);
  if (!d) notFound();

  const t = await getTranslations({ locale, namespace: "district" });
  const dt = await getTranslations({ locale, namespace: "districts" });
  const fl = await getTranslations({ locale, namespace: "apartList" });
  const isTr = locale === "tr";
  const districtName = dt(d.slug);
  const longDesc = isTr ? d.longDescTr : d.longDescEn;
  const highlights = isTr ? d.highlights.tr : d.highlights.en;
  const apts = getApartmentsByDistrict(d.slug);
  const nearby = d.nearby
    .map((slug) => districts.find((x) => x.slug === slug))
    .filter(Boolean);

  const districtFaq = [
    {
      q: isTr
        ? `${districtName} hangi tarz tatilci için uygundur?`
        : `Who is ${districtName} best suited for?`,
      a: isTr ? d.longDescTr.split(/(?<=\.)\s/)[0] : d.longDescEn.split(/(?<=\.)\s/)[0],
    },
    {
      q: isTr ? `${districtName}'a ulaşım nasıl?` : `How do I get to ${districtName}?`,
      a: isTr
        ? `Milas-Bodrum Havalimanı'ndan ${districtName}'a VIP transfer hizmetimiz vardır. Ortalama transfer süresi 30-50 dakikadır; rezervasyon sırasında talep edebilirsiniz.`
        : `We provide VIP transfer from Milas-Bodrum Airport to ${districtName}. Average transfer time is 30-50 minutes; request it during booking.`,
    },
    {
      q: isTr
        ? `${districtName}'da apart kiralama fiyatları ne kadar?`
        : `What are the apartment rental prices in ${districtName}?`,
      a: isTr
        ? `Yüksek sezonda (Haziran-Eylül) günlük fiyatlar 2.400 TL'den başlar, lüks segmente göre değişir. Düşük sezonda fiyatlar yaklaşık %50 düşer.`
        : `In high season (June-September), daily prices start from around 2,400 TL and rise with the luxury tier. Off-season prices are roughly 50% lower.`,
    },
    {
      q: isTr ? `${districtName}'da hangi plajlar var?` : `Which beaches are in ${districtName}?`,
      a: isTr ? `${districtName} bölgesinin öne çıkan plaj ve koyları için sayfadaki "${districtName} Hakkında" bölümüne göz atabilirsiniz.`
        : `For the highlighted beaches and coves of ${districtName}, see the "About ${districtName}" section above.`,
    },
    {
      q: isTr
        ? `${districtName}'da rezervasyon nasıl yapılır?`
        : `How do I book in ${districtName}?`,
      a: isTr
        ? `Beğendiğiniz apartı seçin ve rezervasyon formunu doldurun. Bir saat içinde WhatsApp veya telefondan dönüş yapıyoruz.`
        : `Pick an apartment you like and fill in the booking form. We respond within an hour via WhatsApp or phone.`,
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      name: `${districtName}, Bodrum`,
      description: longDesc,
      image: d.heroImage,
      url: `${SITE_URL}/bodrum/${d.urlSlug}`,
      geo: {
        "@type": "GeoCoordinates",
        latitude: d.lat,
        longitude: d.lng,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: isTr ? "Ana Sayfa" : "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: fl("title"), item: `${SITE_URL}/apartlar` },
        { "@type": "ListItem", position: 3, name: districtName, item: `${SITE_URL}/bodrum/${d.urlSlug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: districtFaq.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="relative overflow-hidden bg-navy-900 text-white">
        <Image
          src={d.heroImage}
          alt={districtName}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/55 to-navy-900/85" />
        <div className="container-page relative py-14 md:py-20">
          <nav aria-label="breadcrumb" className="mb-3 text-xs text-white/80">
            <Link href="/" className="hover:underline">{isTr ? "Ana Sayfa" : "Home"}</Link>
            <span className="px-2">/</span>
            <Link href="/apartlar" className="hover:underline">{fl("title")}</Link>
          </nav>
          <h1 className="text-white">{t("h1", { district: districtName })}</h1>
          <p className="mt-3 max-w-2xl text-base text-white/85 md:text-lg">
            {isTr ? d.shortDescTr : d.shortDescEn}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <h2>{t("aboutTitle", { district: districtName })}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/90">{longDesc}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 rounded-md border border-[var(--color-border)] bg-white p-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="overflow-hidden rounded-xl border border-[var(--color-border)]">
            <iframe
              title={`${districtName} map`}
              src={`https://www.google.com/maps?q=${d.lat},${d.lng}&z=13&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[380px] w-full"
            />
          </aside>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <h2>{t("apartsTitle", { district: districtName })}</h2>
            <Link href="/apartlar" className="text-sm font-semibold text-navy-600 hover:underline">
              {fl("title")} <ArrowRight className="ml-1 inline h-4 w-4" />
            </Link>
          </div>
          {apts.length === 0 ? (
            <p className="mt-6 rounded-xl border border-dashed border-[var(--color-border)] bg-white p-8 text-center text-muted">
              {t("noAparts")}
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {apts.map((apt) => (
                <ApartCard key={apt.id} apt={apt} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container-page max-w-4xl">
          <h2>{isTr ? `${districtName} Hakkında Sıkça Sorulanlar` : `${districtName} FAQ`}</h2>
          <div className="mt-6">
            <FAQ items={districtFaq} />
          </div>
        </div>
      </section>

      <section className="section section-blue">
        <div className="container-page">
          <h2>{t("nearbyTitle")}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {nearby.map((n) => (
              <Link
                key={n!.slug}
                href={`/bodrum/${n!.urlSlug}`}
                className="card flex items-center gap-3 p-4"
              >
                <MapPin className="h-5 w-5 text-navy-600" />
                <span className="font-semibold text-navy-900">{dt(n!.slug)}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-navy-600" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
