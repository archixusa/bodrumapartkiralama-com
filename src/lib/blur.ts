// Ortak blur placeholder (DESIGN_SPEC.md v3 "Görsel performans"):
// remote/string-path görsellerde next/image'ın otomatik blur'u yoktur —
// kart ve hero görsellerine bu küçük (~100B) kum→turkuaz degrade webp
// verilir. Üretici: scripts/gen-blur.cjs (sharp).
export const BLUR_KUM =
  "data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAABwAQCdASoMAAkAA4BaJZACdAFAAAD+8L2X1vGNg8Xl2VoEw+GuLSdAAAA=";
