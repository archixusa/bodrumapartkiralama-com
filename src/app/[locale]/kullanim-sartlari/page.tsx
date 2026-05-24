import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalLayout } from "@/components/LegalLayout";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  const url =
    locale === "tr"
      ? `${SITE_URL}/kullanim-sartlari`
      : `${SITE_URL}/${locale}/kullanim-sartlari`;
  return {
    title: t("metaTitle"),
    description: t("subtitle"),
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
  const t = await getTranslations({ locale, namespace: "terms" });
  const c = await getTranslations({ locale, namespace: "common" });
  const isTr = locale === "tr";

  return (
    <LegalLayout
      title={t("h1")}
      subtitle={t("subtitle")}
      lastUpdate={t("lastUpdate")}
      homeLabel={isTr ? "Ana Sayfa" : "Home"}
    >
      {isTr ? <TermsTr email={c("email")} /> : <TermsEn email={c("email")} />}
    </LegalLayout>
  );
}

function TermsTr({ email }: { email: string }) {
  return (
    <>
      <p>
        Bodrumapartkiralama.com web sitesini (&quot;Site&quot;) kullanan tüm ziyaretçiler,
        aşağıdaki şartları kabul etmiş sayılır. Lütfen Site&apos;yi kullanmadan önce bu
        metni okuyun.
      </p>

      <h2>1. Tanımlar</h2>
      <ul>
        <li><strong>Şirket:</strong> Bodrumapartkiralama.com&apos;u işleten tüzel kişilik.</li>
        <li><strong>Site:</strong> bodrumapartkiralama.com alan adı altındaki tüm sayfalar.</li>
        <li><strong>Misafir:</strong> Site üzerinden rezervasyon talebi gönderen kişi.</li>
        <li><strong>Hizmetler:</strong> Apart, tekne, araç kiralama, transfer ve tur dahil sunulan hizmetler.</li>
      </ul>

      <h2>2. Hizmetlerin Kapsamı</h2>
      <p>
        Site, kullanıcıların apart, tekne, araç, transfer ve tur taleplerini iletmesi
        için bir platform sağlar. Rezervasyon teyidi ve ödeme; talebin tarafımıza
        ulaşmasının ardından telefon/WhatsApp yoluyla tamamlanır.
      </p>

      <h2>3. Kullanıcı Yükümlülükleri</h2>
      <ul>
        <li>Formlarda gerçek ve doğru bilgi vermek.</li>
        <li>Site&apos;ye hukuka aykırı amaçla erişmemek; otomatik araç veya scraping kullanmamak.</li>
        <li>Üçüncü kişilerin telif veya marka haklarını ihlal etmemek.</li>
        <li>Spam, zararlı yazılım veya yanıltıcı içerik göndermemek.</li>
      </ul>

      <h2>4. Fikri Mülkiyet Hakları</h2>
      <p>
        Site&apos;deki metin, görsel, logo, yazılım ve tasarımlar Bodrumapartkiralama.com&apos;a
        veya lisans verenlerine aittir. Yazılı izin olmadan kopyalanması, çoğaltılması
        veya ticari amaçla kullanılması yasaktır. Apart ilanlarındaki bazı görseller
        Unsplash gibi serbest lisanslı kaynaklardan alıntılanmıştır.
      </p>

      <h2>5. Üçüncü Taraf Bağlantıları</h2>
      <p>
        Site, üçüncü taraf hizmet sağlayıcılarına (Booking, Rentalcars, GetYourGuide vb.)
        bağlantılar içerebilir. Bu sitelerin içeriği veya gizlilik politikasından
        Bodrumapartkiralama.com sorumlu değildir.
      </p>

      <h2>6. Sorumluluk Sınırı</h2>
      <p>
        Bodrumapartkiralama.com, Site&apos;nin kesintisiz veya hatasız çalışacağını garanti
        etmez. Mücbir sebepler, internet altyapısı sorunları veya iş ortağı kaynaklı
        gecikmelerden kaynaklı zararlardan Şirket sorumlu tutulamaz. Yine de gerekli
        özen gösterilir.
      </p>

      <h2>7. Değişiklikler</h2>
      <p>
        Şirket, bu kullanım şartlarını herhangi bir zamanda güncelleyebilir.
        Güncellemeler bu sayfada yayınlandığı anda yürürlüğe girer.
      </p>

      <h2>8. Uygulanacak Hukuk ve Yetki</h2>
      <p>
        Bu metin Türkiye Cumhuriyeti hukukuna tabidir. Doğabilecek uyuşmazlıklarda
        Muğla Mahkemeleri ve İcra Daireleri yetkilidir.
      </p>

      <h2>9. İletişim</h2>
      <p>
        Sorularınız için <a href={`mailto:${email}`}>{email}</a> adresinden bize
        ulaşabilirsiniz.
      </p>

      <p className="text-xs text-muted">
        Bu metin örnek niteliğindedir; yayına girmeden önce bir avukata gözden geçirtin.
      </p>
    </>
  );
}

function TermsEn({ email }: { email: string }) {
  return (
    <>
      <p>
        Anyone visiting bodrumapartkiralama.com (the &quot;Site&quot;) is deemed to
        accept the following terms. Please read this document before using the Site.
      </p>

      <h2>1. Definitions</h2>
      <ul>
        <li><strong>Company:</strong> The legal entity operating Bodrumapartkiralama.com.</li>
        <li><strong>Site:</strong> All pages under bodrumapartkiralama.com.</li>
        <li><strong>Guest:</strong> Anyone submitting a booking request through the Site.</li>
        <li><strong>Services:</strong> Apartment, boat, car rental, transfer and tour services offered.</li>
      </ul>

      <h2>2. Scope of Services</h2>
      <p>
        The Site is a platform for users to submit apartment, boat, car, transfer and
        tour requests. Booking confirmation and payment happen via phone/WhatsApp once
        the request reaches us.
      </p>

      <h2>3. User Obligations</h2>
      <ul>
        <li>Provide accurate and truthful information in forms.</li>
        <li>No unlawful access, automated tools or scraping.</li>
        <li>No infringement of third-party copyright or trademarks.</li>
        <li>No spam, malware, or misleading content.</li>
      </ul>

      <h2>4. Intellectual Property</h2>
      <p>
        Text, images, logos, software, and design on the Site belong to
        Bodrumapartkiralama.com or its licensors. Copying, reproduction or commercial
        use without written consent is prohibited. Some apartment images are sourced
        from free-licence repositories such as Unsplash.
      </p>

      <h2>5. Third-Party Links</h2>
      <p>
        The Site may contain links to third-party providers (Booking, Rentalcars,
        GetYourGuide, etc.). Bodrumapartkiralama.com is not responsible for their
        content or privacy policies.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        Bodrumapartkiralama.com does not guarantee uninterrupted or error-free
        operation of the Site. The Company is not liable for damages caused by force
        majeure, network issues, or partner-related delays. Due diligence is applied
        regardless.
      </p>

      <h2>7. Changes</h2>
      <p>
        The Company may update these terms at any time. Updates take effect when
        published on this page.
      </p>

      <h2>8. Governing Law and Jurisdiction</h2>
      <p>
        Subject to the laws of the Republic of Türkiye. Muğla Courts and Enforcement
        Offices have jurisdiction over any disputes.
      </p>

      <h2>9. Contact</h2>
      <p>
        For questions, write to <a href={`mailto:${email}`}>{email}</a>.
      </p>

      <p className="text-xs text-muted">
        This text is a template; have a lawyer review it before going live.
      </p>
    </>
  );
}
