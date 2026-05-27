import { Suspense } from "react";
import { NewsletterConfirmClient } from "./NewsletterConfirmClient";

export const metadata = {
  title: "Bülten Onayı — Bodrumapartkiralama.com",
  description:
    "Bodrumapartkiralama.com bülten kaydınızı onaylayın. E-posta adresinize gelen onay linkinde token okunarak otomatik tamamlanır.",
  robots: { index: false, follow: false },
};

export default function NewsletterConfirmPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        background: "#FAF6EE",
      }}
    >
      <Suspense fallback={<p>Yükleniyor...</p>}>
        <NewsletterConfirmClient />
      </Suspense>
    </main>
  );
}
