# Yasal İnceleme — Bodrumapartkiralama.com

> # ⚠️ TASLAK — YAYINLAMADAN ÖNCE AVUKAT ONAYI GEREKİR
>
> Bu belgedeki tüm bulgular ve öneri metinler **bağlayıcı hukuki görüş değildir**.
> Aşağıdaki taslaklar yalnızca avukatın işini hızlandırmak için hazırlanmış
> **çalışma metinleridir**; hiçbir taslak, KVKK/Türk Borçlar Kanunu/Tüketici
> mevzuatı yönünden uzman bir avukat tarafından gözden geçirilip onaylanmadan
> siteye alınmamalıdır. Site sayfalarındaki yasal metinler bu çalışmada
> **değiştirilmemiştir** (tek istisna: aşağıda Y-3'te açıklanan, metin değil
> *davranış* düzeltmesi olan çerez paneli varsayılanı).

Tarih: 11 Haziran 2026 • Kapsam: kvkk, kullanim-sartlari, cerez-politikasi,
iptal-iade-politikasi sayfaları + CookieConsent/Analytics bileşenleri.

---

## Y-1 (YÜKSEK) — Canlı sayfalarda taslak/şablon uyarıları yayında

**Nerede:** `src/app/[locale]/kvkk/page.tsx:148-151` (TR) ve `230-233` (EN);
`src/app/[locale]/kullanim-sartlari/page.tsx:116-118` (TR) ve `194-196` (EN).

**Bulgu:** Ziyaretçiye görünen gövde metinlerinde şu ifadeler yayında:

- KVKK TR: "Detaylı hukuki revizyon için uzman görüşü alınacaktır."
- KVKK EN: "This text is a template. Have it reviewed by a lawyer or data
  protection specialist before going live."
- Şartlar TR: "Bu metin örnek niteliğindedir; yayına girmeden önce bir avukata
  gözden geçirtin."
- Şartlar EN: "This text is a template; have a lawyer review it before going live."

Bu notlar metnin bağlayıcılığını ve ziyaretçi güvenini zedeliyor; ayrıca
işletmenin kendi metnine güvenmediği izlenimi veriyor.

**Öneri:** Metinler avukat onayından geçirilsin; onay sonrası bu notlar
tamamen kaldırılsın. O zamana kadar en azından kullanıcıya dönük "şablon/örnek"
ifadeleri çıkarılmalı.

**ÖNERİ TASLAK (avukat onayı sonrası kapanış cümlesi, TR):**

> Bu metin [GG.AA.YYYY] tarihinde güncellenmiştir. Sorularınız için
> [e-posta] adresinden bize ulaşabilirsiniz.

**ÖNERİ TASLAK (EN):**

> This notice was last updated on [DD Month YYYY]. For any questions,
> contact us at [email].

---

## Y-2 (YÜKSEK) — Veri sorumlusunun kimliği eksik; posta adresi yok (iç çelişki)

**Nerede:** `src/app/[locale]/kvkk/page.tsx:56-61` (Veri Sorumlusu) ve
`114-133` (Başvuru Yöntemleri); `kullanim-sartlari/page.tsx:54` (Tanımlar).

**Bulgu:** KVKK m.10 aydınlatma yükümlülüğü, veri sorumlusunun **kimliğinin**
açıkça belirtilmesini gerektirir. Sayfada yalnız site adı + e-posta var; ticari
unvan / işletmeci gerçek-tüzel kişi adı ve posta adresi yok. Üstelik başvuru
yöntemlerinde "ıslak imzalı dilekçenizi **posta yoluyla** iletebilirsiniz"
deniyor ama sitede hiçbir posta adresi verilmiyor — kendi içinde çelişkili.
Kullanım şartları da şirketi "Bodrumapartkiralama.com'u işleten tüzel kişilik"
diye isimsiz tanımlıyor.

**ÖNERİ TASLAK — KVKK "1. Veri Sorumlusu" bölümü (TR):**

