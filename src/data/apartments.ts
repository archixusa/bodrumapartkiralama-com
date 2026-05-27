import type { DistrictSlug } from "./districts";

// NOTE: Demo apart verileri launch öncesi temizlikte kaldırıldı.
// Orijinal yedek: _backup/original-source/apartments.ts.bak
// Gerçek mülk verileri geldiğinde aşağıdaki diziye eklenmelidir.
// Tip tanımları (Apartment, FeatureKey) korunmuştur — diğer modüller bu tipleri import ediyor.

export type FeatureKey =
  | "pool"
  | "wifi"
  | "ac"
  | "seaView"
  | "parking"
  | "kitchen"
  | "balcony"
  | "washer"
  | "dishwasher"
  | "smartTv"
  | "garden"
  | "bbq"
  | "elevator"
  | "petFriendly"
  | "babyCrib"
  | "workspace";

export const featureLabel: Record<FeatureKey, { tr: string; en: string }> = {
  pool: { tr: "Havuz", en: "Pool" },
  wifi: { tr: "Wi-Fi", en: "Wi-Fi" },
  ac: { tr: "Klima", en: "Air conditioning" },
  seaView: { tr: "Deniz manzarası", en: "Sea view" },
  parking: { tr: "Otopark", en: "Parking" },
  kitchen: { tr: "Tam donanımlı mutfak", en: "Full kitchen" },
  balcony: { tr: "Balkon / teras", en: "Balcony / terrace" },
  washer: { tr: "Çamaşır makinesi", en: "Washing machine" },
  dishwasher: { tr: "Bulaşık makinesi", en: "Dishwasher" },
  smartTv: { tr: "Smart TV", en: "Smart TV" },
  garden: { tr: "Bahçe", en: "Garden" },
  bbq: { tr: "Mangal", en: "BBQ" },
  elevator: { tr: "Asansör", en: "Elevator" },
  petFriendly: { tr: "Evcil hayvan dostu", en: "Pet-friendly" },
  babyCrib: { tr: "Bebek beşiği", en: "Baby crib" },
  workspace: { tr: "Çalışma alanı", en: "Workspace" },
};

export interface Apartment {
  id: string;
  slug: string;
  titleTr: string;
  titleEn: string;
  district: DistrictSlug;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  area_m2: number;
  features: FeatureKey[];
  highSeasonPrice: number;
  lowSeasonPrice: number;
  descriptionTr: string;
  descriptionEn: string;
  images: string[];
  rating: number;
  reviewCount: number;
  bookingFallbackUrl: string;
  featured?: boolean;
  tags?: string[];
}

export const apartments: Apartment[] = [];

export function getApartment(_slug: string): Apartment | undefined {
  return undefined;
}

export function getApartmentsByDistrict(_district: DistrictSlug): Apartment[] {
  return [];
}

export function getFeaturedApartments(_limit = 6): Apartment[] {
  return [];
}
