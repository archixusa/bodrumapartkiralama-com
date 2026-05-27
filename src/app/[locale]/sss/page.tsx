import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bodrumapartkiralama.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  const url = locale === "tr" ? `${SITE_URL}/sss` : `${SITE_URL}/${locale}/sss`;
  const title = isTr
    ? "Sıkça Sorulan Sorular — Bodrum Apart Kiralama"
    : "Frequently Asked Questions — Bodrum Apartment Rental";
  const description = isTr
    ? "Apart kiralama, ödeme, iptal, evcil hayvan, mülk sahibi iletişimi hakkında sıkça sorulan soruların yanıtları."
    : "Answers to common questions about apartment rentals, payments, cancellations, pets, and owner contact."
  ;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isTr = locale === "tr";
  const h = await getTranslations({ locale, namespace: "home" });

  const items = isTr ? FAQ_TR : FAQ_EN;

  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isTr ? "Ana Sayfa" : "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isTr ? "Sıkça Sorulanlar" : "FAQ",
        item: locale === "tr" ? `${SITE_URL}/sss` : `${SITE_URL}/${locale}/sss`,
      },
    ],
  };

  return (
    <section className="section">
      <JsonLd data={[ld, breadcrumb]} />
      <div className="container-page max-w-4xl">
        <h1>{h("faqTitle")}</h1>
        <p className="mt-2 text-muted">
          {isTr
            ? "Misafirlerimizin sık sorduğu konular ve bizim ortak yanıtlarımız. Aradığınızı bulamazsanız WhatsApp veya e-posta ile yazın; yardımcı olalım."
            : "Topics our guests often ask about, with our standard answers. If you don't find what you need, message us on WhatsApp or by email and we'll help."}
        </p>
        <div className="mt-8">
          <FAQ items={items} />
        </div>
      </div>
    </section>
  );
}

const FAQ_TR = [
  {
    q: "Apart fiyatlarına neler dahildir?",
    a: "Kiralama bedeli; konaklama, mevcut donanım (yatak takımı, havlu, mutfak gereçleri, klima, Wi-Fi) ile son temizliği kapsar. Site içi havuz, otopark gibi olanaklar mülke göre dahildir. Şehir vergisi varsa ve uygulanıyorsa ayrıca bildirilir; ek hizmetler (transfer, ekstra temizlik) talep doğrultusunda ücretlendirilir.",
  },
  {
    q: "Rezervasyon iptali nasıl yapılır?",
    a: "İptal talebinizi WhatsApp veya e-posta üzerinden iletmeniz yeterlidir. İptal şartları mülke göre değişir. Genel yaklaşımımız: tatil tarihinize 14+ gün önce yapılan iptaller için tam iade görüşmesi, 7-14 gün arası kısmi iade. Detaylar rezervasyon onayında ve mülk sahibiyle birlikte netleştirilir.",
  },
  {
    q: "Erken giriş / geç çıkış mümkün müdür?",
    a: "Standart giriş 14:00, çıkış 11:00'dir. Aynı gün başka bir misafir yoksa erken giriş ve geç çıkış genellikle ücretsiz olarak değerlendirilebilir; mülke ve operasyona göre değişir. Talebinizi rezervasyon notuna yazmanız yeterli, müsaitliği tatil tarihine yakın bir zamanda teyit ederiz.",
  },
  {
    q: "Misafir sayısı sonradan değişebilir mi?",
    a: "Evet, mülkün kapasitesini aşmamak kaydıyla misafir sayısında değişiklik yapılabilir. Bebek ve küçük çocuklar genellikle kapasiteye dahil sayılmaz; bebek beşiği talebinizi önceden iletirseniz mümkün olduğunda ücretsiz sağlamaya çalışırız.",
  },
  {
    q: "Evcil hayvan ile konaklama mümkün müdür?",
    a: "Bazı mülklerimiz evcil hayvan dostudur; bunu rezervasyon öncesinde mülk sahibiyle birlikte teyit ediyoruz. Konaklamanız boyunca standart temizlik ve kullanım kurallarına uyulmasını rica ederiz. Detayları talebinize göre paylaşırız.",
  },
  {
    q: "Temizlik ücreti ayrıca alınıyor mu?",
    a: "Genellikle kiralama bedeli son temizliği kapsar. Konaklama sırasında ek temizlik talep ederseniz (örn. uzun süreli kalışlarda ara temizlik) hizmet bedeli ayrıca paylaşılır; rezervasyon öncesinde detayları konuşmak isteseniz memnuniyetle bilgi veririz.",
  },
  {
    q: "Mülk sahibi ile direkt iletişim kurabilir miyim?",
    a: "Yaklaşımımız doğrudan iletişime dayanır. Konaklamanız onaylandıktan sonra ihtiyaç halinde mülk sahibinin iletişim bilgilerini paylaşabilir veya konuşmaya aracılık edebiliriz. Ortak hedefimiz misafirin sorularının hızlı ve doğru kişiye ulaşmasıdır.",
  },
  {
    q: "Komisyon oranınız nedir? (mülk sahipleri için)",
    a: "Komisyon oranımızı mülkün lokasyonu, kapasite ve istediğiniz hizmet kapsamına göre netleştiriyoruz. Oran, anlaşma öncesinde yazılı olarak paylaşılır. Yalnızca gerçekleşmiş rezervasyonlardan komisyon tahakkuk eder; boş kalan günler için ek ücret talep etmiyoruz. Detaylar için /evinizi-kiraya-verin sayfamıza göz atabilir veya bizimle iletişime geçebilirsiniz.",
  },
  {
    q: "Hasarda ne olur?",
    a: "Her misafirden konaklama öncesinde depozito alıyoruz. Küçük hasarlar depozitodan karşılanır; bu kapsamı aşan hasarlar için durum belgelenir ve misafire fatura edilir. Süreç boyunca hem misafir hem mülk sahibiyle açık iletişim kurmayı hedefliyoruz.",
  },
  {
    q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    a: "Banka havalesi / EFT (TL) ana ödeme yöntemimizdir. Uluslararası transferler için banka bilgilerini İngilizce talimat ile paylaşabiliriz. Bazı durumlarda kredi kartıyla ödeme (sanal POS aracılığıyla) seçeneği sunulabilir; rezervasyon onayında size en uygun seçeneği iletiyoruz.",
  },
];

