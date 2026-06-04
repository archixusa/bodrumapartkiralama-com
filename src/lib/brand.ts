// Shared brand constants — single source of truth for values that must stay
// consistent across components but don't live in the Tailwind token scale.

/**
 * Review / rating star colour.
 *
 * This is a deliberate, warm orange used ONLY for guest-rating stars
 * (Testimonials, ApartmentReviews, the token-gated ReviewForm). It is
 * intentionally distinct from the brand accent token (#EF9F27) so that
 * filled review stars read as a familiar "review orange" rather than a CTA.
 * Keep all three star surfaces pointed at this constant.
 */
export const REVIEW_STAR_COLOR = "#F26A1E";
