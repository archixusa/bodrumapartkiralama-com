import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, MapPin, Calendar, Award } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/routing";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const url =
    locale === "tr"
      ? `${SITE_URL}/yazar/furkan-sahin`
      : `${SITE_URL}/${locale}/yazar/furkan-sahin`;
  return {
    title: "Furkan Şahin — Bodrum Apart & Villa Yöneticisi",
    description:
      "5+ yıldır Bodrum'da apart/villa kiralama yöneticisi. Yalıkavak, Gümbet, Turgutreis dahil bölgedeki konaklama dinamiklerini ilk elden biliyor.",
    alternates: { canonical: url },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await getTranslations({ locale, namespace: "blog" });
  const isTr = locale === "tr";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Furkan Şahin",
    jobTitle: isTr ? "Bodrum Apart & Villa Yöneticisi" : "Bodrum Apartment & Villa Manager",
    worksFor: {
      "@type": "Organization",
      name: "Bodrumapartkiralama.com",
      url: SITE_URL,
    },
    description: isTr
      ? "5+ yıldır Bodrum'da apart ve villa kiralama yöneticisi olarak çalışıyor."
      : "5+ years managing apartment and villa rentals in Bodrum.",
    url: `${SITE_URL}/yazar/furkan-sahin`,
    knowsAbout: [
      "Bodrum apart kiralama",
      "Yalıkavak villa kiralama",
      "Gümbet konaklama",
      "Turgutreis tatil",
      "Bodrum sezon planlaması",
    ],
  };

  return (
    <>
      <JsonLd data={[personSchema]} />
      <PageHero
        title="Furkan Şahin"
        subtitle={isTr ? "Bodrum Apart & Villa Yöneticisi" : "Bodrum Rental Manager"}
        crumbs={[
          { href: "/", label: isTr ? "Ana Sayfa" : "Home" },
          { href: "/blog", label: "Blog" },
          { label: "Furkan Şahin" },
        ]}
      />
      <section className="section">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            <div>
              <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-gradient-to-br from-navy-100 to-navy-200 text-7xl font-bold text-navy-900">
                FŞ
              </div>
              <ul className="mt-6 space-y-2 text-sm">
                <li className="flex items-center gap-2 text-muted">
                  <MapPin className="h-4 w-4 text-navy-600" /> Bodrum, Muğla
                </li>
                <li className="flex items-center gap-2 text-muted">
                  <Calendar className="h-4 w-4 text-navy-600" /> 5+ yıl sektörde
                </li>
                <li className="flex items-center gap-2 text-muted">
                  <Award className="h-4 w-4 text-navy-600" /> 500+ misafir ağırlama
                </li>
              </ul>
              <Link
                href="/blog"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-navy-700 hover:text-navy-900"
              >
                Tüm yazıları <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-ink">
              <h2 className="text-2xl font-bold">Kısaca</h2>
              <p>
                Bodrum'da 5 yıldır apart ve villa kiralama yöneticisi olarak
                çalışıyorum. Yalıkavak'ın butik villalarından Gümbet'in geniş
                aile apartlarına, Turgutreis'in sessiz koylarından Bitez'in
                sığ denizine kadar yarımadanın farklı yüzlerini misafirlerime
                tanıtmak benim işim.
              </p>
              <p>
                Bu blog, sezon boyunca sorulan soruların ve sahada
                gözlemlediğim pratik detayların derlenmiş hâli. Hangi bölge
                kime uygun, hangi tarihlerde Bodrum daha kolay nefes alır,
                bütçe ile konfor nerede dengeleniyor — bunların hepsi gerçek
                deneyime dayanıyor.
              </p>
              <p>
                Eğer Bodrum'a ilk kez geliyorsanız ya da yıllardır geldiğiniz
                hâlde yeni bir köşe arıyorsanız, yazılar size yön versin
                diye yazıldı. Yine de en doğru cevap rezervasyon ekibimizle
                konuşmaktan geçer; tatilinizi planlamadan önce bir mesaj atın.
              </p>

              <h3 className="mt-6 text-xl font-semibold">Uzmanlık Alanlarım</h3>
              <ul className="list-disc space-y-1 pl-6">
                <li>Bodrum yarımadasında bölge seçimi (Yalıkavak, Gümbet, Turgutreis, Bitez, Gündoğan)</li>
                <li>Aile odaklı apart konaklama</li>
                <li>Yaz/şoulder sezon planlama</li>
                <li>Havalimanı transfer, araç ve tekne lojistiği</li>
                <li>Doğrulanmış ev sahibi & misafir uyumu</li>
              </ul>

              <div className="mt-8 rounded-xl border border-accent-500/30 bg-accent-500/5 p-5">
                <p className="text-sm">
                  Bir konuda yazılmasını istediğiniz başlık varsa{" "}
                  <Link href="/iletisim" className="font-semibold text-navy-700 underline">
                    iletişim
                  </Link>{" "}
                  sayfasından ulaşabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
