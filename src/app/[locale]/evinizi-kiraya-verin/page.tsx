import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  Shield,
  Users,
  TrendingUp,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { OwnerApplicationForm } from "@/lib/reservation-form";
import { getPhone } from "@/lib/contact";
import { getSiteContent } from "@/lib/content";
import { buildAlternates, buildLocaleUrl, defaultOgImages } from "@/lib/seo";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.bodrumapartkiralama.com";

// ── DB-backed owner hero copy (section_key "owner.hero") ─────────────────────
// Falls back to the in-code default below when no published row exists, so the
// page renders byte-identical to today for normal visitors.
type OwnerHeroCopy = { kicker: string; title: string; intro: string };
type ByLocale<T> = Record<"tr" | "en" | "de" | "ru", T>;

const OWNER_HERO_DEFAULT: ByLocale<OwnerHeroCopy> = {
  tr: {
    kicker: "Mülk Sahipleri İçin",
    title: "Bodrum'daki Mülkünüz İçin Şeffaf Bir Kira Yönetimi",
    intro:
      "Bodrum'un farklı bölgelerinde mülk sahipleriyle çalışıyoruz. Komisyon ve hizmet kapsamı yazılı, iletişim doğrudan, süreç şeffaf. Mülkünüzü birlikte değerlendirelim.",
  },
  en: {
    kicker: "For Property Owners",
    title: "Transparent Rental Management for Your Bodrum Property",
    intro:
      "We work with property owners across the Bodrum peninsula. Commission and service scope in writing, communication direct, the process transparent. Let's assess your property together.",
  },
  de: {
    kicker: "For Property Owners",
    title: "Transparent Rental Management for Your Bodrum Property",
    intro:
      "We work with property owners across the Bodrum peninsula. Commission and service scope in writing, communication direct, the process transparent. Let's assess your property together.",
  },
  ru: {
    kicker: "For Property Owners",
    title: "Transparent Rental Management for Your Bodrum Property",
    intro:
      "We work with property owners across the Bodrum peninsula. Commission and service scope in writing, communication direct, the process transparent. Let's assess your property together.",
  },
};

