// =========================================================================
// MDX blog loader — reads content/blog/*.mdx at build time.
//
// New AI-generated blog posts land here as MDX with YAML frontmatter via
// the admin panel "Onayla ve Yayınla (PR aç)" flow. Legacy hand-authored
// posts continue to live in src/data/posts.ts; this loader is a parallel
// source. Both are surfaced through the same blog pages.
//
// Locale-aware: the Turkish base post lives at `content/blog/<slug>.mdx`.
// Translated siblings live at `content/blog/<slug>.<locale>.mdx` where
// locale is one of en|de|ru. When a locale is requested and a sidecar
// exists, the loader returns the translation; otherwise it falls back to
// the Turkish base. Translation files are optional — until they exist,
// en/de/ru render the Turkish base.
//
// Used server-side only (Node fs). Do not import from a client component.
// =========================================================================

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface MdxPost {
  source: "mdx";
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  excerpt: string;
  published_at: string; // YYYY-MM-DD
  author: string;
  author_slug: string;
  hero_image: string | null;
  hero_image_alt: string;
  reading_time_min: number;
  word_count: number;
  keywords: string[];
  faq: Array<{ q: string; a: string }>;
  schema_jsonld: Record<string, unknown> | null;
  reklam_disclosure: boolean;
  topic: string | null;
  topic_category: string | null;
  body_md: string;
  // For category chip display
  category: { tr: string; en: string };
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// Locales that may appear as a filename suffix `<slug>.<locale>.mdx`.
// The TR base has no suffix (`<slug>.mdx`).
const TRANSLATION_LOCALES = ["en", "de", "ru"] as const;
type TranslationLocale = (typeof TRANSLATION_LOCALES)[number];

function isTranslationLocale(x: string): x is TranslationLocale {
  return (TRANSLATION_LOCALES as readonly string[]).includes(x);
}

// Per-slug bundle: the TR base plus any translated siblings.
interface SlugBundle {
  tr: MdxPost;
  en?: MdxPost;
  de?: MdxPost;
  ru?: MdxPost;
}

function parseSchema(raw: unknown): Record<string, unknown> | null {
  if (!raw) return null;
  if (typeof raw === "object") return raw as Record<string, unknown>;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return null;
}

function categoryFromTopic(topicCategory: string | null): { tr: string; en: string } {
  const map: Record<string, { tr: string; en: string }> = {
    destination_guide: { tr: "Bölge Rehberi", en: "Guide" },
    seasonal: { tr: "Mevsimsel", en: "Seasonal" },
    long_tail_seo: { tr: "Rehber", en: "Guide" },
    travel_tips: { tr: "Seyahat Tüyoları", en: "Travel Tips" },
    local_food: { tr: "Gastronomi", en: "Food" },
    activity: { tr: "Aktivite", en: "Activity" },
    event: { tr: "Etkinlik", en: "Event" },
    how_to: { tr: "Nasıl Yapılır", en: "How-To" },
  };
  if (topicCategory && map[topicCategory]) return map[topicCategory];
  return { tr: "Blog", en: "Blog" };
}

// Classify a `.mdx` filename into its base slug and optional translation
// locale. A file is treated as a translation ONLY if the segment directly
// before `.mdx` is exactly en/de/ru — slugs are hyphenated and never end
// in a bare locale segment, so this is unambiguous here.
function classifyFile(file: string): { slug: string; locale: "tr" | TranslationLocale } | null {
  if (!file.endsWith(".mdx")) return null;
  const stem = file.slice(0, -".mdx".length); // strip ".mdx"
  const lastDot = stem.lastIndexOf(".");
  if (lastDot !== -1) {
    const maybeLocale = stem.slice(lastDot + 1);
    if (isTranslationLocale(maybeLocale)) {
      const slug = stem.slice(0, lastDot);
      if (slug.length > 0) return { slug, locale: maybeLocale };
    }
  }
  return { slug: stem, locale: "tr" };
}

function buildPost(file: string, fallbackSlug: string): MdxPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = (data.slug as string) ?? fallbackSlug;
  const topicCategory = (data.topic_category as string) ?? null;
  return {
    source: "mdx",
    slug,
    title: (data.title as string) ?? slug,
    meta_title: (data.meta_title as string) ?? (data.title as string) ?? slug,
    meta_description: (data.meta_description as string) ?? "",
    excerpt: (data.excerpt as string) ?? "",
    published_at: (data.published_at as string) ?? new Date().toISOString().slice(0, 10),
    author: (data.author as string) ?? "Bodrumapartkiralama Editör Ekibi",
    author_slug: (data.author_slug as string) ?? "editor",
    hero_image: (data.hero_image as string | null) ?? null,
    hero_image_alt: (data.hero_image_alt as string) ?? "",
    reading_time_min: (data.reading_time_min as number) ?? 5,
    word_count: (data.word_count as number) ?? 0,
    keywords: Array.isArray(data.keywords) ? (data.keywords as string[]) : [],
    faq: Array.isArray(data.faq) ? (data.faq as Array<{ q: string; a: string }>) : [],
    schema_jsonld: parseSchema(data.schema_jsonld),
    reklam_disclosure: !!data.reklam_disclosure,
    topic: (data.topic as string) ?? null,
    topic_category: topicCategory,
    body_md: content,
    category: categoryFromTopic(topicCategory),
  };
}

