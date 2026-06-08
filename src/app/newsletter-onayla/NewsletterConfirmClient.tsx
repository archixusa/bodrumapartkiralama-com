"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Status = "idle" | "loading" | "success" | "missing-token" | "error";

const card: React.CSSProperties = {
  maxWidth: 480,
  width: "100%",
  background: "white",
  borderRadius: 12,
  padding: 32,
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  textAlign: "center",
};
const h1: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  color: "#042C53",
  margin: 0,
};
const p: React.CSSProperties = {
  marginTop: 12,
  fontSize: 14,
  color: "#465764",
  lineHeight: 1.55,
};
const linkBtn: React.CSSProperties = {
  marginTop: 18,
  display: "inline-block",
  padding: "10px 18px",
  background: "#042C53",
  color: "white",
  borderRadius: 6,
  textDecoration: "none",
  fontWeight: 600,
  fontSize: 14,
};

export function NewsletterConfirmClient() {
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("missing-token");
      return;
    }
    let cancelled = false;
    setStatus("loading");
    (async () => {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !key) {
        setStatus("error");
        setErrorMsg(
          "Yapılandırma eksik. Lütfen info@bodrumapartkiralama.com'a yazın.",
        );
        return;
      }
      try {
        const res = await fetch(`${url}/functions/v1/newsletter-confirm`, {
          method: "POST",
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        if (cancelled) return;
        if (!res.ok && res.status !== 409) {
          const text = await res.text().catch(() => "");
          setStatus("error");
          setErrorMsg(text || `HTTP ${res.status}`);
          return;
        }
        setStatus("success");
      } catch (err) {
        if (cancelled) return;
        setStatus("error");
        setErrorMsg(err instanceof Error ? err.message : "Beklenmedik hata");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (status === "missing-token") {
    return (
      <div style={card}>
        <h1 style={h1}>Onay bağlantısı eksik</h1>
        <p style={p}>
          Bu sayfa, e-posta ile gelen onay linkinden gelmek için tasarlandı.
          Linkin tamamını kopyaladığınızdan emin olun.
        </p>
        <Link href="/" style={linkBtn}>
          Anasayfaya dön
        </Link>
      </div>
    );
  }

  if (status === "loading" || status === "idle") {
    return (
      <div style={card}>
        <h1 style={h1}>Onaylanıyor...</h1>
        <p style={p}>Lütfen bekleyin, kaydınızı tamamlıyoruz.</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div style={card}>
        <h1 style={h1}>Aboneliğiniz onaylandı ✓</h1>
        <p style={p}>
          E-posta adresinizi listemize ekledik. Yeni mülkler eklendiğinde veya
          sezon fırsatları olduğunda size kısa bir bilgilendirme yapacağız.
          İstediğiniz an çıkabilirsiniz.
        </p>
        <Link href="/" style={linkBtn}>
          Anasayfaya dön
        </Link>
      </div>
    );
  }

  return (
    <div style={card}>
      <h1 style={h1}>Onaylanamadı</h1>
      <p style={p}>
        Linkin süresi dolmuş veya geçersiz olabilir. Lütfen aboneliği yeniden
        oluşturun. Sorun devam ederse{" "}
        <a
          href="mailto:info@bodrumapartkiralama.com"
          style={{ color: "#042C53", fontWeight: 600 }}
        >
          info@bodrumapartkiralama.com
        </a>{" "}
        adresine yazabilirsiniz.
      </p>
      {errorMsg && (
        <p style={{ ...p, marginTop: 8, fontSize: 12, color: "#9b2c2c" }}>
          {errorMsg}
        </p>
      )}
      <Link href="/" style={linkBtn}>
        Anasayfaya dön
      </Link>
    </div>
  );
}
