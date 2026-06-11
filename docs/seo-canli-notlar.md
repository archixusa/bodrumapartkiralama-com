# SEO Canlı-Ortam Notları (kodda düzeltilemeyenler)

Bu maddeler kod deposunda değil, Vercel/DNS panelinde yapılır. v5 canlı denetiminin
hakem-onaylı bulgularından kod dışında kalanlar buradadır.

## 1. Apex → www yönlendirmesi 307 (geçici) — 308'e çevrilmeli [MAJOR]

**Bulgu (hakem teyitli):** `http://bodrumapartkiralama.com/` → `308` →
`https://bodrumapartkiralama.com/` → `307` → `https://www.bodrumapartkiralama.com/`.
İki sorun var:

1. Apex→www adımı **307 Temporary Redirect** — kalıcı sinyal (301/308) yerine
   geçici statü, link equity aktarımını ve kanonik konsolidasyonu zayıflatır.
2. `http` + apex varyantı hedefe **2 hop'ta** ulaşıyor; her varyant tek hop'ta
   www-https'e bitmeli.

**Yapılacak (Vercel):**

- Vercel → Project → **Settings → Domains**.
- `bodrumapartkiralama.com` (apex) kaydında davranışı **"Redirect to
  www.bodrumapartkiralama.com"** olarak ve statüyü **308 Permanent Redirect**
  seçerek ayarla (Vercel arayüzünde redirect status seçeneği 307/308 sunar).
- `www.bodrumapartkiralama.com` **Production Domain** (birincil) olarak işaretli
  kalmalı.

**Doğrulama (deploy sonrası):**

```bash
curl -sI http://bodrumapartkiralama.com/  | grep -i "HTTP/\|location"
curl -sI https://bodrumapartkiralama.com/ | grep -i "HTTP/\|location"
# Beklenen: her ikisi de 308 + Location: https://www.bodrumapartkiralama.com/
# (http→https hop'u protokol gereği kalabilir; apex→www adımı kesinlikle 308 olmalı)
```

> Not: `next.config.mjs` içindeki redirects() haritasına www/apex kuralı BİLEREK
> eklenmedi — Vercel domain katmanıyla çakışıp döngü yaratır (dosyadaki mevcut
> yorum da bunu söylüyor). Çözüm yalnız Vercel panelindedir.

## 2. Kod tarafında v5'te düzeltilenler (bilgi amaçlı)

Aşağıdakiler bu branch'te koddan düzeltildi; canlıda görünmesi için deploy yeterli:

- Bölge hero görselleri Unsplash 1600px → yerel ~1200px WebP (`public/images/regions/*-hero.webp`).
  - **Not:** Gündoğan'ın eski Unsplash kaynağı (photo-1591078314870-db74efd1d40a) artık 404
    döndürüyor; yerine ana sayfadaki küratörlü `gundogan.webp` hero olarak kopyalandı.
- Font preload diyeti (Jakarta 4 weight + Fraunces preload kapalı).
- Ana sayfa ilk bölge kartına `priority`/`fetchpriority=high`.
- Sitemap: x-default + slash'sız kök alternates + sahte lastmod/changefreq/priority temizliği.
- `next-sitemap` ölü konfigürasyonu ve bağımlılığı kaldırıldı.
- JSON-LD: locale-duyarlı `#webpage`, `#website` inLanguage dizisi, TouristDestination+Place
  tek düğüm, Article.image mutlak URL.
- og:locale + 4 dilli og:image:alt; bölge sayfası twitter:image yönlendirmesiz URL.
- 7 bölgeye benzersiz meta description; "yukarıdaki bölüme bakın" SSS yanıtı
  kendi başına bilgi taşıyan yanıtlarla değiştirildi.

## 3. Deploy sonrası izleme önerileri

- Search Console'da `sitemap.xml`'i yeniden gönder (alternates seti değişti).
- Zengin Sonuç Testi ile bir bölge sayfası + bir blog yazısını yeniden doğrula.
- 1-2 hafta sonra PageSpeed Insights'ta `/bodrum/gumbet-apart-kiralama` (mobil)
  LCP'nin 7.5s → ~3s bandına indiğini teyit et.
