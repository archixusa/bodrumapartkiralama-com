"use client";

import { useTranslations } from "next-intl";
import { Home } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const c = useTranslations("common");
  return (
    <section className="section">
      <div className="container-page max-w-xl text-center">
        <p className="text-5xl font-bold text-accent-400">404</p>
        <h1 className="mt-3">Sayfa bulunamadı</h1>
        <p className="mt-3 text-muted">
          Aradığınız sayfa taşınmış veya silinmiş olabilir.
        </p>
        <Link href="/" className="btn-primary mt-6">
          <Home className="h-4 w-4" />
          {c("brand")}
        </Link>
      </div>
    </section>
  );
}
