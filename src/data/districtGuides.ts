import type { DistrictSlug } from "./districts";

export interface GuideSection {
  h2: string;
  body: string[];
}

export interface DistrictGuide {
  /** Sub-heading shown under the main H1 — adds a 2026 framing. */
  subHeading: string;
  /** Lead paragraph rendered right after the sub-heading. */
  lead: string;
  /** Bullet list: who this neighbourhood suits / doesn't suit. */
  suitedFor: string[];
  notSuitedFor: string[];
  /** Each section becomes an H2 block with multiple paragraphs. */
  sections: GuideSection[];
  /** Qualitative seasonal/accommodation note shown as a small card. No prices. */
  priceBand: { note: string };
  /** 5 SSS — every district has its own, no repeats. */
  faqs: { q: string; a: string }[];
  /** Hand-curated 4 keywords used as page keywords for the meta tag. */
  keywords: string[];
}

export const districtGuides: Record<DistrictSlug, DistrictGuide> = {
  gumbet: {
    subHeading: "Gümbet Apart Kiralama — 2026 Detaylı Rehber",
    lead: "Gümbet, Bodrum yarımadasının en kalabalık ve en hareketli koylarından biri. Geniş sahili, yan yana dizilmiş bar ve restoranları, gençlerin ve gruplarla seyahat eden tatilcilerin tercih ettiği gece hayatıyla yaz aylarında neredeyse hiç uyumayan bir bölge. 2026 sezonunda Gümbet, Bodrum merkezine yakınlık avantajı ve onlarca apart seçeneğiyle hâlâ bütçe dostu konaklamanın merkezi.",
    suitedFor: [
      "20-35 yaş arası genç gruplar ve arkadaş tatilleri",
      "Gece hayatına yakın kalmak isteyen çiftler",
      "Plajda gün geçirmeyi seven, sosyal bir tatil arayanlar",
      "Bodrum merkezine yürüme/dolmuş mesafesinde kalmak isteyenler",
      "Su sporları (jet ski, parasailing) yapmak isteyenler",
    ],
    notSuitedFor: [
      "Bebek/küçük çocukla seyahat eden, sessiz uyku rutinine ihtiyaç duyan aileler",
      "Lüks butik konaklama isteyen misafirler (Yalıkavak/Türkbükü daha uygun)",
      "Ağustosta kalabalıktan kaçınmak isteyenler",
    ],
    sections: [
      {
        h2: "Gümbet'in Karakteri",
        body: [
          "Gümbet, Bodrum merkezinin yaklaşık 2 km batısında yer alan ve neredeyse U şeklinde bir koy etrafında kurulan bir bölge. 1990'lardan itibaren Türkiye'nin en popüler tatil noktalarından biri haline geldi; bugün hâlâ \"Bodrum'da uygun fiyata yaz tatili\" ile anılan ilk yer.",
          "Bölgenin omurgası Adnan Menderes Caddesi'dir. Yaz aylarında bu cadde gün boyu yaya hareketiyle dolu, akşamları ise gece kulüpleri, kokteyl barları ve sokak yemeği işletmeleriyle bambaşka bir atmosfere bürünür. Sahil kısmında ise şezlong-şemsiye düzeni kalabalık ama düzenli; çoğu işletme plaj girişlerinde yiyecek-içecek minimum harcama sistemiyle çalışır.",
        ],
      },
      {
        h2: "Plajlar ve Doğa",
        body: [
          "Gümbet plajı, Bodrum yarımadasının en uzun kumsal-çakıl karışımı plajlarından biri. Toplam uzunluğu yaklaşık 700 metre, geniş ve sığ bir yapıya sahip. Suyun ilk birkaç metresi çakıllı, sonra hafif kumlu zemine dönüşüyor. Bu yapı, çocuklu aileler için zaman zaman zorlayıcı olabiliyor; ayakkabı veya plaj sandaleti önerilir.",
          "Plajın doğu ucunda, kalabalıktan biraz uzaklaşmak isteyenler için Yahşi-Gümbet hattı tercih edilir. Burası daha sakin, ancak yine de işletmelerin yoğun olduğu bir bölge. Gümbet'in sahip olduğu en güzel doğal özellik, koy yapısı sayesinde denizin neredeyse her zaman sakin olması; rüzgâr genellikle kuzeyden geldiği için Gümbet koyu çoğu zaman güvenli bir yüzme alanı sunar.",
          "Yürüyüş severler için Gümbet tepesinden (sahilin batı ucundan) Bardakçı koyuna inen bir patika vardır; yaklaşık 25 dakikalık tırmanış sonrası daha az kalabalık, küçük bir koy bulunur.",
        ],
      },
      {
        h2: "Yeme-İçme ve Gece Hayatı",
        body: [
          "Gümbet'in yeme-içme sahnesi ana cadde, plaj hattı ve ara sokaklar olmak üzere üç katmandan oluşur. Plaj hattındaki restoranlar genelde balık-meze, deniz mahsulleri ve klasik Türk-Akdeniz mutfağı sunar; fiyatlar Bodrum merkezine göre %10-20 daha uygun. Ana cadde üzerinde uluslararası mutfaktan (İtalyan, Hint, Çin) burger-pizza zincirlerine kadar geniş bir yelpaze bulunur.",
          "Gece hayatı, Gümbet'i Türkiye'nin en bilinen tatil bölgelerinden biri yapan ana unsur. Sahil hattındaki büyük kulüpler haziran sonundan eylül ortasına kadar haftanın 7 günü açık. Ara sokaklarda ise daha küçük bar ve canlı müzik mekânları, otantik mey-rakı evleri bulunur. Lokal bir not: gece kulüpleri genelde 02:00'den sonra hareketlenir, kalkışlar 05:00'i bulabilir; uyku düzenine duyarlı misafirler bunu göz önünde bulundurmalı.",
        ],
      },
      {
        h2: "Ulaşım",
        body: [
          "Gümbet, ulaşım açısından Bodrum yarımadasının en kolay erişilebilen bölgelerinden biri. Milas-Bodrum Havalimanı'ndan ortalama 40-45 dakikada özel transfer ile, taksiyle veya araç kiralama ile ulaşılır. Havalimanı–Bodrum otobüs servisi (Havaş) Gümbet'e doğrudan iniş yapmaz; Bodrum otogarına iniş sonrası dolmuşla yaklaşık 10-15 dakikada Gümbet'e geçilir.",
          "Bölge içi ulaşımda dolmuş hattı çok yoğun: yaz aylarında 5-10 dakikada bir Bodrum merkezi yönüne kalkar; aynı şekilde Bitez, Ortakent, Turgutreis ve Yalıkavak istikametine kolay erişim vardır. Yaya dolaşımı için Gümbet'in sahil hattı düz, ancak iç sokaklar eğimli; arabayla geliyorsanız apartınızın park imkanını önceden teyit etmenizde fayda var.",
        ],
      },
      {
        h2: "Apart Özellikleri ve Fiyat Aralıkları",
        body: [
          "Gümbet'teki apart stoku oldukça çeşitli: sahil hattına çok yakın 1+1 ekonomi daireler, ara sokaklarda klimalı 2+1 aile apartları ve tepe konumlu deniz manzaralı 3+1 site dairelerine kadar geniş bir yelpaze var. Çoğu apart havuzlu sitelerde yer alıyor; bireysel apartlar genelde merkez konumda bulunuyor.",
          "Yüksek sezon (haziran sonu – eylül başı) en hareketli ve en talep gören dönemdir; düşük sezonda (mayıs ve ekim) konaklama belirgin biçimde daha uygun olur. Haftalık konaklamalarda esneklik genellikle mümkün. 4 ve üzeri kişi seyahat eden gruplar için apart, otel odasına göre çoğu zaman daha avantajlıdır. Tarihinize göre size en uygun seçenekleri ve kişiye özel teklifi paylaşalım.",
        ],
      },
      {
        h2: "Yakındaki Bölgeler",
        body: [
          "Gümbet'in en yakın komşusu doğuda Bodrum merkezi, batıda Bitez. Bitez, Gümbet'e sahil yolundan yürüyerek yaklaşık 30 dakikada veya 5 dakikalık dolmuşla ulaşılır; aile dostu sığ koyu ve rüzgâr sörfüyle Gümbet'in sakin alternatifidir. Ortakent ise Bitez'in batısındaki bir sonraki köy; Bodrum merkezine 10 dakika araba mesafesinde.",
          "Bodrum merkezindeki kale, Mavi Yolculuk teknelerinin kalkış noktası ve haftalık salı pazarı, Gümbet'te kalanların 1-2 günde bir uğraması gereken duraklar arasında.",
        ],
      },
    ],
    priceBand: {
      note: "2026 yüksek sezon — 2+1 standart apart aralığı",
    },
    faqs: [
      {
        q: "Gümbet'te aileyle tatil yapmak mantıklı mı?",
        a: "Eğer çocuklarınız 8 yaş üzerinde ve hareketli bir tatilden hoşlanan bir aileyseniz Gümbet uygundur. 0-5 yaş arası bebek/küçük çocuklarla seyahat ediyorsanız gece sesleri ve plajın çakıllı yapısı yüzünden Bitez veya Ortakent daha rahat olabilir.",
      },
      {
        q: "Sahile en yakın apartlar gece gürültü duyar mı?",
        a: "Sahilin doğrudan üstündeki apartlarda haziran sonu – eylül başı arasında gece kulüplerinden gelen bas sesi duyulabilir. İç sokaklarda 200-300 metre içeride bulunan apartlar genellikle çok daha sessizdir. Apart kiralarken konumu önceden teyit edin.",
      },
      {
        q: "Gümbet'te araç kiralamak şart mı?",
        a: "Şart değil. Sahil-eğlence-Bodrum merkezi üçgeni içinde kalacaksanız dolmuş ve yaya ulaşımı yeterli. Yalıkavak, Turgutreis veya Cennet Adası tarafına günübirlik gitmek istiyorsanız 2-3 günlük araç kiralama kullanışlı olabilir.",
      },
      {
        q: "Plajda şezlong/şemsiye ücretsiz mi?",
        a: "Halk plajı kısmı ücretsiz ancak donanım yok. İşletmelerin önünde genellikle uygun bir minimum yeme-içme harcamasıyla şezlong-şemsiye kullanılabilir; bazı yerler günlük şezlong ücreti de alır.",
      },
      {
        q: "Eylül sonunda gitsem hâlâ denize girilir mi?",
        a: "Eylül sonu - ekim ilk yarısı Bodrum'da hâlâ yüzme sezonudur; deniz suyu sıcaklığı 22-24°C aralığında. Gümbet'in koy yapısı denizi rüzgârlı günlerde bile sakin tutar, dolayısıyla geç sezon Gümbet'te oldukça keyiflidir.",
      },
    ],
    keywords: [
      "gümbet apart kiralama",
      "gümbet günlük kiralık daire",
      "gümbet sahil apartları",
      "gümbet gece hayatı tatil",
    ],
  },
  turgutreis: {
    subHeading: "Turgutreis Apart Kiralama — Aile Dostu Sahil Rehberi 2026",
    lead: "Turgutreis, Bodrum yarımadasının batı kıyısında, gün batımıyla ünlü uzun bir sahil hattı ve sakin köy atmosferine sahip. Çocuklu aileler, emekliler ve sessiz bir tatil arayanlar için yarımadanın en dengeli seçeneklerinden biri. 2026 sezonunda Turgutreis, modern marinası, cumartesi pazarı ve geniş apart stoku ile aile bütçesine uygun konaklamanın kalbinde duruyor.",
    suitedFor: [
      "Küçük çocuklu aileler ve emekli çiftler",
      "Uzun konaklama (1 hafta üzeri) düşünenler",
      "Yerel pazar, yerel restoran ve sakin akşamları sevenler",
      "Yunan adası Kos'a feribot turu yapmak isteyenler",
      "Sahil yürüyüşü ve bisiklet sürmek isteyenler",
    ],
    notSuitedFor: [
      "Yoğun gece hayatı arayan genç gruplar (Gümbet daha uygun)",
      "Bodrum merkezinde olan etkinliklere sık katılmak isteyenler (her gün 30+ dakika yol)",
      "Yalnızca lüks butik konaklama isteyenler (Yalıkavak öneririz)",
    ],
    sections: [
      {
        h2: "Turgutreis'in Karakteri",
        body: [
          "Turgutreis adını, 16. yüzyılın Osmanlı denizcisi Turgut Reis'ten alır. Bölge, Bodrum merkezinin yaklaşık 18 km batısında ve yarımadanın en uç kısmındadır. 1990'larda küçük bir balıkçı köyüydü; bugün ise yıl boyu yaşayan nüfusu, modern marinası ve geniş apart stoku ile küçük bir kasaba.",
          "Bölgenin en belirgin özelliği yaklaşık 4 kilometrelik kesintisiz sahil yürüyüş bandı. Sabah erken saatlerden akşama kadar yerli aileler ve emekliler bu sahili yürür; akşamları gün batımı izleme noktası olur. Turgutreis, Türkiye'nin en güzel gün batımı noktalarından biri kabul edilir — batıya bakan konumu sayesinde güneş Kos adasının arkasından batar.",
        ],
      },
      {
        h2: "Plajlar ve Aile Dostluğu",
        body: [
          "Turgutreis sahili çakıl ağırlıklı ancak suyun ilk 30-40 metresi sığ ve dalgasız. Bu özellik, küçük çocuklarla denize giren aileler için büyük avantaj sağlar. Sahilin orta-güney kesimleri (marinaya doğru) daha sakin ve çocuk dostu; kuzey kesimleri biraz daha rüzgârlı olabilir.",
          "Sahil boyunca düzenli aralıklarla çocuk parkları, halk WC'leri ve gölgelik alanlar vardır. Çoğu işletme önünde plaj havlusu kullanımı veya minimum harcama ile şezlong-şemsiye sistemi mevcut. Belediye plajı bölgeleri ücretsiz kullanım imkânı sunar ancak donanımsızdır.",
          "Daha izole bir gün isteyenler için Akyarlar (5 km güney) ve Bağla koyuna (10 km kuzey) araba ile kısa sürede ulaşılır.",
        ],
      },
      {
        h2: "Cumartesi Pazarı ve Yeme-İçme",
        body: [
          "Cumartesi günleri kurulan Turgutreis pazarı, Bodrum yarımadasının en kapsamlı haftalık pazarlarından biri. Sebze-meyve, peynir-zeytin, baharat ve ev yapımı reçellerden tekstil ve aksesuara kadar her şey bulunur. Yerli halkın çoğu haftalık alışverişini buradan yapar; konaklayan tatilciler için de hem ekonomik hem keyifli bir tecrübe.",
          "Yeme-içmede Turgutreis, balıkçı esnafı ağırlıklı ev mutfağına odaklıdır. Marina çevresindeki restoranlar daha modern ve fiyat olarak biraz daha yüksek; ana cadde ve sokak aralarındaki esnaf lokantaları ise günlük yemek, ızgara ve meze konseptiyle ekonomik seçenekler sunar. Akşam yemeği için ortalama harcama Bodrum merkezine göre %15-25 daha düşük seyreder.",
        ],
      },
      {
        h2: "Ulaşım ve Kos Feribotu",
        body: [
          "Turgutreis'e Milas-Bodrum Havalimanı'ndan özel transfer veya araç kiralama ile yaklaşık 50-60 dakikada ulaşılır. Toplu taşımayla gelmek isteyenler için Bodrum otogarından sezonda 30 dakikada bir Turgutreis dolmuşu kalkar; süre yaklaşık 35-40 dakika, ücret ekonomik.",
          "Turgutreis Marinası, Yunan adası Kos'a günlük feribot seferleri sunar. Süre yaklaşık 1 saat. Vize gerekiyor (Türk vatandaşları için Yunan vizesi ya da uygun e-vize alınmalı). Kos'a sabah gidip akşam dönmek mümkün; alışveriş, antik kentler ve adayı bisikletle gezmek isteyenler için popüler bir günlük tur.",
        ],
      },
      {
        h2: "Apart Özellikleri ve Fiyat Aralıkları",
        body: [
          "Turgutreis'teki apart stoku ağırlıklı olarak site içinde havuzlu daireler ve müstakil küçük apart binalarından oluşur. 1+1 stüdyo apartlardan 4+1 dubleks daireye kadar geniş bir yelpaze mevcut. Site içi apartlar genellikle 24 saat güvenlik, çocuk havuzu ve oyun alanı gibi olanaklar içerir; aile tatilleri için pratiktir.",
          "Yüksek sezon en yoğun dönemdir; düşük sezonda konaklama belirgin biçimde daha uygun olur. Haftalık ve aylık konaklamalarda mülk sahipleri çoğu zaman ek esneklik gösterir; eylül sonu - ekim arasındaki 'orta sezon' sakin ve uygun bir kaçamak için iyi bir fırsattır. Tarihinize göre kişiye özel teklif hazırlıyoruz.",
        ],
      },
      {
        h2: "Yakındaki Bölgeler",
        body: [
          "Turgutreis'in en yakın komşusu kuzeyde Yalıkavak. Sahil yolundan araba ile yaklaşık 15 dakika. Yalıkavak'ın butik marinasında bir akşam yemeği için günlük gidiş-dönüş yapılabilir. Güneyde Akyarlar köyü, yarımadanın en güney ucu ve son derece sakin; aile gezisi için ideal. Doğuda Ortakent (20 dk araba) Yahşi plajı ile dikkat çeker.",
          "Bodrum merkezine 18 km mesafe nedeniyle Turgutreis'te kalanlar genelde haftada 1-2 kez merkezdeki kale ziyaretine veya akşam yemeğine gidip dönerler.",
        ],
      },
    ],
    priceBand: {
      note: "2026 yüksek sezon — 2+1 aile apart aralığı",
    },
    faqs: [
      {
        q: "Turgutreis'te plaj çakıl mı, kum mu?",
        a: "Plajın büyük çoğunluğu küçük çakıl taşları ve denize girişte aniden kumlu zemine geçer. Plaj havlusu yerine plaj minderi/şezlong önerilir, ayrıca su ayakkabısı bebek/küçük çocuklar için faydalı.",
      },
      {
        q: "Kos adası feribotu için vize gerekiyor mu?",
        a: "Türk vatandaşları için Yunan Schengen vizesi veya Bodrum-Kos için özel düzenlenen 7 günlük geçiş vizesi gerekiyor. Vize başvurusunu gitmeden en az 2 hafta önce yapmanızı öneririz. Yabancı pasaportlular için Schengen vizesi yeterli.",
      },
      {
        q: "Çocuklu aileler için Turgutreis nerede konaklamalı?",
        a: "Marina'ya 5-10 dakika yürüme mesafesindeki site apartları ideal: sahile yakın, market ve restoran çevresinde, akşamları sessiz. Sahil hattındaki müstakil apartlar daha çok manzaraya odaklı; site apartları olanaklara odaklı.",
      },
      {
        q: "Cumartesi pazarına ne zaman gitmeli?",
        a: "Pazar 07:00'de açılır, 14:00 civarı toparlanır. Taze sebze-meyve için 09:00-11:00 arası en iyi saat. Hava sıcaksa sabah 08:00'de gidip kahvaltıyı çevredeki esnaf lokantalarında etmek pratiktir.",
      },
      {
        q: "Turgutreis'te restoran rezervasyonu gerekli mi?",
        a: "Marina çevresindeki popüler balık restoranları için temmuz-ağustos arası mutlaka rezervasyon önerilir. Esnaf lokantaları ve daha küçük işletmelerde rezervasyon genelde gerekmez; akşam saat 19:00 civarı gitmek yeterlidir.",
      },
    ],
    keywords: [
      "turgutreis apart kiralama",
      "turgutreis aile tatili",
      "turgutreis cumartesi pazarı",
      "kos adası feribot turgutreis",
    ],
  },
  yalikavak: {
    subHeading: "Yalıkavak Apart Kiralama — Butik Marina ve Şık Tatil 2026",
    lead: "Yalıkavak, son on yılda Bodrum yarımadasının imajını değiştiren bölge. Süper yat marinası, Hermes ve Louis Vuitton butikleri, dünyaca ünlü şef restoranları ve beyaz badanalı geleneksel sokak dokusuyla butik bir tatil destinasyonu. 2026 sezonunda Yalıkavak, apart tarafında da geniş bir spektrum sunar — site apartlarından deniz manzaralı yamaç dairelerine kadar.",
    suitedFor: [
      "Şık akşam yemeği ve butik alışveriş seven misafirler",
      "Konfora biraz daha bütçe ayıran çiftler ve aileler",
      "Süper yat marinasında gün geçirmek isteyenler",
      "Sakin koylarda yüzmek ve marinaya yürümek isteyenler",
      "Yalıkavak çevresindeki gizli koyları (Tilkicik, Kudur) keşfetmek isteyenler",
    ],
    notSuitedFor: [
      "Sıkı bütçeli aileler için ekonomik konaklama (Bitez/Ortakent öneririz)",
      "Yoğun kalabalık ve geleneksel pazar atmosferi sevmeyenler",
      "Sadece denize girip plajda gün geçirmek isteyenler (Turgutreis'te daha geniş sahil var)",
    ],
    sections: [
      {
        h2: "Yalıkavak'ın Karakteri",
        body: [
          "Yalıkavak, Bodrum merkezinin yaklaşık 18 km kuzeybatısında, yarımadanın kuzey kıyısında yer alır. 2000'li yılların başında küçük bir kasabaydı; 2014'te açılan Palmarina ile birlikte Türkiye'nin en lüks tatil noktalarından biri haline geldi. Yalıkavak'ın çekiciliği iki katmandan oluşur: eski kasabanın daracık sokakları, beyaz badanalı evleri ve bougainvillea ile süslü taş duvarları; bir de süper yat marinası etrafında oluşan modern restoran-mağaza ekosistemi.",
          "Yalıkavak'ı diğer Bodrum bölgelerinden ayıran en önemli özellik, yaşam standardının yıl boyu yüksek tutulması. Marina'daki bazı restoranlar kış aylarında da açık; lüks markaların butik mağazaları sezon dışında bile hizmet verir. Bu özellik, Yalıkavak'ı 'sezon dışı tatil' düşünenler için de cazip kılar.",
        ],
      },
      {
        h2: "Marina, Restoranlar ve Butik Alışveriş",
        body: [
          "Palmarina Yalıkavak, Akdeniz'in en büyük süper yat marinalarından biri. 600+ yat kapasitesi, 60+ restoran ve mağaza, kongre merkezi ve sanat galerileri içerir. Akşamları marinanın su kenarındaki yürüyüş yolu boyunca dolaşmak, yatlara bakarken kokteyl içmek bölgenin klasik akşam aktivitesi.",
          "Yalıkavak gastronomisi son yıllarda Türkiye'nin en dinamik bölgesi haline geldi. Marina içinde Zuma, Cipriani, Macakizi gibi uluslararası markaların yanı sıra şef Mehmet Gürs, Civan Er, Maksut Aşkar gibi Türk şeflerin mekânları yer alır. Eski kasaba sokaklarında ise daha mütevazı meyhane, balık ızgara işletmeleri ve yerel Ege mutfağı sunan butik mekânlar var. Akşam yemeği için bütçeniz, tercih ettiğiniz mekânın konseptine göre belirgin biçimde değişir.",
          "Alışveriş açısından marinada Hermes, Louis Vuitton, Brunello Cucinelli, Loro Piana gibi lüks markaların butikleri; eski kasaba sokaklarında ise yerel Türk tasarımcıların butik mağazaları ve el yapımı seramik atölyeleri bulunur.",
        ],
      },
      {
        h2: "Plajlar ve Gizli Koylar",
        body: [
          "Yalıkavak'ın ana plajı küçük ve şehir kısmı yakın; bu yüzden çoğu tatilci günlerini çevredeki gizli koylarda geçirir. Tilkicik Koyu (yürüyerek 20 dk veya tekneyle 5 dk), Kudur Koyu (araba ile 10 dk), Geriş plajı ve Aktur sahili Yalıkavak'tan kolay ulaşılabilen alternatifler arasında.",
          "Tilkicik Koyu özellikle berrak suyu ve doğal manzarasıyla popüler; küçük bir restoran ve şezlong-şemsiye düzeni var. Kudur Koyu daha geniş ve ailelere uygun; bazı butik beach clublar burada hizmet verir. Genel olarak Yalıkavak çevresindeki koylar, Gümbet/Turgutreis'in geniş halk plajlarına göre daha izole ve daha şık bir atmosfere sahip.",
        ],
      },
      {
        h2: "Ulaşım",
        body: [
          "Milas-Bodrum Havalimanı'ndan Yalıkavak'a transfer yaklaşık 50-60 dakika sürer. Özel transfer veya araç kiralama en pratik yöntem. Toplu taşımada Bodrum otogarına iniş sonrası Yalıkavak dolmuşu kullanılır; süre yaklaşık 30-35 dakika, sezonda 15 dakikada bir kalkış vardır.",
          "Yalıkavak içinde yaya dolaşımı eski kasaba ve marina bölgesinde çok kolay; tepe yamaçlarındaki apartlar için ise eğim nedeniyle araç önerilir. Marina ile kasaba arasında ücretsiz mekik servisi vardır. Çevre köylere (Gündoğan, Türkbükü, Bodrum merkezi) günübirlik gitmek için araç kiralama veya taksi tercih edilir.",
        ],
      },
      {
        h2: "Apart Özellikleri ve Fiyat Aralıkları",
        body: [
          "Yalıkavak apart stoku, butik tatil anlayışına göre şekillenmiş. Marina çevresinde modern, dekorasyonu özenli, deniz manzaralı küçük apartlar; eski kasaba sokaklarında geleneksel taş ev şeklinde dönüştürülmüş butik daireler; tepe yamaçlarında ise geniş, havuzlu site apartları bulunur. Çoğu apart sahibi mülkünü dikkatle döşemiş; tasarım kalitesi yarımadanın diğer bölgelerine göre genelde bir adım önde.",
          "Yalıkavak, konaklama tarafında yarımadanın butik ve üst segment bölgelerinden biri; standart 2+1 dairelerden lüks villa ve apartlara kadar geniş bir aralık sunar. Düşük sezonda konaklama daha uygun olur, ancak Yalıkavak diğer bölgelere göre daha az sezonsal dalgalanma gösterir. Tarihinize ve mülke göre kişiye özel teklif hazırlıyoruz.",
        ],
      },
      {
        h2: "Yakındaki Bölgeler",
        body: [
          "Yalıkavak'tan kuzeydoğuya doğru Gündoğan (8 km), Türkbükü (15 km) ve Göltürkbükü uzanır; bu hat Bodrum'un 'kuzey kıyısı butik şeridi'dir. Güneyde Turgutreis 12 km mesafede; sahil yolundan keyifli bir araba sürüşü.",
          "Yalıkavak'ta kalıp akşam yemeği için Gündoğan'a veya gün boyu plaj için Aktur'a gitmek yaygın bir kombinasyon. Bodrum merkezine 18 km — yarımadanın diğer ucunda gibi hissedilir; merkeze haftada bir kez gitmek genellikle yeterlidir.",
        ],
      },
    ],
    priceBand: {
      note: "2026 yüksek sezon — apart tarafı, 2+1 ortalama bandı",
    },
    faqs: [
      {
        q: "Yalıkavak çok mu pahalı?",
        a: "Konaklama ve yemek anlamında yarımadanın pahalı tarafında. Apart kirasında %30-50 prim olabiliyor, restoranlarda da benzer fark var. Yalıkavak ekonomisini dengelemek için kahvaltı ve öğle yemeğini apartta yapıp akşam yemeği için marinaya gitmek pratik bir yöntem.",
      },
      {
        q: "Marinaya giriş ücretli mi?",
        a: "Marina alanına giriş ücretsiz; otopark kullanımı saatlik ücretlidir. Restoran rezervasyonu yapanlar için bazı işletmeler valet park hizmeti sunar.",
      },
      {
        q: "Eski kasabada konaklamak ile marina çevresi farkı ne?",
        a: "Eski kasaba: daha sessiz, geleneksel atmosfer, yerel pazara/restoranlara yakın. Marina çevresi: daha hareketli, gece geç saatlere kadar canlı, butiklerin yanı başında. Çiftler ve sakin tatil isteyenler için eski kasaba; sosyal gezme planı olanlar için marina yakını daha uygun.",
      },
      {
        q: "Süper yat kiralama yaptırılır mı?",
        a: "Evet, Palmarina'da kiralama acenteleri bulunur. Günlük charter teknenin tipine ve donanımına göre değişir; sezonda en az 1 ay önceden rezervasyon önerilir.",
      },
      {
        q: "Yalıkavak'ta plaj kulübü deneyimi nasıl?",
        a: "Marina içindeki Casa Dell'Arte, Macakizi gibi premium beach club'lar şezlong-şemsiye + minimum harcama sistemiyle çalışır; minimum harcama yarımadanın üst segmentindedir. Daha yerel ve uygun bir alternatif için Tilkicik Koyu'ndaki küçük işletmeler tercih edilebilir.",
      },
    ],
    keywords: [
      "yalıkavak apart kiralama",
      "yalıkavak palmarina",
      "yalıkavak butik tatil",
      "yalıkavak premium daire",
    ],
  },
  bitez: {
    subHeading: "Bitez Apart Kiralama — Sakin Koy, Rüzgar Sörfü ve Aile Tatili 2026",
    lead: "Bitez, Gümbet'in batı komşusu olarak nispeten daha sessiz, mandalina bahçeleri arasında saklanan ve denizin neredeyse her zaman sakin olduğu bir koy. Türkiye'nin en iyi rüzgâr sörfü noktalarından biri ve ailelerin Bodrum'a geri dönerken adres olarak gösterdiği bir bölge. 2026 sezonunda Bitez, Gümbet'in eğlencesine yürüme mesafesinde kalırken kendi sakin atmosferini korur.",
    suitedFor: [
      "Sakin ama Bodrum merkezine yakın kalmak isteyen aileler",
      "Rüzgâr sörfü, kitesurf, paddle board denemek isteyenler",
      "Sahil iskeleli restoranlarda gün batımı izlemek isteyenler",
      "Yürüyüş ve bisiklet sevenler (Gümbet'e sahil yolu yürüyüşü)",
      "Mandalina bahçeleri ve sessiz akşamları sevenler",
    ],
    notSuitedFor: [
      "Gece kulübü ve yoğun gece hayatı arayanlar (Gümbet 5 dk)",
      "Şık marina ve butik bir tatil isteyenler (Yalıkavak)",
      "Geniş kumsal arayanlar (sahil çakıl-kum karışımı, dar)",
    ],
    sections: [
      {
        h2: "Bitez'in Karakteri",
        body: [
          "Bitez, Bodrum merkezinin yaklaşık 7 km batısında, dağ yamacından denize doğru uzanan bir köy. Eski Bitez (köy merkezi) tepeye doğru çıkarken mandalina ve narenciye bahçeleriyle çevrili; sahil bölgesi ise koyun etrafında yaklaşık 2 km'lik yarım daire şeklinde. Bu coğrafi yapı, Bitez'i 'sessiz arka taraf, hareketli sahil hattı' diye iki katmana ayırır.",
          "Bölgenin en sevilen özelliği, sahil hattındaki ahşap iskeleler. Restoranlar denize uzanan platformlar inşa etmiş; akşamları bu iskelelerde balık-meze yiyerek gün batımını izlemek Bitez'in klasik aktivitesi haline gelmiş. Gümbet'in 'gece kulübü kalabalığı' yerine Bitez 'aile-arkadaş akşamı' atmosferine sahiptir.",
        ],
      },
      {
        h2: "Sahil ve Su Sporları",
        body: [
          "Bitez sahili yaklaşık 2 km uzunluğunda, kum-çakıl karışımı. Suyun girişi yumuşak, sığ; küçük çocuklar için güvenli. Sahilin doğu kısmı (Gümbet'e yakın) daha dar, batı kısmı (Ortakent yönü) daha geniş ve sakin.",
          "Bitez koyu, Türkiye'nin en iyi rüzgâr sörfü noktalarından biri kabul edilir. Öğleden sonra meltem rüzgârı düzenli olarak eser ve koy yapısı dalgayı düşük tutar — bu, yeni başlayanlar için ideal koşullar yaratır. Bölgede 3-4 sörf okulu var; başlangıç dersleri genellikle ekipman dahil sunulur. Kitesurf için de uygun rüzgâr koşulları var, fakat daha çok deneyimli kullanıcılara önerilir. Paddle board ve kano kiralama yaz boyunca sahilde mevcut.",
          "Sahilde halk plajı bölümü ve işletmelere ait şezlong-şemsiye düzeni mevcut. İskelelerde minimum harcama ile şezlong; halk bölümünde kendi malzemenizle gün geçirebilirsiniz.",
        ],
      },
      {
        h2: "Yeme-İçme",
        body: [
          "Bitez'in gastronomik kimliği balık, meze ve Ege ev mutfağı üzerine kurulu. Sahil iskelelerindeki restoranlar (Naz, Mavi, Akin's, Atilla'nın Yeri gibi yerel klasikler) on yıllardır faaliyette ve yerel halk tarafından da tercih edilir; içkili bir akşam yemeği keyifli ve makul bir deneyim sunar.",
          "Sahil hattının arkasındaki sokaklarda küçük kahvaltı evleri, gözleme dükkânları ve kafeler bulunur. Bitez'in serpme kahvaltısı (yöre ürünleri ile zenginleştirilmiş) ünlüdür; pazar sabahı brunch'ı sevenler için ideal bir aktivite. Tepedeki Eski Bitez köyünde ise daha mütevazı esnaf lokantaları, yerel pazar ve haftalık manav gezisi yapılabilir.",
        ],
      },
      {
        h2: "Ulaşım",
        body: [
          "Bitez'e havalimanından transfer yaklaşık 45 dakika; Bodrum merkezine 7 km, dolmuşla 10-15 dakika. Gümbet'e yürüyerek 25-30 dakika (sahil yolu boyunca), Ortakent'e dolmuşla 5-10 dakika. Yarımadanın en kolay erişilebilen orta-batı koylarından biri.",
          "Bitez içinde dolaşım için araç şart değil ancak yamaç apartlarında konaklayanlar için pratik. Sahil hattında dolmuş hatları 5-10 dakikada bir geçer. Bitez-Gümbet sahil yolu yürüyüşü tatilcilerin sevdiği bir aktivite — yaklaşık 30 dakika, manzarası güzel.",
        ],
      },
      {
        h2: "Apart Özellikleri ve Fiyat Aralıkları",
        body: [
          "Bitez apart stoku ağırlıklı olarak 2 katlı küçük apart binaları, müstakil bahçeli yazlıklar ve havuzlu site apartlarından oluşur. Apartların büyük çoğunluğu mandalina ve zeytin ağaçlarıyla çevrili bahçelerde yer alır; bu, Bitez'in atmosferine özgü bir özellik. Lüks villa stoku da azımsanmayacak şekilde var ancak Yalıkavak kadar yoğun değil.",
          "Yüksek sezon en yoğun dönemdir; mandalina bahçeli müstakil yazlıklar üst segmente kadar uzanır. Düşük sezonda konaklama belirgin biçimde daha uygun olur. Bitez, eylül-ekim sezonunda hâlâ sakin denizi sayesinde popüler kalır. Tarihinize göre kişiye özel teklif hazırlıyoruz.",
        ],
      },
      {
        h2: "Yakındaki Bölgeler",
        body: [
          "Bitez'in doğusu Gümbet (5 dk araba, 25-30 dk yaya), batısı Ortakent (5-10 dk araba). Bu üç bölge birbirinin akşam-gündüz alternatifi gibi kullanılır: günü Bitez'de geçirip akşamı Gümbet'e veya Bodrum merkezine gitmek; öğlen Bitez'de yüzüp akşam Ortakent'in Yahşi sahiline yemek için geçmek yaygın bir kombinasyon.",
          "Bodrum merkezine 7 km, Yalıkavak'a 20 km — günlük geziler için her ikisi de erişilebilir mesafede.",
        ],
      },
    ],
    priceBand: {
      note: "2026 yüksek sezon — 2+1 standart apart aralığı",
    },
    faqs: [
      {
        q: "Bitez küçük çocuklu aileler için güvenli mi?",
        a: "Çok uygun. Sahilde su sığ ve dalgasız, kum-çakıl karışımı. Sahilin doğu ve batı uçları daha geniş ve daha sakin. Sahil hattı boyunca yaya yolu var; bisiklet/scooter ile çocukla dolaşmak kolay.",
      },
      {
        q: "Rüzgâr sörfüne nasıl başlanır?",
        a: "Sahilde 3-4 sörf okulu var; başlangıç dersi 1-2 saatlik. Minimum yaş genelde 8. Ekipman dersle birlikte sağlanır. Sezon başında (mayıs-haziran) ve sonunda (eylül) rüzgâr daha düzenli olur.",
      },
      {
        q: "Sahil iskelesindeki restoran rezervasyon ister mi?",
        a: "Temmuz-ağustos cumartesi-pazar günleri evet, mutlaka rezervasyon önerilir. Diğer günler ve hafta içi akşamları genelde 19:00 öncesi giderseniz rezervasyonsuz yer bulunabilir.",
      },
      {
        q: "Bitez'de hangi otopark seçenekleri var?",
        a: "Çoğu apart kendi otoparkını sunar. Sahil hattında belediye otoparkı ve restoran otoparkları (genelde minimum harcamayla) mevcut. Sokak parkı sezonda zor.",
      },
      {
        q: "Bitez'de market alışverişi nereden?",
        a: "Sahil hattında küçük market (Migros Jet, A101) ve sebze-meyveci dükkânları var. Daha büyük alışveriş için Bodrum merkezindeki BIM, ŞOK ve Migros Jet'lere 10 dakikada ulaşılır. Cumartesi günü Turgutreis pazarına da gidilebilir.",
      },
    ],
    keywords: [
      "bitez apart kiralama",
      "bitez rüzgar sörfü tatili",
      "bitez aile dostu plaj",
      "bitez sahil iskele restoran",
    ],
  },
  ortakent: {
    subHeading: "Ortakent Apart Kiralama — Yahşi Plajı ve Köy Atmosferi 2026",
    lead: "Ortakent, Bodrum'un en uzun (1 km) kumlu plajına — Yahşi'ye — ev sahipliği yaparken iç kısmında geleneksel Bodrum köy mimarisini korur. Aile tatili için sığ ve kumlu deniz, otantik köy atmosferi ve Bodrum merkezine 10 dakikalık mesafe avantajları birleşir. 2026'da Ortakent, fiyat-konfor dengesinin iyi olduğu, çocuklu ailelerin sıklıkla geri döndüğü bir bölge.",
    suitedFor: [
      "Çocuklu aileler için en geniş kumlu plaj arayanlar",
      "Köy atmosferi ve geleneksel taş mimari sevenler",
      "Salı pazarı, yerel zanaatkâr ve yöresel üreticileri keşfetmek isteyenler",
      "Bütçe ile kaliteyi dengelemek isteyen orta bütçeli aileler",
      "Bodrum merkezine kolay ulaşabilmek isteyenler",
    ],
    notSuitedFor: [
      "Gece hayatı arayanlar",
      "Süper yat marinası ve butik alışveriş hedefleyenler",
      "Yalnız çiftler için romantik kaçamak — Yalıkavak/Gündoğan daha uygun",
    ],
    sections: [
      {
        h2: "Ortakent'in Karakteri",
        body: [
          "Ortakent, Bodrum merkezinin yaklaşık 10 km batısında, dağ etekleriyle deniz arasında uzanan bir köy. İki ayrı katmandan oluşur: deniz seviyesinde Yahşi sahili ve apartların yoğunlaştığı sahil hattı; bu hattın yaklaşık 2 km kuzeyinde ise Eski Ortakent köyü — geleneksel taş evler, daracık sokaklar ve haftalık salı pazarı.",
          "Eski Ortakent'in ortasında bulunan Mustafa Paşa Kulesi (1601) bölgenin tarihi simgesi. Kasaba meydanında küçük bir cami, esnaf lokantaları ve bağımsız küçük market yer alır. Bu iki katmanlı yapı, Ortakent'i 'tatil ve gerçek köy yaşamını aynı anda hissetme' deneyimi açısından özel kılar.",
        ],
      },
      {
        h2: "Yahşi Plajı",
        body: [
          "Yahşi plajı yaklaşık 1 km uzunluğunda ve Bodrum yarımadasının en uzun kumlu plajı. Tamamen kumlu zemin, hafif eğimli giriş, sığ su yapısı — özellikle 0-7 yaş arası çocuklarla seyahat eden aileler için yarımadanın en güvenli plajlarından biri kabul edilir.",
          "Plaj boyunca işletmelerin önünde uygun bir minimum harcama veya günlük şezlong ücretiyle gün geçirilebilir. Halk plajı bölgeleri ücretsiz ancak donanımsız. Sahilde su sporları (jet ski, banana, ringo) işletmeleri yaz aylarında aktif. Plajın doğu ucunda 'Yahşi Beach' adlı daha modern beach club, batı ucunda ise daha yerel ve aile dostu işletmeler yoğunlaşır.",
          "Plajdan yaklaşık 1 km içeride çocuk parkları, voleybol sahası ve halka açık WC-duş alanı bulunur. Ailelerin günlerini orada uzun süre geçirmesine uygun altyapı mevcut.",
        ],
      },
      {
        h2: "Eski Köy ve Salı Pazarı",
        body: [
          "Eski Ortakent köyü, Bodrum'un Halikarnas Mozolesi öncesi köy yaşamını bir ölçüde hâlâ taşır. Köy meydanında her salı kurulan pazar; sebze-meyve, peynir-zeytin, ev yapımı reçel, yerel zeytinyağı ve özellikle el yapımı seramik-tekstil ürünleriyle ünlü. Turistik bir pazar olmaktan ziyade yerli halkın haftalık alışveriş yaptığı bir nokta; bu da onu Bodrum merkezi pazarına göre daha uygun ve samimi kılar.",
          "Köy içinde Mustafa Paşa Kulesi'ni gezmek, köy meydanındaki kafede Türk kahvesi içmek ve geleneksel taş ev sokaklarında yürümek 1.5-2 saatlik bir köy gezisi planı için yeterli. Yaz aylarında köyün sokakları gölgelidir; öğleden sonra ziyaret etmek keyiflidir.",
        ],
      },
      {
        h2: "Yeme-İçme",
        body: [
          "Ortakent yeme-içme sahnesi 'aile lokantası' kategorisinde güçlüdür. Yahşi sahilindeki restoranlar balık-meze, izgara ve ev mutfağı ağırlıklı; aile bütçesine uygun bir akşam yemeği için ideal. Plajın batı ucundaki küçük balıkçı işletmeleri yöresel sade lezzeti, doğu ucundaki daha modern işletmeler ise çeşitli mutfak konsepti sunar.",
          "Eski köyde esnaf lokantaları ve kahvaltıcılar var; tipik bir köy serpme kahvaltısı keyifli ve uygundur. Pizza, burger gibi modern fast food seçenekleri sahil hattında daha yaygındır; gerçek 'köy yemeği' deneyimi için Eski Ortakent tercih edilmeli.",
        ],
      },
      {
        h2: "Ulaşım",
        body: [
          "Milas-Bodrum Havalimanı'ndan transfer yaklaşık 45-50 dakika. Bodrum merkezine 10 km — dolmuşla 15-20 dakika. Bitez'e yürüyerek (sahil yolu) 30-40 dakika, dolmuşla 5 dakika. Yarımadanın orta-batı ekseninde merkezi bir konum.",
          "Ortakent içinde Yahşi sahili–Eski köy arasında 2 km mesafe var; ikisini birlikte planlamak istiyorsanız araç veya dolmuş gerekiyor. Dolmuş hatları sahil hattında 10 dakikada bir, köy ile sahil arası ise 20 dakikada bir geçer.",
        ],
      },
      {
        h2: "Apart Özellikleri ve Fiyat Aralıkları",
        body: [
          "Ortakent apart stoku Yahşi sahili çevresinde yoğunlaşır. Site apartları (havuz, güvenlik, çocuk oyun alanlı) yaygın; müstakil küçük apart binaları sahil hattının arka sokaklarında bulunur. Eski köyde butik bir kaç taş ev apart şeklinde tatilciye açılmış durumda — sınırlı sayıda ancak otantik bir konaklama tecrübesi sunar.",
          "Havuzlu site apartları üst segmente, müstakil binalar daha uygun tarafa konumlanır. Eski köy taş evleri sınırlı stoklu ve özel bir konaklama sunar. Düşük sezonda konaklama belirgin biçimde daha uygun olur. Tarihinize göre kişiye özel teklif hazırlıyoruz.",
        ],
      },
      {
        h2: "Yakındaki Bölgeler",
        body: [
          "Ortakent'in doğusunda Bitez (5 dk araba), batısında Yahşi-Camlık (10 dk araba). Bodrum merkezi 10 km, yarım saatlik araba mesafesi sayılır. Yalıkavak'a 15 km — günübirlik akşam yemeği gezisi için uygundur.",
          "Aileler genellikle Ortakent'te konaklayıp günü Yahşi sahilinde geçirir, akşam yemeğini Bitez iskelelerinde yer, hafta içi 1-2 kez Bodrum merkezindeki kale-marina ziyareti yapar. Bu kombinasyon tipik bir 'Ortakent tatil rutini' oluşturur.",
        ],
      },
    ],
    priceBand: {
      note: "2026 yüksek sezon — 2+1 standart apart aralığı",
    },
    faqs: [
      {
        q: "Ortakent neden ailelere uygun?",
        a: "Üç ana sebep: Yahşi plajının uzun ve kumlu yapısı çocuklar için ideal, eski köy gezisi ve salı pazarı ailece keyifli, Bodrum merkezine kolay ulaşılır ama gece gürültüsü yok. Site apartları çocuk oyun alanları ve havuzlarıyla çocukların kendi başlarına vakit geçirmelerine olanak sağlar.",
      },
      {
        q: "Salı pazarına ne zaman gitmek en iyisi?",
        a: "Pazar 08:00 civarı kurulur, 14:00-15:00 arası toparlanır. Taze sebze-meyve için 09:00-11:00 ideal; el sanatları stantlarına bakmak için 11:00-13:00 daha rahat. Yaz aylarında sıcaktan kaçmak için sabah erken gitmek önerilir.",
      },
      {
        q: "Yahşi plajında şezlong-şemsiye ücreti ne kadar?",
        a: "İşletmeye göre değişir: ya günlük bir şezlong ücreti ya da uygun bir minimum yeme-içme harcaması uygulanır. Halk plajı bölgesi ücretsiz ancak donanım kendiniz getirirsiniz.",
      },
      {
        q: "Ortakent'ten Bodrum merkezine akşam gitmek mantıklı mı?",
        a: "Akşam yemeği veya merkez gezintisi için evet — taksi ile 15-20 dakika, dolmuşla 20-25 dakika. Dönüş için dolmuşlar gece 24:00-01:00 arası kesilir; akşam geç saate kalacaksanız taksi planı yapın.",
      },
      {
        q: "Ortakent'in dezavantajları neler?",
        a: "Sahil ve köy arasında 2 km mesafe — biri için gelip diğerini gezmek araç/dolmuş gerektiriyor. Gece hayatı yok; gece kulübü arayanlar için Gümbet'e gitmek gerekiyor. Sahil hattı çok büyük olmadığı için bazı işletmeler ağustosta dolup taşar.",
      },
    ],
    keywords: [
      "ortakent apart kiralama",
      "yahşi plajı apart",
      "ortakent salı pazarı",
      "ortakent köy tatili",
    ],
  },
  gundogan: {
    subHeading: "Gündoğan Apart Kiralama — Sakin Koy ve Deniz Manzaralı Yamaç 2026",
    lead: "Gündoğan, Yalıkavak ile Türkbükü arasında saklı, rüzgârdan korunan ve geleneksel balıkçı köyü kimliğini hâlâ koruyan butik bir koy. Yamaçtan denize uzanan apartlar deniz manzarası sunar; sahil ise çakıllı, sakin ve sezon sonu bile yüzülebilir bir alandır. 2026 sezonunda Gündoğan, sakin lüks arayan ailelerin ve çiftlerin tercih ettiği gözde bir nokta.",
    suitedFor: [
      "Sakin koylarda yüzmek isteyen bütçesi biraz daha geniş aileler",
      "Yamaçtan deniz manzarası ve sessiz akşam atmosferi sevenler",
      "Yalıkavak'a yakın olmak ama daha sakin kalmak isteyenler",
      "Cennet Adası ve çevre koy turlarına ilgi duyanlar",
      "Akdeniz mutfağı ağırlıklı butik restoran sevenler",
    ],
    notSuitedFor: [
      "Geniş kumsal ve plaj kulübü hareketliliği isteyenler (Ortakent)",
      "Yoğun gece hayatı arayanlar (Gümbet)",
      "Ekonomik ekonomik konaklama hedefleyenler (Turgutreis)",
    ],
    sections: [
      {
        h2: "Gündoğan'ın Karakteri",
        body: [
          "Gündoğan, Bodrum yarımadasının kuzey kıyısında, Yalıkavak'ın 8 km doğusunda, Türkbükü'nün 5 km batısındaki sakin bir koy. 1990'lara kadar küçük bir balıkçı köyüydü; bugün hâlâ yerel halkın yıl boyu yaşadığı bir bölge olmasıyla diğer butik koylardan ayrılır.",
          "Bölgenin coğrafi yapısı 'amfitiyatro' şeklinde: yarım daire halinde koy, etrafında yamaç yapısı, üstte tepeler. Bu yapı sayesinde apartlar yamaç boyunca dizilir ve neredeyse tamamı deniz manzaralıdır. Yamaç yapısı aynı zamanda Gündoğan'ı kuzey rüzgârından korur; deniz çoğu zaman ayna gibi sakin kalır.",
        ],
      },
      {
        h2: "Sahil ve Cennet Adası",
        body: [
          "Gündoğan sahili çakıllı, yaklaşık 800 metre uzunluğunda. Kum değil, ancak suyun berraklığı yarımadanın en iyilerinden. Sahilde küçük ve orta ölçekli işletmeler şezlong-şemsiye servisi sunar; minimum harcama veya günlük ücret sistemi yaygın. Halk plajı bölümü dar ama ücretsiz.",
          "Gündoğan'ın imzası, koyun yaklaşık 1 km açığındaki Cennet Adası (Aigialos Adası). Tekneyle 5-10 dakikada ulaşılan bu küçük ada, berrak suyu ve doğal bitki örtüsüyle yarım günlük kaçamak için ideal. Sahilden bireysel tekne kiralayarak veya günlük tur tekneleriyle gidilebilir. Adada bir küçük restoran ve gölgelik var.",
        ],
      },
      {
        h2: "Yeme-İçme",
        body: [
          "Gündoğan'ın gastronomik kimliği son yıllarda Akdeniz mutfağı odaklı butik restoranlarla şekillenmiştir. Sahil hattındaki klasik balıkçı işletmelerine ek olarak yenilenmiş, modern konseptli mekânlar yaz aylarında aktif; akşam yemeği bütçeniz tercih ettiğiniz mekânın konseptine göre değişir.",
          "Köyün eski kısmındaki esnaf işletmeleri ve gözleme dükkânları daha mütevazı seçenekler sunar. Sabah kahvaltısı için yamaç apartlarından deniz manzaralı kahvaltıyı kendi apartınızda hazırlamak; öğle yemeği için sahil işletmelerine inmek; akşam yemeği için Yalıkavak veya Türkbükü'ne yarım saatlik araba turu yapmak yaygın bir kombinasyon.",
          "Cumartesi günleri köyün üst kısmında küçük bir pazar kurulur; turistik değil, yerli halkın alışveriş ettiği bir nokta.",
        ],
      },
      {
        h2: "Ulaşım",
        body: [
          "Milas-Bodrum Havalimanı'ndan Gündoğan'a transfer yaklaşık 55-65 dakika. Özel transfer veya araç kiralama en pratik yöntem. Toplu taşıma sınırlı: Bodrum otogarına iniş sonrası Yalıkavak veya Türkbükü dolmuşuyla Gündoğan'a geçilebilir, sezonda yaklaşık 20-30 dakikada bir.",
          "Gündoğan içinde yaya dolaşımı için yamaç yapısı zorlayıcı olabilir; üst kısımdaki apartlarda kalanlar için araç önerilir. Sahil-restoran ekseninde yaya dolaşımı kolaydır. Yalıkavak'a (8 km, 15 dk araba) ve Türkbükü'ne (5 km, 10 dk araba) günlük gezi mümkündür.",
        ],
      },
      {
        h2: "Apart Özellikleri ve Fiyat Aralıkları",
        body: [
          "Gündoğan'ın apart stoku ağırlıklı olarak yamaç sitelerinde havuzlu, deniz manzaralı dairelerden oluşur. Apartların büyük çoğunluğu son 15 yılda inşa edilmiş; modern dekorasyon, klima, havuz, otopark gibi olanaklar standarttır. Eski köy bölgesinde sınırlı sayıda butik taş ev apart bulunur.",
          "Deniz manzaralı standart daireler ile tepe konumlu, geniş teraslı dubleksler arasında geniş bir aralık vardır. Düşük sezonda konaklama belirgin biçimde daha uygun olur. Gündoğan, eylül-ekim arası sakin denizi sayesinde popüler kalır; geç sezon kaçamak için iyi bir seçim. Tarihinize göre kişiye özel teklif hazırlıyoruz.",
        ],
      },
      {
        h2: "Yakındaki Bölgeler",
        body: [
          "Gündoğan'ın batısında Yalıkavak (8 km, 15 dk araba) — butik alışveriş ve süper yat marinası için. Doğusunda Türkbükü (5 km, 10 dk araba) — şık plaj kulüpleri ve gece atmosferi için. Türkbükü Gündoğan'a göre daha hareketlidir.",
          "Bodrum merkezine 22 km, yaklaşık 35-40 dakika araba mesafesi. Haftada 1-2 kez merkez ziyareti yeterlidir. Yarımadanın güney koylarına (Gümbet, Turgutreis) gitmek için 40-60 dakikalık yol çıkar; pratik olarak bu tarafa geçmek için bir günlük planlama önerilir.",
        ],
      },
    ],
    priceBand: {
      note: "2026 yüksek sezon — 2+1 deniz manzaralı apart bandı",
    },
    faqs: [
      {
        q: "Gündoğan'da plaj çakıllı, denize girmek rahatsız edici mi?",
        a: "Sahile yumuşak iri çakıl döşeli, denize girişte zorlayıcı olabilir ancak su ayakkabısıyla rahatsızlık yok. Suyun berraklığı çakıllı sahillerin avantajı — kumun bulanıklığı yok. Sahildeki çoğu işletmenin önünde küçük iskele/platform var, oradan da denize girilebilir.",
      },
      {
        q: "Cennet Adası'na nasıl gidilir?",
        a: "Üç yol var: (1) sahilden bireysel küçük tekne kiralayarak, (2) günlük grup tur tekneleriyle (genellikle öğle yemeği dahil), (3) kendiniz paddle board veya kano kiralayarak. Adada gölgelik az; şapka, su ve hafif yiyecek götürün.",
      },
      {
        q: "Yamaç apartında konaklamak yorucu mu?",
        a: "Üst yamaçtaki apartlar deniz manzarası açısından harika ama sahile her gün araç/dolmuşla iniş gerektirir. Orta yamaçtaki apartlar denge sağlar; yaya yürüyüşü 5-10 dakika. Sahile çok yakın apartlar sınırlı sayıda ve hızlı tükenir.",
      },
      {
        q: "Çocuklu aileler için Gündoğan uygun mu?",
        a: "8 yaş üstü çocuklarla rahatlıkla uygundur. 0-5 yaş arası küçük çocuklar için sahilin çakıllı yapısı zorlayıcı olabilir; kumlu sahil isteyen aileler için Ortakent veya Turgutreis önerilir. Site apartları havuzu, çocuklar için ek bir oyun alanı sağlar.",
      },
      {
        q: "Gündoğan'da gece hayatı var mı?",
        a: "Sınırlı. Sahil hattındaki restoranlar 23:00-24:00 civarına kadar açık; sonrasında köy sakindir. Yoğun gece hayatı için 10 dakikalık araba ile Türkbükü plaj kulüplerine veya 15 dakikalık araba ile Yalıkavak'a gidilebilir.",
      },
    ],
    keywords: [
      "gündoğan apart kiralama",
      "cennet adası gündoğan",
      "gündoğan deniz manzaralı daire",
      "gündoğan sakin koy tatil",
    ],
  },
  torba: {
    subHeading: "Torba Apart Kiralama — Havalimanına En Yakın Koy 2026",
    lead: "Torba, Bodrum yarımadasının kuzey kıyısında ve Milas-Bodrum Havalimanı'na sadece 25 dakika uzaklıkta. Sakin koyu, sığ deniz yapısı ve 5 yıldızlı resort hattıyla 'uçaktan iner inmez tatile başlayabilen' bir bölge. 2026'da Torba, kısa konaklama ve kolay erişim isteyen aileler için pratik bir seçim.",
    suitedFor: [
      "Kısa konaklama (2-4 gece) düşünen iş gezginleri ve aileler",
      "Havalimanına yakın bir tatil bölgesi arayanlar",
      "Sakin, dalgasız bir koyda yüzmek isteyen aileler",
      "Resort otellerin imkânlarına yakın apart konaklama düşünenler",
      "Bodrum merkezi çevresini günlük gezi temposuyla keşfetmek isteyenler",
    ],
    notSuitedFor: [
      "Gece hayatı arayan genç gruplar",
      "Geniş kumlu plaj ve uzun sahil yürüyüşü isteyenler",
      "Yerel köy atmosferi ve geleneksel sokak yemeği isteyenler",
    ],
    sections: [
      {
        h2: "Torba'nın Karakteri",
        body: [
          "Torba, Bodrum merkezinin yaklaşık 10 km kuzeyinde ve yarımadanın kuzey kıyısındaki ilk büyük koy. Adını 'tor' (rüzgârsız) kelimesinden alır ve bu özellik bölgenin doğal yapısını da özetler: kuzeyden korunaklı, sakin ve yıl boyu yumuşak iklimli.",
          "Bölgenin son 20 yıldaki gelişimi ağırlıklı olarak resort otellerle şekillenmiş; sahil hattında Vogue, Doria, Casa De Maris gibi 5 yıldızlı tesisler bulunur. Bu tesislerin arasında ve etrafında apart siteleri yer alır. Köy merkezi küçük; ana cadde üzerinde market, restoran, eczane ve birkaç esnaf işletmesi bulunur.",
        ],
      },
      {
        h2: "Sahil ve Su",
        body: [
          "Torba sahili yaklaşık 1.2 km uzunluğunda, ince çakıl-kum karışımı. Su girişi yumuşak ve sığ; küçük çocuklar için son derece güvenli. Sahilin doğu ucu daha sakin (resort otellerin özel plajları), batı ucu daha hareketli (halk plajı ve apart sitelerinin sahil bölgeleri).",
          "Halk plajında ücretsiz kullanım mümkün ancak donanımsız. Resort otellere ait beach club'larda günlük geçiş ücretiyle yüzme ve kafe-restoran kullanımı imkânı sunulur. Bu seçenek, apart konaklamak ama otel plaj kulübü keyfini yaşamak isteyenler için pratiktir.",
          "Sahilin batı ucundan başlayan yaklaşık 4 km'lik yürüyüş hattı, kıyı boyunca devam eder ve doğa yürüyüşü için keyifli bir alternatiftir.",
        ],
      },
      {
        h2: "Yeme-İçme",
        body: [
          "Torba'nın yeme-içme sahnesi resort otellerin restoranları, sahil hattındaki birkaç bağımsız işletme ve köy merkezindeki esnaf lokantaları olmak üzere üç katmandan oluşur. Resort restoranları menü açısından zengin ve daha üst segmentte; bağımsız sahil işletmeleri balık-meze ağırlıklı ve daha uygundur.",
          "Köy merkezinde günlük ev mutfağı, gözleme, kahvaltı ve dürüm sunan küçük işletmeler var; sabah serpme kahvaltısı keyifli ve uygundur. Bodrum merkezindeki restoran çeşitliliğine erişmek için 15 dakikalık araba turu yeterli.",
        ],
      },
      {
        h2: "Ulaşım — Havalimanına Yakınlık",
        body: [
          "Torba'nın en büyük avantajı havalimanına 25 dakika mesafede olması — yarımadanın en yakın tatil bölgesi. Özel transfer veya araç kiralama ile uçaktan iner inmez 30 dakika içinde apartınıza varabilirsiniz. Bu özellik, kısa hafta sonu kaçamağı planlayanlar için Torba'yı pratik bir seçim yapar.",
          "Bodrum merkezine 10 km, 15 dakika araba. Toplu taşımada Bodrum otogarına iniş sonrası Torba dolmuşu kullanılır; sezonda 20-30 dakikada bir kalkış, süre 15-20 dakika. Yarımadanın güney koylarına (Gümbet, Turgutreis) ulaşmak için 30-50 dakikalık araba yolu gerekiyor.",
        ],
      },
      {
        h2: "Apart Özellikleri ve Fiyat Aralıkları",
        body: [
          "Torba apart stoku, resort hattının etrafında konumlanan modern site apartlarından oluşur. Çoğu site havuz, güvenlik, çocuk oyun alanı, otopark gibi olanaklara sahip. Müstakil apart binası az; bağımsız taş ev apart neredeyse yok.",
          "Standart 2+1 dairelerden lüks, deniz manzaralı dublekslere kadar geniş bir aralık vardır. Düşük sezonda konaklama belirgin biçimde daha uygun olur. Torba, yumuşak iklim avantajıyla nisan-mayıs ve ekim-kasım arası sezon dışı tatil için de tercih edilir. Tarihinize göre kişiye özel teklif hazırlıyoruz.",
        ],
      },
      {
        h2: "Yakındaki Bölgeler",
        body: [
          "Torba'nın doğusu Gündoğan (15 km, 20 dk araba), batısı Bodrum merkezi (10 km, 15 dk araba). Türkbükü 18 km, Yalıkavak 25 km mesafede. Bodrum yarımadasının kuzey kıyısına genel olarak hızlı erişim sağlar.",
          "Aileler genelde Torba'da konaklayıp gün boyu sahilde kalır, akşam yemeği için 15 dakikalık araba turuyla Bodrum merkezine iner ya da Gündoğan/Türkbükü'ne uğrar. Resort otellerin akşam programlarına bilet alarak da gece geçirilebilir.",
        ],
      },
    ],
    priceBand: {
      note: "2026 yüksek sezon — 2+1 site apart bandı",
    },
    faqs: [
      {
        q: "Torba kısa konaklama için neden ideal?",
        a: "Havalimanına 25 dakika — yarımadanın en yakın koyu. 2-3 gecelik bir hafta sonu için uçaktan iner inmez tatile başlamak mümkün. Diğer Bodrum bölgelerine kıyasla yol süresinde kayıp en az.",
      },
      {
        q: "Resort otelinin beach club'unu apart kalırken kullanabilir miyim?",
        a: "Çoğu resort günlük geçiş bileti satar (genellikle yeme-içme dahil değil). Yüksek sezonda kontenjan dolabilir; sabah erken gitmek önerilir. Doria, Vogue ve Casa De Maris gibi tesislerin beach club'ları popüler tercihler.",
      },
      {
        q: "Torba'da gece hayatı var mı?",
        a: "Resort otellerin animasyon programları dışında sınırlı. Sahil hattında bar-restoran 24:00 civarı kapanır. Gece eğlencesi için Bodrum merkezindeki Cumhuriyet Caddesi'ne 15 dakikalık araba turu yapmak gerekir.",
      },
      {
        q: "Torba sahili çocuk dostu mu?",
        a: "Çok uygun. İnce çakıl-kum karışımı, sığ ve dalgasız su. Sahilin doğu ucu daha sakin; aileler genelde burayı tercih eder. Yakın çevrede çocuk parkları ve dondurmacılar var.",
      },
      {
        q: "Torba'da araç kiralamak gerekli mi?",
        a: "Sadece sahil ve apart arasında dolaşacaksanız değil. Bodrum merkezi veya çevre köylere günübirlik gitmek istiyorsanız 2-3 günlük araç kiralama pratik olur; alternatif olarak transfer veya taksi kullanılabilir.",
      },
    ],
    keywords: [
      "torba apart kiralama",
      "torba bodrum havalimanı yakın",
      "torba sakin koy aile tatili",
      "torba resort apart konaklama",
    ],
  },
};
