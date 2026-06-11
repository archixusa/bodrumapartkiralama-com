"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { X, Loader2, Check, AlertCircle, Calendar, Users, Phone } from "lucide-react";
import { trackLead } from "@/lib/analytics";
import { openDatePicker } from "@/lib/date-picker";

// Frekans sınırı (DESIGN_SPEC.md v4 EK — ÇIKIŞ-NİYETİ POP-UP'INI SEYREKLEŞTİR):
// oturum başına 1 (sessionStorage) yerine localStorage + 7 GÜNLÜK son-gösterim
// damgası. Gösterildiğinde {"t": <epoch-ms>} yazılır; açılışta okunur ve 7 gün
// içinde tekrar gösterilmez. localStorage erişilemezse shownRef fallback'i kalır.
const STORAGE_KEY = "bak-exit-intent-shown";
const FREQUENCY_WINDOW_MS = 604_800_000; // 7 gün = 7 * 24 * 60 * 60 * 1000

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Exit-intent capture modal — at most once per 7-day window (localStorage).
 *
 * Triggers:
 *   - Desktop: mouseleave with clientY < 0 (cursor going to address/tab bar).
 *   - Mobile: either 50% scroll then a hashchange/popstate (back), or 100s
 *     dwell time as a fallback.
 *
 * Submit posts to Supabase REST `contact_messages` with
 * source_site=bodrumapartkiralama and a special source_page so we can
 * distinguish exit-intent leads from regular contact form submissions.
 */
