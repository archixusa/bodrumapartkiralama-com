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

  const navLinks = [
    { href: "/apartlar", label: t("apartments") },
    { href: "/tekne-kiralama", label: t("boat") },
    { href: "/arac-kiralama", label: t("car") },
    { href: "/vip-transfer", label: t("transfer") },
    { href: "/turlar", label: t("tours") },
    { href: "/blog", label: t("blog") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
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
              className="rounded-md px-3 py-2 text-sm font-medium text-navy-900 transition hover:bg-navy-50"
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
            className="hidden xl:inline-flex items-center gap-1.5 rounded-md border border-accent-500/40 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-accent-600 transition hover:bg-accent-500 hover:text-white"
          >
            Evinizi Kiraya Verin
          </Link>
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
        <div className="border-t border-[var(--color-border)] bg-white lg:hidden">
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
              className="block rounded-md px-3 py-2 text-base font-bold text-accent-600 hover:bg-accent-500/10"
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
                className="btn-primary"
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
