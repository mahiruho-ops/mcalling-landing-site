import { ArrowRight, ExternalLink, Sparkles, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import heroBg from "@/assets/hero-bg.jpg";
import { homeContent } from "@/content/mkcalling/home";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const { hero } = homeContent;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={heroBg} 
          alt="AI Calling Platform" 
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Animated Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-glow" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Powered by{" "}
              <Link
                href="https://mahiruho.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                Mahiruho
                <ExternalLink className="w-3.5 h-3.5 opacity-70 text-primary" />
              </Link>
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight line-height-1">
            {hero.headline}
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {hero.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto pt-2">
            {hero.bullets.map((bullet, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/schedule-demo">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all group">
                {hero.primaryCTA}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary/60 hover:bg-card/50">
                {hero.secondaryCTA}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
