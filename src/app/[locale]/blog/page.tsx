import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Link } from "@/i18n/routing";
import { posts } from "@/data/posts";
import { getMdxPosts } from "@/lib/mdx-blog";
import { loc } from "@/lib/i18n-data";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

const FALLBACK_HERO = "/blog/bodrum-tatil-rehberi/hero.webp";

interface UnifiedPost {
  source: "legacy" | "mdx";
  slug: string;
  date: string;
  readingTime: number;
  hero: string;
  category: { tr: string; en: string; de?: string; ru?: string };
  titleTr: string;
  titleEn: string;
  titleDe?: string;
  titleRu?: string;
  excerptTr: string;
  excerptEn: string;
  excerptDe?: string;
  excerptRu?: string;
}

function unifyAll(locale: string): UnifiedPost[] {
  const legacy: UnifiedPost[] = posts.map((p) => ({
    source: "legacy",
    slug: p.slug,
    date: p.date,
    readingTime: p.readingTime,
    hero: p.hero,
    category: p.category,
    titleTr: p.titleTr,
    titleEn: p.titleEn,
    titleDe: p.titleDe,
    titleRu: p.titleRu,
    excerptTr: p.excerptTr,
    excerptEn: p.excerptEn,
    excerptDe: p.excerptDe,
    excerptRu: p.excerptRu,
  }));
  const mdx: UnifiedPost[] = getMdxPosts(locale).map((p) => ({
    source: "mdx",
    slug: p.slug,
    date: p.published_at,
    readingTime: p.reading_time_min,
    hero: p.hero_image ?? FALLBACK_HERO,
    category: p.category,
    titleTr: p.title,
    titleEn: p.title,
    excerptTr: p.excerpt,
    excerptEn: p.excerpt,
  }));
  return [...legacy, ...mdx].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const url =
    locale === "tr" ? `${SITE_URL}/blog` : `${SITE_URL}/${locale}/blog`;
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: { canonical: url },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const isTr = locale === "tr";
  const sorted = unifyAll(locale);

  return (
    <>
      <PageHero
        title={t("h1")}
        subtitle={t("subtitle")}
        crumbs={[{ href: "/", label: isTr ? "Ana Sayfa" : "Home" }, { label: t("h1") }]}
      />
      <section className="section">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((p) => (
              <article key={p.slug} className="card group overflow-hidden">
                <Link href={`/blog/${p.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.hero}
                    alt={loc(locale, { tr: p.titleTr, en: p.titleEn, de: p.titleDe, ru: p.titleRu })}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 chip-accent">
                    {loc(locale, p.category)}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span>{new Date(p.date).toLocaleDateString(isTr ? "tr-TR" : "en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {t("readingTime", { min: p.readingTime })}
                    </span>
                  </div>
                  <h3 className="text-lg leading-snug">
                    <Link href={`/blog/${p.slug}`} className="hover:text-navy-600">
                      {loc(locale, { tr: p.titleTr, en: p.titleEn, de: p.titleDe, ru: p.titleRu })}
                    </Link>
                  </h3>
                  <p className="line-clamp-3 text-sm text-muted">
                    {loc(locale, { tr: p.excerptTr, en: p.excerptEn, de: p.excerptDe, ru: p.excerptRu })}
                  </p>
                  <Link href={`/blog/${p.slug}`} className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-navy-600">
                    {t("readMore")} <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
