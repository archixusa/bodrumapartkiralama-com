import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, Calendar, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { PostBody } from "@/components/PostBody";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { posts, getPost } from "@/data/posts";
import { districts } from "@/data/districts";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const isTr = locale === "tr";
  const url =
    locale === "tr"
      ? `${SITE_URL}/blog/${post.slug}`
      : `${SITE_URL}/${locale}/blog/${post.slug}`;
  return {
    title: isTr ? post.metaTitleTr : post.metaTitleEn,
    description: isTr ? post.metaDescTr : post.metaDescEn,
    alternates: { canonical: url },
    openGraph: {
      title: isTr ? post.titleTr : post.titleEn,
      description: isTr ? post.excerptTr : post.excerptEn,
      url,
      type: "article",
      images: [{ url: post.hero, width: 1600, height: 900, alt: post.titleTr }],
    },
    twitter: {
      card: "summary_large_image",
      title: isTr ? post.titleTr : post.titleEn,
      description: isTr ? post.excerptTr : post.excerptEn,
      images: [post.hero],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });
  const dt = await getTranslations({ locale, namespace: "districts" });
  const isTr = locale === "tr";
  const title = isTr ? post.titleTr : post.titleEn;
  const sections = isTr ? post.contentTr : post.contentEn;
  const faqItems = isTr ? post.faqTr : post.faqEn;
  const tocItems = sections
    .filter((s): s is Extract<typeof s, { type: "h2" }> => s.type === "h2")
    .map((s) => ({ id: s.id, text: s.text }));

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      image: [post.hero],
      datePublished: post.date,
      dateModified: post.date,
      author: { "@type": "Organization", name: "Bodrumapartkiralama.com" },
      publisher: {
        "@type": "Organization",
        name: "Bodrumapartkiralama.com",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo_kare.svg` },
      },
      mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
      description: isTr ? post.metaDescTr : post.metaDescEn,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: isTr ? "Ana Sayfa" : "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: t("h1"), item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: title, item: `${SITE_URL}/blog/${post.slug}` },
      ],
    },
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }
      : null,
  ].filter(Boolean) as object[];

  return (
    <>
      <JsonLd data={jsonLd} />
      <article>
        <section className="relative overflow-hidden bg-navy-900 text-white">
          <Image
            src={post.hero}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/60 to-navy-900/90" />
          <div className="container-page relative py-14 md:py-20">
            <nav aria-label="breadcrumb" className="mb-3 flex items-center gap-1 text-xs text-white/80">
              <Link href="/" className="hover:underline">{isTr ? "Ana Sayfa" : "Home"}</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/blog" className="hover:underline">{t("h1")}</Link>
            </nav>
            <span className="chip-accent">{isTr ? post.category.tr : post.category.en}</span>
            <h1 className="mt-4 max-w-3xl text-white">{title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/85">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString(isTr ? "tr-TR" : "en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" /> {t("readingTime", { min: post.readingTime })}
              </span>
            </div>
          </div>
        </section>

        <section className="container-page py-10 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            <div className="min-w-0">
              <PostBody sections={sections} />
              {faqItems.length > 0 && (
                <>
                  <h2 className="mt-12 text-2xl">{isTr ? "Sıkça Sorulanlar" : "Frequently Asked Questions"}</h2>
                  <div className="mt-4">
                    <FAQ items={faqItems} />
                  </div>
                </>
              )}
            </div>
            <aside className="lg:sticky lg:top-20 lg:self-start">
              {tocItems.length > 0 && (
                <nav
                  aria-label="Table of contents"
                  className="rounded-xl border border-[var(--color-border)] bg-white p-4 text-sm"
                >
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
                    {t("tableOfContents")}
                  </p>
                  <ul className="space-y-2">
                    {tocItems.map((it) => (
                      <li key={it.id}>
                        <a href={`#${it.id}`} className="text-navy-900 hover:text-navy-600">
                          {it.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              {post.relatedDistricts && post.relatedDistricts.length > 0 && (
                <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-white p-4 text-sm">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
                    {isTr ? "İlgili Bölgeler" : "Related districts"}
                  </p>
                  <ul className="space-y-2">
                    {post.relatedDistricts.map((slug) => {
                      const d = districts.find((x) => x.slug === slug);
                      if (!d) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/bodrum/${d.urlSlug}`}
                            className="inline-flex items-center gap-1 text-navy-900 hover:text-navy-600"
                          >
                            {dt(slug)} <ArrowRight className="h-3 w-3" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </section>

        <section className="section section-soft">
          <div className="container-page">
            <h2>{t("relatedTitle")}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="card group flex flex-col overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.hero}
                      alt={isTr ? p.titleTr : p.titleEn}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2 p-5">
                    <span className="chip">{isTr ? p.category.tr : p.category.en}</span>
                    <h3 className="text-base leading-snug">{isTr ? p.titleTr : p.titleEn}</h3>
                    <p className="line-clamp-2 text-sm text-muted">{isTr ? p.excerptTr : p.excerptEn}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
