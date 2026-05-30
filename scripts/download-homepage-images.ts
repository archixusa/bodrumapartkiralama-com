import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const KEY =
  process.env.UNSPLASH_ACCESS_KEY ??
  "PsP7BnoIcwprM-olglRVIZlrNGNdS0oJQ1Ngq3mKIdI";

interface ImageJob {
  out: string; // path under public/
  w: number;
  h: number;
  orientation: "landscape" | "portrait" | "squarish";
  queries: string[]; // tried in order until one returns results
}

// Homepage rental-feel imagery — all queries pinned to Bodrum / Turkey /
// Aegean Turkey so we never surface Greek-island photos.
const JOBS: ImageJob[] = [
  // ── HERO ─────────────────────────────────────────────────────────────────
  {
    out: "public/images/hero/bodrum-hero.webp",
    w: 1920,
    h: 1080,
    orientation: "landscape",
    queries: ["Bodrum Turkey bay sunset", "Bodrum harbor Turkey"],
  },

  // ── SAMPLE PROPERTY INTERIORS (representative Mediterranean interiors) ─────
  {
    out: "public/images/samples/gumbet-apart.webp",
    w: 800,
    h: 600,
    orientation: "landscape",
    queries: ["Mediterranean apartment interior bright"],
  },
  {
    out: "public/images/samples/yalikavak-apart.webp",
    w: 800,
    h: 600,
    orientation: "landscape",
    queries: ["minimalist apartment sea view Turkey"],
  },
  {
    out: "public/images/samples/turgutreis-apart.webp",
    w: 800,
    h: 600,
    orientation: "landscape",
    queries: ["family apartment living room Mediterranean"],
  },
  {
    out: "public/images/samples/bitez-apart.webp",
    w: 800,
    h: 600,
    orientation: "landscape",
    queries: ["cozy apartment balcony Mediterranean"],
  },
  {
    out: "public/images/samples/ortakent-apart.webp",
    w: 800,
    h: 600,
    orientation: "landscape",
    queries: ["apartment Mediterranean garden"],
  },
  {
    out: "public/images/samples/gundogan-apart.webp",
    w: 800,
    h: 600,
    orientation: "landscape",
    queries: ["apartment terrace sea view Turkey"],
  },

  // ── REGION CARDS ──────────────────────────────────────────────────────────
  {
    out: "public/images/regions/gumbet.webp",
    w: 900,
    h: 600,
    orientation: "landscape",
    queries: ["Bodrum Gumbet beach Turkey", "Bodrum beach Turkey turquoise"],
  },
  {
    out: "public/images/regions/turgutreis.webp",
    w: 900,
    h: 600,
    orientation: "landscape",
    queries: ["Turgutreis beach Turkey", "Turgutreis sunset Turkey Aegean"],
  },
  {
    out: "public/images/regions/yalikavak.webp",
    w: 900,
    h: 600,
    orientation: "landscape",
    queries: ["Bodrum Yalikavak marina Turkey", "Yalikavak Turkey harbor"],
  },
  {
    out: "public/images/regions/bitez.webp",
    w: 900,
    h: 600,
    orientation: "landscape",
    queries: ["Bitez Bodrum beach Turkey", "Bitez bay Aegean Turkey"],
  },
  {
    out: "public/images/regions/ortakent.webp",
    w: 900,
    h: 600,
    orientation: "landscape",
    queries: ["Bodrum Ortakent beach Turkey", "Ortakent Yahsi beach Turkey"],
  },
  {
    out: "public/images/regions/gundogan.webp",
    w: 900,
    h: 600,
    orientation: "landscape",
    queries: ["Bodrum Gundogan bay Turkey", "Gundogan beach Aegean Turkey"],
  },

  // ── LIFESTYLE GALLERY ─────────────────────────────────────────────────────
  {
    out: "public/images/lifestyle/beach.webp",
    w: 800,
    h: 800,
    orientation: "squarish",
    queries: ["Bodrum beach turquoise water Turkey"],
  },
  {
    out: "public/images/lifestyle/sunset.webp",
    w: 800,
    h: 1200,
    orientation: "portrait",
    queries: ["Bodrum sunset Turkey", "Bodrum Turkey bay sunset"],
  },
  {
    out: "public/images/lifestyle/marina.webp",
    w: 800,
    h: 800,
    orientation: "squarish",
    queries: ["Bodrum marina yacht Turkey"],
  },
  {
    out: "public/images/lifestyle/dinner.webp",
    w: 800,
    h: 800,
    orientation: "squarish",
    queries: ["Mediterranean seaside dinner Turkey"],
  },
  {
    out: "public/images/lifestyle/boat.webp",
    w: 800,
    h: 800,
    orientation: "squarish",
    queries: ["Bodrum gulet boat tour Turkey", "Turkey gulet blue cruise"],
  },
  {
    out: "public/images/lifestyle/pool.webp",
    w: 800,
    h: 800,
    orientation: "squarish",
    queries: ["villa pool Mediterranean Turkey"],
  },
];

