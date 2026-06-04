import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MessageCircle, Wallet, Phone, Headphones, Sparkles } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { EmptyStateOfferBased } from "@/components/EmptyStateOfferBased";
import { ApartlarFilterBar } from "@/components/ApartlarFilterBar";
import { PropertyCard } from "@/components/PropertyCard";
import { getPublishedProperties } from "@/lib/properties";
import { districts } from "@/data/districts";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

// ISR: re-query the published catalogue at most once a minute.
export const revalidate = 60;

const REGION_SLUGS = [
  "gumbet",
  "turgutreis",
  "yalikavak",
  "bitez",
  "ortakent",
  "gundogan",
  "torba",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const url =
    locale === "tr" ? `${SITE_URL}/apartlar` : `${SITE_URL}/${locale}/apartlar`;
  const title =
    locale === "tr"
      ? "Bodrum Apart Koleksiyonu"
      : locale === "de"
        ? "Bodrum Apartmentkollektion"
        : locale === "ru"
          ? "Коллекция апартаментов в Бодруме"
          : "Bodrum Apartment Collection";
  const description =
    locale === "tr"
      ? "Bodrum'da apart kiralama. Sabit katalog yerine tarihinize göre size özel apart seçenekleri sunuyoruz — doğrudan mülk sahipleriyle, aracısız ve şeffaf."
      : locale === "de"
        ? "Apartments zur Miete in Bodrum. Statt eines festen Katalogs machen wir Ihnen passende Angebote nach Ihren Reisedaten — direkt bei den Eigentümern, transparent."
        : locale === "ru"
          ? "Аренда апартаментов в Бодруме. Вместо фиксированного каталога мы предлагаем варианты под ваши даты — напрямую у владельцев, прозрачно."
          : "Apartment rentals in Bodrum. Instead of a fixed catalogue, we offer options tailored to your dates — directly with the owners, transparent.";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function ApartlarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isTr = locale === "tr";
  const c = await getTranslations({ locale, namespace: "common" });

  const pick = <T,>(o: { tr: T; en: T; de: T; ru: T }): T =>
    o[locale as "tr" | "en" | "de" | "ru"] ?? o.en;

  // Live catalogue. Empty-safe: returns [] on any error (missing table/column,
  // network, env) so the page renders the offer-based empty state.
  const properties = await getPublishedProperties();
  const hasProperties = properties.length > 0;

  const regionOptions = REGION_SLUGS.map((slug) => {
    const d = districts.find((x) => x.slug === slug)!;
    return { value: d.slug, label: d.name };
  });

  const copy = {
    h1: pick({
      tr: "Bodrum Apart Koleksiyonu",
      en: "Bodrum Apartment Collection",
      de: "Bodrum Apartmentkollektion",
      ru: "Коллекция апартаментов в Бодруме",
    }),
    // Count-aware subtitle.
    countLine: hasProperties
      ? pick({
          tr: `${properties.length} apart listeleniyor`,
          en: `${properties.length} apartments listed`,
          de: `${properties.length} Apartments gelistet`,
          ru: `Показано апартаментов: ${properties.length}`,
        })
      : pick({
          tr: "Tarihinizi paylaşın, size özel seçenekler sunalım.",
          en: "Share your dates and we'll offer you tailored options.",
          de: "Teilen Sie uns Ihre Reisedaten mit — wir machen Ihnen passende Angebote.",
          ru: "Назовите ваши даты — мы предложим персональные варианты.",
        }),
    benefitsTitle: pick({
      tr: "Platformumuzun Yaklaşımı",
      en: "How our platform works",
      de: "So funktioniert unsere Plattform",
      ru: "Как работает наша платформа",
    }),
    benefits: [
      {
        icon: Wallet,
        title: pick({
          tr: "Şeffaf çalışma yapısı",
          en: "Transparent way of working",
          de: "Transparente Arbeitsweise",
          ru: "Прозрачный принцип работы",
        }),
        desc: pick({
          tr: "Mülk sahipleri ve misafirlerle iletişim açıktır; ek ücretler önceden paylaşılır.",
          en: "Communication with owners and guests is open; any extra fees are shared up front.",
          de: "Die Kommunikation mit Eigentümern und Gästen ist offen; etwaige Zusatzkosten werden im Voraus mitgeteilt.",
          ru: "Общение с владельцами и гостями открытое; все дополнительные сборы сообщаются заранее.",
        }),
      },
      {
        icon: Phone,
        title: pick({
          tr: "Doğrudan mülk sahibi iletişimi",
          en: "Direct owner contact",
          de: "Direkter Kontakt zum Eigentümer",
          ru: "Прямая связь с владельцем",
        }),
        desc: pick({
          tr: "Misafirin sorusunu doğrudan mülk sahibine ileten kısa bir köprü kuruyoruz.",
          en: "We bridge guest questions directly to the property owner.",
          de: "Wir leiten die Fragen der Gäste direkt an den Eigentümer weiter.",
          ru: "Мы напрямую передаём вопросы гостей владельцу недвижимости.",
        }),
      },
      {
        icon: Headphones,
        title: pick({
          tr: "7/24 misafir desteği",
          en: "24/7 guest support",
          de: "Gästebetreuung rund um die Uhr",
          ru: "Поддержка гостей 24/7",
        }),
        desc: pick({
          tr: "Konaklama süresince WhatsApp ve telefon üzerinden ulaşılabilir bir ekibimiz var.",
          en: "A small team you can reach by WhatsApp and phone throughout the stay.",
          de: "Ein kleines Team, das Sie während Ihres Aufenthalts per WhatsApp und Telefon erreichen können.",
          ru: "Небольшая команда, с которой вы можете связаться по WhatsApp и телефону на протяжении всего пребывания.",
        }),
      },
      {
        icon: Sparkles,
        title: pick({
          tr: "Temizlik ve karşılama",
          en: "Cleaning and welcome",
          de: "Reinigung und Empfang",
          ru: "Уборка и встреча",
        }),
        desc: pick({
          tr: "Mülk sahipleri her konaklama arası temizlik düzenler. Karşılama uygulaması mülk bazında değişkenlik gösterebilir.",
          en: "Owners arrange cleaning between stays. Welcome practices vary by property.",
          de: "Die Eigentümer sorgen zwischen den Aufenthalten für die Reinigung. Die Empfangsgestaltung variiert je nach Immobilie.",
          ru: "Владельцы организуют уборку между заездами. Порядок встречи гостей зависит от объекта.",
        }),
      },
    ],
    newsletterTitle: pick({
      tr: "Yeni mülkler eklendiğinde haberdar olun",
      en: "Get notified when properties are added",
      de: "Werden Sie benachrichtigt, wenn neue Immobilien hinzugefügt werden",
      ru: "Узнавайте о появлении новых объектов",
    }),
    newsletterDesc: pick({
      tr: "Apart listemiz açıldığında ve uygun sezon fırsatları olduğunda e-posta ile bilgilendiririz. İstediğiniz an çıkabilirsiniz.",
      en: "When our apartment list goes live or seasonal offers come up, we'll send a short email. You can unsubscribe any time.",
      de: "Sobald unsere Apartmentliste online geht oder es saisonale Angebote gibt, senden wir Ihnen eine kurze E-Mail. Sie können sich jederzeit abmelden.",
      ru: "Когда наш список апартаментов станет доступен или появятся сезонные предложения, мы отправим короткое письмо. Вы можете отписаться в любое время.",
    }),
    whatsappCta: pick({
      tr: "WhatsApp ile yazın",
      en: "Write on WhatsApp",
      de: "Schreiben Sie uns auf WhatsApp",
      ru: "Напишите нам в WhatsApp",
    }),
    whatsappDesc: pick({
      tr: "Sorularınızı doğrudan yöneticimize iletmek için en hızlı yol.",
      en: "The fastest way to reach our manager directly.",
      de: "Der schnellste Weg, um unseren Manager direkt zu erreichen.",
      ru: "Самый быстрый способ напрямую связаться с нашим менеджером.",
    }),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: pick({ tr: "Ana Sayfa", en: "Home", de: "Startseite", ru: "Главная" }),
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: copy.h1,
        item: `${SITE_URL}/apartlar`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* HEADER (navy) — count-aware */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 opacity-95" />
        <div className="container-page relative py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-white md:text-5xl">{copy.h1}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 md:text-lg">
              {copy.countLine}
            </p>
          </div>
        </div>
      </section>

      {/* CATALOGUE — filter bar + (grid | offer-based empty state) */}
      <section className="section">
        <div className="container-page">
          <ApartlarFilterBar
            locale={locale}
            regions={regionOptions}
            disabled={!hasProperties}
          />

          <div className="mt-10">
            {hasProperties ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((p) => (
                  <PropertyCard key={p.id} property={p} locale={locale} />
                ))}
              </div>
            ) : (
              <EmptyStateOfferBased
                locale={locale}
                whatsappNumber={c("whatsappNumber")}
              />
            )}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance">{copy.benefitsTitle}</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {copy.benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="card flex flex-col gap-3 p-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-navy-50 text-navy-900">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-base">{b.title}</h3>
                  <p className="text-sm text-muted">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="section section-soft">
        <div className="container-page max-w-2xl">
          <div className="card p-6 md:p-8">
            <h2 className="text-balance text-2xl">{copy.newsletterTitle}</h2>
            <p className="mt-2 text-sm text-muted">{copy.newsletterDesc}</p>
            <div className="mt-6">
              <NewsletterSignup
                sourceSite="bodrumapartkiralama"
                sourcePage="apartlar-coming-soon"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP CTA */}
      <section className="section">
        <div className="container-page">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-xl border border-[var(--color-border)] bg-white p-6 text-center md:flex-row md:text-left">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
              <MessageCircle className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <p className="text-base font-semibold text-navy-900">{copy.whatsappCta}</p>
              <p className="text-sm text-muted">{copy.whatsappDesc}</p>
            </div>
            <a
              href={`https://wa.me/${c("whatsappNumber")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {isTr && <ApartlarGuideTr />}
    </>
  );
}

function ApartlarGuideTr() {
  const faqs = [
    {
      q: "Bodrum'da apart kiralamak otelden ne kadar uygun?",
      a: "4 ve üzeri kişiyle seyahat eden aileler için apart, otel oda fiyatına göre çoğu zaman %30-50 daha avantajlı. Kahvaltı/öğle yemeğini apartta hazırlamak günlük yeme-içme harcamasını da düşürür. 1-2 kişilik konaklamada otel ile apart fiyat farkı daha az olur; apart avantajı düşük sezonda artar.",
    },
    {
      q: "Hangi bölgeyi seçmeliyim?",
      a: "Bodrum'un her bölgesi farklı bir profil için uygundur. Genç gruplar için Gümbet, aileler için Turgutreis/Ortakent/Bitez, butik tatil için Yalıkavak/Gündoğan, kısa konaklama için Torba öne çıkar. Bölge sayfalarımızda her birinin detaylı rehberi mevcut.",
    },
    {
      q: "Sezona göre fiyatlar nasıl değişir?",
      a: "Bodrum apart fiyatları üç sezonda toplanır: yüksek sezon (haziran sonu – ağustos sonu) en yüksek; orta sezon (haziran başı, eylül, ekim ilk yarısı) yaklaşık %25-35 indirim; düşük sezon (kasım-nisan) %50'ye varan indirim. Bayram dönemleri (Ramazan Bayramı, Kurban Bayramı) bağımsız bir prim sezonu oluşturur.",
    },
    {
      q: "Apart seçerken nelere dikkat etmeliyim?",
      a: "Fotoğrafların güncelliği, kat ve manzara, klima (split veya merkezi), site içi olanaklar (havuz, otopark, güvenlik), market mesafesi ve apart sahibinin iletişim hızı en önemli kriterlerdir. Sahil hattındaki apartlar görsel açıdan cazip ama gece gürültü konusunda risk taşıyabilir.",
    },
    {
      q: "Rezervasyon süreci nasıl ilerliyor?",
      a: "Tarihinizi ve kişi sayınızı paylaştığınızda size uygun apart seçeneklerini iletiyoruz. Beğendiğiniz mülk için mülk sahibiyle iletişim kurmanıza aracılık ediyoruz; sözleşme ve ödeme mülk sahibiyle yapılır. Rezervasyon teyit için kapora yaygındır.",
    },
    {
      q: "Depozito alıyor musunuz?",
      a: "Mülk sahipleri genellikle apartın hasar riskine karşılık depozito ister; tutar 2.000-10.000 TL arası değişir. Çıkışta apart kontrolü sonrası iade edilir. Bu uygulama mülke göre farklılık gösterir; her durumda rezervasyon onayında size yazılı olarak bildirilir.",
    },
    {
      q: "Apartta evcil hayvan kabul ediyor musunuz?",
      a: "Bir kısım mülk sahibi küçük ırk köpek/kedi kabul eder, bazıları etmez. Evcil hayvanlı seyahat planlıyorsanız mülk sahibiyle önceden teyit ediyoruz. Bazı sitelerde site yönetim kararıyla evcil hayvan yasak olabilir.",
    },
    {
      q: "Minimum konaklama süresi var mı?",
      a: "Yüksek sezonda genelde minimum 3-7 gece uygulanır. Düşük sezonda 2 gece yeterli olabilir. Bayram dönemlerinde özel minimum gecelik uygulamaları olabilir; tarihinize göre mülk bazında değerlendiriyoruz.",
    },
    {
      q: "Havuzlu apart mı, deniz manzaralı apart mı?",
      a: "Çocuklu aileler için havuzlu site apartları çoğu zaman daha pratiktir — havuz, oyun alanı, güvenlik gibi olanakları içerir. Romantik kaçamak veya manzara odaklı tatil için deniz manzaralı yamaç apartları daha cazip. Yalıkavak ve Gündoğan deniz manzaralı stoku ağırlıklı; Turgutreis ve Ortakent site apart stoku ağırlıklı.",
    },
    {
      q: "Çek-up out saatleri standart mı?",
      a: "Tipik check-in 16:00, check-out 11:00 olur. Sezon dışında ve mülke göre erken check-in/geç check-out talep edilebilir; mülk sahibiyle önceden konuşmamız gerekir. Aynı gün arka arkaya rezervasyon olduğu durumlarda esneklik daralabilir.",
    },
  ];
  return (
    <section className="section section-soft">
      <div className="container-page max-w-4xl">
        <h2 className="text-balance">
          Bodrum'da Apart Kiralama Hakkında Bilmeniz Gerekenler
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-ink/90">
          Apart kiralama Bodrum tatilinin son 10 yılda en hızlı büyüyen
          konaklama biçimi. Ailelerin kendi mutfaklarını kullanabilmesi,
          gruplarla seyahat edenlerin maliyeti paylaşması ve uzun konaklamada
          otele kıyasla ciddi tasarruf sunması bu trendi besledi. Aşağıdaki
          rehber, Bodrum'da apart kiralarken bilinmesi gereken pratik
          bilgilerin özetidir.
        </p>

        <h3 className="mt-10 text-xl">Apart vs Otel — Karar Verirken</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/90">
          Apart, otele göre üç temel farklılık taşır: özel bir yaşam alanı,
          mutfak imkânı ve kendi temponuza göre planlanan günler. Otelin
          sunduğu günlük temizlik, oda servisi ve resepsiyon hizmetlerinden
          feragat edilir; karşılığında alan genişliği, mahremiyet ve maliyet
          avantajı kazanılır. 4 kişi ve üzeri gruplarda genelde apart, otel
          fiyatına kıyasla %30-50 daha avantajlıdır. 1-2 kişilik kısa
          konaklamada bu fark daralır; otel rahatlığı ön plana çıkabilir.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/90">
          Yemek alışkanlıkları da kararı etkiler. Sabah kahvaltısı ve öğle
          yemeğini evde hazırlayıp akşam dışarıda yiyen aileler için apart son
          derece elverişlidir. Her öğünü dışarıda yemek isteyenler için otelin
          kahvaltı dahil paketleri pratik olabilir. Çocuklu ailelerde apart
          mutfağı bebek/çocuk yemeği hazırlamak için neredeyse vazgeçilmezdir.
        </p>

        <h3 className="mt-10 text-xl">Hangi Bölge Size Uygun?</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/90">
          Bodrum yarımadasının her bölgesi farklı bir karaktere sahip ve
          farklı tatilci profillerine hitap eder. Genel hatlarıyla:
        </p>
        <ul className="mt-4 space-y-2 text-[15px] text-ink/90">
          <li>
            <strong>Gümbet:</strong> Genç gruplar, gece hayatı, yoğun sosyal
            atmosfer. Aile için ağustosta zorlayıcı olabilir.
          </li>
          <li>
            <strong>Turgutreis:</strong> Geniş aileler, emekliler, sakin uzun
            konaklama. Cumartesi pazarı ve gün batımı klasik avantajları.
          </li>
          <li>
            <strong>Yalıkavak:</strong> Butik tatil, premium akşam yemeği,
            süper yat marinası. Bütçesi geniş misafirler için ideal.
          </li>
          <li>
            <strong>Bitez:</strong> Aileler için sakin sahil ve rüzgâr sörfü;
            Gümbet'in eğlencesine yürüme mesafesi.
          </li>
          <li>
            <strong>Ortakent (Yahşi):</strong> En geniş kumlu plaj, çocuklu
            aileler için en güvenli. Köy atmosferi cabası.
          </li>
          <li>
            <strong>Gündoğan:</strong> Sakin lüks, deniz manzaralı yamaç,
            Cennet Adası kaçamağı.
          </li>
          <li>
            <strong>Torba:</strong> Havalimanına en yakın koy. Kısa konaklama
            ve resort plaj kulüpleri için pratik.
          </li>
        </ul>

        <h3 className="mt-10 text-xl">Sezon ve Fiyat Dalgalanması</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/90">
          Bodrum'da apart fiyatları üç ana sezona göre şekillenir. Yüksek
          sezon haziran sonundan ağustos sonuna kadar uzanır; bayram günleri
          ve okul tatili pikiyle birlikte fiyatlar en yüksek seviyeye çıkar.
          Orta sezon (haziran ilk yarısı ve eylül) yaklaşık %25-35 indirimle
          gelir ama hava ve deniz koşulları hâlâ mükemmeldir; deneyimli
          tatilcilerin tercih ettiği bir dönemdir. Düşük sezon (kasım-nisan)
          %50'ye varan indirim sunar; çoğu apart yıl boyu açık olduğu için
          sezon dışı konaklama da mümkündür.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/90">
          Bayram dönemleri (Ramazan ve Kurban Bayramı) ayrı bir prim sezonu
          oluşturur. Bu dönemlerde minimum gecelik 5-7 olabilir ve fiyatlar
          yüksek sezondan bile yüksek seyredebilir. Ekonomik tatil planlayanlar
          bayram tarihlerinden bir hafta önce veya sonra rezervasyon yaparak
          ciddi tasarruf sağlayabilir.
        </p>

        <h3 className="mt-10 text-xl">Apart Seçerken Nelere Dikkat Etmeli?</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/90">
          İlk olarak fotoğrafların güncelliğini kontrol edin. 5 yıl önce
          çekilmiş fotoğraflar aparta vardığınızda hayal kırıklığı
          yaratabilir. Aktif olarak yönetilen platformlarda fotoğrafların
          güncel olması beklenir; gerekirse mülk sahibinden son kullanılan
          tarihte çekilmiş ek görüntü isteyebilirsiniz. Kat bilgisi (1. kat,
          5. kat) ve manzara açısı önemli bir kalite göstergesidir.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/90">
          Klima tipi kontrol edilmesi gereken bir başka detay. Bodrum'da
          temmuz-ağustos sıcaklığı 35-40°C bandına çıkabilir; tüm odalarda
          split klima olması ideal. Sadece salonda klima olan apartlar yaz
          uykusu için zorlayıcı olabilir. Site içi olanaklar (havuz, çocuk
          oyun alanı, otopark, güvenlik), market ve eczaneye yürüme mesafesi,
          plaja mesafe de kontrol edilmeli kriterler arasında.
        </p>

        <h3 className="mt-10 text-xl">Rezervasyon Süreci</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/90">
          Rezervasyon süreci kabaca şu adımlardan oluşur: tarih ve kişi
          sayısı paylaşımı; uygun mülk seçeneklerinin sunulması; mülk sahibiyle
          iletişim ve detay teyidi; ödeme planı ve sözleşme; rezervasyon
          onayı. Ödeme genelde iki taksitlidir: rezervasyonu kesinleştiren
          kapora (%25-50) ve giriş öncesi kalan tutar. Banka havalesi en yaygın
          ödeme yöntemidir; mülk sahibine göre kredi kartı veya başka
          yöntemler de olabilir.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/90">
          Sözleşme, mülk sahibi ile misafir arasında düzenlenir. Süre, kişi
          sayısı, ödeme planı, depozito miktarı, iptal kuralları sözleşmede
          yer alır. Biz bu süreçte aracılık ediyoruz; tarafsız bir gözle her
          iki tarafa da koşulları açıklıyor, anlaşmazlıkların önüne geçmeye
          çalışıyoruz. İptal şartları mülke göre değişir — genel
          yaklaşımımızı yukarıda paylaştık.
        </p>

        <h2 className="mt-12 text-2xl">Apart Kiralama — Sıkça Sorulanlar</h2>
        <div className="mt-5 divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-white">
          {faqs.map((f, i) => (
            <details key={i} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-navy-900">
                <span>{f.q}</span>
                <span className="text-accent-500 transition group-open:rotate-90">
                  &rsaquo;
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
