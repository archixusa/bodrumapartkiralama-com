"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
// Renkler spec token sabitlerinden (DESIGN_SPEC.md §1) — eski #053C4A/#5C6B73/
// #C8D8DC inline hex'leri yeni turkuaz butonla yarım palet karışımı yaratıyordu.
import { ACCENT, BORDER, DANGER, INK, MUTED } from "@/lib/brand";

export function UnsubscribeClient() {
  // SECURITY: we intentionally do NOT auto-load the email from a ?t= target id.
  // Reading outreach_targets.email by an attacker-controlled id with the anon
  // key would be a B2B email-enumeration vector if RLS ever allowed anon SELECT
  // on that table. The visitor simply types the address they want suppressed —
  // the suppression insert below does not depend on knowing their target id.
  const [emailInput, setEmailInput] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      setError("Yapılandırma eksik. Lütfen info@bodrumapartkiralama.com'a yazın.");
      return;
    }
    setStatus("saving");
    setError(null);
    const c = createClient(url, key, { auth: { persistSession: false } });
    const { error } = await c
      .from("outreach_suppression")
      .insert({ email: emailInput.trim().toLowerCase(), reason: "user-requested-unsub" });
    if (error && !error.message.includes("duplicate")) {
      setStatus("error");
      setError(error.message);
    } else {
      setStatus("done");
    }
  }

  if (status === "done") {
    return (
      <div style={card}>
        <h1 style={h1}>Çıkış kaydedildi ✓</h1>
        <p style={p}>
          <strong>{emailInput}</strong> adresine bir daha partnership e-postası
          göndermeyeceğiz. Geçmişe yönelik rezervasyon/işletme yazışmaları (siz
          istemedikçe) etkilenmez.
        </p>
        <p style={small}>
          Yanlışlıkla mı tıkladınız?{" "}
          <a href="mailto:info@bodrumapartkiralama.com">
            info@bodrumapartkiralama.com
          </a>{" "}
          adresine yazın, geri alalım.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={card}>
      <h1 style={h1}>İletişimden Çık</h1>
      <p style={p}>
        Bodrumapartkiralama.com partnership e-postalarından çıkmak için
        e-postanızı yazın. Bir daha mail almayacaksınız.
      </p>
      <label style={{ display: "block", marginTop: 16 }}>
        <span style={label}>E-posta</span>
        <input
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          style={input}
          placeholder="ornek@sirket.com"
        />
      </label>
      {error && <p style={{ color: DANGER, fontSize: 13, marginTop: 8 }}>{error}</p>}
      <button type="submit" disabled={status === "saving"} style={btn}>
        {status === "saving" ? "Kaydediliyor..." : "Çıkışı Onayla"}
      </button>
      <p style={small}>
        KVKK kapsamında bu işlem hemen yürürlüğe girer. Veriler en geç 30 gün
        içinde silinir.
      </p>
    </form>
  );
}

const card: React.CSSProperties = {
  maxWidth: 480,
  width: "100%",
  background: "#fff",
  borderRadius: 20,
  padding: 32,
  boxShadow: "0 12px 40px -20px rgba(5,60,74,.25)",
  fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
};
const h1: React.CSSProperties = { margin: "0 0 8px", fontSize: 24, color: INK };
const p: React.CSSProperties = { margin: 0, fontSize: 14, color: MUTED, lineHeight: 1.5 };
const small: React.CSSProperties = { marginTop: 14, fontSize: 12, color: MUTED };
const label: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: MUTED,
  display: "block",
  marginBottom: 6,
};
const input: React.CSSProperties = {
  width: "100%",
  padding: "11px 13px",
  border: `1px solid ${BORDER}`, // kum-cizgi
  borderRadius: 10,
  fontSize: 16, // <16px input fontu iOS'ta odaklanınca zoom tetikler
  fontFamily: "inherit",
  boxSizing: "border-box",
};
const btn: React.CSSProperties = {
  width: "100%",
  marginTop: 16,
  padding: "12px 16px",
  border: 0,
  borderRadius: 999,
  background: ACCENT, // turkuaz-600 — eski turuncu palet kalıntısıydı
  color: "#fff",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
};
