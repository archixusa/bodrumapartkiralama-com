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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

export const metadata: Metadata = {
  title: "Evinizi Kiraya Verin — Bodrum Apart Yönetimi",
  description:
    "Bodrum'daki mülkünüz için yönetim, pazarlama ve misafir iletişimini birlikte planlayalım. Şeffaf çalışma yapısı, doğrudan mülk sahibi iletişimi.",
  alternates: { canonical: `${SITE_URL}/evinizi-kiraya-verin` },
  openGraph: {
    title: "Evinizi Kiraya Verin — Bodrumapartkiralama.com",
    description:
      "Mülk sahipleri için profesyonel kira yönetimi ve şeffaf iletişim.",
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
      title: "Düzenli iletişim",
      desc: "Mülk sahibiyle takvim, rezervasyon ve ödeme akışını periyodik olarak paylaşıyoruz. Süreçle ilgili her aşamayı önceden konuşuyoruz.",
    },
    {
      icon: Users,
      title: "Misafir karşılama ve temizlik",
      desc: "Check-in, check-out, temizlik ve günlük misafir iletişimi anlaşmalı ekibimizle yürür. Standart bir karşılama protokolümüz vardır.",
    },
    {
      icon: TrendingUp,
      title: "Şeffaf komisyon",
      desc: "Komisyon oranı ve hizmet kapsamı yazılı olarak paylaşılır. Gerçekleşen rezervasyonlardan komisyon tahakkuk eder; boş günler için ek ücret talep etmiyoruz.",
    },
  ];

  const howItWorks = [
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
  ];

  const faqs = [
    {
      q: "Komisyon oranınız ne kadar?",
      a: "Komisyon oranını mülke ve hizmet kapsamına göre netleştiriyoruz; rakamı sözleşme öncesinde yazılı olarak iletip teyit alıyoruz. Yalnızca gerçekleşmiş rezervasyonlardan komisyon tahakkuk eder; boş kalan günler için ücret talep etmiyoruz.",
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
  ];

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
              Bodrum'daki Mülkünüz İçin Şeffaf Bir Kira Yönetimi
            </h1>
            <span className="mx-auto mt-6 block h-px w-16 bg-accent-400" />
            <p className="mt-6 text-base text-white/85 md:text-lg">
              Bodrum'un farklı bölgelerinde mülk sahipleriyle çalışıyoruz.
              Komisyon ve hizmet kapsamı yazılı, iletişim doğrudan, süreç
              şeffaf. Mülkünüzü birlikte değerlendirelim.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#basvur" className="btn-primary">
                Başvurumu Yap <ChevronRight className="h-4 w-4" />
              </a>
              <a href="#nasil-calisiyor" className="btn-outline-light">
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
            <span className="kicker">Yaklaşımımız</span>
            <h2 className="mt-4">Mülk Sahipleriyle Çalışma Şeklimiz</h2>
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
            <span className="kicker">Süreç</span>
            <h2 className="mt-4">Nasıl Çalışıyor?</h2>
            <span className="divider-accent mt-5 block" />
            <p className="mt-5 text-muted">
              Mülkün durumuna göre değişmekle birlikte, sözleşme sonrası
              yayına çıkış genellikle birkaç iş günü içinde tamamlanır.
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
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="kicker">Komisyon Modeli</span>
            <h2 className="mt-4">Şeffaf ve Yazılı</h2>
            <p className="mt-5 text-muted">
              Komisyon oranı, hizmet kapsamı ve hesap kesim sıklığı yazılı
              olarak paylaşılır. Pazarlama, fotoğraf çekimi ve listeleme gibi
              kalemlerden hangileri sözleşme kapsamında, hangileri opsiyonel —
              hepsi önceden konuşulur.
            </p>
            <p className="mt-3 text-muted">
              Yalnızca gerçekleşmiş rezervasyonlardan komisyon tahakkuk eder.
              Mülkünüze özel oran ve detayları görüşmemizde paylaşıyoruz.
            </p>
          </div>
          <div className="card p-7">
            <h3 className="text-lg">Örnek tabloyu birlikte hazırlayalım</h3>
            <p className="mt-3 text-sm text-muted">
              Mülkün bölge ve tipine göre fiyat aralığı, hedef misafir profili
              ve sezonluk doluluk tahmini önemli ölçüde değişebiliyor. Görüşme
              sırasında size özel bir tahmini gelir tablosu hazırlıyor ve
              sözleşmeyle birlikte paylaşıyoruz.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                Yüksek/düşük sezon fiyat aralığı önerisi
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                Komisyon ve hizmet kalemlerinin yazılı dökümü
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                Aylık hesap kesim takvimi
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-soft">
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
              Başlamak için <span className="font-display italic text-accent-400">birkaç dakika</span> yeterli
            </h2>
            <p className="mt-5 text-white/85">
              Form yaklaşık 3 dakika sürer. Paylaştığınız bilgiler yalnızca
              başvurunuzu değerlendirmek için kullanılır. Ekibimiz uygun
              gördüğümüz takdirde size dönüş yapar.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/85">
              {[
                "Mülkünüzü görmek için randevu",
                "Yazılı komisyon anlaşması",
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
                Referansla gelen mülk sahipleri için özel koşullar
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
