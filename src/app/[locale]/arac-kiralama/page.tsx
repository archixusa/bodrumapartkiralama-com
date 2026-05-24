import { getTranslations, setRequestLocale } from "next-intl/server";
import { SoonPage } from "@/components/SoonPage";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const s = await getTranslations({ locale, namespace: "services" });
  return <SoonPage title={s("carTitle")} />;
}
