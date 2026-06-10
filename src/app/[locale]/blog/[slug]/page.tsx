import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, Calendar, ArrowRight, ChevronRight, User } from "lucide-react";
import { Link } from "@/i18n/routing";
import { PostBody } from "@/components/PostBody";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { MdxBody } from "@/components/MdxBody";
import { BlogCta } from "@/components/BlogCta";
import { RelatedGuides, type RelatedLink } from "@/components/RelatedGuides";
import { posts, getPost } from "@/data/posts";
import { districts } from "@/data/districts";
import { getMdxPosts, getMdxPost } from "@/lib/mdx-blog";
import { loc } from "@/lib/i18n-data";
import { buildAlternates, buildLocaleUrl } from "@/lib/seo";
import { BLUR_KUM } from "@/lib/blur";
import { buildHowToSchema } from "@/lib/blog-howto";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.bodrumapartkiralama.com";

const FALLBACK_HERO = "/blog/bodrum-tatil-rehberi/hero.webp";

// 4 dilli sabitler — tr/en ikili ternary'ler de/ru'yu İngilizceye düşürüyordu
// (district sayfasındaki homeLabel deseniyle aynı çözüm). Görünür breadcrumb
// ve JSON-LD name aynı kaynaktan beslenir.
const HOME_LABEL: Record<string, string> = {
  tr: "Ana Sayfa",
  en: "Home",
  de: "Startseite",
  ru: "Главная",
};

const DATE_LOCALE: Record<string, string> = {
  tr: "tr-TR",
  en: "en-GB",
  de: "de-DE",
  ru: "ru-RU",
};

const FAQ_TITLE: Record<string, string> = {
  tr: "Sıkça Sorulanlar",
  en: "Frequently Asked Questions",
  de: "Häufige Fragen",
  ru: "Частые вопросы",
};

const RELATED_DISTRICTS_TITLE: Record<string, string> = {
  tr: "İlgili Bölgeler",
  en: "Related districts",
  de: "Verwandte Regionen",
  ru: "Связанные районы",
};

const EDITOR_TEAM: Record<string, string> = {
  tr: "Bodrumapartkiralama Editör Ekibi",
  en: "Bodrumapartkiralama Editor Team",
  de: "Bodrumapartkiralama-Redaktionsteam",
  ru: "Редакция Bodrumapartkiralama",
};

function pickLabel(map: Record<string, string>, locale: string): string {
  return map[locale] ?? map.en;
}

// Spoke→hub: contextual links surfaced from every blog post (in addition to the
// Bodrum Tatil Rehberi pillar, which RelatedGuides always adds first). Kept
// generic + natural so all posts share one block without hand-editing each one.
const BLOG_RELATED_LINKS: RelatedLink[] = [
  {
    href: "/apartlar",
    labels: {
      tr: "Bodrum apart seçenekleri",
      en: "Bodrum apartments",
      de: "Bodrum-Apartments",
      ru: "Апартаменты в Бодруме",
    },
  },
  {
    href: "/vip-transfer",
    labels: {
      tr: "Havalimanı özel transfer",
      en: "Airport private transfer",
      de: "Flughafen-Privattransfer",
      ru: "Трансфер из аэропорта",
    },
  },
];

