import { getTranslations, setRequestLocale } from "next-intl/server";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const f = await getTranslations({ locale, namespace: "faq" });
  const h = await getTranslations({ locale, namespace: "home" });

  const items = [1, 2, 3, 4, 5, 6].map((i) => ({
    q: f(`q${i}`),
    a: f(`a${i}`),
  }));

  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section className="section">
      <JsonLd data={ld} />
      <div className="container-page max-w-4xl">
        <h1>{h("faqTitle")}</h1>
        <div className="mt-6">
          <FAQ items={items} />
        </div>
      </div>
    </section>
  );
}
