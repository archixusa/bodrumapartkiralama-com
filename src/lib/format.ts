export function formatTRY(value: number, locale = "tr-TR") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}
