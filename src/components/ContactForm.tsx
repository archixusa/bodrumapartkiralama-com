"use client";

import { FormEvent, useState } from "react";
import { useLocale } from "next-intl";
import { Loader2, Check, AlertCircle } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

interface Props {
  sourceSite: string;
}

export function ContactForm({ sourceSite }: Props) {
  const locale = useLocale();
  const isTr = locale === "tr";
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const t = isTr
    ? {
        name: "Ad Soyad",
        email: "E-posta",
        phone: "Telefon (opsiyonel)",
        subject: "Konu",
        subjects: {
          general: "Genel Bilgi",
          reservation: "Rezervasyon",
          owner: "Mülk Sahibi Olmak",
          other: "Diğer",
        },
        message: "Mesajınız",
        messagePlaceholder: "Sizinle nasıl iletişime geçmemizi istersiniz?",
        kvkk: "Mesajımın değerlendirilebilmesi için iletişim bilgilerimin",
        kvkkLink: "KVKK Aydınlatma Metni",
        kvkkSuffix: " kapsamında işlenmesini onaylıyorum.",
        submit: "Mesajı Gönder",
        submitting: "Gönderiliyor…",
        successTitle: "Mesajınız alındı",
        successDesc:
          "Bizden cevap için en geç 24 saat içerisinde dönüş yapacağız.",
        errorTitle: "Mesaj gönderilemedi",
        errorFallback:
          "Şu an form üzerinden mesajınızı iletemedik. Lütfen daha sonra tekrar deneyin veya WhatsApp'tan ulaşın.",
        consentRequired: "Devam etmek için onay vermeniz gerekiyor.",
      }
    : {
        name: "Full name",
        email: "Email",
        phone: "Phone (optional)",
        subject: "Subject",
        subjects: {
          general: "General info",
          reservation: "Reservation",
          owner: "Owner application",
          other: "Other",
        },
        message: "Your message",
        messagePlaceholder: "How would you like us to reach you?",
        kvkk: "I consent to my contact details being processed in line with the",
        kvkkLink: "KVKK Privacy Notice",
        kvkkSuffix: " for the purpose of evaluating my message.",
        submit: "Send Message",
        submitting: "Sending…",
        successTitle: "Your message is received",
        successDesc: "We'll get back to you within 24 hours.",
        errorTitle: "Couldn't send your message",
        errorFallback:
          "We couldn't deliver your message right now. Please try again later or reach us via WhatsApp.",
        consentRequired: "Please give consent to continue.",
      };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const consent = data.get("consent") === "on";
    if (!consent) {
      setStatus("error");
      setErrorMsg(t.consentRequired);
      return;
    }
    const payload = {
      source_site: sourceSite,
      locale,
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim().toLowerCase(),
      phone: String(data.get("phone") || "").trim() || null,
      subject: String(data.get("subject") || "general"),
      message: String(data.get("message") || "").trim(),
    };

    setStatus("submitting");
    setErrorMsg("");
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase env missing");
      }
      const res = await fetch(
        `${supabaseUrl}/rest/v1/contact_messages`,
        {
          method: "POST",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      console.error("[ContactForm]", err);
      setStatus("error");
      setErrorMsg(t.errorFallback);
    }
  };

  if (status === "success") {
    return (
      <div className="card flex items-start gap-3 border-success/40 bg-success/5 p-5">
        <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
        <div>
          <p className="text-base font-semibold text-success">{t.successTitle}</p>
          <p className="mt-1 text-sm text-ink/85">{t.successDesc}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card flex flex-col gap-4 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label={t.name + " *"} required />
        <Field name="email" label={t.email + " *"} type="email" required />
        <Field name="phone" label={t.phone} type="tel" />
        <label className="flex flex-col gap-1">
          <span className="label-base">{t.subject}</span>
          <select name="subject" defaultValue="general" className="input-base">
            <option value="general">{t.subjects.general}</option>
            <option value="reservation">{t.subjects.reservation}</option>
            <option value="owner">{t.subjects.owner}</option>
            <option value="other">{t.subjects.other}</option>
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1">
        <span className="label-base">{t.message} *</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={t.messagePlaceholder}
          className="input-base resize-y"
        />
      </label>

      <label className="flex items-start gap-2 text-sm text-muted">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 rounded border-[var(--color-border)] text-navy-600 focus:ring-navy-600"
        />
        <span>
          {t.kvkk}{" "}
          <a
            href={isTr ? "/kvkk" : "/en/kvkk"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy-600 underline hover:text-navy-900"
          >
            {t.kvkkLink}
          </a>
          {t.kvkkSuffix}
        </span>
      </label>

      {status === "error" && errorMsg && (
        <div className="flex items-start gap-2 rounded-md border border-danger/30 bg-danger/5 p-3 text-sm text-danger">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <strong>{t.errorTitle}.</strong> {errorMsg}
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary justify-center disabled:opacity-60"
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

function Field({
  name,
  label,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="label-base">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={
          name === "email"
            ? "email"
            : name === "phone"
              ? "tel"
              : name === "name"
                ? "name"
                : undefined
        }
        className="input-base"
      />
    </label>
  );
}
