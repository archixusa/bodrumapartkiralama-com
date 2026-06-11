import type { MetadataRoute } from "next";
import { districts } from "@/data/districts";
import { posts } from "@/data/posts";
import { getMdxPosts } from "@/lib/mdx-blog";
import { routing } from "@/i18n/routing";
import { buildLocaleUrl } from "@/lib/seo";

/**
 * Hreflang seti HTML head'deki setle TEK kaynaktan (buildLocaleUrl) üretilir —
 * eski yerel urlFor() kök yolda `/en/` (sondaki slash'li, 308 yönlendiren)
 * üretiyordu ve x-default hiç yoktu; HTML'deki set slash'sız + x-default'luydu
 * (hakem bulgusu: sitemap ↔ HTML çelişkisi). buildLocaleUrl kök istisnasını
 * zaten içerir (path "" → slash'sız `${SITE_URL}/${locale}`).
 *
 * lastmod: 24 statik/bölge girdisine aynı build timestamp'i basılıyordu —
 * yanıltıcı sinyal olduğundan bu girdilerden kaldırıldı; blog girdileri gerçek
 * yayın tarihini taşımaya devam eder. changefreq/priority Google tarafından
 * yok sayılan alanlardır — tamamen kaldırıldı.
 */
function languagesFor(path: string): Record<string, string> {
  const cleanPath = path === "/" ? "" : path;
  return {
    ...Object.fromEntries(
      routing.locales.map((l) => [l, buildLocaleUrl(l, cleanPath)])
    ),
    "x-default": buildLocaleUrl(routing.defaultLocale, cleanPath),
  };
}

function entryFor(path: string, lastModified?: Date): MetadataRoute.Sitemap[number] {
  const cleanPath = path === "/" ? "" : path;
  return {
    url: buildLocaleUrl(routing.defaultLocale, cleanPath),
    ...(lastModified ? { lastModified } : {}),
    alternates: { languages: languagesFor(path) },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/apartlar",
    "/bodrum-tatil-rehberi",
    "/tekne-kiralama",
    "/arac-kiralama",
    "/vip-transfer",
    "/turlar",
    "/blog",
    "/hakkimizda",
    "/yazar/editor",
    "/iletisim",
    "/sss",
    "/kvkk",
    "/kullanim-sartlari",
    "/iptal-iade-politikasi",
    "/cerez-politikasi",
    "/evinizi-kiraya-verin",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    entries.push(entryFor(path));
  }

  // NOTE: /apartlar/[slug] detail pages are notFound() placeholders pre-launch
  // (see src/app/[locale]/apartlar/[slug]/page.tsx) — do NOT emit them to the
  // sitemap or Google will index 404s. Re-add this loop when real property
  // detail pages ship.

  for (const d of districts) {
    entries.push(entryFor(`/bodrum/${d.urlSlug}`));
  }

  for (const p of posts) {
    entries.push(entryFor(`/blog/${p.slug}`, new Date(p.date)));
  }

  // MDX-sourced (AI-generated) blog posts
  const mdxSlugs = new Set(posts.map((p) => p.slug));
  for (const m of getMdxPosts()) {
    if (mdxSlugs.has(m.slug)) continue; // skip if already in legacy
    entries.push(entryFor(`/blog/${m.slug}`, new Date(m.published_at)));
  }

  return entries;
}
