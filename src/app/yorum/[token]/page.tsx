import { Suspense } from "react";
import { ReviewForm } from "./ReviewForm";

export const metadata = {
  title: "Evimizi değerlendirin",
  description: "Konaklamanızı kısaca değerlendirin — bizden sonraki misafirlere yardımcı olun.",
  robots: { index: false, follow: false },
};

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        background: "linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 100%)",
      }}
    >
      <Suspense fallback={<p>Yükleniyor...</p>}>
        <ReviewForm token={token} brand="BodrumApartKiralama.com" />
      </Suspense>
    </main>
  );
}
