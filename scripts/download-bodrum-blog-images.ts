import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const KEY =
  process.env.UNSPLASH_ACCESS_KEY ??
  "PsP7BnoIcwprM-olglRVIZlrNGNdS0oJQ1Ngq3mKIdI";

interface Blog {
  slug: string;
  queries: string[]; // tried in order until one returns results
}

// Site 1 — bodrumapartkiralama (warm / family / practical)
const SITE1_BLOGS: Blog[] = [
  // ── Legacy posts from src/data/posts.ts ──────────────────────────────────
  {
    slug: "bodrum-tatil-rehberi",
    queries: [
      "Bodrum Turkey peninsula coast",
      "Bodrum harbor Turkey",
      "Bodrum Aegean Turkey",
    ],
  },
  {
    slug: "bodrum-plajlari",
    queries: [
      "Bodrum beach Turkey turquoise",
      "Bitez beach Bodrum Turkey",
      "Aegean Turkey blue flag beach",
    ],
  },
  {
    slug: "bodrum-tekne-turu-rehberi",
    queries: [
      "Bodrum boat tour Turkey gulet",
      "Bodrum yacht Aegean Turkey",
      "Turkey gulet blue cruise",
    ],
  },
  // ── MDX posts from content/blog/*.mdx ────────────────────────────────────
  {
    slug: "bodrum-ortakent-cocuklu-ailelere-uygun-aktiviteler",
    queries: [
      "Bodrum Ortakent beach family Turkey",
      "Aegean Turkey family beach shallow",
      "Bodrum peninsula sandy beach kids",
    ],
  },
  {
    slug: "gumbetten-bodrum-kalesine-yuruyerek-nasil-gidilir",
    queries: [
      "Bodrum Castle Turkey harbor",
      "Bodrum Kalesi Saint Peter",
      "Bodrum St Peter Castle Turkey",
    ],
  },
  {
    slug: "gundugan-plaji-mayis-ayi-rehberi",
    queries: [
      "Bodrum Gundogan beach Turkey",
      "Bodrum quiet bay Turkey Aegean",
      "Aegean Turkey calm bay village",
    ],
  },
  {
    slug: "bodrum-turgutreis-pazari-hangi-gun-acik-ne-alinir",
    queries: [
      "Turgutreis market Turkey",
      "Turkish bazaar Aegean fruit",
      "Turkish village market produce",
    ],
  },
];

async function unsplash(q: string): Promise<{ url: string; credit: string } | null> {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    q,
  )}&per_page=5&orientation=landscape&content_filter=high`;
  const r = await fetch(url, {
    headers: { Authorization: `Client-ID ${KEY}` },
  });
  if (!r.ok) {
    console.error(`  ⚠  Unsplash HTTP ${r.status} for "${q}"`);
    return null;
  }
  const j = (await r.json()) as {
    results?: Array<{
      urls?: { raw?: string };
      user?: { name?: string; username?: string };
    }>;
  };
  const first = j.results?.[0];
  if (!first?.urls?.raw) return null;
  return {
    url: first.urls.raw + "&w=2400&q=85",
    credit: `${first.user?.name ?? "Unknown"} (@${first.user?.username ?? "unknown"})`,
  };
}

async function downloadOptimize(
  url: string,
  out: string,
  w: number,
  h: number,
) {
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  await fs.mkdir(path.dirname(out), { recursive: true });
  await sharp(buf)
    .resize(w, h, { fit: "cover" })
    .webp({ quality: 85, effort: 6 })
    .toFile(out);
}

async function processBlog(b: Blog) {
  console.log(`\n📝 ${b.slug}`);
  let hit: { url: string; credit: string } | null = null;
  let usedQuery = "";
  for (const q of b.queries) {
    hit = await unsplash(q);
    if (hit) {
      usedQuery = q;
      break;
    }
    await new Promise((r) => setTimeout(r, 1200));
  }
  if (!hit) {
    console.error(`  ❌ no result for ${b.slug}`);
    return null;
  }
  console.log(`  ✓ via: "${usedQuery}"`);
  console.log(`    by: ${hit.credit}`);

  const heroPath = `public/blog/${b.slug}/hero.webp`;
  const cardPath = `public/blog/${b.slug}/card.webp`;
  await downloadOptimize(hit.url, heroPath, 1600, 900);
  await downloadOptimize(hit.url, cardPath, 800, 600);
  console.log(`  ✓ saved hero + card`);
  return {
    slug: b.slug,
    hero: `/blog/${b.slug}/hero.webp`,
    card: `/blog/${b.slug}/card.webp`,
    query: usedQuery,
    credit: hit.credit,
  };
}

async function main() {
  const blogs = SITE1_BLOGS;
  const results: Array<NonNullable<Awaited<ReturnType<typeof processBlog>>>> = [];
  for (const b of blogs) {
    try {
      const r = await processBlog(b);
      if (r) results.push(r);
    } catch (e) {
      console.error(e);
    }
    await new Promise((r) => setTimeout(r, 1500));
  }

  await fs.mkdir("docs", { recursive: true });
  await fs.writeFile(
    "docs/blog-images-review.md",
    "# Blog Images Review\n\n" +
      "Her görsel için Unsplash query'si, fotoğrafçı bilgisi ve manuel kontrol notu.\n\n" +
      results
        .map(
          (r) =>
            `## ${r.slug}\n` +
            `- Hero: \`${r.hero}\`\n` +
            `- Card: \`${r.card}\`\n` +
            `- Query: \`${r.query}\`\n` +
            `- Photo by: ${r.credit} on Unsplash\n` +
            `- [ ] Manuel doğrula: görsel Bodrum'a uygun mu?\n`,
        )
        .join("\n"),
  );
  console.log(`\n✅ Done. ${results.length}/${blogs.length} blogs processed.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
