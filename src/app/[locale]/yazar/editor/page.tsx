import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  MapPin,
  Compass,
  Handshake,
  CalendarClock,
  MessageCircle,
  CheckCircle2,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/routing";
import { buildAlternates, defaultOgImages, buildLocaleUrl } from "@/lib/seo";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.bodrumapartkiralama.com";

type L = "tr" | "en" | "de" | "ru";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const pick = locale as L;
  const tx = <T,>(o: Record<L, T>): T => o[pick] ?? o.en;
  const url = buildLocaleUrl(locale, "/yazar/editor");
  const title = tx({
    tr: "Editör Ekibi — Bodrum Apart Kiralama",
    en: "Editorial Team — Bodrum Apartment Rental",
    de: "Redaktionsteam — Ferienwohnungen in Bodrum",
    ru: "Редакционная команда — Аренда апартаментов в Бодруме",
  });
  const description = tx({
    tr: "Bodrumapartkiralama Editör Ekibi — 2013'ten beri Bodrum yarımadasında apart kiralama yöneten, doğrudan mülk sahibi ağıyla çalışan yerel ekip.",
    en: "The Bodrumapartkiralama Editorial Team — a local team managing apartment rentals on the Bodrum peninsula since 2013, working directly with property owners.",
    de: "Das Redaktionsteam von Bodrumapartkiralama — ein lokales Team, das seit 2013 Ferienwohnungen auf der Halbinsel Bodrum verwaltet und direkt mit Eigentümern arbeitet.",
    ru: "Редакционная команда Bodrumapartkiralama — местная команда, управляющая арендой апартаментов на полуострове Бодрум с 2013 года и работающая напрямую с владельцами жилья.",
  });
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/yazar/editor"),
    openGraph: {
      title,
      description,
      url,
      type: "profile",
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

  const pick = locale as L;

  const copyByLocale: Record<
    L,
    {
      h1: string;
      role: string;
      subtitle: string;
      intro: string;
      expertiseTitle: string;
      expertiseLead: string;
      pillars: { icon: typeof MapPin; title: string; desc: string }[];
      districtsTitle: string;
      districtsLead: string;
      districts: string[];
      trustTitle: string;
      trust: string[];
      contactTitle: string;
      contactLead: string;
      whatsappCta: string;
      ctaApart: string;
      ctaAbout: string;
      breadcrumbHome: string;
      breadcrumbAuthor: string;
    }
  > = {
    tr: {
      h1: "Bodrumapartkiralama Editör Ekibi",
      role: "Yerel ekip · 2013'ten beri Bodrum",
      subtitle:
        "Bodrum yarımadasında apart kiralama yöneten, blog ve rehber içeriklerimizi hazırlayan ekip.",
      intro:
        "Bodrumapartkiralama Editör Ekibi olarak 2013'ten bu yana Bodrum yarımadasında konaklama yönetimi yapıyoruz. Sitedeki bölge rehberlerini, blog yazılarını ve tatil ipuçlarını biz hazırlıyoruz. Tek bir kişi değil; sahada çalışan, mülkleri yerinde gören ve misafirlerle doğrudan konuşan küçük bir ekibiz. Yazdığımız her şey ya kendi tecrübemizden ya da yıllar içinde tanıdığımız mülk sahiplerinden ve misafirlerden gelen bilgiye dayanır.",
      expertiseTitle: "Neden bize güvenebilirsiniz?",
      expertiseLead:
        "Uzmanlığımız masabaşı değil; doğrudan Bodrum'da, sahada edinilmiş bilgidir.",
      pillars: [
        {
          icon: CalendarClock,
          title: "2013'ten beri sahada",
          desc: "On yılı aşkın süredir aynı bölgede çalışıyoruz. Sezonların nasıl değiştiğini, hangi mahallenin hangi tatilciye uyduğunu deneyimle biliyoruz.",
        },
        {
          icon: Handshake,
          title: "Doğrudan mülk sahibi ağı",
          desc: "Listelediğimiz apartların sahipleriyle aracısız, birebir çalışıyoruz. Bu yüzden her mülkün durumunu, çevresini ve özelliklerini ilk elden aktarabiliyoruz.",
        },
        {
          icon: Compass,
          title: "Yerinde bölge bilgisi",
          desc: "Gümbet, Turgutreis, Yalıkavak, Bitez ve çevresini harita üzerinden değil, gidip gezerek tanıyoruz. Plaja yürüme mesafesi gibi detayları yerinden biliyoruz.",
        },
      ],
      districtsTitle: "Çalıştığımız bölgeler",
      districtsLead:
        "Bodrum yarımadasının ailelere en uygun bölgelerini yakından takip ediyoruz:",
      districts: [
        "Gümbet",
        "Turgutreis",
        "Yalıkavak",
        "Bitez",
        "Ortakent",
        "Gündoğan",
      ],
      trustTitle: "Çalışma ilkemiz",
      trust: [
        "İçeriklerimizi kendi saha tecrübemize ve mülk sahibi ağımızdan gelen bilgiye dayandırırız.",
        "Bilmediğimiz veya emin olmadığımız bir konuyu kesinmiş gibi yazmayız.",
        "Check-in'den check-out'a, ihtiyaç anlarında 7/24 ulaşılabilir oluruz.",
        "Havalimanı Özel Transfer dahil tüm süreçte misafirin yanında dururuz.",
      ],
      contactTitle: "Ekibe ulaşın",
      contactLead:
        "Bir sorunuz mu var? En hızlı kanal WhatsApp; doğrudan ekibimizle konuşursunuz.",
      whatsappCta: "WhatsApp ile yazın",
      ctaApart: "Apartları gör",
      ctaAbout: "Hakkımızda",
      breadcrumbHome: "Ana Sayfa",
      breadcrumbAuthor: "Editör Ekibi",
    },
    en: {
      h1: "Bodrumapartkiralama Editorial Team",
      role: "Local team · in Bodrum since 2013",
      subtitle:
        "The team managing apartment rentals on the Bodrum peninsula and writing our guides and blog.",
      intro:
        "We are the Bodrumapartkiralama Editorial Team, managing accommodation on the Bodrum peninsula since 2013. We write the district guides, blog posts and travel tips you find on this site. We're not one named person but a small hands-on team that visits the properties in person and talks to guests directly. Everything we publish comes either from our own experience or from the owners and guests we've come to know over the years.",
      expertiseTitle: "Why you can trust us",
      expertiseLead:
        "Our expertise isn't from a desk — it's earned on the ground in Bodrum.",
      pillars: [
        {
          icon: CalendarClock,
          title: "On the ground since 2013",
          desc: "We've worked the same region for over a decade. We know from experience how the seasons shift and which neighbourhood suits which kind of holidaymaker.",
        },
        {
          icon: Handshake,
          title: "Direct owner network",
          desc: "We work one-to-one with the owners of the apartments we list, with no middleman. That's why we can describe each property's condition, surroundings and features first-hand.",
        },
        {
          icon: Compass,
          title: "First-hand local knowledge",
          desc: "We know Gümbet, Turgutreis, Yalıkavak, Bitez and the surrounding areas not from a map but from walking them. We know the small details, like the real walking distance to the beach.",
        },
      ],
      districtsTitle: "Areas we cover",
      districtsLead:
        "We follow the most family-friendly parts of the Bodrum peninsula closely:",
      districts: [
        "Gümbet",
        "Turgutreis",
        "Yalıkavak",
        "Bitez",
        "Ortakent",
        "Gündoğan",
      ],
      trustTitle: "How we work",
      trust: [
        "We base our content on our own field experience and on what our owner network tells us.",
        "We don't write about something as certain when we don't know it or aren't sure.",
        "From check-in to check-out, we stay reachable 24/7 when you need us.",
        "We stay by the guest's side throughout, including the Airport Private Transfer.",
      ],
      contactTitle: "Reach the team",
      contactLead:
        "Have a question? The fastest channel is WhatsApp — you talk to our team directly.",
      whatsappCta: "Message on WhatsApp",
      ctaApart: "View apartments",
      ctaAbout: "About us",
      breadcrumbHome: "Home",
      breadcrumbAuthor: "Editorial Team",
    },
    de: {
      h1: "Redaktionsteam von Bodrumapartkiralama",
      role: "Lokales Team · seit 2013 in Bodrum",
      subtitle:
        "Das Team, das die Ferienwohnungen auf der Halbinsel Bodrum verwaltet und unsere Ratgeber und Blogbeiträge schreibt.",
      intro:
        "Wir sind das Redaktionsteam von Bodrumapartkiralama und verwalten seit 2013 Unterkünfte auf der Halbinsel Bodrum. Die Regionsratgeber, Blogbeiträge und Reisetipps auf dieser Seite stammen von uns. Wir sind keine einzelne benannte Person, sondern ein kleines, praxisnahes Team, das die Unterkünfte persönlich besichtigt und direkt mit den Gästen spricht. Alles, was wir veröffentlichen, beruht entweder auf unserer eigenen Erfahrung oder auf dem Wissen der Eigentümer und Gäste, die wir über die Jahre kennengelernt haben.",
      expertiseTitle: "Warum Sie uns vertrauen können",
      expertiseLead:
        "Unser Wissen kommt nicht vom Schreibtisch, sondern direkt aus Bodrum, vor Ort.",
      pillars: [
        {
          icon: CalendarClock,
          title: "Seit 2013 vor Ort",
          desc: "Wir arbeiten seit über einem Jahrzehnt in derselben Region. Wir wissen aus Erfahrung, wie sich die Saisons verändern und welches Viertel zu welchem Urlaubstyp passt.",
        },
        {
          icon: Handshake,
          title: "Direktes Eigentümernetzwerk",
          desc: "Wir arbeiten ohne Vermittler eins zu eins mit den Eigentümern der gelisteten Wohnungen. Deshalb können wir Zustand, Umgebung und Ausstattung jeder Unterkunft aus erster Hand beschreiben.",
        },
        {
          icon: Compass,
          title: "Ortskenntnis aus erster Hand",
          desc: "Wir kennen Gümbet, Turgutreis, Yalıkavak, Bitez und die Umgebung nicht von der Karte, sondern weil wir dort unterwegs sind. Wir kennen die kleinen Details, etwa die echte Gehdistanz zum Strand.",
        },
      ],
      districtsTitle: "Unsere Regionen",
      districtsLead:
        "Wir verfolgen die familienfreundlichsten Teile der Halbinsel Bodrum aufmerksam:",
      districts: [
        "Gümbet",
        "Turgutreis",
        "Yalıkavak",
        "Bitez",
        "Ortakent",
        "Gündoğan",
      ],
      trustTitle: "Wie wir arbeiten",
      trust: [
        "Wir stützen unsere Inhalte auf unsere eigene Erfahrung vor Ort und auf das Wissen unseres Eigentümernetzwerks.",
        "Wir schreiben nichts als sicher, was wir nicht wissen oder bei dem wir uns nicht sicher sind.",
        "Vom Check-in bis zum Check-out sind wir rund um die Uhr erreichbar, wenn Sie uns brauchen.",
        "Wir stehen den Gästen während des gesamten Aufenthalts zur Seite, auch beim Flughafen-Privattransfer.",
      ],
      contactTitle: "Das Team erreichen",
      contactLead:
        "Eine Frage? Der schnellste Weg ist WhatsApp — Sie sprechen direkt mit unserem Team.",
      whatsappCta: "Per WhatsApp schreiben",
      ctaApart: "Wohnungen ansehen",
      ctaAbout: "Über uns",
      breadcrumbHome: "Startseite",
      breadcrumbAuthor: "Redaktionsteam",
    },
    ru: {
      h1: "Редакционная команда Bodrumapartkiralama",
      role: "Местная команда · в Бодруме с 2013 года",
      subtitle:
        "Команда, которая управляет арендой апартаментов на полуострове Бодрум и готовит наши гиды и статьи блога.",
      intro:
        "Мы — редакционная команда Bodrumapartkiralama, управляющая жильём на полуострове Бодрум с 2013 года. Гиды по районам, статьи блога и советы для отдыха на этом сайте подготовлены нами. Мы не один конкретный человек, а небольшая команда, которая лично осматривает объекты и напрямую общается с гостями. Всё, что мы публикуем, основано либо на нашем собственном опыте, либо на знаниях владельцев и гостей, с которыми мы познакомились за эти годы.",
      expertiseTitle: "Почему нам можно доверять",
      expertiseLead:
        "Наши знания не из-за стола — они получены на месте, в самом Бодруме.",
      pillars: [
        {
          icon: CalendarClock,
          title: "На месте с 2013 года",
          desc: "Мы работаем в одном и том же районе более десяти лет. По опыту знаем, как меняются сезоны и какой район подходит какому типу отдыхающих.",
        },
        {
          icon: Handshake,
          title: "Прямая сеть владельцев",
          desc: "С владельцами апартаментов, которые мы публикуем, мы работаем напрямую, без посредников. Поэтому можем из первых рук рассказать о состоянии, окружении и особенностях каждого объекта.",
        },
        {
          icon: Compass,
          title: "Знание района из первых рук",
          desc: "Мы знаем Гюмбет, Тургутрейс, Ялыкавак, Битез и окрестности не по карте, а потому что бываем там. Мы знаем мелкие детали — например, реальное расстояние пешком до пляжа.",
        },
      ],
      districtsTitle: "Районы, которые мы охватываем",
      districtsLead:
        "Мы внимательно следим за самыми удобными для семей районами полуострова Бодрум:",
      districts: [
        "Гюмбет",
        "Тургутрейс",
        "Ялыкавак",
        "Битез",
        "Ортакент",
        "Гюндоган",
      ],
      trustTitle: "Как мы работаем",
      trust: [
        "Мы основываем материалы на собственном опыте на месте и на знаниях нашей сети владельцев.",
        "Мы не пишем как о точном о том, чего не знаем или в чём не уверены.",
        "От заезда до выезда мы остаёмся на связи 24/7, когда мы вам нужны.",
        "Мы остаёмся рядом с гостем на всех этапах, включая индивидуальный трансфер из аэропорта.",
      ],
      contactTitle: "Связаться с командой",
      contactLead:
        "Есть вопрос? Самый быстрый канал — WhatsApp: вы говорите напрямую с нашей командой.",
      whatsappCta: "Написать в WhatsApp",
      ctaApart: "Посмотреть апартаменты",
      ctaAbout: "О нас",
      breadcrumbHome: "Главная",
      breadcrumbAuthor: "Редакционная команда",
    },
  };
  const copy = copyByLocale[pick] ?? copyByLocale.en;

  const profileUrl = buildLocaleUrl(locale, "/yazar/editor");
  const aboutUrl = buildLocaleUrl(locale, "/hakkimizda");

  // JSON-LD: ProfilePage whose mainEntity is the editorial team modelled as an
  // Organization (collective identity — intentionally NOT a named individual),
  // anchored to the publishing Organization via the shared @id.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: profileUrl,
    name: copy.h1,
    description: copy.subtitle,
    mainEntity: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#editorial-team`,
      name: "Bodrumapartkiralama Editör Ekibi",
      alternateName: "Bodrumapartkiralama Editorial Team",
      url: profileUrl,
      foundingDate: "2013",
      areaServed: "Bodrum, Muğla, TR",
      knowsAbout: [
        "Bodrum apart kiralama",
        "Gümbet",
        "Turgutreis",
        "Yalıkavak",
        "Bitez",
        "Ortakent",
        "Gündoğan",
      ],
      parentOrganization: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Bodrumapartkiralama.com",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo_kare.svg` },
      },
      mainEntityOfPage: aboutUrl,
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero
        title={copy.h1}
        subtitle={copy.subtitle}
        badge={c("brand")}
        image="https://images.unsplash.com/photo-1684858504602-677ac40eadfd?auto=format&fit=crop&w=2000&q=80"
        crumbs={[
          { href: "/", label: copy.breadcrumbHome },
          { label: copy.breadcrumbAuthor },
        ]}
      />

      {/* Intro / identity */}
      <section className="section">
        <div className="container-page max-w-3xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-900">
              <Users className="h-7 w-7" />
            </span>
            <div>
              <p className="text-sm font-medium text-navy-600">{copy.role}</p>
              <p className="mt-3 text-base leading-relaxed text-ink/90 md:text-lg">
                {copy.intro}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise pillars */}
      <section className="section section-soft">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance">{copy.expertiseTitle}</h2>
            <p className="mt-3 text-muted">{copy.expertiseLead}</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {copy.pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="card flex flex-col gap-3 p-6">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-navy-50 text-navy-900">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-ink/85">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Districts covered */}
      <section className="section">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl">{copy.districtsTitle}</h2>
          <p className="mt-3 text-muted">{copy.districtsLead}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {copy.districts.map((d) => (
              <li
                key={d}
                className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1.5 text-sm font-medium text-navy-900"
              >
                <MapPin className="h-3.5 w-3.5" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How we work / trust */}
      <section className="section section-soft">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl">{copy.trustTitle}</h2>
          <ul className="mt-6 space-y-3">
            {copy.trust.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-navy-600" />
                <span className="text-sm leading-relaxed text-ink/90">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact / CTAs */}
      <section className="section section-blue">
        <div className="container-page max-w-3xl text-center">
          <h2>{copy.contactTitle}</h2>
          <p className="mt-3 text-muted">{copy.contactLead}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${c("whatsappNumber")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle className="h-4 w-4" />
              {copy.whatsappCta}
            </a>
            <Link href="/apartlar" className="btn-secondary">
              <MapPin className="h-4 w-4" />
              {copy.ctaApart}
            </Link>
            <Link href="/hakkimizda" className="btn-secondary">
              {copy.ctaAbout}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
