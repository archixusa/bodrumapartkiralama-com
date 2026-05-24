"use client";

import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  const c = useTranslations("common");
  return (
    <a
      href={`https://wa.me/${c("whatsappNumber")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-cardHover transition hover:scale-105 hover:bg-[#1DA851] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 lg:bottom-7 lg:right-7"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
