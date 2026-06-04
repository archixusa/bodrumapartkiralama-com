"use client";

import { MapPin, Users } from "lucide-react";

type L = "tr" | "en" | "de" | "ru";

interface Props {
  locale: string;
  /** Region options: { value: slug, label }. */
  regions: { value: string; label: string }[];
  /**
   * When true the bar is a non-interactive placeholder (no inventory yet).
   * It still renders so the page reads like a real catalogue surface.
   */
  disabled?: boolean;
}

const copy: Record<
  L,
  { region: string; regionAny: string; guests: string; guestsAny: string; note: string }
> = {
  tr: {
    region: "Bölge",
    regionAny: "Tüm bölgeler",
    guests: "Kişi",
    guestsAny: "Farketmez",
    note: "Filtreler apart listemiz açıldığında etkinleşecek.",
  },
  en: {
    region: "Region",
    regionAny: "All regions",
    guests: "Guests",
    guestsAny: "Any",
    note: "Filters become active once our apartment list goes live.",
  },
  de: {
    region: "Region",
    regionAny: "Alle Regionen",
    guests: "Personen",
    guestsAny: "Egal",
    note: "Die Filter werden aktiv, sobald unsere Apartmentliste online geht.",
  },
  ru: {
    region: "Район",
    regionAny: "Все районы",
    guests: "Гостей",
    guestsAny: "Не важно",
    note: "Фильтры станут активными, когда наш список апартаментов будет опубликован.",
  },
};

const GUEST_OPTIONS = ["1-2", "3-4", "5-6", "7+"] as const;

/**
 * Region + guests filter bar. Always visible; rendered `disabled` while there
 * is no inventory (a placeholder for when the catalogue goes live).
 */
export function ApartlarFilterBar({ locale, regions, disabled = false }: Props) {
  const t = copy[(locale as L) in copy ? (locale as L) : "en"];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid gap-3 rounded-xl border border-[var(--color-border)] bg-white p-3 shadow-card sm:grid-cols-2 sm:p-4">
        {/* Region */}
        <label className="flex flex-col gap-1 text-left">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
            <MapPin className="h-3.5 w-3.5 text-navy-600" />
            {t.region}
          </span>
          <select
            disabled={disabled}
            defaultValue=""
            aria-label={t.region}
            className="input-base disabled:cursor-not-allowed disabled:opacity-60"
            style={{ fontSize: 16 }}
          >
            <option value="">{t.regionAny}</option>
            {regions.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </label>

        {/* Guests */}
        <label className="flex flex-col gap-1 text-left">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
            <Users className="h-3.5 w-3.5 text-navy-600" />
            {t.guests}
          </span>
          <select
            disabled={disabled}
            defaultValue=""
            aria-label={t.guests}
            className="input-base disabled:cursor-not-allowed disabled:opacity-60"
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
      </div>
      {disabled && (
        <p className="mt-2 text-center text-xs text-muted">{t.note}</p>
      )}
    </div>
  );
}
