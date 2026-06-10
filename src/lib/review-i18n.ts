// Ortak yorum (review) i18n sözlükleri — GuestReviews (ana sayfa bandı) ve
// ApartmentReviews (apart detayı) AYNI metinleri kullanır. Daha önce
// ApartmentReviews tr/en ikilisinde kalmış, GuestReviews 4 dilliydi; de/ru
// kullanıcısı iki yüzeyi farklı dillerde görüyordu (İ18N bütünlüğü bulgusu).

export const DATE_LOCALE: Record<string, string> = {
  tr: "tr-TR",
  de: "de-DE",
  ru: "ru-RU",
  en: "en-US",
};

export const HEADING: Record<string, string> = {
  tr: "Misafir değerlendirmeleri",
  en: "Guest reviews",
  de: "Gästebewertungen",
  ru: "Отзывы гостей",
};

export const SUB: Record<string, string> = {
  tr: "Konaklamasını tamamlayan misafirlerimizin onaylı yorumları.",
  en: "Verified reviews from guests who completed their stay.",
  de: "Verifizierte Bewertungen von Gästen nach ihrem Aufenthalt.",
  ru: "Проверенные отзывы гостей после проживания.",
};

export const ANON: Record<string, string> = {
  tr: "Anonim Misafir",
  en: "Anonymous Guest",
  de: "Anonymer Gast",
  ru: "Анонимный гость",
};

export const GUEST: Record<string, string> = {
  tr: "Misafir",
  en: "Guest",
  de: "Gast",
  ru: "Гость",
};

/** "(12 değerlendirme)" sayaç sözcüğü. */
export const REVIEWS_WORD: Record<string, string> = {
  tr: "değerlendirme",
  en: "reviews",
  de: "Bewertungen",
  ru: "отзывов",
};

/** 20'den fazla yorum olduğunda gösterilen dipnot. */
export const LATEST_NOTE: Record<string, string> = {
  tr: "Son 20 değerlendirme gösteriliyor.",
  en: "Showing the latest 20 reviews.",
  de: "Die letzten 20 Bewertungen werden angezeigt.",
  ru: "Показаны последние 20 отзывов.",
};

export function pick(map: Record<string, string>, locale: string): string {
  return map[locale] ?? map.en;
}
