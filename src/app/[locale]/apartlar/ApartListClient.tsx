"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { SlidersHorizontal, X } from "lucide-react";
import { ApartCard } from "@/components/ApartCard";
import type { Apartment } from "@/data/apartments";
import { districts } from "@/data/districts";

export function ApartListClient({ apartments }: { apartments: Apartment[] }) {
  const t = useTranslations("apartList");
  const dt = useTranslations("districts");
  const params = useSearchParams();

  const initialDistrict = params.get("district") || "";
  const initialGuests = Number(params.get("guests") || 0);

  const [district, setDistrict] = useState(initialDistrict);
  const [guests, setGuests] = useState<number>(initialGuests);
  const [priceMin, setPriceMin] = useState<number | "">("");
  const [priceMax, setPriceMax] = useState<number | "">("");
  const [sort, setSort] = useState("featured");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = apartments.filter((a) => {
      if (district && a.district !== district) return false;
      if (guests && a.capacity < guests) return false;
      if (priceMin !== "" && a.highSeasonPrice < priceMin) return false;
      if (priceMax !== "" && a.lowSeasonPrice > priceMax) return false;
      return true;
    });
    switch (sort) {
      case "priceAsc":
        list = [...list].sort((a, b) => a.lowSeasonPrice - b.lowSeasonPrice);
        break;
      case "priceDesc":
        list = [...list].sort((a, b) => b.highSeasonPrice - a.highSeasonPrice);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort(
          (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false)
        );
    }
    return list;
  }, [apartments, district, guests, priceMin, priceMax, sort]);

  const reset = () => {
    setDistrict("");
    setGuests(0);
    setPriceMin("");
    setPriceMax("");
    setSort("featured");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className={`${open ? "fixed inset-0 z-40 overflow-y-auto bg-white p-4 lg:static lg:p-0 lg:block" : "hidden lg:block"}`}>
        <div className="lg:sticky lg:top-20">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold">{t("filterTitle")}</h3>
            <div className="flex items-center gap-2">
              <button onClick={reset} className="text-xs font-semibold text-navy-600 hover:underline">
                {t("filterReset")}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded p-1 lg:hidden"
                aria-label="close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="space-y-5 rounded-xl border border-[var(--color-border)] bg-white p-4">
            <div>
              <label className="label-base">{t("filterDistrict")}</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="input-base"
              >
                <option value="">—</option>
                {districts.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {dt(d.slug)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-base">{t("filterGuests")}</label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="input-base"
              >
                <option value={0}>—</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n}+
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-base">{t("filterPrice")}</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder={t("filterPriceMin")}
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value === "" ? "" : Number(e.target.value))}
                  className="input-base"
                />
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder={t("filterPriceMax")}
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value === "" ? "" : Number(e.target.value))}
                  className="input-base"
                />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div>
        <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">{t("resultsCount", { count: filtered.length })}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="btn-secondary !py-2 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {t("filterTitle")}
            </button>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted">{t("sortBy")}:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm font-medium"
              >
                <option value="featured">{t("sortFeatured")}</option>
                <option value="priceAsc">{t("sortPriceAsc")}</option>
                <option value="priceDesc">{t("sortPriceDesc")}</option>
                <option value="rating">{t("sortRating")}</option>
              </select>
            </label>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[var(--color-border)] bg-white p-10 text-center text-muted">
            {t("noResults")}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((apt) => (
              <ApartCard key={apt.id} apt={apt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
