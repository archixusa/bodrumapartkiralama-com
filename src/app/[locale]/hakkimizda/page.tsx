import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  MapPin,
  ShieldCheck,
  Compass,
  Repeat,
  MessageCircle,
  Phone,
  Mail,
  CalendarClock,
  Handshake,
  Clock,
  Car,
  CheckCircle2,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/routing";
import { getSiteContent } from "@/lib/content";
import { buildAlternates, defaultOgImages } from "@/lib/seo";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.bodrumapartkiralama.com";

// ── DB-backed hero copy (section_key "hakkimizda.hero") ──────────────────────
// Falls back to the in-code default below when no published row exists, so the
// page renders byte-identical to today for normal visitors.
type HakkimizdaHeroCopy = { title: string; sub: string };
type ByLocale<T> = Record<"tr" | "en" | "de" | "ru", T>;

const HAKKIMIZDA_HERO_DEFAULT: ByLocale<HakkimizdaHeroCopy> = {
  tr: {
    title: "Hakkımızda",
    sub: "Bodrum'da apart kiralama için küçük ölçekli, yerel bir platform.",
  },
  en: {
    title: "About Us",
    sub: "A small-scale local platform for apartment rental in Bodrum.",
  },
  de: {
    title: "Über uns",
    sub: "Eine kleine, lokale Plattform für die Vermietung von Ferienwohnungen in Bodrum.",
  },
  ru: {
    title: "О нас",
    sub: "Небольшая местная платформа для аренды апартаментов в Бодруме.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  type L = "tr" | "en" | "de" | "ru";
  const pick = locale as L;
  const tx = <T,>(o: Record<L, T>): T => o[pick] ?? o.en;
  const url =
    locale === "tr"
      ? `${SITE_URL}/hakkimizda`
      : `${SITE_URL}/${locale}/hakkimizda`;
  const title = tx({
    tr: "Hakkımızda — Bodrum Apart Kiralama",
    en: "About — Bodrum Apartment Rental",
    de: "Über uns — Ferienwohnungen in Bodrum",
    ru: "О нас — Аренда апартаментов в Бодруме",
  });
  const description = tx({
    tr: "Bodrumapartkiralama, Bodrum yarımadasında apart kiralama hizmeti veren bir konaklama yönetim platformudur. Mülk sahipleri ile misafirleri doğrudan buluşturuyoruz.",
    en: "Bodrumapartkiralama is a property management platform offering apartment rental on the Bodrum peninsula. We bring property owners and guests directly together.",
    de: "Bodrumapartkiralama ist eine Plattform für Unterkunftsverwaltung, die Ferienwohnungen auf der Halbinsel Bodrum anbietet. Wir bringen Eigentümer und Gäste direkt zusammen.",
    ru: "Bodrumapartkiralama — это платформа управления жильём, предлагающая аренду апартаментов на полуострове Бодрум. Мы напрямую соединяем владельцев жилья и гостей.",
  });
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/hakkimizda"),
    openGraph: { title, description, url, type: "website", ...defaultOgImages(locale).openGraph },
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
  const nav = await getTranslations({ locale, namespace: "nav" });

  type L = "tr" | "en" | "de" | "ru";
  const pick = locale as L;

  const copyByLocale = {
    tr: {
      h1: "Hakkımızda",
      subtitle: "Bodrum'da apart kiralama için küçük ölçekli, yerel bir platform.",
      intro:
        "2013'ten bu yana Bodrum yarımadasında apart kiralama hizmeti veren bir konaklama yönetim platformuyuz. Mülk sahipleri ile misafirleri doğrudan buluşturuyor, aracısız ve şeffaf bir hizmet modeli sunuyoruz.",
      approachTitle: "Yaklaşımımız",
      approachLead: "İşletmemizi üç temel ilke üzerine kuruyoruz:",
      principles: [
        {
          icon: ShieldCheck,
          title: "Şeffaflık",
          desc: "Oranı ve koşulları her mülke özel belirleyip önceden paylaşırız; mülk sahipleriyle iletişimimiz doğrudan, misafirlerimizle iletişimimiz açıktır.",
        },
        {
          icon: Compass,
          title: "Yerel Bilgi",
          desc: "Bodrum'un farklı bölgelerinde çalışıyor, her bir mülkün konumunu, çevresini ve özelliklerini ilk elden biliyoruz.",
        },
        {
          icon: Repeat,
          title: "Süreklilik",
          desc: "Bizim için bu sadece bir rezervasyon değil; tatilinizin rahat geçmesi. Check-in'den check-out'a, ihtiyaç anlarında yanınızdayız.",
        },
      ],
      founderTitle: "2013'ten Beri Bodrum'da",
      founderRole: "Yerel ekip, sürdürülebilir ortaklık",
      founderDesc:
        "Faaliyetlerimize 2013 yılında başladık. Bodrum yarımadasında konaklama yönetimi alanında çalışmakta, mülk sahipleriyle bireysel ilişki kurmayı, misafirlerle doğrudan iletişim kurmayı önceliklendiriyoruz.",
      storyTitle: "Kuruluş hikâyemiz",
      story: [
        "Her şey 2013'te küçük bir fikirle başladı: Bodrum'a gelen ailelerin, fotoğrafıyla gerçeği aynı olan, güvenebilecekleri bir aparta aracısız ulaşması. O yıllarda yarımadada konaklama çoğunlukla zincirleme komisyoncularla ilerliyordu; misafir kiminle konuştuğunu, evin gerçekte nasıl olduğunu çoğu zaman bilemiyordu.",
        "Biz bu zinciri kısalttık. Tek tek mülk sahipleriyle tanıştık, evleri yerinde gezdik, sadece kendimizin de gönül rahatlığıyla kalacağı apartları listelemeye başladık. On yılı aşkın sürede aynı bölgede, aynı ilkelerle çalışmaya devam ediyoruz; bugün geri dönen misafirleri ve uzun yıllardır birlikte çalıştığımız ev sahiplerini bir aile gibi görüyoruz.",
      ],
      whyTitle: "Neden doğrudan, neden aracısız?",
      whyLead:
        "Misafirle mülk sahibi arasında ne kadar az halka olursa, tatil o kadar güvenli ve net olur.",
      whyItems: [
        {
          icon: Handshake,
          title: "Doğrudan mülk sahibi ağı",
          desc: "Listelediğimiz her apartın sahibini bizzat tanıyoruz. Aradaki komisyon zincirini kaldırınca hem fotoğrafla gerçek birebir oluyor hem de bir sorun olduğunda doğru kişiye saniyeler içinde ulaşıyoruz.",
        },
        {
          icon: Compass,
          title: "Yerinde yerel uzmanlık",
          desc: "Gümbet, Turgutreis, Yalıkavak, Bitez, Ortakent ve Gündoğan'ı harita üzerinden değil, içinde yaşayarak biliyoruz. Hangi mahalle hangi aileye uyar, plaja kaç dakika yürünür — bunları deneyimden söylüyoruz.",
        },
        {
          icon: Clock,
          title: "7/24 yanınızdayız",
          desc: "Tatil hep mesai saatlerinde geçmiyor. Check-in'den check-out'a, gece yarısı bile bir ihtiyaç çıktığında WhatsApp'tan bize ulaşabilir, gerçek bir insanla konuşabilirsiniz.",
        },
        {
          icon: Car,
          title: "Özel Transfer ve uçtan uca destek",
          desc: "Milas-Bodrum Havalimanı'ndan apartınızın kapısına Özel Transfer, market, araç ve gezi önerilerine kadar tatilin tüm halkalarında yanınızda oluyoruz. İlk telefonun yarımadaya ayak basmadan önce çalmasını istemiyoruz.",
        },
      ],
      trustTitle: "Güven unsurları",
      trust: [
        "2013'ten beri kesintisiz, aynı bölgede faaliyet.",
        "Doğrudan mülk sahipleriyle birebir, aracısız çalışma.",
        "Sadece yerinde gördüğümüz, kendimizin de kalacağı apartlar.",
        "7/24 WhatsApp, telefon ve e-posta ile gerçek bir ekibe erişim.",
        "Havalimanı Özel Transfer dahil uçtan uca konaklama desteği.",
      ],
      editorialLink: "İçeriklerimizi hazırlayan Editör Ekibi'ni tanıyın",
      contactTitle: "İletişim",
      contactLead:
        "Sorularınız için en hızlı kanal WhatsApp; telefon ve e-posta da açıktır.",
      whatsappCta: "WhatsApp",
      callCta: "Telefon",
      emailCta: "E-posta",
      ctaApart: "Apartları gör",
      ctaSss: "Sıkça sorulanlar",
      breadcrumbHome: "Ana Sayfa",
    },
    en: {
      h1: "About Us",
      subtitle: "A small-scale local platform for apartment rental in Bodrum.",
      intro:
        "Since 2013, we have been a property management platform offering apartment rental on the Bodrum peninsula. We bring owners and guests directly together with a no-middleman, transparent service model.",
      approachTitle: "Our Approach",
      approachLead: "We build the business on three core principles:",
      principles: [
        {
          icon: ShieldCheck,
          title: "Transparency",
          desc: "We set the rate and terms individually for each property and share them upfront; owner contact is direct, and guest communication is open.",
        },
        {
          icon: Compass,
          title: "Local Knowledge",
          desc: "We work across Bodrum's neighbourhoods and know each property's location, surroundings and characteristics first-hand.",
        },
        {
          icon: Repeat,
          title: "Continuity",
          desc: "Not just a booking transaction but a stay experience: from check-in to check-out, we stay reachable when you need us.",
        },
      ],
      founderTitle: "Active in Bodrum since 2013",
      founderRole: "Local team, lasting partnership",
      founderDesc:
        "We have been operating in property management on the Bodrum peninsula since 2013, with a strong preference for personal relationships with owners and direct contact with guests.",
      storyTitle: "Our founding story",
      story: [
        "It all started in 2013 with a simple idea: that families coming to Bodrum should be able to reach an apartment they can trust — one where the photos match reality — without any middleman. Back then, accommodation on the peninsula mostly ran through chains of brokers; guests rarely knew who they were really talking to or what a property was actually like.",
        "We shortened that chain. We met the owners one by one, walked through the homes in person, and listed only the apartments we'd happily stay in ourselves. More than a decade later we still work the same region with the same principles — today we treat returning guests and the owners we've worked with for years like family.",
      ],
      whyTitle: "Why direct, why no middleman?",
      whyLead:
        "The fewer links between guest and owner, the safer and clearer the stay.",
      whyItems: [
        {
          icon: Handshake,
          title: "Direct owner network",
          desc: "We personally know the owner of every apartment we list. Removing the broker chain means the photos match reality, and when something comes up we reach the right person in seconds.",
        },
        {
          icon: Compass,
          title: "First-hand local expertise",
          desc: "We know Gümbet, Turgutreis, Yalıkavak, Bitez, Ortakent and Gündoğan from living it, not from a map. Which neighbourhood suits which family, how many minutes' walk to the beach — we tell you from experience.",
        },
        {
          icon: Clock,
          title: "Here for you 24/7",
          desc: "Holidays don't keep office hours. From check-in to check-out, even at midnight, you can reach us on WhatsApp and talk to a real person.",
        },
        {
          icon: Car,
          title: "Private Transfer and end-to-end support",
          desc: "From Private Transfer between Milas-Bodrum Airport and your apartment door, to tips on groceries, cars and outings — we're with you through every link of the trip. We'd rather the first call happen before you even land.",
        },
      ],
      trustTitle: "Why you can trust us",
      trust: [
        "Continuous operation in the same region since 2013.",
        "One-to-one work with owners directly, with no middleman.",
        "Only apartments we've seen in person and would stay in ourselves.",
        "A real team reachable 24/7 via WhatsApp, phone and email.",
        "End-to-end stay support, including Airport Private Transfer.",
      ],
      editorialLink: "Meet the Editorial Team behind our content",
      contactTitle: "Contact",
      contactLead:
        "WhatsApp is the fastest channel; phone and email are also open.",
      whatsappCta: "WhatsApp",
      callCta: "Phone",
      emailCta: "Email",
      ctaApart: "View apartments",
      ctaSss: "FAQ",
      breadcrumbHome: "Home",
    },
    de: {
      h1: "Über uns",
      subtitle:
        "Eine kleine, lokale Plattform für die Vermietung von Ferienwohnungen in Bodrum.",
      intro:
        "Seit 2013 sind wir eine Plattform für Unterkunftsverwaltung, die Ferienwohnungen auf der Halbinsel Bodrum anbietet. Wir bringen Eigentümer und Gäste direkt zusammen — mit einem transparenten Servicemodell ganz ohne Vermittler.",
      approachTitle: "Unser Ansatz",
      approachLead: "Wir gründen unser Unternehmen auf drei Grundprinzipien:",
      principles: [
        {
          icon: ShieldCheck,
          title: "Transparenz",
          desc: "Satz und Konditionen legen wir für jede Immobilie individuell fest und teilen sie vorab mit; der Kontakt zu den Eigentümern ist direkt und die Kommunikation mit unseren Gästen ist offen.",
        },
        {
          icon: Compass,
          title: "Lokales Wissen",
          desc: "Wir sind in den verschiedenen Vierteln von Bodrum tätig und kennen die Lage, Umgebung und Besonderheiten jeder Unterkunft aus erster Hand.",
        },
        {
          icon: Repeat,
          title: "Kontinuität",
          desc: "Für uns ist das nicht nur eine Buchung, sondern ein angenehmer Urlaub für Sie. Vom Check-in bis zum Check-out sind wir bei Bedarf für Sie da.",
        },
      ],
      founderTitle: "Seit 2013 in Bodrum",
      founderRole: "Lokales Team, beständige Partnerschaft",
      founderDesc:
        "Wir haben unsere Tätigkeit 2013 aufgenommen. Wir sind im Bereich der Unterkunftsverwaltung auf der Halbinsel Bodrum tätig und legen Wert auf persönliche Beziehungen zu Eigentümern und direkten Kontakt zu unseren Gästen.",
      storyTitle: "Unsere Gründungsgeschichte",
      story: [
        "Alles begann 2013 mit einer einfachen Idee: Familien, die nach Bodrum kommen, sollten ohne Vermittler eine Ferienwohnung finden, der sie vertrauen können — eine, bei der die Fotos der Realität entsprechen. Damals lief die Vermietung auf der Halbinsel meist über Ketten von Maklern; Gäste wussten selten, mit wem sie wirklich sprachen oder wie eine Unterkunft tatsächlich aussah.",
        "Wir haben diese Kette verkürzt. Wir haben die Eigentümer einzeln kennengelernt, die Wohnungen persönlich besichtigt und nur die Apartments gelistet, in denen wir selbst gern wohnen würden. Mehr als ein Jahrzehnt später arbeiten wir in derselben Region nach denselben Grundsätzen — wiederkehrende Gäste und Eigentümer, mit denen wir seit Jahren zusammenarbeiten, sind für uns wie eine Familie.",
      ],
      whyTitle: "Warum direkt, warum ohne Vermittler?",
      whyLead:
        "Je weniger Glieder zwischen Gast und Eigentümer, desto sicherer und klarer der Aufenthalt.",
      whyItems: [
        {
          icon: Handshake,
          title: "Direktes Eigentümernetzwerk",
          desc: "Wir kennen den Eigentümer jeder gelisteten Wohnung persönlich. Ohne Maklerkette stimmen die Fotos mit der Realität überein, und bei Fragen erreichen wir in Sekunden die richtige Person.",
        },
        {
          icon: Compass,
          title: "Lokale Kompetenz aus erster Hand",
          desc: "Wir kennen Gümbet, Turgutreis, Yalıkavak, Bitez, Ortakent und Gündoğan, weil wir dort leben, nicht von der Karte. Welches Viertel zu welcher Familie passt, wie viele Gehminuten bis zum Strand — das sagen wir aus Erfahrung.",
        },
        {
          icon: Clock,
          title: "Rund um die Uhr für Sie da",
          desc: "Urlaub hält sich nicht an Bürozeiten. Vom Check-in bis zum Check-out, auch um Mitternacht, erreichen Sie uns über WhatsApp und sprechen mit einem echten Menschen.",
        },
        {
          icon: Car,
          title: "Privattransfer und Rundum-Unterstützung",
          desc: "Vom Privattransfer zwischen dem Flughafen Milas-Bodrum und Ihrer Wohnungstür bis zu Tipps für Einkauf, Mietwagen und Ausflüge — wir begleiten Sie bei jedem Schritt. Der erste Anruf darf gern erfolgen, bevor Sie überhaupt landen.",
        },
      ],
      trustTitle: "Warum Sie uns vertrauen können",
      trust: [
        "Durchgehende Tätigkeit in derselben Region seit 2013.",
        "Direkte Eins-zu-eins-Zusammenarbeit mit Eigentümern, ohne Vermittler.",
        "Nur Wohnungen, die wir persönlich gesehen haben und in denen wir selbst wohnen würden.",
        "Ein echtes Team, rund um die Uhr per WhatsApp, Telefon und E-Mail erreichbar.",
        "Rundum-Unterstützung beim Aufenthalt, inklusive Flughafen-Privattransfer.",
      ],
      editorialLink: "Lernen Sie das Redaktionsteam hinter unseren Inhalten kennen",
      contactTitle: "Kontakt",
      contactLead:
        "Der schnellste Weg für Ihre Fragen ist WhatsApp; Telefon und E-Mail stehen ebenfalls offen.",
      whatsappCta: "WhatsApp",
      callCta: "Telefon",
      emailCta: "E-Mail",
      ctaApart: "Wohnungen ansehen",
      ctaSss: "Häufige Fragen",
      breadcrumbHome: "Startseite",
    },
    ru: {
      h1: "О нас",
      subtitle:
        "Небольшая местная платформа для аренды апартаментов в Бодруме.",
      intro:
        "С 2013 года мы являемся платформой управления жильём, предлагающей аренду апартаментов на полуострове Бодрум. Мы напрямую соединяем владельцев и гостей, предлагая прозрачную модель обслуживания без посредников.",
      approachTitle: "Наш подход",
      approachLead: "Мы строим работу на трёх основных принципах:",
      principles: [
        {
          icon: ShieldCheck,
          title: "Прозрачность",
          desc: "Ставку и условия мы определяем индивидуально для каждого объекта и сообщаем их заранее; связь с владельцами прямая, а общение с гостями открытое.",
        },
        {
          icon: Compass,
          title: "Местные знания",
          desc: "Мы работаем в разных районах Бодрума и из первых рук знаем расположение, окружение и особенности каждого объекта.",
        },
        {
          icon: Repeat,
          title: "Постоянство",
          desc: "Для нас это не просто бронирование, а комфортный отдых для вас. От заезда до выезда мы остаёмся на связи, когда вам это нужно.",
        },
      ],
      founderTitle: "В Бодруме с 2013 года",
      founderRole: "Местная команда, надёжное партнёрство",
      founderDesc:
        "Мы начали свою деятельность в 2013 году. Мы работаем в сфере управления жильём на полуострове Бодрум и отдаём предпочтение личным отношениям с владельцами и прямому общению с гостями.",
      storyTitle: "История нашего основания",
      story: [
        "Всё началось в 2013 году с простой идеи: семьи, приезжающие в Бодрум, должны без посредников находить апартаменты, которым можно доверять, — такие, где фотографии совпадают с реальностью. Тогда аренда жилья на полуострове в основном шла через цепочки посредников; гости редко знали, с кем на самом деле говорят и каков объект в действительности.",
        "Мы сократили эту цепочку. Мы знакомились с владельцами по одному, лично осматривали жильё и публиковали только те апартаменты, в которых остановились бы сами. Спустя более десяти лет мы работаем в том же районе по тем же принципам — возвращающихся гостей и владельцев, с которыми сотрудничаем годами, мы считаем своей семьёй.",
      ],
      whyTitle: "Почему напрямую, почему без посредников?",
      whyLead:
        "Чем меньше звеньев между гостем и владельцем, тем безопаснее и понятнее отдых.",
      whyItems: [
        {
          icon: Handshake,
          title: "Прямая сеть владельцев",
          desc: "Мы лично знаем владельца каждого публикуемого объекта. Без цепочки посредников фотографии совпадают с реальностью, а при любом вопросе мы за секунды связываемся с нужным человеком.",
        },
        {
          icon: Compass,
          title: "Местная экспертиза из первых рук",
          desc: "Мы знаем Гюмбет, Тургутрейс, Ялыкавак, Битез, Ортакент и Гюндоган не по карте, а потому что живём здесь. Какой район подходит какой семье, сколько минут пешком до пляжа — говорим по опыту.",
        },
        {
          icon: Clock,
          title: "Рядом с вами 24/7",
          desc: "Отдых не подчиняется рабочему графику. От заезда до выезда, даже посреди ночи, вы можете написать нам в WhatsApp и поговорить с живым человеком.",
        },
        {
          icon: Car,
          title: "Индивидуальный трансфер и поддержка от и до",
          desc: "От индивидуального трансфера между аэропортом Milas-Bodrum и дверью ваших апартаментов до советов о магазинах, аренде авто и поездках — мы рядом на каждом этапе. Пусть первый звонок прозвучит ещё до того, как вы приземлитесь.",
        },
      ],
      trustTitle: "Почему нам можно доверять",
      trust: [
        "Непрерывная работа в одном и том же районе с 2013 года.",
        "Прямое сотрудничество с владельцами один на один, без посредников.",
        "Только жильё, которое мы видели лично и в котором остановились бы сами.",
        "Реальная команда, доступная 24/7 в WhatsApp, по телефону и e-mail.",
        "Поддержка проживания от и до, включая индивидуальный трансфер из аэропорта.",
      ],
      editorialLink: "Познакомьтесь с редакционной командой, готовящей наш контент",
      contactTitle: "Контакты",
      contactLead:
        "Самый быстрый канал для ваших вопросов — WhatsApp; телефон и e-mail также открыты.",
      whatsappCta: "WhatsApp",
      callCta: "Телефон",
      emailCta: "E-mail",
      ctaApart: "Посмотреть апартаменты",
      ctaSss: "Частые вопросы",
      breadcrumbHome: "Главная",
    },
  };
  const copy = copyByLocale[pick] ?? copyByLocale.en;

  // ── HERO (DB-backed; falls back to in-code default when no published row) ──
  const hero =
    (await getSiteContent<ByLocale<HakkimizdaHeroCopy>>("hakkimizda.hero")) ??
    HAKKIMIZDA_HERO_DEFAULT;
  const heroCopy = hero[pick] ?? hero.en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: heroCopy.title,
    description: copy.intro,
    url:
      locale === "tr"
        ? `${SITE_URL}/hakkimizda`
        : `${SITE_URL}/${locale}/hakkimizda`,
    mainEntity: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Bodrumapartkiralama.com",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/apart-logo-512.png` },
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
      sameAs: [
        "https://www.facebook.com/BodrumApartKiralama",
        "https://www.instagram.com/bodrumapartkiralama",
      ],
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero
        title={heroCopy.title}
        subtitle={heroCopy.sub}
        badge={c("brand")}
        image="https://images.unsplash.com/photo-1684858504602-677ac40eadfd?auto=format&fit=crop&w=2000&q=80"
        crumbs={[
          { href: "/", label: copy.breadcrumbHome },
          { label: nav("about") },
        ]}
      />

      <section className="section">
        <div className="container-page max-w-3xl">
          <p className="text-base leading-relaxed text-ink/90 md:text-lg">
            {copy.intro}
          </p>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance">{copy.approachTitle}</h2>
            <p className="mt-3 text-muted">{copy.approachLead}</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {copy.principles.map((p) => {
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

      <section className="section">
        <div className="container-page max-w-3xl">
          <div className="card flex flex-col gap-4 p-6 md:flex-row md:items-start md:p-8">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-900">
              <CalendarClock className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-2xl">{copy.founderTitle}</h2>
              <p className="mt-1 text-sm font-medium text-navy-600">
                {copy.founderRole}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink/90">
                {copy.founderDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founding story — E-E-A-T: real origin + 2013 history */}
      <section className="section section-soft">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl">{copy.storyTitle}</h2>
          <div className="mt-5 space-y-4">
            {copy.story.map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-ink/90">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Why direct / no-middleman, local expertise, 24/7, Özel Transfer */}
      <section className="section">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance">{copy.whyTitle}</h2>
            <p className="mt-3 text-muted">{copy.whyLead}</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {copy.whyItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card flex gap-4 p-6">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-navy-50 text-navy-900">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/85">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust elements + link to editorial team */}
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
          <Link
            href="/yazar/editor"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-600 underline-offset-2 hover:underline"
          >
            <Users className="h-4 w-4" />
            {copy.editorialLink}
          </Link>
        </div>
      </section>

      <section className="section section-blue">
        <div className="container-page max-w-3xl text-center">
          <h2>{copy.contactTitle}</h2>
          <p className="mt-3 text-muted">{copy.contactLead}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <a
              href={`https://wa.me/${c("whatsappNumber")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card flex flex-col items-center gap-2 p-5"
            >
              <MessageCircle className="h-6 w-6 text-whatsapp-brand" />
              <span className="text-sm font-semibold">{copy.whatsappCta}</span>
              <span className="text-xs text-muted">{c("phoneDisplay")}</span>
            </a>
            <a
              href={`tel:${c("phone").replace(/\s/g, "")}`}
              className="card flex flex-col items-center gap-2 p-5"
            >
              <Phone className="h-6 w-6 text-navy-900" />
              <span className="text-sm font-semibold">{copy.callCta}</span>
              <span className="text-xs text-muted">{c("phoneDisplay")}</span>
            </a>
            <a
              href={`mailto:${c("email")}`}
              className="card flex flex-col items-center gap-2 p-5"
            >
              <Mail className="h-6 w-6 text-navy-900" />
              <span className="text-sm font-semibold">{copy.emailCta}</span>
              <span className="text-xs text-muted">{c("email")}</span>
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/apartlar" className="btn-primary">
              <MapPin className="h-4 w-4" />
              {copy.ctaApart}
            </Link>
            <Link href="/sss" className="btn-secondary">
              {copy.ctaSss}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
