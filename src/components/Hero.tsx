import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { homeContent } from "@/content/mkcalling/home";
import { Button } from "@/components/ui/button";
import { Atmosphere } from "@/components/site/Atmosphere";
import { ShelfRows, StageFooter } from "@/components/site/HeroStages";

const STAGE_FOOTER = ["Inbound & outbound", "Managed setup", "India-hosted", "Talk time"] as const;

export const Hero = () => {
  const { hero } = homeContent;
  const splitAt = hero.headline.indexOf(" — ");
  const lead = splitAt === -1 ? hero.headline : hero.headline.slice(0, splitAt);
  const accent = splitAt === -1 ? "" : hero.headline.slice(splitAt + 3);

  return (
    <section className="relative overflow-hidden border-b border-border">
      <Atmosphere variant="hero" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:pt-32">
        <div className="space-y-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Powered by{" "}
            <Link
              href="https://mahiruho.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              Mahiruho
              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
            </Link>
          </p>
          <h1 className="text-4xl font-semibold leading-[1.12] tracking-tight md:text-5xl lg:text-6xl">
            {lead}
            {accent ? (
              <>
                {" — "}
                <span className="gradient-text-primary">{accent}</span>
              </>
            ) : null}
          </h1>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            {hero.subtitle}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/schedule-demo">
              <Button size="lg" className="bg-gradient-primary transition-all hover:shadow-glow-primary group">
                {hero.primaryCTA}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary/60 hover:bg-card/50">
                {hero.secondaryCTA}
              </Button>
            </Link>
          </div>
        </div>

        <div className="v15-stage-3d">
          <div className="v15-stage-3d-inner v15-depth-plate relative overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/35" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/35" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                mKcalling
              </span>
            </div>
            <ShelfRows rows={hero.bullets.map((bullet) => ({ title: bullet }))} />
            <StageFooter>
              <div className="grid grid-cols-2 gap-px sm:grid-cols-4">
                {STAGE_FOOTER.map((label) => (
                  <p key={label} className="text-center text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">
                    {label}
                  </p>
                ))}
              </div>
            </StageFooter>
          </div>
        </div>
      </div>
    </section>
  );
};
