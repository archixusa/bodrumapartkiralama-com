export interface GuestReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  source: "Booking" | "Google" | "Airbnb";
  textTr: string;
  textEn: string;
  district: string;
}

export const reviews: GuestReview[] = [
  {
    id: "rv-1",
    author: "Elif K.",
    city: "İstanbul",
    rating: 5,
    source: "Booking",
    textTr:
      "Form gönderdikten yarım saatte aradılar. Gümbet'te tuttuğumuz apart aynen fotoğraflardaki gibiydi, havuz tertemiz, ev sahibi ekip çok ilgili.",
    textEn:
      "They called me within half an hour of submitting the form. The Gümbet apartment was exactly as in the photos, the pool was spotless and the team was very attentive.",
    district: "Gümbet",
  },
  {
    id: "rv-2",
    author: "Mehmet A.",
    city: "Ankara",
    rating: 5,
    source: "Google",
    textTr:
      "Turgutreis'te sahil cephesi 2+1 daireyi ailecek aldık. Hem fiyat hem konum mükemmel, havalimanı transferini de halletmeleri büyük kolaylık oldu.",
    textEn:
      "We rented a seafront 2+1 in Turgutreis with the family. Both the price and location were perfect, and arranging the airport transfer was a huge plus.",
    district: "Turgutreis",
  },
  {
    id: "rv-3",
    author: "Sarah M.",
    city: "London, UK",
    rating: 5,
    source: "Airbnb",
    textTr:
      "Yalıkavak'taki apart sosyal medyada gördüğümden bile güzel çıktı. Marinaya yürümek 5 dakika, terastan deniz manzarası bayıldık. Tekrar geleceğiz.",
    textEn:
      "The Yalıkavak apartment was even better than on social media. 5-min walk to marina, terrace sea view we adored. Will come back.",
    district: "Yalıkavak",
  },
  {
    id: "rv-4",
    author: "Ayşe T.",
    city: "İzmir",
    rating: 5,
    source: "Booking",
    textTr:
      "Bitez'deki bahçeli ev çocuklar için cennetti. Bebek beşiği ve mangalı temin etmeleri büyük kolaylık. Sahile yürüyerek 10 dakika.",
    textEn:
      "The garden home in Bitez was paradise for the kids. Providing a baby crib and BBQ made things so easy. 10-min walk to the beach.",
    district: "Bitez",
  },
  {
    id: "rv-5",
    author: "Markus W.",
    city: "Berlin, DE",
    rating: 5,
    source: "Google",
    textTr:
      "Türkçem yok, hepsi İngilizce iletişim kurdu. Transferden anahtara, marketten restorana her konuda yardımcı oldular.",
    textEn:
      "My Turkish is non-existent — everything happened in English, from transfer to keys, supermarket to restaurants. Top support.",
    district: "Turgutreis",
  },
  {
    id: "rv-6",
    author: "Burak Y.",
    city: "Eskişehir",
    rating: 4,
    source: "Booking",
    textTr:
      "Ortakent Yahşi plajına 100 metre olan apart fiyat/performans en iyisiydi. Havuz biraz küçük olsa da sahil zaten 2 dakikada.",
    textEn:
      "The Ortakent apartment 100m from Yahşi beach was the best value. Pool is a bit small but the beach is 2 minutes away anyway.",
    district: "Ortakent",
  },
];
