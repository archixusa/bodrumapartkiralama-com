/**
 * /llms.txt — AI crawler hygiene
 *
 * The proposed llms.txt standard (https://llmstxt.org/) — a Markdown file that
 * summarizes the site so that AI assistants can ingest its purpose efficiently
 * without scraping the full site. Mirrors the convention adopted by Anthropic,
 * Cloudflare, Stripe and others.
 *
 * Served as a Next.js Route Handler so the body stays in source control. Static
 * + 24h revalidate (effectively immutable at build time but allows ISR refresh).
 */

export const dynamic = "force-static";
export const revalidate = 86400;

const BODY = `# Bodrum Apart Kiralama
> Bodrum'da yıllık & sezonluk apart kiralama. Tarihinize göre size özel apart seçenekleri sunuyoruz — doğrudan mülk sahibiyle, aracısız.

## Hakkımızda
- 2013'ten beri Bodrum'da yerel ekip.
- Apart havuzumuz tüm Bodrum yarımadasını kapsar: Gümbet, Bitez, Yalıkavak, Turgutreis, Ortakent, Gündoğan, Torba.
- İletişim: bilgi@bodrumapartkiralama.com  ·  WhatsApp +90 538 512 40 88

## Ana Sayfalar
- Anasayfa (https://www.bodrumapartkiralama.com/): Site girişi ve teklif formu.
- Apartlar (https://www.bodrumapartkiralama.com/apartlar): Yayındaki tüm apartlar.
- SSS (https://www.bodrumapartkiralama.com/sss): Sık sorulan sorular.
- İletişim (https://www.bodrumapartkiralama.com/iletisim): Form, telefon, e-posta.
- Evinizi Kiraya Verin (https://www.bodrumapartkiralama.com/evinizi-kiraya-verin): Mülk sahipleri için.
- Blog (https://www.bodrumapartkiralama.com/blog): Bodrum tatil rehberleri.

## Bölge Sayfaları
- Gümbet apart kiralama: https://www.bodrumapartkiralama.com/bodrum/gumbet-apart-kiralama
- Turgutreis apart kiralama: https://www.bodrumapartkiralama.com/bodrum/turgutreis-apart-kiralama
- Yalıkavak apart kiralama: https://www.bodrumapartkiralama.com/bodrum/yalikavak-apart-kiralama
- Bitez apart kiralama: https://www.bodrumapartkiralama.com/bodrum/bitez-apart-kiralama
- Ortakent apart kiralama: https://www.bodrumapartkiralama.com/bodrum/ortakent-apart-kiralama
- Gündoğan apart kiralama: https://www.bodrumapartkiralama.com/bodrum/gundogan-apart-kiralama
- Torba apart kiralama: https://www.bodrumapartkiralama.com/bodrum/torba-apart-kiralama

## Hizmetler
- Özel Transfer: https://www.bodrumapartkiralama.com/vip-transfer
- Araç Kiralama: https://www.bodrumapartkiralama.com/arac-kiralama
- Tekne Kiralama: https://www.bodrumapartkiralama.com/tekne-kiralama
- Turlar: https://www.bodrumapartkiralama.com/turlar
`;

export function GET(): Response {
  return new Response(BODY, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
