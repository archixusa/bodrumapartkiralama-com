// Tek seferlik yardımcı: kart görselleri için ortak blurDataURL üretir
// (DESIGN_SPEC.md v3 "Görsel performans" — remote görsellerde küçük blurDataURL).
// Kullanım: node scripts/gen-blur.cjs
const sharp = require("sharp");

const svg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="18">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#FBEEDD"/>
        <stop offset="0.55" stop-color="#CFEFEA"/>
        <stop offset="1" stop-color="#A9E4DD"/>
      </linearGradient>
    </defs>
    <rect width="24" height="18" fill="url(#g)"/>
  </svg>`
);

(async () => {
  const buf = await sharp(svg).resize(12, 9).blur(1).webp({ quality: 40 }).toBuffer();
  console.log("data:image/webp;base64," + buf.toString("base64"));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
