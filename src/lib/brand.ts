// Shared brand constants — single source of truth for values that must stay
// consistent across components but don't live in the Tailwind token scale.

/**
 * Review / rating star colour = gunes-400 (DESIGN_SPEC.md §1).
 *
 * The spec reserves gunes-400 (#FFB23E) for star ratings/badges, and
 * ApartCard's rating badge already renders `fill-gunes-400` — every star
 * surface (GuestReviews, ApartmentReviews, the token-gated ReviewForm,
 * ApartCard) must show the SAME orange. Keep all of them pointed at this
 * constant / the gunes-400 token.
 */
export const REVIEW_STAR_COLOR = "#FFB23E";

/**
 * Spec token'larının inline-style (Tailwind dışı) yüzeylerdeki karşılıkları
 * (DESIGN_SPEC.md §1). ReviewForm, UnsubscribeClient ve ApartmentReviews gibi
 * kendi başına stillenen bileşenler renkleri BURADAN okur — tek vurgu rengi
 * yenilenip dosyanın kalanı eski slate/lacivert palette kalmasın diye.
 */
export const INK = "#06343B"; // murekkep-900 — ana metin
export const MUTED = "#546E70"; // soluk metin (kum/beyaz zeminlerde AA)
export const BORDER = "#F0E2CF"; // kum-cizgi — kenarlıklar
export const ACCENT = "#0B7E80"; // turkuaz-600 — buton/vurgu zemini
export const ACCENT_DARK = "#06676A"; // turkuaz-700 — hover/koyu vurgu
export const DANGER = "#A32D2D"; // semantik hata (danger token)
