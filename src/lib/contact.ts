export type Locale = "tr" | "en" | "de" | "ru";
const TR = { display: "+90 545 432 67 48", tel: "+905454326748", wa: "905454326748" };
const DEFAULT = { display: "+90 538 512 40 88", tel: "+905385124088", wa: "905385124088" };
/** TR gets the new number; all other locales keep the existing number. */
export function getPhone(locale: string) {
  return locale === "tr" ? TR : DEFAULT;
}
