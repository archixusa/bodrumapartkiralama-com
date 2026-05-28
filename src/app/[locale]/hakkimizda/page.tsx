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
} from "lucide-react";
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
  const isTr = locale === "tr";
  const url =
    locale === "tr"
      ? `${SITE_URL}/hakkimizda`
      : `${SITE_URL}/${locale}/hakkimizda`;
  const title = isTr
    ? "Hakkımızda — Bodrum Apart Kiralama"
    : "About — Bodrum Apartment Rental";
  const description = isTr
    ? "Bodrumapartkiralama, Bodrum yarımadasında apart kiralama hizmeti veren bir konaklama yönetim platformudur. Mülk sahipleri ile misafirleri doğrudan buluşturuyoruz."
    : "Bodrumapartkiralama is a property management platform offering apartment rental on the Bodrum peninsula. We bring property owners and guests directly together.";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
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
  const isTr = locale === "tr";

  const copy = isTr
    ? {
        h1: "Hakkımızda",
        subtitle: "Bodrum'da apart kiralama için küçük ölçekli, yerel bir platform.",
        intro:
          "2013'ten bu yana Bodrum yarımadasında apart kiralama hizmeti veren bir konaklama yönetim platformuyuz. Mülk sahipleri ile misafirleri doğrudan buluşturuyor, aracısız ve şeffaf bir hizmet modeli sunuyoruz.",
        approachTitle: "Yaklaşımımız",
        approachLead:
          "İşletmemizi üç temel ilke üzerine kuruyoruz:",
        principles: [
          {
            icon: ShieldCheck,
            title: "Şeffaflık",
            desc: "Komisyon yapımız net, mülk sahipleriyle iletişimimiz doğrudan, misafirlerimizle iletişimimiz açıktır.",
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
        contactTitle: "İletişim",
        contactLead:
          "Sorularınız için en hızlı kanal WhatsApp; telefon ve e-posta da açıktır.",
        whatsappCta: "WhatsApp",
        callCta: "Telefon",
        emailCta: "E-posta",
        ctaApart: "Apartları gör",
        ctaSss: "Sıkça sorulanlar",
        breadcrumbHome: "Ana Sayfa",
      }
    : {
        h1: "About Us",
        subtitle:
          "A small-scale local platform for apartment rental in Bodrum.",
        intro:
          "Since 2013, we have been a property management platform offering apartment rental on the Bodrum peninsula. We bring owners and guests directly together with a no-middleman, transparent service model.",
        approachTitle: "Our Approach",
        approachLead: "We build the business on three core principles:",
        principles: [
          {
            icon: ShieldCheck,
            title: "Transparency",
            desc: "Our commission terms are clear, owner contact is direct, and guest communication is open.",
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
        contactTitle: "Contact",
        contactLead:
          "WhatsApp is the fastest channel; phone and email are also open.",
        whatsappCta: "WhatsApp",
        callCta: "Phone",
        emailCta: "Email",
        ctaApart: "View apartments",
        ctaSss: "FAQ",
        breadcrumbHome: "Home",
      };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: copy.h1,
    description: copy.intro,
    url:
      locale === "tr"
        ? `${SITE_URL}/hakkimizda`
        : `${SITE_URL}/${locale}/hakkimizda`,
    mainEntity: {
      "@type": "Organization",
      name: "Bodrumapartkiralama.com",
      url: SITE_URL,
      foundingDate: "2013",
      areaServed: "Bodrum, Muğla, TR",
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero
        title={copy.h1}
        subtitle={copy.subtitle}
        badge={c("brand")}
        image="https://images.unsplash.com/photo-1583425423320-eea6e5d20baf?auto=format&fit=crop&w=2000&q=80"
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
              <MessageCircle className="h-6 w-6 text-[#25D366]" />
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
