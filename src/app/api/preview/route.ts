import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Enter Next.js draft mode (live preview of unpublished `draft` content).
 *
 *   GET /api/preview?secret=...&path=/en
 *
 * If `secret` matches CONTENT_PREVIEW_SECRET, enable draft mode and redirect to
 * `path` (default "/"). Otherwise 401.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const path = searchParams.get("path") || "/";

  const expected = process.env.CONTENT_PREVIEW_SECRET;
  if (!expected || secret !== expected) {
    return new NextResponse("Invalid token", { status: 401 });
  }

  (await draftMode()).enable();

  // Only allow same-origin relative paths (avoid open redirect).
  const safePath = path.startsWith("/") ? path : "/";
  redirect(safePath);
}