> **Veri Sorumlusu:** [TİCARİ UNVAN — örn. ___ Turizm Ltd. Şti. / şahıs
> işletmesi ise ad-soyad ve vergi kimlik bilgisi]
> **Adres:** [Açık posta adresi — mahalle, sokak, no, Bodrum/Muğla]
> **Web sitesi:** bodrumapartkiralama.com
> **E-posta:** [e-posta]
> **Telefon:** [telefon]

**ÖNERİ TASLAK — Başvuru Yöntemleri "Yazılı başvuru" maddesi (TR):**

> **Yazılı başvuru:** Islak imzalı dilekçenizi kimlik tespitini sağlayacak
> belgelerle birlikte "[AÇIK POSTA ADRESİ]" adresine iadeli taahhütlü posta
> ile gönderebilirsiniz.

**ÖNERİ TASLAK — Kullanım şartları "Tanımlar" maddesi (TR):**

> **Şirket:** Bodrumapartkiralama.com'u işleten [TİCARİ UNVAN], [ADRES].

Aynı bilgiler EN sürümlerine de eklenmeli. (Avukat onayı gerekir.)

---

## Y-3 (YÜKSEK) — Çerez "Ayarları Yönet" panelinde analitik kutusu önceden işaretliydi

**Nerede:** `src/components/CookieConsent.tsx:40` —
`const [analytics, setAnalytics] = useState(true)`.

**Bulgu:** Kullanıcı "Ayarları Yönet"i açtığında analitik toggle'ı varsayılan
**işaretli** geliyordu. Önceden işaretli kutuyla alınan onayın geçerli açık
rıza sayılmaması yönünde yerleşik KVKK/çerez rehberi pratiği var; bu durum
tasarım spesifikasyonunun karanlık desen yasağıyla da çelişiyordu.

