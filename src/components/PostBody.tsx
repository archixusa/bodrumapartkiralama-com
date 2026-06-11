import type { PostSection } from "@/data/posts";

export function PostBody({ sections }: { sections: PostSection[] }) {
  return (
    <div className="space-y-4 text-base md:text-[15px] leading-relaxed text-ink/90">
      {sections.map((s, i) => {
        switch (s.type) {
          case "p":
            return <p key={i}>{s.text}</p>;
          case "h2":
            return (
              <h2 key={i} id={s.id} className="mt-10 scroll-mt-24 text-2xl">
                {s.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-6 text-lg">
                {s.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="ml-5 list-disc space-y-1">
                {s.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="ml-5 list-decimal space-y-1">
                {s.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ol>
            );
          case "quote":
            // v8: gövde alıntısı pull-quote diline bağlandı — Fraunces italik
            // + üstte turkuaz vurgu çizgisi; kutu ve yan şerit yok (yalnız
            // sunum, metne dokunulmaz).
            return (
              <figure key={i} className="my-8">
                <span
                  aria-hidden
                  className="block h-1 w-12 rounded-full bg-turkuaz-500"
                />
                <blockquote className="mt-4 text-balance font-display text-xl font-semibold italic leading-snug text-murekkep-900 md:text-2xl">
                  {s.text}
                </blockquote>
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
