"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Cookie, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "@/i18n/routing";

const STORAGE_KEY = "bak-cookie-consent-v1";

type Decision = "accept-all" | "necessary-only" | "custom";

interface ConsentState {
  decision: Decision;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

/**
 * Reads current cookie consent.
 * Useful for analytics scripts and similar consumers.
 * Returns `null` if the user has not yet decided.
 */
export function readCookieConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const locale = useLocale();
  const isTr = locale === "tr";
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readCookieConsent();
    if (!existing) setVisible(true);
  }, []);

  const persist = (state: ConsentState) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      window.dispatchEvent(new CustomEvent("bak:cookie-consent", { detail: state }));
    } catch {
      // ignore
    }
  };

  const acceptAll = () => {
    persist({
      decision: "accept-all",
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    });
    setVisible(false);
  };

  const necessaryOnly = () => {
    persist({
      decision: "necessary-only",
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    });
    setVisible(false);
  };

  const saveCustom = () => {
    persist({
      decision: "custom",
      analytics,
      marketing,
      timestamp: Date.now(),
    });
    setVisible(false);
  };

  if (!visible) return null;

  const t = isTr
    ? {
        title: "Çerez kullanımı hakkında",
        body:
          "Sitenin temel işlevleri için gerekli çerezleri kullanıyoruz. Trafiği anlamak için analitik çerezleri de kullanabiliriz; tercihinizi aşağıdan belirleyebilirsiniz.",
        link: "Çerez politikası",
        acceptAll: "Tüm Çerezleri Kabul Et",
        necessary: "Sadece Gerekli",
        manage: "Ayarları Yönet",
        save: "Tercihleri Kaydet",
        hide: "Gizle",
        necessaryLabel: "Zorunlu çerezler",
        necessaryDesc:
          "Sitenin çalışması için gerekli (oturum, dil tercihi, çerez tercihiniz). Bu çerezler kapatılamaz.",
        analyticsLabel: "Analitik çerezler",
        analyticsDesc:
          "Anonim trafik verisiyle sayfa kullanımını anlamak için (örn. Google Analytics).",
        marketingLabel: "Pazarlama çerezleri",
        marketingDesc:
          "Üçüncü taraf reklam ve yeniden hedefleme için (şu anda site bu çerezleri kullanmıyor; ileride etkinleştirilebilir).",
      }
    : {
        title: "About cookie usage",
        body:
          "We use cookies necessary for core site functions. We may also use analytics cookies to understand traffic; you can choose your preference below.",
        link: "Cookie policy",
        acceptAll: "Accept All Cookies",
        necessary: "Necessary Only",
        manage: "Manage Settings",
        save: "Save Preferences",
        hide: "Hide",
        necessaryLabel: "Necessary cookies",
        necessaryDesc:
          "Required for the site to function (session, language preference, your cookie choice). These cannot be disabled.",
        analyticsLabel: "Analytics cookies",
        analyticsDesc:
          "Anonymous traffic data to understand site usage (e.g. Google Analytics).",
        marketingLabel: "Marketing cookies",
        marketingDesc:
          "Third-party advertising and retargeting (the site does not currently use these; may be enabled later).",
      };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--color-border)] bg-white shadow-cardHover"
    >
      <div className="container-page py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-accent-500" />
              <p
                id="cookie-consent-title"
                className="text-sm font-semibold text-navy-900"
              >
                {t.title}
              </p>
            </div>
            <p className="text-sm text-muted">
              {t.body}{" "}
              <Link
                href="/cerez-politikasi"
                className="text-navy-600 underline hover:text-navy-900"
              >
                {t.link}
              </Link>
            </p>

            {showDetails && (
              <div className="mt-3 space-y-3 rounded-md border border-[var(--color-border)] bg-navy-50/40 p-3">
                <DetailRow
                  label={t.necessaryLabel}
                  desc={t.necessaryDesc}
                  checked
                  disabled
                />
                <DetailRow
                  label={t.analyticsLabel}
                  desc={t.analyticsDesc}
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <DetailRow
                  label={t.marketingLabel}
                  desc={t.marketingDesc}
                  checked={marketing}
                  onChange={setMarketing}
                />
              </div>
            )}
          </div>

          <div className="flex shrink-0 flex-col gap-2 md:items-end">
            <div className="flex flex-wrap gap-2">
              <button onClick={acceptAll} className="btn-primary !py-2 !text-xs">
                {t.acceptAll}
              </button>
              <button
                onClick={necessaryOnly}
                className="btn-secondary !py-2 !text-xs"
              >
                {t.necessary}
              </button>
            </div>
            {!showDetails ? (
              <button
                onClick={() => setShowDetails(true)}
                className="inline-flex items-center gap-1 text-xs font-medium text-navy-600 hover:underline"
              >
                {t.manage}
                <ChevronDown className="h-3 w-3" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={saveCustom}
                  className="btn-secondary !py-2 !text-xs"
                >
                  {t.save}
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-navy-600 hover:underline"
                >
                  {t.hide}
                  <ChevronUp className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>

          <button
            onClick={necessaryOnly}
            aria-label={isTr ? "Kapat" : "Close"}
            className="absolute right-3 top-3 rounded-md p-1 text-muted hover:bg-navy-50 md:static md:self-start"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  desc,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-xs text-ink">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-[var(--color-border)] text-navy-600 focus:ring-navy-600 disabled:opacity-50"
      />
      <span className="flex-1">
        <span className="block font-semibold text-navy-900">{label}</span>
        <span className="mt-0.5 block text-muted">{desc}</span>
      </span>
    </label>
  );
}
