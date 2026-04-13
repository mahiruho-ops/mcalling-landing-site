import Image from "next/image";
import Link from "next/link";
import { pricingPageContent } from "@/content/mkcalling/pricingPage";

const MAHIRUHO_EXTERNAL = {
  target: "_blank" as const,
  rel: "noopener noreferrer",
};

export function PricingDifferentiators() {
  const { differentiators } = pricingPageContent;
  const { mahiruhoCard } = differentiators;
  const mahiruhoHref = mahiruhoCard.websiteUrl;

  return (
    <section className="py-16 md:py-20 border-t border-border/40">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold normal-case">{differentiators.title}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{differentiators.subtitle}</p>
          </div>

          <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/8 via-card/60 to-card/40 backdrop-blur-sm shadow-card p-6 md:p-8 md:flex md:gap-8 md:items-start">
            <Link
              href={mahiruhoHref}
              target={MAHIRUHO_EXTERNAL.target}
              rel={MAHIRUHO_EXTERNAL.rel}
              className="shrink-0 mb-5 md:mb-0 inline-flex items-center justify-center rounded-2xl bg-white/80 dark:bg-background/80 p-2 ring-1 ring-border/50 hover:ring-primary/40 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={`${mahiruhoCard.title} — visit website (opens in new tab)`}
            >
              <Image
                src="/logo_mahi.png"
                alt=""
                width={160}
                height={56}
                className="h-12 md:h-14 w-auto max-w-[200px] object-contain object-center"
              />
            </Link>
            <div className="min-w-0 space-y-4">
              <div>
                <p className="text-xs font-semibold tracking-wide text-primary">{mahiruhoCard.eyebrow}</p>
                <h3 className="text-2xl md:text-3xl font-bold mt-1">
                  <Link
                    href={mahiruhoHref}
                    target={MAHIRUHO_EXTERNAL.target}
                    rel={MAHIRUHO_EXTERNAL.rel}
                    className="text-foreground hover:text-primary underline-offset-4 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
                  >
                    {mahiruhoCard.title}
                  </Link>
                </h3>
              </div>
              <p className="text-foreground/95 leading-relaxed font-medium">{mahiruhoCard.lead}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{mahiruhoCard.body}</p>
              <ul className="space-y-2 pt-1">
                {mahiruhoCard.highlights.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1.5 shrink-0">•</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-5">
            {differentiators.rows.map((row) => (
              <div
                key={row.category}
                className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm shadow-card overflow-hidden"
              >
                <div className="grid md:grid-cols-2 md:min-h-0">
                  <div className="p-5 md:p-6 flex flex-col min-h-full bg-muted/20 border-b md:border-b-0 md:border-r border-border/50">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Alternative</p>
                    <p className="font-semibold text-foreground mt-2">{row.category}</p>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed flex-1">{row.contrast}</p>
                  </div>
                  <div className="p-5 md:p-6 flex flex-col min-h-full bg-card/60">
                    <div className="shrink-0">
                      <Image
                        src="/mKCalling_Logo.png"
                        alt="mKcalling"
                        width={220}
                        height={48}
                        className="h-8 md:h-10 w-auto max-w-[220px] object-contain object-left"
                      />
                    </div>
                    <p className="text-sm text-foreground mt-4 leading-relaxed flex-1">{row.mkcalling}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
