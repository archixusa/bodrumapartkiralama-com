"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  X,
  Loader2,
  Check,
  AlertCircle,
  Calendar,
  Users,
  Phone,
  User,
  Mail,
  MessageSquare,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { trackLead } from "@/lib/analytics";
import { buildWaHref } from "@/lib/contact";
import { openDatePicker } from "@/lib/date-picker";

type Status = "idle" | "submitting" | "success" | "error";
type L = "tr" | "en" | "de" | "ru";

export interface RequestModalPrefill {
  region?: string;
  checkIn?: string;
  checkOut?: string;
  /** Range token: "1-2" | "3-4" | "5-6" | "7+" | "" */
  guests?: string;
  /** Sample property type, e.g. "Deniz Manzaralı 2+1". */
  propertyType?: string;
}

export interface RequestModalProps {
  open: boolean;
  onClose: () => void;
  prefilled?: RequestModalPrefill;
  locale: string;
}

const GUEST_OPTIONS = ["1-2", "3-4", "5-6", "7+"] as const;

/** Map a guest-range token to an integer for the DB int column. */
function guestsToInt(range: string): number | null {
  switch (range) {
    case "1-2":
      return 2;
    case "3-4":
      return 4;
    case "5-6":
      return 6;
    case "7+":
      return 7;
    default:
      return null;
  }
}

const copy: Record<
  L,
  {
    titleSearch: string;
    titleProperty: (type: string) => string;
    intro: string;
    region: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    guestsAny: string;
    name: string;
    phone: string;
    email: string;
    emailOptional: string;
    message: string;
    messageOptional: string;
    consent: React.ReactNode;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    successWhatsapp: string;
    errConsent: string;
    errSend: string;
    close: string;
  }
