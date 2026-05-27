// =========================================================================
// MDX blog loader — reads content/blog/*.mdx at build time.
//
// New AI-generated blog posts land here as MDX with YAML frontmatter via
// the admin panel "Onayla ve Yayınla (PR aç)" flow. Legacy hand-authored
// posts continue to live in src/data/posts.ts; this loader is a parallel
// source. Both are surfaced through the same blog pages.
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

let cache: MdxPost[] | null = null;

export function getMdxPosts(): MdxPost[] {
  if (cache) return cache;
  if (!fs.existsSync(BLOG_DIR)) {
    cache = [];
    return cache;
  }
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const posts: MdxPost[] = [];
  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const slug = (data.slug as string) ?? file.replace(/\.mdx$/, "");
      const topicCategory = (data.topic_category as string) ?? null;
      posts.push({
        source: "mdx",
        slug,
        title: (data.title as string) ?? slug,
        meta_title: (data.meta_title as string) ?? (data.title as string) ?? slug,
        meta_description: (data.meta_description as string) ?? "",
        excerpt: (data.excerpt as string) ?? "",
        published_at: (data.published_at as string) ?? new Date().toISOString().slice(0, 10),
        author: (data.author as string) ?? "Furkan Şahin",
        author_slug: (data.author_slug as string) ?? "furkan-sahin",
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
      });
    } catch (err) {
      console.error(`[mdx-blog] failed to parse ${file}`, err);
    }
  }
  // newest first
  posts.sort((a, b) => (a.published_at < b.published_at ? 1 : -1));
  cache = posts;
  return cache;
}

export function getMdxPost(slug: string): MdxPost | null {
  return getMdxPosts().find((p) => p.slug === slug) ?? null;
}

export function getMdxSlugs(): string[] {
  return getMdxPosts().map((p) => p.slug);
}
