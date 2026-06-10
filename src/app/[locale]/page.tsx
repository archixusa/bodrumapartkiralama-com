import type { Metadata } from "next";
import Image from "next/image";
import { draftMode } from "next/headers";
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
  Sparkles,
  HeartHandshake,
  BadgeCheck,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { GuestReviews } from "@/components/GuestReviews";
import { HeroSearch } from "@/components/HeroSearch";
import { OfferCtaButton } from "@/components/OfferCtaButton";
import { districts } from "@/data/districts";
import { services } from "@/data/services";
import { posts } from "@/data/posts";
import { loc } from "@/lib/i18n-data";
import { getSiteContent } from "@/lib/content";
import { buildAlternates, defaultOgImages } from "@/lib/seo";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.bodrumapartkiralama.com";

// ── DB-backed content: section keys + shapes ─────────────────────────────────
// section_key "home.hero":        Record<locale, { h1, sub, trust: string[], activity }>
// section_key "home.offer":       Record<locale, { title, desc, offerCta, waCta, waText }>
// section_key "home.regions":     Record<locale, { title, sub }>
// section_key "home.howitworks":  Record<locale, { title, steps: { title, desc }[] }>
// section_key "home.whyus":       Record<locale, { title, items: { title, desc }[] }>
// section_key "home.owner":       Record<locale, { title, desc, cta }>
// All fall back to the in-code defaults below when the DB has no published row,
// so rendering is byte-identical for normal visitors when the table is empty.
// NOTE: howitworks/whyus icons stay in code (not serialisable) and are zipped in
// by index; the DB only carries the editable text in the same fixed order.

type HeroLocaleCopy = {
  h1: string;
  sub: string;
  trust: string[];
  activity: string;
};
type OfferLocaleCopy = {
  title: string;
  desc: string;
  offerCta: string;
  waCta: string;
  waText: string;
};
type RegionsLocaleCopy = {
  title: string;
  sub: string;
};
type HowItWorksLocaleCopy = {
  title: string;
  steps: { title: string; desc: string }[];
};
type WhyUsLocaleCopy = {
  title: string;
  items: { title: string; desc: string }[];
};
type OwnerLocaleCopy = {
  title: string;
  desc: string;
  cta: string;
};
type ByLocale<T> = Record<"tr" | "en" | "de" | "ru", T>;

const HOME_HERO_DEFAULT: ByLocale<HeroLocaleCopy> = {
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
};

const HOME_OFFER_DEFAULT: ByLocale<OfferLocaleCopy> = {
  tr: {
    title: "Size özel apart seçenekleri sunuyoruz",
    desc: "Sabit katalog yerine tarihinize göre uygun apartları sizin için seçiyoruz. Tarihinizi ve kişi sayınızı paylaşın; doğrudan mülk sahipleriyle çalıştığımız apartlar arasından size en uygun seçenekleri kısa sürede iletelim.",
    offerCta: "Hemen Teklif Alın",
    waCta: "WhatsApp ile Yazın",
    waText: "Merhaba, Bodrum'da uygun apart arıyorum.",
  },
  en: {
    title: "We hand-pick apartments for you",
    desc: "Instead of a fixed catalogue, we select the apartments that fit your dates. Share your dates and group size and we'll quickly send you the best options from the apartments we work with — directly with the owners.",
    offerCta: "Get an Offer Now",
    waCta: "Message us on WhatsApp",
    waText: "Hello, I'm looking for a suitable apartment in Bodrum.",
  },
  de: {
    title: "Wir wählen Apartments für Sie aus",
    desc: "Statt eines festen Katalogs suchen wir die Apartments aus, die zu Ihren Reisedaten passen. Teilen Sie uns Ihre Reisedaten und Personenzahl mit — wir senden Ihnen rasch die passendsten Optionen aus den Apartments, mit denen wir direkt bei den Eigentümern arbeiten.",
    offerCta: "Jetzt Angebot erhalten",
    waCta: "Per WhatsApp schreiben",
    waText: "Hallo, ich suche eine passende Ferienwohnung in Bodrum.",
  },
  ru: {
    title: "Мы подбираем апартаменты лично для вас",
    desc: "Вместо фиксированного каталога мы выбираем апартаменты, подходящие под ваши даты. Назовите ваши даты и число гостей — мы быстро пришлём лучшие варианты из апартаментов, с которыми работаем напрямую у владельцев.",
    offerCta: "Получить предложение",
    waCta: "Написать в WhatsApp",
    waText: "Здравствуйте, ищу подходящие апартаменты в Бодруме.",
  },
};