const FAQ_EN = [
  {
    q: "What is included in the apartment price?",
    a: "The rental fee covers accommodation, the available equipment (bedding, towels, kitchen utensils, air conditioning, Wi-Fi) and end-of-stay cleaning. Pool, parking and similar amenities are included depending on the property. City tax, where applicable, is communicated separately; extras like transfers or additional cleaning are charged on request.",
  },
  {
    q: "How do I cancel a booking?",
    a: "Send your cancellation request via WhatsApp or email. For cancellations 7 or more days before arrival, the amount you paid is refunded. Cancellations within 7 days may be subject to a partial fee depending on season and property; details are shared in the booking confirmation.",
  },
  {
    q: "Is early check-in / late check-out possible?",
    a: "Standard check-in is 2:00 PM and check-out is 11:00 AM. If there's no same-day guest, early check-in and late check-out are usually free to arrange — this varies by property and operations. Add it to the booking notes; we'll confirm closer to your arrival.",
  },
  {
    q: "Can the guest count change after booking?",
    a: "Yes, as long as the property's capacity isn't exceeded. Babies and small children are usually not counted toward capacity; if you let us know in advance, we'll try to provide a free baby crib where available.",
  },
  {
    q: "Are pets allowed?",
    a: "Some of our apartments are pet-friendly; we confirm this with the owner before booking. We kindly ask that standard cleaning and usage rules are respected during your stay. We'll share details based on your request.",
  },
  {
    q: "Is there a separate cleaning fee?",
    a: "Usually the rental fee includes end-of-stay cleaning. If you ask for additional cleaning during your stay (e.g. mid-stay cleaning on long bookings), the service is quoted separately. Happy to share details before booking.",
  },
  {
    q: "Can I contact the property owner directly?",
    a: "Our model is built around direct contact. After your booking is confirmed, we can share the owner's contact details or relay messages when needed. The goal is for guest questions to reach the right person quickly.",
  },
  {
    q: "What's your commission rate? (for owners)",
    a: "We tailor the commission rate to the property's location, capacity and desired service scope. The rate is shared in writing before signing. Commission only accrues on completed bookings — no fees for empty days. See /evinizi-kiraya-verin or get in touch for details.",
  },
  {
    q: "What happens in case of damage?",
    a: "We collect a deposit from every guest before the stay. Minor damages are covered by the deposit; anything beyond it is documented and invoiced to the guest. We aim for clear communication with both guest and owner throughout the process.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "Bank transfer / EFT (TRY) is our primary method. We can share account details with English instructions for international transfers. In some cases credit-card payment via virtual POS is offered; we share the best option for you in the booking confirmation.",
  },
];
