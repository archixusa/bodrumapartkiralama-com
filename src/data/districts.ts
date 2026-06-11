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
// heroImage: YEREL ~1200px WebP (q≤70) — Unsplash hotlink 1600px kaynaklıydı ve
// bölge sayfası LCP'sini ~7.5s'e taşıyordu (Lighthouse mobil teyitli). Blog hero
// deseniyle aynı: public/images/regions/<slug>-hero.webp, next/image optimize eder.
const structuralDistricts: DistrictStructural[] = [
  {
    slug: "gumbet",
    urlSlug: "gumbet-apart-kiralama",
    name: "Gümbet",
    heroImage: "/images/regions/gumbet-hero.webp",
    nearby: ["bitez", "ortakent"],
    lat: 37.0339,
    lng: 27.4002,
  },
  {
    slug: "turgutreis",
    urlSlug: "turgutreis-apart-kiralama",
    name: "Turgutreis",
    heroImage: "/images/regions/turgutreis-hero.webp",
    nearby: ["yalikavak", "ortakent"],
    lat: 37.0153,
    lng: 27.2657,
  },
  {
    slug: "yalikavak",
    urlSlug: "yalikavak-apart-kiralama",
    name: "Yalıkavak",
    heroImage: "/images/regions/yalikavak-hero.webp",
    nearby: ["gundogan", "turgutreis"],
    lat: 37.1093,
    lng: 27.2913,
  },
  {
    slug: "bitez",
    urlSlug: "bitez-apart-kiralama",
    name: "Bitez",
    heroImage: "/images/regions/bitez-hero.webp",
    nearby: ["gumbet", "ortakent"],
    lat: 37.034,
    lng: 27.367,
  },
  {
    slug: "ortakent",
    urlSlug: "ortakent-apart-kiralama",
    name: "Ortakent",
    heroImage: "/images/regions/ortakent-hero.webp",
    nearby: ["bitez", "gumbet"],
    lat: 37.0517,
    lng: 27.3589,
  },
  {
    slug: "gundogan",
    urlSlug: "gundogan-apart-kiralama",
    name: "Gündoğan",
    heroImage: "/images/regions/gundogan-hero.webp",
    nearby: ["yalikavak", "torba"],
    lat: 37.1311,
    lng: 27.3458,
  },
  {
    slug: "torba",
    urlSlug: "torba-apart-kiralama",
    name: "Torba",
    heroImage: "/images/regions/torba-hero.webp",
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
