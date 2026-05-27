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
  const t = await getTranslations({ locale, namespace: "kvkk" });
  const url =
    locale === "tr" ? `${SITE_URL}/kvkk` : `${SITE_URL}/${locale}/kvkk`;
  return {
    title: t("metaTitle"),
    description: t("subtitle"),
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "kvkk" });
  const c = await getTranslations({ locale, namespace: "common" });
  const isTr = locale === "tr";

  return (
    <LegalLayout
      title={t("h1")}
      subtitle={t("subtitle")}
      lastUpdate={t("lastUpdate")}
      homeLabel={isTr ? "Ana Sayfa" : "Home"}
    >
      {isTr ? <KvkkTr email={c("email")} /> : <KvkkEn email={c("email")} />}
    </LegalLayout>
  );
}

function KvkkTr({ email }: { email: string }) {
  return (
    <>
      <p>
        Bodrumapartkiralama.com (&quot;Şirket&quot;) olarak; 6698 sayılı Kişisel Verilerin
        Korunması Kanunu (&quot;KVKK&quot;) uyarınca veri sorumlusu sıfatıyla siz değerli
        misafirlerimizin kişisel verilerini aşağıda açıklanan şekilde işlemekteyiz.
        Bu metin, KVKK&apos;nın 10. maddesi uyarınca aydınlatma yükümlülüğümüzü yerine
        getirmek üzere hazırlanmıştır.
      </p>

      <h2>1. Veri Sorumlusu</h2>
      <p>
        Web sitesi: bodrumapartkiralama.com
        <br />
        İletişim: <a href={`mailto:${email}`}>{email}</a>
      </p>

      <h2>2. İşlenen Kişisel Veri Kategorileri</h2>
      <ul>
        <li><strong>Kimlik bilgileri:</strong> Ad, soyad.</li>
        <li><strong>İletişim bilgileri:</strong> E-posta, telefon numarası.</li>
        <li><strong>Rezervasyon bilgileri:</strong> Giriş/çıkış tarihleri, kişi sayısı, tercih edilen apart bilgisi, özel istekler.</li>
        <li><strong>İşlem güvenliği bilgileri:</strong> IP adresi, tarayıcı bilgileri, çerez tercihleri.</li>
      </ul>

      <h2>3. İşleme Amaçları</h2>
      <ul>
        <li>Rezervasyon talebinizi değerlendirmek ve sizinle iletişim kurmak.</li>
        <li>Müsaitlik teyidi, ödeme bilgisi paylaşımı ve rezervasyon onayı.</li>
        <li>İptal, değişiklik ve iade işlemlerinin yürütülmesi.</li>
        <li>Yasal yükümlülüklerin (vergi, muhasebe, turizm mevzuatı) yerine getirilmesi.</li>
        <li>Hizmet kalitemizi geliştirmek ve istatistiksel analizler yapmak.</li>
      </ul>

      <h2>4. Hukuki Sebepler</h2>
      <p>
        Kişisel verileriniz; KVKK m.5/2-c (sözleşmenin kurulması veya ifası), m.5/2-ç
        (hukuki yükümlülüğün yerine getirilmesi) ve m.5/2-f (meşru menfaat) hükümleri
        kapsamında işlenmektedir. Pazarlama içerikleri ve çerez kullanımı için açık
        rızanız (m.5/1) alınır.
      </p>

      <h2>5. Aktarım</h2>
      <p>
        Kişisel verileriniz; rezervasyon sürecini tamamlamak adına anlaşmalı transfer,
        tur ve apart sahibi iş ortaklarımızla, yasal mercilerle ve barındırma/e-posta
        hizmeti aldığımız altyapı sağlayıcılarımızla (Vercel, Resend) paylaşılabilir.
        Yurt dışına aktarım, KVKK m.9 koşullarına uyularak gerçekleştirilir.
      </p>

      <h2>6. Saklama Süresi</h2>
      <p>
        Rezervasyon verileri, ilgili yasal saklama süreleri (10 yıl ticari, 5 yıl vergi)
        boyunca tutulur. Pazarlama amaçlı veriler ise rızanızı geri çekene kadar saklanır.
      </p>

      <h2>7. Veri Sahibinin Hakları (KVKK m.11)</h2>
      <ul>
        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme.</li>
        <li>İşlenmişse buna ilişkin bilgi talep etme.</li>
        <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme.</li>
        <li>Verilerin yurt içi/yurt dışı aktarıldığı 3. kişileri bilme.</li>
        <li>Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme.</li>
        <li>Verilerinizin KVKK m.7 çerçevesinde silinmesini veya yok edilmesini isteme.</li>
        <li>İşlemenin yalnızca otomatik sistemlerle yapılması nedeniyle çıkan sonuca itiraz etme.</li>
        <li>Kanuna aykırı işleme sebebiyle uğranılan zararın giderilmesini talep etme.</li>
      </ul>

      <h2>8. Başvuru Yöntemleri</h2>
      <p>
        KVKK m.13 ve Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ
        uyarınca başvurularınızı aşağıdaki yöntemlerden biriyle iletebilirsiniz:
      </p>
      <ul>
        <li>
          <strong>E-posta:</strong>{" "}
          <a href={`mailto:${email}`}>{email}</a> adresine, daha önce
          sistemimizde kayıtlı e-posta adresinizden başvuru göndererek.
        </li>
        <li>
          <strong>Yazılı başvuru:</strong> Islak imzalı dilekçenizi kimlik
          fotokopisi ile birlikte posta yoluyla iletebilirsiniz.
        </li>
        <li>
          <strong>KEP:</strong> Kayıtlı Elektronik Posta üzerinden — adres
          talep halinde paylaşılır.
        </li>
      </ul>
      <p>
        Başvurunuza en geç 30 gün içinde yazılı veya elektronik ortamda dönüş
        yapılır. KVKK Kurulu&apos;nun belirlediği usul ve esaslar dahilinde
        ücret talep edilebilir.
      </p>

      <h2>9. Çerez (Cookie) Politikası</h2>
      <p>
        Sitemiz; performans, analitik ve pazarlama amacıyla çerez kullanır.
        Detaylar ve tercih değiştirme adımları için{" "}
        <a href="/cerez-politikasi">Çerez Politikası</a> sayfamıza
        bakabilirsiniz.
      </p>

      <p className="text-xs text-muted">
        Bu metin son olarak 27 Mayıs 2026 tarihinde güncellenmiştir. Detaylı
        hukuki revizyon için uzman görüşü alınacaktır.
      </p>
    </>
  );
}

