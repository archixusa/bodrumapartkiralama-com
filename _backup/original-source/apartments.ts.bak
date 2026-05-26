import type { DistrictSlug } from "./districts";

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

const img = (q: string, photoId: string) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1600&q=80`;

export const apartments: Apartment[] = [
  {
    id: "ap-001",
    slug: "gumbet-deniz-manzarali-1-1-havuzlu",
    titleTr: "Gümbet Sahile 200m Deniz Manzaralı 1+1 Havuzlu Apart",
    titleEn: "Gümbet Sea View 1+1 with Pool, 200m to Beach",
    district: "gumbet",
    capacity: 3,
    bedrooms: 1,
    bathrooms: 1,
    area_m2: 55,
    features: [
      "pool",
      "wifi",
      "ac",
      "seaView",
      "balcony",
      "kitchen",
      "washer",
      "smartTv",
      "elevator",
      "parking",
    ],
    highSeasonPrice: 3200,
    lowSeasonPrice: 1600,
    descriptionTr:
      "Gümbet'in en sevilen bölgesinde, sahile 200 metre mesafede, havuzlu bir site içinde yer alan 1+1 apartımız 3 misafire kadar konforlu konaklama sunar. 55 m² brüt alanı, açık plan oturma-yemek-mutfak düzeniyle ferah hissettirir. Balkondan Gümbet koyunun mavisi ve günbatımı izlenebilir. Yatak odasında çift kişilik kaliteli yatak, oturma odasında ek olarak çekyat bulunmaktadır. Mutfak; ocak, fırın, buzdolabı, çamaşır makinesi, kahve makinesi ve yemek için gereken tüm gereçlerle tam donanımlıdır. Klima hem oturma alanında hem yatak odasında mevcuttur ve fiber internet 200 Mbps hızındadır. Site içinde 24 saat güvenlik, kapalı otopark, yetişkin ve çocuk havuzu, fitness alanı ve şezlong-şemsiyeli bahçe vardır. Sahile yürüyerek 3 dakika, Bodrum merkezine taksiyle 5 dakika, ana caddedeki bar ve restoranlara 1 dakika mesafededir. Ailelerle, genç çiftlerle veya küçük arkadaş grubuyla seyahat edenler için ideal; Gümbet'in canlı havasının ortasında ama çekildiğinizde sessiz bir alana inebileceğiniz dengeli bir konaklama. Apartı her misafir girişinden önce kendi ekibimiz temizler, çarşaflar her seferinde değiştirilir. Vardığınızda anahtarı kapıda teslim alır, çıkışta sadece anahtarı bırakırsınız.",
    descriptionEn:
      "In one of Gümbet's most beloved pockets, just 200m from the beach inside a pool complex, this 1-bedroom apartment comfortably hosts up to 3 guests. The 55 m² open-plan layout connects the living, dining and kitchen areas into one bright space. The balcony overlooks the blue of Gümbet bay and frames the sunset. The bedroom has a quality double bed; the living room adds a sofa bed for a third guest. The kitchen is fully equipped with hob, oven, fridge, washing machine, coffee maker and everything you need to cook. Air conditioning is fitted in both the living area and bedroom, and fibre internet runs at 200 Mbps. The complex includes 24-hour security, covered parking, adult and children's pools, a fitness area, and a sun-bed garden. It's a 3-minute walk to the beach, a 5-minute taxi to Bodrum centre, and 1 minute to the main avenue's bars and restaurants. Ideal for couples, small families or a tight friend group: you're in the middle of Gümbet's energy but can retreat to a quiet pool whenever you like. The apartment is cleaned by our own team before every guest, with fresh linen each stay. Pick up the key at the door on arrival and simply leave it on the way out.",
    images: [
      img("apt", "1522708323590-d24dbb6b0267"),
      img("apt", "1502672260266-1c1ef2d93688"),
      img("apt", "1505693416388-ac5ce068fe85"),
      img("apt", "1560448204-e02f11c3d0e2"),
      img("apt", "1493809842364-78817add7ffb"),
    ],
    rating: 4.8,
    reviewCount: 47,
    bookingFallbackUrl: "",
    featured: true,
    tags: ["Havuz", "Sahile yakın"],
  },
  {
    id: "ap-002",
    slug: "gumbet-2-1-aile-konseptli-balkonlu",
    titleTr: "Gümbet Aile Konseptli Balkonlu 2+1 Apart, Site İçinde",
    titleEn: "Gümbet Family 2+1 Apartment with Balcony, in Complex",
    district: "gumbet",
    capacity: 5,
    bedrooms: 2,
    bathrooms: 1,
    area_m2: 80,
    features: [
      "pool",
      "wifi",
      "ac",
      "balcony",
      "kitchen",
      "washer",
      "dishwasher",
      "smartTv",
      "elevator",
      "parking",
      "babyCrib",
    ],
    highSeasonPrice: 4200,
    lowSeasonPrice: 2100,
    descriptionTr:
      "Gümbet'in aile ağırlıklı kuzey yamacında, gürültüden uzak ama her şeye yakın bir site içinde yer alan 2+1 apartımız 4-5 kişilik aileler veya iki çift için ideal bir konaklama sunar. 80 m² brüt alan; geniş oturma odası, ayrı yemek köşesi, açık Amerikan mutfak, iki yatak odası ve geniş bir banyodan oluşur. Ana yatak odasında çift kişilik yatak ve dolap, ikinci yatak odasında iki tek kişilik yatak bulunur; oturma alanında çekyat ile beşinci misafir ağırlanabilir. Bebekli misafirler için talep üzerine ücretsiz bebek beşiği temin edilir. Site içinde büyük bir yetişkin havuzu, ayrı çocuk havuzu, oyun alanı ve 24 saat güvenlik vardır. Mutfak tam donanımlıdır: bulaşık makinesi, çamaşır makinesi, fırın, ocak, kahve makinesi, su sebili. Balkondan yamacın ve sitenin yeşil bahçesi izlenir; akşamları sakin bir ortam sunar. Gümbet'in canlı sahil hattına yürüyerek 8 dakika, Bodrum merkezine taksiyle 7 dakika mesafededir. Site içi kapalı otopark mevcuttur. Çocuklu aileler için sığ çocuk havuzu, plajdaki kum-deniz oyunları ve yakın marketler ailenin tatil ritmini bozmaz. Apartımız her misafir girişinden önce profesyonel olarak temizlenir.",
    descriptionEn:
      "On Gümbet's family-friendly northern slope — away from the noise but close to everything — this 2-bedroom apartment is the right pick for families of 4-5 or two couples. The 80 m² layout features a generous living room, a separate dining nook, an open kitchen, two bedrooms and a large bathroom. The master bedroom has a double bed and wardrobe; the second has two single beds. A sofa bed in the living area sleeps a fifth guest. A free baby crib is provided on request. The complex has a large adult pool, a separate children's pool, a play area, and 24-hour security. The kitchen is fully equipped: dishwasher, washing machine, oven, hob, coffee maker, water cooler. The balcony overlooks the complex's green garden — calm in the evenings. It's an 8-minute walk to Gümbet's lively beachfront and a 7-minute taxi to Bodrum centre. Covered parking is available within the complex. The shallow children's pool, sand-and-sea play at the beach, and nearby supermarkets all keep the family routine intact. The apartment is professionally cleaned before every guest arrival.",
    images: [
      img("apt", "1560448204-e02f11c3d0e2"),
      img("apt", "1502672260266-1c1ef2d93688"),
      img("apt", "1493809842364-78817add7ffb"),
      img("apt", "1505693416388-ac5ce068fe85"),
      img("apt", "1522708323590-d24dbb6b0267"),
    ],
    rating: 4.7,
    reviewCount: 62,
    bookingFallbackUrl: "",
    featured: true,
    tags: ["Aile", "Havuz"],
  },
  {
    id: "ap-003",
    slug: "turgutreis-sahil-cephesi-2-1-gun-batimi-manzarali",
    titleTr: "Turgutreis Sahil Cephesi 2+1 Gün Batımı Manzaralı Apart",
    titleEn: "Turgutreis Seafront 2+1 with Sunset View",
    district: "turgutreis",
    capacity: 4,
    bedrooms: 2,
    bathrooms: 2,
    area_m2: 95,
    features: [
      "wifi",
      "ac",
      "seaView",
      "balcony",
      "kitchen",
      "washer",
      "dishwasher",
      "smartTv",
      "elevator",
      "parking",
    ],
    highSeasonPrice: 4800,
    lowSeasonPrice: 2400,
    descriptionTr:
      "Turgutreis'in en güzel gün batımının izlendiği sahil bandında yer alan bu 2+1 apart, denize sıfır bir konuma sahiptir. 95 m² brüt alanı, iki ferah yatak odası, iki tam donanımlı banyo, ayrı oturma ve yemek alanları ve uzun bir balkondan oluşur. Balkonda kahvaltı edebilir, akşamları Türkiye'nin en güzel günbatımlarından birini şarap eşliğinde izleyebilirsiniz. Ana yatak odasında çift kişilik yatak ve gardırop, ikinci yatak odasında iki tek kişilik yatak bulunur. Mutfak; bulaşık makinesi, çamaşır makinesi, fırın, ankastre ocak, mikrodalga ve kahve makinesi ile tam donanımlıdır. Site içinde asansör, güvenlik ve özel otopark vardır. Bina çıkışında doğrudan sahile, oradan da Turgutreis marinasına yürüyebilirsiniz. Marina; restoranlar, butikler, bar ve dondurmacılarla çevrilidir. Cumartesi günleri kurulan ünlü Turgutreis pazarı 5 dakikalık yürüyüş mesafesindedir; Kos adasına feribot iskelesi ise bina çıkışında. Aileler, çiftler ve sakin lüks arayanlar için uygun bir konaklama. Apart her girişten önce profesyonel ekip tarafından temizlenir, çarşaf ve havlular her seferinde yenilenir. Vardığınızda anahtarı kapıda teslim alırsınız.",
    descriptionEn:
      "On the seafront promenade where Turgutreis hosts one of Turkey's finest sunsets, this 2-bedroom apartment sits directly on the water. The 95 m² layout offers two bright bedrooms, two full bathrooms, separate living and dining areas, and a long balcony. Have breakfast outside, then watch the sunset over a glass of wine in the evening. The master bedroom features a double bed and wardrobe, the second has two single beds. The kitchen is fully equipped: dishwasher, washing machine, oven, hob, microwave, and coffee maker. The complex has an elevator, security and private parking. Step out of the building straight onto the shoreline and walk to Turgutreis marina, ringed with restaurants, boutiques, bars and gelato shops. The famous Saturday market is a 5-minute walk away; the ferry pier to Kos island is right outside. Ideal for couples, families and travellers seeking quiet luxury. The apartment is professionally cleaned before every check-in, with fresh linen and towels each time. Pick up the key at the door on arrival.",
    images: [
      img("apt", "1505691938895-1758d7feb511"),
      img("apt", "1502672260266-1c1ef2d93688"),
      img("apt", "1493809842364-78817add7ffb"),
      img("apt", "1560185007-cde436f6a4d0"),
      img("apt", "1522708323590-d24dbb6b0267"),
    ],
    rating: 4.9,
    reviewCount: 38,
    bookingFallbackUrl: "",
    featured: true,
    tags: ["Deniz manz.", "Gün batımı"],
  },
  {
    id: "ap-004",
    slug: "turgutreis-uygun-fiyatli-1-1-merkez",
    titleTr: "Turgutreis Merkezde Uygun Fiyatlı 1+1 Apart",
    titleEn: "Turgutreis Affordable 1+1 in Town Centre",
    district: "turgutreis",
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    area_m2: 50,
    features: [
      "wifi",
      "ac",
      "balcony",
      "kitchen",
      "washer",
      "smartTv",
      "elevator",
    ],
    highSeasonPrice: 2400,
    lowSeasonPrice: 1200,
    descriptionTr:
      "Turgutreis merkezinde, sahile ve pazara yürüme mesafesinde, yeni yapılmış bir bina içindeki 1+1 apartımız çiftler için ideal bir tatil köşesi. 50 m² brüt alanı; ayrı yatak odası, açık plan oturma-mutfak ve geniş balkondan oluşur. Yatak odasında kaliteli çift kişilik yatak, dolap ve çalışma alanı bulunur. Mutfak; ocak, fırın, çamaşır makinesi, kahve makinesi ve yemek için gereken tüm gereçlerle donanımlıdır. Klima hem oturma alanında hem yatak odasında mevcut, fiber internet 100 Mbps hızındadır. Balkondan Turgutreis'in sokakları ve gün batımı izlenir. Bina çıkışında yürüyerek 3 dakikada Turgutreis sahiline, 5 dakikada cumartesi pazarına, 1 dakikada en sevilen kahvaltı evlerine ulaşırsınız. Kos adasına feribot iskelesi 7 dakika yürüme mesafesindedir. Uzun süreli kalışlarda (haftalık) indirim uygulanmaktadır; tatilini bütçeli planlayan çiftler, uzaktan çalışmak isteyen dijital göçebeler veya kısa kaçamak isteyenler için son derece uygundur. Apart her misafir girişinden önce profesyonel olarak temizlenir, çarşaf ve havlular yenilenir.",
    descriptionEn:
      "In central Turgutreis, within walking distance of the seafront and the weekly market, this 1-bedroom apartment in a newly-built block is a perfect base for couples. The 50 m² layout includes a separate bedroom, open-plan living-kitchen, and a wide balcony. The bedroom has a quality double bed, wardrobe and a small desk. The kitchen is equipped with hob, oven, washing machine, coffee maker and everything needed to cook a meal. Air conditioning runs in both the living area and bedroom, with 100 Mbps fibre internet. The balcony overlooks Turgutreis's streets and catches the sunset. From the door, it's a 3-minute walk to the shore, 5 minutes to the Saturday market, and 1 minute to the area's favourite breakfast spots. The Kos ferry pier is a 7-minute walk away. Weekly discounts apply — ideal for budget-conscious couples, digital nomads or short getaways. The apartment is professionally cleaned before each arrival, with fresh linen and towels.",
    images: [
      img("apt", "1493809842364-78817add7ffb"),
      img("apt", "1505691938895-1758d7feb511"),
      img("apt", "1505693416388-ac5ce068fe85"),
      img("apt", "1560448204-e02f11c3d0e2"),
      img("apt", "1502672260266-1c1ef2d93688"),
    ],
    rating: 4.6,
    reviewCount: 29,
    bookingFallbackUrl: "",
    tags: ["Uygun fiyat", "Çift"],
  },
  {
    id: "ap-005",
    slug: "yalikavak-marina-yakini-lux-2-1",
    titleTr: "Yalıkavak Marina Yakınında Lüks 2+1 Havuzlu Apart",
    titleEn: "Yalıkavak Luxury 2+1 with Pool, near Marina",
    district: "yalikavak",
    capacity: 4,
    bedrooms: 2,
    bathrooms: 2,
    area_m2: 110,
    features: [
      "pool",
      "wifi",
      "ac",
      "seaView",
      "balcony",
      "kitchen",
      "washer",
      "dishwasher",
      "smartTv",
      "elevator",
      "parking",
      "garden",
    ],
    highSeasonPrice: 6500,
    lowSeasonPrice: 3200,
    descriptionTr:
      "Yalıkavak'ın butik marinasına yürüme mesafesindeki bu lüks 2+1 apart, modern tasarımıyla ve geniş havuz alanıyla şık bir tatil deneyimi sunar. 110 m² brüt alanı; iki büyük yatak odası, iki ensuite banyo, ayrı oturma odası, açık Amerikan mutfak ve büyük bir terastan oluşur. Ana yatak odasında king size yatak, walk-in dolap ve özel banyo bulunur; ikinci yatak odasında çift kişilik yatak ve banyo vardır. Mutfak; Bosch ankastre seti, espresso makinesi, şarap dolabı ve adada kahvaltı için bar tabureleri ile lüks bir kullanım sunar. Terastan Yalıkavak'ın ışıkları ve marina manzarası izlenir; gün boyu güneş alan büyük bir teras şezlongu da mevcuttur. Site içinde tropikal peyzajlı büyük bir havuz, çocuk havuzu, fitness merkezi, sauna ve hamam, 24 saat güvenlik, valet servisi ve kapalı otopark vardır. Marina'ya yürüyerek 8 dakika, Tilkicik Koyu'na arabayla 10 dakika mesafededir. Yalıkavak'ın ünlü chef restoranları, butikleri ve süper yat manzarası ayağınızın altındadır. Bal ayı çiftleri, sakin lüks isteyen aileler veya küçük arkadaş grupları için ideal. Apart, otel standardında profesyonel ekip tarafından her giriş öncesi temizlenir.",
    descriptionEn:
      "Within walking distance of Yalıkavak's boutique marina, this luxurious 2-bedroom apartment offers a refined stay with modern design and a generous pool area. The 110 m² layout includes two large bedrooms, two ensuite bathrooms, a separate living room, an open kitchen, and a wide terrace. The master has a king bed, walk-in wardrobe and private bath; the second has a double bed and its own bath. The kitchen comes with a full Bosch built-in suite, espresso machine, wine fridge, and breakfast bar stools at the island. The terrace overlooks Yalıkavak's lights and the marina, with sun loungers for the day. The complex includes a tropically landscaped pool, kids' pool, fitness centre, sauna and Turkish bath, 24-hour security, valet service and covered parking. It's an 8-minute walk to the marina and a 10-minute drive to Tilkicik cove. Yalıkavak's renowned chef restaurants, boutiques and superyacht views are right at your door. Ideal for honeymooners, families seeking quiet luxury, or small groups of friends. Cleaned to hotel standards before every arrival by our professional team.",
    images: [
      img("apt", "1560185007-cde436f6a4d0"),
      img("apt", "1502672260266-1c1ef2d93688"),
      img("apt", "1505691938895-1758d7feb511"),
      img("apt", "1560448204-e02f11c3d0e2"),
      img("apt", "1493809842364-78817add7ffb"),
    ],
    rating: 4.9,
    reviewCount: 24,
    bookingFallbackUrl: "",
    featured: true,
    tags: ["Lüks", "Havuz", "Marina"],
  },
  {
    id: "ap-006",
    slug: "yalikavak-deniz-manzarali-1-1-stuudyo",
    titleTr: "Yalıkavak Eski Mahallede Tasarım 1+1 Apart",
    titleEn: "Yalıkavak Design 1+1 in the Old Quarter",
    district: "yalikavak",
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    area_m2: 60,
    features: [
      "wifi",
      "ac",
      "seaView",
      "balcony",
      "kitchen",
      "washer",
      "smartTv",
      "workspace",
    ],
    highSeasonPrice: 3600,
    lowSeasonPrice: 1800,
    descriptionTr:
      "Yalıkavak'ın geleneksel beyaz badanalı eski mahallesinde, dar arnavut kaldırımlı sokakların arasında, bougainville sarmalı bir taş binanın üst katında yer alan bu 1+1 tasarım apart, çiftler için sakin ve estetik bir tatil sunar. 60 m² brüt alanı; modern mobilyalar, açık tuğla duvarlar ve yerli tasarımcılardan seçilmiş aksesuarlarla dekore edilmiştir. Yatak odasında çift kişilik yatak, oturma alanında geniş kanepe ve çalışma masası bulunur. Açık plan mutfak; ankastre ocak, fırın, espresso makinesi ve şarap rafıyla donanımlıdır. Apartın en sevilen köşesi balkonu: bougainville çiçekleri ve deniz manzarası eşliğinde sabah kahvaltısı ve akşamüstü şarabı için ideal. Bina çıkışında yürüyerek 4 dakikada marinaya, 2 dakikada eski meydandaki kahvaltı evlerine ulaşırsınız. Yakındaki en sevilen plajlar Tilkicik (6 dakika araba) ve Kudur (10 dakika araba). Sokak hattı sakindir, akşam saatlerinde gürültü duymazsınız. Bal ayı çiftleri, romantik kaçamak isteyenler veya uzaktan çalışmayı planlayan dijital göçebeler için son derece uygundur. Apart her misafir girişinden önce profesyonel temizlik ekibimiz tarafından hazırlanır.",
    descriptionEn:
      "In Yalıkavak's traditional whitewashed old quarter, on the upper floor of a stone building wrapped in bougainvillea on a cobbled lane, this 1-bedroom design apartment offers couples a calm, aesthetic getaway. The 60 m² interior is decorated with modern furniture, exposed brick walls and pieces from local designers. The bedroom has a double bed; the living area adds a wide sofa and a desk. The open kitchen is equipped with hob, oven, espresso machine and a wine rack. The favourite spot is the balcony — bougainvillea and sea view, perfect for morning coffee or evening wine. It's a 4-minute walk to the marina and 2 minutes to the old square's breakfast spots. The most beloved beaches nearby are Tilkicik (6-minute drive) and Kudur (10-minute drive). The street stays quiet through the evening. Ideal for honeymooners, romantic getaways, or digital nomads planning to work remotely. Prepared by our professional cleaning team before every arrival.",
    images: [
      img("apt", "1505691938895-1758d7feb511"),
      img("apt", "1502672260266-1c1ef2d93688"),
      img("apt", "1493809842364-78817add7ffb"),
      img("apt", "1505693416388-ac5ce068fe85"),
      img("apt", "1560185007-cde436f6a4d0"),
    ],
    rating: 4.8,
    reviewCount: 19,
    bookingFallbackUrl: "",
    tags: ["Çift", "Romantik"],
  },
  {
    id: "ap-007",
    slug: "bitez-bahce-icinde-2-1-aile-aparti",
    titleTr: "Bitez Mandalina Bahçesi İçinde 2+1 Aile Apartı",
    titleEn: "Bitez 2+1 Family Apartment in Tangerine Garden",
    district: "bitez",
    capacity: 6,
    bedrooms: 2,
    bathrooms: 2,
    area_m2: 100,
    features: [
      "pool",
      "wifi",
      "ac",
      "balcony",
      "kitchen",
      "washer",
      "dishwasher",
      "smartTv",
      "garden",
      "bbq",
      "parking",
      "babyCrib",
      "petFriendly",
    ],
    highSeasonPrice: 4500,
    lowSeasonPrice: 2300,
    descriptionTr:
      "Bitez'in sakin iç tarafında, geleneksel mandalina bahçesinin ortasındaki bu 2+1 aile apartı 6 kişiye kadar konfor sağlar ve evcil hayvanlarla seyahat eden ailelere açıktır. 100 m² brüt alanı; iki ferah yatak odası, iki tam donanımlı banyo, geniş oturma odası, ayrı yemek alanı, açık mutfak ve büyük bir bahçeden oluşur. Ana yatak odasında çift kişilik yatak, ikinci yatak odasında iki tek kişilik yatak vardır; oturma odasındaki çift kişilik açılır kanepe ile 5-6 kişilik gruplar rahatlıkla ağırlanır. Bebek beşiği talep üzerine ücretsiz temin edilir. Mutfak; bulaşık makinesi, çamaşır makinesi, fırın, indüksiyon ocak, kahve makinesi ile tam donanımlıdır. Bahçede özel mangal alanı, ortak havuz ve şezlong alanı vardır; akşam barbeküleri için ideal. Bitez koyuna yürüyerek 7 dakika, Bodrum merkezine arabayla 10 dakika mesafededir. Bitez'in ünlü rüzgar sörfü merkezi, sahildeki ahşap iskeleli balık restoranları ve sakin atmosferi ailenize huzurlu bir tatil sunar. Çocuklu aileler için sığ deniz, geniş plaj ve çevredeki market-eczane konumlanması son derece uygundur. Apart her misafir girişinden önce profesyonel olarak temizlenir.",
    descriptionEn:
      "On Bitez's quieter inland side, set within a traditional tangerine garden, this 2-bedroom family apartment hosts up to 6 guests and welcomes families travelling with pets. The 100 m² layout includes two bright bedrooms, two full bathrooms, a generous living room, a separate dining area, an open kitchen, and a large garden. The master has a double bed; the second bedroom has two single beds; the sofa bed in the living area easily takes a 5th-6th guest. A baby crib is provided free on request. The kitchen is fully equipped — dishwasher, washing machine, oven, induction hob, coffee maker. The garden has a private BBQ area and a shared pool with sun loungers — perfect for evening grills. It's a 7-minute walk to Bitez bay and a 10-minute drive to Bodrum centre. Bitez's famed windsurfing centre, the wooden-pier fish restaurants on the shore, and the calm atmosphere all make for a peaceful family trip. Shallow water, a wide beach, and nearby supermarkets and pharmacies suit families with children. Professionally cleaned before every arrival.",
    images: [
      img("apt", "1560448204-e02f11c3d0e2"),
      img("apt", "1505691938895-1758d7feb511"),
      img("apt", "1502672260266-1c1ef2d93688"),
      img("apt", "1493809842364-78817add7ffb"),
      img("apt", "1522708323590-d24dbb6b0267"),
    ],
    rating: 4.8,
    reviewCount: 33,
    bookingFallbackUrl: "",
    featured: true,
    tags: ["Aile", "Bahçe", "Evcil hayvan"],
  },
  {
    id: "ap-008",
    slug: "ortakent-yahsi-plaj-yakini-1-1",
    titleTr: "Ortakent Yahşi Plajına 100m 1+1 Apart",
    titleEn: "Ortakent 1+1 Apartment 100m to Yahşi Beach",
    district: "ortakent",
    capacity: 3,
    bedrooms: 1,
    bathrooms: 1,
    area_m2: 55,
    features: [
      "pool",
      "wifi",
      "ac",
      "balcony",
      "kitchen",
      "washer",
      "smartTv",
      "parking",
      "elevator",
    ],
    highSeasonPrice: 2800,
    lowSeasonPrice: 1400,
    descriptionTr:
      "Ortakent'in ünlü Yahşi plajına sadece 100 metre mesafede, havuzlu bir site içinde yer alan bu 1+1 apart, çiftler ve küçük aileler için ideal. 55 m² brüt alanı; ayrı yatak odası, açık plan oturma-mutfak ve geniş bir balkondan oluşur. Yatak odasında çift kişilik yatak ve gardırop, oturma odasında çekyat ile üçüncü misafir ağırlanabilir. Mutfak; ocak, fırın, çamaşır makinesi, kahve makinesi ve gereken tüm gereçlerle donanımlıdır. Klima hem oturma alanında hem yatak odasında mevcuttur, fiber internet 100 Mbps. Balkondan site bahçesi ve havuzu izlenir; akşamları meltem rüzgarıyla serin geçer. Site içinde yetişkin ve çocuk havuzu, şezlong-şemsiyeli bahçe, kapalı otopark, 24 saat güvenlik bulunur. Yahşi plajı 1 km uzunluğunda kumlu bir sahildir; çocuklu aileler için son derece güvenlidir. Sahildeki kahvaltı işletmelerine yürüyerek 2 dakika, Ortakent merkezine 7 dakika, Bodrum merkezine arabayla 10 dakika mesafededir. Salı kurulan haftalık pazar ortalama 10 dakika yürüme mesafesindedir. Apart her misafir girişinden önce kendi ekibimiz tarafından temizlenir, çarşaf ve havlular her seferinde yenilenir.",
    descriptionEn:
      "Just 100 metres from Ortakent's famous Yahşi beach, inside a pool complex, this 1-bedroom apartment is ideal for couples and small families. The 55 m² layout includes a separate bedroom, open-plan living-kitchen, and a wide balcony. The bedroom has a double bed and wardrobe; the living-room sofa bed takes a third guest. The kitchen is equipped with hob, oven, washing machine, coffee maker and everything needed to cook. Air conditioning runs in both the living area and bedroom, with 100 Mbps fibre internet. The balcony overlooks the complex garden and pool — cool in the evening thanks to the sea breeze. The complex includes an adult and children's pool, a sun-bed garden, covered parking and 24-hour security. Yahşi beach is a 1 km sandy strip, very safe for kids. It's a 2-minute walk to the beachside breakfast spots, 7 minutes to Ortakent centre, and a 10-minute drive to Bodrum centre. The Tuesday market is about a 10-minute walk away. Cleaned by our own team before every arrival, with fresh linen and towels each stay.",
    images: [
      img("apt", "1522708323590-d24dbb6b0267"),
      img("apt", "1502672260266-1c1ef2d93688"),
      img("apt", "1493809842364-78817add7ffb"),
      img("apt", "1505693416388-ac5ce068fe85"),
      img("apt", "1560448204-e02f11c3d0e2"),
    ],
    rating: 4.7,
    reviewCount: 41,
    bookingFallbackUrl: "",
    tags: ["Havuz", "Sahile yakın"],
  },
];

export function getApartment(slug: string): Apartment | undefined {
  return apartments.find((a) => a.slug === slug);
}

export function getApartmentsByDistrict(district: DistrictSlug): Apartment[] {
  return apartments.filter((a) => a.district === district);
}

export function getFeaturedApartments(limit = 6): Apartment[] {
  return apartments.filter((a) => a.featured).slice(0, limit);
}
