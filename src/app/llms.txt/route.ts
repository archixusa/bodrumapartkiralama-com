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

Bodrumapartkiralama.com, Bodrum yarımadasında apart kiralama hizmeti veren yerel bir platformdur. Sabit bir katalog yerine; misafirin tarih, kişi sayısı ve bölge tercihine göre uygun apartları seçer ve doğrudan mülk sahibiyle iletişimi kolaylaştırır. Süreç şeffaftır ve sitede fiyat listesi tutulmaz; teklif misafire özel olarak iletilir. Site Türkçe, İngilizce, Almanca ve Rusça yayınlanır.

## Hakkımızda
- 2013'ten beri Bodrum'da yerel ekip.
- Apart havuzumuz tüm Bodrum yarımadasını kapsar: Gümbet, Bitez, Yalıkavak, Turgutreis, Ortakent, Gündoğan, Torba.
- Çalışma biçimi: doğrudan mülk sahibi iletişimi, aracısız ve şeffaf süreç, 7/24 yerel misafir desteği.
- İletişim: bilgi@bodrumapartkiralama.com  ·  WhatsApp +90 538 512 40 88

## Ana Sayfalar
- Anasayfa (https://www.bodrumapartkiralama.com/): Site girişi ve teklif formu.
- Apartlar (https://www.bodrumapartkiralama.com/apartlar): Apart koleksiyonu ve teklif talebi.
- SSS (https://www.bodrumapartkiralama.com/sss): Sık sorulan sorular.
- İletişim (https://www.bodrumapartkiralama.com/iletisim): Form, telefon, e-posta.
- Evinizi Kiraya Verin (https://www.bodrumapartkiralama.com/evinizi-kiraya-verin): Mülk sahipleri için.
- Hakkımızda (https://www.bodrumapartkiralama.com/hakkimizda): Ekip ve çalışma yaklaşımı.
- Blog (https://www.bodrumapartkiralama.com/blog): Bodrum tatil ve apart rehberleri.

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

## Blog Rehberleri
- Bodrum'da Apart Kiralarken Dikkat Edilmesi Gereken 10 Şey: https://www.bodrumapartkiralama.com/blog/bodrum-apart-kiralarken-dikkat-edilmesi-gerekenler
- Bodrum Havalimanı'ndan Merkeze ve Bölgelere Ulaşım: https://www.bodrumapartkiralama.com/blog/bodrum-havalimanindan-merkeze-ulasim
- Bodrum'da Ailecek Tatil İçin En Uygun Bölgeler: https://www.bodrumapartkiralama.com/blog/bodrum-ailecek-tatil-en-uygun-bolgeler
- Ortakent'te Çocuklu Ailelere Uygun Aktiviteler: https://www.bodrumapartkiralama.com/blog/bodrum-ortakent-cocuklu-ailelere-uygun-aktiviteler
- Turgutreis Pazarı Hangi Gün Açık, Ne Alınır?: https://www.bodrumapartkiralama.com/blog/bodrum-turgutreis-pazari-hangi-gun-acik-ne-alinir
- Gümbet'ten Bodrum Kalesi'ne Yürüyerek Nasıl Gidilir?: https://www.bodrumapartkiralama.com/blog/gumbetten-bodrum-kalesine-yuruyerek-nasil-gidilir
- Gündoğan Plajı Mayıs Ayı Rehberi: https://www.bodrumapartkiralama.com/blog/gundugan-plaji-mayis-ayi-rehberi
- Yalıkavak Gün Batımı İçin İzlenecek Noktalar: https://www.bodrumapartkiralama.com/blog/yalikavak-gunbatimi-izlenecek-nokta
- Bodrum Tatil Rehberi: https://www.bodrumapartkiralama.com/blog/bodrum-tatil-rehberi
- Bodrum Plajları: https://www.bodrumapartkiralama.com/blog/bodrum-plajlari
- Bodrum Tekne Turu Rehberi: https://www.bodrumapartkiralama.com/blog/bodrum-tekne-turu-rehberi
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
