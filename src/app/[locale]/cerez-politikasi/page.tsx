import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalLayout } from "@/components/LegalLayout";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.bodrumapartkiralama.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  const url =
    locale === "tr"
      ? `${SITE_URL}/cerez-politikasi`
      : `${SITE_URL}/${locale}/cerez-politikasi`;
  const title = isTr
    ? "Çerez Politikası — Bodrum Apart Kiralama"
    : "Cookie Policy — Bodrum Apartment Rental";
  const description = isTr
    ? "Bodrumapartkiralama.com çerez politikası: hangi çerezler kullanılır, nasıl yönetilir."
    : "Bodrumapartkiralama.com cookie policy: what cookies we use and how to manage them.";
  return {
    title,
    description,
    alternates: { canonical: url },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = await getTranslations({ locale, namespace: "common" });
  const isTr = locale === "tr";

  return (
    <LegalLayout
      title={isTr ? "Çerez Politikası" : "Cookie Policy"}
      subtitle={
        isTr
          ? "Hangi çerezleri kullanıyoruz ve nasıl yönetilir."
          : "What cookies we use and how to manage them."
      }
      lastUpdate={
        isTr ? "Son güncelleme: 27 Mayıs 2026" : "Last updated: 27 May 2026"
      }
      homeLabel={isTr ? "Ana Sayfa" : "Home"}
    >
      {isTr ? <CerezTr email={c("email")} /> : <CerezEn email={c("email")} />}
    </LegalLayout>
  );
}

function CerezTr({ email }: { email: string }) {
  return (
    <>
      <h2>1. Çerez nedir?</h2>
      <p>
        Çerezler (cookies), web sitelerini ziyaret ettiğinizde tarayıcınız
        tarafından cihazınıza kaydedilen küçük metin dosyalarıdır. Sitenin
        çalışması, tercihlerinizin hatırlanması ve ziyaret istatistiklerinin
        toplanması için kullanılırlar.
      </p>

      <h2>2. Hangi çerezleri kullanıyoruz?</h2>
      <p>
        Bodrumapartkiralama.com&apos;da aşağıdaki kategorilerde çerez kullanırız:
      </p>
      <ul>
        <li>
          <strong>Zorunlu çerezler:</strong> Sitenin temel işlevleri için
          gereklidir (oturum, dil tercihi, çerez tercihinizin kaydı). Bu
          çerezler için onay gerekmez ve kapatılamaz.
        </li>
        <li>
          <strong>Performans / analitik çerezler:</strong> Site kullanımını
          anonim olarak ölçer (örn. Google Analytics). Hangi sayfaların ne
          sıklıkla ziyaret edildiğini, hata oranlarını ve trafik kaynaklarını
          anlamak için kullanılır. Yalnızca açık rızanız varsa yüklenir.
        </li>
        <li>
          <strong>Fonksiyonel çerezler:</strong> Dil tercihi, görüntüleme
          modu gibi seçimlerinizi hatırlamak içindir.
        </li>
        <li>
          <strong>Hedefleme / pazarlama çerezleri:</strong> Üçüncü taraf
          reklam ve yeniden hedefleme amacıyla kullanılır (örn. Meta Pixel).
          Site şu anda bu çerezleri aktif olarak kullanmamaktadır; ileride
          etkinleştirildiğinde yalnızca açık rızanızla yüklenir.
        </li>
      </ul>

      <h2>3. Üçüncü taraf çerezleri</h2>
      <p>
        Aşağıdaki hizmetler, kendi çerezlerini sitemizde kullanabilir:
      </p>
      <ul>
        <li>
          <strong>Google Analytics</strong> — sayfa ziyaret istatistikleri,
          anonimleştirilmiş IP ile.
        </li>
        <li>
          <strong>Google Tag Manager</strong> — varsa, etiket yönetimi için.
        </li>
        <li>
          <strong>Meta Pixel</strong> — varsa ve onay verdiyseniz, reklam
          performansı ölçümü için.
        </li>
      </ul>
      <p>
        Bu hizmetler kendi gizlilik politikalarına tabidir. Detaylar için ilgili
        hizmet sağlayıcının dokümantasyonuna başvurabilirsiniz.
      </p>

      <h2>4. Çerezleri nasıl yönetebilirim?</h2>
      <p>
        Siteye ilk ziyaretinizde gösterilen Çerez Onay Banner&apos;ı üzerinden
        tercihlerinizi belirleyebilirsiniz: &quot;Tüm Çerezleri Kabul Et&quot;,
        &quot;Sadece Gerekli&quot; veya &quot;Ayarları Yönet&quot; seçenekleri
        mevcuttur. Tercihiniz tarayıcınızın yerel depolama alanına kaydedilir
        ({" "}
        <code>bak-cookie-consent-v1</code>) ve sonraki ziyaretlerde dikkate
        alınır.
      </p>
      <p>
        Tarayıcı ayarlarınızdan da çerezleri her zaman silebilir veya
        engelleyebilirsiniz:
      </p>
      <ul>
        <li>
          <strong>Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler ve
          site verileri
        </li>
        <li>
          <strong>Safari:</strong> Tercihler → Gizlilik → Çerezleri ve site
          verilerini yönet
        </li>
        <li>
          <strong>Firefox:</strong> Ayarlar → Gizlilik ve Güvenlik → Çerezler
          ve Site Verileri
        </li>
        <li>
          <strong>Edge:</strong> Ayarlar → Çerezler ve site izinleri
        </li>
      </ul>
      <p>
        Çerezleri devre dışı bırakırsanız sitenin bazı özellikleri beklenen
        şekilde çalışmayabilir.
      </p>

      <h2>5. Tercihinizi nasıl değiştirebilirim?</h2>
      <p>
        Tarayıcı yerel depolama alanından{" "}
        <code>bak-cookie-consent-v1</code> kaydını silmeniz halinde sonraki
        ziyaretinizde Çerez Onay Banner&apos;ı tekrar görüntülenir ve yeni bir
        tercih bildirebilirsiniz.
      </p>

      <h2>6. İletişim</h2>
      <p>
        Çerez politikamız veya kişisel verilerinizle ilgili soru ve talepleriniz
        için <a href={`mailto:${email}`}>{email}</a> adresine yazabilirsiniz.
        Detaylı bilgi için{" "}
        <a href="/kvkk">KVKK Aydınlatma Metnine</a> de göz atabilirsiniz.
      </p>
    </>
  );
}

