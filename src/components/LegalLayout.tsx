import { PageHero } from "@/components/PageHero";

interface Props {
  title: string;
  subtitle: string;
  lastUpdate: string;
  homeLabel: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, subtitle, lastUpdate, homeLabel, children }: Props) {
  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        crumbs={[{ href: "/", label: homeLabel }, { label: title }]}
      />
      {/* v8: yasal sayfalarda YALNIZ ortalanmış okuma ölçüsü (~70ch) —
          kutu/süs bilinçli olarak yok, ciddiyet korunur. */}
      <section className="section">
        <div className="container-page max-w-[70ch]">
          <p className="text-xs text-muted">{lastUpdate}</p>
          <div className="prose-legal mt-6 space-y-4 text-pretty text-base md:text-[15px] leading-relaxed text-ink/90">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
