import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Server component — react-markdown is happy on both client and server,
// but we render statically.
export function MdxBody({ source }: { source: string }) {
  return (
    <div className="prose-blog">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="mt-8 text-2xl font-bold">{children}</h2>
          ),
          h2: ({ children }) => {
            const text = String(children);
            const id = text
              .toLowerCase()
              .replace(/ş/g, "s")
              .replace(/ç/g, "c")
              .replace(/ğ/g, "g")
              .replace(/ı/g, "i")
              .replace(/ö/g, "o")
              .replace(/ü/g, "u")
              .replace(/[^a-z0-9\s-]/g, "")
              .trim()
              .replace(/\s+/g, "-");
            return (
              <h2 id={id} className="mt-10 text-2xl font-bold scroll-mt-24">
                {children}
              </h2>
            );
          },
          h3: ({ children }) => (
            <h3 className="mt-6 text-xl font-semibold">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mt-4 leading-relaxed text-ink">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mt-4 list-disc space-y-1 pl-6">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-4 list-decimal space-y-1 pl-6">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-navy-700 underline underline-offset-2 hover:text-navy-900"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mt-4 border-l-4 border-accent-500 bg-navy-50/40 px-4 py-2 italic">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-navy-900">{children}</strong>
          ),
          hr: () => <hr className="my-8 border-[var(--color-border)]" />,
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
