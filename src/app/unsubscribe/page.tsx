import { Suspense } from "react";
import { UnsubscribeClient } from "./UnsubscribeClient";

export const metadata = {
  title: "İletişimden Çıkış",
  description: "Bodrumapartkiralama.com partnership e-postalarından çıkış.",
  robots: { index: false, follow: false },
};

export default function UnsubscribePage() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "#FAF6EE" }}>
      <Suspense fallback={<p>Yükleniyor...</p>}>
        <UnsubscribeClient />
      </Suspense>
    </main>
  );
}
