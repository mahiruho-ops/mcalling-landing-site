import type { LegalDocument } from "@/content/mkcalling/legal/types";
import { legalMeta } from "@/content/mkcalling/legal/meta";
import Link from "next/link";

type Props = {
  document: LegalDocument;
};

export function LegalDocumentPage({ document: doc }: Props) {
  return (
    <section className="py-24 pt-32">
      <div className="container mx-auto px-6">
        <article className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert prose-headings:scroll-mt-28">
          <header className="not-prose mb-10 space-y-3 border-b border-border/50 pb-8">
            <p className="text-sm text-muted-foreground">{legalMeta.brandLine}</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{doc.title}</h1>
            <p className="text-sm text-muted-foreground">
              Effective: {doc.effectiveDate} · Last updated: {doc.lastUpdated}
            </p>
            {doc.intro?.map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">
                {p}
              </p>
            ))}
          </header>

          <div className="space-y-10">
            {doc.sections.map((section) => (
              <section key={section.id ?? section.title} id={section.id}>
                <h2 className="text-xl font-semibold text-foreground mb-3">{section.title}</h2>
                {section.paragraphs?.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-3">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    {section.list.map((item, i) => (
                      <li key={i} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <footer className="not-prose mt-12 pt-8 border-t border-border/50 text-sm text-muted-foreground space-y-2">
            <p>
              Checkout on our platform is subject to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <p>
              Questions?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact us
              </Link>
              .
            </p>
          </footer>
        </article>
      </div>
    </section>
  );
}
