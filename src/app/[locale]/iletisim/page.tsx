import { getTranslations, setRequestLocale } from "next-intl/server";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: "nav" });
  const c = await getTranslations({ locale, namespace: "common" });
  const isTr = locale === "tr";

  return (
    <section className="section">
      <div className="container-page max-w-3xl">
        <h1>{nav("contact")}</h1>
        <p className="mt-3 text-muted">
          {isTr
            ? "WhatsApp en hızlı kanalımız. E-posta ve telefondan da ulaşabilirsiniz."
            : "WhatsApp is our fastest channel. You can also reach us by email or phone."}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            href={`https://wa.me/${c("whatsappNumber")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-start gap-3 p-5 hover:border-navy-600"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#25D366]/10 text-[#25D366]">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">WhatsApp</p>
              <p className="text-xs text-muted">{c("phoneDisplay")}</p>
            </div>
          </a>
          <a href={`tel:${c("phone").replace(/\s/g, "")}`} className="card flex items-start gap-3 p-5">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-navy-50 text-navy-900">
              <Phone className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">{c("call")}</p>
              <p className="text-xs text-muted">{c("phoneDisplay")}</p>
            </div>
          </a>
          <a href={`mailto:${c("email")}`} className="card flex items-start gap-3 p-5">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-navy-50 text-navy-900">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">E-mail</p>
              <p className="text-xs text-muted">{c("email")}</p>
            </div>
          </a>
          <div className="card flex items-start gap-3 p-5">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-navy-50 text-navy-900">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">{isTr ? "Konum" : "Location"}</p>
              <p className="text-xs text-muted">Bodrum, Muğla / Türkiye</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
