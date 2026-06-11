import { useLocale, useTranslations } from "next-intl";
import { Mail, Phone, MapPin, MessageCircle, Facebook, Instagram } from "lucide-react";
import { Link } from "@/i18n/routing";
import { BrandLockup } from "@/components/BrandLockup";
import { buildWaHref } from "@/lib/contact";
import { districts } from "@/data/districts";

export function Footer() {
  const t = useTranslations("footer");
  const c = useTranslations("common");
  const nav = useTranslations("nav");
  const dt = useTranslations("districts");
  const locale = useLocale();
  const isTr = locale === "tr";
  const year = new Date().getFullYear();

  const regionsLabel = isTr
    ? "BÖLGELER"
    : locale === "de"
      ? "REGIONEN"
      : locale === "ru"
        ? "РАЙОНЫ"
        : "REGIONS";

  // 4 dilli sözlük — eski tr/en ikili ternary de/ru'yu İngilizceye
  // düşürüyordu (İ18N bütünlüğü; regionsLabel kalıbıyla tutarlı).
  const COL_LABELS = {
    tr: {
      corporate: "KURUMSAL",
      services: "HİZMETLER",
      help: "YARDIM",
      contact: "İLETİŞİM",
      ownerCta: "Evinizi Kiraya Verin",
      cookies: "Çerez Politikası",
      terms: "Kullanım Şartları",
      cancel: "İptal & İade",
      reservation: "Rezervasyon",
      whatsapp: "WhatsApp",
      addressLabel: "Adres",
      emailLabel: "E-posta",
      phoneLabel: "Telefon",
      faq: "Sıkça Sorulanlar",
      tours: "Bodrum Turları",
    },
    en: {
      corporate: "COMPANY",
      services: "SERVICES",
      help: "HELP",
      contact: "CONTACT",
      ownerCta: "List Your Property",
      cookies: "Cookie Policy",
      terms: "Terms of Use",
      cancel: "Cancellation & Refund",
      reservation: "Reservation",
      whatsapp: "WhatsApp",
      addressLabel: "Address",
      emailLabel: "Email",
      phoneLabel: "Phone",
      faq: "FAQ",
      tours: "Bodrum Tours",
    },
    de: {
      corporate: "UNTERNEHMEN",
      services: "LEISTUNGEN",
      help: "HILFE",
      contact: "KONTAKT",
      ownerCta: "Immobilie vermieten",
      cookies: "Cookie-Richtlinie",
      terms: "Nutzungsbedingungen",
      cancel: "Stornierung & Rückerstattung",
      reservation: "Reservierung",
      whatsapp: "WhatsApp",
      addressLabel: "Adresse",
      emailLabel: "E-Mail",
      phoneLabel: "Telefon",
      faq: "Häufige Fragen",
      tours: "Bodrum-Touren",
    },
    ru: {
      corporate: "КОМПАНИЯ",
      services: "УСЛУГИ",
      help: "ПОМОЩЬ",
      contact: "КОНТАКТЫ",
      ownerCta: "Сдать недвижимость",
      cookies: "Политика cookie",
      terms: "Условия использования",
      cancel: "Отмена и возврат",
      reservation: "Бронирование",
      whatsapp: "WhatsApp",
      addressLabel: "Адрес",
      emailLabel: "Эл. почта",
      phoneLabel: "Телефон",
      faq: "Частые вопросы",
      tours: "Туры по Бодруму",
    },
  } as const;
  const colLabels =
    COL_LABELS[locale as keyof typeof COL_LABELS] ?? COL_LABELS.en;

  return (
    <footer className="bg-footer text-navy-100">
      <div className="container-page py-12 lg:py-16">
        {/* Brand row */}
        <div className="mb-10 flex flex-col items-start gap-4 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
            {/* A3 Yelken lockup, koyu zemin varyantı — beyaz kutu kalktı
                (spec: işaret kutusuz/transparan kullanılır). */}
            <BrandLockup variant="dark" className="shrink-0" />
            <p className="max-w-md text-sm text-navy-100/85">{t("tagline")}</p>
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <FooterColumn title={colLabels.corporate}>
            <FooterLink href="/hakkimizda">{nav("about")}</FooterLink>
            <FooterLink href="/iletisim">{nav("contact")}</FooterLink>
            <FooterLink href="/evinizi-kiraya-verin">
              {colLabels.ownerCta}
            </FooterLink>
            <FooterLink href="/bodrum-tatil-rehberi">
              {isTr
                ? "Bodrum Tatil Rehberi"
                : locale === "de"
                  ? "Bodrum Reiseführer"
                  : locale === "ru"
                    ? "Путеводитель по Бодруму"
                    : "Bodrum Travel Guide"}
            </FooterLink>
            <FooterLink href="/blog">{nav("blog")}</FooterLink>
          </FooterColumn>

          <FooterColumn title={colLabels.services}>
            <FooterLink href="/apartlar">{nav("apartments")}</FooterLink>
            <FooterLink href="/iletisim">{colLabels.reservation}</FooterLink>
            <FooterLink href="/evinizi-kiraya-verin">
              {colLabels.ownerCta}
            </FooterLink>
            <FooterLink href="/tekne-kiralama">{`${nav("boat")} (${isTr ? "Partner" : "Partner"})`}</FooterLink>
            <FooterLink href="/arac-kiralama">{`${nav("car")} (${isTr ? "Partner" : "Partner"})`}</FooterLink>
            <FooterLink href="/vip-transfer">{`${nav("transfer")} (${isTr ? "Partner" : "Partner"})`}</FooterLink>
            <FooterLink href="/turlar">{`${colLabels.tours} (Partner)`}</FooterLink>
          </FooterColumn>

          {/* Bölge sayfalarına tam set iç link — SEO + keşfedilebilirlik. */}
          <FooterColumn title={regionsLabel}>
            {districts.map((d) => (
              <FooterLink key={d.slug} href={`/bodrum/${d.urlSlug}`}>
                {dt(d.slug)}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={colLabels.help}>
            <FooterLink href="/sss">{colLabels.faq}</FooterLink>
            <FooterLink href="/kvkk">{t("kvkk")}</FooterLink>
            <FooterLink href="/cerez-politikasi">{colLabels.cookies}</FooterLink>
            <FooterLink href="/kullanim-sartlari">{colLabels.terms}</FooterLink>
            <FooterLink href="/iptal-iade-politikasi">
              {colLabels.cancel}
            </FooterLink>
          </FooterColumn>

          <FooterColumn title={colLabels.contact}>
            <li>
              <a
                href={buildWaHref(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-navy-100/85 transition hover:text-turkuaz-300 md:min-h-0"
              >
                <MessageCircle className="h-4 w-4 text-whatsapp-brand" />
                {colLabels.whatsapp}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${c("email")}`}
                className="inline-flex min-h-11 items-center gap-2 text-navy-100/85 transition hover:text-turkuaz-300 md:min-h-0"
              >
                <Mail className="h-4 w-4 text-turkuaz-300" />
                {c("email")}
              </a>
            </li>
            <li>
              <a
                href={`tel:${c("phone").replace(/\s/g, "")}`}
                className="inline-flex min-h-11 items-center gap-2 text-navy-100/85 transition hover:text-turkuaz-300 md:min-h-0"
              >
                <Phone className="h-4 w-4 text-turkuaz-300" />
                {c("phoneDisplay")}
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-navy-100/85">
              <MapPin className="h-4 w-4 text-turkuaz-300" />
              Bodrum, Muğla / Türkiye
            </li>
            <li className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/BodrumApartKiralama"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex min-h-11 items-center gap-2 text-navy-100/85 transition hover:text-turkuaz-300 md:min-h-0"
              >
                <Facebook className="h-4 w-4 text-turkuaz-300" />
                Facebook
              </a>
              <a
                href="https://www.instagram.com/bodrumapartkiralama"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex min-h-11 items-center gap-2 text-navy-100/85 transition hover:text-turkuaz-300 md:min-h-0"
              >
                <Instagram className="h-4 w-4 text-turkuaz-300" />
                Instagram
              </a>
            </li>
          </FooterColumn>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-navy-100/70 md:flex-row md:items-center">
          <p>
            © {year} Bodrumapartkiralama.com — {t("rights")}
          </p>
          <p>{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Styled label, not a heading — keeps the page heading order clean
          (no <h4> following section <h2>s with no intervening <h3>). */}
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/90">
        {title}
      </p>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      {/* Mobilde ≥44px dokunma hedefi (spec v3); md+ sıkı liste korunur. */}
      <Link
        href={href}
        className="inline-flex min-h-11 items-center text-navy-100/85 transition hover:text-turkuaz-300 md:min-h-0"
      >
        {children}
      </Link>
    </li>
  );
}
