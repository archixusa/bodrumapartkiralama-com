import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPin, Check, ArrowRight, ChevronRight, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { ApartCard } from "@/components/ApartCard";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { districts, getDistrict } from "@/data/districts";
import { posts } from "@/data/posts";
import { getSiteContent } from "@/lib/content";
import { buildAlternates, buildLocaleUrl } from "@/lib/seo";
import { loc, locArr } from "@/lib/i18n-data";
import { districtGuides } from "@/data/districtGuides";
import { DistrictGuide } from "@/components/DistrictGuide";
import { getApartmentsByDistrict } from "@/data/apartments";
import { GuestReviews } from "@/components/GuestReviews";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.bodrumapartkiralama.com";

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
    alternates: buildAlternates(locale, `/bodrum/${d.urlSlug}`),
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
  const c = await getTranslations({ locale, namespace: "common" });
  const isTr = locale === "tr";
  const districtName = dt(d.slug);
  // Breadcrumb ilk halkası — 4 dilli (tr/en ikilisi de/ru'yu İngilizceye
  // düşürüyordu); UI ve JSON-LD aynı etiketi paylaşır.
  const homeLabel =
    ({ tr: "Ana Sayfa", en: "Home", de: "Startseite", ru: "Главная" } as Record<
      string,
      string
    >)[locale] ?? "Home";

  // DB overlay (panel-editable). Keyed by BASE slug (e.g. "gumbet"), matching
  // districts.content.json keys. section_key is `district.<baseSlug>` (dash-free,
  // base slugs have no dashes). Falls back to the in-code JSON content when the
  // DB row is absent → byte-identical output when override is null.
  const override = await getSiteContent<
    Record<string, { shortDesc?: string; longDesc?: string; highlights?: string[] }>
  >("district." + d.slug);
  const oc = override?.[locale] ?? override?.en;

  const longDesc =
    oc?.longDesc ??
    loc(locale, {
      tr: d.longDescTr,
      en: d.longDescEn,
      de: d.longDescDe,
      ru: d.longDescRu,
    });
  const highlights =
    oc?.highlights && oc.highlights.length
      ? oc.highlights
      : locArr(locale, d.highlights);
  const apts = getApartmentsByDistrict(d.slug);

  const availabilityByLocale = {
    tr: {
      title: `${districtName} bölgesinde uygun apart arıyorsanız`,
      desc: `Kataloğumuz büyürken ${districtName} için elimizdeki seçenekleri WhatsApp'tan hızlıca paylaşabiliriz. Tarih ve kişi sayınızı yazın, size uygun apartları sunalım.`,
      whatsapp: "WhatsApp ile Müsaitlik Sorun",
      contact: "İletişim formunu doldurun",
      wa: `Merhaba, ${districtName} bölgesinde uygun apart arıyorum.`,
    },
    en: {
      title: `Looking for an apartment in ${districtName}?`,
      desc: `While our catalogue grows, we can quickly share what we have in ${districtName} over WhatsApp. Send your dates and group size and we'll match you to suitable apartments.`,
      whatsapp: "Request Availability on WhatsApp",
      contact: "Fill in the contact form",
      wa: `Hello, I'm looking for a suitable apartment in ${districtName}.`,
    },
    de: {
      title: `Suchen Sie eine Ferienwohnung in ${districtName}?`,
      desc: `Während unser Katalog wächst, teilen wir Ihnen gern per WhatsApp mit, was wir in ${districtName} verfügbar haben. Senden Sie uns Ihre Reisedaten und Personenzahl, und wir finden passende Apartments.`,
      whatsapp: "Verfügbarkeit per WhatsApp anfragen",
      contact: "Kontaktformular ausfüllen",
      wa: `Hallo, ich suche eine passende Ferienwohnung in ${districtName}.`,
    },
    ru: {
      title: `Ищете апартаменты в районе ${districtName}?`,
      desc: `Пока наш каталог пополняется, мы можем быстро прислать в WhatsApp то, что есть в ${districtName}. Напишите ваши даты и количество гостей — подберём подходящие апартаменты.`,
      whatsapp: "Узнать наличие в WhatsApp",
      contact: "Заполнить форму обратной связи",
      wa: `Здравствуйте, ищу подходящие апартаменты в районе ${districtName}.`,
    },
  } as const;
  const availabilityCopy =
    availabilityByLocale[locale as "tr" | "en" | "de" | "ru"] ??
    availabilityByLocale.en;
  const availabilityWaHref = `https://wa.me/${c(
    "whatsappNumber"
  )}?text=${encodeURIComponent(availabilityCopy.wa)}`;

  const nearby = d.nearby
    .map((slug) => districts.find((x) => x.slug === slug))
    .filter(Boolean);
  const guide = isTr ? districtGuides[d.slug] : undefined;

  // Topical internal link: surface a blog guide relevant to this district
  // (one that lists it under relatedDistricts), falling back to the main
  // Bodrum holiday guide so there's always a contextual editorial link.
  const relatedPost =
    posts.find((p) => p.relatedDistricts?.includes(d.slug)) ??
    posts.find((p) => p.slug === "bodrum-tatil-rehberi") ??
    posts[0];

  const districtFaq = [
    {
      q:
        locale === "tr"
          ? `${districtName} hangi tarz tatilci için uygundur?`
          : locale === "de"
            ? `Für welche Art von Urlaubern eignet sich ${districtName}?`
            : locale === "ru"
              ? `Кому лучше всего подойдёт ${districtName}?`
              : `Who is ${districtName} best suited for?`,
      a: longDesc.split(/(?<=\.)\s/)[0],
    },
    {
      q:
        locale === "tr"
          ? `${districtName}'a ulaşım nasıl?`
          : locale === "de"
            ? `Wie komme ich nach ${districtName}?`
            : locale === "ru"
              ? `Как добраться до ${districtName}?`
              : `How do I get to ${districtName}?`,
      a:
        locale === "tr"
          ? `Milas-Bodrum Havalimanı'ndan ${districtName}'a özel transfer hizmetimiz vardır. Ortalama transfer süresi 30-50 dakikadır; rezervasyon sırasında talep edebilirsiniz.`
          : locale === "de"
            ? `Wir bieten einen Privattransfer vom Flughafen Milas-Bodrum nach ${districtName}. Die durchschnittliche Fahrzeit beträgt 30-50 Minuten; Sie können ihn bei der Buchung anfragen.`
            : locale === "ru"
              ? `Мы предоставляем индивидуальный трансфер из аэропорта Милас-Бодрум до ${districtName}. Среднее время в пути — 30-50 минут; вы можете заказать его при бронировании.`
              : `We provide private transfer from Milas-Bodrum Airport to ${districtName}. Average transfer time is 30-50 minutes; request it during booking.`,
    },
    {
      q:
        locale === "tr"
          ? `${districtName}'da apart kiralama bütçesi neye göre değişir?`
          : locale === "de"
            ? `Wovon hängt das Budget für eine Ferienwohnung in ${districtName} ab?`
            : locale === "ru"
              ? `От чего зависит бюджет на аренду апартаментов в ${districtName}?`
              : `What affects the budget for an apartment in ${districtName}?`,
      a:
        locale === "tr"
          ? `Bütçe; tarihinize, sezona (yüksek sezon Haziran-Eylül en yoğun dönemdir), kişi sayısına ve apartın segmentine göre değişir. Düşük sezonda konaklama belirgin biçimde daha uygun olur. Tarihinizi paylaşın; size özel teklifi iletelim.`
          : locale === "de"
            ? `Das Budget hängt von Ihren Terminen, der Saison (Hauptsaison Juni-September ist am gefragtesten), der Personenzahl und der Kategorie der Wohnung ab. In der Nebensaison ist die Unterkunft spürbar günstiger. Teilen Sie uns Ihre Termine mit, und wir senden Ihnen ein individuelles Angebot.`
            : locale === "ru"
              ? `Бюджет зависит от ваших дат, сезона (высокий сезон июнь-сентябрь — самый востребованный), числа гостей и категории апартаментов. В низкий сезон проживание заметно доступнее. Сообщите нам даты — и мы пришлём индивидуальное предложение.`
              : `The budget depends on your dates, the season (high season June-September is the busiest), party size and the apartment's tier. Accommodation is noticeably more affordable off-season. Share your dates and we'll send a tailored offer.`,
    },
    {
      q:
        locale === "tr"
          ? `${districtName}'da hangi plajlar var?`
          : locale === "de"
            ? `Welche Strände gibt es in ${districtName}?`
            : locale === "ru"
              ? `Какие пляжи есть в ${districtName}?`
              : `Which beaches are in ${districtName}?`,
      a:
        locale === "tr"
          ? `${districtName} bölgesinin öne çıkan plaj ve koyları için sayfadaki "${districtName} Hakkında" bölümüne göz atabilirsiniz.`
          : locale === "de"
            ? `Die schönsten Strände und Buchten von ${districtName} finden Sie oben im Abschnitt „Über ${districtName}“.`
            : locale === "ru"
              ? `Лучшие пляжи и бухты района ${districtName} вы найдёте выше в разделе «О районе ${districtName}».`
              : `For the highlighted beaches and coves of ${districtName}, see the "About ${districtName}" section above.`,
    },
    {
      q:
        locale === "tr"
          ? `${districtName}'da rezervasyon nasıl yapılır?`
          : locale === "de"
            ? `Wie buche ich in ${districtName}?`
            : locale === "ru"
              ? `Как забронировать жильё в ${districtName}?`
              : `How do I book in ${districtName}?`,
      a:
        locale === "tr"
          ? `Beğendiğiniz apartı seçin ve rezervasyon formunu doldurun. En geç 24 saat içinde WhatsApp veya telefondan dönüş yapıyoruz.`
          : locale === "de"
            ? `Wählen Sie ein Apartment, das Ihnen gefällt, und füllen Sie das Buchungsformular aus. Wir melden uns innerhalb von 24 Stunden per WhatsApp oder Telefon.`
            : locale === "ru"
              ? `Выберите понравившиеся апартаменты и заполните форму бронирования. Мы свяжемся с вами в течение 24 часов через WhatsApp или по телефону.`
              : `Pick an apartment you like and fill in the booking form. We respond within 24 hours via WhatsApp or phone.`,
    },
  ];

  const combinedFaq = [...districtFaq, ...(guide?.faqs ?? [])];

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
      "@type": "Place",
      name: `${districtName}, Bodrum`,
      description: guide?.lead ?? longDesc,
      url: `${SITE_URL}/bodrum/${d.urlSlug}`,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Bodrum, Muğla, TR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: d.lat,
        longitude: d.lng,
      },
      image: d.heroImage,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      // Locale-duyarlı: item URL'leri UI'daki i18n Link'lerle aynı prefix'i
      // taşır (tr kökte, en/de/ru /{locale} altında) ve ilk halka 4 dilde.
      itemListElement: [
        { "@type": "ListItem", position: 1, name: homeLabel, item: buildLocaleUrl(locale, "") },
        { "@type": "ListItem", position: 2, name: fl("title"), item: buildLocaleUrl(locale, "/apartlar") },
        { "@type": "ListItem", position: 3, name: districtName, item: buildLocaleUrl(locale, `/bodrum/${d.urlSlug}`) },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: combinedFaq.map((it) => ({
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
          alt={`${districtName}, Bodrum`}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/55 to-navy-900/85" />
        <div className="container-page relative py-14 md:py-20">
          {/* Breadcrumb UI — JSON-LD'deki BreadcrumbList ile aynı zincir
              (etiketler VE locale-prefix'li URL'ler birebir eşleşir). */}
          <nav aria-label="breadcrumb" className="mb-3 flex flex-wrap items-center gap-1 text-xs text-white/80">
            <Link href="/" className="hover:underline">{homeLabel}</Link>
            <ChevronRight className="h-3 w-3 opacity-60" />
            <Link href="/apartlar" className="hover:underline">{fl("title")}</Link>
            <ChevronRight className="h-3 w-3 opacity-60" />
            <span aria-current="page" className="font-semibold text-white">{districtName}</span>
          </nav>
          <h1 className="text-white">{t("h1", { district: districtName })}</h1>
          <p className="mt-3 max-w-2xl text-base text-white/85 md:text-lg">
            {oc?.shortDesc ??
              loc(locale, {
                tr: d.shortDescTr,
                en: d.shortDescEn,
                de: d.shortDescDe,
                ru: d.shortDescRu,
              })}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <h2>{t("aboutTitle", { district: districtName })}</h2>
            <p className="mt-4 text-base md:text-[15px] leading-relaxed text-ink/90">{longDesc}</p>
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

      {guide && <DistrictGuide guide={guide} districtName={districtName} />}

      <section className="section section-soft">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <h2>{t("apartsTitle", { district: districtName })}</h2>
            <Link href="/apartlar" className="text-sm font-semibold text-navy-600 hover:underline">
              {fl("title")} <ArrowRight className="ml-1 inline h-4 w-4" />
            </Link>
          </div>
          {apts.length === 0 ? (
            <div className="mt-6 flex flex-col items-start gap-5 rounded-xl border border-[var(--color-border)] bg-white p-6 md:flex-row md:items-center md:gap-8 md:p-8">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-turkuaz-500/10 text-turkuaz-600">
                <MessageCircle className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <h3 className="text-xl">{availabilityCopy.title}</h3>
                <p className="mt-2 text-sm text-muted md:text-base">
                  {availabilityCopy.desc}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                <a
                  href={availabilityWaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-lead="district-whatsapp"
                  className="btn-primary"
                >
                  <MessageCircle className="h-4 w-4" />
                  {availabilityCopy.whatsapp}
                </a>
                <Link
                  href="/iletisim"
                  className="btn-secondary"
                >
                  {availabilityCopy.contact}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {apts.map((apt) => (
                <ApartCard key={apt.id} apt={apt} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gerçek onaylı misafir yorumları (site geneli, empty-safe) —
          v2 sahte yorum yasağı: uydurma Testimonials kaldırıldı. */}
      <GuestReviews locale={locale} max={3} />

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
          {relatedPost && (
            <p className="mt-6 text-sm text-muted">
              {isTr
                ? "Daha fazlasını okuyun: "
                : locale === "de"
                  ? "Weiterlesen: "
                  : locale === "ru"
                    ? "Читать далее: "
                    : "Read more: "}
              <Link
                href={`/blog/${relatedPost.slug}`}
                className="font-semibold text-navy-600 hover:underline"
              >
                {loc(locale, {
                  tr: relatedPost.titleTr,
                  en: relatedPost.titleEn,
                  de: relatedPost.titleDe,
                  ru: relatedPost.titleRu,
                })}
              </Link>
            </p>
          )}
          <p className="mt-3 text-sm text-muted">
            {isTr
              ? "Bodrum tatilinizi baştan sona planlamak için "
              : locale === "de"
                ? "Um Ihren Bodrum-Urlaub von A bis Z zu planen, lesen Sie unseren "
                : locale === "ru"
                  ? "Чтобы спланировать отдых в Бодруме от и до, читайте наш "
                  : "To plan your whole Bodrum holiday, read our "}
            <Link
              href="/bodrum-tatil-rehberi"
              className="font-semibold text-navy-600 hover:underline"
            >
              {isTr
                ? "Bodrum Tatil Rehberi'ne göz atın"
                : locale === "de"
                  ? "Bodrum Reiseführer"
                  : locale === "ru"
                    ? "Путеводитель по Бодруму"
                    : "Bodrum Travel Guide"}
            </Link>
            {locale === "tr" ? "." : "."}
          </p>
        </div>
      </section>
    </>
  );
}