async function unsplash(
  q: string,
  orientation: string,
): Promise<{ url: string; credit: string } | null> {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    q,
  )}&per_page=5&orientation=${orientation}&content_filter=high`;
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

async function downloadOptimize(url: string, out: string, w: number, h: number) {
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  await fs.mkdir(path.dirname(out), { recursive: true });
  await sharp(buf)
    .resize(w, h, { fit: "cover" })
    .webp({ quality: 85, effort: 6 })
    .toFile(out);
}

async function processJob(job: ImageJob) {
  console.log(`\n🖼  ${job.out}`);
  let hit: { url: string; credit: string } | null = null;
  let usedQuery = "";
  for (const q of job.queries) {
    hit = await unsplash(q, job.orientation);
    if (hit) {
      usedQuery = q;
      break;
    }
    await new Promise((r) => setTimeout(r, 1200));
  }
  if (!hit) {
    console.error(`  ❌ no result for ${job.out}`);
    return { out: job.out, ok: false as const };
  }
  console.log(`  ✓ via: "${usedQuery}"`);
  console.log(`    by: ${hit.credit}`);
  await downloadOptimize(hit.url, job.out, job.w, job.h);
  console.log(`  ✓ saved (${job.w}x${job.h})`);
  return {
    out: job.out,
    ok: true as const,
    query: usedQuery,
    credit: hit.credit,
  };
}

async function main() {
  const results: Array<Awaited<ReturnType<typeof processJob>>> = [];
  for (const job of JOBS) {
    try {
      results.push(await processJob(job));
    } catch (e) {
      console.error(e);
      results.push({ out: job.out, ok: false as const });
    }
    await new Promise((r) => setTimeout(r, 1500));
  }

  const ok = results.filter((r) => r.ok);
  const failed = results.filter((r) => !r.ok);

  await fs.mkdir("docs", { recursive: true });
  await fs.writeFile(
    "docs/homepage-images-review.md",
    "# Homepage Images Review\n\n" +
      "Her görsel için Unsplash query'si ve fotoğrafçı bilgisi.\n\n" +
      ok
        .map(
          (r) =>
            `## ${r.out}\n` +
            `- Query: \`${"query" in r ? r.query : ""}\`\n` +
            `- Photo by: ${"credit" in r ? r.credit : ""} on Unsplash\n` +
            `- [ ] Manuel doğrula: görsel Bodrum'a uygun mu?\n`,
        )
        .join("\n") +
      (failed.length
        ? "\n\n## ❌ Başarısız\n" +
          failed.map((r) => `- ${r.out}\n`).join("")
        : ""),
  );

  console.log(`\n✅ Done. ${ok.length}/${results.length} images downloaded.`);
  if (failed.length) {
    console.log(`⚠  Failed (${failed.length}):`);
    failed.forEach((r) => console.log(`   - ${r.out}`));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
