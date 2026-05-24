import { useTranslations } from "next-intl";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/routing";

interface Props {
  title: string;
  intro?: string;
}

export function SoonPage({ title, intro }: Props) {
  const c = useTranslations("common");
  return (
    <section className="section">
      <div className="container-page max-w-3xl text-center">
        <span className="chip-accent">{c("soon")}</span>
        <h1 className="mt-4 text-balance">{title}</h1>
        <p className="mt-4 text-muted">{intro ?? c("soonDesc")}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-secondary">
            <ArrowLeft className="h-4 w-4" />
            {c("brand")}
          </Link>
          <a
            href={`https://wa.me/${c("whatsappNumber")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