const HOME_REGIONS_DEFAULT: ByLocale<RegionsLocaleCopy> = {
  tr: { title: "Bodrum'un Bölgeleri", sub: "Size en uygun koyu seçin." },
  en: { title: "Bodrum's Neighbourhoods", sub: "Pick the bay that suits you best." },
  de: { title: "Die Viertel von Bodrum", sub: "Wählen Sie die Bucht, die am besten zu Ihnen passt." },
  ru: { title: "Районы Бодрума", sub: "Выберите бухту, которая подходит именно вам." },
};

const HOME_HOWITWORKS_DEFAULT: ByLocale<HowItWorksLocaleCopy> = {
  tr: {
    title: "Nasıl Çalışıyoruz",
    steps: [
      { title: "Talep", desc: "Tarih, kişi sayısı ve bölge tercihinizi iletin." },
      { title: "Seçenekler", desc: "Size uygun mülkleri seçenek olarak paylaşalım." },
      { title: "Konaklama", desc: "Anahtar hazır, karşılama yapılır, destek yanınızda." },
    ],
  },
  en: {
    title: "How It Works",
    steps: [
      { title: "Request", desc: "Share your dates, group size and preferred area." },
      { title: "Options", desc: "We send you the properties that fit your request." },
      { title: "Stay", desc: "Keys ready, a welcome arranged, support throughout." },
    ],
  },
  de: {
    title: "So arbeiten wir",
    steps: [
      { title: "Anfrage", desc: "Teilen Sie uns Reisedaten, Personenzahl und Wunschgebiet mit." },
      { title: "Optionen", desc: "Wir senden Ihnen die passenden Unterkünfte zu Ihrer Anfrage." },
      { title: "Aufenthalt", desc: "Schlüssel bereit, Empfang organisiert, Support inklusive." },
    ],
  },
  ru: {
    title: "Как мы работаем",
    steps: [
      { title: "Запрос", desc: "Сообщите даты, число гостей и желаемый район." },
      { title: "Варианты", desc: "Пришлём объекты, подходящие под ваш запрос." },
      { title: "Проживание", desc: "Ключи готовы, встреча организована, поддержка рядом." },
    ],
  },
};

const HOME_WHYUS_DEFAULT: ByLocale<WhyUsLocaleCopy> = {
  tr: {
    title: "Neden Biz?",
    items: [
      { title: "Yerel ekip", desc: "Bodrum'da yaşıyor, bölgeyi birinci elden biliyoruz." },
      { title: "Gerçek bilgi", desc: "Abartısız, dürüst ve güncel bilgi paylaşırız." },
      { title: "Esnek iptal", desc: "Net koşullar; planınız değişirse esnek davranırız." },
      { title: "Şeffaf iletişim", desc: "Tüm süreç boyunca doğrudan ve açık iletişim." },
    ],
  },
  en: {
    title: "Why Us?",
    items: [
      { title: "Local team", desc: "We live in Bodrum and know the area first-hand." },
      { title: "Honest info", desc: "Straight, accurate and up-to-date — no hype." },
      { title: "Flexible cancellation", desc: "Clear terms; if plans change, we stay flexible." },
      { title: "Transparent contact", desc: "Direct, open communication throughout." },
    ],
  },
  de: {
    title: "Warum wir?",
    items: [
      { title: "Lokales Team", desc: "Wir leben in Bodrum und kennen die Region aus erster Hand." },
      { title: "Ehrliche Infos", desc: "Geradlinig, korrekt und aktuell — ohne Übertreibung." },
      { title: "Flexible Stornierung", desc: "Klare Bedingungen; bei Planänderungen bleiben wir flexibel." },
      { title: "Transparenter Kontakt", desc: "Durchgehend direkte, offene Kommunikation." },
    ],
  },
  ru: {
    title: "Почему мы?",
    items: [
      { title: "Местная команда", desc: "Мы живём в Бодруме и знаем район из первых рук." },
      { title: "Честная информация", desc: "Прямо, точно и актуально — без прикрас." },
      { title: "Гибкая отмена", desc: "Чёткие условия; если планы меняются — мы гибки." },
      { title: "Прозрачное общение", desc: "Прямая и открытая связь на всех этапах." },
    ],
  },
};

