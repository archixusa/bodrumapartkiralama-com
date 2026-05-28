export type DataLang = "tr" | "en" | "de" | "ru";

export function loc(
  locale: string,
  f: { tr: string; en: string; de?: string; ru?: string }
): string {
  switch (locale as DataLang) {
    case "tr":
      return f.tr;
    case "de":
      return f.de ?? f.en;
    case "ru":
      return f.ru ?? f.en;
    default:
      return f.en;
  }
}

export function locArr(
  locale: string,
  f: { tr: string[]; en: string[]; de?: string[]; ru?: string[] }
): string[] {
  switch (locale as DataLang) {
    case "tr":
      return f.tr;
    case "de":
      return f.de ?? f.en;
    case "ru":
      return f.ru ?? f.en;
    default:
      return f.en;
  }
}