export function generateStaticParams() {
  const legacy = posts.map((p) => ({ slug: p.slug }));
  const mdx = getMdxPosts().map((p) => ({ slug: p.slug }));
  // Dedupe — if a slug exists in both, MDX takes precedence in render
  const seen = new Set<string>();
  const all = [...mdx, ...legacy].filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
  return all;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const mdx = getMdxPost(slug, locale);
  if (mdx) {
    const url =
      locale === "tr"
        ? `${SITE_URL}/blog/${mdx.slug}`
        : `${SITE_URL}/${locale}/blog/${mdx.slug}`;
    const heroUrl = mdx.hero_image ?? FALLBACK_HERO;
    return {
      title: mdx.meta_title,
      description: mdx.meta_description,
      alternates: buildAlternates(locale, `/blog/${mdx.slug}`),
      openGraph: {
        title: mdx.title,
        description: mdx.excerpt || mdx.meta_description,
        url,
        type: "article",
        publishedTime: mdx.published_at,
        authors: [mdx.author],
        images: [{ url: heroUrl, width: 1600, height: 900, alt: mdx.hero_image_alt || mdx.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: mdx.title,
        description: mdx.excerpt || mdx.meta_description,
        images: [heroUrl],
      },
    };
  }
  const post = getPost(slug);
  if (!post) return {};
  const title = loc(locale, { tr: post.titleTr, en: post.titleEn, de: post.titleDe, ru: post.titleRu });
  const excerpt = loc(locale, { tr: post.excerptTr, en: post.excerptEn, de: post.excerptDe, ru: post.excerptRu });
  const url =
    locale === "tr"
      ? `${SITE_URL}/blog/${post.slug}`
      : `${SITE_URL}/${locale}/blog/${post.slug}`;
  return {
    title: loc(locale, { tr: post.metaTitleTr, en: post.metaTitleEn, de: post.metaTitleDe, ru: post.metaTitleRu }),
    description: loc(locale, { tr: post.metaDescTr, en: post.metaDescEn, de: post.metaDescDe, ru: post.metaDescRu }),
    alternates: buildAlternates(locale, `/blog/${post.slug}`),
    openGraph: {
      title,
      description: excerpt,
      url,
      type: "article",
      images: [{ url: post.hero, width: 1600, height: 900, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt,
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
  const t = await getTranslations({ locale, namespace: "blog" });

  // MDX-sourced posts (AI-generated; locale variant if present, else TR base)
  const mdx = getMdxPost(slug, locale);
  if (mdx) return renderMdxPost(mdx, locale, t);

  // Legacy hand-authored posts
  const post = getPost(slug);
  if (!post) notFound();

  const dt = await getTranslations({ locale, namespace: "districts" });
  const homeLabel = pickLabel(HOME_LABEL, locale);
  const title = loc(locale, { tr: post.titleTr, en: post.titleEn, de: post.titleDe, ru: post.titleRu });
  const sections =
    locale === "de"
      ? post.contentDe ?? post.contentEn
      : locale === "ru"
        ? post.contentRu ?? post.contentEn
        : locale === "tr"
          ? post.contentTr
          : post.contentEn;
  const faqItems =
    locale === "de"
      ? post.faqDe ?? post.faqEn
      : locale === "ru"
        ? post.faqRu ?? post.faqEn
        : locale === "tr"
          ? post.faqTr
          : post.faqEn;
  const tocItems = sections
    .filter((s): s is Extract<typeof s, { type: "h2" }> => s.type === "h2")
    .map((s) => ({ id: s.id, text: s.text }));

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Locale-aware URL of the editorial-team author profile (E-E-A-T byline link).
  const authorUrl = buildLocaleUrl(locale, "/yazar/editor");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      image: [post.hero],
      datePublished: post.date,
      dateModified: post.date,
      author: {
        // E-E-A-T: December 2025 Google Core Update strongly favors Person
        // authors over Organization for all queries (not just YMYL). Using the
        // brand editorial team byline as Person — semantically a collective,
        // but the type matters more than singular vs. plural for ranking.
        // `url` resolves to the dedicated author/editor profile page so the
        // byline links to a real, crawlable E-E-A-T author entity.
        "@type": "Person",
        name: "Bodrumapartkiralama Editör Ekibi",
        url: authorUrl,
        jobTitle: "Editör",
        worksFor: {
          "@type": "Organization",
          name: "Bodrumapartkiralama.com",
          url: SITE_URL,
        },
      },
      publisher: {
        "@type": "Organization",
        name: "Bodrumapartkiralama.com",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/apart-logo-512.png` },
      },
      mainEntityOfPage: buildLocaleUrl(locale, `/blog/${post.slug}`),
      description: loc(locale, { tr: post.metaDescTr, en: post.metaDescEn, de: post.metaDescDe, ru: post.metaDescRu }),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      // Locale-duyarlı: item URL'leri canonical ile aynı prefix'i taşır,
      // ilk halka 4 dilde (district sayfasındaki desen).
      itemListElement: [
        { "@type": "ListItem", position: 1, name: homeLabel, item: buildLocaleUrl(locale, "") },
        { "@type": "ListItem", position: 2, name: t("h1"), item: buildLocaleUrl(locale, "/blog") },
        { "@type": "ListItem", position: 3, name: title, item: buildLocaleUrl(locale, `/blog/${post.slug}`) },
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
            fetchPriority="high"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_KUM}
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/60 to-navy-900/90" />
          <div className="container-page relative py-14 md:py-20">
            <nav aria-label="breadcrumb" className="mb-3 flex items-center gap-1 text-xs text-white/80">
              <Link href="/" className="hover:underline">{homeLabel}</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/blog" className="hover:underline">{t("h1")}</Link>
            </nav>
            <span className="chip-accent">{loc(locale, post.category)}</span>
            <h1 className="mt-4 max-w-3xl text-white">{title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/85">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString(pickLabel(DATE_LOCALE, locale), {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" /> {t("readingTime", { min: post.readingTime })}
              </span>
              <Link
                href="/yazar/editor"
                className="inline-flex items-center gap-1 underline-offset-2 hover:underline"
              >
                <User className="h-4 w-4" />
                {pickLabel(EDITOR_TEAM, locale)}
              </Link>
            </div>
          </div>
        </section>

        <section className="container-page py-10 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            <div className="min-w-0">
              <PostBody sections={sections} />
              {faqItems.length > 0 && (
                <>
                  <h2 className="mt-12 text-2xl">{pickLabel(FAQ_TITLE, locale)}</h2>
                  <div className="mt-4">
                    <FAQ items={faqItems} />
                  </div>
                </>
              )}
              <RelatedGuides locale={locale} links={BLOG_RELATED_LINKS} />
              <BlogCta locale={locale} />
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
                    {pickLabel(RELATED_DISTRICTS_TITLE, locale)}
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
                      alt={loc(locale, { tr: p.titleTr, en: p.titleEn, de: p.titleDe, ru: p.titleRu })}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      placeholder="blur"
                      blurDataURL={BLUR_KUM}
                      className="object-cover transition group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2 p-5">
                    <span className="chip">{loc(locale, p.category)}</span>
                    <h3 className="text-base leading-snug">{loc(locale, { tr: p.titleTr, en: p.titleEn, de: p.titleDe, ru: p.titleRu })}</h3>
                    <p className="line-clamp-2 text-sm text-muted">{loc(locale, { tr: p.excerptTr, en: p.excerptEn, de: p.excerptDe, ru: p.excerptRu })}</p>
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

// =========================================================================
// MDX renderer — for AI-generated posts (Turkish only). Site-locale aware
// for chrome but the article body itself is always Turkish.
// =========================================================================
function renderMdxPost(
  mdx: NonNullable<ReturnType<typeof getMdxPost>>,
  locale: string,
  t: Awaited<ReturnType<typeof getTranslations<"blog">>>,
) {
  const homeLabel = pickLabel(HOME_LABEL, locale);
  const heroUrl = mdx.hero_image ?? FALLBACK_HERO;
  // Locale-aware URL of the editorial-team author profile (E-E-A-T byline link).
  const authorUrl = buildLocaleUrl(locale, "/yazar/editor");
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: mdx.title,
    description: mdx.meta_description,
    image: [heroUrl],
    datePublished: mdx.published_at,
    dateModified: mdx.published_at,
    author: {
      // Point the Person URL at the dedicated editorial-team author profile
      // (/yazar/editor) so the byline links to a real, crawlable E-E-A-T author
      // entity. worksFor anchors authorship to the publishing organization.
      "@type": "Person",
      name: mdx.author,
      url: authorUrl,
      jobTitle: "Editör",
      worksFor: {
        "@type": "Organization",
        name: "Bodrumapartkiralama.com",
        url: SITE_URL,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Bodrumapartkiralama.com",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/apart-logo-512.png` },
    },
    mainEntityOfPage: buildLocaleUrl(locale, `/blog/${mdx.slug}`),
    keywords: mdx.keywords.join(", "),
    // Speakable (AEO / voice): point assistants at the answer-first intro
    // headline + summary and the FAQ questions for spoken snippets.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable='intro']"],
    },
  };

  const pageUrl = buildLocaleUrl(locale, `/blog/${mdx.slug}`);
  const howToSchema = buildHowToSchema(mdx.slug, pageUrl);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    // Locale-duyarlı item URL'leri + 4 dilli ilk halka (district deseni).
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel, item: buildLocaleUrl(locale, "") },
      { "@type": "ListItem", position: 2, name: "Blog", item: buildLocaleUrl(locale, "/blog") },
      { "@type": "ListItem", position: 3, name: mdx.title, item: buildLocaleUrl(locale, `/blog/${mdx.slug}`) },
    ],
  };

  const faqSchema =
    mdx.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: mdx.faq.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }
      : null;

  const jsonLd = [articleSchema, breadcrumbSchema, faqSchema, howToSchema].filter(
    Boolean,
  ) as object[];

  return (
    <>
      <JsonLd data={jsonLd} />
      <article>
        {mdx.reklam_disclosure && (
          <div className="bg-navy-50 border-b border-navy-100">
            <div className="container-page py-2 text-center text-xs text-navy-900">
              <strong>#reklam</strong> · Bu yazıda işletme/marka adı geçtiği için yasal uyumluluk gereği reklam etiketi taşır.
            </div>
          </div>
        )}
        <section className="relative overflow-hidden bg-navy-900 text-white">
          <Image
            src={heroUrl}
            alt={mdx.hero_image_alt || mdx.title}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_KUM}
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/60 to-navy-900/90" />
          <div className="container-page relative py-14 md:py-20">
            <nav aria-label="breadcrumb" className="mb-3 flex items-center gap-1 text-xs text-white/80">
              <Link href="/" className="hover:underline">{homeLabel}</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/blog" className="hover:underline">{t("h1")}</Link>
            </nav>
            <span className="chip-accent">{mdx.category.tr}</span>
            <h1 className="mt-4 max-w-3xl text-white">{mdx.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/85">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(mdx.published_at).toLocaleDateString(pickLabel(DATE_LOCALE, locale), {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" /> {t("readingTime", { min: mdx.reading_time_min })}
              </span>
              <Link
                href="/yazar/editor"
                className="inline-flex items-center gap-1 underline-offset-2 hover:underline"
              >
                <User className="h-4 w-4" />
                Editör Ekibi
              </Link>
            </div>
          </div>
        </section>

        <section className="container-page py-10 lg:py-14">
          <div className="mx-auto max-w-3xl">
            {mdx.excerpt && (
              <p
                data-speakable="intro"
                className="mb-6 border-l-4 border-accent-500 bg-navy-50/40 px-4 py-3 text-base italic text-ink"
              >
                {mdx.excerpt}
              </p>
            )}
            <MdxBody source={mdx.body_md} />

            {mdx.faq.length > 0 && (
              <>
                <h2 className="mt-12 text-2xl">Sıkça Sorulanlar</h2>
                <div className="mt-4">
                  <FAQ items={mdx.faq} />
                </div>
              </>
            )}

            <AuthorBio />

            <RelatedGuides locale={locale} links={BLOG_RELATED_LINKS} />

            <BlogCta locale={locale} />
          </div>
        </section>
      </article>
    </>
  );
}

function AuthorBio() {
  return (
    <div className="mt-10 flex gap-4 rounded-xl border border-[var(--color-border)] bg-white p-5">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy-100 text-sm font-bold text-navy-900">
        BAK
      </div>
      <div>
        <h3 className="text-base font-bold">
          <Link
            href="/yazar/editor"
            className="underline-offset-2 hover:underline"
          >
            Bodrumapartkiralama Editör Ekibi
          </Link>
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Bodrum yarımadasında apart kiralama yönetimi yapan ekibimiz; Yalıkavak,
          Gümbet, Turgutreis başta olmak üzere bölgedeki konaklama dinamiklerini
          yerinden takip ediyor.{" "}
          <Link
            href="/yazar/editor"
            className="font-medium text-navy-600 underline-offset-2 hover:underline"
          >
            Ekip hakkında daha fazlası →
          </Link>
        </p>
      </div>
    </div>
  );
}
