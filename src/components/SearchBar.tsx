"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Search, Calendar, Users, MapPin } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { districts } from "@/data/districts";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("home");
  const c = useTranslations("common");
  const dt = useTranslations("districts");
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);

  const [district, setDistrict] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(2);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (district) params.set("district", district);
    if (checkin) params.set("checkin", checkin);
    if (checkout) params.set("checkout", checkout);
    if (guests) params.set("guests", String(guests));
    router.push(`/apartlar?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      className={`grid w-full gap-2 rounded-xl border border-[var(--color-border)] bg-white p-3 shadow-cardHover md:grid-cols-[1.4fr_1fr_1fr_0.9fr_auto] ${compact ? "" : "md:p-4"}`}
    >
      <Field icon={<MapPin className="h-4 w-4" />} label={t("searchDistrict")}>
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="input-base min-h-0 border-none p-0 text-base font-medium focus:ring-0"
        >
          <option value="">{t("searchDistrictAny")}</option>
          {districts.map((d) => (
            <option key={d.slug} value={d.slug}>
              {dt(d.slug)}
            </option>
          ))}
        </select>
      </Field>
      <Field icon={<Calendar className="h-4 w-4" />} label={t("searchCheckin")}>
        <input
          type="date"
          min={today}
          value={checkin}
          onChange={(e) => setCheckin(e.target.value)}
          className="input-base min-h-0 border-none p-0 text-base font-medium focus:ring-0"
        />
      </Field>
      <Field icon={<Calendar className="h-4 w-4" />} label={t("searchCheckout")}>
        <input
          type="date"
          min={checkin || today}
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
          className="input-base min-h-0 border-none p-0 text-base font-medium focus:ring-0"
        />
      </Field>
      <Field icon={<Users className="h-4 w-4" />} label={t("searchGuests")}>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="input-base min-h-0 border-none p-0 text-base font-medium focus:ring-0"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>
              {t("searchGuestsCount", { count: n })}
            </option>
          ))}
        </select>
      </Field>
      <button type="submit" className="btn-primary h-full min-h-[56px] !rounded-md md:!rounded-md">
        <Search className="h-5 w-5" />
        <span className="hidden sm:inline">{t("searchCta")}</span>
        <span className="sm:hidden">{c("search")}</span>
      </button>
    </form>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex w-full cursor-pointer items-center gap-3 rounded-md border border-[var(--color-border)] bg-white px-3 py-2 transition focus-within:border-navy-600 focus-within:ring-2 focus-within:ring-navy-200">
      <span className="text-navy-600">{icon}</span>
      <span className="flex w-full flex-col">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted">
          {label}
        </span>
        {children}
      </span>
    </label>
  );
}
