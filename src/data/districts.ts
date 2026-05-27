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
  longDescTr: string;
  longDescEn: string;
  heroImage: string;
  highlights: { tr: string[]; en: string[] };
  nearby: DistrictSlug[];
  lat: number;
  lng: number;
}

export const districts: District[] = [
  {
    slug: "gumbet",
    urlSlug: "gumbet-apart-kiralama",
    name: "Gümbet",
    shortDescTr: "Canlı sahil hayatı, geniş plaj ve hareketli gece kulüpleri.",
    shortDescEn: "Vibrant beachfront, wide beach and lively nightlife.",
    longDescTr:
      "Gümbet, Bodrum merkezine yürüme mesafesinde, gençlerin ve eğlence arayanların tercih ettiği canlı bir koydur. Geniş kumlu plajı, yan yana dizilmiş bar ve restoranlarıyla yaz aylarında 7/24 hareketli kalır. Su sporları, plaj voleybolu ve gün batımı partileri için ideal; aynı zamanda Bodrum kalesine ve marinaya en yakın bölgelerden biri olduğu için ulaşımı son derece kolaydır. Aile tatili için bölgenin daha sakin doğu tarafındaki apartlar tercih edilebilirken, genç gruplar genelde sahil hattı ve Adnan Menderes Caddesi'ne yakın daireleri seçer. Yaz sezonu boyunca dolmuşlar her on dakikada bir Bodrum merkezine, Bitez ve Ortakent yönüne kalkar.",
    longDescEn:
      "Gümbet is a vibrant bay within walking distance of Bodrum's town centre, popular with younger travellers and party-goers. Its wide sandy beach is lined back-to-back with bars and restaurants, keeping the area alive day and night through summer. It's ideal for water sports, beach volleyball and sunset parties, while its proximity to Bodrum Castle and the marina makes transport effortless. Families tend to prefer apartments on the quieter east side of the bay, while groups gravitate towards the beachfront and Adnan Menderes Avenue. Frequent minibuses connect Gümbet to Bodrum centre, Bitez and Ortakent every ten minutes in season.",
    heroImage:
      "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=1600&q=80",
    highlights: {
      tr: [
        "Geniş kumlu plaj ve şezlong alanları",
        "100+ bar, restoran ve kulüp",
        "Bodrum merkezine 2 km",
        "Su sporları (jet ski, parasailing, banana)",
      ],
      en: [
        "Wide sandy beach with sunbed areas",
        "100+ bars, restaurants and clubs",
        "2 km to Bodrum centre",
        "Water sports (jet ski, parasailing, banana)",
      ],
    },
    nearby: ["bitez", "ortakent"],
    lat: 37.0339,
    lng: 27.4002,
  },
  {
    slug: "turgutreis",
    urlSlug: "turgutreis-apart-kiralama",
    name: "Turgutreis",
    shortDescTr: "Aile dostu uzun sahil, doğa sevenler için cennet.",
    shortDescEn: "Family-friendly long shoreline, a paradise for nature lovers.",
    longDescTr:
      "Turgutreis, Bodrum yarımadasının batı kıyısında yer alır ve adını ünlü denizci Turgut Reis'ten alır. Bodrum merkezinin sakin, daha geniş ve aile odaklı alternatifidir. Türkiye'nin en güzel gün batımlarından birini izleyebileceğiniz uzun sahili, modern marinası ve cumartesi günleri kurulan açık pazarıyla ünlüdür. Yunan adası Kos burada en yakın noktasına ulaşır; tekneyle bir saatte adaya geçebilirsiniz. Restoranlar ev yemeği ağırlıklı, fiyatlar Gümbet veya Yalıkavak'a göre daha uygundur. Çocuklu aileler için sığ ve güvenli plajları, sakin geceleri ve yerleşim hissi en büyük avantajdır.",
    longDescEn:
      "On the western edge of the Bodrum peninsula, Turgutreis is named after the famed Ottoman admiral and serves as a calmer, family-oriented alternative to Bodrum centre. It is known for one of Turkey's most stunning sunsets along its long seafront, a modern marina, and a Saturday open market beloved by locals and visitors alike. The Greek island of Kos is closest from here — you can reach it by ferry in about an hour. Restaurants lean toward homemade Aegean cooking and prices are gentler than in Gümbet or Yalıkavak. Shallow, safe beaches and quiet evenings make it a top pick for families with children.",
    heroImage:
      "https://images.unsplash.com/photo-1583425423320-eea6e5d20baf?auto=format&fit=crop&w=1600&q=80",
    highlights: {
      tr: [
        "Türkiye'nin en güzel gün batımı noktalarından biri",
        "Modern marina ve cumartesi pazarı",
        "Aile dostu sığ plajlar",
        "Kos adasına 1 saatte feribot",
      ],
      en: [
        "One of Turkey's best sunset spots",
        "Modern marina and Saturday market",
        "Family-friendly shallow beaches",
        "1-hour ferry to Kos island",
      ],
    },
    nearby: ["yalikavak", "ortakent"],
    lat: 37.0153,
    lng: 27.2657,
  },
  {
    slug: "yalikavak",
    urlSlug: "yalikavak-apart-kiralama",
    name: "Yalıkavak",
    shortDescTr: "Butik marina, lüks restoran ve sakin koylarıyla şık tatil.",
    shortDescEn: "Boutique marina, fine dining and quiet coves for upscale escapes.",
    longDescTr:
      "Yalıkavak, son yıllarda Bodrum'un en çok konuşulan bölgesi haline geldi. Akdeniz'in en şık marinalarından birine ev sahipliği yapan kasaba; Hermes, Louis Vuitton gibi lüks markaların butiklerine, dünyaca ünlü şef restoranlarına ve süper yat marinasına sahiptir. Geleneksel beyaz badanalı evler, bougainvillea sokaklarla iç içe geçer. Tilkicik Koyu, Kudur Koyu gibi gizli kalmış plajlar da bu bölgededir. Aileler, çiftler ve sakin lüks isteyen tatilciler için ideal; bütçesi geniş misafirler için Bodrum'un Saint-Tropez'i olarak anılır.",
    longDescEn:
      "Yalıkavak has become Bodrum's most talked-about district in recent years. The town hosts one of the Mediterranean's most elegant marinas, with boutiques from brands like Hermès and Louis Vuitton, world-class chef restaurants and a superyacht harbour. Whitewashed houses meet bougainvillea-lined streets in the old town. Tucked-away beaches like Tilkicik and Kudur coves complete the picture. It's ideal for couples and families seeking quiet luxury — often called the Saint-Tropez of Bodrum.",
    heroImage:
      "https://images.unsplash.com/photo-1561409037-c7be81613c1f?auto=format&fit=crop&w=1600&q=80",
    highlights: {
      tr: [
        "Süper yat marinası ve lüks butikler",
        "Şef restoranları ve gece hayatı",
        "Tilkicik ve Kudur gizli koyları",
        "Geleneksel beyaz badanalı eski mahalle",
      ],
      en: [
        "Superyacht marina and designer boutiques",
        "Chef restaurants and elegant nightlife",
        "Hidden coves at Tilkicik and Kudur",
        "Traditional whitewashed old town",
      ],
    },
    nearby: ["gundogan", "turgutreis"],
    lat: 37.1093,
    lng: 27.2913,
  },
  {
    slug: "bitez",
    urlSlug: "bitez-apart-kiralama",
    name: "Bitez",
    shortDescTr: "Sığ ve sakin koy, rüzgar sörfü için ideal.",
    shortDescEn: "Calm, shallow bay — ideal for windsurfing and families.",
    longDescTr:
      "Bitez, Gümbet'in eğlencesine yakın ama çok daha sakin bir koy. Mandalina bahçeleriyle çevrili kasaba; sığ, kristal berraklığındaki suyu ve sahile dizilmiş gözleme evleriyle ünlüdür. Türkiye'nin en iyi rüzgar sörfü noktalarından biri burada; sezon boyunca öğleden sonraları meltem rüzgarı sayesinde sörfçüler suyun üstünde uçar. Akşamları sahildeki ahşap iskeleli restoranlarda balık keyfi, sokak araları arasında butik kafeler ve şarap evleri vardır. Yürüyüş mesafesinde Gümbet'e ve sahil yolundan Ortakent'e ulaşabilirsiniz.",
    longDescEn:
      "Bitez sits next to Gümbet's nightlife but feels worlds apart — a calmer bay surrounded by tangerine groves, with shallow crystal-clear water and traditional gözleme (Turkish pancake) houses on the shore. It's one of Turkey's top windsurfing spots; in season, afternoon thermal winds glide surfers across the bay. Evenings bring fresh fish at wooden-pier restaurants, with boutique cafés and wine bars tucked into the back streets. You can walk to Gümbet and reach Ortakent along the coastal road.",
    heroImage:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1600&q=80",
    highlights: {
      tr: [
        "Sığ, berrak ve aile dostu plaj",
        "Türkiye'nin en iyi rüzgar sörfü noktalarından biri",
        "Sahil iskelelerinde balık restoranları",
        "Mandalina bahçeleri ve sakin atmosfer",
      ],
      en: [
        "Shallow, clear and family-friendly beach",
        "Top windsurfing spot in Turkey",
        "Fish restaurants on wooden piers",
        "Tangerine groves and calm atmosphere",
      ],
    },
    nearby: ["gumbet", "ortakent"],
    lat: 37.034,
    lng: 27.367,
  },
  {
    slug: "ortakent",
    urlSlug: "ortakent-apart-kiralama",
    name: "Ortakent",
    shortDescTr: "1 km uzunluğunda Yahşi plajı, sakin köy ruhu.",
    shortDescEn: "1 km Yahşi beach and a peaceful village vibe.",
    longDescTr:
      "Ortakent, yarımadanın güneyindeki en uzun (yaklaşık 1 km) kumlu plajı Yahşi'ye ev sahipliği yapar. Sahil hattı boyunca aile dostu otel ve apartlar, sahilde kahvaltı veren küçük işletmeler bulunur. Köyün iç kısmı geleneksel Bodrum mimarisini hâlâ koruyor; Mustafa Paşa Kulesi ve haftalık salı pazarı bölgenin simgesidir. Bodrum merkezine 10 dakika araba, Bitez'e yürüme mesafesinde, Gümbet'in gürültüsünden uzak ama her şeye yakın olmak isteyenler için ideal seçim.",
    longDescEn:
      "Ortakent is home to Yahşi beach, the peninsula's longest sandy beach at nearly 1 km. Family-friendly hotels and apartments line the shore, alongside small spots that serve Aegean breakfast right on the sand. The village interior preserves traditional Bodrum architecture, with the Mustafa Paşa Tower and the weekly Tuesday market as landmarks. It's a 10-minute drive to Bodrum centre and walkable to Bitez — perfect for those who want everything close without Gümbet's noise.",
    heroImage:
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?auto=format&fit=crop&w=1600&q=80",
    highlights: {
      tr: [
        "1 km uzunluğunda Yahşi kumsalı",
        "Geleneksel Bodrum köy mimarisi",
        "Salı pazarı ve yerel üreticiler",
        "Bodrum merkezine 10 dakika",
      ],
      en: [
        "1 km Yahşi sandy beach",
        "Traditional Bodrum village architecture",
        "Tuesday market and local producers",
        "10 minutes to Bodrum centre",
      ],
    },
    nearby: ["bitez", "gumbet"],
    lat: 37.0517,
    lng: 27.3589,
  },
  {
    slug: "gundogan",
    urlSlug: "gundogan-apart-kiralama",
    name: "Gündoğan",
    shortDescTr: "Bodrum'un sakin koyu, deniz manzaralı yamaç evleri.",
    shortDescEn: "Bodrum's quiet bay with hillside sea-view homes.",
    longDescTr:
      "Gündoğan, Yalıkavak ile Türkbükü arasında, sakin ve butik bir koy. Geçmişte balıkçı köyü olan bölge, son 15 yılda butik villa ve apart yapılarıyla şekillendi. Sahili çakıllı ve berrak; rüzgardan korunduğu için sezon sonu bile yüzülebilir bir alandır. Akşamları sahildeki Akdeniz mutfağı restoranları öne çıkar; gündüzleri Cennet Adası'na tekneyle gidip orada yüzmek bölgenin en sevilen ritüellerindendir. Aileler, yazlığını kiralamak isteyen şehirliler ve sessizlik arayanlar için tercih sebebi.",
    longDescEn:
      "Gündoğan is a calm, boutique cove between Yalıkavak and Türkbükü. Once a fishing village, it has been shaped by boutique villas and apartments over the past 15 years. Its pebble shoreline stays sheltered from wind, swimmable into the late season. Evenings showcase Aegean cuisine on seafront restaurants; days often involve a short boat trip to Cennet Island (Paradise Island). A favourite for families and travellers seeking quiet.",
    heroImage:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1600&q=80",
    highlights: {
      tr: [
        "Sakin, rüzgardan korunan koy",
        "Yamaç boyunca deniz manzaralı apartlar",
        "Cennet Adası tekne turu",
        "Yalıkavak'a 5 dakika araba",
      ],
      en: [
        "Calm bay sheltered from wind",
        "Hillside sea-view apartments",
        "Boat trips to Paradise Island",
        "5 minutes by car to Yalıkavak",
      ],
    },
    nearby: ["yalikavak", "torba"],
    lat: 37.1311,
    lng: 27.3458,
  },
  {
    slug: "torba",
    urlSlug: "torba-apart-kiralama",
    name: "Torba",
    shortDescTr: "Havalimanına en yakın koy, sakin lüks resort hattı.",
    shortDescEn: "The closest cove to the airport — calm, with resort-row luxury.",
    longDescTr:
      "Torba, Bodrum yarımadasının kuzey kıyısında, Milas-Bodrum Havalimanı'na sadece 25 dakika mesafededir; bu yüzden gelir gelmez yorulmadan rahatlamak isteyen misafirler için ideal. Sahil hattı boyunca 5 yıldızlı resortlar ve butik apart siteleri uzanır. Su sakin ve sığdır, çocuklu aileler için son derece güvenli. Akşam hareketliliği daha çok kendi resort/apart sitesinin içinde; gece hayatı için 15 dakika araba ile Bodrum merkezine inebilirsiniz. Sessiz, lüks ve ulaşımı çok kolay bir tatil için doğru adres.",
    longDescEn:
      "Torba sits on the northern coast of the peninsula, just 25 minutes from Milas-Bodrum Airport — ideal if you want to relax the moment you land. The shoreline is dotted with 5-star resorts and boutique apartment complexes. The water is calm and shallow, perfect for families with children. Nightlife mostly happens within the resorts themselves; for a livelier evening, Bodrum centre is a 15-minute drive away. A quiet, upscale choice with excellent accessibility.",
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    highlights: {
      tr: [
        "Havalimanına 25 dakika",
        "Sakin ve sığ deniz",
        "5 yıldızlı resort hattı",
        "Bodrum merkezine 15 dakika araba",
      ],
      en: [
        "25 minutes from the airport",
        "Calm, shallow sea",
        "Strip of 5-star resorts",
        "15-minute drive to Bodrum centre",
      ],
    },
    nearby: ["gundogan", "yalikavak"],
    lat: 37.0859,
    lng: 27.4406,
  },
];

export function getDistrict(slug: string): District | undefined {
  return districts.find((d) => d.slug === slug || d.urlSlug === slug);
}
