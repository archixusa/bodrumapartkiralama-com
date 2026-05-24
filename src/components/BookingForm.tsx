"use client";

import { useState, useTransition, FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MessageCircle, CheckCircle2, AlertCircle } from "lucide-react";
import {
  submitBooking,
  type BookingFormState,
} from "@/app/actions/bookingAction";
import { formatTRY } from "@/lib/format";

interface Props {
  apartmentSlug: string;
  apartmentTitle: string;
  capacity: number;
  highSeasonPrice: number;
  lowSeasonPrice: number;
  whatsappNumber: string;
}

export function BookingForm({
  apartmentSlug,
  apartmentTitle,
  capacity,
  highSeasonPrice,
  lowSeasonPrice,
  whatsappNumber,
}: Props) {
  const t = useTranslations("apartDetail");
  const locale = useLocale();
  const today = new Date().toISOString().slice(0, 10);

  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState<BookingFormState>({ status: "idle" });
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await submitBooking({
        apartmentSlug,
        apartmentTitle,
        checkin,
        checkout,
        adults,
        children,
        name,
        phone,
        email,
        note,
        honeypot,
        locale,
      });
      setState(result);
    });
  };

  const waMessage = encodeURIComponent(
    `Merhaba, ${apartmentTitle} için rezervasyon yapmak istiyorum.\nGiriş: ${checkin || "—"}\nÇıkış: ${checkout || "—"}\nKişi: ${adults}+${children}\nAd: ${name || "—"}`
  );

  if (state.status === "success") {
    return (
      <div className="card flex flex-col gap-4 p-6 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
        <h3 className="text-xl">{t("successTitle")}</h3>
        <p className="text-sm text-muted">{t("successDesc")}</p>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <MessageCircle className="h-4 w-4" />
          {t("whatsappCta")}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card flex flex-col gap-4 p-5">
      <div>
        <h3 className="text-xl">{t("bookTitle")}</h3>
        <p className="mt-1 text-xs text-muted">{t("bookSubtitle")}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 rounded-md bg-navy-50 p-3 text-xs">
        <div>
          <p className="text-muted">{t("highSeason")}</p>
          <p className="text-sm font-bold text-navy-900">{formatTRY(highSeasonPrice)}</p>
        </div>
        <div>
          <p className="text-muted">{t("lowSeason")}</p>
          <p className="text-sm font-bold text-navy-900">{formatTRY(lowSeasonPrice)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="label-base">{t("checkin")} *</span>
          <input
            type="date"
            required
            min={today}
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            className="input-base"
          />
        </label>
        <label className="block">
          <span className="label-base">{t("checkout")} *</span>
          <input
            type="date"
            required
            min={checkin || today}
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            className="input-base"
          />
        </label>
        <label className="block">
          <span className="label-base">{t("adults")}</span>
          <select
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="input-base"
          >
            {Array.from({ length: capacity }).map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="label-base">{t("children")}</span>
          <select
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="input-base"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="label-base">{t("name")} *</span>
        <input
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-base"
        />
      </label>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="label-base">{t("phone")} *</span>
          <input
            type="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input-base"
            placeholder="+90 5xx xxx xx xx"
          />
        </label>
        <label className="block">
          <span className="label-base">{t("emailField")} *</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-base"
          />
        </label>
      </div>
      <label className="block">
        <span className="label-base">{t("note")}</span>
        <textarea
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t("notePlaceholder")}
          className="input-base"
        />
      </label>

      {/* honeypot */}
      <input
        type="text"
        name="company"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {state.status === "error" && (
        <div className="flex items-start gap-2 rounded-md border border-danger/40 bg-danger/5 p-3 text-xs text-danger">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <div>
            <p className="font-semibold">{t("errorTitle")}</p>
            <p>{t("errorDesc")}</p>
          </div>
        </div>
      )}

      <button type="submit" disabled={pending} className="btn-primary justify-center">
        {pending ? t("submitting") : t("submit")}
      </button>

      <a
        href={`https://wa.me/${whatsappNumber}?text=${waMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary justify-center"
      >
        <MessageCircle className="h-4 w-4" />
        {t("whatsappCta")}
      </a>
    </form>
  );
}
