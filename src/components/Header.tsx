"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, Phone, MessageCircle, Globe } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { BrandLockup } from "@/components/BrandLockup";
import { buildWaHref } from "@/lib/contact";
import clsx from "clsx";

const LOCALE_LABEL: Record<string, string> = {
  tr: "TR",
  en: "EN",
  de: "DE",
  ru: "RU",
};

// 4 dilli sabitler — tr/en ikili ternary'leri de/ru'yu İngilizceye
// düşürüyordu (İ18N bütünlüğü).
const HOME_LABEL: Record<string, string> = {
  tr: "Anasayfa",
  en: "Home",
  de: "Startseite",
  ru: "Главная",
};

const OWNER_LABEL: Record<string, string> = {
  tr: "Evinizi Kiraya Verin",
  en: "List Your Property",
  de: "Immobilie vermieten",
  ru: "Сдать недвижимость",
};

// Hamburger aç/kapat etiketi — sabit İngilizce aria-label tr/de/ru
// sayfalarında yanlış dilde seslendiriliyordu (WCAG 3.1.2).
const MENU_OPEN_LABEL: Record<string, string> = {
  tr: "Menüyü aç",
  en: "Open menu",
  de: "Menü öffnen",
  ru: "Открыть меню",
};

const MENU_CLOSE_LABEL: Record<string, string> = {
  tr: "Menüyü kapat",
  en: "Close menu",
  de: "Menü schließen",
  ru: "Закрыть меню",
};

export function Header() {
  const t = useTranslations("nav");
  const c = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langBtnRef = useRef<HTMLButtonElement>(null);

  const guideLabel =
    locale === "tr"
      ? "Tatil Rehberi"
      : locale === "de"
        ? "Reiseführer"
        : locale === "ru"
          ? "Путеводитель"
          : "Travel Guide";

  const navLinks = [
    { href: "/", label: HOME_LABEL[locale] ?? HOME_LABEL.en },
    { href: "/apartlar", label: t("apartments") },
    { href: "/bodrum-tatil-rehberi", label: guideLabel },
    { href: "/blog", label: "Blog" },
    { href: "/hakkimizda", label: t("about") },
    { href: "/iletisim", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-kum-200 bg-kum-50/95 backdrop-blur-[14px] supports-[backdrop-filter]:bg-[rgba(255,248,240,.82)]">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        {/* A3 Yelken lockup — inline SVG, ekstra istek yok (spec "Logo
            uygulaması"). py-2 ile dokunma hedefi ≥44px. */}
        <Link
          href="/"
          className="flex shrink-0 items-center py-2"
          aria-label="Bodrum Apart Kiralama"
        >
          <BrandLockup />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative inline-flex min-h-11 items-center px-3 py-2 text-sm font-semibold text-murekkep-700 transition hover:text-murekkep-900 after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-turkuaz-600 after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <div
            className="relative"
            // Kapanma kapsayıcının focusout'unda: odak liste İÇİNDE kaldıkça
            // kapanmaz — buton üzerindeki onBlur+setTimeout(150) deseni Tab
            // ile ilk dil linkine geçildiği anda listeyi söküyordu ve dil
            // linkleri klavyeyle fiilen erişilemiyordu (WCAG 2.1.1).
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setLangOpen(false);
              }
            }}
            // Escape listeyi kapatır ve odağı tetikleyici butona iade eder.
            onKeyDown={(e) => {
              if (e.key === "Escape" && langOpen) {
                setLangOpen(false);
                langBtnRef.current?.focus();
              }
            }}
          >
            {/* Açılır liste düz linklerden oluşuyor — role="menu"/menuitem
                deseni yerine aria-expanded + aria-controls'lu disclosure
                kullanılır (menuitem'sız role="menu" SR'lerde bozuk anons
                ediliyordu). aria-controls yalnız liste DOM'dayken verilir —
                kapalı durumda var olmayan id'ye işaret etmesin. */}
            <button
              ref={langBtnRef}
              onClick={() => setLangOpen((v) => !v)}
              className="btn-ghost"
              // Görünür 'TR' etiketi erişilebilir ada dahil edilir (WCAG 2.5.3
              // Label in Name) — sesle kontrol kullanıcısı 'TR'ye tıklayabilir.
              aria-label={`${t("language")}: ${LOCALE_LABEL[locale]}`}
              aria-controls={langOpen ? "lang-switcher" : undefined}
              aria-expanded={langOpen}
            >
              <Globe className="h-4 w-4" />
              {LOCALE_LABEL[locale]}
            </button>
            {langOpen && (
              <div
                id="lang-switcher"
                className="absolute right-0 mt-1 w-32 overflow-hidden rounded-md border border-[var(--color-border)] bg-white shadow-cardHover"
              >
                {routing.locales.map((l) => (
                  <Link
                    key={l}
                    href={pathname}
                    locale={l}
                    onClick={() => setLangOpen(false)}
                    aria-current={locale === l ? "true" : undefined}
                    className={clsx(
                      "flex min-h-11 items-center px-3 py-2 text-sm hover:bg-navy-50",
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
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-turkuaz-600/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-turkuaz-600 transition hover:bg-turkuaz-600 hover:text-white"
          >
            {OWNER_LABEL[locale] ?? OWNER_LABEL.en}
          </Link>
          <a
            href={buildWaHref(locale)}
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
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md p-2 text-navy-900 lg:hidden"
          aria-label={
            open
              ? (MENU_CLOSE_LABEL[locale] ?? MENU_CLOSE_LABEL.en)
              : (MENU_OPEN_LABEL[locale] ?? MENU_OPEN_LABEL.en)
          }
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
                className="flex min-h-11 items-center rounded-md px-3 py-2 text-base font-medium text-navy-900 hover:bg-navy-50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/evinizi-kiraya-verin"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center rounded-md px-3 py-2 text-base font-bold text-turkuaz-600 hover:bg-turkuaz-50"
            >
              {OWNER_LABEL[locale] ?? OWNER_LABEL.en} →
            </Link>
            <div className="flex items-center gap-2 pt-2">
              {routing.locales.map((l) => (
                <Link
                  key={l}
                  href={pathname}
                  locale={l}
                  onClick={() => setOpen(false)}
                  aria-current={locale === l ? "true" : undefined}
                  className={clsx(
                    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border px-3 py-1.5 text-xs font-semibold",
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
                href={buildWaHref(locale)}
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