// Sayfa metadata'sı 4 dilde (spec v3 SEO: benzersiz title+description —
// eskiden tüm locale'lerde sabit Türkçeydi).
const OWNER_META: ByLocale<{ title: string; desc: string; ogDesc: string }> = {
  tr: {
    title: "Evinizi Kiraya Verin — Bodrum Apart Yönetimi",
    desc: "Bodrum'daki mülkünüz için yönetim, pazarlama ve misafir iletişimini birlikte planlayalım. Şeffaf çalışma yapısı, doğrudan mülk sahibi iletişimi.",
    ogDesc: "Mülk sahipleri için kira yönetimi ve yazılı, şeffaf koşullar.",
  },
  en: {
    title: "List Your Property — Bodrum Apartment Management",
    desc: "Plan management, marketing and guest communication for your Bodrum property with us. Written terms, direct owner communication.",
    ogDesc: "Rental management for owners with written, transparent terms.",
  },
  de: {
    title: "Immobilie vermieten — Apartmentverwaltung in Bodrum",
    desc: "Verwaltung, Vermarktung und Gästekommunikation für Ihre Immobilie in Bodrum. Schriftliche Konditionen, direkter Kontakt zum Eigentümer.",
    ogDesc: "Mietverwaltung für Eigentümer mit schriftlichen, transparenten Konditionen.",
  },
  ru: {
    title: "Сдайте свою недвижимость — управление апартаментами в Бодруме",
    desc: "Управление, продвижение и общение с гостями для вашей недвижимости в Бодруме. Письменные условия, прямой контакт с владельцем.",
    ogDesc: "Управление арендой для владельцев: письменные и прозрачные условия.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = OWNER_META[locale as keyof typeof OWNER_META] ?? OWNER_META.en;
  return {
    title: m.title,
    description: m.desc,
    alternates: buildAlternates(locale, "/evinizi-kiraya-verin"),
    openGraph: {
      title: m.title,
      description: m.ogDesc,
      url: buildLocaleUrl(locale, "/evinizi-kiraya-verin"),
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

  // ── HERO (DB-backed; falls back to in-code default when no published row) ──
  const heroData =
    (await getSiteContent<ByLocale<OwnerHeroCopy>>("owner.hero")) ??
    OWNER_HERO_DEFAULT;
  const hero = heroData[locale as "tr" | "en" | "de" | "ru"] ?? heroData.en;

  // ── Gövde içerikleri: tr + en (de/ru İngilizceye düşer) ─────────────────────
  // Hero gibi DB'ye taşınana kadar geçici köprü — eskiden tüm locale'lerde
  // sabit Türkçe gövde gösteriliyordu (İ18N bütünlüğü bulgusu).
  const isTr = locale === "tr";
  const BODY_COPY = {
    tr: {
      applyCta: "Başvuru Yap",
      howCta: "Nasıl çalışıyor?",
      benefitsKicker: "Yaklaşımımız",
      benefitsTitle: "Mülk Sahipleriyle Çalışma Şeklimiz",
      howKicker: "Süreç",
      howTitle: "Nasıl Çalışıyor?",
      howNote:
        "Mülkün durumuna göre değişmekle birlikte, sözleşme sonrası yayına çıkış genellikle birkaç iş günü içinde tamamlanır.",
      transKicker: "Size Özel Koşullar",
      transTitle: "Mülkünüze Göre, Yazılı",
      transP1:
        "Oranı ve koşulları her mülke özel belirliyoruz; standart bir tarifeyi peşinen ilan etmiyoruz. Hizmet kapsamı ve hesap kesim sıklığı yazılı olarak paylaşılır. Pazarlama, fotoğraf çekimi ve listeleme gibi kalemlerden hangileri sözleşme kapsamında, hangileri opsiyonel — hepsi önceden konuşulur.",
      transP2:
        "Yalnızca gerçekleşmiş rezervasyonlardan komisyon tahakkuk eder. Mülkünüze özel oranı, değerlendirme sonrası görüşmemizde paylaşıyoruz.",
      transCardTitle: "Örnek tabloyu birlikte hazırlayalım",
      transCardBody:
        "Mülkün bölge ve tipine göre fiyat aralığı, hedef misafir profili ve sezonluk doluluk tahmini önemli ölçüde değişebiliyor. Görüşme sırasında size özel bir tahmini gelir tablosu hazırlıyor ve sözleşmeyle birlikte paylaşıyoruz.",
      transList: [
        "Yüksek/düşük sezon fiyat aralığı önerisi",
        "Komisyon ve hizmet kalemlerinin yazılı dökümü",
        "Aylık hesap kesim takvimi",
      ],
      faqKicker: "FAQ",
      faqTitle: "Sıkça Sorulanlar",
      applyKicker: "Başvuru",
      applyTitlePre: "Başlamak için ",
      applyTitleEm: "birkaç dakika",
      applyTitlePost: " yeterli",
      applyBody:
        "Form yaklaşık 3 dakika sürer. Paylaştığınız bilgiler yalnızca başvurunuzu değerlendirmek için kullanılır. Ekibimiz uygun gördüğümüz takdirde size dönüş yapar.",
      applyList: [
        "Mülkünüzü görmek için randevu",
        "Yazılı komisyon anlaşması",
        "Profesyonel fotoğraf çekimi",
        "Yayın öncesi son onay sizde",
      ],
      applyReferral: "Referansla gelen mülk sahipleri için özel koşullar",
      benefits: [
        {
          title: "Düzenli iletişim",
          desc: "Mülk sahibiyle takvim, rezervasyon ve ödeme akışını periyodik olarak paylaşıyoruz. Süreçle ilgili her aşamayı önceden konuşuyoruz.",
        },
        {
          title: "Misafir karşılama ve temizlik",
          desc: "Check-in, check-out, temizlik ve günlük misafir iletişimi anlaşmalı ekibimizle yürür. Standart bir karşılama protokolümüz vardır.",
        },
        {
          title: "Size özel oran",
          desc: "Oranı ve koşulları mülkünüze özel belirliyor, değerlendirme sonrası yazılı olarak sizinle paylaşıyoruz. Yalnızca gerçekleşen rezervasyonlardan komisyon tahakkuk eder; boş günler için ek ücret talep etmiyoruz.",
        },
      ],
      howItWorks: [
        {
          step: "01",
          title: "Form doldurun",
          desc: "Mülkünüzü kısaca tanıtın. Yaklaşık 5 dakika sürer.",
        },
        {
          step: "02",
          title: "İlk görüşme",
          desc: "Başvurunuzu değerlendiririz; uygun olduğunda WhatsApp veya telefondan dönüş yaparız.",
        },
        {
          step: "03",
          title: "Yerinde inceleme",
          desc: "Mülkünüze gelip değerlendirme yaparız. Birlikte uygun model üzerinde anlaşırız.",
        },
        {
          step: "04",
          title: "Sözleşme ve yayın",
          desc: "Sözleşme imzalanır, fotoğraf çekimi yapılır, mülk listeye eklenir ve rezervasyonlara açılır.",
        },
      ],
      faqs: [
        {
          q: "Komisyon nasıl belirleniyor?",
          a: "Oranı ve koşulları her mülke özel belirliyoruz; standart bir tarifemiz yok. Değerlendirme sonrası size özel oranı sözleşme öncesinde yazılı olarak iletip teyit alıyoruz. Yalnızca gerçekleşmiş rezervasyonlardan komisyon tahakkuk eder; boş kalan günler için ücret talep etmiyoruz.",
        },
        {
          q: "Ödemeler nasıl yapılır?",
          a: "Her ay başında bir önceki ayın hesap kesim raporu hazırlanır; kapora ve kalan ödemeler tahsil edilir, komisyon düşülerek kalan tutar belirlenen iş günü içinde IBAN'ınıza havale edilir.",
        },
        {
          q: "Sözleşme süresi nedir?",
          a: "Standart anlaşma 1 yıllıktır; sezon sonunda taraflar yenileyebilir. İlk dönemde memnuniyetsizlik halinde uygulanacak çıkış koşulları sözleşmede açıkça yer alır.",
        },
        {
          q: "Kendim mülkü kullanabilir miyim?",
          a: "Tabii. Sezon dışında veya rezervasyon olmayan haftalarda mülkünüzü kişisel kullanım için ayırabilirsiniz. Takvimde işaretler ve o tarihler için rezervasyon almayız.",
        },
        {
          q: "Hasar veya kayıp olursa?",
          a: "Misafirlerden alınan depozito ile küçük hasarları karşılarız; daha büyük durumlarda misafire fatura keseriz ve durumu sizinle paylaşırız. Talep ederseniz kira sigortası seçenekleri için de yönlendirme yapabiliriz.",
        },
        {
          q: "Temizlik ve bakım kim halleder?",
          a: "Anlaşmalı temizlik ekibimiz her check-in öncesi mülkü hazırlar; çarşaf-havlu rotasyonu, küçük bakımlar (ampul değişimi, ufak tadilat) günlük operasyon kapsamındadır. Beyaz eşya veya kombi gibi büyük onarımlar için sizinle iletişime geçeriz.",
        },
        {
          q: "Hangi bölgelerde çalışıyorsunuz?",
          a: "Bodrum yarımadasında Gümbet, Turgutreis, Yalıkavak, Bitez, Ortakent, Gündoğan, Torba, Türkbükü, Akyarlar ve Gümüşlük başta olmak üzere farklı bölgelerde mülk sahipleriyle çalışıyoruz. Bölgeye göre uygun misafir profili değişebiliyor.",
        },
        {
          q: "Pazarlamayı nasıl yapıyorsunuz?",
          a: "Mülk, kendi sitemizde listelenir. Talep doğrultusunda Booking ve Airbnb gibi platformlara senkronizasyon ve Google/Instagram reklam kampanyaları planlanabilir. Pazarlama stratejisini mülke göre birlikte belirleriz.",
        },
      ],
    },
    en: {
      applyCta: "Apply Now",
      howCta: "How does it work?",
      benefitsKicker: "Our Approach",
      benefitsTitle: "How We Work with Property Owners",
      howKicker: "Process",
      howTitle: "How Does It Work?",
      howNote:
        "Depending on the property, going live after the contract is usually completed within a few business days.",
      transKicker: "Terms Specific to You",
      transTitle: "Tailored to Your Property, in Writing",
      transP1:
        "We set the rate and terms for each property individually; we don't publish a flat tariff up front. Service scope and statement frequency are shared in writing. Which items — marketing, photo shoot, listing — are covered by the contract and which are optional is all agreed in advance.",
      transP2:
        "Commission accrues only on realised bookings. We share your property's specific rate in our meeting after the assessment.",
      transCardTitle: "Let's prepare a sample table together",
      transCardBody:
        "Price range, target guest profile and seasonal occupancy estimates vary considerably by area and property type. During the meeting we prepare an income estimate specific to your property and share it together with the contract.",
      transList: [
        "High/low season price range suggestion",
        "Written breakdown of commission and service items",
        "Monthly statement schedule",
      ],
      faqKicker: "FAQ",
      faqTitle: "Frequently Asked Questions",
      applyKicker: "Application",
      applyTitlePre: "",
      applyTitleEm: "A few minutes",
      applyTitlePost: " is all it takes to get started",
      applyBody:
        "The form takes about 3 minutes. The details you share are used only to assess your application. Our team gets back to you when there's a good fit.",
      applyList: [
        "An appointment to view your property",
        "Written commission agreement",
        "Professional photo shoot",
        "Final approval stays with you before going live",
      ],
      applyReferral: "Special terms for owners who come via referral",
      benefits: [
        {
          title: "Regular communication",
          desc: "We share the calendar, reservations and payment flow with you on a regular schedule, and talk through every stage of the process in advance.",
        },
        {
          title: "Guest welcome and cleaning",
          desc: "Check-in, check-out, cleaning and day-to-day guest communication are handled by our contracted team, following a standard welcome protocol.",
        },
        {
          title: "A rate specific to you",
          desc: "We set the rate and terms for your property individually and share them with you in writing after the assessment. Commission accrues only on realised bookings; we don't charge for vacant days.",
        },
      ],
      howItWorks: [
        {
          step: "01",
          title: "Fill in the form",
          desc: "Briefly introduce your property. It takes about 5 minutes.",
        },
        {
          step: "02",
          title: "First call",
          desc: "We review your application and get back to you on WhatsApp or by phone when it's a good fit.",
        },
        {
          step: "03",
          title: "On-site visit",
          desc: "We visit and assess your property, and agree on the right model together.",
        },
        {
          step: "04",
          title: "Contract and listing",
          desc: "The contract is signed, photos are taken, and your property is listed and opened to bookings.",
        },
      ],
      faqs: [
        {
          q: "How is the commission set?",
          a: "We set the rate and terms for each property individually; there is no flat tariff. After the assessment we send your specific rate in writing before the contract and confirm it with you. Commission accrues only on realised bookings; vacant days are never charged.",
        },
        {
          q: "How are payments made?",
          a: "At the start of each month we prepare the statement for the previous month; deposits and remaining payments are collected, commission is deducted and the balance is transferred to your IBAN within the agreed business days.",
        },
        {
          q: "How long is the contract?",
          a: "The standard agreement runs for 1 year and can be renewed at the end of the season. Exit terms for the initial period are stated clearly in the contract.",
        },
        {
          q: "Can I use the property myself?",
          a: "Of course. You can reserve your property for personal use off-season or in weeks without bookings. We mark the calendar and take no reservations for those dates.",
        },
        {
          q: "What about damage or loss?",
          a: "Minor damage is covered by the deposit collected from guests; for larger cases we invoice the guest and keep you informed. On request we can also point you to rental insurance options.",
        },
        {
          q: "Who handles cleaning and maintenance?",
          a: "Our contracted cleaning team prepares the property before every check-in; linen and towel rotation and small fixes (bulb changes, minor repairs) are part of daily operations. For major repairs such as appliances or the boiler we contact you first.",
        },
        {
          q: "Which areas do you cover?",
          a: "We work with owners across the Bodrum peninsula — Gümbet, Turgutreis, Yalıkavak, Bitez, Ortakent, Gündoğan, Torba, Türkbükü, Akyarlar and Gümüşlük among others. The right guest profile can vary by area.",
        },
        {
          q: "How do you market the property?",
          a: "Your property is listed on our own site. On request we can plan synchronisation with platforms like Booking and Airbnb, plus Google/Instagram ad campaigns. We shape the marketing strategy together, per property.",
        },
      ],
    },
  } as const;
  const pc = isTr ? BODY_COPY.tr : BODY_COPY.en;
  const BENEFIT_ICONS = [Shield, Users, TrendingUp] as const;
  const benefits = pc.benefits.map((b, i) => ({
    ...b,
    icon: BENEFIT_ICONS[i] ?? Shield,
  }));
  const howItWorks = pc.howItWorks;
  const faqs = pc.faqs;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Bodrum Mülk Kira Yönetimi",
      provider: { "@type": "LodgingBusiness", name: "Bodrumapartkiralama.com" },
      areaServed: "Bodrum, Muğla, TR",
      description:
        "Bodrum yarımadasındaki apart ve daireler için kira yönetimi, misafir iletişimi ve pazarlama.",
      url: `${SITE_URL}/evinizi-kiraya-verin`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 bg-hero-gradient" />
        {/* Dekor radyalleri — v2 paleti: turkuaz tonları (eski #3FB2C2/#FF8A3D
            turuncu kalıntıları spec dışıydı). */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #34C8C4 0%, transparent 50%), radial-gradient(circle at 80% 70%, #0EA5A5 0%, transparent 45%)",
          }}
        />
        <div className="container-page relative py-20 md:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="kicker-light">{hero.kicker}</span>
            <h1 className="mt-6 font-display text-white">{hero.title}</h1>
            <span className="mx-auto mt-6 block h-px w-16 bg-turkuaz-300" />
            <p className="mt-6 text-base text-white/85 md:text-lg">
              {hero.intro}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#basvur" className="btn-primary">
                {pc.applyCta} <ChevronRight className="h-4 w-4" />
              </a>
              <a href="#nasil-calisiyor" className="btn-outline-light">
                {pc.howCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="kicker">{pc.benefitsKicker}</span>
            <h2 className="mt-4">{pc.benefitsTitle}</h2>
            <span className="divider-accent mt-5 block" />
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="card flex flex-col gap-4 p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 text-accent-500">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-xl">{b.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="nasil-calisiyor" className="section section-soft">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="kicker">{pc.howKicker}</span>
            <h2 className="mt-4">{pc.howTitle}</h2>
            <span className="divider-accent mt-5 block" />
            <p className="mt-5 text-muted">{pc.howNote}</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((s) => (
              <div key={s.step} className="card flex flex-col gap-3 p-6">
                <span className="font-display text-4xl font-bold text-accent-500/80">
                  {s.step}
                </span>
                <h3 className="text-lg">{s.title}</h3>
                <p className="text-sm text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARENCY */}
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="kicker">{pc.transKicker}</span>
            <h2 className="mt-4">{pc.transTitle}</h2>
            <p className="mt-5 text-muted">{pc.transP1}</p>
            <p className="mt-3 text-muted">{pc.transP2}</p>
          </div>
          <div className="card p-7">
            <h3 className="text-lg">{pc.transCardTitle}</h3>
            <p className="mt-3 text-sm text-muted">{pc.transCardBody}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {pc.transList.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-soft">
        <div className="container-page max-w-3xl">
          <div className="text-center">
            <span className="kicker">{pc.faqKicker}</span>
            <h2 className="mt-4">{pc.faqTitle}</h2>
            <span className="divider-accent mt-5 block" />
          </div>
          <div className="mt-12 divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-white">
            {faqs.map((f, i) => (
              <details key={i} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
                  <span>{f.q}</span>
                  <ChevronRight className="h-5 w-5 transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM — koyu bant (.section-deep = footer-bg zemin;
          eskiden sınıf tanımsızdı ve beyaz metin krem zeminde görünmezdi). */}
      <section id="basvur" className="section section-deep relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 50%, #34C8C4 0%, transparent 50%)",
          }}
        />
        <div className="container-page relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="kicker-light">{pc.applyKicker}</span>
            <h2 className="mt-4 text-white">
              {pc.applyTitlePre}
              <span className="font-display text-turkuaz-300">{pc.applyTitleEm}</span>
              {pc.applyTitlePost}
            </h2>
            <p className="mt-5 text-white/85">{pc.applyBody}</p>
            <ul className="mt-8 space-y-3 text-sm text-white/85">
              {pc.applyList.map((it) => (
                <li key={it} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-turkuaz-300" />
                  {it}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-turkuaz-300" />
              <p className="text-sm text-white/85">{pc.applyReferral}</p>
            </div>
          </div>
          <OwnerApplicationForm
            siteName="bodrumapartkiralama"
            whatsappNumber={getPhone(locale).wa}
            kvkkUrl="/kvkk"
            tone="family"
          />
        </div>
      </section>
    </>
  );
}
