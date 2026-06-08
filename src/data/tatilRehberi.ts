// =========================================================================
// PILLAR PAGE CONTENT — "Bodrum Tatil Rehberi"
//
// Long-form, answer-first hub content for /bodrum-tatil-rehberi. Lives here
// (not inline in the page) to keep the route component lean and under the
// 500-line house limit. Localised for all four site locales (tr/en/de/ru)
// with natural, native copy — warm/family tone, no prices.
//
// Each section's `body` is an array of paragraph strings. Hub→spoke internal
// links are NOT embedded in this prose; the page renders a curated, contextual
// link row under each section from the structured `RELATED_LINKS` map so the
// anchor text and targets stay verifiable against real routes.
// =========================================================================

export type Locale = "tr" | "en" | "de" | "ru";

export interface GuideSection {
  id: string;
  heading: string;
  body: string[];
}

export interface GuideCopy {
  badge: string;
  h1: string;
  sub: string;
  intro: string[]; // answer-first opening
  sections: GuideSection[];
  faqTitle: string;
  relatedTitle: string; // label above each section's contextual link row
  ctaHeading: string;
  ctaBody: string;
  ctaWhatsApp: string;
  ctaWaText: string;
  ctaSecondary: string;
  tocTitle: string;
}

export const GUIDE: Record<Locale, GuideCopy> = {
  // ─────────────────────────────────────────────────────────────────────────
  tr: {
    badge: "Bodrum 2026",
    h1: "Bodrum Tatil Rehberi",
    sub: "Ne zaman gidilir, nerede kalınır, nasıl ulaşılır ve ne yapılır — Bodrum tatilinizi tek sayfada planlayın.",
    intro: [
      "Bodrum tatili için kısa cevap: yaz aylarında (Haziran–Eylül) deniz ve gece hayatı en hareketli dönemini yaşar; daha sakin ve uygun bir tatil için Mayıs ile Haziran başı ya da Eylül sonu ile Ekim idealdir. Aileler için sakin koylar ve sığ plajlar, çiftler için manzaralı kasabalar, arkadaş grupları için canlı merkezler bir arada bulunur.",
      "Bu rehber, Bodrum yarımadasını gezginin gözünden derler: hangi bölge kime uygun, ne zaman gelmeli, havalimanından nasıl ulaşılır, nerede konaklanır, hangi aktiviteler yapılır, hangi plajlar öne çıkar ve yeme-içme nasıldır. Her başlığın altında, ilgili ayrıntılı sayfalarımıza bağlantı bulacaksınız; böylece genelden özele kolayca inebilirsiniz.",
    ],
    sections: [
      {
        id: "bolgeler",
        heading: "Bölgeler: Bodrum'un hangi köşesi size uygun?",
        body: [
          "Bodrum yarımadası, her biri kendi karakterine sahip kasaba ve koylardan oluşur. Merkeze yakın, hareketli bir tatil isteyenler için Gümbet; sakin aile tatili arayanlar için Bitez ve Ortakent; yürüyüş mesafesinde marina ve şık bir atmosfer isteyenler için Yalıkavak öne çıkar.",
          "Gün batımı ve balıkçı kasabası havası için Turgutreis, doğa ile iç içe huzurlu koylar için Gündoğan ve Torba tercih edilir. Hangi bölgede konaklarsanız konaklayın, yarımadanın diğer noktalarına araçla kısa sürede ulaşabilirsiniz.",
        ],
      },
      {
        id: "ne-zaman",
        heading: "Ne zaman gidilir? Sezonlar ve hava",
        body: [
          "Yüksek sezon Haziran sonu ile Ağustos arasıdır: deniz sıcaktır, her şey açıktır ama kalabalık ve fiyatlar da en yüksek seviyededir. Aileler ve sakin tatil sevenler için Mayıs, Haziran başı ve Eylül en dengeli dönemlerdir — hava sıcak, deniz yüzülebilir, ortam daha rahattır.",
          "Ekim'de yüzme sezonu yavaşça kapanır ama yürüyüş, gezi ve gastronomi için hava hâlâ çok keyiflidir. Kış aylarında yarımada sakinleşir; sakin, düşük sezon bir kaçamak isteyenler için bu dönem de kendine özgü bir cazibe taşır.",
        ],
      },
      {
        id: "nasil-gidilir",
        heading: "Nasıl gidilir? Ulaşım ve transfer",
        body: [
          "Bodrum'a en pratik ulaşım Milas-Bodrum Havalimanı üzerinden olur. Havalimanı, merkeze ve çevre kasabalara yaklaşık 30–50 dakika uzaklıktadır. Bavullu ve çocuklu aileler için en konforlu seçenek, kapıdan kapıya özel transferdir.",
          "Yarımada içinde gezmek isteyenler için araç kiralamak özgürlük sağlar; koyları, pazarları ve gün batımı noktalarını kendi temponuzda keşfedebilirsiniz. Tek seferlik gidiş-dönüşler içinse özel transfer çoğu aile için en pratik çözümdür.",
        ],
      },
      {
        id: "konaklama",
        heading: "Konaklama: apart mı, otel mi?",
        body: [
          "Ailecek ya da uzun süreli tatillerde apart konaklama; mutfak, ayrı odalar ve ev konforu sayesinde hem rahat hem de bütçe dostudur. Kahvaltıyı kendiniz hazırlayabilir, çocukların düzenini koruyabilir, kendinizi evinizde gibi hissedebilirsiniz.",
          "Doğrudan mülk sahipleriyle çalıştığımız apart seçeneklerini, tarih ve kişi sayınıza göre sizin için derliyoruz. Hangi bölgenin size uygun olduğunu birlikte değerlendirip uygun konaklamayı bulmanıza yardımcı oluyoruz.",
        ],
      },
      {
        id: "aktiviteler",
        heading: "Aktiviteler: tekne turları ve geziler",
        body: [
          "Bodrum denince akla ilk gelen aktivite tekne turlarıdır. Günlük teknelerle koy koy gezebilir, mavi yolculuk rotalarında birkaç gün denizde kalabilir ya da kalabalıktan uzak özel bir tekneyle kendi programınızı oluşturabilirsiniz.",
          "Karada ise antik kalıntılar, dağ köyleri, pazarlar ve doğa rotaları sizi bekler. Çocuklu aileler için sakin koylarda yüzme, kano ve hafif yürüyüşler; meraklılar için tarihî gezi turları güzel seçeneklerdir.",
        ],
      },
      {
        id: "plajlar",
        heading: "Plajlar: koylar ve mavi bayraklılar",
        body: [
          "Yarımada boyunca sığ ve çocuk dostu plajlardan, derin ve berrak koylara kadar geniş bir yelpaze bulunur. Bitez ve Ortakent uzun, sığ kumsallarıyla aileler için idealdir; Yalıkavak ve Gündoğan daha şık plaj kulüpleri ve berrak suyuyla öne çıkar.",
          "Gizli koylara çoğu zaman tekneyle ulaşmak en keyiflisidir. Plajda gün geçirmeden önce rüzgâr ve kalabalık durumunu sormakta fayda var; sabah erken saatler hem daha sakin hem de daha serin olur.",
        ],
      },
      {
        id: "yeme-icme",
        heading: "Yeme-içme: balık, meze ve yerel lezzetler",
        body: [
          "Ege mutfağı Bodrum tatilinin en güzel yanlarından biridir: taze otlar, zeytinyağlılar, deniz mahsulleri ve mevsim sebzeleri sofraları doldurur. Balıkçı kasabalarında akşamüstü meze tabağı eşliğinde gün batımını izlemek küçük bir ritüele dönüşür.",
          "Pazarlar, yerel lezzetleri ve taze ürünleri keşfetmenin en iyi yoludur. Konakladığınız apartta basit bir kahvaltı hazırlamak isterseniz, sabah pazarından alacağınız peynir, zeytin ve meyveyle Ege'nin tadını eve taşıyabilirsiniz.",
        ],
      },
    ],
    faqTitle: "Bodrum tatili hakkında sıkça sorulanlar",
    relatedTitle: "Bu bölümle ilgili sayfalar",
    ctaHeading: "Bodrum tatilinizi birlikte planlayalım",
    ctaBody:
      "Tarihinizi, kişi sayınızı ve tercih ettiğiniz bölgeyi yazın; size uygun apart seçeneklerini ve gerekirse transfer, araç ya da tekne planını birlikte oluşturalım.",
    ctaWhatsApp: "WhatsApp'tan yazın",
    ctaWaText:
      "Merhaba, Bodrum tatili planlıyorum. Tarih ve kişi sayımı paylaşayım, uygun seçenekleri öğrenebilir miyim?",
    ctaSecondary: "Apartları görün",
    tocTitle: "Bu rehberde",
  },

  // ─────────────────────────────────────────────────────────────────────────
  en: {
    badge: "Bodrum 2026",
    h1: "Bodrum Travel Guide",
    sub: "When to go, where to stay, how to get there and what to do — plan your whole Bodrum holiday on one page.",
    intro: [
      "The short answer for a Bodrum holiday: summer (June–September) brings the liveliest sea and nightlife, while a calmer, better-value trip is best in May to early June or late September into October. The peninsula mixes quiet coves and shallow beaches for families, scenic towns for couples and lively centres for groups.",
      "This guide walks the Bodrum peninsula from a traveller's point of view: which area suits whom, when to come, how to arrive from the airport, where to stay, what to do, which beaches stand out and how to eat well. Under each heading you'll find links to our detailed pages, so you can go from the big picture to the specifics with ease.",
    ],
    sections: [
      {
        id: "bolgeler",
        heading: "Areas: which corner of Bodrum suits you?",
        body: [
          "The Bodrum peninsula is a string of towns and bays, each with its own character. Gümbet is close to the centre and lively; Bitez and Ortakent are calm and family-friendly; Yalıkavak offers a marina within walking distance and an elegant atmosphere.",
          "For a fishing-town feel and famous sunsets, choose Turgutreis; for peaceful, nature-wrapped coves, Gündoğan and Torba are favourites. Wherever you base yourself, the rest of the peninsula is a short drive away.",
        ],
      },
      {
        id: "ne-zaman",
        heading: "When to go? Seasons and weather",
        body: [
          "High season runs from late June through August: the sea is warm and everything is open, but crowds and prices peak too. For families and those who prefer a calmer pace, May, early June and September are the most balanced months — warm weather, swimmable sea and a more relaxed mood.",
          "Swimming winds down in October, but the weather is still lovely for walks, sightseeing and food. In winter the peninsula quietens; for a low-season escape it carries its own gentle charm.",
        ],
      },
      {
        id: "nasil-gidilir",
        heading: "How to get there: travel and transfer",
        body: [
          "The easiest way to reach Bodrum is via Milas-Bodrum Airport, roughly 30–50 minutes from the centre and surrounding towns. For families with luggage and children, a door-to-door private transfer is the most comfortable choice.",
          "If you'd like to roam the peninsula, renting a car gives you freedom to discover coves, markets and sunset spots at your own pace. For one-off airport runs, a private transfer is the simplest solution for most families.",
        ],
      },
      {
        id: "konaklama",
        heading: "Accommodation: apartment or hotel?",
        body: [
          "For family or longer stays, an apartment is both comfortable and budget-friendly thanks to a kitchen, separate rooms and a homely feel. You can make your own breakfast, keep the children's routine and feel at home.",
          "We curate apartment options from owners we work with directly, matched to your dates and group size. We're happy to help you weigh up which area suits you and find the right place to stay.",
        ],
      },
      {
        id: "aktiviteler",
        heading: "Activities: boat tours and excursions",
        body: [
          "Boat tours are the first activity that comes to mind in Bodrum. Hop between coves on a daily boat, spend a few days at sea on a blue-cruise route, or build your own itinerary on a private boat away from the crowds.",
          "On land, ancient ruins, mountain villages, markets and nature trails await. For families, swimming in calm coves, kayaking and gentle walks are great; for the curious, historical tours are a treat.",
        ],
      },
      {
        id: "plajlar",
        heading: "Beaches: coves and Blue Flag favourites",
        body: [
          "Along the peninsula you'll find everything from shallow, child-friendly beaches to deep, crystal-clear coves. Bitez and Ortakent, with their long shallow shores, are ideal for families; Yalıkavak and Gündoğan stand out for smarter beach clubs and clear water.",
          "Hidden coves are often best reached by boat. Before spending a day at the beach, it's worth asking about wind and crowds; early mornings are both calmer and cooler.",
        ],
      },
      {
        id: "yeme-icme",
        heading: "Food & drink: fish, meze and local flavours",
        body: [
          "Aegean cuisine is one of the joys of a Bodrum holiday: fresh herbs, olive-oil dishes, seafood and seasonal vegetables fill the table. In the fishing towns, watching the sunset over a plate of meze becomes a small ritual.",
          "Markets are the best way to discover local flavours and fresh produce. If you'd like a simple breakfast at your apartment, the morning market's cheese, olives and fruit bring the taste of the Aegean right to your table.",
        ],
      },
    ],
    faqTitle: "Bodrum holiday — frequently asked questions",
    relatedTitle: "Related pages for this section",
    ctaHeading: "Let's plan your Bodrum holiday together",
    ctaBody:
      "Send us your dates, group size and preferred area, and we'll put together suitable apartment options — plus transfer, car or boat plans if you need them.",
    ctaWhatsApp: "Message us on WhatsApp",
    ctaWaText:
      "Hello, I'm planning a Bodrum holiday. May I share my dates and group size to see suitable options?",
    ctaSecondary: "Browse apartments",
    tocTitle: "In this guide",
  },

  // ─────────────────────────────────────────────────────────────────────────
  de: {
    badge: "Bodrum 2026",
    h1: "Bodrum Reiseführer",
    sub: "Wann hinfahren, wo wohnen, wie anreisen und was unternehmen — planen Sie Ihren ganzen Bodrum-Urlaub auf einer Seite.",
    intro: [
      "Die kurze Antwort für einen Bodrum-Urlaub: Der Sommer (Juni–September) bringt das lebhafteste Meer und Nachtleben, während ein ruhigerer und günstigerer Urlaub von Mai bis Anfang Juni oder von Ende September bis Oktober am besten ist. Die Halbinsel vereint ruhige Buchten und flache Strände für Familien, malerische Städtchen für Paare und lebendige Zentren für Gruppen.",
      "Dieser Reiseführer zeigt die Halbinsel Bodrum aus der Sicht von Reisenden: Welche Region passt zu wem, wann man kommen sollte, wie man vom Flughafen anreist, wo man wohnt, was man unternimmt, welche Strände herausragen und wie man gut isst. Unter jeder Überschrift finden Sie Links zu unseren ausführlichen Seiten, sodass Sie mühelos vom Überblick ins Detail gelangen.",
    ],
    sections: [
      {
        id: "bolgeler",
        heading: "Regionen: Welche Ecke von Bodrum passt zu Ihnen?",
        body: [
          "Die Halbinsel Bodrum ist eine Reihe von Städtchen und Buchten mit jeweils eigenem Charakter. Gümbet liegt zentrumsnah und lebhaft; Bitez und Ortakent sind ruhig und familienfreundlich; Yalıkavak bietet einen Yachthafen in Gehweite und eine elegante Atmosphäre.",
          "Für Fischerdorf-Flair und berühmte Sonnenuntergänge wählen Sie Turgutreis; für friedliche, naturnahe Buchten sind Gündoğan und Torba beliebt. Wo immer Sie auch wohnen, der Rest der Halbinsel ist eine kurze Autofahrt entfernt.",
        ],
      },
      {
        id: "ne-zaman",
        heading: "Wann hinfahren? Jahreszeiten und Wetter",
        body: [
          "Die Hauptsaison reicht von Ende Juni bis August: Das Meer ist warm und alles hat geöffnet, doch auch Andrang und Preise erreichen ihren Höhepunkt. Für Familien und alle, die es ruhiger mögen, sind Mai, Anfang Juni und September am ausgewogensten — warmes Wetter, badetaugliches Meer und eine entspanntere Stimmung.",
          "Im Oktober klingt die Badesaison aus, doch das Wetter ist weiterhin herrlich für Spaziergänge, Ausflüge und Genuss. Im Winter wird die Halbinsel ruhig; für eine Auszeit in der Nebensaison hat das seinen eigenen sanften Reiz.",
        ],
      },
      {
        id: "nasil-gidilir",
        heading: "Anreise: Transport und Transfer",
        body: [
          "Am einfachsten erreichen Sie Bodrum über den Flughafen Milas-Bodrum, etwa 30–50 Minuten vom Zentrum und den umliegenden Orten entfernt. Für Familien mit Gepäck und Kindern ist ein Tür-zu-Tür-Privattransfer die komfortabelste Wahl.",
          "Wer die Halbinsel erkunden möchte, gewinnt mit einem Mietwagen die Freiheit, Buchten, Märkte und Sonnenuntergangsplätze im eigenen Tempo zu entdecken. Für einzelne Flughafenfahrten ist ein Privattransfer für die meisten Familien die einfachste Lösung.",
        ],
      },
      {
        id: "konaklama",
        heading: "Unterkunft: Ferienwohnung oder Hotel?",
        body: [
          "Bei Familien- oder längeren Aufenthalten ist eine Ferienwohnung dank Küche, getrennten Zimmern und heimeligem Gefühl zugleich komfortabel und budgetfreundlich. Sie können selbst frühstücken, den Rhythmus der Kinder bewahren und sich wie zu Hause fühlen.",
          "Wir stellen Ihnen Apartment-Optionen von Eigentümern zusammen, mit denen wir direkt arbeiten — passend zu Ihren Terminen und Ihrer Personenzahl. Gern helfen wir Ihnen abzuwägen, welche Region zu Ihnen passt, und die richtige Unterkunft zu finden.",
        ],
      },
      {
        id: "aktiviteler",
        heading: "Aktivitäten: Bootstouren und Ausflüge",
        body: [
          "Bootstouren sind die erste Aktivität, die einem in Bodrum in den Sinn kommt. Mit einem Tagesboot von Bucht zu Bucht fahren, auf einer Blaue-Reise-Route ein paar Tage auf See verbringen oder mit einem privaten Boot abseits des Trubels Ihr eigenes Programm gestalten.",
          "An Land warten antike Ruinen, Bergdörfer, Märkte und Naturwege. Für Familien sind Schwimmen in ruhigen Buchten, Kajakfahren und leichte Wanderungen ideal; für Neugierige sind historische Touren ein Genuss.",
        ],
      },
      {
        id: "plajlar",
        heading: "Strände: Buchten und Blaue-Flagge-Favoriten",
        body: [
          "Entlang der Halbinsel finden Sie alles von flachen, kinderfreundlichen Stränden bis zu tiefen, kristallklaren Buchten. Bitez und Ortakent mit ihren langen, flachen Ufern sind ideal für Familien; Yalıkavak und Gündoğan überzeugen mit gehobeneren Beachclubs und klarem Wasser.",
          "Versteckte Buchten erreicht man oft am besten per Boot. Bevor Sie einen Tag am Strand verbringen, lohnt es sich, nach Wind und Andrang zu fragen; die frühen Morgenstunden sind ruhiger und kühler.",
        ],
      },
      {
        id: "yeme-icme",
        heading: "Essen & Trinken: Fisch, Meze und lokale Spezialitäten",
        body: [
          "Die ägäische Küche ist eine der schönsten Seiten eines Bodrum-Urlaubs: frische Kräuter, Gerichte in Olivenöl, Meeresfrüchte und Gemüse der Saison füllen den Tisch. In den Fischerorten wird der Sonnenuntergang bei einer Meze-Platte zu einem kleinen Ritual.",
          "Märkte sind der beste Weg, lokale Spezialitäten und frische Erzeugnisse zu entdecken. Möchten Sie ein einfaches Frühstück in Ihrer Ferienwohnung, bringen Käse, Oliven und Obst vom Morgenmarkt den Geschmack der Ägäis direkt auf Ihren Tisch.",
        ],
      },
    ],
    faqTitle: "Bodrum-Urlaub — häufig gestellte Fragen",
    relatedTitle: "Verwandte Seiten zu diesem Abschnitt",
    ctaHeading: "Planen wir Ihren Bodrum-Urlaub gemeinsam",
    ctaBody:
      "Senden Sie uns Ihre Termine, Personenzahl und Wunschregion, und wir stellen passende Apartment-Optionen zusammen — bei Bedarf samt Transfer-, Miet- oder Bootsplan.",
    ctaWhatsApp: "Per WhatsApp schreiben",
    ctaWaText:
      "Hallo, ich plane einen Bodrum-Urlaub. Darf ich meine Termine und Personenzahl mitteilen, um passende Optionen zu erfahren?",
    ctaSecondary: "Apartments ansehen",
    tocTitle: "In diesem Reiseführer",
  },

  // ─────────────────────────────────────────────────────────────────────────
  ru: {
    badge: "Бодрум 2026",
    h1: "Путеводитель по Бодруму",
    sub: "Когда ехать, где остановиться, как добраться и что делать — спланируйте весь отдых в Бодруме на одной странице.",
    intro: [
      "Короткий ответ для отдыха в Бодруме: летом (июнь–сентябрь) море и ночная жизнь самые оживлённые, а для более спокойной и выгодной поездки лучше всего подходят май — начало июня или конец сентября — октябрь. На полуострове есть и тихие бухты с мелкими пляжами для семей, и живописные городки для пар, и оживлённые центры для компаний.",
      "Этот путеводитель показывает полуостров Бодрум глазами путешественника: какой район кому подойдёт, когда приезжать, как добраться из аэропорта, где остановиться, чем заняться, какие пляжи выделяются и как вкусно поесть. Под каждым разделом вы найдёте ссылки на наши подробные страницы, чтобы легко переходить от общего к частному.",
    ],
    sections: [
      {
        id: "bolgeler",
        heading: "Районы: какой уголок Бодрума вам подойдёт?",
        body: [
          "Полуостров Бодрум — это череда городков и бухт, и у каждого свой характер. Гюмбет расположен близко к центру и оживлён; Битез и Ортакент спокойны и удобны для семей; Ялыкавак предлагает марину в пешей доступности и элегантную атмосферу.",
          "Для атмосферы рыбацкого городка и знаменитых закатов выбирайте Тургутрейс; для тихих бухт в окружении природы любимы Гюндоган и Торба. Где бы вы ни остановились, до остального полуострова — короткая поездка на машине.",
        ],
      },
      {
        id: "ne-zaman",
        heading: "Когда ехать? Сезоны и погода",
        body: [
          "Высокий сезон длится с конца июня по август: море тёплое и всё открыто, но и наплыв людей, и цены на пике. Для семей и тех, кто предпочитает спокойный ритм, май, начало июня и сентябрь — самые сбалансированные месяцы: тёплая погода, пригодное для купания море и более расслабленная атмосфера.",
          "В октябре купальный сезон затихает, но погода всё ещё прекрасна для прогулок, экскурсий и гастрономии. Зимой полуостров затихает; для отдыха в низкий сезон у этого времени своё мягкое очарование.",
        ],
      },
      {
        id: "nasil-gidilir",
        heading: "Как добраться: транспорт и трансфер",
        body: [
          "Проще всего добраться до Бодрума через аэропорт Милас-Бодрум — примерно в 30–50 минутах от центра и окрестных городков. Для семей с багажом и детьми самый комфортный вариант — индивидуальный трансфер «от двери до двери».",
          "Если хотите объехать полуостров, аренда автомобиля даёт свободу открывать бухты, рынки и точки заката в своём темпе. Для разовых поездок в аэропорт индивидуальный трансфер — самое простое решение для большинства семей.",
        ],
      },
      {
        id: "konaklama",
        heading: "Проживание: апартаменты или отель?",
        body: [
          "Для семейного или длительного отдыха апартаменты и комфортны, и экономичны — благодаря кухне, отдельным комнатам и домашней атмосфере. Можно готовить завтрак самим, сохранять режим детей и чувствовать себя как дома.",
          "Мы подбираем варианты апартаментов от владельцев, с которыми работаем напрямую, под ваши даты и число гостей. С радостью поможем взвесить, какой район вам подойдёт, и найти подходящее жильё.",
        ],
      },
      {
        id: "aktiviteler",
        heading: "Активности: морские прогулки и экскурсии",
        body: [
          "Морские прогулки — первое, что приходит на ум в Бодруме. Можно переходить от бухты к бухте на дневном катере, провести несколько дней в море на маршруте «голубого круиза» или составить собственную программу на частной лодке вдали от толпы.",
          "На суше вас ждут античные руины, горные деревни, рынки и природные тропы. Для семей отлично подходят купание в спокойных бухтах, каякинг и лёгкие прогулки; для любознательных — исторические туры.",
        ],
      },
      {
        id: "plajlar",
        heading: "Пляжи: бухты и обладатели «Голубого флага»",
        body: [
          "Вдоль полуострова найдётся всё — от мелких, удобных для детей пляжей до глубоких и кристально чистых бухт. Битез и Ортакент с их длинными мелкими берегами идеальны для семей; Ялыкавак и Гюндоган выделяются более изысканными пляжными клубами и прозрачной водой.",
          "До скрытых бухт чаще всего приятнее всего добираться на лодке. Прежде чем провести день на пляже, стоит уточнить про ветер и наплыв людей; ранним утром и спокойнее, и прохладнее.",
        ],
      },
      {
        id: "yeme-icme",
        heading: "Еда и напитки: рыба, мезе и местные вкусы",
        body: [
          "Эгейская кухня — одна из лучших сторон отдыха в Бодруме: свежие травы, блюда на оливковом масле, морепродукты и сезонные овощи наполняют стол. В рыбацких городках встречать закат за тарелкой мезе становится маленьким ритуалом.",
          "Рынки — лучший способ открыть для себя местные вкусы и свежие продукты. Если хотите простой завтрак в апартаментах, сыр, оливки и фрукты с утреннего рынка принесут вкус Эгейского моря прямо к вашему столу.",
        ],
      },
    ],
    faqTitle: "Отдых в Бодруме — частые вопросы",
    relatedTitle: "Связанные страницы по этому разделу",
    ctaHeading: "Спланируем ваш отдых в Бодруме вместе",
    ctaBody:
      "Напишите нам даты, число гостей и предпочитаемый район — и мы подберём подходящие варианты апартаментов, а при необходимости и план трансфера, аренды авто или лодки.",
    ctaWhatsApp: "Написать в WhatsApp",
    ctaWaText:
      "Здравствуйте, я планирую отдых в Бодруме. Можно поделиться датами и числом гостей, чтобы узнать подходящие варианты?",
    ctaSecondary: "Смотреть апартаменты",
    tocTitle: "В этом путеводителе",
  },
};

