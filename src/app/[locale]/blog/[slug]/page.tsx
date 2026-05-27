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
import { posts, getPost } from "@/data/posts";
import { districts } from "@/data/districts";
import { getMdxPosts, getMdxPost } from "@/lib/mdx-blog";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

const FALLBACK_HERO =
  "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=2000&q=80";

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
  const mdx = getMdxPost(slug);
  if (mdx) {
    const url =
      locale === "tr"
        ? `${SITE_URL}/blog/${mdx.slug}`
        : `${SITE_URL}/${locale}/blog/${mdx.slug}`;
    const heroUrl = mdx.hero_image ?? FALLBACK_HERO;
    return {
      title: mdx.meta_title,
      description: mdx.meta_description,
      alternates: { canonical: url },
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
  const t = await getTranslations({ locale, namespace: "blog" });

  // MDX-sourced posts (AI-generated, single-language Turkish)
  const mdx = getMdxPost(slug);
  if (mdx) return renderMdxPost(mdx, locale, t);

  // Legacy hand-authored posts
  const post = getPost(slug);
  if (!post) notFound();

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

// =========================================================================
// MDX renderer — for AI-generated posts (Turkish only). Site-locale aware
// for chrome but the article body itself is always Turkish.
// =========================================================================
function renderMdxPost(
  mdx: NonNullable<ReturnType<typeof getMdxPost>>,
  locale: string,
  t: Awaited<ReturnType<typeof getTranslations<"blog">>>,
) {
  const isTr = locale === "tr";
  const heroUrl = mdx.hero_image ?? FALLBACK_HERO;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: mdx.title,
    description: mdx.meta_description,
    image: [heroUrl],
    datePublished: mdx.published_at,
    dateModified: mdx.published_at,
    author: {
      "@type": "Person",
      name: mdx.author,
      url: `${SITE_URL}/yazar/${mdx.author_slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Bodrumapartkiralama.com",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo_kare.svg` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${mdx.slug}`,
    keywords: mdx.keywords.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isTr ? "Ana Sayfa" : "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: mdx.title, item: `${SITE_URL}/blog/${mdx.slug}` },
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

  const jsonLd = [articleSchema, breadcrumbSchema, faqSchema].filter(Boolean) as object[];

  return (
    <>
      <JsonLd data={jsonLd} />
      <article>
        {mdx.reklam_disclosure && (
          <div className="bg-amber-50 border-b border-amber-200">
            <div className="container-page py-2 text-center text-xs text-amber-900">
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
            <span className="chip-accent">{mdx.category.tr}</span>
            <h1 className="mt-4 max-w-3xl text-white">{mdx.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/85">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(mdx.published_at).toLocaleDateString(isTr ? "tr-TR" : "en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" /> {t("readingTime", { min: mdx.reading_time_min })}
              </span>
              <span className="inline-flex items-center gap-1">
                <User className="h-4 w-4" />
                <Link href={`/yazar/${mdx.author_slug}`} className="underline hover:text-white">
                  {mdx.author}
                </Link>
              </span>
            </div>
          </div>
        </section>

        <section className="container-page py-10 lg:py-14">
          <div className="mx-auto max-w-3xl">
            {mdx.excerpt && (
              <p className="mb-6 border-l-4 border-accent-500 bg-navy-50/40 px-4 py-3 text-base italic text-ink">
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

            <div className="mt-10 rounded-xl border border-accent-500/30 bg-accent-500/5 p-6">
              <h3 className="text-lg font-bold">Bodrum'da Aile İçin Apart Arıyor musun?</h3>
              <p className="mt-2 text-sm text-muted">
                Yalıkavak'tan Turgutreis'e, doğrulanmış apart seçeneklerimize göz at — anahtar teslim, garanti fiyat.
              </p>
              <Link
                href="/apartlar"
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
              >
                Apartları Gör <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

function AuthorBio() {
  return (
    <div className="mt-10 flex gap-4 rounded-xl border border-[var(--color-border)] bg-white p-5">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy-100 text-2xl font-bold text-navy-900">
        FŞ
      </div>
      <div>
        <h3 className="text-base font-bold">Bodrumapartkiralama Editör Ekibi</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Bodrum'da 5 yıldır apart/villa kiralama yöneticisi olarak çalışıyor.
          Yalıkavak, Gümbet, Turgutreis başta olmak üzere bölgedeki konaklama
          dinamiklerini ilk elden biliyor.
        </p>
        <Link
          href="/blog"
          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-navy-700 hover:text-navy-900"
        >
          Profil & tüm yazıları <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
