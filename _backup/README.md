# _backup — Demo Veri Arşivi

Bu klasör, **launch öncesi temizlik** sırasında yedeklenen orijinal demo içerikleri barındırır. Üretim build'ine dahil değildir, sadece referans/arşiv amaçlıdır.

## Klasör İçeriği

### `original-images/`
Apart-spesifik orijinal görseller. (Şu anki demo görseller Unsplash CDN üzerinden harici URL olarak kullanıldığı için `public/` altında lokalize edilmiş apart-spesifik dosya **yoktu**; bu klasör boş bırakıldı. Gerçek mülk fotoğrafları eklendikçe **buraya değil**, doğrudan `public/` veya uzak CDN'e konacak.)

### `original-source/`
Demo dönemine ait kaynak veri dosyalarının yedekleri:
- `apartments.ts.bak` — Launch öncesi temizlikte boşaltılan 8 demo apart verisi (cleanup PR'da `src/data/apartments.ts` boş diziye dönüştürüldü). İç yapı/type tanımları korundu; sadece veri kaldırıldı.

## Kurallar

- **Bu klasör asla `public/` veya kaynak koduna geri taşınmaz.** Gerçek mülk fotoğrafları geldiğinde doğrudan `public/properties/` (veya uzak CDN) altına eklenir.
- Bu klasör silinmez. Tarihsel referans olarak kalır.
- `.gitignore`'a dahil **değildir** — commit edilir, public repo'da yer alır (içerik fotoğrafı yoktur, sadece kaynak veri yedeği).