function CerezEn({ email }: { email: string }) {
  return (
    <>
      <h2>1. What is a cookie?</h2>
      <p>
        Cookies are small text files saved on your device by your browser when
        you visit a website. They are used to operate the site, remember your
        preferences, and collect visit statistics.
      </p>

      <h2>2. Which cookies do we use?</h2>
      <p>We use the following cookie categories on Bodrumapartkiralama.com:</p>
      <ul>
        <li>
          <strong>Necessary cookies:</strong> Required for the site to function
          (session, language preference, your cookie choice). No consent is
          required and these cannot be turned off.
        </li>
        <li>
          <strong>Performance / analytics cookies:</strong> Measure site usage
          anonymously (e.g. Google Analytics). They tell us which pages are
          visited, error rates, and traffic sources. Loaded only with your
          explicit consent.
        </li>
        <li>
          <strong>Functional cookies:</strong> Remember your choices such as
          language preference.
        </li>
        <li>
          <strong>Targeting / marketing cookies:</strong> Used for third-party
          advertising and retargeting (e.g. Meta Pixel). The site does not
          currently use these actively; when enabled in the future, they will
          only load with your explicit consent.
        </li>
      </ul>

      <h2>3. Third-party cookies</h2>
      <p>The following services may set their own cookies on our site:</p>
      <ul>
        <li>
          <strong>Google Analytics</strong> — page-view statistics with
          anonymised IP.
        </li>
        <li>
          <strong>Google Tag Manager</strong> — when active, for tag management.
        </li>
        <li>
          <strong>Meta Pixel</strong> — when active and consented, for ad
          performance measurement.
        </li>
      </ul>
      <p>
        These services are governed by their own privacy policies. Please refer
        to each provider&apos;s documentation for details.
      </p>

      <h2>4. How can I manage cookies?</h2>
      <p>
        On your first visit you&apos;ll see a Cookie Consent banner with three
        options: &quot;Accept All Cookies&quot;, &quot;Necessary Only&quot;, or
        &quot;Manage Settings&quot;. Your preference is saved in browser
        localStorage as <code>bak-cookie-consent-v1</code> and respected on
        later visits.
      </p>
      <p>
        You can also delete or block cookies from your browser settings at any
        time:
      </p>
      <ul>
        <li>
          <strong>Chrome:</strong> Settings → Privacy and security → Cookies
        </li>
        <li>
          <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
        </li>
        <li>
          <strong>Firefox:</strong> Settings → Privacy &amp; Security → Cookies
        </li>
        <li>
          <strong>Edge:</strong> Settings → Cookies and site permissions
        </li>
      </ul>
      <p>
        Disabling cookies may cause certain features of the site to behave
        unexpectedly.
      </p>

      <h2>5. How do I change my preference?</h2>
      <p>
        Removing the <code>bak-cookie-consent-v1</code> key from your browser
        localStorage will cause the Cookie Consent banner to appear again on
        your next visit so you can make a fresh choice.
      </p>

      <h2>6. Contact</h2>
      <p>
        For questions about our cookie policy or your personal data, write to{" "}
        <a href={`mailto:${email}`}>{email}</a>. For more details, also see our{" "}
        <a href="/kvkk">Privacy Notice</a>.
      </p>
    </>
  );
}
