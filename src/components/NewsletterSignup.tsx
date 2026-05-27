"use client";

import { FormEvent, useState } from "react";
import { useLocale } from "next-intl";
import { Mail, Check, AlertCircle, Loader2 } from "lucide-react";

interface Props {
  sourceSite: string;
  sourcePage: string;
}

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterSignup({ sourceSite, sourcePage }: Props) {
  const locale = useLocale();
  const isTr = locale === "tr";
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const t = isTr
    ? {
        placeholder: "E-posta adresiniz",
        submit: "Haberdar Et",
        submitting: "Gönderiliyor...",
        consent:
          "E-posta adresimi yalnızca yeni mülk eklendiğinde haberdar olmak için kullanmanıza onay veriyorum.",
        successTitle: "E-postanızı kontrol edin",
        successDesc:
          "E-posta adresinize doğrulama linki gönderdik. Lütfen kontrol edip onaylayın.",
        errorTitle: "Bir sorun oluştu",
        errorFallback:
          "Şu an kayıt yapılamadı. Lütfen biraz sonra tekrar deneyin veya WhatsApp'tan ulaşın.",
        consentRequired: "Devam etmek için onay vermeniz gerekiyor.",
        invalidEmail: "Lütfen geçerli bir e-posta adresi girin.",
      }
    : {
        placeholder: "Your email address",
        submit: "Notify me",
        submitting: "Sending...",
        consent:
          "I consent to my email being used only to notify me when new properties are added.",
        successTitle: "Check your inbox",
        successDesc:
          "We sent a confirmation link to your email — please open it to confirm your subscription.",
        errorTitle: "Something went wrong",
        errorFallback:
          "Couldn't save your email right now. Please try again later or message us on WhatsApp.",
        consentRequired: "Please give consent to continue.",
        invalidEmail: "Please enter a valid email address.",
      };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!consent) {
      setStatus("error");
      setErrorMsg(t.consentRequired);
      return;
    }
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setErrorMsg(t.invalidEmail);
      return;
    }

    setStatus("submitting");
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase env missing");
      }
      // Double opt-in: edge function emails a confirmation link.
      const res = await fetch(
        `${supabaseUrl}/functions/v1/newsletter-subscribe`,
        {
          method: "POST",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: trimmed.toLowerCase(),
            source_site: sourceSite,
            source_page: sourcePage,
          }),
        }
      );
      if (!res.ok && res.status !== 409) {
        // 409 (already subscribed/pending) — surface as success too.
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
      }
      setStatus("success");
      setEmail("");
      setConsent(false);
    } catch (err) {
      console.error("[NewsletterSignup]", err);
      setStatus("error");
      setErrorMsg(t.errorFallback);
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-md border border-success/30 bg-success/5 p-4 text-sm">
        <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
        <div>
          <p className="font-semibold text-success">{t.successTitle}</p>
          <p className="mt-1 text-ink/85">{t.successDesc}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <label className="flex w-full items-center gap-2 rounded-md border border-[var(--color-border)] bg-white px-3 py-2 focus-within:border-navy-600 focus-within:ring-2 focus-within:ring-navy-200">
        <Mail className="h-4 w-4 text-navy-600" />
        <input
          type="email"
          required
          placeholder={t.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="input-base flex-1 border-none p-0 text-base focus:ring-0"
        />
      </label>

      <label className="flex items-start gap-2 text-sm text-muted">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-[var(--color-border)] text-navy-600 focus:ring-navy-600"
        />
        <span>{t.consent}</span>
      </label>

      {status === "error" && errorMsg && (
        <div className="flex items-start gap-2 rounded-md border border-danger/30 bg-danger/5 p-3 text-sm text-danger">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full justify-center disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t.submitting}
          </>
        ) : (
          t.submit
        )}
      </button>
    </form>
  );
}
