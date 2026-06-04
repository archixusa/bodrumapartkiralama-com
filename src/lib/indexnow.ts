/**
 * IndexNow submission helper.
 *
 * IndexNow lets us proactively tell Bing/Yandex (and partners) that URLs have
 * changed, so re-crawling happens in hours instead of weeks — useful during the
 * post-migration indexing recovery.
 *
 * The verification key is published as a static file at
 *   https://<host>/<key>.txt
 * (see public/8008347f8b6106765fdf3b6e9a56b126.txt). The same value is the
 * default key below; override via INDEXNOW_KEY if the public file is rotated.
 *
 * This module only exports the utility. It is intentionally NOT wired into any
 * build/revalidate flow yet — call submitToIndexNow(...) from a route/action
 * when you want to ping the engines.
 */

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

/** Default key — matches the published public/<key>.txt verification file. */
const DEFAULT_KEY = "8008347f8b6106765fdf3b6e9a56b126";

export interface IndexNowResult {
  ok: boolean;
  status?: number;
  error?: string;
}

/**
 * Submit one or more URLs to IndexNow.
 *
 * @param urls Absolute URLs to submit (must all be on `host`).
 * @param host Bare host, e.g. "www.bodrumapartkiralama.com".
 * @param key  IndexNow key; defaults to INDEXNOW_KEY env var, else DEFAULT_KEY.
 */
export async function submitToIndexNow(
  urls: string[],
  host: string,
  key: string = process.env.INDEXNOW_KEY || DEFAULT_KEY
): Promise<IndexNowResult> {
  const urlList = (urls || []).filter(
    (u) => typeof u === "string" && u.length > 0
  );

  if (urlList.length === 0) {
    return { ok: false, error: "No URLs to submit" };
  }
  if (!host) {
    return { ok: false, error: "Missing host" };
  }

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host,
        key,
        keyLocation: `https://${host}/${key}.txt`,
        urlList,
      }),
    });

    return { ok: res.ok, status: res.status };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
