import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Mail, Phone, MapPin, MessageCircle, Facebook, Instagram } from "lucide-react";
import { Link } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations("footer");
  const c = useTranslations("common");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const isTr = locale === "tr";
  const year = new Date().getFullYear();

  const colLabels = isTr
    ? {
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
      }
    : {
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
      };

  return (
    <footer className="border-t border-[var(--color-border)] bg-navy-900 text-navy-100">
      <div className="container-page py-12 lg:py-16">
        {/* Brand row */}
        <div className="mb-10 flex flex-col items-start gap-4 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-md bg-white/95 p-3">
              <Image
                src="/logo_yatay.svg"
                alt="Bodrum Apart Kiralama"
                width={200}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="max-w-md text-sm text-navy-100/85">{t("tagline")}</p>
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
            <FooterLink href="/turlar">{`${isTr ? "Bodrum Turları" : "Bodrum Tours"} (Partner)`}</FooterLink>
          </FooterColumn>

          <FooterColumn title={colLabels.help}>
            <FooterLink href="/sss">{isTr ? "Sıkça Sorulanlar" : "FAQ"}</FooterLink>
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
                href={`https://wa.me/${c("whatsappNumber")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-navy-100/85 hover:text-white"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                {colLabels.whatsapp}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${c("email")}`}
                className="inline-flex items-center gap-2 text-navy-100/85 hover:text-white"
              >
                <Mail className="h-4 w-4 text-accent-400" />
                {c("email")}
              </a>
            </li>
            <li>
              <a
                href={`tel:${c("phone").replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 text-navy-100/85 hover:text-white"
              >
                <Phone className="h-4 w-4 text-accent-400" />
                {c("phoneDisplay")}
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-navy-100/85">
              <MapPin className="h-4 w-4 text-accent-400" />
              Bodrum, Muğla / Türkiye
            </li>
            <li className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/BodrumApartKiralama"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center gap-2 text-navy-100/85 hover:text-white"
              >
                <Facebook className="h-4 w-4 text-accent-400" />
                Facebook
              </a>
              <a
                href="https://www.instagram.com/bodrumapartkiralama"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center gap-2 text-navy-100/85 hover:text-white"
              >
                <Instagram className="h-4 w-4 text-accent-400" />
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
      <Link href={href} className="text-navy-100/85 hover:text-white">
        {children}
      </Link>
    </li>
  );
}
