import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.bodrumapartkiralama.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const url = locale === "tr" ? `${SITE_URL}/sss` : `${SITE_URL}/${locale}/sss`;
  const title =
    locale === "tr"
      ? "Sıkça Sorulan Sorular — Bodrum Apart Kiralama"
      : locale === "de"
        ? "Häufig gestellte Fragen — Bodrum Apartmentvermietung"
        : locale === "ru"
          ? "Часто задаваемые вопросы — Аренда апартаментов в Бодруме"
          : "Frequently Asked Questions — Bodrum Apartment Rental";
  const description =
    locale === "tr"
      ? "Apart kiralama, ödeme, iptal, evcil hayvan, mülk sahibi iletişimi hakkında sıkça sorulan soruların yanıtları."
      : locale === "de"
        ? "Antworten auf häufige Fragen zu Apartmentvermietung, Zahlung, Stornierung, Haustieren und Kontakt zum Eigentümer."
        : locale === "ru"
          ? "Ответы на частые вопросы об аренде апартаментов, оплате, отмене, размещении с питомцами и связи с владельцем."
          : "Answers to common questions about apartment rentals, payments, cancellations, pets, and owner contact.";
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
  const h = await getTranslations({ locale, namespace: "home" });

  const pick = <T,>(o: { tr: T; en: T; de: T; ru: T }): T =>
    o[locale as "tr" | "en" | "de" | "ru"] ?? o.en;

  const items = FAQ_ITEMS.map((it) => ({ q: pick(it.q), a: pick(it.a) }));

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
        name: pick({ tr: "Ana Sayfa", en: "Home", de: "Startseite", ru: "Главная" }),
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pick({
          tr: "Sıkça Sorulanlar",
          en: "FAQ",
          de: "Häufige Fragen",
          ru: "Вопросы и ответы",
        }),
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
          {pick({
            tr: "Misafirlerimizin sık sorduğu konular ve bizim ortak yanıtlarımız. Aradığınızı bulamazsanız WhatsApp veya e-posta ile yazın; yardımcı olalım.",
            en: "Topics our guests often ask about, with our standard answers. If you don't find what you need, message us on WhatsApp or by email and we'll help.",
            de: "Themen, nach denen unsere Gäste oft fragen, mit unseren Standardantworten. Falls Sie nicht finden, was Sie suchen, schreiben Sie uns per WhatsApp oder E-Mail — wir helfen Ihnen gerne.",
            ru: "Темы, о которых часто спрашивают наши гости, с нашими стандартными ответами. Если вы не нашли нужного, напишите нам в WhatsApp или по электронной почте — мы поможем.",
          })}
        </p>
        <div className="mt-8">
          <FAQ items={items} />
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS: {
  q: { tr: string; en: string; de: string; ru: string };
  a: { tr: string; en: string; de: string; ru: string };
}[] = [
  {
    q: {
      tr: "Apart fiyatlarına neler dahildir?",
      en: "What is included in the apartment price?",
      de: "Was ist im Apartmentpreis enthalten?",
      ru: "Что входит в стоимость апартаментов?",
    },
    a: {
      tr: "Kiralama bedeli; konaklama, mevcut donanım (yatak takımı, havlu, mutfak gereçleri, klima, Wi-Fi) ile son temizliği kapsar. Site içi havuz, otopark gibi olanaklar mülke göre dahildir. Şehir vergisi varsa ve uygulanıyorsa ayrıca bildirilir; ek hizmetler (transfer, ekstra temizlik) talep doğrultusunda ücretlendirilir.",
      en: "The rental fee covers accommodation, the available equipment (bedding, towels, kitchen utensils, air conditioning, Wi-Fi) and end-of-stay cleaning. Pool, parking and similar amenities are included depending on the property. City tax, where applicable, is communicated separately; extras like transfers or additional cleaning are charged on request.",
      de: "Der Mietpreis umfasst die Unterkunft, die vorhandene Ausstattung (Bettwäsche, Handtücher, Küchenutensilien, Klimaanlage, WLAN) sowie die Endreinigung. Pool, Parkplatz und ähnliche Annehmlichkeiten sind je nach Immobilie inbegriffen. Eine etwaige Kurtaxe wird separat mitgeteilt; Zusatzleistungen (Transfer, zusätzliche Reinigung) werden auf Anfrage berechnet.",
      ru: "Стоимость аренды включает проживание, имеющееся оснащение (постельное бельё, полотенца, кухонную утварь, кондиционер, Wi-Fi) и финальную уборку. Бассейн, парковка и подобные удобства включены в зависимости от объекта. Городской налог, если он применяется, сообщается отдельно; дополнительные услуги (трансфер, дополнительная уборка) оплачиваются по запросу.",
    },
  },
  {
    q: {
      tr: "Rezervasyon iptali nasıl yapılır?",
      en: "How do I cancel a booking?",
      de: "Wie storniere ich eine Buchung?",
      ru: "Как отменить бронирование?",
    },
    a: {
      tr: "İptal talebinizi WhatsApp veya e-posta üzerinden iletmeniz yeterlidir. İptal şartları mülke göre değişir. Genel yaklaşımımız: tatil tarihinize 14+ gün önce yapılan iptaller için tam iade görüşmesi, 7-14 gün arası kısmi iade. Detaylar rezervasyon onayında ve mülk sahibiyle birlikte netleştirilir.",
      en: "Send your cancellation request via WhatsApp or email. For cancellations 7 or more days before arrival, the amount you paid is refunded. Cancellations within 7 days may be subject to a partial fee depending on season and property; details are shared in the booking confirmation.",
      de: "Senden Sie Ihre Stornierungsanfrage per WhatsApp oder E-Mail. Bei Stornierungen 7 oder mehr Tage vor der Anreise wird der bezahlte Betrag zurückerstattet. Stornierungen innerhalb von 7 Tagen können je nach Saison und Immobilie mit einer Teilgebühr verbunden sein; die Einzelheiten werden in der Buchungsbestätigung mitgeteilt.",
      ru: "Отправьте запрос на отмену через WhatsApp или электронную почту. При отмене за 7 и более дней до заезда уплаченная сумма возвращается. При отмене менее чем за 7 дней может удерживаться частичный сбор в зависимости от сезона и объекта; подробности указываются в подтверждении бронирования.",
    },
  },
  {
    q: {
      tr: "Erken giriş / geç çıkış mümkün müdür?",
      en: "Is early check-in / late check-out possible?",
      de: "Sind ein früher Check-in / später Check-out möglich?",
      ru: "Возможны ли ранний заезд / поздний выезд?",
    },
    a: {
      tr: "Standart giriş 14:00, çıkış 11:00'dir. Aynı gün başka bir misafir yoksa erken giriş ve geç çıkış genellikle ücretsiz olarak değerlendirilebilir; mülke ve operasyona göre değişir. Talebinizi rezervasyon notuna yazmanız yeterli, müsaitliği tatil tarihine yakın bir zamanda teyit ederiz.",
      en: "Standard check-in is 2:00 PM and check-out is 11:00 AM. If there's no same-day guest, early check-in and late check-out are usually free to arrange — this varies by property and operations. Add it to the booking notes; we'll confirm closer to your arrival.",
      de: "Der Standard-Check-in ist um 14:00 Uhr und der Check-out um 11:00 Uhr. Wenn am selben Tag kein weiterer Gast anreist, lassen sich ein früher Check-in und ein später Check-out in der Regel kostenlos arrangieren — dies hängt von der Immobilie und der Auslastung ab. Vermerken Sie es einfach in den Buchungsnotizen; wir bestätigen es kurz vor Ihrer Anreise.",
      ru: "Стандартное время заезда — 14:00, выезда — 11:00. Если в тот же день нет другого гостя, ранний заезд и поздний выезд обычно можно организовать бесплатно — это зависит от объекта и загрузки. Просто укажите это в примечаниях к бронированию; мы подтвердим ближе к дате вашего приезда.",
    },
  },
  {
    q: {
      tr: "Misafir sayısı sonradan değişebilir mi?",
      en: "Can the guest count change after booking?",
      de: "Kann sich die Gästezahl nach der Buchung ändern?",
      ru: "Может ли число гостей измениться после бронирования?",
    },
    a: {
      tr: "Evet, mülkün kapasitesini aşmamak kaydıyla misafir sayısında değişiklik yapılabilir. Bebek ve küçük çocuklar genellikle kapasiteye dahil sayılmaz; bebek beşiği talebinizi önceden iletirseniz mümkün olduğunda ücretsiz sağlamaya çalışırız.",
      en: "Yes, as long as the property's capacity isn't exceeded. Babies and small children are usually not counted toward capacity; if you let us know in advance, we'll try to provide a free baby crib where available.",
      de: "Ja, solange die Kapazität der Immobilie nicht überschritten wird. Babys und Kleinkinder werden in der Regel nicht zur Kapazität gezählt; wenn Sie uns vorab Bescheid geben, versuchen wir, ein kostenloses Babybett bereitzustellen, sofern verfügbar.",
      ru: "Да, при условии что не превышается вместимость объекта. Младенцы и маленькие дети обычно не учитываются при подсчёте вместимости; если вы сообщите заранее, мы постараемся предоставить детскую кроватку бесплатно, когда это возможно.",
    },
  },
  {
    q: {
      tr: "Evcil hayvan ile konaklama mümkün müdür?",
      en: "Are pets allowed?",
      de: "Sind Haustiere erlaubt?",
      ru: "Можно ли с домашними животными?",
    },
    a: {
      tr: "Bazı mülklerimiz evcil hayvan dostudur; bunu rezervasyon öncesinde mülk sahibiyle birlikte teyit ediyoruz. Konaklamanız boyunca standart temizlik ve kullanım kurallarına uyulmasını rica ederiz. Detayları talebinize göre paylaşırız.",
      en: "Some of our apartments are pet-friendly; we confirm this with the owner before booking. We kindly ask that standard cleaning and usage rules are respected during your stay. We'll share details based on your request.",
      de: "Einige unserer Apartments sind haustierfreundlich; wir klären dies vor der Buchung mit dem Eigentümer. Wir bitten Sie, während Ihres Aufenthalts die üblichen Reinigungs- und Nutzungsregeln einzuhalten. Die Einzelheiten teilen wir Ihnen auf Anfrage mit.",
      ru: "Некоторые из наших апартаментов допускают размещение с питомцами; мы подтверждаем это с владельцем до бронирования. Просим вас во время проживания соблюдать стандартные правила уборки и пользования. Подробности сообщим по вашему запросу.",
    },
  },
  {
    q: {
      tr: "Temizlik ücreti ayrıca alınıyor mu?",
      en: "Is there a separate cleaning fee?",
      de: "Fällt eine separate Reinigungsgebühr an?",
      ru: "Взимается ли отдельная плата за уборку?",
    },
    a: {
      tr: "Genellikle kiralama bedeli son temizliği kapsar. Konaklama sırasında ek temizlik talep ederseniz (örn. uzun süreli kalışlarda ara temizlik) hizmet bedeli ayrıca paylaşılır; rezervasyon öncesinde detayları konuşmak isteseniz memnuniyetle bilgi veririz.",
      en: "Usually the rental fee includes end-of-stay cleaning. If you ask for additional cleaning during your stay (e.g. mid-stay cleaning on long bookings), the service is quoted separately. Happy to share details before booking.",
      de: "In der Regel ist die Endreinigung im Mietpreis enthalten. Wenn Sie während Ihres Aufenthalts eine zusätzliche Reinigung wünschen (z. B. eine Zwischenreinigung bei längeren Buchungen), wird diese Leistung separat berechnet. Gerne teilen wir Ihnen die Einzelheiten vor der Buchung mit.",
      ru: "Обычно стоимость аренды включает финальную уборку. Если во время проживания вы попросите дополнительную уборку (например, промежуточную уборку при длительном бронировании), эта услуга оплачивается отдельно. С удовольствием сообщим подробности до бронирования.",
    },
  },
  {
    q: {
      tr: "Mülk sahibi ile direkt iletişim kurabilir miyim?",
      en: "Can I contact the property owner directly?",
      de: "Kann ich den Eigentümer direkt kontaktieren?",
      ru: "Могу ли я напрямую связаться с владельцем?",
    },
    a: {
      tr: "Yaklaşımımız doğrudan iletişime dayanır. Konaklamanız onaylandıktan sonra ihtiyaç halinde mülk sahibinin iletişim bilgilerini paylaşabilir veya konuşmaya aracılık edebiliriz. Ortak hedefimiz misafirin sorularının hızlı ve doğru kişiye ulaşmasıdır.",
      en: "Our model is built around direct contact. After your booking is confirmed, we can share the owner's contact details or relay messages when needed. The goal is for guest questions to reach the right person quickly.",
      de: "Unser Modell beruht auf direktem Kontakt. Nachdem Ihre Buchung bestätigt ist, können wir bei Bedarf die Kontaktdaten des Eigentümers weitergeben oder Nachrichten vermitteln. Ziel ist, dass die Fragen der Gäste schnell die richtige Person erreichen.",
      ru: "Наша модель построена на прямом общении. После подтверждения бронирования мы при необходимости можем предоставить контактные данные владельца или передать сообщения. Наша цель — чтобы вопросы гостей быстро доходили до нужного человека.",
    },
  },
  {
    q: {
      tr: "Komisyon nasıl belirleniyor? (mülk sahipleri için)",
      en: "How is the commission decided? (for owners)",
      de: "Wie wird die Provision festgelegt? (für Eigentümer)",
      ru: "Как определяется комиссия? (для владельцев)",
    },
    a: {
      tr: "Oranı ve koşulları her mülke özel belirliyoruz; standart bir tarifemiz yok. Mülkün lokasyonu, kapasitesi ve istediğiniz hizmet kapsamına göre değerlendirme yapıp size özel oranı anlaşma öncesinde yazılı olarak paylaşıyoruz. Yalnızca gerçekleşmiş rezervasyonlardan komisyon tahakkuk eder; boş kalan günler için ek ücret talep etmiyoruz. Detaylar için /evinizi-kiraya-verin sayfamıza göz atabilir veya bizimle iletişime geçebilirsiniz.",
      en: "We set the rate and terms individually for each property — there's no standard tariff. We assess the location, capacity and service scope you want, then share a rate tailored to your property in writing before signing. Commission only accrues on completed bookings — no fees for empty days. See /evinizi-kiraya-verin or get in touch for details.",
      de: "Satz und Konditionen legen wir für jede Immobilie individuell fest — einen Standardtarif gibt es nicht. Wir bewerten Lage, Kapazität und gewünschten Serviceumfang und teilen Ihnen den auf Ihre Immobilie zugeschnittenen Satz vor Vertragsabschluss schriftlich mit. Provision fällt nur bei tatsächlich erfolgten Buchungen an — für Leerstandstage berechnen wir nichts. Weitere Einzelheiten finden Sie unter /evinizi-kiraya-verin oder kontaktieren Sie uns.",
      ru: "Ставку и условия мы определяем индивидуально для каждого объекта — стандартного тарифа нет. Мы оцениваем расположение, вместимость и нужный вам объём услуг, а затем сообщаем ставку, подобранную под ваш объект, в письменном виде до заключения договора. Комиссия начисляется только за состоявшиеся бронирования — за дни простоя плата не взимается. Подробности смотрите на странице /evinizi-kiraya-verin или свяжитесь с нами.",
    },
  },
  {
    q: {
      tr: "Hasarda ne olur?",
      en: "What happens in case of damage?",
      de: "Was passiert im Schadensfall?",
      ru: "Что происходит в случае повреждений?",
    },
    a: {
      tr: "Her misafirden konaklama öncesinde depozito alıyoruz. Küçük hasarlar depozitodan karşılanır; bu kapsamı aşan hasarlar için durum belgelenir ve misafire fatura edilir. Süreç boyunca hem misafir hem mülk sahibiyle açık iletişim kurmayı hedefliyoruz.",
      en: "We collect a deposit from every guest before the stay. Minor damages are covered by the deposit; anything beyond it is documented and invoiced to the guest. We aim for clear communication with both guest and owner throughout the process.",
      de: "Vor dem Aufenthalt erheben wir von jedem Gast eine Kaution. Kleine Schäden werden von der Kaution gedeckt; darüber hinausgehende Schäden werden dokumentiert und dem Gast in Rechnung gestellt. Während des gesamten Vorgangs legen wir Wert auf eine offene Kommunikation mit Gast und Eigentümer.",
      ru: "Перед заездом мы берём с каждого гостя депозит. Мелкие повреждения покрываются из депозита; всё, что выходит за его пределы, документируется и выставляется гостю к оплате. На протяжении всего процесса мы стремимся к открытому общению как с гостем, так и с владельцем.",
    },
  },
  {
    q: {
      tr: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
      en: "Which payment methods do you accept?",
      de: "Welche Zahlungsmethoden akzeptieren Sie?",
      ru: "Какие способы оплаты вы принимаете?",
    },
    a: {
      tr: "Banka havalesi / EFT (TL) ana ödeme yöntemimizdir. Uluslararası transferler için banka bilgilerini İngilizce talimat ile paylaşabiliriz. Bazı durumlarda kredi kartıyla ödeme (sanal POS aracılığıyla) seçeneği sunulabilir; rezervasyon onayında size en uygun seçeneği iletiyoruz.",
      en: "Bank transfer / EFT (TRY) is our primary method. We can share account details with English instructions for international transfers. In some cases credit-card payment via virtual POS is offered; we share the best option for you in the booking confirmation.",
      de: "Banküberweisung / EFT (TRY) ist unsere wichtigste Zahlungsmethode. Für internationale Überweisungen können wir die Kontodaten mit Anweisungen auf Englisch bereitstellen. In einigen Fällen ist eine Kreditkartenzahlung (über virtuelles POS) möglich; die für Sie beste Option teilen wir Ihnen in der Buchungsbestätigung mit.",
      ru: "Банковский перевод / EFT (TRY) — наш основной способ оплаты. Для международных переводов мы можем предоставить банковские реквизиты с инструкциями на английском языке. В отдельных случаях возможна оплата картой (через виртуальный POS-терминал); наиболее подходящий вариант мы сообщим вам в подтверждении бронирования.",
    },
  },
];
