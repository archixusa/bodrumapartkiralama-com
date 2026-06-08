// Twitter card image — same branded composition as the Open Graph image.
// Next.js auto-injects this as <meta name="twitter:image"> on every route in
// this segment. Paired with twitter.card = "summary_large_image" in the root
// metadata so the large card renders correctly.
export { default, runtime, alt, size, contentType } from "./opengraph-image";
