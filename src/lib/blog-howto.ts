// =========================================================================
// HowTo JSON-LD for the two step-based blog posts.
//
// schema.org/HowTo for AEO: search engines and AI assistants surface HowTo
// steps as rich results / answer cards. Steps are derived from the actual H2
// structure of each Turkish MDX article (the article body is always Turkish,
// so the steps are Turkish regardless of site locale).
//
// Keyed by slug. A post not present here gets no HowTo schema.
// =========================================================================

interface HowToStep {
  name: string;
  text: string;
}

interface HowToDef {
  name: string;
  description: string;
  steps: HowToStep[];
}

const HOWTO_BY_SLUG: Record<string, HowToDef> = {
  // 10 numbered H2 steps from the article.
  "bodrum-apart-kiralarken-dikkat-edilmesi-gerekenler": {
    name: "Bodrum'da Apart Kiralarken Dikkat Edilmesi Gerekenler",
    description:
      "Bodrum'da apart kiralarken konum, sözleşme, depozito ve teslim aşamalarında dikkat edilmesi gereken 10 adımlık pratik kontrol listesi.",
    steps: [
      {
        name: "Önce Bölgeyi, Sonra Apartı Seçin",
        text: "Önce nasıl bir tatil istediğinize karar verin, sonra o tarza uyan bölgede apart arayın. Sakin aile tatili için Gündoğan, Ortakent ve Bitez; hareketli atmosfer için Gümbet; marina ve butik kafeler için Yalıkavak öne çıkar.",
      },
      {
        name: "Denize ve Markete Mesafeyi Net Öğrenin",
        text: "İlanlardaki 'denize yakın' ifadesi göreceli olabilir; yürüyerek kaç dakika sürdüğünü net sorun. En yakın market, eczane ve fırının mesafesini de öğrenin.",
      },
      {
        name: "Mülk Sahibiyle Doğrudan ve Şeffaf İletişim Kurun",
        text: "Sorularınıza hızlı ve net cevap veren bir muhatap güvenin ilk işaretidir. Giriş-çıkış saatleri, anahtar teslimi, donanım ve olası ek ücretler konusunda baştan netlik isteyin.",
      },
      {
        name: "Fotoğrafların Güncel Olduğunu Doğrulayın",
        text: "İlandaki fotoğraflar eski olabilir. Apartın güncel halini görmek için ek fotoğraf ya da kısa bir görüntülü tur isteyin; özellikle mutfak, banyo ve balkonun bugünkü durumunu kontrol edin.",
      },
      {
        name: "Sözleşme ve Yazılı Mutabakat İsteyin",
        text: "Konaklama tarihleri, kişi sayısı, toplam tutar ve ödeme planı, depozito, iptal-iade koşulları ile kullanılabilecek olanakların yazılı olarak yer aldığı bir mutabakat isteyin.",
      },
      {
        name: "Depozito Şartlarını Baştan Netleştirin",
        text: "Depozito tutarını, hangi durumlarda kesinti yapılacağını ve ne zaman iade edileceğini önceden öğrenin. Girişte ve çıkışta apartın halini fotoğraflamak iade sürecini hızlandırır.",
      },
      {
        name: "Temizlik ve Teslim Durumunu Kontrol Edin",
        text: "Apart, girişte temiz ve sözleşmede belirtilen düzende teslim edilmelidir. Yatak takımı, havlu ve mutfak eşyalarının dahil olup olmadığını sorun; eksik veya arızayı ilk gün bildirin.",
      },
      {
        name: "Ulaşım ve Transferi Planlayın",
        text: "Bodrum Havalimanı bazı koylara araçla 45 dakikadan uzun sürebilir. Apartınıza nasıl ulaşacağınızı önceden planlayın; özel transfer veya araç kiralama seçeneklerini değerlendirin ve otopark durumunu sorun.",
      },
      {
        name: "Yorumları ve Güven Sinyallerini Okuyun",
        text: "Önceki misafirlerin yorumlarında tekrar eden temalara bakın: temizlik, iletişim hızı ve ilan bilgilerinin gerçeği yansıtması. Sorun çıktığında mülk sahibinin yaklaşımı da önemlidir.",
      },
      {
        name: "Sezon Farklarını Hesaba Katın",
        text: "Yaz sezonu en yoğun dönemdir ve iyi apartlar hızla dolar. Sakin bir tatil ve geniş seçenek istiyorsanız ilkbahar-sonbahara yönelin; yaz hedefliyorsanız erken davranıp rezervasyonu önceden netleştirin.",
      },
    ],
  },

  // 4 numbered transport-option H2 steps from the article.
  "bodrum-havalimanindan-merkeze-ulasim": {
    name: "Bodrum Havalimanı'ndan Merkeze ve Bölgelere Nasıl Gidilir?",
    description:
      "Bodrum Havalimanı'ndan merkeze ve tatil bölgelerine ulaşmanın dört yolu: özel transfer, HAVAŞ/otobüs, taksi ve kiralık araç.",
    steps: [
      {
        name: "Özel Transfer: Kapıdan Kapıya Konfor",
        text: "Uçuş saatinize göre önceden ayarlanan özel transfer sizi havalimanından doğrudan apartınızın kapısına götürür. Çocuklu aileler, geç saatte inenler ve uç bölgelere gidenler için en rahat seçenektir.",
      },
      {
        name: "HAVAŞ ve Otobüs: Ekonomik Seçenek",
        text: "HAVAŞ servisleri havalimanını Bodrum merkeze bağlar ve bütçeyi önceleyen, hafif bagajlı yolcular için uygundur. Genellikle merkeze bırakır; uç bölgelere aktarma gerekebilir, sefer saatlerini önceden kontrol edin.",
      },
      {
        name: "Taksi: Hızlı ama Bağımsız",
        text: "Havalimanı çıkışında taksi bulunabilir; aktarmasız gitmek isteyen küçük gruplar için pratiktir. Uzun mesafelerde süre uzar ve yoğun dönemde bekleme olabilir.",
      },
      {
        name: "Kiralık Araç: Tatil Boyunca Özgürlük",
        text: "Farklı koyları, plajları ve pazarları kendi programınızla gezmek istiyorsanız araç kiralama en özgür seçenektir. Apartınızın otoparkı olup olmadığını önceden sorun.",
      },
    ],
  },
};

/**
 * Build a schema.org HowTo JSON-LD object for a blog slug, or null if the post
 * is not a step-based HowTo. `mainEntityOfPage` anchors it to the article URL.
 */
export function buildHowToSchema(
  slug: string,
  pageUrl: string,
): Record<string, unknown> | null {
  const def = HOWTO_BY_SLUG[slug];
  if (!def) return null;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: def.name,
    description: def.description,
    mainEntityOfPage: pageUrl,
    step: def.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}
