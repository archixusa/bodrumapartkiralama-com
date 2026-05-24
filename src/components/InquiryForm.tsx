"use client";

import { useState, useTransition, FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import {
  submitInquiry,
  type InquiryFormState,
  type ServiceType,
} from "@/app/actions/inquiryAction";
import { Link } from "@/i18n/routing";
import { trackLead } from "@/lib/analytics";

export interface InquiryFormProps {
  service: ServiceType;
  subjectLine: string;
  fields: {
    date?: boolean;
    people?: boolean;
    pickup?: boolean;
    dropoff?: boolean;
  };
  whatsappNumber: string;
  whatsappTemplate?: string;
}

export function InquiryForm({
  service,
  subjectLine,
  fields,
  whatsappNumber,
  whatsappTemplate,
}: InquiryFormProps) {
  const t = useTranslations("inquiry");
  const ft = useTranslations("footer");
  const today = new Date().toISOString().slice(0, 10);
  const locale = useLocale();

  const [date, setDate] = useState("");
  const [people, setPeople] = useState<number>(2);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [kvkk, setKvkk] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState<InquiryFormState>({ status: "idle" });
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!kvkk) {
      setState({ status: "error", message: "kvkk-required" });
      return;
    }
    startTransition(async () => {
      const result = await submitInquiry({
        service,
        subjectLine,
        date: fields.date ? date : undefined,
        people: fields.people ? people : undefined,
        pickup: fields.pickup ? pickup : undefined,
        dropoff: fields.dropoff ? dropoff : undefined,
        name,
        phone,
        email,
        note,
        honeypot,
        kvkk,
        locale,
      });
      setState(result);
      if (result.status === "success") {
        trackLead({
          kind: service === "general" ? "general" : service,
          subject: subjectLine,
        });
      }
    });
  };

  const waMessage = encodeURIComponent(
    whatsappTemplate ??
      `Merhaba, ${subjectLine} hakkında bilgi almak istiyorum.`
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
        <h3 className="text-xl">{t("title")}</h3>
        <p className="mt-1 text-xs text-muted">{t("subtitle")}</p>
      </div>

      {(fields.date || fields.people) && (
        <div className="grid grid-cols-2 gap-3">
          {fields.date && (
            <label className="block">
              <span className="label-base">{t("date")}</span>
              <input
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-base"
              />
            </label>
          )}
          {fields.people && (
            <label className="block">
              <span className="label-base">{t("people")}</span>
              <select
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
                className="input-base"
              >
                {Array.from({ length: 15 }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      )}

      {(fields.pickup || fields.dropoff) && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {fields.pickup && (
            <label className="block">
              <span className="label-base">{t("pickup")}</span>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="input-base"
                placeholder={t("pickupPlaceholder")}
              />
            </label>
          )}
          {fields.dropoff && (
            <label className="block">
              <span className="label-base">{t("dropoff")}</span>
              <input
                type="text"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                className="input-base"
                placeholder={t("dropoffPlaceholder")}
              />
            </label>
          )}
        </div>
      )}

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
          <span className="label-base">{t("email")} *</span>
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

      <label className="flex items-start gap-2 text-xs text-muted">
        <input
          type="checkbox"
          required
          checked={kvkk}
          onChange={(e) => setKvkk(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-[var(--color-border)] text-navy-900 focus:ring-navy-600"
        />
        <span>
          {t("kvkkPrefix")} {" "}
          <Link href="/kvkk" className="font-semibold text-navy-600 hover:underline">
            {ft("kvkk")}
          </Link>{" "}
          {t("kvkkSuffix")}
        </span>
      </label>

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
            <p>
              {state.message === "kvkk-required"
                ? t("kvkkRequired")
                : t("errorDesc")}
            </p>
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
