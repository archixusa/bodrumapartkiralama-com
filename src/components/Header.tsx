"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, Phone, MessageCircle, Globe } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import clsx from "clsx";

const LOCALE_LABEL: Record<string, string> = {
  tr: "TR",
  en: "EN",
  de: "DE",
  ru: "RU",
};

export function Header() {
  const t = useTranslations("nav");
  const c = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const guideLabel =
    locale === "tr"
      ? "Tatil Rehberi"
      : locale === "de"
        ? "Reiseführer"
        : locale === "ru"
          ? "Путеводитель"
          : "Travel Guide";

  const navLinks = [
    { href: "/", label: locale === "tr" ? "Anasayfa" : "Home" },
    { href: "/apartlar", label: t("apartments") },
    { href: "/bodrum-tatil-rehberi", label: guideLabel },
    { href: "/blog", label: "Blog" },
    { href: "/hakkimizda", label: t("about") },
    { href: "/iletisim", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-kum-200 bg-kum-50/95 backdrop-blur-[14px] supports-[backdrop-filter]:bg-[rgba(255,248,240,.82)]">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Bodrum Apart Kiralama">
          <Image
            src="/logo_yatay.svg"
            alt="Bodrum Apart Kiralama"
            width={200}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-3 py-2 text-sm font-semibold text-murekkep-700 transition hover:text-murekkep-900 after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-begonvil-500 after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              onBlur={() => setTimeout(() => setLangOpen(false), 150)}
              className="btn-ghost"
              aria-label={t("language")}
              aria-haspopup="menu"
              aria-expanded={langOpen}
            >
              <Globe className="h-4 w-4" />
              {LOCALE_LABEL[locale]}
            </button>
            {langOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-1 w-32 overflow-hidden rounded-md border border-[var(--color-border)] bg-white shadow-cardHover"
              >
                {routing.locales.map((l) => (
                  <Link
                    key={l}
                    href={pathname}
                    locale={l}
                    onClick={() => setLangOpen(false)}
                    className={clsx(
                      "block px-3 py-2 text-sm hover:bg-navy-50",
                      locale === l && "bg-navy-50 font-semibold"
                    )}
                  >
                    {LOCALE_LABEL[l]}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/evinizi-kiraya-verin"
            className="inline-flex items-center gap-1.5 rounded-full border border-begonvil-500/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-begonvil-600 transition hover:bg-begonvil-500 hover:text-white"
          >
            {locale === "tr" ? "Evinizi Kiraya Verin" : "List Your Property"}
          </Link>
          <a
            href={`https://wa.me/${c("whatsappNumber")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-navy-900 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-kum-200 bg-kum-50 lg:hidden">
          <div className="container-page space-y-1 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-navy-900 hover:bg-navy-50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/evinizi-kiraya-verin"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-bold text-begonvil-600 hover:bg-begonvil-50"
            >
              Evinizi Kiraya Verin →
            </Link>
            <div className="flex items-center gap-2 pt-2">
              {routing.locales.map((l) => (
                <Link
                  key={l}
                  href={pathname}
                  locale={l}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "rounded-md border px-3 py-1.5 text-xs font-semibold",
                    locale === l
                      ? "border-navy-900 bg-navy-900 text-white"
                      : "border-[var(--color-border)] text-navy-900"
                  )}
                >
                  {LOCALE_LABEL[l]}
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3">
              <a href={`tel:${c("phone").replace(/\s/g, "")}`} className="btn-secondary">
                <Phone className="h-4 w-4" />
                {c("call")}
              </a>
              <a
                href={`https://wa.me/${c("whatsappNumber")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