const HOME_OWNER_DEFAULT: ByLocale<OwnerLocaleCopy> = {
  tr: {
    title: "Mülkünüzü kiraya mı vermek istiyorsunuz?",
    desc: "Koşulları ve oranı mülkünüze özel belirliyor, değerlendirme sonrası sizinle paylaşıyoruz. İletişim doğrudan; mülkünüzün kazandırabileceğini birlikte değerlendirelim.",
    cta: "Mülkünüzü Değerlendirelim",
  },
  en: {
    title: "Property Owner?",
    desc: "We set the terms and rate individually for your property and share them after a personal assessment. Contact stays direct — let's see how your property could perform.",
    cta: "Open the Application Form",
  },
  de: {
    title: "Möchten Sie Ihre Wohnung vermieten?",
    desc: "Konditionen und Satz legen wir individuell für Ihre Immobilie fest und teilen sie nach einer persönlichen Einschätzung mit. Der Kontakt bleibt direkt — finden wir gemeinsam heraus, was Ihre Immobilie einbringen kann.",
    cta: "Lassen Sie uns Ihre Wohnung bewerten",
  },
  ru: {
    title: "Хотите сдать своё жильё?",
    desc: "Условия и ставку мы определяем индивидуально для вашего объекта и сообщаем их после личной оценки. Связь остаётся прямой — давайте вместе оценим, что может приносить ваш объект.",
    cta: "Давайте оценим ваше жильё",
  },
};

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
    // `absolute` so the rich, self-contained homepage title is used verbatim and
    // the "%s | Bodrumapartkiralama.com" template suffix is not appended on top
    // of an already keyword-complete title.
    title: { absolute: t("metaTitle") },
    description: t("metaDesc"),
    alternates: buildAlternates(locale, ""),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDesc"),
      url,
      type: "website",
      ...defaultOgImages(locale).openGraph,
    },
    twitter: defaultOgImages(locale).twitter,
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

  const faqItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => ({
    q: f(`q${i}`),
    a: f(`a${i}`),
  }));

  type L = "tr" | "en" | "de" | "ru";
  const pick = locale as L;

  // ── HERO (DB-backed; falls back to in-code defaults when no published row) ──
  const isDraft = (await draftMode()).isEnabled;
  const hero =
    (await getSiteContent<ByLocale<HeroLocaleCopy>>("home.hero")) ??
    HOME_HERO_DEFAULT;
  const heroCopy = hero[pick] ?? hero.en;

  // ── HERO SEARCH LABELS ──────────────────────────────────────────────────────
  const searchLabelsByLocale = {
    tr: {
      region: "Bölge",
      regionAny: "Tüm bölgeler",
      checkIn: "Giriş",
      checkOut: "Çıkış",
      guests: "Kişi",
      guestsAny: "Farketmez",
      submit: "Teklif Al",
    },
    en: {
      region: "Region",
      regionAny: "All regions",
      checkIn: "Check-in",
      checkOut: "Check-out",
      guests: "Guests",
      guestsAny: "Any",
      submit: "Get a Quote",
    },
    de: {
      region: "Region",
      regionAny: "Alle Regionen",
      checkIn: "Anreise",
      checkOut: "Abreise",
      guests: "Personen",
      guestsAny: "Egal",
      submit: "Angebot erhalten",
    },
    ru: {
      region: "Район",
      regionAny: "Все районы",
      checkIn: "Заезд",
      checkOut: "Выезд",
      guests: "Гостей",
      guestsAny: "Не важно",
      submit: "Получить предложение",
    },
  } as const;
  const searchLabels = searchLabelsByLocale[pick] ?? searchLabelsByLocale.en;

  const regionOptions = HOMEPAGE_REGION_SLUGS.map((slug) => {
    const d = districts.find((x) => x.slug === slug)!;
    return { value: d.slug, label: d.name };
  });

  // ── OFFER EMPHASIS (DB-backed; falls back to in-code defaults) ──────────────
  const offer =
    (await getSiteContent<ByLocale<OfferLocaleCopy>>("home.offer")) ??
    HOME_OFFER_DEFAULT;
  const offerCopy = offer[pick] ?? offer.en;

  // ── REGIONS (DB-backed; falls back to in-code defaults) ─────────────────────
  const regions =
    (await getSiteContent<ByLocale<RegionsLocaleCopy>>("home.regions")) ??
    HOME_REGIONS_DEFAULT;
  const regionsCopy = regions[pick] ?? regions.en;
  const regionCards = HOMEPAGE_REGION_SLUGS.map((slug) =>
    districts.find((d) => d.slug === slug)!
  );

  // ── HOW IT WORKS (DB-backed text; icons stay in code, zipped by index) ──────
  const HOW_ICONS = [MessageCircle, Calendar, KeyRound] as const;
  const how =
    (await getSiteContent<ByLocale<HowItWorksLocaleCopy>>("home.howitworks")) ??
    HOME_HOWITWORKS_DEFAULT;
  const howCopy = how[pick] ?? how.en;

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

  // ── WHY US (DB-backed text; icons stay in code, zipped by index) ────────────
  const WHY_ICONS = [HomeIcon, BadgeCheck, Sparkles, HeartHandshake] as const;
  const why =
    (await getSiteContent<ByLocale<WhyUsLocaleCopy>>("home.whyus")) ??
    HOME_WHYUS_DEFAULT;
  const whyCopy = why[pick] ?? why.en;

  // ── OWNER CTA (DB-backed; falls back to in-code defaults) ────────────────────
  const owner =
    (await getSiteContent<ByLocale<OwnerLocaleCopy>>("home.owner")) ??
    HOME_OWNER_DEFAULT;
  const ownerCopy = owner[pick] ?? owner.en;

  // NOT: LocalBusiness/LodgingBusiness düğümü BURADA TEKRARLANMAZ — layout.tsx
  // her sayfada aynı @id (`#organization`) ile tam düğümü (aggregateRating
  // dahil, gerçek veriden) basıyor; ikinci bir kopya çelişen alanlarla aynı
  // varlığı ikiye bölüyordu. Bu dizi yalnız sayfaya özgü şemaları içerir.
  const jsonLd = [
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
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: t("metaTitle"),
      description: t("metaDesc"),
      inLanguage: locale,
      // Speakable (AEO / voice): answer-first hero headline + intro and the FAQ.
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["#hero-heading", "[data-speakable='intro']", "#faq-heading"],
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

      {isDraft && <PreviewBanner locale={locale} />}

      {/* 1 — HERO + SEARCH — "Canlı Akdeniz" degrade gökyüzü/deniz (salt CSS).
          v2 palet: kum-bg → açık turkuaz deniz; dekor radyalleri kum + turkuaz
          (begonvil tamamen kaldırıldı, gunes yalnız yıldız/puanda). */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(120%_80%_at_78%_8%,rgba(251,238,221,.9),transparent_42%),radial-gradient(90%_70%_at_18%_22%,rgba(52,200,196,.16),transparent_55%),linear-gradient(180deg,theme(colors.kum.50)_0%,theme(colors.turkuaz.50)_46%,theme(colors.turkuaz.100)_72%,theme(colors.turkuaz.200)_100%)]"
        />
        {/* Yumuşak ışık halesi — kum tonlu nötr dekor (v2: gunes dekorda kullanılmaz) */}
        <div
          aria-hidden="true"
          className="absolute right-[10%] top-12 hidden h-24 w-24 rounded-full bg-[radial-gradient(circle_at_50%_50%,#FFF8F0,#FBEEDD_65%)] shadow-[0_0_80px_12px_rgba(240,226,207,.7)] md:block"
        />
        {/* Dalgalar — turkuaz skalası */}
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-20 w-full md:h-32"
          viewBox="0 0 1200 170"
          preserveAspectRatio="none"
        >
          <path d="M0 70 Q150 40 300 70 T600 70 T900 70 T1200 70 V170 H0 Z" className="fill-turkuaz-200" opacity=".55" />
          <path d="M0 100 Q150 70 300 100 T600 100 T900 100 T1200 100 V170 H0 Z" className="fill-turkuaz-300" opacity=".6" />
          <path d="M0 130 Q150 105 300 130 T600 130 T900 130 T1200 130 V170 H0 Z" className="fill-turkuaz-500" />
        </svg>
        <div className="container-page relative z-10 py-16 pb-32 md:py-24 md:pb-40 lg:py-28 lg:pb-44">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              id="hero-heading"
              className="fade-up fade-d1 text-balance leading-tight text-murekkep-900 md:text-5xl lg:text-6xl"
            >
              {heroCopy.h1}
            </h1>
            <p
              data-speakable="intro"
              className="fade-up fade-d2 mx-auto mt-4 max-w-2xl text-base text-murekkep-700 md:text-lg"
            >
              {heroCopy.sub}
            </p>

            <div className="fade-up fade-d3">
              <HeroSearch
                locale={locale}
                labels={searchLabels}
                regions={regionOptions}
              />
            </div>

            {/* Trust micro-signals */}
            <div className="fade-up fade-d4 mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-murekkep-700">
              {heroCopy.trust.map((tr) => (
                <span key={tr} className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-turkuaz-600" />
                  {tr}
                </span>
              ))}
            </div>

            {/* Activity signal (generic, honest — no fake numbers) */}
            <div className="fade-up fade-d4 mt-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-1.5 text-sm font-semibold text-murekkep-700 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
              </span>
              {heroCopy.activity}
            </div>
          </div>
        </div>
      </section>

      {/* 2 — OFFER EMPHASIS (lean, honest, offer-based — no sample cards, no prices) */}
      <section
        aria-labelledby="offer-heading"
        className="section pt-16 md:pt-24 lg:pt-28"
      >
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="offer-heading" className="text-balance">
              {offerCopy.title}
            </h2>
            <p className="mt-3 text-muted">{offerCopy.desc}</p>
            <div className="mt-8">
              <OfferCtaButton
                locale={locale}
                offerLabel={offerCopy.offerCta}
                whatsappLabel={offerCopy.waCta}
                whatsappNumber={c("whatsappNumber")}
                whatsappText={offerCopy.waText}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3 — REGIONS (visual grid) */}
      <section aria-labelledby="regions-heading" className="section section-blue">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="regions-heading" className="text-balance">
              {regionsCopy.title}
            </h2>
            <p className="mt-3 text-muted">{regionsCopy.sub}</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {regionCards.map((d) => (
              <Link
                key={d.slug}
                href={`/bodrum/${d.urlSlug}`}
                className="group relative block aspect-[3/2] overflow-hidden rounded-xl shadow-card outline-none transition duration-300 hover:shadow-cardHover focus-visible:ring-2 focus-visible:ring-turkuaz-500 focus-visible:ring-offset-2"
              >
                <Image
                  src={`/images/regions/${d.slug}.webp`}
                  alt={`${d.name}, Bodrum`}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="flex items-center gap-1.5 text-xl font-bold text-white drop-shadow">
                    <MapPin className="h-4 w-4 text-turkuaz-300" />
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

      {/* 4 — HOW IT WORKS (tighter rhythm — a compact 3-step beat) */}
      <section
        aria-labelledby="how-heading"
        className="section py-10 md:py-12 lg:py-14"
      >
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="how-heading" className="text-balance">
              {howCopy.title}
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {howCopy.steps.map((s, i) => {
              const Icon = HOW_ICONS[i] ?? HOW_ICONS[0];
              return (
                <div key={s.title} className="card flex flex-col gap-3 p-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-navy-50 text-navy-900">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-display text-2xl font-semibold text-accent-500">
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

      {/* 5 — LIFESTYLE GALLERY (editorial / asymmetric 2-col split — the one
          section that deliberately breaks the centred-header rhythm) */}
      <section
        aria-labelledby="lifestyle-heading"
        className="section section-soft py-16 md:py-24 lg:py-28"
      >
        <div className="container-page">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Editorial text column — left-aligned, anchored by an accent rule */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="border-l-2 border-turkuaz-500 pl-5">
                <h2 id="lifestyle-heading" className="text-balance">
                  {lifestyleCopy.title}
                </h2>
                <p className="mt-4 max-w-sm text-muted">{lifestyleCopy.sub}</p>
              </div>
            </div>

            {/* Asymmetric image mosaic */}
            <div className="lg:col-span-8">
              <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] lg:auto-rows-[180px] lg:grid-cols-3">
                <LifestyleTile src="/images/lifestyle/beach.webp" alt={lifestyleCopy.alts.beach} className="col-span-2 row-span-2 lg:col-span-2" />
                <LifestyleTile src="/images/lifestyle/sunset.webp" alt={lifestyleCopy.alts.sunset} />
                <LifestyleTile src="/images/lifestyle/marina.webp" alt={lifestyleCopy.alts.marina} />
                <LifestyleTile src="/images/lifestyle/dinner.webp" alt={lifestyleCopy.alts.dinner} className="col-span-2 lg:col-span-1" />
                <LifestyleTile src="/images/lifestyle/boat.webp" alt={lifestyleCopy.alts.boat} />
                <LifestyleTile src="/images/lifestyle/pool.webp" alt={lifestyleCopy.alts.pool} className="col-span-2 lg:col-span-3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — WHY US */}
      <section aria-labelledby="why-heading" className="section">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="why-heading" className="text-balance">
              {whyCopy.title}
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyCopy.items.map((item, i) => {
              const Icon = WHY_ICONS[i] ?? WHY_ICONS[0];
              return (
                <div key={item.title} className="card flex flex-col gap-3 p-6">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-turkuaz-500/10 text-turkuaz-600">
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
      <section aria-labelledby="owner-heading" className="section section-soft py-10 md:py-14 lg:py-16">
        <div className="container-page">
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-5 rounded-xl border border-[var(--color-border)] bg-white p-6 md:flex-row md:items-center md:gap-8 md:p-8">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-turkuaz-500/10 text-turkuaz-600">
              <HomeIcon className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <h2 id="owner-heading" className="text-2xl">{ownerCopy.title}</h2>
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
      <section aria-labelledby="services-heading" className="section py-10 md:py-14 lg:py-16">
        <div className="container-page">
          <SectionHeader id="services-heading" title={t("servicesTitle")} />
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

      {/* 9 — GERÇEK MİSAFİR YORUMLARI (Supabase, onaylı; veri yoksa hiç
          render edilmez — v2 sahte yorum yasağı) */}
      <GuestReviews locale={locale} max={3} />

      {/* 10 — BLOG */}
      <section aria-labelledby="blog-heading" className="section section-soft">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <div>
              <h2 id="blog-heading">{t("blogTitle")}</h2>
              <p className="mt-2 text-muted">{t("blogDesc")}</p>
              <p className="mt-3 text-sm text-muted">
                {isTr
                  ? "Tatilinizi baştan sona planlamak için "
                  : locale === "de"
                    ? "Um Ihren Urlaub von A bis Z zu planen, lesen Sie unseren "
                    : locale === "ru"
                      ? "Чтобы спланировать отдых от и до, читайте наш "
                      : "To plan your whole trip, read our "}
                <Link
                  href="/bodrum-tatil-rehberi"
                  className="font-semibold text-navy-600 hover:underline"
                >
                  {isTr
                    ? "Bodrum Tatil Rehberi"
                    : locale === "de"
                      ? "Bodrum Reiseführer"
                      : locale === "ru"
                        ? "Путеводитель по Бодруму"
                        : "Bodrum Travel Guide"}
                </Link>
                {"."}
              </p>
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
                    loading="lazy"
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
      <section aria-labelledby="faq-heading" className="section">
        <div className="container-page max-w-4xl">
          <SectionHeader id="faq-heading" title={t("faqTitle")} />
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
        loading="lazy"
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

function SectionHeader({
  title,
  desc,
  id,
}: {
  title: string;
  desc?: string;
  id?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 id={id} className="text-balance">
        {title}
      </h2>
      {desc && <p className="mt-3 text-muted">{desc}</p>}
    </div>
  );
}

/** Thin fixed bar shown only in draft (preview) mode. Mom-friendly TR signal. */
function PreviewBanner({ locale }: { locale: string }) {
  const exitHref = `/api/preview/exit?path=${encodeURIComponent(
    locale === "tr" ? "/" : `/${locale}`,
  )}`;
  return (
    <div
      role="status"
      className="fixed inset-x-0 top-0 z-[100] flex items-center justify-center gap-2 bg-amber-500 px-4 py-1.5 text-center text-sm font-medium text-amber-950 shadow-md"
    >
      <span>
        Önizleme modu — bu taslak, henüz yayında değil.
      </span>
      <a href={exitHref} className="font-semibold underline underline-offset-2">
        Çıkış
      </a>
    </div>
  );
}
