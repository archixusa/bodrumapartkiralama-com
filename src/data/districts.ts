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

export const districts: District[] = [
  {
    slug: "gumbet",
    urlSlug: "gumbet-apart-kiralama",
    name: "Gümbet",
    shortDescTr: "Canlı sahil hayatı, geniş plaj ve hareketli gece kulüpleri.",
    shortDescEn: "Vibrant beachfront, wide beach and lively nightlife.",
    shortDescDe:
      "Lebendige Strandpromenade, breiter Strand und ausgelassenes Nachtleben.",
    shortDescRu:
      "Оживлённая набережная, широкий пляж и яркая ночная жизнь.",
    longDescTr:
      "Gümbet, Bodrum merkezine yürüme mesafesinde, gençlerin ve eğlence arayanların tercih ettiği canlı bir koydur. Geniş kumlu plajı, yan yana dizilmiş bar ve restoranlarıyla yaz aylarında 7/24 hareketli kalır. Su sporları, plaj voleybolu ve gün batımı partileri için ideal; aynı zamanda Bodrum kalesine ve marinaya en yakın bölgelerden biri olduğu için ulaşımı son derece kolaydır. Aile tatili için bölgenin daha sakin doğu tarafındaki apartlar tercih edilebilirken, genç gruplar genelde sahil hattı ve Adnan Menderes Caddesi'ne yakın daireleri seçer. Yaz sezonu boyunca dolmuşlar her on dakikada bir Bodrum merkezine, Bitez ve Ortakent yönüne kalkar.",
    longDescEn:
      "Gümbet is a vibrant bay within walking distance of Bodrum's town centre, popular with younger travellers and party-goers. Its wide sandy beach is lined back-to-back with bars and restaurants, keeping the area alive day and night through summer. It's ideal for water sports, beach volleyball and sunset parties, while its proximity to Bodrum Castle and the marina makes transport effortless. Families tend to prefer apartments on the quieter east side of the bay, while groups gravitate towards the beachfront and Adnan Menderes Avenue. Frequent minibuses connect Gümbet to Bodrum centre, Bitez and Ortakent every ten minutes in season.",
    longDescDe:
      "Gümbet ist eine lebendige Bucht in Gehweite des Stadtzentrums von Bodrum und besonders bei jüngeren Reisenden und Feierfreudigen beliebt. Der breite Sandstrand ist dicht an dicht von Bars und Restaurants gesäumt, sodass die Gegend den ganzen Sommer über Tag und Nacht lebendig bleibt. Sie ist ideal für Wassersport, Beachvolleyball und Sonnenuntergangspartys, und dank der Nähe zur Burg von Bodrum und zum Yachthafen kommen Sie überall mühelos hin. Familien bevorzugen meist die Apartments an der ruhigeren Ostseite der Bucht, während Gruppen eher die Strandpromenade und die Adnan-Menderes-Straße wählen. In der Saison fahren alle zehn Minuten Minibusse von Gümbet ins Zentrum von Bodrum sowie nach Bitez und Ortakent.",
    longDescRu:
      "Гюмбет — это оживлённая бухта в пешей доступности от центра Бодрума, особенно популярная у молодых путешественников и любителей вечеринок. Широкий песчаный пляж сплошь застроен барами и ресторанами, благодаря чему всё лето здесь кипит жизнь и днём, и ночью. Это идеальное место для водных видов спорта, пляжного волейбола и вечеринок на закате, а близость к крепости Бодрума и марине делает дорогу совсем простой. Семьи обычно выбирают апартаменты в более тихой восточной части бухты, а компании тяготеют к набережной и проспекту Аднана Мендереса. В сезон маршрутки отправляются из Гюмбета в центр Бодрума, а также в сторону Битеза и Ортакента каждые десять минут.",
    heroImage:
      "https://images.unsplash.com/photo-1566084091852?auto=format&fit=crop&w=1600&q=80",
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
      de: [
        "Breiter Sandstrand mit Liegebereichen",
        "Über 100 Bars, Restaurants und Clubs",
        "2 km bis ins Zentrum von Bodrum",
        "Wassersport (Jetski, Parasailing, Bananaboot)",
      ],
      ru: [
        "Широкий песчаный пляж с зонами шезлонгов",
        "Более 100 баров, ресторанов и клубов",
        "2 км до центра Бодрума",
        "Водные виды спорта (гидроцикл, парасейлинг, банан)",
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
    shortDescDe:
      "Familienfreundliche lange Küste, ein Paradies für Naturliebhaber.",
    shortDescRu:
      "Длинная семейная набережная, рай для любителей природы.",
    longDescTr:
      "Turgutreis, Bodrum yarımadasının batı kıyısında yer alır ve adını ünlü denizci Turgut Reis'ten alır. Bodrum merkezinin sakin, daha geniş ve aile odaklı alternatifidir. Türkiye'nin en güzel gün batımlarından birini izleyebileceğiniz uzun sahili, modern marinası ve cumartesi günleri kurulan açık pazarıyla ünlüdür. Yunan adası Kos burada en yakın noktasına ulaşır; tekneyle bir saatte adaya geçebilirsiniz. Restoranlar ev yemeği ağırlıklı, fiyatlar Gümbet veya Yalıkavak'a göre daha uygundur. Çocuklu aileler için sığ ve güvenli plajları, sakin geceleri ve yerleşim hissi en büyük avantajdır.",
    longDescEn:
      "On the western edge of the Bodrum peninsula, Turgutreis is named after the famed Ottoman admiral and serves as a calmer, family-oriented alternative to Bodrum centre. It is known for one of Turkey's most stunning sunsets along its long seafront, a modern marina, and a Saturday open market beloved by locals and visitors alike. The Greek island of Kos is closest from here — you can reach it by ferry in about an hour. Restaurants lean toward homemade Aegean cooking and prices are gentler than in Gümbet or Yalıkavak. Shallow, safe beaches and quiet evenings make it a top pick for families with children.",
    longDescDe:
      "Am westlichen Rand der Halbinsel Bodrum gelegen, ist Turgutreis nach dem berühmten osmanischen Admiral benannt und bietet eine ruhigere, familienorientierte Alternative zum Zentrum von Bodrum. Bekannt ist der Ort für einen der schönsten Sonnenuntergänge der Türkei an seiner langen Strandpromenade, für seinen modernen Yachthafen und für den Samstagsmarkt, den Einheimische wie Besucher gleichermaßen lieben. Die griechische Insel Kos liegt von hier aus am nächsten — mit der Fähre erreichen Sie sie in etwa einer Stunde. Die Restaurants setzen auf hausgemachte ägäische Küche, und die Preise sind angenehmer als in Gümbet oder Yalıkavak. Flache, sichere Strände und ruhige Abende machen den Ort zur ersten Wahl für Familien mit Kindern.",
    longDescRu:
      "Расположенный на западной оконечности полуострова Бодрум, Тургутрейс назван в честь прославленного османского адмирала и служит более спокойной, ориентированной на семьи альтернативой центру Бодрума. Он известен одним из самых красивых закатов Турции вдоль длинной набережной, современной мариной и субботним рынком под открытым небом, который любят и местные жители, и гости. Греческий остров Кос ближе всего именно отсюда — на пароме вы доберётесь до него примерно за час. Рестораны делают ставку на домашнюю эгейскую кухню, а цены здесь приятнее, чем в Гюмбете или Ялыкаваке. Мелкие безопасные пляжи и тихие вечера делают это место отличным выбором для семей с детьми.",
    heroImage:
      "https://images.unsplash.com/photo-1595880992139?auto=format&fit=crop&w=1600&q=80",
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
      de: [
        "Einer der schönsten Sonnenuntergangsplätze der Türkei",
        "Moderner Yachthafen und Samstagsmarkt",
        "Familienfreundliche flache Strände",
        "Eine Stunde mit der Fähre zur Insel Kos",
      ],
      ru: [
        "Одно из лучших мест Турции для встречи заката",
        "Современная марина и субботний рынок",
        "Семейные пляжи с пологим входом",
        "Паром до острова Кос за 1 час",
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
    shortDescDe:
      "Boutique-Marina, gehobene Küche und ruhige Buchten für stilvollen Urlaub.",
    shortDescRu:
      "Бутик-марина, изысканные рестораны и тихие бухты для стильного отдыха.",
    longDescTr:
      "Yalıkavak, son yıllarda Bodrum'un en çok konuşulan bölgesi haline geldi. Akdeniz'in en şık marinalarından birine ev sahipliği yapan kasaba; Hermes, Louis Vuitton gibi lüks markaların butiklerine, dünyaca ünlü şef restoranlarına ve süper yat marinasına sahiptir. Geleneksel beyaz badanalı evler, bougainvillea sokaklarla iç içe geçer. Tilkicik Koyu, Kudur Koyu gibi gizli kalmış plajlar da bu bölgededir. Aileler, çiftler ve sakin lüks isteyen tatilciler için ideal; bütçesi geniş misafirler için Bodrum'un Saint-Tropez'i olarak anılır.",
    longDescEn:
      "Yalıkavak has become Bodrum's most talked-about district in recent years. The town hosts one of the Mediterranean's most elegant marinas, with boutiques from brands like Hermès and Louis Vuitton, world-class chef restaurants and a superyacht harbour. Whitewashed houses meet bougainvillea-lined streets in the old town. Tucked-away beaches like Tilkicik and Kudur coves complete the picture. It's ideal for couples and families seeking quiet luxury — often called the Saint-Tropez of Bodrum.",
    longDescDe:
      "Yalıkavak hat sich in den letzten Jahren zum meistbesprochenen Viertel von Bodrum entwickelt. Der Ort beherbergt eine der elegantesten Marinas des Mittelmeers mit Boutiquen von Marken wie Hermès und Louis Vuitton, Restaurants weltbekannter Küchenchefs und einem Hafen für Superyachten. In der Altstadt treffen weiß getünchte Häuser auf von Bougainvillea gesäumte Gassen. Versteckte Strände wie die Buchten von Tilkicik und Kudur runden das Bild ab. Yalıkavak ist ideal für Paare und Familien, die ruhigen Luxus suchen — nicht umsonst wird es oft das Saint-Tropez von Bodrum genannt.",
    longDescRu:
      "За последние годы Ялыкавак стал самым обсуждаемым районом Бодрума. В городке расположена одна из самых элегантных марин Средиземноморья с бутиками таких брендов, как Hermès и Louis Vuitton, ресторанами всемирно известных шеф-поваров и гаванью для суперяхт. В старом городе белёные дома соседствуют с улочками, утопающими в бугенвиллии. Картину дополняют укромные пляжи в бухтах Тилкиджик и Кудур. Это идеальное место для пар и семей, ищущих спокойную роскошь, — его нередко называют Сен-Тропе Бодрума.",
    heroImage:
      "https://images.unsplash.com/photo-1598114570969?auto=format&fit=crop&w=1600&q=80",
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
      de: [
        "Superyacht-Marina und Designer-Boutiquen",
        "Sterneküche und elegantes Nachtleben",
        "Versteckte Buchten Tilkicik und Kudur",
        "Traditionelle weiß getünchte Altstadt",
      ],
      ru: [
        "Марина для суперяхт и дизайнерские бутики",
        "Авторские рестораны и изысканная ночная жизнь",
        "Укромные бухты Тилкиджик и Кудур",
        "Традиционный белёный старый город",
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
    shortDescDe:
      "Ruhige, flache Bucht — ideal für Windsurfen und Familien.",
    shortDescRu:
      "Тихая мелководная бухта — идеальна для виндсёрфинга и семей.",
    longDescTr:
      "Bitez, Gümbet'in eğlencesine yakın ama çok daha sakin bir koy. Mandalina bahçeleriyle çevrili kasaba; sığ, kristal berraklığındaki suyu ve sahile dizilmiş gözleme evleriyle ünlüdür. Türkiye'nin en iyi rüzgar sörfü noktalarından biri burada; sezon boyunca öğleden sonraları meltem rüzgarı sayesinde sörfçüler suyun üstünde uçar. Akşamları sahildeki ahşap iskeleli restoranlarda balık keyfi, sokak araları arasında butik kafeler ve şarap evleri vardır. Yürüyüş mesafesinde Gümbet'e ve sahil yolundan Ortakent'e ulaşabilirsiniz.",
    longDescEn:
      "Bitez sits next to Gümbet's nightlife but feels worlds apart — a calmer bay surrounded by tangerine groves, with shallow crystal-clear water and traditional gözleme (Turkish pancake) houses on the shore. It's one of Turkey's top windsurfing spots; in season, afternoon thermal winds glide surfers across the bay. Evenings bring fresh fish at wooden-pier restaurants, with boutique cafés and wine bars tucked into the back streets. You can walk to Gümbet and reach Ortakent along the coastal road.",
    longDescDe:
      "Bitez liegt direkt neben dem Nachtleben von Gümbet und fühlt sich doch völlig anders an — eine ruhigere Bucht, umgeben von Mandarinenhainen, mit flachem, kristallklarem Wasser und traditionellen Gözleme-Häusern (türkische Teigfladen) am Ufer. Es ist einer der besten Windsurf-Spots der Türkei: In der Saison tragen die nachmittäglichen Thermalwinde die Surfer über die Bucht. Abends gibt es frischen Fisch in den Restaurants auf den Holzstegen, dazu Boutique-Cafés und Weinbars in den Seitengassen. Zu Fuß erreichen Sie Gümbet, und über die Küstenstraße gelangen Sie nach Ortakent.",
    longDescRu:
      "Битез находится рядом с ночной жизнью Гюмбета, но ощущается совершенно иначе — это более спокойная бухта в окружении мандариновых рощ, с мелкой кристально чистой водой и традиционными домиками гёзлеме (турецких лепёшек) на берегу. Это одно из лучших мест Турции для виндсёрфинга: в сезон послеполуденный бриз несёт сёрферов через всю бухту. По вечерам в ресторанах на деревянных пирсах подают свежую рыбу, а в переулках прячутся уютные кафе и винные бары. До Гюмбета можно дойти пешком, а до Ортакента добраться по прибрежной дороге.",
    heroImage:
      "https://images.unsplash.com/photo-1591078314870?auto=format&fit=crop&w=1600&q=80",
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
      de: [
        "Flacher, klarer und familienfreundlicher Strand",
        "Einer der besten Windsurf-Spots der Türkei",
        "Fischrestaurants auf Holzstegen",
        "Mandarinenhaine und ruhige Atmosphäre",
      ],
      ru: [
        "Мелкий, чистый и семейный пляж",
        "Одно из лучших мест для виндсёрфинга в Турции",
        "Рыбные рестораны на деревянных пирсах",
        "Мандариновые рощи и спокойная атмосфера",
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
    shortDescDe:
      "1 km langer Yahşi-Strand und eine ruhige Dorfatmosphäre.",
    shortDescRu:
      "Пляж Яхши длиной 1 км и спокойная деревенская атмосфера.",
    longDescTr:
      "Ortakent, yarımadanın güneyindeki en uzun (yaklaşık 1 km) kumlu plajı Yahşi'ye ev sahipliği yapar. Sahil hattı boyunca aile dostu otel ve apartlar, sahilde kahvaltı veren küçük işletmeler bulunur. Köyün iç kısmı geleneksel Bodrum mimarisini hâlâ koruyor; Mustafa Paşa Kulesi ve haftalık salı pazarı bölgenin simgesidir. Bodrum merkezine 10 dakika araba, Bitez'e yürüme mesafesinde, Gümbet'in gürültüsünden uzak ama her şeye yakın olmak isteyenler için ideal seçim.",
    longDescEn:
      "Ortakent is home to Yahşi beach, the peninsula's longest sandy beach at nearly 1 km. Family-friendly hotels and apartments line the shore, alongside small spots that serve Aegean breakfast right on the sand. The village interior preserves traditional Bodrum architecture, with the Mustafa Paşa Tower and the weekly Tuesday market as landmarks. It's a 10-minute drive to Bodrum centre and walkable to Bitez — perfect for those who want everything close without Gümbet's noise.",
    longDescDe:
      "Ortakent beheimatet den Yahşi-Strand, mit knapp 1 km den längsten Sandstrand der Halbinsel. Familienfreundliche Hotels und Apartments säumen das Ufer, dazwischen kleine Lokale, die das ägäische Frühstück direkt am Strand servieren. Der Ortskern bewahrt die traditionelle Bodrum-Architektur, mit dem Mustafa-Paşa-Turm und dem wöchentlichen Dienstagsmarkt als Wahrzeichen. Bis ins Zentrum von Bodrum fahren Sie zehn Minuten, nach Bitez gelangen Sie zu Fuß — perfekt für alle, die alles in der Nähe haben möchten, ohne den Trubel von Gümbet.",
    longDescRu:
      "В Ортакенте находится пляж Яхши — самый длинный песчаный пляж полуострова протяжённостью почти 1 км. Вдоль берега выстроились семейные отели и апартаменты, а между ними — небольшие заведения, где эгейский завтрак подают прямо на песке. Центр деревни сохраняет традиционную архитектуру Бодрума, а его символами стали башня Мустафы-паши и еженедельный вторничный рынок. До центра Бодрума 10 минут на машине, до Битеза можно дойти пешком — идеальный выбор для тех, кто хочет, чтобы всё было рядом, но без шума Гюмбета.",
    heroImage:
      "https://images.unsplash.com/photo-1727713682954?auto=format&fit=crop&w=1600&q=80",
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
      de: [
        "1 km langer Sandstrand Yahşi",
        "Traditionelle Bodrum-Dorfarchitektur",
        "Dienstagsmarkt und lokale Erzeuger",
        "10 Minuten bis ins Zentrum von Bodrum",
      ],
      ru: [
        "Песчаный пляж Яхши длиной 1 км",
        "Традиционная деревенская архитектура Бодрума",
        "Вторничный рынок и местные производители",
        "10 минут до центра Бодрума",
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
    shortDescDe:
      "Bodrums ruhige Bucht mit Hanghäusern und Meerblick.",
    shortDescRu:
      "Тихая бухта Бодрума с домами на склоне и видом на море.",
    longDescTr:
      "Gündoğan, Yalıkavak ile Türkbükü arasında, sakin ve butik bir koy. Geçmişte balıkçı köyü olan bölge, son 15 yılda butik villa ve apart yapılarıyla şekillendi. Sahili çakıllı ve berrak; rüzgardan korunduğu için sezon sonu bile yüzülebilir bir alandır. Akşamları sahildeki Akdeniz mutfağı restoranları öne çıkar; gündüzleri Cennet Adası'na tekneyle gidip orada yüzmek bölgenin en sevilen ritüellerindendir. Aileler, yazlığını kiralamak isteyen şehirliler ve sessizlik arayanlar için tercih sebebi.",
    longDescEn:
      "Gündoğan is a calm, boutique cove between Yalıkavak and Türkbükü. Once a fishing village, it has been shaped by boutique villas and apartments over the past 15 years. Its pebble shoreline stays sheltered from wind, swimmable into the late season. Evenings showcase Aegean cuisine on seafront restaurants; days often involve a short boat trip to Cennet Island (Paradise Island). A favourite for families and travellers seeking quiet.",
    longDescDe:
      "Gündoğan ist eine ruhige Boutique-Bucht zwischen Yalıkavak und Türkbükü. Einst ein Fischerdorf, wurde der Ort in den letzten 15 Jahren von Boutique-Villen und Apartments geprägt. Die Kieselküste bleibt windgeschützt und lädt bis spät in die Saison zum Schwimmen ein. Abends überzeugt die ägäische Küche in den Restaurants an der Strandpromenade; tagsüber gehört ein kurzer Bootsausflug zur Insel Cennet (Paradiesinsel) dazu. Ein Favorit für Familien und Reisende, die Ruhe suchen.",
    longDescRu:
      "Гюндоган — это спокойная бутиковая бухта между Ялыкаваком и Тюркбюкю. Когда-то рыбацкая деревня, за последние 15 лет она преобразилась благодаря бутиковым виллам и апартаментам. Галечный берег защищён от ветра, поэтому купаться здесь можно до самого конца сезона. По вечерам блистает эгейская кухня в ресторанах на набережной, а днём непременная часть отдыха — короткая прогулка на лодке к острову Дженнет (Райский остров). Излюбленное место для семей и путешественников, ищущих тишину.",
    heroImage:
      "https://images.unsplash.com/photo-1734723042943?auto=format&fit=crop&w=1600&q=80",
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
      de: [
        "Ruhige, windgeschützte Bucht",
        "Apartments mit Meerblick am Hang",
        "Bootsausflüge zur Paradiesinsel",
        "5 Autominuten bis Yalıkavak",
      ],
      ru: [
        "Тихая, защищённая от ветра бухта",
        "Апартаменты на склоне с видом на море",
        "Прогулки на лодке к Райскому острову",
        "5 минут на машине до Ялыкавака",
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
    shortDescDe:
      "Die flughafennächste Bucht — ruhig, mit einer Reihe luxuriöser Resorts.",
    shortDescRu:
      "Ближайшая к аэропорту бухта — спокойная, с рядом роскошных курортов.",
    longDescTr:
      "Torba, Bodrum yarımadasının kuzey kıyısında, Milas-Bodrum Havalimanı'na sadece 25 dakika mesafededir; bu yüzden gelir gelmez yorulmadan rahatlamak isteyen misafirler için ideal. Sahil hattı boyunca 5 yıldızlı resortlar ve butik apart siteleri uzanır. Su sakin ve sığdır, çocuklu aileler için son derece güvenli. Akşam hareketliliği daha çok kendi resort/apart sitesinin içinde; gece hayatı için 15 dakika araba ile Bodrum merkezine inebilirsiniz. Sessiz, lüks ve ulaşımı çok kolay bir tatil için doğru adres.",
    longDescEn:
      "Torba sits on the northern coast of the peninsula, just 25 minutes from Milas-Bodrum Airport — ideal if you want to relax the moment you land. The shoreline is dotted with 5-star resorts and boutique apartment complexes. The water is calm and shallow, perfect for families with children. Nightlife mostly happens within the resorts themselves; for a livelier evening, Bodrum centre is a 15-minute drive away. A quiet, upscale choice with excellent accessibility.",
    longDescDe:
      "Torba liegt an der Nordküste der Halbinsel, nur 25 Minuten vom Flughafen Milas-Bodrum entfernt — ideal, wenn Sie direkt nach der Landung entspannen möchten. Die Küste ist gesäumt von 5-Sterne-Resorts und Boutique-Apartmentanlagen. Das Wasser ist ruhig und flach, perfekt für Familien mit Kindern. Das Abendleben spielt sich vor allem in den Resorts selbst ab; für einen lebhafteren Abend ist das Zentrum von Bodrum 15 Autominuten entfernt. Eine ruhige, gehobene Wahl mit hervorragender Erreichbarkeit.",
    longDescRu:
      "Торба расположена на северном побережье полуострова, всего в 25 минутах от аэропорта Милас-Бодрум — идеально, если вы хотите расслабиться сразу после посадки. Вдоль берега выстроились пятизвёздочные курорты и бутиковые жилые комплексы. Вода спокойная и мелкая, что прекрасно подходит для семей с детьми. Вечерняя жизнь сосредоточена в основном на территории самих курортов; за более оживлённым вечером можно отправиться в центр Бодрума, до которого 15 минут на машине. Тихий, фешенебельный вариант с прекрасной транспортной доступностью.",
    heroImage:
      "https://images.unsplash.com/photo-1684858504602?auto=format&fit=crop&w=1600&q=80",
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
      de: [
        "25 Minuten vom Flughafen entfernt",
        "Ruhiges, flaches Meer",
        "Reihe von 5-Sterne-Resorts",
        "15 Autominuten bis ins Zentrum von Bodrum",
      ],
      ru: [
        "25 минут от аэропорта",
        "Спокойное мелкое море",
        "Ряд пятизвёздочных курортов",
        "15 минут на машине до центра Бодрума",
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
