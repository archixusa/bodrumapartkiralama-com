export type Locale = "tr" | "en" | "de" | "ru";
const TR = { display: "+90 545 432 67 48", tel: "+905454326748", wa: "905454326748" };
const DEFAULT = { display: "+90 538 512 40 88", tel: "+905385124088", wa: "905385124088" };
/** TR gets the new number; all other locales keep the existing number. */
export function getPhone(locale: string) {
  return locale === "tr" ? TR : DEFAULT;
}

/**
 * WhatsApp ön-yazı bağlamları (CRO: boş sohbet sürtünmesi).
 * "genel" site-geneli girişler içindir (header, footer, FAB, mobil yapışkan
 * çubuk); sayfa-özel bağlamlar mesaja sayfa bilgisini ekleyerek operatör
 * tarafında talebin nereden geldiğini netleştirir.
 */
export type WaContext =
  | "genel"
  | "apartlar"
  | "iletisim"
  | "hakkimizda"
  | "talep-sonrasi";

// "genel" metinleri HOME_OFFER_DEFAULT.waText ile birebir aynıdır — tek ses.
const WA_TEXTS: Record<Locale, Record<WaContext, string>> = {
  tr: {
    genel: "Merhaba, Bodrum'da uygun apart arıyorum.",
    apartlar:
      "Merhaba, apartlar sayfanız üzerinden yazıyorum. Tarihlerime uygun apart seçenekleri alabilir miyim?",
    iletisim:
      "Merhaba, iletişim sayfanız üzerinden yazıyorum. Bodrum'da uygun apart arıyorum.",
    hakkimizda:
      "Merhaba, hakkınızdaki sayfayı okudum. Bodrum'da uygun apart arıyorum.",
    "talep-sonrasi":
      "Merhaba, az önce sitenizden müsaitlik talebi gönderdim. WhatsApp'tan devam etmek istiyorum.",
  },
  en: {
    genel: "Hello, I'm looking for a suitable apartment in Bodrum.",
    apartlar:
      "Hello, I'm writing from your apartments page. Could you send me options that fit my dates?",
    iletisim:
      "Hello, I'm writing from your contact page. I'm looking for a suitable apartment in Bodrum.",
    hakkimizda:
      "Hello, I read your about page. I'm looking for a suitable apartment in Bodrum.",
    "talep-sonrasi":
      "Hello, I just sent an availability request on your website. I'd like to continue on WhatsApp.",
  },
  de: {
    genel: "Hallo, ich suche eine passende Ferienwohnung in Bodrum.",
    apartlar:
      "Hallo, ich schreibe über Ihre Apartmentseite. Könnten Sie mir Optionen für meine Reisedaten senden?",
    iletisim:
      "Hallo, ich schreibe über Ihre Kontaktseite. Ich suche eine passende Ferienwohnung in Bodrum.",
    hakkimizda:
      "Hallo, ich habe Ihre Über-uns-Seite gelesen. Ich suche eine passende Ferienwohnung in Bodrum.",
    "talep-sonrasi":
      "Hallo, ich habe gerade über Ihre Website eine Verfügbarkeitsanfrage gesendet. Ich möchte gern über WhatsApp weitermachen.",
  },
  ru: {
    genel: "Здравствуйте, ищу подходящие апартаменты в Бодруме.",
    apartlar:
      "Здравствуйте, пишу со страницы апартаментов. Пришлите, пожалуйста, варианты под мои даты.",
    iletisim:
      "Здравствуйте, пишу со страницы контактов. Ищу подходящие апартаменты в Бодруме.",
    hakkimizda:
      "Здравствуйте, прочитал(а) страницу о вас. Ищу подходящие апартаменты в Бодруме.",
    "talep-sonrasi":
      "Здравствуйте, я только что отправил(а) запрос на сайте. Хочу продолжить в WhatsApp.",
  },
};

/**
 * Locale-duyarlı, ön-yazılı (`?text=`) wa.me linki üretir. Çıplak wa.me
 * linkleri boş sohbet açıyor ve özellikle EN/DE/RU konuşan misafir ne
 * yazacağını bilemiyordu — OfferCtaButton/BlogCta'daki mevcut desenin
 * ortaklaştırılmış hâli.
 */
export function buildWaHref(locale: string, context: WaContext = "genel"): string {
  const l: Locale =
    locale === "tr" || locale === "en" || locale === "de" || locale === "ru"
      ? locale
      : "en";
  const text = WA_TEXTS[l][context] ?? WA_TEXTS[l].genel;
  return `https://wa.me/${getPhone(locale).wa}?text=${encodeURIComponent(text)}`;
}
