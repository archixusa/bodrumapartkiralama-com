import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import {
  Shield,
  Clock,
  Headphones,
  RefreshCw,
  ArrowRight,
  Star,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { SearchBar } from "@/components/SearchBar";
import { ApartCard } from "@/components/ApartCard";
import { DistrictCard } from "@/components/DistrictCard";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import {
  apartments,
  getFeaturedApartments,
} from "@/data/apartments";
import { districts } from "@/data/districts";
import { services } from "@/data/services";
import { reviews } from "@/data/reviews";
import { posts } from "@/data/posts";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const url = locale === "tr" ? SITE_URL : `${SITE_URL}/${locale}`;
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: {
      canonical: url,
      languages: {
        tr: SITE_URL,
        en: `${SITE_URL}/en`,
        de: `${SITE_URL}/de`,
        ru: `${SITE_URL}/ru`,
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDesc"),
      url,
      type: "website",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const c = await getTranslations({ locale, namespace: "common" });
  const f = await getTranslations({ locale, namespace: "faq" });
  const isTr = locale === "tr";

  const featured = getFeaturedApartments(6);

  const faqItems = [1, 2, 3, 4, 5, 6].map((i) => ({
    q: f(`q${i}`),
    a: f(`a${i}`),
  }));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "LodgingBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: "Bodrumapartkiralama.com",
      url: SITE_URL,
      logo: `${SITE_URL}/logo_kare.svg`,
      image: `${SITE_URL}/og-default.svg`,
      description: t("metaDesc"),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bodrum",
        addressRegion: "Muğla",
        addressCountry: "TR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 37.0344,
        longitude: 27.4305,
      },
      areaServed: ["Bodrum", ...districts.map((d) => d.name)],
      telephone: "+90 538 512 40 88",
      email: "info@bodrumapartkiralama.com",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "09:00",
          closes: "19:00",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: SITE_URL,
      name: "Bodrumapartkiralama.com",
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/apartlar?district={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <Image
          src="https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=2000&q=80"
          alt="Bodrum"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/55 to-navy-900/85" />
        <div className="container-page relative py-16 md:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="chip-accent">Bodrum 2026</span>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl text-white">
              {t("h1")}
            </h1>
            <p className="mt-3 text-lg font-semibold text-accent-400 md:text-xl">
              {t("heroUpper")}
            </p>
            <p className="mt-3 text-base text-white/85 md:text-lg">
              {t("heroLower")}
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-5xl">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <TrustStrip />

      {/* SEARCH TITLE + INTRO */}
      <section className="section">
        <div className="container-page">
          <h2 className="text-center text-balance">{t("searchTitle")}</h2>
          <div className="mx-auto mt-8 grid max-w-4xl gap-5 text-[15px] leading-relaxed text-ink/90">
            <p>{t("intro1")}</p>
            <p>{t("intro2")}</p>
            <p>{t("intro3")}</p>
            <p>{t("intro4")}</p>
            <p>{t("intro5")}</p>
            <p className="text-center text-lg font-semibold text-navy-900">
              {t("intro6")}
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section-soft">
        <div className="container-page">
          <SectionHeader title={t("servicesTitle")} desc={t("servicesDesc")} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={s.href}
                  className="card flex flex-col items-start gap-3 p-5"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-navy-50 text-navy-900">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg">
                    <ServiceTitle k={s.titleKey} />
                  </h3>
                  <p className="text-sm text-muted">
                    <ServiceDesc k={s.descKey} />
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-navy-600">
                    {c("details")} <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED APARTS */}
      <section className="section">
        <div className="container-page">
          <SectionHeader title={t("featuredTitle")} desc={t("featuredDesc")} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((apt) => (
              <ApartCard key={apt.id} apt={apt} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/apartlar" className="btn-secondary">
              {c("viewAll")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* DISTRICTS */}
      <section className="section section-blue">
        <div className="container-page">
          <SectionHeader title={t("districtsTitle")} desc={t("districtsDesc")} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {districts.slice(0, 6).map((d) => (
              <DistrictCard key={d.slug} district={d} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section">
        <div className="container-page">
          <SectionHeader title={t("whyTitle")} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <WhyCard num="01" title={t("why1Title")} desc={t("why1Desc")} />
            <WhyCard num="02" title={t("why2Title")} desc={t("why2Desc")} />
            <WhyCard num="03" title={t("why3Title")} desc={t("why3Desc")} />
            <WhyCard num="04" title={t("why4Title")} desc={t("why4Desc")} />
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section section-soft">
        <div className="container-page">
          <SectionHeader title={t("reviewsTitle")} desc={t("reviewsDesc")} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <article key={r.id} className="card flex flex-col gap-3 p-5">
                <div className="flex items-center gap-1 text-accent-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < r.rating ? "fill-current" : "opacity-30"}`}
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-ink/90">
                  &ldquo;{isTr ? r.textTr : r.textEn}&rdquo;
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-xs text-muted">
                  <span>
                    <span className="font-semibold text-navy-900">{r.author}</span> · {r.city}
                  </span>
                  <span className="chip">{r.source}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="section">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <div>
              <h2>{t("blogTitle")}</h2>
              <p className="mt-2 text-muted">{t("blogDesc")}</p>
            </div>
            <Link href="/blog" className="hidden text-sm font-semibold text-navy-600 hover:underline md:inline">
              {c("viewAll")} <ArrowRight className="ml-1 inline h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="card group flex flex-col overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.hero}
                    alt={isTr ? p.titleTr : p.titleEn}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 chip-accent">
                    {isTr ? p.category.tr : p.category.en}
                  </span>
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <h3 className="text-base leading-snug">{isTr ? p.titleTr : p.titleEn}</h3>
                  <p className="line-clamp-2 text-sm text-muted">{isTr ? p.excerptTr : p.excerptEn}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-soft">
        <div className="container-page max-w-4xl">
          <SectionHeader title={t("faqTitle")} />
          <div className="mt-8">
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceTitle({ k }: { k: string }) {
  const [ns, key] = k.split(".") as [string, string];
  const t = useTranslations(ns);
  return <>{t(key)}</>;
}
function ServiceDesc({ k }: { k: string }) {
  const [ns, key] = k.split(".") as [string, string];
  const t = useTranslations(ns);
  return <>{t(key)}</>;
}

function SectionHeader({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-balance">{title}</h2>
      {desc && <p className="mt-3 text-muted">{desc}</p>}
    </div>
  );
}

function WhyCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="card flex flex-col gap-3 p-6">
      <span className="text-3xl font-bold text-accent-400">{num}</span>
      <h3 className="text-lg">{title}</h3>
      <p className="text-sm text-muted">{desc}</p>
    </div>
  );
}

function TrustStrip() {
  const t = useTranslations("home");
  const items = [
    { icon: Shield, title: t("trust1Title"), desc: t("trust1Desc") },
    { icon: Clock, title: t("trust2Title"), desc: t("trust2Desc") },
    { icon: Headphones, title: t("trust3Title"), desc: t("trust3Desc") },
    { icon: RefreshCw, title: t("trust4Title"), desc: t("trust4Desc") },
  ];
  return (
    <section className="border-b border-[var(--color-border)] bg-white">
      <div className="container-page grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-navy-50 text-navy-900">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy-900">{item.title}</p>
                <p className="text-xs text-muted">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
