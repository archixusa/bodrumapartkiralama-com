import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";

/** Canonical host for the site — always the www subdomain. */
const CANONICAL_HOST = "www.bodrumapartkiralama.com";

/**
 * Constant-time secret comparison (avoids timing side-channels on the gate).
 * Returns false for any missing/empty input so a wrong/absent secret is 401.
 */
function secretsMatch(provided: string | null, expected: string | undefined): boolean {
  if (!provided || !expected) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/**
 * On-publish revalidation hook (lets the admin panel push a publish live in seconds).
 *
 *   POST /api/revalidate?secret=...
 *   body: { "paths"?: string[], "tags"?: string[] }
 *
 * If `secret` matches CONTENT_REVALIDATE_SECRET, revalidate each given path and/or
 * tag and return { revalidated: true }. Otherwise 401.
 *
 * Tags used by the content engine: "site_content" (all sections) and
 * "content:<section_key>" (one section, e.g. "content:home.hero").
 */
export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (!secretsMatch(secret, process.env.CONTENT_REVALIDATE_SECRET)) {
    return NextResponse.json({ revalidated: false, message: "Invalid token" }, {
      status: 401,
    });
  }

  let body: { paths?: string[]; tags?: string[] } = {};
  try {
    body = (await request.json()) as { paths?: string[]; tags?: string[] };
  } catch {
    body = {};
  }

  const paths = Array.isArray(body.paths) ? body.paths : [];
  const tags = Array.isArray(body.tags) ? body.tags : [];

  for (const p of paths) {
    if (typeof p === "string" && p.startsWith("/")) revalidatePath(p);
  }
  for (const tag of tags) {
    if (typeof tag === "string" && tag.length > 0) revalidateTag(tag);
  }

  // Fire-and-forget: ping IndexNow (Bing/Yandex) for the revalidated paths so a
  // freshly published page gets re-crawled fast. Only `paths` map to URLs; tags
  // are skipped. submitToIndexNow already swallows its own errors, and we don't
  // await it, so this never affects the revalidate response on the happy path.
  const indexNowUrls = Array.from(
    new Set(
      paths
        .filter((p) => typeof p === "string" && p.startsWith("/"))
        .map((p) => `https://${CANONICAL_HOST}${p}`)
    )
  );
  if (indexNowUrls.length > 0) {
    void submitToIndexNow(indexNowUrls, CANONICAL_HOST);
  }

  return NextResponse.json({
    revalidated: true,
    paths,
    tags,
    now: Date.now(),
  });
}
