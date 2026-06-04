# SEO Migration & Indexing Recovery — Manual Checklist

Bu doküman, eski WordPress/ASP sitesinden yeni Next.js sitesine geçişin
ardından arama motoru indekslemesini kurtarmak için **elle yapılması gereken**
adımları listeler. Kod tarafındaki 301 yönlendirmeleri, sitemap, robots,
IndexNow ve nazik 404 sayfası `fix/seo-migration-redirects` PR'ı ile zaten
canlıya alındı.

Kanonik host: **https://www.bodrumapartkiralama.com** (apex → www, Vercel
domain seviyesinde yönlendirilir).

---

## 1. Google Search Console (GSC)

1. **Property ekle**: `https://www.bodrumapartkiralama.com` için bir
   "URL prefix" property'si oluştur. (Mümkünse Domain property'si de ekleyip
   tüm host/protokol varyantlarını tek yerde topla.)
2. **Sahiplik doğrulama**: DNS TXT kaydı veya HTML meta etiketi ile doğrula.
3. **Sitemap gönder**: Sitemaps bölümünde `sitemap.xml` gönder
   → `https://www.bodrumapartkiralama.com/sitemap.xml`.
4. **URL Inspection + Request Indexing** (öncelik sırasıyla):
   - `/` (anasayfa)
   - `/apartlar`
   - Bölge sayfaları:
     - `/bodrum/gumbet-apart-kiralama`
     - `/bodrum/turgutreis-apart-kiralama`
     - `/bodrum/yalikavak-apart-kiralama`
     - `/bodrum/bitez-apart-kiralama`
     - `/bodrum/ortakent-apart-kiralama`
     - `/bodrum/gundogan-apart-kiralama`
     - `/bodrum/torba-apart-kiralama`
   - `/blog` ve öne çıkan blog yazıları
5. **Eski indeksli URL listesini çıkar**: GSC > Pages (Indexed) ve eski
   property varsa oradan, hâlâ indeksli görünen eski WordPress/ASP URL'lerini
   dışa aktar (CSV). Bu listeyi `next.config.mjs` içindeki `redirects()`
   haritasını **genişletmek** için kullan — listede 404 veren ama henüz
   yönlendirilmemiş bir kalıp varsa yeni bir 301 ekle (hedef her zaman
   prefix'siz gerçek sayfa olmalı; zincir/loop oluşturma).
6. **Coverage/Pages raporunu izle**: "Not found (404)" ve "Page with redirect"
   bölümlerini takip et; beklenen 301'ler "redirect" olarak görünmeli,
   yönlendirilmesi gereken bir şey hâlâ 404'te kalıyorsa redirect ekle.

## 2. Bing Webmaster Tools

1. `https://www.bodrumapartkiralama.com` site'ını ekle.
2. **GSC'den içe aktar** (varsa) veya DNS/meta ile doğrula.
3. **Sitemap gönder**: `https://www.bodrumapartkiralama.com/sitemap.xml`.
4. IndexNow zaten kurulu: anahtar dosyası
   `https://www.bodrumapartkiralama.com/8008347f8b6106765fdf3b6e9a56b126.txt`
   adresinde yayında. Bing/Yandex değişen URL'leri saatler içinde yeniden
   tarayabilir. (Programatik gönderim için `src/lib/indexnow.ts` →
   `submitToIndexNow(urls, host)`.)

## 3. Sosyal / Harici Bağlantılar

- **Facebook sayfası**: Sayfa "Website" alanındaki bağlantıyı
  `https://www.bodrumapartkiralama.com` olarak güncelle (eski domain/URL varsa).
- **Telefon tutarlılığı**: Tüm dış platformlarda (Facebook, Google Business
  Profile, dizinler) telefon numarasını sitedekiyle aynı tut:
  - Görünen: **+90 538 512 40 88**
  - WhatsApp: **+90 538 512 40 88** (wa.me/905385124088)
  - E-posta: **info@bodrumapartkiralama.com**
- **Google Business Profile**: Web sitesi bağlantısını www'lı kanonik URL'e
  güncelle; NAP (isim/adres/telefon) tutarlılığını kontrol et.

## 4. 2–4 Haftalık İzleme

- **Hafta 1–2**: GSC'de günlük "Pages" ve "Crawl stats"; 404 sayısının
  düşmesini, 301'lerin "redirect" olarak görünmesini bekle.
- **Hafta 2–4**: "Indexed" sayfa sayısının yeni URL yapısına göre toparlandığını
  doğrula; Performance raporunda eski URL'lere gelen tıklamaların yeni hedeflere
  kaydığını izle.
- Yeni 404 kalıpları belirirse `redirects()` haritasına ekle, tekrar deploy et,
  GSC'den ilgili URL'i tekrar "Request Indexing" ile gönder.

---

## Canlıya Alınan 301 Yönlendirme Haritası (referans)

| Eski (404 veren) kaynak | Yeni hedef (prefix'siz) |
|---|---|
| `/anasayfa.aspx`, `/anasayfa.asp`, `/default.asp`, `/index.asp`, `/index.aspx` | `/` |
| `/kiralik-apart`, `/kiralik-apart/*`, `/tr/kiralik-apart`, `/tr/kiralik-apart/*` | `/apartlar` |
| `/bodrum-apart-kiralama`, `/bodrum-apart-kiralama/*`, `/tr/bodrum-apart-kiralama`, `/tr/bodrum-apart-kiralama/*` | `/apartlar` |
| `/iletisim.asp` | `/iletisim` |
| `/hakkimizda.asp` | `/hakkimizda` |
| `/gumbet` | `/bodrum/gumbet-apart-kiralama` |
| `/turgutreis` | `/bodrum/turgutreis-apart-kiralama` |
| `/yalikavak` | `/bodrum/yalikavak-apart-kiralama` |
| `/bitez` | `/bodrum/bitez-apart-kiralama` |
| `/ortakent` | `/bodrum/ortakent-apart-kiralama` |
| `/gundogan` | `/bodrum/gundogan-apart-kiralama` |
| `/?p=<id>` (WordPress query permalink) | `/blog` |

**Yönlendirme EKLENMEYEN** (zaten 200 dönen, loop riski olan) yollar:
`/`, `/apartlar`, `/iletisim`, `/hakkimizda`, `/blog`, `/blog/:slug`,
`/bodrum/:slug`.
