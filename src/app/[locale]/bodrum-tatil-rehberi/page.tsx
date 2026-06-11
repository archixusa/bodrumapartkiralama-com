import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { districts } from "@/data/districts";
import { GUIDE, GUIDE_FAQ, type Locale } from "@/data/tatilRehberi";
import { buildAlternates, buildLocaleUrl, defaultOgImages } from "@/lib/seo";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.bodrumapartkiralama.com";

const PATH = "/bodrum-tatil-rehberi";
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1566084091852-0385135abadc?auto=format&fit=crop&w=2000&q=80";

// District urlSlug lookup by base slug — guards against drift from districts.ts.
function districtHref(slug: string): string {
  const d = districts.find((x) => x.slug === slug);
  return d ? `/bodrum/${d.urlSlug}` : "/apartlar";
}

type Anchor = { href: string; labels: Record<Locale, string> };

// Curated hub→spoke link rows, one per section id. Every href below resolves to
// a real route (districts from districts.ts, real /blog/<slug> posts that exist
// in src/data/posts.ts or content/blog/*.mdx, and the four service pages).
// Anchor text is varied and natural — no keyword stuffing, well under 100 links.
const SECTION_LINKS: Record<string, Anchor[]> = {
  bolgeler: [
    { href: districtHref("gumbet"), labels: { tr: "Gümbet apart kiralama", en: "Stay in Gümbet", de: "Unterkünfte in Gümbet", ru: "Жильё в Гюмбете" } },
    { href: districtHref("yalikavak"), labels: { tr: "Yalıkavak apart kiralama", en: "Stay in Yalıkavak", de: "Unterkünfte in Yalıkavak", ru: "Жильё в Ялыкаваке" } },
    { href: districtHref("bitez"), labels: { tr: "Bitez apart kiralama", en: "Stay in Bitez", de: "Unterkünfte in Bitez", ru: "Жильё в Битезе" } },
    { href: districtHref("ortakent"), labels: { tr: "Ortakent apart kiralama", en: "Stay in Ortakent", de: "Unterkünfte in Ortakent", ru: "Жильё в Ортакенте" } },
    { href: districtHref("turgutreis"), labels: { tr: "Turgutreis apart kiralama", en: "Stay in Turgutreis", de: "Unterkünfte in Turgutreis", ru: "Жильё в Тургутрейсе" } },
    { href: districtHref("gundogan"), labels: { tr: "Gündoğan apart kiralama", en: "Stay in Gündoğan", de: "Unterkünfte in Gündoğan", ru: "Жильё в Гюндогане" } },
    { href: districtHref("torba"), labels: { tr: "Torba apart kiralama", en: "Stay in Torba", de: "Unterkünfte in Torba", ru: "Жильё в Торбе" } },
    { href: "/blog/bodrum-ailecek-tatil-en-uygun-bolgeler", labels: { tr: "Ailelere en uygun bölgeler", en: "Best areas for families", de: "Beste Regionen für Familien", ru: "Лучшие районы для семей" } },
  ],
  "ne-zaman": [
    { href: "/blog/bodrum-tatil-rehberi", labels: { tr: "Bodrum tatil rehberi: ne zaman gidilir", en: "When to visit Bodrum", de: "Wann nach Bodrum reisen", ru: "Когда ехать в Бодрум" } },
    { href: "/blog/gundugan-plaji-mayis-ayi-rehberi", labels: { tr: "Gündoğan'da mayıs ayı rehberi", en: "Gündoğan in May", de: "Gündoğan im Mai", ru: "Гюндоган в мае" } },
  ],
  "nasil-gidilir": [
    { href: "/blog/bodrum-havalimanindan-merkeze-ulasim", labels: { tr: "Havalimanından merkeze ulaşım", en: "Airport to centre transport", de: "Vom Flughafen ins Zentrum", ru: "Из аэропорта в центр" } },
    { href: "/vip-transfer", labels: { tr: "Özel transfer", en: "Private transfer", de: "Privattransfer", ru: "Индивидуальный трансфер" } },
    { href: "/arac-kiralama", labels: { tr: "Araç kiralama", en: "Car rental", de: "Mietwagen", ru: "Аренда авто" } },
  ],
  konaklama: [
    { href: "/apartlar", labels: { tr: "Bodrum apart seçenekleri", en: "Bodrum apartments", de: "Bodrum-Apartments", ru: "Апартаменты в Бодруме" } },
    { href: "/blog/bodrum-apart-kiralarken-dikkat-edilmesi-gerekenler", labels: { tr: "Apart kiralarken dikkat edilecekler", en: "Tips for renting an apartment", de: "Tipps zur Ferienwohnung", ru: "Советы по аренде апартаментов" } },
  ],
  aktiviteler: [
    { href: "/tekne-kiralama", labels: { tr: "Tekne kiralama", en: "Boat rental", de: "Bootscharter", ru: "Аренда лодки" } },
    { href: "/turlar", labels: { tr: "Bodrum turları", en: "Bodrum tours", de: "Bodrum-Touren", ru: "Туры по Бодруму" } },
    { href: "/blog/bodrum-tekne-turu-rehberi", labels: { tr: "Bodrum tekne turu rehberi", en: "Bodrum boat tour guide", de: "Bodrum Bootstour-Reiseführer", ru: "Гид по морским прогулкам" } },
    { href: "/blog/bodrum-ortakent-cocuklu-ailelere-uygun-aktiviteler", labels: { tr: "Çocuklu ailelere uygun aktiviteler", en: "Activities for families", de: "Aktivitäten für Familien", ru: "Активности для семей" } },
  ],
  plajlar: [
    { href: "/blog/bodrum-plajlari", labels: { tr: "Bodrum plajları rehberi", en: "Bodrum beaches guide", de: "Strände von Bodrum", ru: "Путеводитель по пляжам" } },
    { href: "/blog/yalikavak-gunbatimi-izlenecek-nokta", labels: { tr: "Yalıkavak'ta gün batımı noktaları", en: "Sunset spots in Yalıkavak", de: "Sonnenuntergang in Yalıkavak", ru: "Закаты в Ялыкаваке" } },
    { href: districtHref("bitez"), labels: { tr: "Bitez koyları", en: "Bitez coves", de: "Buchten von Bitez", ru: "Бухты Битеза" } },
  ],
  "yeme-icme": [
    { href: "/blog/bodrum-turgutreis-pazari-hangi-gun-acik-ne-alinir", labels: { tr: "Turgutreis pazarı rehberi", en: "Turgutreis market guide", de: "Turgutreis-Markt", ru: "Рынок Тургутрейса" } },
    { href: "/blog/gumbetten-bodrum-kalesine-yuruyerek-nasil-gidilir", labels: { tr: "Bodrum Kalesi'ne yürüyüş", en: "Walk to Bodrum Castle", de: "Spaziergang zur Burg Bodrum", ru: "Прогулка к замку Бодрум" } },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const g = GUIDE[(locale as Locale) in GUIDE ? (locale as Locale) : "en"];
  const url = locale === "tr" ? `${SITE_URL}${PATH}` : `${SITE_URL}/${locale}${PATH}`;
  const title = `${g.h1} 2026`;
  const description = g.sub;
  return {
    title,
    description,
    alternates: buildAlternates(locale, PATH),
    openGraph: {
      title,
      description,
      url,
      type: "article",
      ...defaultOgImages(locale).openGraph,
    },
    twitter: defaultOgImages(locale).twitter,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = await getTranslations({ locale, namespace: "common" });

  const pick: Locale = (locale as Locale) in GUIDE ? (locale as Locale) : "en";
  const g = GUIDE[pick];
  const faq = GUIDE_FAQ[pick] ?? GUIDE_FAQ.en;
  const isTr = locale === "tr";
  const homeLabel = isTr ? "Ana Sayfa" : locale === "de" ? "Startseite" : locale === "ru" ? "Главная" : "Home";

  const pageUrl = locale === "tr" ? `${SITE_URL}${PATH}` : `${SITE_URL}/${locale}${PATH}`;
  const waHref = `https://wa.me/${c("whatsappNumber")}?text=${encodeURIComponent(g.ctaWaText)}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: g.h1,
      description: g.sub,
      image: [HERO_IMAGE],
      inLanguage: locale,
      author: {
        "@type": "Person",
        name: "Bodrumapartkiralama Editör Ekibi",
        url: `${SITE_URL}/hakkimizda`,
        jobTitle: "Editör",
        worksFor: { "@type": "Organization", name: "Bodrumapartkiralama.com", url: SITE_URL },
      },
      publisher: {
        "@type": "Organization",
        name: "Bodrumapartkiralama.com",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/apart-logo-512.png` },
      },
      mainEntityOfPage: pageUrl,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "[data-speakable='intro']"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      // Home halkası locale-duyarlı (district/blog deseni): en/de/ru'da
      // sayfanın gerçek locale-prefix'li kökünü gösterir; pageUrl zaten
      // locale-duyarlı.
      itemListElement: [
        { "@type": "ListItem", position: 1, name: homeLabel, item: buildLocaleUrl(locale, "") },
        { "@type": "ListItem", position: 2, name: g.h1, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((it) => ({
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
        title={g.h1}
        subtitle={g.sub}
        badge={g.badge}
        image={HERO_IMAGE}
        crumbs={[{ href: "/", label: homeLabel }, { label: g.h1 }]}
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="min-w-0">
            {/* Answer-first opening */}
            <div className="space-y-4 text-base md:text-[15px] leading-relaxed text-ink/90">
              {g.intro.map((p, i) => (
                <p key={i} data-speakable={i === 0 ? "intro" : undefined}>
                  {p}
                </p>
              ))}
            </div>

            {/* Sections — each ends with a contextual hub→spoke link row */}
            {g.sections.map((s) => {
              const links = SECTION_LINKS[s.id] ?? [];
              return (
                <div key={s.id} id={s.id} className="mt-12 scroll-mt-24">
                  <h2>{s.heading}</h2>
                  <div className="mt-4 space-y-4 text-base md:text-[15px] leading-relaxed text-ink/90">
                    {s.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  {links.length > 0 && (
                    <div className="mt-5 rounded-xl border border-[var(--color-border)] bg-navy-50/40 p-4">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
                        {g.relatedTitle}
                      </p>
                      <ul className="flex flex-wrap gap-2">
                        {links.map((l) => (
                          <li key={l.href + l.labels.en}>
                            <Link
                              href={l.href}
                              className="inline-flex items-center gap-1 rounded-md border border-[var(--color-border)] bg-white px-3 py-1.5 text-sm font-medium text-navy-700 transition hover:border-navy-300 hover:text-navy-900"
                            >
                              {l.labels[pick]}
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}

            {/* FAQ */}
            <div className="mt-14">
              <h2>{g.faqTitle}</h2>
              <div className="mt-6">
                <FAQ items={faq} />
              </div>
            </div>

            {/* Planning CTA */}
            <div className="mt-12 rounded-2xl border border-turkuaz-500/30 bg-turkuaz-500/5 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-navy-900">{g.ctaHeading}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{g.ctaBody}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <MessageCircle className="h-4 w-4" />
                  {g.ctaWhatsApp}
                </a>
                <Link href="/apartlar" className="btn-secondary">
                  {g.ctaSecondary}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* TOC sidebar */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <nav
              aria-label={g.tocTitle}
              className="rounded-xl border border-[var(--color-border)] bg-white p-4 text-sm"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
                {g.tocTitle}
              </p>
              <ul className="space-y-2">
                {g.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-navy-900 hover:text-navy-600">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </section>
    </>
  );
}