// ── FAQ (FAQPage JSON-LD + on-page accordion) ──────────────────────────────
export const GUIDE_FAQ: Record<Locale, { q: string; a: string }[]> = {
  tr: [
    {
      q: "Bodrum'a en iyi gidiş zamanı ne zaman?",
      a: "Deniz ve gece hayatı için Haziran–Eylül arası en hareketli dönemdir. Aileler ve sakin tatil sevenler için Mayıs, Haziran başı ve Eylül sonu daha dengelidir: hava sıcak, deniz yüzülebilir, ortam daha rahattır.",
    },
    {
      q: "Bodrum'da hangi bölge aileler için en uygun?",
      a: "Sığ ve uzun kumsallarıyla Bitez ve Ortakent çocuklu aileler için idealdir. Merkeze yakın hareketli bir tatil için Gümbet, daha şık ve sakin bir ortam için Yalıkavak ve Gündoğan tercih edilebilir.",
    },
    {
      q: "Havalimanından konakladığım yere nasıl giderim?",
      a: "Milas-Bodrum Havalimanı merkeze ve çevre kasabalara ortalama 30–50 dakika uzaklıktadır. Bavullu ve çocuklu aileler için en konforlu seçenek kapıdan kapıya özel transferdir; yarımadayı keşfetmek isteyenler araç da kiralayabilir.",
    },
    {
      q: "Bodrum'da apart mı yoksa otel mi daha mantıklı?",
      a: "Ailecek ya da uzun konaklamalarda apart; mutfak, ayrı odalar ve ev konforu sayesinde hem rahat hem bütçe dostudur. Tarih ve kişi sayınızı paylaşırsanız size uygun apart seçeneklerini birlikte değerlendirebiliriz.",
    },
    {
      q: "Bodrum'da neler yapılır?",
      a: "Günlük tekne turları ve mavi yolculuk en sevilen aktivitelerdir. Bunun yanında plajlar, antik kalıntılar, pazarlar, doğa yürüyüşleri ve Ege mutfağı tatilinizi zenginleştirir.",
    },
  ],
  en: [
    {
      q: "When is the best time to visit Bodrum?",
      a: "For the sea and nightlife, June–September is the liveliest period. For families and those who prefer a calmer pace, May, early June and late September are more balanced: warm weather, swimmable sea and a more relaxed mood.",
    },
    {
      q: "Which area of Bodrum is best for families?",
      a: "With their long, shallow shores, Bitez and Ortakent are ideal for families with children. For a lively stay close to the centre choose Gümbet, and for a smarter, calmer setting Yalıkavak and Gündoğan are good options.",
    },
    {
      q: "How do I get from the airport to my accommodation?",
      a: "Milas-Bodrum Airport is on average 30–50 minutes from the centre and surrounding towns. For families with luggage and children, a door-to-door private transfer is the most comfortable choice; if you want to explore the peninsula you can also rent a car.",
    },
    {
      q: "Is an apartment or a hotel the better choice in Bodrum?",
      a: "For family or longer stays, an apartment is both comfortable and budget-friendly thanks to a kitchen, separate rooms and a homely feel. Share your dates and group size and we'll weigh up suitable apartment options together.",
    },
    {
      q: "What is there to do in Bodrum?",
      a: "Daily boat tours and blue-cruise trips are the most popular activities. Beyond that, beaches, ancient ruins, markets, nature walks and Aegean cuisine all enrich your holiday.",
    },
  ],
  de: [
    {
      q: "Wann ist die beste Reisezeit für Bodrum?",
      a: "Für Meer und Nachtleben ist Juni–September die lebhafteste Zeit. Für Familien und alle, die es ruhiger mögen, sind Mai, Anfang Juni und Ende September ausgewogener: warmes Wetter, badetaugliches Meer und eine entspanntere Stimmung.",
    },
    {
      q: "Welche Region in Bodrum ist am besten für Familien?",
      a: "Mit ihren langen, flachen Ufern sind Bitez und Ortakent ideal für Familien mit Kindern. Für einen lebhaften Aufenthalt nahe dem Zentrum wählen Sie Gümbet, für ein gehobeneres, ruhigeres Umfeld sind Yalıkavak und Gündoğan gute Optionen.",
    },
    {
      q: "Wie komme ich vom Flughafen zu meiner Unterkunft?",
      a: "Der Flughafen Milas-Bodrum ist im Schnitt 30–50 Minuten vom Zentrum und den umliegenden Orten entfernt. Für Familien mit Gepäck und Kindern ist ein Tür-zu-Tür-Privattransfer die komfortabelste Wahl; wer die Halbinsel erkunden möchte, kann auch einen Mietwagen nehmen.",
    },
    {
      q: "Ist in Bodrum eine Ferienwohnung oder ein Hotel die bessere Wahl?",
      a: "Bei Familien- oder längeren Aufenthalten ist eine Ferienwohnung dank Küche, getrennten Zimmern und heimeligem Gefühl zugleich komfortabel und budgetfreundlich. Teilen Sie uns Ihre Termine und Personenzahl mit, und wir wägen gemeinsam passende Apartment-Optionen ab.",
    },
    {
      q: "Was kann man in Bodrum unternehmen?",
      a: "Tagesbootstouren und Blaue-Reise-Fahrten sind die beliebtesten Aktivitäten. Darüber hinaus bereichern Strände, antike Ruinen, Märkte, Naturwanderungen und die ägäische Küche Ihren Urlaub.",
    },
  ],
  ru: [
    {
      q: "Когда лучше всего ехать в Бодрум?",
      a: "Для моря и ночной жизни самый оживлённый период — июнь–сентябрь. Для семей и тех, кто предпочитает спокойный ритм, май, начало июня и конец сентября более сбалансированы: тёплая погода, пригодное для купания море и более расслабленная атмосфера.",
    },
    {
      q: "Какой район Бодрума лучше всего подходит для семей?",
      a: "Благодаря длинным мелким берегам Битез и Ортакент идеальны для семей с детьми. Для оживлённого отдыха рядом с центром выбирайте Гюмбет, а для более изысканной и спокойной обстановки хороши Ялыкавак и Гюндоган.",
    },
    {
      q: "Как добраться из аэропорта до места проживания?",
      a: "Аэропорт Милас-Бодрум в среднем в 30–50 минутах от центра и окрестных городков. Для семей с багажом и детьми самый комфортный вариант — индивидуальный трансфер «от двери до двери»; если хотите исследовать полуостров, можно также арендовать автомобиль.",
    },
    {
      q: "Что выбрать в Бодруме — апартаменты или отель?",
      a: "Для семейного или длительного отдыха апартаменты и комфортны, и экономичны — благодаря кухне, отдельным комнатам и домашней атмосфере. Напишите ваши даты и число гостей — и мы вместе подберём подходящие варианты апартаментов.",
    },
    {
      q: "Чем заняться в Бодруме?",
      a: "Самые популярные активности — дневные морские прогулки и «голубой круиз». Кроме того, отдых обогатят пляжи, античные руины, рынки, прогулки на природе и эгейская кухня.",
    },
  ],
};
