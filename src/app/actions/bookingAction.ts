"use server";

export interface BookingFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export interface BookingPayload {
  apartmentSlug: string;
  apartmentTitle: string;
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
  name: string;
  phone: string;
  email: string;
  note?: string;
  honeypot?: string;
  kvkk: boolean;
  locale: string;
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "info@bodrumapartkiralama.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "no-reply@bodrumapartkiralama.com";

export async function submitBooking(
  payload: BookingPayload
): Promise<BookingFormState> {
  if (payload.honeypot && payload.honeypot.trim() !== "") {
    return { status: "success" };
  }

  if (!payload.kvkk) {
    return { status: "error", message: "kvkk-required" };
  }

  if (
    !payload.apartmentSlug ||
    !payload.checkin ||
    !payload.checkout ||
    !payload.name ||
    !payload.phone ||
    !payload.email
  ) {
    return { status: "error", message: "missing-fields" };
  }

  const subject = `[Rezervasyon Talebi] ${payload.apartmentTitle}`;
  const text = `Yeni rezervasyon talebi alındı.

Apart: ${payload.apartmentTitle} (${payload.apartmentSlug})
Giriş: ${payload.checkin}
Çıkış: ${payload.checkout}
Yetişkin: ${payload.adults}
Çocuk: ${payload.children}

Ad Soyad: ${payload.name}
Telefon: ${payload.phone}
E-posta: ${payload.email}
Dil: ${payload.locale}

Not:
${payload.note || "—"}`;

  if (!RESEND_API_KEY) {
    // Do NOT log `text` — it contains guest PII (name/phone/email). Emit a
    // metadata-only warning so the misconfiguration is visible without leaking
    // personal data into server logs (KVKK).
    console.warn(
      "[bookingAction] RESEND_API_KEY missing — booking accepted but no email sent."
    );
    return { status: "success" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        reply_to: payload.email,
        subject,
        text,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error", res.status, err);
      return { status: "error", message: "send-failed" };
    }
    return { status: "success" };
  } catch (err) {
    console.error("Booking submit error", err);
    return { status: "error", message: "send-failed" };
  }
}
