import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Shield, Users, TrendingUp, Sparkles, ChevronRight, CheckCircle2 } from "lucide-react";
import { OwnerApplicationForm } from "@/lib/reservation-form";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

export const metadata: Metadata = {
  title: "Evinizi Kiraya Verin | Bodrum'un Güvenilir Apart Platformu",
  description:
    "Bodrum'daki mülkünüzü yıl boyu kazanca dönüştürelim. 3 ay doluluk garantisi, profesyonel yönetim, şeffaf %15 komisyon. Hemen başvurun.",
  alternates: { canonical: `${SITE_URL}/evinizi-kiraya-verin` },
  openGraph: {
    title: "Evinizi Kiraya Verin — Bodrumapartkiralama.com",
    description:
      "Mülk sahipleri için profesyonel kira yönetimi. Doluluk garantisi, şeffaf komisyon.",
    url: `${SITE_URL}/evinizi-kiraya-verin`,
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const benefits = [
    {
      icon: Shield,
      title: "3 Ay Doluluk Garantisi",
      desc: "Sezon ortası rezervasyonsuz kalmıyorsunuz. Yüksek sezonda mülkünüz minimum 3 ay dolar; aksi halde garanti devreye girer.",
    },
    {
      icon: Users,
      title: "Profesyonel Yönetim",
      desc: "Check-in/out, temizlik, misafir iletişimi, sorun çözümü, küçük tadilat — hepsi bizden. Siz sadece ay sonu raporu alırsınız.",
    },
    {
      icon: TrendingUp,
      title: "Şeffaf %15 Komisyon",
      desc: "Aracı yok, gizli ücret yok. Her rezervasyondan %15 sabit komisyon. Detaylı aylık hesap kesim raporu.",
    },
  ];

  const stats = [
    { value: "50+", label: "Aktif mülk" },
    { value: "%82", label: "Ortalama doluluk" },
    { value: "4.8", label: "Misafir puanı" },
    { value: "15K+", label: "Aylık ziyaretçi" },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Form doldurun",
      desc: "Mülkünüzü kısaca tanıtın. 5 dakika.",
    },
    {
      step: "02",
      title: "1 saatte ararız",
      desc: "Ekibimiz başvurunuzu inceler, sizinle hemen iletişime geçer.",
    },
    {
      step: "03",
      title: "Yerinde görüşürüz",
      desc: "Mülkünüze gelip değerlendirme yaparız. Sizin için en uygun modeli planlarız.",
    },
    {
      step: "04",
      title: "Sözleşme + Yayın",
      desc: "Anlaşma onaylanır, mülkünüz site portföyüne eklenir, fotoğraf çekimi yapılır, rezervasyonlar başlar.",
    },
  ];

  const faqs = [
    {
      q: "Komisyon oranınız ne kadar?",
      a: "Sabit %15. Gizli ücret veya aracılık masrafı yoktur. Sadece gerçekleşmiş ve ödenmiş rezervasyonlardan komisyon alırız — boşta kalan günler için ücret talep etmiyoruz.",
    },
    {
      q: "Ödemeler nasıl yapılır?",
      a: "Her ay başında bir önceki ayın hesap kesim raporu hazırlanır. Kapora ve kalan ödemeleri tahsil eder, %15 komisyonu düşer, kalanı 5 iş günü içinde IBAN'ınıza havale ederiz.",
    },
    {
      q: "Sözleşme süresi nedir?",
      a: "Standart anlaşma 1 yıl. Sezon sonunda taraflar yenileyebilir. İlk 3 ayda performans memnuniyetsizliği halinde ücretsiz çıkış hakkınız var.",
    },
    {
      q: "Kendim mülkü kullanabilir miyim?",
      a: "Tabi ki. Sezon dışında veya rezervasyonsuz haftalarda mülkünüzü kişisel kullanım için ayırabilirsiniz. Takvimde işaretleriz, o tarihler için rezervasyon almayız.",
    },
    {
      q: "Hasar veya kayıp olursa?",
      a: "Her misafirden 5.000 TL depozito alıyoruz. Hasar tespitinde önce depozitodan, yetmezse misafirden tahsil edilir; size yansımaz. Ayrıca tüm mülkler için isteğe bağlı kira sigortası tavsiye ediyoruz.",
    },
    {
      q: "Temizlik ve bakım kim halleder?",
      a: "Anlaşmalı temizlik ekibimiz her check-in öncesi mülkü hazırlar. Çarşaf-havlu rotasyonu, temizlik malzemesi, küçük bakımlar (lamba değişimi, ufak tadilat) bizden. Büyük onarımlar (kombi, beyaz eşya) mülk sahibine danışılır.",
    },
    {
      q: "Hangi bölgelerde çalışıyorsunuz?",
      a: "Bodrum yarımadasının tamamı: Gümbet, Turgutreis, Yalıkavak, Bitez, Ortakent, Gündoğan, Torba, Türkbükü, Akyarlar, Gümüşlük. Bölgenize göre hedef misafir profili değişir.",
    },
    {
      q: "Pazarlamayı nasıl yapıyorsunuz?",
      a: "Kendi sitemiz aylık 15.000+ ziyaretçi alır. Buna ek olarak Booking, Airbnb senkronize edilir, Google ve Instagram reklam kampanyalarımız çalışır. Mülkünüz tek bir platformda kapanmaz — paralel kanallarda görünür.",
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Bodrum Mülk Kira Yönetimi",
      provider: { "@type": "LodgingBusiness", name: "Bodrumapartkiralama.com" },
      areaServed: "Bodrum, Muğla, TR",
      description:
        "Bodrum'daki villalar, apartlar ve daireler için tam servis kira yönetimi.",
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
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #3FB2C2 0%, transparent 50%), radial-gradient(circle at 80% 70%, #FF8A3D 0%, transparent 45%)",
          }}
        />
        <div className="container-page relative py-20 md:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="kicker-light">Mülk Sahipleri İçin</span>
            <h1 className="mt-6 font-display text-white">
              Evinizin Yeni Adresi: Bodrum'un Güvenilir Apart Platformu
            </h1>
            <span className="mx-auto mt-6 block h-px w-16 bg-accent-400" />
            <p className="mt-6 text-base text-white/85 md:text-lg">
              50+ mülk sahibiyle çalışıyor, evleri yıl boyu doluluk garantisiyle
              yönetiyoruz. Şeffaf komisyon, profesyonel ekip, güçlü pazarlama.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#basvur" className="btn-primary">
                Başvurumu Yap <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#nasil-calisiyor"
                className="btn-outline-light"
              >
                Nasıl çalışıyor?
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="kicker">Neden Biz</span>
            <h2 className="mt-4">Mülk Sahipleri Bizi Tercih Ediyor</h2>
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

      {/* STATS */}
      <section className="section section-deep relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, #3FB2C2 0%, transparent 50%)",
          }}
        />
        <div className="container-page relative">
          <div className="mx-auto max-w-2xl text-center">
            <span className="kicker-light">Sayılarla Biz</span>
            <h2 className="mt-4 text-white">
              <span className="font-display italic">Rakamlar</span> Bizi Anlatıyor
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-5xl font-bold text-accent-400">
                  {s.value}
                </p>
                <p className="mt-2 text-sm uppercase tracking-kicker text-white/70">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="nasil-calisiyor" className="section">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="kicker">Süreç</span>
            <h2 className="mt-4">Nasıl Çalışıyor?</h2>
            <span className="divider-accent mt-5 block" />
            <p className="mt-5 text-muted">
              4 adımda mülkünüzü yayına çıkarıyoruz. Toplam süre ortalama 7 gün.
            </p>
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
      <section className="section section-soft">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="kicker">Komisyon Modeli</span>
            <h2 className="mt-4">Hiçbir Sürpriz Yok</h2>
            <p className="mt-5 text-muted">
              Pek çok mülk sahibi, kira yönetimi şirketleriyle çalıştıktan sonra
              "ben mi yanlış hesaplıyorum?" diye sorgular. Çünkü piyasada sabit
              olmayan komisyonlar, ek hizmet ücretleri, anlaşılmaz "platform
              ücretleri" yaygın.
            </p>
            <p className="mt-3 text-muted">
              Biz tersini yapıyoruz: <strong>tek oran, %15.</strong> Bu, mülkünüzün
              kazandığı brüt cironun %15'idir. Pazarlama ücreti, fotoğraf çekim
              ücreti, listeleme ücreti yok. Misafir gelmediğinde ücret yok.
            </p>
          </div>
          <div className="card p-7">
            <h3 className="text-lg">Örnek hesaplama</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                <dt className="text-muted">10 günlük rezervasyon</dt>
                <dd className="font-semibold">₺ 32.000</dd>
              </div>
              <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                <dt className="text-muted">%15 komisyon (bizden düşer)</dt>
                <dd className="font-semibold text-accent-500">- ₺ 4.800</dd>
              </div>
              <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                <dt className="text-muted">Temizlik (misafirden alınır)</dt>
                <dd className="font-semibold">₺ 0</dd>
              </div>
              <div className="flex justify-between pt-2 text-lg">
                <dt className="font-bold">Size yansıyacak</dt>
                <dd className="font-bold text-success">₺ 27.200</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-page max-w-3xl">
          <div className="text-center">
            <span className="kicker">FAQ</span>
            <h2 className="mt-4">Sıkça Sorulanlar</h2>
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

      {/* APPLICATION FORM */}
      <section id="basvur" className="section section-deep relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 50%, #FF8A3D 0%, transparent 50%)",
          }}
        />
        <div className="container-page relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="kicker-light">Başvuru</span>
            <h2 className="mt-4 text-white">
              Hemen <span className="font-display italic text-accent-400">başlayın</span>
            </h2>
            <p className="mt-5 text-white/85">
              Form 3 dakika sürer. Bilgileriniz size özel, kimseyle paylaşılmaz.
              Ekibimiz 1-2 saat içinde size dönüş yapar.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/85">
              {[
                "Mülkünüzü görmek için randevu",
                "Şeffaf komisyon anlaşması",
                "Profesyonel fotoğraf çekimi",
                "Yayın öncesi son onay sizde",
              ].map((it) => (
                <li key={it} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent-400" />
                  {it}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-accent-400" />
              <p className="text-sm text-white/85">
                Referansla gelenler için ek <strong>%2 indirim</strong>
              </p>
            </div>
          </div>
          <OwnerApplicationForm
            siteName="bodrumapartkiralama"
            whatsappNumber="905385124088"
            kvkkUrl="/kvkk"
            tone="family"
          />
        </div>
      </section>
    </>
  );
}
