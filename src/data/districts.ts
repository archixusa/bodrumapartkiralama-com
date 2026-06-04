import contentJson from "./districts.content.json";

export type DistrictSlug =
  | "gumbet"
  | "turgutreis"
  | "yalikavak"
  | "bitez"
  | "ortakent"
  | "gundogan"
  | "torba";

export interface District {
  slug: DistrictSlug;
  urlSlug: string;
  name: string;
  shortDescTr: string;
  shortDescEn: string;
  shortDescDe?: string;
  shortDescRu?: string;
  longDescTr: string;
  longDescEn: string;
  longDescDe?: string;
  longDescRu?: string;
  heroImage: string;
  highlights: { tr: string[]; en: string[]; de?: string[]; ru?: string[] };
  nearby: DistrictSlug[];
  lat: number;
  lng: number;
}

/**
 * Editable localized content lives in districts.content.json (keyed by slug)
 * so it can be edited through a panel / git PR without touching this module.
 * The shapes below describe that JSON and merge it back into the structural
 * fields to produce the exported `districts` array.
 */
interface LocaleText {
  tr: string;
  en: string;
  de?: string;
  ru?: string;
}

interface LocaleList {
  tr: string[];
  en: string[];
  de?: string[];
  ru?: string[];
}

interface DistrictContent {
  shortDesc: LocaleText;
  longDesc: LocaleText;
  highlights: LocaleList;
}

/** Structural fields only — localized text comes from the content JSON. */
type DistrictStructural = Omit<
  District,
  | "shortDescTr"
  | "shortDescEn"
  | "shortDescDe"
  | "shortDescRu"
  | "longDescTr"
  | "longDescEn"
  | "longDescDe"
  | "longDescRu"
  | "highlights"
>;

const content = contentJson as Record<string, DistrictContent>;

// Insertion order here defines the order of `districts` (homepage uses slice(0,6)).
const structuralDistricts: DistrictStructural[] = [
  {
    slug: "gumbet",
    urlSlug: "gumbet-apart-kiralama",
    name: "Gümbet",
    heroImage:
      "https://images.unsplash.com/photo-1566084091852-0385135abadc?auto=format&fit=crop&w=1600&q=80",
    nearby: ["bitez", "ortakent"],
    lat: 37.0339,
    lng: 27.4002,
  },
  {
    slug: "turgutreis",
    urlSlug: "turgutreis-apart-kiralama",
    name: "Turgutreis",
    heroImage:
      "https://images.unsplash.com/photo-1595880992139-8cf2ef915d78?auto=format&fit=crop&w=1600&q=80",
    nearby: ["yalikavak", "ortakent"],
    lat: 37.0153,
    lng: 27.2657,
  },
  {
    slug: "yalikavak",
    urlSlug: "yalikavak-apart-kiralama",
    name: "Yalıkavak",
    heroImage:
      "https://images.unsplash.com/photo-1598114570969-a4df3e85de9b?auto=format&fit=crop&w=1600&q=80",
    nearby: ["gundogan", "turgutreis"],
    lat: 37.1093,
    lng: 27.2913,
  },
  {
    slug: "bitez",
    urlSlug: "bitez-apart-kiralama",
    name: "Bitez",
    heroImage:
      "https://images.unsplash.com/photo-1591078314870-fe9b75a1665a?auto=format&fit=crop&w=1600&q=80",
    nearby: ["gumbet", "ortakent"],
    lat: 37.034,
    lng: 27.367,
  },
  {
    slug: "ortakent",
    urlSlug: "ortakent-apart-kiralama",
    name: "Ortakent",
    heroImage:
      "https://images.unsplash.com/photo-1727713682954-271a2135c375?auto=format&fit=crop&w=1600&q=80",
    nearby: ["bitez", "gumbet"],
    lat: 37.0517,
    lng: 27.3589,
  },
  {
    slug: "gundogan",
    urlSlug: "gundogan-apart-kiralama",
    name: "Gündoğan",
    heroImage:
      "https://images.unsplash.com/photo-1734723042943-db74efd1d40a?auto=format&fit=crop&w=1600&q=80",
    nearby: ["yalikavak", "torba"],
    lat: 37.1311,
    lng: 27.3458,
  },
  {
    slug: "torba",
    urlSlug: "torba-apart-kiralama",
    name: "Torba",
    heroImage:
      "https://images.unsplash.com/photo-1684858504602-677ac40eadfd?auto=format&fit=crop&w=1600&q=80",
    nearby: ["gundogan", "yalikavak"],
    lat: 37.0859,
    lng: 27.4406,
  },
];

function mergeDistrict(base: DistrictStructural): District {
  const c = content[base.slug];
  if (!c) {
    throw new Error(`Missing content for district "${base.slug}" in districts.content.json`);
  }

  const merged: District = {
    ...base,
    shortDescTr: c.shortDesc.tr,
    shortDescEn: c.shortDesc.en,
    longDescTr: c.longDesc.tr,
    longDescEn: c.longDesc.en,
    highlights: c.highlights,
  };

  if (c.shortDesc.de !== undefined) merged.shortDescDe = c.shortDesc.de;
  if (c.shortDesc.ru !== undefined) merged.shortDescRu = c.shortDesc.ru;
  if (c.longDesc.de !== undefined) merged.longDescDe = c.longDesc.de;
  if (c.longDesc.ru !== undefined) merged.longDescRu = c.longDesc.ru;

  return merged;
}

export const districts: District[] = structuralDistricts.map(mergeDistrict);

export function getDistrict(slug: string): District | undefined {
  return districts.find((d) => d.slug === slug || d.urlSlug === slug);
}