**Yapılan (bu PR'da, kod davranışı — yasal metin değil):**
`useState(true)` → `useState(false)`. Pazarlama toggle'ı zaten `false` idi;
artık iki kategori de tutarlı biçimde opt-in. Davranışın geri kalanı zaten
doğruydu: karar verilmeden hiçbir analitik/pazarlama script'i yüklenmiyor,
X butonu "sadece gerekli" olarak işliyor.

**Avukat teyidi istenen:** varsayılan-kapalı opt-in modelinin yeterliliği ve
banner metninin rıza standardını karşıladığı.

---

## Y-4 (ORTA) — Rızayı geri çekmenin tek yolu "localStorage kaydını silin"

**Nerede:** `src/app/[locale]/cerez-politikasi/page.tsx:152-158` (TR) ve
`258-263` (EN); `src/components/Footer.tsx` (yasal linkler bölümü).

**Bulgu:** Politika, tercihi değiştirmek için tarayıcı localStorage'ından
`bak-cookie-consent-v1` anahtarını silmeyi tarif ediyor. Teknik olmayan
kullanıcı için makul değil; "rızayı geri çekmek, rıza vermek kadar kolay
olmalı" ilkesine aykırı.

**Öneri (geliştirme — bu PR kapsamı dışı):** Footer'a, kayıtlı tercihi silip
banner'ı yeniden açan bir "Çerez tercihlerini değiştir" butonu eklenmeli
(`CookieConsent`'e `reopen` yolu). Eklendiğinde politika metni şöyle
güncellenebilir:

**ÖNERİ TASLAK — Çerez politikası "5. Tercihinizi nasıl değiştirebilirim?" (TR):**

> Sayfanın altındaki "Çerez tercihlerini değiştir" bağlantısına tıklayarak
> tercihlerinizi dilediğiniz an yeniden belirleyebilirsiniz. Ayrıca tarayıcı
> ayarlarınızdan çerezleri silmeniz hâlinde bir sonraki ziyaretinizde Çerez
> Onay Banner'ı yeniden görüntülenir.

**ÖNERİ TASLAK (EN):**

> You can change your preference at any time via the "Change cookie
> preferences" link in the footer. Deleting cookies from your browser
> settings will also cause the consent banner to appear again on your
> next visit.

---

## Y-5 (ORTA) — Çerez politikası metni ile banner/uygulama davranışı tam örtüşmüyor

**Nerede:** `cerez-politikasi/page.tsx:83-91` ("Fonksiyonel çerezler" +
"pazarlama şu an kullanılmıyor") ↔ `CookieConsent.tsx` (3 kategori:
zorunlu/analitik/pazarlama) ↔ `Analytics.tsx:84-92` (Meta Pixel,
`NEXT_PUBLIC_META_PIXEL_ID` set edilirse rızayla yüklenir).

**Bulgu (1):** Politika "Fonksiyonel çerezler" diye ayrı bir kategori sayıyor;
banner'da böyle bir kategori/toggle yok. Dil tercihi vb. fiilen zorunlu
kategoride yönetiliyor.

**ÖNERİ TASLAK — kategori maddesinin düzeltilmiş hâli (TR):**

> **Zorunlu çerezler:** Sitenin temel işlevleri için gereklidir (oturum,
> dil tercihi, çerez tercihinizin kaydı gibi işlevsel kayıtlar dahil).
> Bu çerezler için onay gerekmez ve kapatılamaz.

(Ayrı "Fonksiyonel çerezler" maddesi metinden kaldırılır ya da banner'a
dördüncü bir toggle eklenir — ikisinden biri seçilmeli.)

**Bulgu (2):** Politika "site şu anda pazarlama çerezlerini aktif olarak
kullanmamaktadır" diyor; kod ise `NEXT_PUBLIC_META_PIXEL_ID` set edilirse
(rıza şartıyla) Meta Pixel yüklüyor. **Prod ortamında bu env'in set olup
olmadığı doğrulanmalı.** Pixel etkinleştirildiği commit'te politika cümlesi de
aynı anda güncellenmeli (süreç kuralı).

**ÖNERİ TASLAK — pixel aktifse kullanılacak madde (TR):**

> **Hedefleme / pazarlama çerezleri:** Üçüncü taraf reklam ve yeniden
> hedefleme amacıyla kullanılır (Meta Pixel). Yalnızca açık rızanızla
> yüklenir; rıza vermezseniz hiçbir pazarlama çerezi çalışmaz.

---

## Y-6 (ORTA) — "Son güncelleme" tarihleri kendi içinde çelişiyor

**Nerede:** `src/messages/tr.json` `kvkk.lastUpdate` ("24 Mayıs 2026") ↔
`kvkk/page.tsx:149` gövde sonu ("27 Mayıs 2026");
`cerez-politikasi/page.tsx:46` hardcoded "27 Mayıs 2026".

**Bulgu:** KVKK sayfasının başlık bandı "24 Mayıs 2026", gövde sonu
"27 Mayıs 2026" diyor — aynı sayfada iki farklı tarih güveni zedeliyor.

**Öneri:** Tarih tek kaynaktan yönetilsin (messages `lastUpdate` anahtarı YA DA
tek sabit); gövde sonundaki mükerrer tarih cümlesi kaldırılsın. Avukat onayı
sonrası gerçek revizyon tarihi tek yerden yazılsın. (Metin değişikliği avukat
onayıyla birlikte yapılacağı için bu PR'da dokunulmadı.)

---

## Y-7 (ORTA) — DE/RU ziyaretçiler İngilizce yasal metin görüyor; hreflang yanlış sinyal veriyor

**Nerede:** `src/i18n/routing.ts` (tr/en/de/ru) ↔ 4 yasal sayfadaki
`isTr ? <Tr/> : <En/>` deseni ↔ `buildAlternates` 4 dile hreflang üretiyor.

**Bulgu:** Site 4 dilli ama yasal sayfalar yalnız TR/EN; `de`/`ru` rotaları EN
içerik render ediyor ve hreflang alternates bu sayfaları ayrı dil sürümü gibi
işaret ediyor.

**Öneri:** Kısa vadede 4 yasal sayfaya "bağlayıcı dil" notu eklensin; orta
vadede DE/RU çeviri yaptırılsın ya da yasal sayfalar için hreflang tr/en ile
sınırlandırılsın.

**ÖNERİ TASLAK — bağlayıcı dil notu (4 dil):**

> **TR:** Bu metnin bağlayıcı dili Türkçedir; çeviriler bilgilendirme
> amaçlıdır.
> **EN:** The binding language of this document is Turkish; translations are
> provided for information only.
> **DE:** Die verbindliche Sprache dieses Dokuments ist Türkisch;
> Übersetzungen dienen nur der Information.
> **RU:** Обязательную силу имеет текст на турецком языке; переводы носят
> справочный характер.

---

## Y-8 (ORTA) — Aydınlatma metninin "Aktarım" bölümü çerez politikasındaki üçüncü tarafları kapsamıyor

**Nerede:** `kvkk/page.tsx:88-94` (Aktarım: yalnız Vercel, Resend, iş
ortakları) ↔ `cerez-politikasi/page.tsx:94-110` (Google Analytics, GTM,
Meta Pixel).

**Bulgu:** Çerez politikası Google ve Meta hizmetlerini sayarken aydınlatma
metninin aktarım bölümü yalnız Vercel/Resend ve iş ortaklarını anıyor;
analitik/pazarlama araçlarıyla yurt dışına veri aktarımı aydınlatmada
görünmüyor. Ayrıca "KVKK m.9 koşullarına uyulur" ifadesi mekanizma
belirtmiyor (2024 m.9 değişikliği sonrası standart sözleşme / yeterlilik
kararı / açık rıza — hangisi kullanılıyorsa yazılmalı).

**ÖNERİ TASLAK — "5. Aktarım" bölümünün genişletilmiş hâli (TR):**

> Kişisel verileriniz; rezervasyon sürecini tamamlamak adına anlaşmalı
> transfer, tur ve apart sahibi iş ortaklarımızla ve yasal mercilerle
> paylaşılabilir. Barındırma ve e-posta altyapısı için Vercel Inc. ve
> Resend'den; **açık rızanız bulunması hâlinde** site kullanım analitiği için
> Google (Google Analytics / Tag Manager) ve reklam ölçümü için Meta (Meta
> Pixel) hizmetlerinden yararlanırız; bu hizmetlerin sunucuları yurt dışında
> bulunabilir. Yurt dışına aktarımlar, KVKK m.9 kapsamında
> [KULLANILAN MEKANİZMA: standart sözleşme / yeterlilik kararı / açık rıza]
> dayanağıyla gerçekleştirilir.

(Mekanizma işletme + avukatla netleştirilmeden yayınlanmamalı.)

---

## Y-9 (ORTA) — Gerçek konaklama ilanlarında stok görsel itirafı

**Nerede:** `kullanim-sartlari/page.tsx:79-81` — "Apart ilanlarındaki bazı
görseller Unsplash gibi serbest lisanslı kaynaklardan alıntılanmıştır."

**Bulgu:** Tatil kiralamasında ilan görseli, tüketicinin karar verdiği ana
unsurdur; stok görsel kullanımının şartlar sayfasındaki tek cümleye gömülmesi
yeterli şeffaflık sağlamaz ve tüketiciyi yanıltma riski taşır (TKHK haksız
ticari uygulama riski).

**Öneri (operasyon + ürün):** Stok görsel içeren ilan görselleri ya gerçek
fotoğraflarla değiştirilmeli ya da görselin **üzerinde** açıkça işaretlenmeli.

**ÖNERİ TASLAK — görsel üstü rozet metni (4 dil):**

> TR: "Temsilî görseldir" • EN: "Representative image" •
> DE: "Beispielbild" • RU: "Иллюстративное изображение"

**ÖNERİ TASLAK — şartlardaki cümlenin düzeltilmiş hâli (TR):**

> Site genelindeki dekoratif görsellerin bir kısmı serbest lisanslı
> kaynaklardan alınmıştır. Apart ilanlarında gerçek mülke ait olmayan bir
> görsel kullanılması hâlinde bu, görsel üzerinde "temsilî görseldir"
> ibaresiyle açıkça belirtilir.

(Bu cümle ancak görsel işaretleme fiilen uygulandıktan sonra yayına alınmalı;
hukuki yeterliliği için avukat onayı gerekir.)

---

## Y-10 (ORTA) — İade taahhütleri işletme gerçeğiyle ve ödeme akışıyla doğrulanmalı

**Nerede:** `src/app/[locale]/iptal-iade-politikasi/page.tsx` (tamamı) ↔
`kullanim-sartlari/page.tsx:60-65` (ödeme telefon/WhatsApp ile tamamlanır).

**Bulgu:** Politika net ve adil görünüyor (olumlu) ama site online ödeme
almıyor; ödeme kapora/havale ile mülk sahibi akışında gerçekleşiyor. Şu
taahhütlerin fiilen uygulanan kurallar olduğu işletme sahibiyle teyit
edilmeli — uygulanmayan taahhüt tüketici uyuşmazlığında aleyhe delildir:

- "7 gün ve öncesi iptalde ödenen tutar kesintisiz tam iade"
- "4-6 gün kala %50 / 1-3 gün kala %25 iade" kademeleri
- "Onaylanan iadeler 3-10 iş günü içinde hesaba yansır"
- "Uluslararası havalede 7-15 iş günü"
- "Transferde 24 saat öncesine kadar ücretsiz iptal, sonrasında %50 kesinti"

**Doğrulama soruları (işletme sahibi + avukat):**

1. Kapora mülk sahibine mi işletmeye mi ödeniyor? İadeyi kim, hangi hesaptan
   yapıyor? ("ödediğiniz tutar tam iade edilir" taahhüdünü site mi mülk
   sahibi mi üstleniyor — sorumluluk zinciri yazılmalı.)
2. Konaklama hizmetlerinde cayma hakkı istisnaları (Mesafeli Sözleşmeler
   Yönetmeliği m.15/g) karşısında bu politika nasıl konumlanıyor? Politika
   yasal asgariden cömertse sorun yok, ama metin "yasal hak" ile "işletme
   taahhüdü"nü ayırt etmeli.
3. Bayram/yüksek sezon için farklı iptal kuralı uygulanıyor mu? (Apartlar
   sayfası rehberi "iptal şartları mülke göre değişir" diyor — iki metin
   çelişmemeli.)

---

## Özet tablo

| # | Öncelik | Konu | Durum |
|---|---------|------|-------|
| Y-1 | Yüksek | Şablon uyarıları yayında | Taslak hazır — avukat onayı bekliyor |
| Y-2 | Yüksek | Veri sorumlusu kimliği/adres eksik | Taslak hazır — unvan+adres işletmeden |
| Y-3 | Yüksek | Çerez panelinde önceden işaretli analitik | **Kodda düzeltildi** (opt-in) — avukat teyidi |
| Y-4 | Orta | Rıza geri çekme kullanıcı dostu değil | Footer butonu önerildi + taslak |
| Y-5 | Orta | Politika ↔ banner kategori/pixel uyumsuzluğu | Taslak hazır — prod env doğrulaması |
| Y-6 | Orta | Çelişen "son güncelleme" tarihleri | Tek kaynak önerisi |
| Y-7 | Orta | DE/RU'da İngilizce yasal metin + hreflang | Bağlayıcı dil notu taslağı (4 dil) |
| Y-8 | Orta | Aydınlatma "Aktarım" bölümü eksik | Taslak hazır — m.9 mekanizması netleşmeli |
| Y-9 | Orta | Stok görsel şeffaflığı | Rozet + cümle taslağı |
| Y-10 | Orta | İade taahhütlerinin operasyon teyidi | Doğrulama soru listesi |