// slug -> { tr, en?, de?, ru? }. Built once, lazily.
let bundleCache: Map<string, SlugBundle> | null = null;

function getBundles(): Map<string, SlugBundle> {
  if (bundleCache) return bundleCache;
  const map = new Map<string, SlugBundle>();
  if (!fs.existsSync(BLOG_DIR)) {
    bundleCache = map;
    return bundleCache;
  }

  // First pass: gather all classified files, keyed by base slug so we can
  // attach translations to a base even if the base is read after them.
  const trFiles: Array<{ file: string; slug: string }> = [];
  const translationFiles: Array<{ file: string; slug: string; locale: TranslationLocale }> = [];
  for (const file of fs.readdirSync(BLOG_DIR)) {
    const cls = classifyFile(file);
    if (!cls) continue;
    if (cls.locale === "tr") trFiles.push({ file, slug: cls.slug });
    else translationFiles.push({ file, slug: cls.slug, locale: cls.locale });
  }

  // Build TR bases first — a translation is only meaningful with a base.
  for (const { file, slug } of trFiles) {
    try {
      const post = buildPost(file, slug);
      map.set(post.slug, { tr: post });
    } catch (err) {
      console.error(`[mdx-blog] failed to parse ${file}`, err);
    }
  }

  // Attach translations to their base bundles. A translation whose base is
  // missing is ignored (orphan sidecar) but logged.
  for (const { file, slug, locale } of translationFiles) {
    const bundle = map.get(slug);
    if (!bundle) {
      console.warn(`[mdx-blog] translation ${file} has no base ${slug}.mdx — ignored`);
      continue;
    }
    try {
      bundle[locale] = buildPost(file, slug);
    } catch (err) {
      console.error(`[mdx-blog] failed to parse ${file}`, err);
    }
  }

  bundleCache = map;
  return bundleCache;
}

function resolveForLocale(bundle: SlugBundle, locale: string): MdxPost {
  if (isTranslationLocale(locale) && bundle[locale]) return bundle[locale]!;
  return bundle.tr;
}

// Per-locale resolved-list cache (newest-first).
const postsCache = new Map<string, MdxPost[]>();

export function getMdxPosts(locale: string = "tr"): MdxPost[] {
  const cached = postsCache.get(locale);
  if (cached) return cached;
  const bundles = getBundles();
  const posts: MdxPost[] = [];
  for (const bundle of Array.from(bundles.values())) {
    posts.push(resolveForLocale(bundle, locale));
  }
  // newest first
  posts.sort((a, b) => (a.published_at < b.published_at ? 1 : -1));
  postsCache.set(locale, posts);
  return posts;
}

export function getMdxPost(slug: string, locale: string = "tr"): MdxPost | null {
  const bundle = getBundles().get(slug);
  if (!bundle) return null;
  return resolveForLocale(bundle, locale);
}

export function getMdxSlugs(): string[] {
  return Array.from(getBundles().keys());
}
