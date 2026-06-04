import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

/**
 * Exit Next.js draft mode (back to published content).
 *
 *   GET /api/preview/exit?path=/en
 *
 * Disables draft mode and redirects to `path` (default "/").
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "/";

  (await draftMode()).disable();

  const safePath = path.startsWith("/") ? path : "/";
  redirect(safePath);
}
