import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";

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
      ? `${SITE_URL}/iletisim`
      : `${SITE_URL}/${locale}/iletisim`;
  const title = isTr
    ? "İletişim — Bodrum Apart Kiralama"
    : "Contact — Bodrum Apartment Rental";
  const description = isTr
    ? "Sorularınız için iletişim kanallarımız: WhatsApp, telefon, e-posta. Mesajınızı 24 saat içinde yanıtlıyoruz."
    : "Reach us by WhatsApp, phone, or email. We reply to messages within 24 hours.";
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
  const nav = await getTranslations({ locale, namespace: "nav" });
  const c = await getTranslations({ locale, namespace: "common" });
  const isTr = locale === "tr";

  const copy = isTr
    ? {
        h1: nav("contact"),
        intro:
          "Soru, talep veya bilgi paylaşımı için aşağıdaki formu kullanabilir, ya da WhatsApp/telefon kanalından doğrudan ulaşabilirsiniz.",
        sideTitle: "Doğrudan iletişim",
        sideLead: "WhatsApp en hızlı yanıt aldığımız kanaldır.",
        hoursTitle: "Çalışma saatleri",
        hoursDesc: "Hafta içi 09:00–19:00 (Türkiye saati)",
        addressTitle: "Adres",
        addressDesc: "Bodrum, Muğla / Türkiye",
        formTitle: "Mesaj gönderin",
      }
    : {
        h1: nav("contact"),
        intro:
          "Use the form below for questions, requests or information sharing — or reach us directly via WhatsApp or phone.",
        sideTitle: "Direct contact",
        sideLead: "WhatsApp is where we respond fastest.",
        hoursTitle: "Working hours",
        hoursDesc: "Mon–Fri 09:00–19:00 (Türkiye time)",
        addressTitle: "Address",
        addressDesc: "Bodrum, Muğla / Türkiye",
        formTitle: "Send a message",
      };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: copy.h1,
    description: copy.intro,
    url:
      locale === "tr" ? `${SITE_URL}/iletisim` : `${SITE_URL}/${locale}/iletisim`,
    mainEntity: {
      "@type": "Organization",
      name: "Bodrumapartkiralama.com",
      telephone: c("phoneDisplay"),
      email: c("email"),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bodrum",
        addressRegion: "Muğla",
        addressCountry: "TR",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: c("phoneDisplay"),
          email: c("email"),
          areaServed: "TR",
          availableLanguage: ["Turkish", "English"],
        },
      ],
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="border-b border-[var(--color-border)] bg-navy-50">
        <div className="container-page py-10 md:py-12">
          <h1>{copy.h1}</h1>
          <p className="mt-2 max-w-2xl text-muted">{copy.intro}</p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="text-2xl">{copy.formTitle}</h2>
            <div className="mt-5">
              <ContactForm sourceSite="bodrumapartkiralama" />
            </div>
          </div>

          <aside className="flex flex-col gap-4">
            <div className="card p-5">
              <p className="text-sm font-semibold text-navy-900">
                {copy.sideTitle}
              </p>
              <p className="mt-1 text-xs text-muted">{copy.sideLead}</p>

              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={`https://wa.me/${c("whatsappNumber")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary justify-center"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a
                  href={`tel:${c("phone").replace(/\s/g, "")}`}
                  className="btn-secondary justify-center"
                >
                  <Phone className="h-4 w-4" /> {c("phoneDisplay")}
                </a>
                <a
                  href={`mailto:${c("email")}`}
                  className="btn-ghost justify-center"
                >
                  <Mail className="h-4 w-4" /> {c("email")}
                </a>
              </div>
            </div>

            <div className="card p-5">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-navy-600" />
                <div>
                  <p className="text-sm font-semibold text-navy-900">
                    {copy.hoursTitle}
                  </p>
                  <p className="text-xs text-muted">{copy.hoursDesc}</p>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-navy-600" />
                <div>
                  <p className="text-sm font-semibold text-navy-900">
                    {copy.addressTitle}
                  </p>
                  <p className="text-xs text-muted">{copy.addressDesc}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
