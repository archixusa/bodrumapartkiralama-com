import { Home, BedDouble, MapPin, MessageCircle } from "lucide-react";

/**
 * On-brand 404 page.
 *
 * - Returns HTTP 404 (Next.js sets the status for not-found boundaries).
 * - Brand rule: the kiralama site uses NO gold/amber. Palette is navy/blue
 *   (navy-900 #042C53 and friends), warm family tone, native Turkish.
 * - Links use literal UNPREFIXED root paths (Turkish is served at root under
 *   `as-needed` locale routing) so a click lands directly on the real page
 *   without a 307 prefix redirect. Plain <a> is used so the URL is exact
 *   regardless of the detected locale of the 404 boundary.
 * - WhatsApp number is the brand number already used across the site
 *   (WhatsAppFab / messages common.whatsappNumber): 905385124088.
 */
export default function NotFound() {
  const WHATSAPP = "905385124088";
  const waText = encodeURIComponent(
    "Merhaba, bodrumapartkiralama.com sitesinde aradığım sayfayı bulamadım. Yardımcı olabilir misiniz?"
  );

  return (
    <section className="section section-blue">
      <div className="container-page max-w-2xl text-center">
        <p className="font-display text-6xl font-bold text-navy-900 md:text-7xl">
          404
        </p>
        <h1 className="mt-4 text-navy-900">
          Aradığınız sayfa taşınmış olabilir
        </h1>
        <p className="mt-4 text-muted">
          Sitemizi yeniledik ve bazı sayfaların adresleri değişti. Endişe
          etmeyin — aradığınız apartı veya bilgiyi birkaç tıkla bulabilir, ya da
          ekibimize doğrudan ulaşabilirsiniz. Bodrum tatiliniz için buradayız.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="/" className="btn-secondary">
            <Home className="h-4 w-4" />
            Anasayfa
          </a>
          <a href="/apartlar" className="btn-secondary">
            <BedDouble className="h-4 w-4" />
            Apartlar
          </a>
          <a href="/bodrum/gumbet-apart-kiralama" className="btn-secondary">
            <MapPin className="h-4 w-4" />
            Bölgeler
          </a>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-navy-900 px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-navy-200 focus:ring-offset-2"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp ile yazın
          </a>
        </div>
      </div>
    </section>
  );
}
