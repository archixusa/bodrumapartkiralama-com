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
