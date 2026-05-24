"use server";

export type ServiceType = "boat" | "car" | "transfer" | "tour" | "general";

export interface InquiryFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export interface InquiryPayload {
  service: ServiceType;
  subjectLine: string;
  date?: string;
  people?: number;
  pickup?: string;
  dropoff?: string;
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

export async function submitInquiry(
  payload: InquiryPayload
): Promise<InquiryFormState> {
  if (payload.honeypot && payload.honeypot.trim() !== "") {
    return { status: "success" };
  }

  if (!payload.kvkk) {
    return { status: "error", message: "kvkk-required" };
  }

  if (!payload.name || !payload.phone || !payload.email) {
    return { status: "error", message: "missing-fields" };
  }

  const subject = `[Talep] ${payload.subjectLine}`;
  const text = `Yeni hizmet talebi alındı.

Hizmet: ${payload.service}
${payload.date ? `Tarih: ${payload.date}` : ""}
${payload.people ? `Kişi: ${payload.people}` : ""}
${payload.pickup ? `Alış: ${payload.pickup}` : ""}
${payload.dropoff ? `Bırakış: ${payload.dropoff}` : ""}

Ad Soyad: ${payload.name}
Telefon: ${payload.phone}
E-posta: ${payload.email}
Dil: ${payload.locale}

Not:
${payload.note || "—"}`;

  if (!RESEND_API_KEY) {
    console.log("\n=== INQUIRY (no RESEND_API_KEY, console-only) ===");
    console.log(text);
    console.log("=== END ===\n");
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
    console.error("Inquiry submit error", err);
    return { status: "error", message: "send-failed" };
  }
}
