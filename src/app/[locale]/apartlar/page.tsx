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
            title: "Şeffaf çalışma yapısı",
            desc: "Mülk sahipleri ve misafirlerle iletişim açıktır; ek ücretler önceden paylaşılır.",
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
            title: "Temizlik ve karşılama",
            desc: "Mülk sahipleri her konaklama arası temizlik düzenler. Karşılama uygulaması mülk bazında değişkenlik gösterebilir.",
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
            title: "Transparent way of working",
            desc: "Communication with owners and guests is open; any extra fees are shared up front.",
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
            title: "Cleaning and welcome",
            desc: "Owners arrange cleaning between stays. Welcome practices vary by property.",
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
    </>
  );
}
