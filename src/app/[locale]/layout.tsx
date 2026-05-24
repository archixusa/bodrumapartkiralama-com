import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bodrum Apart Kiralama 2026 | Güvenli Rezervasyon",
    template: "%s | Bodrumapartkiralama.com",
  },
  description:
    "Bodrum'da 50+ doğrulanmış apart. Gümbet, Turgutreis, Yalıkavak'ta günlük kiralık daire. Anında rezervasyon, ücretsiz iptal, 7/24 destek.",
  openGraph: {
    type: "website",
    siteName: "Bodrumapartkiralama.com",
    locale: "tr_TR",
    images: ["/logo_kare.svg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo_kare.svg"],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      tr: SITE_URL,
      en: `${SITE_URL}/en`,
      de: `${SITE_URL}/de`,
      ru: `${SITE_URL}/ru`,
    },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/logo_kare.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={jakarta.variable}>
      <body className="bg-white font-sans text-ink antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-navy-900 focus:px-3 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="min-h-[60vh]">
            {children}
          </main>
          <Footer />
          <WhatsAppFab />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
