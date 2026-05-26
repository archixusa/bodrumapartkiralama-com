import Image from "next/image";
import { useTranslations } from "next-intl";
import { Mail, Phone, Instagram, Facebook, MapPin } from "lucide-react";
import { Link } from "@/i18n/routing";
import { districts } from "@/data/districts";

export function Footer() {
  const t = useTranslations("footer");
  const c = useTranslations("common");
  const nav = useTranslations("nav");
  const dt = useTranslations("districts");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-navy-900 text-navy-100">
      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="rounded-md bg-white/95 p-3 inline-block">
              <Image
                src="/logo_yatay.svg"
                alt="Bodrum Apart Kiralama"
                width={200}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="mt-4 max-w-sm text-sm text-navy-100/85">{t("tagline")}</p>
            <div className="mt-5 space-y-2 text-sm">
              <a
                href={`tel:${c("phone").replace(/\s/g, "")}`}
                className="flex items-center gap-2 hover:text-white"
              >
                <Phone className="h-4 w-4 text-accent-400" /> {c("phoneDisplay")}
              </a>
              <a
                href={`mailto:${c("email")}`}
                className="flex items-center gap-2 hover:text-white"
              >
                <Mail className="h-4 w-4 text-accent-400" /> {c("email")}
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-400" /> Bodrum, Muğla / Türkiye
              </p>
            </div>
            <div className="mt-5 flex gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-md bg-white/10 p-2 hover:bg-white/20"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-md bg-white/10 p-2 hover:bg-white/20"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterColumn title={t("explore")}>
            <FooterLink href="/apartlar">{nav("apartments")}</FooterLink>
            {districts.slice(0, 5).map((d) => (
              <FooterLink key={d.slug} href={`/bodrum/${d.urlSlug}`}>
                {dt(d.slug)}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={t("services")}>
            <FooterLink href="/tekne-kiralama">{nav("boat")}</FooterLink>
            <FooterLink href="/arac-kiralama">{nav("car")}</FooterLink>
            <FooterLink href="/vip-transfer">{nav("transfer")}</FooterLink>
            <FooterLink href="/turlar">{nav("tours")}</FooterLink>
          </FooterColumn>

          <FooterColumn title={t("company")}>
            <FooterLink href="/hakkimizda">{nav("about")}</FooterLink>
            <FooterLink href="/iletisim">{nav("contact")}</FooterLink>
            <FooterLink href="/evinizi-kiraya-verin">Evinizi Kiraya Verin</FooterLink>
            <FooterLink href="/blog">{nav("blog")}</FooterLink>
            <FooterLink href="/sss">FAQ</FooterLink>
            <FooterLink href="/kvkk">{t("kvkk")}</FooterLink>
            <FooterLink href="/kullanim-sartlari">{t("terms")}</FooterLink>
            <FooterLink href="/iptal-iade-politikasi">{t("cancel")}</FooterLink>
          </FooterColumn>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-navy-100/70 md:flex-row md:items-center">
          <p>
            © {year} Bodrumapartkiralama.com — {t("rights")}
          </p>
          <p>Made with ♥ in Bodrum</p>
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
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
        {title}
      </h4>
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
