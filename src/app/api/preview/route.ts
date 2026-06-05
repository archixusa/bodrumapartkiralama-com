import { timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

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

  if (!secretsMatch(secret, process.env.CONTENT_PREVIEW_SECRET)) {
    return new NextResponse("Invalid token", { status: 401 });
  }

  (await draftMode()).enable();

  // Only allow same-origin relative paths (avoid open redirect).
  const safePath = path.startsWith("/") ? path : "/";
  redirect(safePath);
}
