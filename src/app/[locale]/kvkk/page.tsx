import { getTranslations, setRequestLocale } from "next-intl/server";
import { SoonPage } from "@/components/SoonPage";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ft = await getTranslations({ locale, namespace: "footer" });
  return <SoonPage title={ft("kvkk")} />;
}