> = {
  tr: {
    titleSearch: "Müsaitlik & teklif talebi",
    titleProperty: (type) => `Teklif al: ${type}`,
    intro:
      "Tarihlerinizi ve iletişim bilginizi bırakın; size uygun seçenekleri ileteceğiz. Teklif istemek ücretsizdir; rezervasyon zorunluluğu yoktur.",
    region: "Bölge",
    checkIn: "Giriş tarihi",
    checkOut: "Çıkış tarihi",
    guests: "Kişi sayısı",
    guestsAny: "Farketmez",
    name: "Ad Soyad",
    phone: "Telefon / WhatsApp",
    email: "E-posta",
    emailOptional: "E-posta (opsiyonel)",
    message: "Mesajınız",
    messageOptional: "Mesajınız (opsiyonel)",
    consent: (
      <>
        İletişim bilgilerimin{" "}
        <a
          href="/kvkk"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-navy-700 underline"
        >
          KVKK Aydınlatma Metni
        </a>{" "}
        kapsamında işlenmesini onaylıyorum.
      </>
    ),
    submit: "Talep Oluştur",
    submitting: "Gönderiliyor...",
    successTitle: "Talebiniz alındı",
    // "24 saat" vaadi ContactForm/ReservationForm'daki mevcut operasyon
    // vaadiyle hizalı — uydurma süre değil, sitenin yerleşik taahhüdü.
    successBody:
      "Talebinizi aldık. En geç 24 saat içinde size uygun seçeneklerle dönüş yapacağız.",
    successWhatsapp: "Daha hızlı yanıt için WhatsApp'tan devam edin",
    errConsent: "Devam etmek için KVKK onayı vermelisiniz.",
    errSend: "Şu an gönderemedik. Lütfen WhatsApp'tan deneyin.",
    close: "Kapat",
  },
  en: {
    titleSearch: "Availability & quote request",
    titleProperty: (type) => `Get a quote: ${type}`,
    intro:
      "Leave your dates and contact details and we'll send you suitable options. Requesting an offer is free and doesn't oblige you to book.",
    region: "Region",
    checkIn: "Check-in date",
    checkOut: "Check-out date",
    guests: "Guests",
    guestsAny: "Any",
    name: "Full name",
    phone: "Phone / WhatsApp",
    email: "Email",
    emailOptional: "Email (optional)",
    message: "Your message",
    messageOptional: "Your message (optional)",
    consent: (
      <>
        I consent to my contact details being processed under our{" "}
        <a
          href="/kvkk"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-navy-700 underline"
        >
          KVKK privacy notice
        </a>
        .
      </>
    ),
    submit: "Send Request",
    submitting: "Sending...",
    successTitle: "Request received",
    successBody:
      "We have your request. We'll get back to you with suitable options within 24 hours.",
    successWhatsapp: "Continue on WhatsApp for a faster reply",
    errConsent: "Please confirm the KVKK consent to continue.",
    errSend: "Couldn't send right now. Please try via WhatsApp.",
    close: "Close",
  },
  de: {
    titleSearch: "Verfügbarkeits- & Angebotsanfrage",
    titleProperty: (type) => `Angebot anfordern: ${type}`,
    intro:
      "Hinterlassen Sie Ihre Reisedaten und Kontaktangaben — wir senden Ihnen passende Optionen. Ein Angebot anzufordern ist kostenlos und unverbindlich.",
    region: "Region",
    checkIn: "Anreisedatum",
    checkOut: "Abreisedatum",
    guests: "Personen",
    guestsAny: "Egal",
    name: "Vor- und Nachname",
    phone: "Telefon / WhatsApp",
    email: "E-Mail",
    emailOptional: "E-Mail (optional)",
    message: "Ihre Nachricht",
    messageOptional: "Ihre Nachricht (optional)",
    consent: (
      <>
        Ich willige in die Verarbeitung meiner Kontaktdaten gemäß unserer{" "}
        <a
          href="/kvkk"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-navy-700 underline"
        >
          KVKK-Datenschutzerklärung
        </a>{" "}
        ein.
      </>
    ),
    submit: "Anfrage senden",
    submitting: "Wird gesendet...",
    successTitle: "Anfrage erhalten",
    successBody:
      "Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden mit passenden Optionen.",
    successWhatsapp: "Für eine schnellere Antwort über WhatsApp fortfahren",
    errConsent: "Bitte bestätigen Sie die KVKK-Einwilligung, um fortzufahren.",
    errSend: "Senden gerade nicht möglich. Bitte über WhatsApp versuchen.",
    close: "Schließen",
  },
  ru: {
    titleSearch: "Запрос доступности и предложения",
    titleProperty: (type) => `Запросить предложение: ${type}`,
    intro:
      "Оставьте ваши даты и контактные данные — мы пришлём подходящие варианты. Запрос предложения бесплатен и ни к чему вас не обязывает.",
    region: "Район",
    checkIn: "Дата заезда",
    checkOut: "Дата выезда",
    guests: "Гостей",
    guestsAny: "Не важно",
    name: "Имя и фамилия",
    phone: "Телефон / WhatsApp",
    email: "Эл. почта",
    emailOptional: "Эл. почта (необязательно)",
    message: "Ваше сообщение",
    messageOptional: "Ваше сообщение (необязательно)",
    consent: (
      <>
        Я согласен(на) на обработку моих контактных данных в соответствии с{" "}
        <a
          href="/kvkk"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-navy-700 underline"
        >
          уведомлением о конфиденциальности KVKK
        </a>
        .
      </>
    ),
    submit: "Отправить запрос",
    submitting: "Отправка...",
    successTitle: "Запрос получен",
    successBody:
      "Мы получили ваш запрос и свяжемся с вами с подходящими вариантами в течение 24 часов.",
    successWhatsapp: "Для более быстрого ответа продолжите в WhatsApp",
    errConsent: "Пожалуйста, подтвердите согласие KVKK, чтобы продолжить.",
    errSend: "Сейчас не удалось отправить. Попробуйте, пожалуйста, через WhatsApp.",
    close: "Закрыть",
  },
};

