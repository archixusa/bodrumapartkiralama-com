import { notFound } from "next/navigation";

// Launch öncesi: tek apart detay sayfaları kapatıldı.
// Apart kataloğu hazırlanmadığı için her slug isteği 404 döner;
// /apartlar listeleme sayfası "Yakında" durumunu sergiler.
// Gerçek mülk verileri eklendiğinde bu dosya zengin detay sayfası olarak yeniden yazılacak
// (orijinal versiyon git geçmişinde mevcuttur).

export const dynamic = "force-static";

export default function ApartDetailPlaceholder() {
  notFound();
}
