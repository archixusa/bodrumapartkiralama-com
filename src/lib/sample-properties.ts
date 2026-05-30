import type { DistrictSlug } from "@/data/districts";

/**
 * Representative sample properties for the homepage "collection" grid.
 *
 * IMPORTANT: these are NOT real, bookable listings. They illustrate the kind
 * of apartments we work with across Bodrum. Each card must carry an "Örnek"
 * (sample) badge and an honesty notice. There is intentionally NO price field —
 * the site only collects "request a quote" leads.
 */
export interface SampleProperty {
  id: string;
  /** Localized display title. */
  title: { tr: string; en: string; de: string; ru: string };
  /** District display name (already proper-cased). */
  region: string;
  /** District slug, used for the region badge + lead prefill + image path. */
  regionSlug: DistrictSlug;
  bedrooms: number;
  guests: number;
  /** Localized amenity chips. */
  amenities: {
    tr: string[];
    en: string[];
    de: string[];
    ru: string[];
  };
  /** Local webp under /images/samples/<regionSlug>-apart.webp */
  image: string;
}

export const sampleProperties: SampleProperty[] = [
  {
    id: "sample-gumbet-2plus1",
    title: {
      tr: "Deniz Manzaralı 2+1",
      en: "Sea-View 2+1",
      de: "2+1 mit Meerblick",
      ru: "2+1 с видом на море",
    },
    region: "Gümbet",
    regionSlug: "gumbet",
    bedrooms: 2,
    guests: 4,
    amenities: {
      tr: ["Deniz manzarası", "Klima", "Wi-Fi", "Balkon"],
      en: ["Sea view", "A/C", "Wi-Fi", "Balcony"],
      de: ["Meerblick", "Klimaanlage", "WLAN", "Balkon"],
      ru: ["Вид на море", "Кондиционер", "Wi-Fi", "Балкон"],
    },
    image: "/images/samples/gumbet-apart.webp",
  },
  {
    id: "sample-yalikavak-1plus1",
    title: {
      tr: "Marina Yakını 1+1",
      en: "1+1 Near the Marina",
      de: "1+1 in Marina-Nähe",
      ru: "1+1 рядом с мариной",
    },
    region: "Yalıkavak",
    regionSlug: "yalikavak",
    bedrooms: 1,
    guests: 2,
    amenities: {
      tr: ["Marinaya yürüme", "Klima", "Wi-Fi", "Modern tasarım"],
      en: ["Walk to marina", "A/C", "Wi-Fi", "Modern design"],
      de: ["Zu Fuß zur Marina", "Klimaanlage", "WLAN", "Modernes Design"],
      ru: ["Пешком до марины", "Кондиционер", "Wi-Fi", "Современный дизайн"],
    },
    image: "/images/samples/yalikavak-apart.webp",
  },
  {
    id: "sample-turgutreis-3plus1",
    title: {
      tr: "Aile Tipi 3+1",
      en: "Family 3+1",
      de: "Familienwohnung 3+1",
      ru: "Семейная 3+1",
    },
    region: "Turgutreis",
    regionSlug: "turgutreis",
    bedrooms: 3,
    guests: 6,
    amenities: {
      tr: ["Aile dostu", "Tam donanımlı mutfak", "Klima", "Wi-Fi"],
      en: ["Family-friendly", "Full kitchen", "A/C", "Wi-Fi"],
      de: ["Familienfreundlich", "Voll ausgestattete Küche", "Klimaanlage", "WLAN"],
      ru: ["Для семьи", "Полная кухня", "Кондиционер", "Wi-Fi"],
    },
    image: "/images/samples/turgutreis-apart.webp",
  },
  {
    id: "sample-bitez-2plus1",
    title: {
      tr: "Sahile Yakın 2+1",
      en: "2+1 Close to the Beach",
      de: "2+1 strandnah",
      ru: "2+1 рядом с пляжем",
    },
    region: "Bitez",
    regionSlug: "bitez",
    bedrooms: 2,
    guests: 4,
    amenities: {
      tr: ["Sahile yürüme", "Bahçe", "Klima", "Wi-Fi"],
      en: ["Walk to beach", "Garden", "A/C", "Wi-Fi"],
      de: ["Zu Fuß zum Strand", "Garten", "Klimaanlage", "WLAN"],
      ru: ["Пешком до пляжа", "Сад", "Кондиционер", "Wi-Fi"],
    },
    image: "/images/samples/bitez-apart.webp",
  },
  {
    id: "sample-ortakent-2plus1",
    title: {
      tr: "Köy İçi Sakin 2+1",
      en: "Quiet Village 2+1",
      de: "Ruhige 2+1 im Dorf",
      ru: "Тихая 2+1 в деревне",
    },
    region: "Ortakent",
    regionSlug: "ortakent",
    bedrooms: 2,
    guests: 4,
    amenities: {
      tr: ["Sakin konum", "Bahçe", "Klima", "Wi-Fi"],
      en: ["Quiet setting", "Garden", "A/C", "Wi-Fi"],
      de: ["Ruhige Lage", "Garten", "Klimaanlage", "WLAN"],
      ru: ["Тихое расположение", "Сад", "Кондиционер", "Wi-Fi"],
    },
    image: "/images/samples/ortakent-apart.webp",
  },
  {
    id: "sample-gundogan-1plus1",
    title: {
      tr: "Yamaç Deniz Manzaralı 1+1",
      en: "Hillside Sea-View 1+1",
      de: "1+1 am Hang mit Meerblick",
      ru: "1+1 на склоне с видом на море",
    },
    region: "Gündoğan",
    regionSlug: "gundogan",
    bedrooms: 1,
    guests: 2,
    amenities: {
      tr: ["Deniz manzarası", "Teras", "Klima", "Wi-Fi"],
      en: ["Sea view", "Terrace", "A/C", "Wi-Fi"],
      de: ["Meerblick", "Terrasse", "Klimaanlage", "WLAN"],
      ru: ["Вид на море", "Терраса", "Кондиционер", "Wi-Fi"],
    },
    image: "/images/samples/gundogan-apart.webp",
  },
];