function KvkkEn({ email }: { email: string }) {
  return (
    <>
      <p>
        Bodrumapartkiralama.com (the &quot;Company&quot;) processes your personal data
        as the data controller in accordance with the Turkish Personal Data Protection
        Law No. 6698 (&quot;KVKK&quot;) and applicable GDPR principles. This notice
        explains how and why we process your data.
      </p>

      <h2>1. Data Controller</h2>
      <p>
        Website: bodrumapartkiralama.com
        <br />
        Contact: <a href={`mailto:${email}`}>{email}</a>
      </p>

      <h2>2. Categories of Data</h2>
      <ul>
        <li><strong>Identity:</strong> Full name.</li>
        <li><strong>Contact:</strong> Email, phone number.</li>
        <li><strong>Booking data:</strong> Check-in / check-out, guest count, apartment preference, special requests.</li>
        <li><strong>Technical:</strong> IP address, browser info, cookie preferences.</li>
      </ul>

      <h2>3. Purposes</h2>
      <ul>
        <li>To evaluate your booking request and contact you.</li>
        <li>To confirm availability, share payment details, and process bookings.</li>
        <li>To handle cancellations, changes and refunds.</li>
        <li>To comply with legal obligations (tax, accounting, tourism regulations).</li>
        <li>To improve service quality and run statistical analyses.</li>
      </ul>

      <h2>4. Legal Basis</h2>
      <p>
        We process your data based on contract performance, legal obligations, and
        legitimate interests. We rely on your explicit consent for marketing and
        cookie usage.
      </p>

      <h2>5. Transfers</h2>
      <p>
        Your data may be shared with partner transfer/tour/apartment owners, legal
        authorities, and infrastructure providers (Vercel, Resend). International
        transfers comply with KVKK Article 9 and applicable safeguards.
      </p>

      <h2>6. Retention</h2>
      <p>
        Booking data is kept for the legally required periods (10 years commercial, 5
        years tax). Marketing data is kept until you withdraw consent.
      </p>

      <h2>7. Your Rights</h2>
      <ul>
        <li>Learn whether your data is being processed.</li>
        <li>Request information if processed.</li>
        <li>Request correction or deletion.</li>
        <li>Learn the third parties data has been shared with.</li>
        <li>Object to results from purely automated processing.</li>
        <li>Claim compensation in case of damage.</li>
      </ul>
      <p>
        To exercise these rights, send a written request to{" "}
        <a href={`mailto:${email}`}>{email}</a>. We respond within 30 days.
      </p>

      <h2>8. Cookies</h2>
      <p>
        We use cookies for performance, analytics and marketing. You can change cookie
        preferences in your browser at any time.
      </p>

      <p className="text-xs text-muted">
        This text is a template. Have it reviewed by a lawyer or data protection
        specialist before going live.
      </p>
    </>
  );
}
