import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPin, Eye, ConciergeBell, MessageCircle, Phone, Mail } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Link } from "@/i18n/routing";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const url =
    locale === "tr"
      ? `${SITE_URL}/hakkimizda`
      : `${SITE_URL}/${locale}/hakkimizda`;
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: { canonical: url },
    openGraph: { title: t("metaTitle"), description: t("metaDesc"), url },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const c = await getTranslations({ locale, namespace: "common" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const isTr = locale === "tr";

  return (
    <>
      <PageHero
        title={t("h1")}
        subtitle={t("subtitle")}
        badge={c("brand")}
        image="https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=2000&q=80"
        crumbs={[{ href: "/", label: isTr ? "Ana Sayfa" : "Home" }, { label: nav("about") }]}
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <div className="card flex flex-col gap-3 p-6">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-navy-50 text-navy-900">
              <MapPin className="h-6 w-6" />
            </span>
            <h3 className="text-xl">{t("section1Title")}</h3>
            <p className="text-sm leading-relaxed text-ink/90">{t("section1")}</p>
          </div>
          <div className="card flex flex-col gap-3 p-6">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-navy-50 text-navy-900">
              <Eye className="h-6 w-6" />
            </span>
            <h3 className="text-xl">{t("section2Title")}</h3>
            <p className="text-sm leading-relaxed text-ink/90">{t("section2")}</p>
          </div>
          <div className="card flex flex-col gap-3 p-6">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-navy-50 text-navy-900">
              <ConciergeBell className="h-6 w-6" />
            </span>
            <h3 className="text-xl">{t("section3Title")}</h3>
            <p className="text-sm leading-relaxed text-ink/90">{t("section3")}</p>
          </div>
        </div>
      </section>

      <section className="section section-blue">
        <div className="container-page max-w-3xl text-center">
          <h2>{isTr ? "Bize ulaşın" : "Get in touch"}</h2>
          <p className="mt-3 text-muted">
            {isTr
              ? "Sorularınız için en hızlı kanal WhatsApp. Telefon ve e-posta da açıktır."
              : "WhatsApp is the fastest channel. Phone and email are also open."}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <a
              href={`https://wa.me/${c("whatsappNumber")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card flex flex-col items-center gap-2 p-5"
            >
              <MessageCircle className="h-6 w-6 text-[#25D366]" />
              <span className="text-sm font-semibold">WhatsApp</span>
              <span className="text-xs text-muted">{c("phoneDisplay")}</span>
            </a>
            <a href={`tel:${c("phone").replace(/\s/g, "")}`} className="card flex flex-col items-center gap-2 p-5">
              <Phone className="h-6 w-6 text-navy-900" />
              <span className="text-sm font-semibold">{c("call")}</span>
              <span className="text-xs text-muted">{c("phoneDisplay")}</span>
            </a>
            <a href={`mailto:${c("email")}`} className="card flex flex-col items-center gap-2 p-5">
              <Mail className="h-6 w-6 text-navy-900" />
              <span className="text-sm font-semibold">E-mail</span>
              <span className="text-xs text-muted">{c("email")}</span>
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/apartlar" className="btn-primary">
              {isTr ? "Apartları Gör" : "View Apartments"}
            </Link>
            <Link href="/sss" className="btn-secondary">
              {isTr ? "Sıkça Sorulanlar" : "FAQ"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
