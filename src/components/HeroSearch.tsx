"use client";

import { useState } from "react";
import { MessageCircle, MapPin, Calendar, Users } from "lucide-react";
import { RequestModal } from "@/components/RequestModal";

export interface HeroSearchLabels {
  region: string;
  regionAny: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  guestsAny: string;
  submit: string;
}

export interface HeroSearchProps {
  locale: string;
  labels: HeroSearchLabels;
  /** Region option list: { value: slug-or-name, label }. */
  regions: { value: string; label: string }[];
}

const GUEST_OPTIONS = ["1-2", "3-4", "5-6", "7+"] as const;

export function HeroSearch({ locale, labels, regions }: HeroSearchProps) {
  const [open, setOpen] = useState(false);
  const [region, setRegion] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  return (
    <>
      <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-white/15 bg-white/95 p-3 shadow-2xl backdrop-blur sm:p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Region */}
          <label className="flex flex-col gap-1 text-left">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
              <MapPin className="h-3.5 w-3.5 text-navy-600" />
              {labels.region}
            </span>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="input-base"
              style={{ fontSize: 16 }}
            >
              <option value="">{labels.regionAny}</option>
              {regions.map((r) => (
                <option key={r.value} value={r.label}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>

          {/* Check-in */}
          <label className="flex flex-col gap-1 text-left">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
              <Calendar className="h-3.5 w-3.5 text-navy-600" />
              {labels.checkIn}
            </span>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="input-base"
              style={{ fontSize: 16 }}
            />
          </label>

          {/* Check-out */}
          <label className="flex flex-col gap-1 text-left">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
              <Calendar className="h-3.5 w-3.5 text-navy-600" />
              {labels.checkOut}
            </span>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="input-base"
              style={{ fontSize: 16 }}
            />
          </label>

          {/* Guests */}
          <label className="flex flex-col gap-1 text-left">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
              <Users className="h-3.5 w-3.5 text-navy-600" />
              {labels.guests}
            </span>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="input-base"
              style={{ fontSize: 16 }}
            >
              <option value="">{labels.guestsAny}</option>
              {GUEST_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          data-lead="hero-search"
          className="btn-primary mt-3 w-full justify-center"
          style={{ minHeight: 48 }}
        >
          <MessageCircle className="h-4 w-4" />
          {labels.submit}
        </button>
      </div>

      <RequestModal
        open={open}
        onClose={() => setOpen(false)}
        locale={locale}
        prefilled={{ region, checkIn, checkOut, guests }}
      />
    </>
  );
}
