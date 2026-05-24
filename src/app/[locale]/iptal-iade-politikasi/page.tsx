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
  const t = await getTranslations({ locale, namespace: "cancel" });
  const url =
    locale === "tr"
      ? `${SITE_URL}/iptal-iade-politikasi`
      : `${SITE_URL}/${locale}/iptal-iade-politikasi`;
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
  const t = await getTranslations({ locale, namespace: "cancel" });
  const c = await getTranslations({ locale, namespace: "common" });
  const isTr = locale === "tr";

  return (
    <LegalLayout
      title={t("h1")}
      subtitle={t("subtitle")}
      lastUpdate={t("lastUpdate")}
      homeLabel={isTr ? "Ana Sayfa" : "Home"}
    >
      {isTr ? <CancelTr email={c("email")} /> : <CancelEn email={c("email")} />}
    </LegalLayout>
  );
}

function CancelTr({ email }: { email: string }) {
  return (
    <>
      <p>
        Bodrumapartkiralama.com olarak misafirlerimizin esnek planlama yapabilmesi için
        açık ve adil bir iptal-iade politikası uyguluyoruz. Aşağıdaki kurallar tüm
        apart, tekne, araç, transfer ve tur rezervasyonları için geçerlidir.
      </p>

      <h2>1. Ücretsiz İptal</h2>
      <p>
        Tatil giriş tarihinize <strong>7 gün veya daha öncesinde</strong> iptal eder
        veya rezervasyonunuzu başka bir tarihe ertelerseniz, ödediğiniz tutar herhangi
        bir kesinti yapılmadan tam olarak iade edilir.
      </p>

      <h2>2. Kademeli Kesinti</h2>
      <ul>
        <li><strong>4-6 gün kala iptal:</strong> Toplam ücretin %50&apos;si iade edilir.</li>
        <li><strong>1-3 gün kala iptal:</strong> Toplam ücretin %25&apos;i iade edilir.</li>
        <li><strong>Giriş günü veya sonrası iptal / no-show:</strong> İade yapılmaz.</li>
      </ul>

      <h2>3. Mücbir Sebepler</h2>
      <p>
        Uçuş iptalleri, sağlık raporlu acil durumlar, doğal afet veya resmi
        yasaklar gibi mücbir sebeplerde belgelendirme şartıyla 7 gün kuralı aranmaksızın
        tam iade veya tarih değişikliği yapılır.
      </p>

      <h2>4. Erken Çıkış</h2>
      <p>
        Konaklamaya başladıktan sonra erken çıkış yapmanız hâlinde, kullanılmayan
        gecelerin ücreti iade edilmez. İstisnai durumlarda taleplerinizi
        değerlendiriyoruz; lütfen yöneticinizle görüşün.
      </p>

      <h2>5. Apart Değişikliği</h2>
      <p>
        Apartın kullanılamaz hâle gelmesi (su/elektrik kesintisi, beklenmeyen arıza vb.)
        durumunda öncelikle eşdeğer veya üst kategoride bir apart sunulur. Değişiklik
        mümkün değilse kalan günler için tam iade yapılır.</p>

      <h2>6. İade Süresi</h2>
      <p>
        Onaylanan iadeler, ödeme aldığımız bankaya bağlı olarak 3-10 iş günü içinde
        hesabınıza yansır. Uluslararası havalelerde bu süre 7-15 iş gününe uzayabilir.
      </p>

      <h2>7. Tekne, Araç ve Transfer Hizmetleri</h2>
      <ul>
        <li><strong>Tekne ve tur:</strong> Hava koşulları nedeniyle iptal edilen rezervasyonlarda tam iade veya başka güne kaydırma yapılır.</li>
        <li><strong>Araç kiralama:</strong> Teslim alımdan 48 saat öncesine kadar ücretsiz iptal. Sonrasında bir günlük kiralama bedeli alınır.</li>
        <li><strong>Transfer:</strong> 24 saat öncesine kadar ücretsiz iptal. Daha geç iptallerde %50 kesinti uygulanır.</li>
      </ul>

      <h2>8. İptal Talebi Nasıl Gönderilir?</h2>
      <p>
        İptal taleplerinizi yazılı olarak <a href={`mailto:${email}`}>{email}</a>{" "}
        adresine veya WhatsApp üzerinden iletmeniz yeterlidir. Ad-soyad, rezervasyon
        tarihi ve iptal sebebini belirtin.
      </p>
    </>
  );
}

function CancelEn({ email }: { email: string }) {
  return (
    <>
      <p>
        Bodrumapartkiralama.com applies a clear, fair cancellation and refund policy so
        you can plan flexibly. These rules apply to all apartment, boat, car, transfer
        and tour bookings.
      </p>

      <h2>1. Free Cancellation</h2>
      <p>
        Cancel or reschedule your booking <strong>7 or more days</strong> before your
        check-in date and we&apos;ll refund your payment in full.
      </p>

      <h2>2. Tiered Fees</h2>
      <ul>
        <li><strong>Cancellation 4-6 days before:</strong> 50% of the total fee refunded.</li>
        <li><strong>Cancellation 1-3 days before:</strong> 25% of the total fee refunded.</li>
        <li><strong>Same-day cancellation / no-show:</strong> No refund.</li>
      </ul>

      <h2>3. Force Majeure</h2>
      <p>
        For documented force majeure cases such as flight cancellations, medical
        emergencies, natural disasters or official bans, full refunds or date changes
        are offered regardless of the 7-day rule.
      </p>

      <h2>4. Early Check-out</h2>
      <p>
        If you leave early after check-in, unused nights are not refunded. Exceptional
        cases are evaluated — please contact your host.
      </p>

      <h2>5. Apartment Swap</h2>
      <p>
        If the apartment becomes unusable (water/electric outage, unexpected breakdown,
        etc.), an equivalent or higher-category apartment is offered first. If no swap
        is possible, remaining nights are refunded in full.
      </p>

      <h2>6. Refund Timeline</h2>
      <p>
        Approved refunds reach your account in 3-10 business days depending on the
        receiving bank. International transfers may take 7-15 business days.
      </p>

      <h2>7. Boat, Car and Transfer</h2>
      <ul>
        <li><strong>Boats and tours:</strong> Weather-cancelled bookings are fully refunded or rescheduled.</li>
        <li><strong>Car rental:</strong> Free cancellation up to 48 hours before pick-up. After that, one day&apos;s rental is charged.</li>
        <li><strong>Transfer:</strong> Free cancellation up to 24 hours before. Later cancellations incur a 50% fee.</li>
      </ul>

      <h2>8. How to Cancel</h2>
      <p>
        Send your cancellation request in writing to <a href={`mailto:${email}`}>{email}</a>{" "}
        or via WhatsApp. Include your full name, booking date and reason.
      </p>
    </>
  );
}
