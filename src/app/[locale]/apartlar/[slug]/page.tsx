import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Users,
  BedDouble,
  Bath,
  Maximize2,
  MapPin,
  Star,
  Check,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Gallery } from "@/components/Gallery";
import { BookingForm } from "@/components/BookingForm";
import { ApartCard } from "@/components/ApartCard";
import { JsonLd } from "@/components/JsonLd";
import { FAQ } from "@/components/FAQ";
import {
  apartments,
  getApartment,
  featureLabel,
} from "@/data/apartments";
import { getDistrict } from "@/data/districts";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

export function generateStaticParams() {
  return apartments.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const apt = getApartment(slug);
  if (!apt) return {};
  const isTr = locale === "tr";
  const title = isTr ? apt.titleTr : apt.titleEn;
  const desc = (isTr ? apt.descriptionTr : apt.descriptionEn).slice(0, 158);
  const url =
    locale === "tr"
      ? `${SITE_URL}/apartlar/${apt.slug}`
      : `${SITE_URL}/${locale}/apartlar/${apt.slug}`;
  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: desc,
      url,
      type: "website",
      images: [{ url: apt.images[0], width: 1600, height: 1200, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [apt.images[0]],
    },
  };
}

export default async function ApartDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const apt = getApartment(slug);
  if (!apt) notFound();

  const t = await getTranslations({ locale, namespace: "apartDetail" });
  const c = await getTranslations({ locale, namespace: "common" });
  const dt = await getTranslations({ locale, namespace: "districts" });
  const fl = await getTranslations({ locale, namespace: "apartList" });

  const isTr = locale === "tr";
  const title = isTr ? apt.titleTr : apt.titleEn;
  const description = isTr ? apt.descriptionTr : apt.descriptionEn;
  const district = getDistrict(apt.district)!;
  const districtName = dt(apt.district);
  const districtUrl = `/bodrum/${district.urlSlug}`;

  const similar = apartments
    .filter((a) => a.id !== apt.id)
    .sort((a, b) => Number(a.district !== apt.district) - Number(b.district !== apt.district))
    .slice(0, 3);

  const detailFaq = [
    {
      q: isTr ? "Bu aparta ne zaman giriş yapabilirim?" : "When can I check in?",
      a: isTr
        ? "Standart giriş saati 14:00, çıkış 11:00'dir. Erken giriş veya geç çıkış için müsaitlik durumuna göre esnek olabiliriz; lütfen rezervasyon notuna yazın."
        : "Standard check-in is at 2 PM and check-out at 11 AM. Early check-in or late check-out may be possible based on availability — please note it in your booking.",
    },
    {
      q: isTr ? "Apart için depozito alınıyor mu?" : "Is a deposit required?",
      a: isTr
        ? "Yaz aylarında konaklama bedelinin %30'u depozito olarak alınır ve kalan tutar girişte tahsil edilir. Düşük sezonda depozito uygulamayabiliyoruz."
        : "In high season, 30% is collected as a deposit and the rest is paid on arrival. Off-season may not require a deposit.",
    },
    {
      q: isTr ? "Havalimanından nasıl ulaşabilirim?" : "How do I get from the airport?",
      a: isTr
        ? `Milas-Bodrum Havalimanı'ndan ${districtName}'a VIP transfer hizmetimiz var. Transfer ücreti kişi sayısı ve araç tipine göre değişir; talep ederseniz size özel teklif gönderiyoruz.`
        : `We provide VIP transfer from Milas-Bodrum Airport to ${districtName}. Pricing depends on group size and vehicle — request a custom quote any time.`,
    },
    {
      q: isTr ? "Apartın yakınında market var mı?" : "Is there a supermarket nearby?",
      a: isTr
        ? "Evet, yürüme mesafesinde birden fazla market, fırın ve eczane bulunmaktadır. Detayları girişte size ileteceğiz."
        : "Yes, there are supermarkets, bakeries and pharmacies within walking distance. We'll share details on check-in.",
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      name: title,
      description,
      url: `${SITE_URL}/apartlar/${apt.slug}`,
      image: apt.images,
      address: {
        "@type": "PostalAddress",
        addressLocality: districtName,
        addressRegion: "Muğla",
        addressCountry: "TR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: district.lat,
        longitude: district.lng,
      },
      priceRange: `₺${apt.lowSeasonPrice}-${apt.highSeasonPrice}`,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: apt.rating,
        reviewCount: apt.reviewCount,
      },
      amenityFeature: apt.features.map((f) => ({
        "@type": "LocationFeatureSpecification",
        name: featureLabel[f][isTr ? "tr" : "en"],
        value: true,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: isTr ? "Ana Sayfa" : "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: fl("title"), item: `${SITE_URL}/apartlar` },
        { "@type": "ListItem", position: 3, name: districtName, item: `${SITE_URL}/bodrum/${district.urlSlug}` },
        { "@type": "ListItem", position: 4, name: title, item: `${SITE_URL}/apartlar/${apt.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: detailFaq.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="border-b border-[var(--color-border)] bg-white">
        <div className="container-page py-6">
          <nav aria-label="breadcrumb" className="mb-4 text-xs text-muted">
            <Link href="/" className="hover:underline">{isTr ? "Ana Sayfa" : "Home"}</Link>
            <span className="px-2">/</span>
            <Link href="/apartlar" className="hover:underline">{fl("title")}</Link>
            <span className="px-2">/</span>
            <Link href={districtUrl} className="hover:underline">{districtName}</Link>
          </nav>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-balance">{title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted">
                <Link href={districtUrl} className="inline-flex items-center gap-1 text-navy-600 hover:underline">
                  <MapPin className="h-4 w-4" /> {districtName}
                </Link>
                <span className="inline-flex items-center gap-1 text-success">
                  <Star className="h-4 w-4 fill-current" /> {apt.rating.toFixed(1)} ({apt.reviewCount})
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {apt.tags?.map((tag) => (
                <span key={tag} className="chip-accent">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-6">
        <Gallery images={apt.images} alt={title} />
      </section>

      <section className="container-page pb-12 lg:pb-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0">
            <div className="grid grid-cols-2 gap-3 rounded-xl border border-[var(--color-border)] bg-white p-4 sm:grid-cols-4">
              <InfoCell icon={<Users className="h-5 w-5" />} label={t("guests", { count: apt.capacity })} />
              <InfoCell icon={<BedDouble className="h-5 w-5" />} label={t("bedrooms", { count: apt.bedrooms })} />
              <InfoCell icon={<Bath className="h-5 w-5" />} label={t("bathrooms", { count: apt.bathrooms })} />
              <InfoCell icon={<Maximize2 className="h-5 w-5" />} label={t("area", { m2: apt.area_m2 })} />
            </div>

            <h2 className="mt-10 text-2xl">{t("descriptionTitle")}</h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink/90">
              {description.split(/\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <h2 className="mt-10 text-2xl">{t("featuresTitle")}</h2>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {apt.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 shrink-0 text-success" />
                  <span>{featureLabel[f][isTr ? "tr" : "en"]}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-2xl">{t("locationTitle")}</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-[var(--color-border)]">
              <iframe
                title={`${districtName} map`}
                src={`https://www.google.com/maps?q=${district.lat},${district.lng}&z=13&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full"
              />
            </div>

            <h2 className="mt-10 text-2xl">{t("priceTitle")}</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <PriceRow label={t("highSeason")} value={apt.highSeasonPrice} />
              <PriceRow label={t("lowSeason")} value={apt.lowSeasonPrice} />
            </div>

            <h2 className="mt-10 text-2xl">{isTr ? "Sıkça Sorulanlar" : "FAQ"}</h2>
            <div className="mt-4">
              <FAQ items={detailFaq} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            <BookingForm
              apartmentSlug={apt.slug}
              apartmentTitle={title}
              capacity={apt.capacity}
              highSeasonPrice={apt.highSeasonPrice}
              lowSeasonPrice={apt.lowSeasonPrice}
              whatsappNumber={c("whatsappNumber")}
            />
          </aside>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container-page">
          <h2 className="text-center">{t("similarTitle")}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((a) => (
              <ApartCard key={a.id} apt={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCell({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-navy-600">{icon}</span>
      <span className="font-semibold text-navy-900">{label}</span>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: number }) {
  const v = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
  return (
    <div className="flex items-center justify-between rounded-md border border-[var(--color-border)] bg-white px-4 py-3 text-sm">
      <span className="text-muted">{label}</span>
      <span className="font-bold text-navy-900">{v} <span className="text-xs font-normal text-muted">/ gece</span></span>
    </div>
  );
}
