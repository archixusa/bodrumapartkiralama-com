import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import {
  Shield,
  Clock,
  Headphones,
  RefreshCw,
  ArrowRight,
  MessageCircle,
  Calendar,
  KeyRound,
  Home as HomeIcon,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { DistrictCard } from "@/components/DistrictCard";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { Testimonials } from "@/components/Testimonials";
import { districts } from "@/data/districts";
import { services } from "@/data/services";
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

  const faqItems = [1, 2, 3, 4, 5, 6].map((i) => ({
    q: f(`q${i}`),
    a: f(`a${i}`),
  }));

  type L = "tr" | "en" | "de" | "ru";
  const pick = locale as L;

  const heroByLocale = {
    tr: {
      chip: "Bodrum 2026",
      h1: "Bodrum'un Premier Kiralama Platformu",
      sub: "Doğrudan mülk sahibiyle, aracısız apart kiralama.",
      lead:
        "Aile bütçesini düşünen, pratik bilgi arayan tatilciler için: Bodrum'un farklı bölgelerinde değerlendirilmiş mülklerle çalışıyoruz. Mülk kataloğumuz açıldıkça apartları buradan paylaşacağız. Şimdilik talebinizi alıp size uygun seçenekleri sunabiliriz.",
      ctaWhatsapp: "WhatsApp ile Yazın",
      ctaReserve: "Rezervasyon Talebi",
      ctaOwner: "Evinizi Kiraya Verin",
      waText: "Merhaba, Bodrum'da uygun apart arıyorum.",
    },
    en: {
      chip: "Bodrum 2026",
      h1: "Bodrum's Premier Rental Platform",
      sub: "Apartment rentals directly with the owner — no middlemen.",
      lead:
        "For travellers who care about value and want practical guidance: we work with properties across Bodrum's neighbourhoods. As our catalogue opens up, apartments will be listed here. For now, share your dates and we'll match you to suitable options.",
      ctaWhatsapp: "Message us on WhatsApp",
      ctaReserve: "Send a Reservation Request",
      ctaOwner: "List Your Property",
      waText: "Hello, I'm looking for a suitable apartment in Bodrum.",
    },
    de: {
      chip: "Bodrum 2026",
      h1: "Bodrums erste Adresse für Ferienwohnungen",
      sub: "Apartmentmiete direkt beim Eigentümer — ganz ohne Vermittler.",
      lead:
        "Für Reisende, die auf ihr Budget achten und praktische Tipps schätzen: Wir arbeiten mit ausgewählten Unterkünften in den schönsten Vierteln von Bodrum. Sobald unser Katalog wächst, finden Sie die Apartments hier. Teilen Sie uns vorerst einfach Ihre Reisedaten mit, und wir finden passende Optionen für Sie.",
      ctaWhatsapp: "Per WhatsApp schreiben",
      ctaReserve: "Reservierungsanfrage senden",
      ctaOwner: "Vermieten Sie Ihre Wohnung",
      waText: "Hallo, ich suche eine passende Ferienwohnung in Bodrum.",
    },
    ru: {
      chip: "Бодрум 2026",
      h1: "Ведущая платформа аренды в Бодруме",
      sub: "Аренда апартаментов напрямую у владельца — без посредников.",
      lead:
        "Для путешественников, которые ценят разумную стоимость и любят практичные советы: мы работаем с проверенными объектами в разных районах Бодрума. По мере пополнения нашего каталога апартаменты будут появляться здесь. А пока просто сообщите нам ваши даты, и мы подберём для вас подходящие варианты.",
      ctaWhatsapp: "Написать в WhatsApp",
      ctaReserve: "Отправить запрос на бронирование",
      ctaOwner: "Сдайте своё жильё",
      waText: "Здравствуйте, ищу подходящие апартаменты в Бодруме.",
    },
  } as const;
  const heroCopy = heroByLocale[pick] ?? heroByLocale.en;
  const heroWaHref = `https://wa.me/${c("whatsappNumber")}?text=${encodeURIComponent(
    heroCopy.waText
  )}`;

  const howByLocale = {
    tr: {
      title: "Nasıl Çalışıyoruz",
      sub: "Üç adımda, sade ve şeffaf.",
      steps: [
        {
          icon: MessageCircle,
          num: "01",
          title: "Talep",
          desc:
            "WhatsApp veya formdan tarih, kişi sayısı ve tercih ettiğiniz bölgeyi iletin.",
        },
        {
          icon: Calendar,
          num: "02",
          title: "Görüşme",
          desc:
            "Uygun mülkleri seçenek olarak paylaşırız; mülk sahibiyle iletişim kurmanıza aracılık ederiz.",
        },
        {
          icon: KeyRound,
          num: "03",
          title: "Konaklama",
          desc:
            "Anahtarınız hazır olur, karşılama yapılır. Konaklama boyunca size ulaşabileceğiniz bir kişi vardır.",
        },
      ],
    },
    en: {
      title: "How It Works",
      sub: "Three simple, transparent steps.",
      steps: [
        {
          icon: MessageCircle,
          num: "01",
          title: "Request",
          desc:
            "Share your dates, group size and preferred neighbourhood via WhatsApp or the form.",
        },
        {
          icon: Calendar,
          num: "02",
          title: "Match",
          desc:
            "We send you suitable options and bridge contact with the owner.",
        },
        {
          icon: KeyRound,
          num: "03",
          title: "Stay",
          desc:
            "Your keys are ready, a welcome is arranged, and someone is reachable throughout your stay.",
        },
      ],
    },
    de: {
      title: "So arbeiten wir",
      sub: "In drei einfachen, transparenten Schritten.",
      steps: [
        {
          icon: MessageCircle,
          num: "01",
          title: "Anfrage",
          desc:
            "Teilen Sie uns Ihre Reisedaten, die Personenzahl und Ihr Wunschviertel per WhatsApp oder Formular mit.",
        },
        {
          icon: Calendar,
          num: "02",
          title: "Auswahl",
          desc:
            "Wir senden Ihnen passende Optionen und stellen den direkten Kontakt zum Eigentümer her.",
        },
        {
          icon: KeyRound,
          num: "03",
          title: "Aufenthalt",
          desc:
            "Ihre Schlüssel liegen bereit, der Empfang ist organisiert, und während Ihres Aufenthalts ist immer jemand für Sie erreichbar.",
        },
      ],
    },
    ru: {
      title: "Как мы работаем",
      sub: "Три простых и прозрачных шага.",
      steps: [
        {
          icon: MessageCircle,
          num: "01",
          title: "Запрос",
          desc:
            "Сообщите нам ваши даты, количество гостей и желаемый район через WhatsApp или форму.",
        },
        {
          icon: Calendar,
          num: "02",
          title: "Подбор",
          desc:
            "Мы пришлём подходящие варианты и поможем связаться с владельцем напрямую.",
        },
        {
          icon: KeyRound,
          num: "03",
          title: "Проживание",
          desc:
            "Ключи будут готовы, вас встретят, а на протяжении всего отдыха с вами всегда будет кто-то на связи.",
        },
      ],
    },
  } as const;
  const howCopy = howByLocale[pick] ?? howByLocale.en;

  const ownerByLocale = {
    tr: {
      title: "Mülkünüzü kiraya mı vermek istiyorsunuz?",
      desc:
        "Mülkünüzü Bodrum'un farklı bölgelerinde değerlendiriyoruz. Komisyon yapımız net, mülk sahibiyle iletişim doğrudan. Mülkünüzün size kazandırabileceğini değerlendirelim.",
      cta: "Mülkünüzü Değerlendirelim",
    },
    en: {
      title: "Property Owner?",
      desc:
        "We work with owners across Bodrum's neighbourhoods. Our commission terms are clear and contact stays direct. Let's see how your property could perform.",
      cta: "Open the Application Form",
    },
    de: {
      title: "Möchten Sie Ihre Wohnung vermieten?",
      desc:
        "Wir vermarkten Ihre Wohnung in den verschiedenen Vierteln von Bodrum. Unsere Provisionsbedingungen sind klar und der Kontakt bleibt direkt. Lassen Sie uns gemeinsam herausfinden, was Ihre Immobilie einbringen kann.",
      cta: "Lassen Sie uns Ihre Wohnung bewerten",
    },
    ru: {
      title: "Хотите сдать своё жильё?",
      desc:
        "Мы продвигаем вашу недвижимость в разных районах Бодрума. Условия комиссии прозрачны, а связь с владельцем остаётся прямой. Давайте вместе оценим, что может приносить ваш объект.",
      cta: "Давайте оценим ваше жильё",
    },
  } as const;
  const ownerCopy = ownerByLocale[pick] ?? ownerByLocale.en;

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
          src="https://images.unsplash.com/photo-1583061386694?auto=format&fit=crop&w=2000&q=80"
          alt="Bodrum"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/55 to-navy-900/85" />
        <div className="container-page relative py-16 md:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="chip-accent">{heroCopy.chip}</span>
            <h1 className="mt-4 text-balance leading-tight text-white md:text-5xl lg:text-6xl">
              {heroCopy.h1}
            </h1>
            <p className="mt-3 text-lg font-semibold text-accent-400 md:text-xl">
              {heroCopy.sub}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 md:text-lg">
              {heroCopy.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={heroWaHref}
                target="_blank"
                rel="noopener noreferrer"
                data-lead="hero-whatsapp"
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4" />
                {heroCopy.ctaWhatsapp}
              </a>
              <Link
                href="/iletisim"
                className="btn-secondary !bg-white/10 !text-white !border-white/30 hover:!bg-white/15"
              >
                {heroCopy.ctaReserve}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <TrustStrip />

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance">{howCopy.title}</h2>
            <p className="mt-3 text-muted">{howCopy.sub}</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {howCopy.steps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.num} className="card flex flex-col gap-3 p-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-navy-50 text-navy-900">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-3xl font-bold text-accent-400">
                      {s.num}
                    </span>
                  </div>
                  <h3 className="text-lg">{s.title}</h3>
                  <p className="text-sm text-muted">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OWNER CTA */}
      <section className="section section-soft">
        <div className="container-page">
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-5 rounded-xl border border-[var(--color-border)] bg-white p-6 md:flex-row md:items-center md:gap-8 md:p-8">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-accent-400/15 text-accent-500">
              <HomeIcon className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <h2 className="text-2xl">{ownerCopy.title}</h2>
              <p className="mt-2 text-sm text-muted md:text-base">
                {ownerCopy.desc}
              </p>
            </div>
            <Link href="/evinizi-kiraya-verin" className="btn-primary shrink-0">
              {ownerCopy.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
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

      {/* DISTRICTS */}
      <section className="section section-blue">
        <div className="container-page">
          <SectionHeader title={t("districtsTitle")} desc={t("districtsDesc")} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {districts.slice(0, 6).map((d) => (
              <DistrictCard key={d.slug} district={d} />
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted">
            {locale === "tr"
              ? "Bodrum'un farklı bölgelerinde mülk sahipleriyle çalışıyoruz."
              : locale === "de"
                ? "Wir arbeiten mit Eigentümern in den verschiedenen Vierteln von Bodrum."
                : locale === "ru"
                  ? "Мы работаем с владельцами жилья в разных районах Бодрума."
                  : "We work across Bodrum's neighbourhoods."}
          </p>
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

      {/* BLOG */}
      <section className="section section-soft">
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

      {/* TESTIMONIALS */}
      <Testimonials max={3} />

      {/* FAQ */}
      <section className="section">
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
  const locale = useLocale();
  const isTr = locale === "tr";

  // Warm, family-friendly trust signals for Turkish audience.
  // Other locales fall back to the existing trust1-4 message keys.
  const warmItems = [
    { emoji: "🏠", title: "Yerel ekip", desc: "Bodrum'da yaşıyoruz" },
    {
      emoji: "💬",
      title: "Doğrudan iletişim",
      desc: "Mülk sahibiyle aracısız",
    },
    {
      emoji: "📝",
      title: "Şeffaf çalışma",
      desc: "Tüm koşullar önceden net",
    },
    {
      emoji: "⏰",
      title: "7/24 destek",
      desc: "Konaklama boyunca yanınızda",
    },
  ];

  return (
    <section className="border-b border-[var(--color-border)] bg-white">
      <div className="container-page grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {isTr
          ? warmItems.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-navy-50 text-xl"
                  aria-hidden
                >
                  {item.emoji}
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted">{item.desc}</p>
                </div>
              </div>
            ))
          : [
              { icon: Shield, title: t("trust1Title"), desc: t("trust1Desc") },
              { icon: Clock, title: t("trust2Title"), desc: t("trust2Desc") },
              {
                icon: Headphones,
                title: t("trust3Title"),
                desc: t("trust3Desc"),
              },
              {
                icon: RefreshCw,
                title: t("trust4Title"),
                desc: t("trust4Desc"),
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-navy-50 text-navy-900">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted">{item.desc}</p>
                  </div>
                </div>
              );
            })}
      </div>
    </section>
  );
}