export function RequestModal({ open, onClose, prefilled, locale }: RequestModalProps) {
  const t = copy[(locale as L) in copy ? (locale as L) : "en"];
  // Hata önleme (CRO): geçmiş tarihli ve çıkış<giriş talepler hem misafiri
  // bozuyor hem operasyona çöp kayıt düşürüyordu — InquiryForm'daki min deseni.
  const today = new Date().toISOString().slice(0, 10);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // Editable prefill state
  const [region, setRegion] = useState(prefilled?.region ?? "");
  const [checkIn, setCheckIn] = useState(prefilled?.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(prefilled?.checkOut ?? "");
  const [guests, setGuests] = useState(prefilled?.guests ?? "");

  // Sync prefill when the modal (re)opens with new context.
  useEffect(() => {
    if (open) {
      setRegion(prefilled?.region ?? "");
      setCheckIn(prefilled?.checkIn ?? "");
      setCheckOut(prefilled?.checkOut ?? "");
      setGuests(prefilled?.guests ?? "");
      setStatus("idle");
      setErrorMsg("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, prefilled?.region, prefilled?.checkIn, prefilled?.checkOut, prefilled?.guests]);

  // ESC to close + body scroll lock + focus management while open (WCAG
  // 2.4.3): açılışta odak kapat butonuna gider, Tab/Shift+Tab diyalog içinde
  // hapsedilir, kapanışta odak tetikleyiciye iade edilir.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const node = dialogRef.current;
      if (!node) return;
      const focusables = Array.from(
        node.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !node.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !node.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  // Submit başarıyla bitince form DOM'dan sökülür; odağı başarı başlığına
  // taşıyoruz ki ekran okuyucu/klavye kullanıcısı duyuruyu alsın, odak body'ye
  // düşmesin (WCAG 2.4.3 + 4.1.3 — başlık ayrıca role="status").
  useEffect(() => {
    if (status === "success") {
      successHeadingRef.current?.focus();
    }
  }, [status]);

  if (!open) return null;

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot tripwire — silently succeed for bots.
    if (String(data.get("website") || "").trim() !== "") {
      setStatus("success");
      return;
    }

    const consent = data.get("consent") === "on";
    if (!consent) {
      setStatus("error");
      setErrorMsg(t.errConsent);
      return;
    }

    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim() || null;
    const userMessage = String(data.get("message") || "").trim();

    // Fold the source + property type into the message (no `source` column).
    const sourceTag = prefilled?.propertyType
      ? `örnek kart: ${prefilled.propertyType}`
      : "hero_search";
    const messageParts = [`[${sourceTag}]`];
    if (userMessage) messageParts.push(userMessage);
    const message = messageParts.join(" ");

    const payload = {
      source_site: "bodrumapartkiralama",
      region: region.trim() || null,
      check_in: checkIn || null,
      check_out: checkOut || null,
      guests_count: guestsToInt(guests),
      guest_name: name,
      guest_phone: phone,
      guest_email: email,
      message,
      status: "new",
    };

    setStatus("submitting");
    setErrorMsg("");
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase env missing");
      }
      const res = await fetch(`${supabaseUrl}/rest/v1/reservation_requests`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
      }
      trackLead({ kind: "booking", subject: sourceTag });
      setStatus("success");
    } catch (err) {
      console.error("[RequestModal]", err);
      setStatus("error");
      setErrorMsg(t.errSend);
    }
  };

  const title = prefilled?.propertyType
    ? t.titleProperty(prefilled.propertyType)
    : t.titleSearch;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="request-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/55 p-4 sm:items-center"
    >
      <div
        ref={dialogRef}
        className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-xl bg-white shadow-2xl"
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label={t.close}
          className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-md bg-white/80 text-muted hover:bg-navy-50"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "success" ? (
          <div
            role="status"
            className="flex flex-col items-center gap-3 p-8 text-center"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
              <Check className="h-6 w-6" />
            </span>
            <h2
              ref={successHeadingRef}
              tabIndex={-1}
              className="text-xl font-bold text-navy-900 outline-none"
            >
              {t.successTitle}
            </h2>
            <p className="text-sm text-muted">{t.successBody}</p>
            {/* Sıcak lead'i en sıcak anında ikinci, daha hızlı kanala taşı —
                InquiryForm'un başarı ekranındaki yerleşik desen (CRO). */}
            <a
              href={buildWaHref(locale, "talep-sonrasi")}
              target="_blank"
              rel="noopener noreferrer"
              data-lead="request-modal-success-whatsapp"
              className="btn-whatsapp mt-2 justify-center"
              style={{ minHeight: 44 }}
            >
              <MessageCircle className="h-4 w-4" />
              {t.successWhatsapp}
            </a>
          </div>
        ) : (
          <>
            <div className="bg-navy-900 px-6 py-5 text-white">
              <h2 id="request-modal-title" className="text-lg font-bold text-white">
                {title}
              </h2>
              <p className="mt-1 text-sm text-white/85">{t.intro}</p>
            </div>
            <form onSubmit={submit} className="space-y-3 p-6">
              {/* Region */}
              <label className="flex flex-col gap-1">
                <span className="label-base inline-flex items-center gap-1 text-sm normal-case">
                  <MapPin className="h-4 w-4 text-navy-600" />
                  {t.region}
                </span>
                <input
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="input-base"
                  style={{ fontSize: 16 }}
                />
              </label>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1">
                  <span className="label-base inline-flex items-center gap-1 text-sm normal-case">
                    <Calendar className="h-4 w-4 text-navy-600" />
                    {t.checkIn}
                  </span>
                  <input
                    type="date"
                    value={checkIn}
                    min={today}
                    onChange={(e) => {
                      const next = e.target.value;
                      setCheckIn(next);
                      // Çıkış girişten önce kalamaz — geçersizleşen çıkışı sıfırla.
                      if (checkOut && next && checkOut < next) setCheckOut("");
                    }}
                    onFocus={openDatePicker}
                    onClick={openDatePicker}
                    className="input-base"
                    style={{ fontSize: 16 }}
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="label-base inline-flex items-center gap-1 text-sm normal-case">
                    <Calendar className="h-4 w-4 text-navy-600" />
                    {t.checkOut}
                  </span>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || today}
                    onChange={(e) => setCheckOut(e.target.value)}
                    onFocus={openDatePicker}
                    onClick={openDatePicker}
                    className="input-base"
                    style={{ fontSize: 16 }}
                  />
                </label>
              </div>

              {/* Guests */}
              <label className="flex flex-col gap-1">
                <span className="label-base inline-flex items-center gap-1 text-sm normal-case">
                  <Users className="h-4 w-4 text-navy-600" />
                  {t.guests}
                </span>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="input-base"
                  style={{ fontSize: 16 }}
                >
                  <option value="">{t.guestsAny}</option>
                  {GUEST_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </label>

              {/* Name (required) */}
              <label className="flex flex-col gap-1">
                <span className="label-base inline-flex items-center gap-1 text-sm normal-case">
                  <User className="h-4 w-4 text-navy-600" />
                  {t.name}
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  className="input-base"
                  style={{ fontSize: 16 }}
                />
              </label>

              {/* Phone (required) */}
              <label className="flex flex-col gap-1">
                <span className="label-base inline-flex items-center gap-1 text-sm normal-case">
                  <Phone className="h-4 w-4 text-navy-600" />
                  {t.phone}
                </span>
                <input
                  type="tel"
                  name="phone"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+90 5xx xxx xx xx"
                  className="input-base"
                  style={{ fontSize: 16 }}
                />
              </label>

              {/* Email (optional) */}
              <label className="flex flex-col gap-1">
                <span className="label-base inline-flex items-center gap-1 text-sm normal-case">
                  <Mail className="h-4 w-4 text-navy-600" />
                  {t.emailOptional}
                </span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="input-base"
                  style={{ fontSize: 16 }}
                />
              </label>

              {/* Message (optional) */}
              <label className="flex flex-col gap-1">
                <span className="label-base inline-flex items-center gap-1 text-sm normal-case">
                  <MessageSquare className="h-4 w-4 text-navy-600" />
                  {t.messageOptional}
                </span>
                <textarea
                  name="message"
                  rows={2}
                  className="input-base"
                  style={{ fontSize: 16 }}
                />
              </label>

              {/* Honeypot */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {/* KVKK consent */}
              <label className="flex items-start gap-2 text-xs text-muted">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-[var(--color-border)] text-navy-600 focus:ring-navy-600"
                />
                <span>{t.consent}</span>
              </label>

              {status === "error" && errorMsg && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-md border border-danger/30 bg-danger/5 p-3 text-xs text-danger"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary w-full justify-center disabled:opacity-60"
                style={{ minHeight: 44 }}
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
          </>
        )}
      </div>
    </div>
  );
}
