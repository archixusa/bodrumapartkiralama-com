"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { X } from "lucide-react";

const STORAGE_KEY = "bak-season-banner-dismissed-v1";
const DISMISS_DAYS = 7;

/**
 * Thin promotional banner sitting above the site Header. Tells visitors the
 * 2026 season is open. Closing it stores a timestamp in localStorage and the
 * banner stays hidden for 7 days.
 */
export function SeasonBanner() {
  const locale = useLocale();
  const isTr = locale === "tr";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setVisible(true);
        return;
      }
      const ts = parseInt(raw, 10);
      if (Number.isNaN(ts)) {
        setVisible(true);
        return;
      }
      const elapsed = Date.now() - ts;
      const sevenDaysMs = DISMISS_DAYS * 24 * 60 * 60 * 1000;
      setVisible(elapsed > sevenDaysMs);
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore — banner will simply reappear next visit
    }
    setVisible(false);
  };

  if (!visible) return null;

  const message = isTr
    ? "🌊 2026 yazı için yerlerimizi ayırmaya başladık — tarihinizi paylaşın"
    : "🌊 2026 Season Is Open — Reach out for June–September booking requests";
  const closeLabel = isTr ? "Kapat" : "Close";

  return (
    <div className="relative bg-accent-500 text-white">
      <div className="container-page flex items-center justify-between gap-3 py-2 text-xs sm:text-sm">
        <p className="flex-1 text-center font-medium">{message}</p>
        <button
          type="button"
          onClick={dismiss}
          aria-label={closeLabel}
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition hover:bg-black/10"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
