import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  MessageCircle,
  Calendar,
  KeyRound,
  ArrowRight,
  Home as HomeIcon,
  MapPin,
  Info,
  Sparkles,
  HeartHandshake,
  BadgeCheck,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { Testimonials } from "@/components/Testimonials";
import { HeroSearch } from "@/components/HeroSearch";
import { SamplePropertyGrid } from "@/components/SamplePropertyGrid";
import { districts } from "@/data/districts";
import { services } from "@/data/services";
import { posts } from "@/data/posts";
import { loc } from "@/lib/i18n-data";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

const HOMEPAGE_REGION_SLUGS = [
  "gumbet",
  "turgutreis",
  "yalikavak",
  "bitez",
  "ortakent",
  "gundogan",
] as const;

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

  // ── HERO ──────────────────────────────────────────────────────────────────
  const heroByLocale = {
    tr: {
      h1: "Bodrum'da apart kiralayın",
      sub: "Tarihlerinizi söyleyin, size uygun seçenekleri biz bulalım.",
      trust: ["Doğrudan mülk sahibiyle", "Aracısız & şeffaf", "7/24 yerel destek"],
      activity: "Bu sezon yoğun ilgi var",
    },
    en: {
      h1: "Rent an apartment in Bodrum",
      sub: "Tell us your dates and we'll find options that suit you.",
      trust: ["Directly with the owner", "No middlemen, transparent", "24/7 local support"],
      activity: "High interest this season",
    },
    de: {
      h1: "Mieten Sie ein Apartment in Bodrum",
      sub: "Nennen Sie uns Ihre Reisedaten — wir finden die passenden Optionen.",
      trust: ["Direkt beim Eigentümer", "Ohne Vermittler, transparent", "Lokaler Support rund um die Uhr"],
      activity: "Diese Saison ist die Nachfrage hoch",
    },
    ru: {
      h1: "Снимите апартаменты в Бодруме",
      sub: "Назовите ваши даты — мы подберём подходящие варианты.",
      trust: ["Напрямую у владельца", "Без посредников, прозрачно", "Местная поддержка 24/7"],
      activity: "В этом сезоне высокий интерес",
    },
  } as const;
  const heroCopy = heroByLocale[pick] ?? heroByLocale.en;

  // ── HERO SEARCH LABELS ──────────────────────────────────────────────────────
  const searchLabelsByLocale = {
    tr: {
      region: "Bölge",
      regionAny: "Tüm bölgeler",
      checkIn: "Giriş",
      checkOut: "Çıkış",
      guests: "Kişi",
      guestsAny: "Farketmez",
      submit: "Müsaitlik Sorgula",
    },
    en: {
      region: "Region",
      regionAny: "All regions",
      checkIn: "Check-in",
      checkOut: "Check-out",
      guests: "Guests",
      guestsAny: "Any",
      submit: "Check Availability",
    },
    de: {
      region: "Region",
      regionAny: "Alle Regionen",
      checkIn: "Anreise",
      checkOut: "Abreise",
      guests: "Personen",
      guestsAny: "Egal",
      submit: "Verfügbarkeit prüfen",
    },
    ru: {
      region: "Район",
      regionAny: "Все районы",
      checkIn: "Заезд",
      checkOut: "Выезд",
      guests: "Гостей",
      guestsAny: "Не важно",
      submit: "Проверить наличие",
    },
  } as const;
  const searchLabels = searchLabelsByLocale[pick] ?? searchLabelsByLocale.en;

  const regionOptions = HOMEPAGE_REGION_SLUGS.map((slug) => {
    const d = districts.find((x) => x.slug === slug)!;
    return { value: d.slug, label: d.name };
  });

  // ── SAMPLE COLLECTION ───────────────────────────────────────────────────────
  const samplesByLocale = {
    tr: {
      title: "Koleksiyonumuzdan örnekler",
      sub: "Bodrum'un farklı bölgelerinde değerlendirdiğimiz apart tipleri.",
      notice:
        "Bu kartlar temsili örneklerdir; gerçek, anlık rezervasyona açık ilanlar değildir. Talebinize göre size uygun, güncel seçenekleri ileteceğiz.",
      sampleBadge: "Örnek",
      cta: "Bu tip için teklif al",
      guestsWord: "kişi",
      bedroomsWord: "oda",
      waLine: "Aklınızdaki bölge belli mi? WhatsApp'tan hemen yazın.",
      waCta: "WhatsApp ile Yazın",
      waText: "Merhaba, Bodrum'da uygun apart arıyorum.",
    },
    en: {
      title: "Examples from our collection",
      sub: "Apartment types we work with across Bodrum's neighbourhoods.",
      notice:
        "These cards are representative samples, not live, instantly bookable listings. Based on your request, we'll send you suitable, up-to-date options.",
      sampleBadge: "Sample",
      cta: "Get a quote for this type",
      guestsWord: "guests",
      bedroomsWord: "bed",
      waLine: "Already have a neighbourhood in mind? Message us on WhatsApp.",
      waCta: "Message us on WhatsApp",
      waText: "Hello, I'm looking for a suitable apartment in Bodrum.",
    },
    de: {
      title: "Beispiele aus unserer Auswahl",
      sub: "Apartmenttypen, mit denen wir in den Vierteln von Bodrum arbeiten.",
      notice:
        "Diese Karten sind repräsentative Beispiele, keine live buchbaren Inserate. Anhand Ihrer Anfrage senden wir Ihnen passende, aktuelle Optionen.",
      sampleBadge: "Beispiel",
      cta: "Angebot für diesen Typ",
      guestsWord: "Pers.",
      bedroomsWord: "Zi.",
      waLine: "Schon ein Viertel im Sinn? Schreiben Sie uns per WhatsApp.",
      waCta: "Per WhatsApp schreiben",
      waText: "Hallo, ich suche eine passende Ferienwohnung in Bodrum.",
    },
    ru: {
      title: "Примеры из нашей коллекции",
      sub: "Типы апартаментов, с которыми мы работаем в районах Бодрума.",
      notice:
        "Эти карточки — представительные примеры, а не объявления с мгновенным бронированием. По вашему запросу мы пришлём подходящие актуальные варианты.",
      sampleBadge: "Пример",
      cta: "Запросить предложение",
      guestsWord: "гост.",
      bedroomsWord: "спал.",
      waLine: "Уже определились с районом? Напишите нам в WhatsApp.",
      waCta: "Написать в WhatsApp",
      waText: "Здравствуйте, ищу подходящие апартаменты в Бодруме.",
    },
  } as const;
  const samplesCopy = samplesByLocale[pick] ?? samplesByLocale.en;
  const samplesWaHref = `https://wa.me/${c("whatsappNumber")}?text=${encodeURIComponent(
    samplesCopy.waText
  )}`;

  // ── REGIONS ──────────────────────────────────────────────────────────────────
  const regionsByLocale = {
    tr: { title: "Bodrum'un Bölgeleri", sub: "Size en uygun koyu seçin." },
    en: { title: "Bodrum's Neighbourhoods", sub: "Pick the bay that suits you best." },
    de: { title: "Die Viertel von Bodrum", sub: "Wählen Sie die Bucht, die am besten zu Ihnen passt." },
    ru: { title: "Районы Бодрума", sub: "Выберите бухту, которая подходит именно вам." },
  } as const;
  const regionsCopy = regionsByLocale[pick] ?? regionsByLocale.en;
  const regionCards = HOMEPAGE_REGION_SLUGS.map((slug) =>
    districts.find((d) => d.slug === slug)!
  );

  // ── HOW IT WORKS (simplified, one sentence each) ──────────────────────────────
  const howByLocale = {
    tr: {
      title: "Nasıl Çalışıyoruz",
      steps: [
        { icon: MessageCircle, title: "Talep", desc: "Tarih, kişi sayısı ve bölge tercihinizi iletin." },
        { icon: Calendar, title: "Seçenekler", desc: "Size uygun mülkleri seçenek olarak paylaşalım." },
        { icon: KeyRound, title: "Konaklama", desc: "Anahtar hazır, karşılama yapılır, destek yanınızda." },
      ],
    },
    en: {
      title: "How It Works",
      steps: [
        { icon: MessageCircle, title: "Request", desc: "Share your dates, group size and preferred area." },
        { icon: Calendar, title: "Options", desc: "We send you the properties that fit your request." },
        { icon: KeyRound, title: "Stay", desc: "Keys ready, a welcome arranged, support throughout." },
      ],
    },
    de: {
      title: "So arbeiten wir",
      steps: [
        { icon: MessageCircle, title: "Anfrage", desc: "Teilen Sie uns Reisedaten, Personenzahl und Wunschgebiet mit." },
        { icon: Calendar, title: "Optionen", desc: "Wir senden Ihnen die passenden Unterkünfte zu Ihrer Anfrage." },
        { icon: KeyRound, title: "Aufenthalt", desc: "Schlüssel bereit, Empfang organisiert, Support inklusive." },
      ],
    },
    ru: {
      title: "Как мы работаем",
      steps: [
        { icon: MessageCircle, title: "Запрос", desc: "Сообщите даты, число гостей и желаемый район." },
        { icon: Calendar, title: "Варианты", desc: "Пришлём объекты, подходящие под ваш запрос." },
        { icon: KeyRound, title: "Проживание", desc: "Ключи готовы, встреча организована, поддержка рядом." },
      ],
    },
  } as const;
  const howCopy = howByLocale[pick] ?? howByLocale.en;

  // ── LIFESTYLE GALLERY ─────────────────────────────────────────────────────────
  const lifestyleByLocale = {
    tr: {
      title: "Bodrum yaşam tarzı",
      sub: "Turkuaz koylar, gün batımları ve Ege'nin tadı.",
      alts: {
        beach: "Bodrum'da turkuaz deniz",
        sunset: "Bodrum'da gün batımı",
        marina: "Bodrum marina ve yatlar",
        dinner: "Deniz kenarında akşam yemeği",
        boat: "Bodrum gulet tekne turu",
        pool: "Akdeniz havuz keyfi",
      },
    },
    en: {
      title: "The Bodrum lifestyle",
      sub: "Turquoise bays, sunsets and a taste of the Aegean.",
      alts: {
        beach: "Turquoise sea in Bodrum",
        sunset: "Sunset in Bodrum",
        marina: "Bodrum marina and yachts",
        dinner: "Seaside dinner",
        boat: "Bodrum gulet boat tour",
        pool: "Mediterranean poolside",
      },
    },
    de: {
      title: "Das Bodrum-Lebensgefühl",
      sub: "Türkisfarbene Buchten, Sonnenuntergänge und ein Hauch Ägäis.",
      alts: {
        beach: "Türkisfarbenes Meer in Bodrum",
        sunset: "Sonnenuntergang in Bodrum",
        marina: "Yachthafen von Bodrum",
        dinner: "Abendessen am Meer",
        boat: "Bodrum Gulet-Bootstour",
        pool: "Pool am Mittelmeer",
      },
    },
    ru: {
      title: "Образ жизни Бодрума",
      sub: "Бирюзовые бухты, закаты и вкус Эгейского моря.",
      alts: {
        beach: "Бирюзовое море в Бодруме",
        sunset: "Закат в Бодруме",
        marina: "Марина и яхты Бодрума",
        dinner: "Ужин у моря",
        boat: "Прогулка на гулете в Бодруме",
        pool: "Бассейн на Средиземноморье",
      },
    },
  } as const;
  const lifestyleCopy = lifestyleByLocale[pick] ?? lifestyleByLocale.en;

  // ── WHY US ──────────────────────────────────────────────────────────────────
  const whyByLocale = {
    tr: {
      title: "Neden Biz?",
      items: [
        { icon: HomeIcon, title: "Yerel ekip", desc: "Bodrum'da yaşıyor, bölgeyi birinci elden biliyoruz." },
        { icon: BadgeCheck, title: "Gerçek bilgi", desc: "Abartısız, dürüst ve güncel bilgi paylaşırız." },
        { icon: Sparkles, title: "Esnek iptal", desc: "Net koşullar; planınız değişirse esnek davranırız." },
        { icon: HeartHandshake, title: "Şeffaf iletişim", desc: "Tüm süreç boyunca doğrudan ve açık iletişim." },
      ],
    },
    en: {
      title: "Why Us?",
      items: [
        { icon: HomeIcon, title: "Local team", desc: "We live in Bodrum and know the area first-hand." },
        { icon: BadgeCheck, title: "Honest info", desc: "Straight, accurate and up-to-date — no hype." },
        { icon: Sparkles, title: "Flexible cancellation", desc: "Clear terms; if plans change, we stay flexible." },
        { icon: HeartHandshake, title: "Transparent contact", desc: "Direct, open communication throughout." },
      ],
    },
    de: {
      title: "Warum wir?",
      items: [
        { icon: HomeIcon, title: "Lokales Team", desc: "Wir leben in Bodrum und kennen die Region aus erster Hand." },
        { icon: BadgeCheck, title: "Ehrliche Infos", desc: "Geradlinig, korrekt und aktuell — ohne Übertreibung." },
        { icon: Sparkles, title: "Flexible Stornierung", desc: "Klare Bedingungen; bei Planänderungen bleiben wir flexibel." },
        { icon: HeartHandshake, title: "Transparenter Kontakt", desc: "Durchgehend direkte, offene Kommunikation." },
      ],
    },
    ru: {
      title: "Почему мы?",
      items: [
        { icon: HomeIcon, title: "Местная команда", desc: "Мы живём в Бодруме и знаем район из первых рук." },
        { icon: BadgeCheck, title: "Честная информация", desc: "Прямо, точно и актуально — без прикрас." },
        { icon: Sparkles, title: "Гибкая отмена", desc: "Чёткие условия; если планы меняются — мы гибки." },
        { icon: HeartHandshake, title: "Прозрачное общение", desc: "Прямая и открытая связь на всех этапах." },
      ],
    },
  } as const;
  const whyCopy = whyByLocale[pick] ?? whyByLocale.en;

  // ── OWNER CTA ─────────────────────────────────────────────────────────────────
  const ownerByLocale = {
    tr: {
      title: "Mülkünüzü kiraya mı vermek istiyorsunuz?",
      desc: "Komisyon yapımız net, mülk sahibiyle iletişim doğrudan. Mülkünüzün kazandırabileceğini birlikte değerlendirelim.",
      cta: "Mülkünüzü Değerlendirelim",
    },
    en: {
      title: "Property Owner?",
      desc: "Our commission terms are clear and contact stays direct. Let's see how your property could perform.",
      cta: "Open the Application Form",
    },
    de: {
      title: "Möchten Sie Ihre Wohnung vermieten?",
      desc: "Unsere Provisionsbedingungen sind klar und der Kontakt bleibt direkt. Lassen Sie uns gemeinsam herausfinden, was Ihre Immobilie einbringen kann.",
      cta: "Lassen Sie uns Ihre Wohnung bewerten",
    },
    ru: {
      title: "Хотите сдать своё жильё?",
      desc: "Условия комиссии прозрачны, а связь с владельцем остаётся прямой. Давайте вместе оценим, что может приносить ваш объект.",
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
      geo: { "@type": "GeoCoordinates", latitude: 37.0344, longitude: 27.4305 },
      areaServed: ["Bodrum", ...districts.map((d) => d.name)],
      telephone: "+90 538 512 40 88",
      email: "info@bodrumapartkiralama.com",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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

      {/* 1 — HERO + SEARCH */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <Image
          src="/images/hero/bodrum-hero.webp"
          alt="Bodrum"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/55 to-navy-900/90" />
        <div className="container-page relative py-16 md:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance leading-tight text-white md:text-5xl lg:text-6xl">
              {heroCopy.h1}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 md:text-lg">
              {heroCopy.sub}
            </p>

            <HeroSearch
              locale={locale}
              labels={searchLabels}
              regions={regionOptions}
            />

            {/* Trust micro-signals */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/85">
              {heroCopy.trust.map((tr) => (
                <span key={tr} className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-accent-400" />
                  {tr}
                </span>
              ))}
            </div>

            {/* Activity signal (generic, honest — no fake numbers) */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              {heroCopy.activity}
            </div>
          </div>
        </div>
      </section>

      {/* 2 — SAMPLE COLLECTION */}
      <section className="section">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance">{samplesCopy.title}</h2>
            <p className="mt-3 text-muted">{samplesCopy.sub}</p>
          </div>

          {/* Honesty notice */}
          <div className="mx-auto mt-6 flex max-w-2xl items-start gap-2 rounded-md border border-[var(--color-border)] bg-navy-50 p-3 text-sm text-navy-900">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-navy-600" />
            <span>{samplesCopy.notice}</span>
          </div>

          <SamplePropertyGrid
            locale={locale}
            labels={{
              sampleBadge: samplesCopy.sampleBadge,
              cta: samplesCopy.cta,
              guestsWord: samplesCopy.guestsWord,
              bedroomsWord: samplesCopy.bedroomsWord,
            }}
          />

          {/* WhatsApp quick-request CTA */}
          <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
            <p className="text-sm text-muted">{samplesCopy.waLine}</p>
            <a
              href={samplesWaHref}
              target="_blank"
              rel="noopener noreferrer"
              data-lead="samples-whatsapp"
              className="btn-secondary"
            >
              <MessageCircle className="h-4 w-4" />
              {samplesCopy.waCta}
            </a>
          </div>
        </div>
      </section>

      {/* 3 — REGIONS (visual grid) */}
      <section className="section section-blue">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance">{regionsCopy.title}</h2>
            <p className="mt-3 text-muted">{regionsCopy.sub}</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {regionCards.map((d) => (
              <Link
                key={d.slug}
                href={`/bodrum/${d.urlSlug}`}
                className="group relative block aspect-[3/2] overflow-hidden rounded-xl shadow-card"
              >
                <Image
                  src={`/images/regions/${d.slug}.webp`}
                  alt={d.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="flex items-center gap-1.5 text-xl font-bold text-white drop-shadow">
                    <MapPin className="h-4 w-4 text-accent-400" />
                    {d.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/85">
                    {loc(locale, {
                      tr: d.shortDescTr,
                      en: d.shortDescEn,
                      de: d.shortDescDe,
                      ru: d.shortDescRu,
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — HOW IT WORKS */}
      <section className="section">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance">{howCopy.title}</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {howCopy.steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="card flex flex-col gap-3 p-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-navy-50 text-navy-900">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-3xl font-bold text-accent-400">
                      0{i + 1}
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

      {/* 5 — LIFESTYLE GALLERY */}
      <section className="section section-soft">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance">{lifestyleCopy.title}</h2>
            <p className="mt-3 text-muted">{lifestyleCopy.sub}</p>
          </div>
          <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[200px] lg:grid-cols-4">
            <LifestyleTile src="/images/lifestyle/beach.webp" alt={lifestyleCopy.alts.beach} className="lg:col-span-2" />
            <LifestyleTile src="/images/lifestyle/sunset.webp" alt={lifestyleCopy.alts.sunset} className="row-span-2" />
            <LifestyleTile src="/images/lifestyle/marina.webp" alt={lifestyleCopy.alts.marina} />
            <LifestyleTile src="/images/lifestyle/dinner.webp" alt={lifestyleCopy.alts.dinner} />
            <LifestyleTile src="/images/lifestyle/boat.webp" alt={lifestyleCopy.alts.boat} />
            <LifestyleTile src="/images/lifestyle/pool.webp" alt={lifestyleCopy.alts.pool} className="lg:col-span-2" />
          </div>
        </div>
      </section>

      {/* 6 — WHY US */}
      <section className="section">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance">{whyCopy.title}</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyCopy.items.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card flex flex-col gap-3 p-6">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-accent-400/15 text-accent-500">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg">{item.title}</h3>
                  <p className="text-sm text-muted">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7 — OWNER CTA */}
      <section className="section section-soft">
        <div className="container-page">
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-5 rounded-xl border border-[var(--color-border)] bg-white p-6 md:flex-row md:items-center md:gap-8 md:p-8">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-accent-400/15 text-accent-500">
              <HomeIcon className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <h2 className="text-2xl">{ownerCopy.title}</h2>
              <p className="mt-2 text-sm text-muted md:text-base">{ownerCopy.desc}</p>
            </div>
            <Link href="/evinizi-kiraya-verin" className="btn-primary shrink-0">
              {ownerCopy.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8 — SERVICES */}
      <section className="section">
        <div className="container-page">
          <SectionHeader title={t("servicesTitle")} />
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
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-navy-600">
                    {c("details")} <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9 — TESTIMONIALS */}
      <Testimonials max={3} />

      {/* 10 — BLOG */}
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

      {/* 11 — FAQ */}
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

function LifestyleTile({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`group relative overflow-hidden rounded-xl shadow-card ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
  );
}

function ServiceTitle({ k }: { k: string }) {
  const [ns, key] = k.split(".") as [string, string];
  const tr = useTranslations(ns);
  return <>{tr(key)}</>;
}

function SectionHeader({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-balance">{title}</h2>
      {desc && <p className="mt-3 text-muted">{desc}</p>}
    </div>
  );
}
