import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

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

  const expected = process.env.CONTENT_REVALIDATE_SECRET;
  if (!expected || secret !== expected) {
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

  return NextResponse.json({
    revalidated: true,
    paths,
    tags,
    now: Date.now(),
  });
}