export function ExitIntentModal() {
  const locale = useLocale();
  const isTr = locale === "tr";
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const shownRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Show at most once per 7-day window (localStorage timestamp), then never
  // again until the window elapses.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const shownAt = Number(JSON.parse(raw)?.t);
        if (
          Number.isFinite(shownAt) &&
          Date.now() - shownAt < FREQUENCY_WINDOW_MS
        ) {
          shownRef.current = true;
          return;
        }
      }
    } catch {
      // localStorage unavailable / malformed; we'll still cap with shownRef
    }

    const isMobile =
      window.matchMedia("(max-width: 768px)").matches ||
      "ontouchstart" in window;

    const trigger = () => {
      if (shownRef.current) return;
      shownRef.current = true;
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ t: Date.now() }),
        );
      } catch {
        // ignore
      }
      setOpen(true);
    };

    if (!isMobile) {
      const onMouseLeave = (e: MouseEvent) => {
        if (e.clientY < 0) trigger();
      };
      document.addEventListener("mouseleave", onMouseLeave);
      return () => document.removeEventListener("mouseleave", onMouseLeave);
    }

    // Mobile: 50% scroll + back navigation OR 100s dwell
    let scrolledHalf = false;
    const onScroll = () => {
      const ratio =
        (window.scrollY + window.innerHeight) /
        Math.max(document.documentElement.scrollHeight, 1);
      if (ratio >= 0.5) scrolledHalf = true;
    };
    const onPop = () => {
      if (scrolledHalf) trigger();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPop);
    const dwellTimer = window.setTimeout(trigger, 100_000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPop);
      window.clearTimeout(dwellTimer);
    };
  }, []);

  // ESC to close + body scroll lock + focus management while open (WCAG
  // 2.4.3 / 2.1.2 / 4.1.2): açılışta odak kapat butonuna gider, Tab/Shift+Tab
  // diyalog içinde hapsedilir, kapanışta odak tetikleyiciye iade edilir.
  // RequestModal.tsx'teki yerleşik desenin birebir uyarlaması.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
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
  }, [open]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot tripwire — show success silently if a bot filled it.
    const honeypotValue = String(data.get("website") || "").trim();
    if (honeypotValue !== "") {
      setStatus("success");
      return;
    }
    const consent = data.get("consent") === "on";
    if (!consent) {
      setStatus("error");
      setErrorMsg(
        isTr
          ? "Devam etmek için KVKK onayı vermelisiniz."
          : "Please confirm the KVKK consent to continue.",
      );
      return;
    }
    const payload = {
      source_site: "bodrumapartkiralama",
      source_page: "exit-intent-modal",
      locale,
      name: null as string | null,
      email: null as string | null,
      phone: String(data.get("whatsapp") || "").trim() || null,
      subject: "reservation",
      message: JSON.stringify({
        intent: "exit-intent-capture",
        check_in: String(data.get("date") || "") || null,
        guests: String(data.get("guests") || "") || null,
        whatsapp: String(data.get("whatsapp") || "") || null,
      }),
    };

    setStatus("submitting");
    setErrorMsg("");
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase env missing");
      }
      const res = await fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
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
      trackLead({ kind: "exit_intent" });
      setStatus("success");
    } catch (err) {
      console.error("[ExitIntentModal]", err);
      setStatus("error");
      setErrorMsg(
        isTr
          ? "Şu an gönderemedik. Lütfen WhatsApp'tan deneyin."
          : "Couldn't send right now. Please try via WhatsApp.",
      );
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/55 p-4 sm:items-center"
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl"
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={() => setOpen(false)}
          aria-label={isTr ? "Kapat" : "Close"}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-navy-50"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 p-8 text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
              <Check className="h-6 w-6" />
            </span>
            <h2 className="text-xl font-bold text-navy-900">
              {isTr ? "Teşekkürler!" : "Thank you!"}
            </h2>
            <p className="text-sm text-muted">
              {isTr
                ? "Mesajınızı aldık. Mesai saatleri içinde dönüş yapacağız."
                : "We have your details — we'll be in touch during business hours."}
            </p>
          </div>
        ) : (
          <>
            <div className="bg-navy-900 px-6 py-5 text-white">
              <h2 id="exit-intent-title" className="text-lg font-bold">
                {isTr ? "Bodrum tarihinizi paylaşın" : "Share your Bodrum dates"}
              </h2>
              <p className="mt-1 text-sm text-white/85">
                {isTr
                  ? "Tatil tarihinizi söyleyin, size birkaç apart seçeneği iletelim."
                  : "Tell us your travel dates and we'll suggest a few apartments."}
              </p>
            </div>
            <form onSubmit={submit} className="space-y-3 p-6">
              <label className="flex flex-col gap-1">
                <span className="label-base inline-flex items-center gap-1 text-sm">
                  <Calendar className="h-4 w-4 text-navy-600" />
                  {isTr ? "Giriş tarihi" : "Check-in date"}
                </span>
                <input
                  type="date"
                  name="date"
                  required
                  onFocus={openDatePicker}
                  onClick={openDatePicker}
                  className="input-base"
                  style={{ fontSize: 16 }}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="label-base inline-flex items-center gap-1 text-sm">
                  <Users className="h-4 w-4 text-navy-600" />
                  {isTr ? "Kişi sayısı" : "Guests"}
                </span>
                <input
                  type="number"
                  name="guests"
                  min={1}
                  max={20}
                  defaultValue={2}
                  required
                  className="input-base"
                  style={{ fontSize: 16 }}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="label-base inline-flex items-center gap-1 text-sm">
                  <Phone className="h-4 w-4 text-navy-600" />
                  {isTr ? "WhatsApp numaranız" : "WhatsApp number"}
                </span>
                <input
                  type="tel"
                  name="whatsapp"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+90 5xx xxx xx xx"
                  className="input-base"
                  style={{ fontSize: 16 }}
                />
              </label>

              {/* Honeypot — hidden from real users; bots fill it. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <label className="flex items-start gap-2 text-xs text-muted">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-[var(--color-border)] text-navy-600 focus:ring-navy-600"
                />
                <span>
                  {isTr ? (
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
                  ) : (
                    <>
                      I consent to my contact details being processed under our
                      KVKK privacy notice.
                    </>
                  )}
                </span>
              </label>

              {status === "error" && errorMsg && (
                <div className="flex items-start gap-2 rounded-md border border-danger/30 bg-danger/5 p-3 text-xs text-danger">
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
                    {isTr ? "Gönderiliyor..." : "Sending..."}
                  </>
                ) : isTr ? (
                  "Bana Uygun Apartları İste"
                ) : (
                  "Send Options"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
