"use client";

import { useState } from "react";
// Renkler spec token sabitlerinden (DESIGN_SPEC.md §1) — eski slate/lacivert
// inline hex'ler (#0F172A/#334155/#64748B/#CBD5E1/#0C4A6E/#EF4444) yeni
// turkuaz vurguyla yarım palet karışımı yaratıyordu.
import {
  ACCENT,
  BORDER,
  DANGER,
  INK,
  MUTED,
  REVIEW_STAR_COLOR,
} from "@/lib/brand";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

interface Props {
  token: string;
  brand: string;
}

export function ReviewForm({ token, brand }: Props) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating < 1 || body.trim().length < 10) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/submit-review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SUPABASE_ANON}`,
          "apikey": SUPABASE_ANON,
        },
        body: JSON.stringify({
          token,
          rating,
          title: title.trim() || null,
          body: body.trim(),
          display_mode: anonymous ? "anonymous" : "named",
          display_name: anonymous ? null : (displayName.trim() || null),
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setResult({ ok: false, message: data.message ?? data.error ?? "Hata oluştu." });
      } else {
        setResult({ ok: true, message: data.message });
      }
    } catch (err) {
      setResult({ ok: false, message: (err as Error).message });
    } finally {
      setSubmitting(false);
    }
  }

  if (result?.ok) {
    return (
      <div
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 12,
          maxWidth: 500,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>✨</div>
        <h1 style={{ fontSize: 22, marginBottom: 12, color: INK }}>Teşekkürler!</h1>
        <p style={{ color: MUTED, lineHeight: 1.6 }}>{result.message}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        padding: 32,
        borderRadius: 12,
        maxWidth: 560,
        width: "100%",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      <p style={{ fontSize: 11, color: ACCENT, textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>
        {brand}
      </p>
      <h1 style={{ fontSize: 24, margin: "4px 0 8px", color: INK }}>
        Konaklamanızı değerlendirin
      </h1>
      <p style={{ fontSize: 14, color: MUTED, marginBottom: 24, lineHeight: 1.6 }}>
        2 dakika sürer. Dilerseniz isminizle, dilerseniz anonim olarak paylaşabilirsiniz.
      </p>

      {/* Star rating */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: INK, display: "block", marginBottom: 8 }}>
          Puanınız
        </label>
        <div style={{ display: "flex", gap: 4 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHoverRating(n)}
              onMouseLeave={() => setHoverRating(0)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 36,
                lineHeight: 1,
                color: n <= (hoverRating || rating) ? REVIEW_STAR_COLOR : BORDER,
                padding: 0,
                transition: "color 0.15s",
              }}
              aria-label={`${n} yıldız`}
            >
              ★
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p style={{ fontSize: 12, color: MUTED, margin: "6px 0 0" }}>
            {["", "Çok kötü", "Kötü", "Orta", "İyi", "Mükemmel"][rating]}
          </p>
        )}
      </div>

      {/* Title (optional) */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: INK, display: "block", marginBottom: 6 }}>
          Başlık (opsiyonel)
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={200}
          placeholder="Örn: Aile dostu, temiz ve manzaralı"
          style={{
            width: "100%",
            padding: "10px 12px",
            border: `1px solid ${BORDER}`,
            borderRadius: 8,
            fontSize: 16, // <16px input fontu iOS'ta zoom tetikler
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Body */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: INK, display: "block", marginBottom: 6 }}>
          Değerlendirmeniz <span style={{ color: DANGER }}>*</span>
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          placeholder="Konaklamanız nasıldı? Beğendikleriniz, geliştirebileceğimiz noktalar..."
          style={{
            width: "100%",
            padding: "10px 12px",
            border: `1px solid ${BORDER}`,
            borderRadius: 8,
            fontSize: 16, // <16px input fontu iOS'ta zoom tetikler
            fontFamily: "inherit",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />
        <p style={{ fontSize: 11, color: MUTED, margin: "4px 0 0" }}>
          {body.length}/2000 karakter (en az 10)
        </p>
      </div>

      {/* Anonymous toggle */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: INK }}>
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            style={{ width: 18, height: 18, cursor: "pointer" }}
          />
          <span>İsmimi yazma — <strong>Anonim olarak paylaş</strong></span>
        </label>
      </div>

      {/* Display name (only if NOT anonymous) */}
      {!anonymous && (
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: INK, display: "block", marginBottom: 6 }}>
            Görünmesini istediğiniz isim (opsiyonel)
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            maxLength={80}
            placeholder="Boş bırakırsanız rezervasyondaki isminiz kullanılır"
            style={{
              width: "100%",
              padding: "10px 12px",
              border: `1px solid ${BORDER}`,
              borderRadius: 8,
              fontSize: 16, // <16px input fontu iOS'ta zoom tetikler
              boxSizing: "border-box",
            }}
          />
        </div>
      )}

      {/* Error message */}
      {result && !result.ok && (
        <div
          style={{
            // Danger token tabanlı zemin/kenarlık tonları (rastgele hex değil).
            background: "rgba(163,45,45,0.08)",
            border: "1px solid rgba(163,45,45,0.35)",
            color: DANGER,
            padding: "10px 12px",
            borderRadius: 8,
            fontSize: 13,
            marginBottom: 16,
          }}
        >
          {result.message}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting || rating < 1 || body.trim().length < 10}
        style={{
          width: "100%",
          padding: "14px 20px",
          background: submitting || rating < 1 || body.trim().length < 10 ? MUTED : ACCENT,
          color: "#fff",
          border: "none",
          borderRadius: 10,
          fontSize: 15,
          fontWeight: 600,
          cursor: submitting || rating < 1 || body.trim().length < 10 ? "not-allowed" : "pointer",
        }}
      >
        {submitting ? "Gönderiliyor..." : "Değerlendirmeyi gönder"}
      </button>

      <p style={{ fontSize: 11, color: MUTED, marginTop: 16, textAlign: "center", lineHeight: 1.5 }}>
        Değerlendirmeniz manuel onaydan sonra siteye yansıyacaktır.
        Spam, hakaret veya konuyla ilgisiz içerikler yayınlanmaz.
      </p>
    </form>
  );
}
