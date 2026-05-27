import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, MessageCircle, Wallet, Phone, Headphones, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterSignup } from "@/components/NewsletterSignup";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  const url =
    locale === "tr" ? `${SITE_URL}/apartlar` : `${SITE_URL}/${locale}/apartlar`;
  const title = isTr
    ? "Bodrum'un Seçkin Apart Koleksiyonu — Yakında"
    : "Bodrum's Curated Apartment Collection — Coming Soon";
  const description = isTr
    ? "Bodrum'da titizlikle değerlendirilmiş apart kiralama seçeneklerimiz çok yakında sizinle. Mülk sahibi başvuruları halen değerlendirilmektedir."
    : "Our carefully curated apartment rental options in Bodrum will be available shortly. Owner applications are still being reviewed.";
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

  const copy = isTr
    ? {
        chip: "Yakında",
        h1: "Bodrum'un Seçkin Apart Koleksiyonu",
        sub: "Yakında",
        lead:
          "Bodrum'da titizlikle değerlendirilmiş apart kiralama seçeneklerimiz çok yakında sizinle. Mülk sahibi başvuruları halen değerlendirilmektedir.",
        ctaReserve: "Rezervasyon Talebi Oluştur",
        ctaList: "Mülkümü Listele",
        benefitsTitle: "Platformumuzun Yaklaşımı",
        benefits: [
          {
            icon: Wallet,
            title: "Şeffaf komisyon yapısı",
            desc: "Mülk sahipleriyle çalışma şartlarımız açıktır; gizli ek ücret yoktur.",
          },
          {
            icon: Phone,
            title: "Doğrudan mülk sahibi iletişimi",
            desc: "Misafirin sorusunu doğrudan mülk sahibine ileten kısa bir köprü kuruyoruz.",
          },
          {
            icon: Headphones,
            title: "7/24 misafir desteği",
            desc: "Konaklama süresince WhatsApp ve telefon üzerinden ulaşılabilir bir ekibimiz var.",
          },
          {
            icon: Sparkles,
            title: "Profesyonel temizlik ve karşılama",
            desc: "Her giriş öncesi standart bir temizlik ve karşılama protokolü uygulanır.",
          },
        ],
        newsletterTitle: "Yeni mülkler eklendiğinde haberdar olun",
        newsletterDesc:
          "Apart listemiz açıldığında ve uygun sezon fırsatları olduğunda e-posta ile bilgilendiririz. İstediğiniz an çıkabilirsiniz.",
        whatsappCta: "WhatsApp ile yazın",
        whatsappDesc: "Sorularınızı doğrudan yöneticimize iletmek için en hızlı yol.",
      }
    : {
        chip: "Coming soon",
        h1: "Bodrum's Curated Apartment Collection",
        sub: "Coming soon",
        lead:
          "Our carefully curated apartment rental options in Bodrum will be available shortly. Owner applications are still being reviewed.",
        ctaReserve: "Send a Reservation Request",
        ctaList: "List My Property",
        benefitsTitle: "How our platform works",
        benefits: [
          {
            icon: Wallet,
            title: "Transparent commission",
            desc: "Our working terms with owners are clearly defined; no hidden fees.",
          },
          {
            icon: Phone,
            title: "Direct owner contact",
            desc: "We bridge guest questions directly to the property owner.",
          },
          {
            icon: Headphones,
            title: "24/7 guest support",
            desc: "A small team you can reach by WhatsApp and phone throughout the stay.",
          },
          {
            icon: Sparkles,
            title: "Professional cleaning and welcome",
            desc: "A standard cleaning and welcome protocol is applied before every check-in.",
          },
        ],
        newsletterTitle: "Get notified when properties are added",
        newsletterDesc:
          "When our apartment list goes live or seasonal offers come up, we'll send a short email. You can unsubscribe any time.",
        whatsappCta: "Write on WhatsApp",
        whatsappDesc: "The fastest way to reach our manager directly.",
      };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isTr ? "Ana Sayfa" : "Home",
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

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 opacity-95" />
        <div className="container-page relative py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="chip-accent">{copy.chip}</span>
            <h1 className="mt-4 text-balance text-white md:text-5xl">{copy.h1}</h1>
            <p className="mt-3 text-lg font-semibold text-accent-400 md:text-xl">
              {copy.sub}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 md:text-lg">
              {copy.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/iletisim" className="btn-primary">
                {copy.ctaReserve}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/evinizi-kiraya-verin" className="btn-secondary !bg-white/10 !text-white !border-white/30 hover:!bg-white/15">
                {copy.ctaList}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
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
            süper yat marinası deneyimi. Bütçesi geniş misafirler için ideal.
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
            ve resort beach club deneyimi için pratik.
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
